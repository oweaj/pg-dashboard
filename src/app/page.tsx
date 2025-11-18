import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import DashBoard from "./_components/Dashboard";
import { paymentListApi } from "@/lib/api/payment";
import { merchantListApi } from "@/lib/api/merchant";

const Home = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    await queryClient.prefetchQuery({
      queryKey: ["payment_list"],
      queryFn: paymentListApi,
    }),
    await queryClient.prefetchQuery({
      queryKey: ["merchant_list"],
      queryFn: merchantListApi,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashBoard />
    </HydrationBoundary>
  );
};

export default Home;
