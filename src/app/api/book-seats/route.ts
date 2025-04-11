import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { numSeats } = await req.json();

  if (
    !numSeats ||
    typeof numSeats !== "number" ||
    numSeats < 1 ||
    numSeats > 7
  ) {
    return NextResponse.json(
      { error: "Invalid request parameters." },
      { status: 400 }
    );
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const availableCountResult = await client.query(
      `SELECT COUNT(*) FROM "Seats" WHERE "bookingId" IS NULL`
    );

    const totalAvailable = parseInt(availableCountResult.rows[0].count, 10);
    if (totalAvailable < numSeats) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { error: "Not enough seats available." },
        { status: 400 }
      );
    }

    let bookedSeats: number[] = [];
    let bookedSeatsNumber: number[] = [];
    let foundInSingleRow = false;

    // 1. Try to book in a single row
    const promisingRowsResult = await client.query(
      `SELECT row_number
       FROM "Seats"
       WHERE "bookingId" IS NULL
       GROUP BY row_number
       HAVING COUNT(*) >= $1
       ORDER BY row_number ASC`,
      [numSeats]
    );

    const promisingRows = promisingRowsResult.rows.map(
      (row: { row_number: number }) => row.row_number
    );

    for (const rowNumber of promisingRows) {
      const availableInRowResult = await client.query(
        `SELECT id, seat_number
         FROM "Seats"
         WHERE row_number = $1 AND "bookingId" IS NULL
         ORDER BY seat_number ASC
         FOR UPDATE`,
        [rowNumber]
      );

      const seatsInRow = availableInRowResult.rows;

      if (seatsInRow.length >= numSeats) {
        bookedSeats = seatsInRow.slice(0, numSeats).map((s) => s.id);
        bookedSeatsNumber = seatsInRow
          .slice(0, numSeats)
          .map((s) => s.seat_number);
        foundInSingleRow = true;
        break;
      }
    }

    // 2. Fallback to best cluster of nearby seats
    if (!foundInSingleRow) {
      const allAvailableResult = await client.query(
        `SELECT s.id, s.seat_number, s.row_number
         FROM (
            SELECT * FROM "Seats"
            WHERE "bookingId" IS NULL
            ORDER BY row_number ASC, seat_number ASC
            LIMIT 100
            FOR UPDATE
          ) s`
      );

      const seats = allAvailableResult.rows;

      // Sliding window to find best cluster of 'numSeats'
      let bestCluster: typeof seats = [];

      for (let i = 0; i <= seats.length - numSeats; i++) {
        const group = seats.slice(i, i + numSeats);

        // Ensure all seats are adjacent in list (even across rows)
        const isContiguous = group.every((seat, idx) => {
          if (idx === 0) return true;
          const prev = group[idx - 1];
          return (
            seat.row_number > prev.row_number ||
            (seat.row_number === prev.row_number &&
              seat.seat_number === prev.seat_number + 1) ||
            (seat.seat_number === 1 && prev.seat_number === 7) // edge case if seat row ends
          );
        });

        if (isContiguous) {
          bestCluster = group;
          break;
        }
      }

      if (bestCluster.length === numSeats) {
        bookedSeats = bestCluster.map((s) => s.id);
        bookedSeatsNumber = bestCluster.map((s) => s.seat_number);
      } else {
        await client.query("ROLLBACK");
        return NextResponse.json(
          { error: "Not enough nearby seats available." },
          { status: 400 }
        );
      }
    }

    // Finalize booking
    const bookingId = `BOOKING_ID_${uuidv4().slice(0, 8)}_USER_ID_${userId}`;

    await client.query(
      `UPDATE "Seats"
       SET "bookingId" = $1
       WHERE id IN (${bookedSeats.map((_, i) => `$${i + 2}`).join(", ")})`,
      [bookingId, ...bookedSeats]
    );

    await client.query("COMMIT");

    return NextResponse.json(
      {
        message: `Successfully booked ${numSeats} seat(s): ${bookedSeatsNumber.join(
          ", "
        )}`,
        bookingId,
        bookedSeats,
        bookedSeatsNumber,
      },
      { status: 200 }
    );
  } catch (error: any) {
    await client.query("ROLLBACK");
    console.error("Error booking seats:", error);
    return NextResponse.json(
      { error: error.message || "Failed to book seats." },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
