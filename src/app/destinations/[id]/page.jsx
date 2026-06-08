import DestinationDetailsPage from "@/components/DestinationDetailsPage";

const Page = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:6001/destinations/${id}`);
  const destination = await res.json();

  return <DestinationDetailsPage destination={destination} />;
};
export default Page;
