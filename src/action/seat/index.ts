import { getAllSeatsQuery } from "./query"

export const getAllSeatsQueryFn = async () => {
    try {

        const alleSeats = await getAllSeatsQuery()

        if(alleSeats) {
            return { status: true, data: alleSeats }
        }

        return { status: false, message: 'Something went wrong' }
        
    } catch (error) {
        return { status: false, message: error }
    }
}