// components/booking/SeatGrid.tsx
type Seat = {
    id: number;
    row_number: number;
    seat_number: number;
    bookingId: string | null;
  };
  
  interface SeatGridProps {
    seats: Seat[];
    isLoading: boolean;
    bookedSeats: number;
    unbookedSeats: number;
  }
  
  export const SeatGrid = ({
    seats,
    isLoading,
    bookedSeats,
    unbookedSeats,
  }: SeatGridProps) => {
    const renderSeats = (seatData: Seat[]) =>
      seatData.map((seat) => {
        const isBooked = seat.bookingId !== null;
  
        return (
          <div
            key={seat.id}
            className={`flex items-center justify-center rounded-md text-black font-medium ${
              isBooked
                ? "bg-[#FFB800] hover:bg-[#FFB800]"
                : "bg-[#7AB55C] hover:bg-[#7AB55C]"
            } w-[40px] h-[28px] text-sm cursor-pointer transition-colors`}
          >
            {seat.seat_number}
          </div>
        );
      });
  
    return (
      <>
        <div
          className="grid grid-cols-7 gap-[8px] mb-6 border border-gray-300 rounded-lg p-3 bg-gray-100"
          style={{ width: "fit-content" }}
        >
          {isLoading ? <p>Loading seats...</p> : renderSeats(seats)}
        </div>
        <div className="flex flex-col sm:flex-row gap-6 ">
          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#FFB800]">
            <span className="text-sm font-medium whitespace-nowrap">
              Booked Seats = {bookedSeats}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#7AB55C]">
            <span className="text-sm font-medium whitespace-nowrap">
              Available Seats = {unbookedSeats}
            </span>
          </div>
        </div>
      </>
    );
  };
  