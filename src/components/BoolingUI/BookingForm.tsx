"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export const BookingForm = () => {
  const form = useForm({
    defaultValues: { numSeats: 1 },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const bookSeats = useMutation<any, Error, { numSeats: number }, unknown>({
    mutationFn: async ({ numSeats }) => {
      const response = await fetch("/api/book-seats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numSeats }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to book seats.");
      }
      const res = await response.json();
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["all-seats"] });
      console.log("Seats booked successfully:", data);
      toast.success(data.message || "Seats booked successfully!");
    },
    onError: (error) => {
      toast.error(`Booking failed: ${error.message}`);
    },
  });

  const resetBookingData = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/reset", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to reset.");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-seats"] });
      toast.success("Seats reset successfully!");
    },
    onError: (error) => {
      toast.error(`Reset failed: ${error.message}`);
    },
  });

  const onSubmit: SubmitHandler<{ numSeats: number }> = (data) => {
    bookSeats.mutate({ numSeats: Number(data.numSeats) });
  };

  const handleReset = () => {
    resetBookingData.mutate();
  
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center gap-2">
          <FormField
            control={form.control}
            name="numSeats"
            rules={{
              required: "This field is required",
              pattern: {
                value: /^\d+$/,
                message: "Only numbers are allowed",
              },
              min: { value: 1, message: "Number should be more than 0" },
              max: { value: 7, message: "Number should be less than 8" },
            }}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Number of seats</FormLabel>
                <FormControl>
                  <Input placeholder="Enter number of seats" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!form.formState.isValid || bookSeats.isPending}
            className="bg-[#3182CE] hover:bg-[#2B6CB0] text-white whitespace-nowrap w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {bookSeats.isPending ? "Booking..." : "Book Seats"}
          </Button>
        </div>
      </form>
      <Button
        onClick={handleReset}
        disabled={resetBookingData.isPending}
        className="w-full bg-[#fc6868] hover:bg-[#fa4e4e] text-white mt-4 disabled:cursor-not-allowed disabled:opacity-50 "
      >
        {resetBookingData.isPending ? "Resetting..." : "Reset"}
      </Button>
      {bookSeats.data && bookSeats.data.bookedSeatsNumber.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="font-medium whitespace-nowrap">Book Seats</span>
          <div className="flex gap-2">
            {bookSeats.data.bookedSeatsNumber.map((num: number) => (
              <div
                key={num}
                className="w-7 h-7 flex items-center justify-center bg-[#FFB800] rounded-md text-sm font-medium"
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      )}
    </Form>
  );
};
