import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Ticket, ArrowRight, Calendar, CreditCard, MapPin, Search } from "lucide-react"
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const userDataClerk = await currentUser();
  if(userDataClerk) {
    redirect("/booking")
  }
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-6 w-6" />
            <span className="text-xl font-bold">TrainTickets</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Routes
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Stations
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm font-medium hover:underline underline-offset-4 hidden sm:inline-flex">
              Sign In
            </Link>
            <Button asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Book train tickets for your journey
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Commuter, express, high-speed, and more. Find and book train tickets for destinations across the
                    country.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1.5">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Browse Routes
                  </Button>
                </div>
              </div>
              <Image
                src=""
                width={550}
                height={550}
                alt="Hero Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                priority
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to plan your next train journey?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Join thousands of travelers who book train tickets through our platform every day
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1.5">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            <p className="text-sm font-medium">TrainTickets &copy; {new Date().getFullYear()}</p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Help
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
