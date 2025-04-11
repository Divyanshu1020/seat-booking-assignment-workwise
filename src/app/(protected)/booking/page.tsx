import { getAllSeatsQueryFn } from '@/action/seat';
import BookingUI from '@/components/BoolingUI';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';



export default async function BookingPage() {
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ['all-seats'],
    queryFn: getAllSeatsQueryFn,
  });

  const dehydratedState = dehydrate(query);
  return (
    <HydrationBoundary state={dehydratedState}>
      <BookingUI />
    </HydrationBoundary>
  );
}