export function Loading() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          {/* <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full border-t-4 border-b-4 border-yellow-500 animate-spin animate-delay-150"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-t-4 border-b-4 border-green-500 animate-spin animate-delay-300"></div>
          </div> */}
          <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }