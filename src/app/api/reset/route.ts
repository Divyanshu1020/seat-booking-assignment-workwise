

import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest){
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await client.seats.updateMany({
            data: {
                bookingId: null
            }
        })
        return NextResponse.json({ message: "Reset successful" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Failed to reset" }, { status: 500 });
    }
}