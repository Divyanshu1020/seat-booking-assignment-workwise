// components/booking/BookingUI.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/global/navbar";
import { getAllSeatsQueryFn } from "@/action/seat";
import { SubmitHandler } from "react-hook-form";
import { BookingForm } from "./BookingForm";
import { SeatGrid } from "./SeatGrid";

export default function BookingUI() {
  const [selectedSeats, setSelectedSeats] = useState(0);
  const [userId] = useState("user123");
  const [bookedSeats, setBookedSeats] = useState(0);
  const [unbookedSeats, setUnbookedSeats] = useState(0);

  const { data: seats, isLoading } = useQuery({
    queryKey: ["all-seats"],
    queryFn: getAllSeatsQueryFn,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (!seats || isLoading) return;

    let booked = 0;
    let unbooked = 0;

    seats.data?.forEach((seat: { bookingId: string | null }) => {
      if (seat.bookingId) booked++;
      else unbooked++;
    });

    setBookedSeats(booked);
    setUnbookedSeats(unbooked);
  }, [seats, isLoading]);

  const onSubmit: SubmitHandler<{ numSeats: number }> = (data) => {
    console.log("Booking submitted:", { userId, numberOfSeats: data.numSeats });
  };

  const handleReset = () => {
    setSelectedSeats(0);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-65px)] bg-white p-4 md:p-8">
        <div className="max-w-[900px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-12">
            <div className="w-full lg:w-[600px] mb-8 lg:mb-0 ">
              <SeatGrid
                seats={seats?.data || []}
                isLoading={isLoading}
                bookedSeats={bookedSeats}
                unbookedSeats={unbookedSeats}
              />
            </div>
            <div className="w-full lg:w-[280px] space-y-4">
              <BookingForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
