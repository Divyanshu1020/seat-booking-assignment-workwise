
# 🚆 Train Seat Booking System

A seat booking system built with **Next.js**, **PostgreSQL**, and **Prisma**. The app supports user authentication via **Clerk**, allowing users to book train seats with smart prioritization logic.

---

## 🔧 Tech Stack

- **Frontend:** Next.js 14
- **Database:** PostgreSQL
- **ORM:** Prisma
<!-- - **Auth:** Clerk -->
- **Styling:** Tailwind CSS
---

## 📦 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Divyanshu1020/seat-booking-assignment-workwise.git
   cd seat-booking
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env.local` file in the root and add the following:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/your-database

   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-in

   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/booking
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/booking
   ```

   > 💡 **Note:** Replace `your_clerk_publishable_key` and `your_clerk_secret_key` with your actual [Clerk API keys](https://dashboard.clerk.com/).

4. **Push Prisma Schema to Database**
   ```bash
   npx prisma db push
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```

   The app should now be running at [http://localhost:3000](http://localhost:3000)

