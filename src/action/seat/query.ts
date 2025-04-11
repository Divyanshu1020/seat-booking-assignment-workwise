"use server";
import { client } from "@/lib/prisma";
export const getAllSeatsQuery = async () => {
    return await client.seats.findMany({
        orderBy: {
            id: "asc"
        },
    });
}