"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";

export function Navbar() {
  const { signOut } = useClerk()

  return (
    <nav className="border-b bg-white">
      <div className="max-w-[900px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold">Ticket Booking</h1>
        <Button 
          onClick={() => signOut({ redirectUrl: '/' })}
          variant="ghost"
          className="text-gray-600 hover:text-gray-900"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </nav>
  );
}