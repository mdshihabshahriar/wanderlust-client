import DestinationDetailsPage from "@/components/DestinationDetailsPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Page = async ({ params }) => {
  const { id } = await params;
  const {token} = await auth.api.getToken({
    headers: await headers()
  });

  console.log("JWT Token in page.jsx:", token);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destinations/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  const destination = await res.json();

  return <DestinationDetailsPage destination={destination} />;
};
export default Page;
