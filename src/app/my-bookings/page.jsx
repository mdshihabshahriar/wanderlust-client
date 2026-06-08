import { StatusBadge } from "@/components/StatusBadge";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { CiCalendarDate } from "react-icons/ci";
import { LuEye, LuHash, LuMapPin, LuTrash } from "react-icons/lu";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const res = await fetch(`http://localhost:6001/bookings/${user?.id}`);
  const bookings = await res.json();

  const confirmed = bookings.filter(b => b.status === "confirmed").length;
  const pending = bookings.filter(b => b.status === "pending").length;
  const totalSpent = bookings.reduce((sum, b) => sum + Number(b.price), 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-medium text-zinc-900 dark:text-white">My Bookings</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage and view your upcoming travel plans</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total bookings", value: bookings.length, color: "" },
          { label: "Confirmed",      value: confirmed,        color: "text-emerald-700" },
          { label: "Pending",        value: pending,          color: "text-amber-600" },
          { label: "Total spent",    value: `$${totalSpent.toLocaleString()}`, color: "" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-400 mb-1">{label}</p>
            <p className={`text-xl font-medium ${color || "text-zinc-900 dark:text-white"}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Booking Cards */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="flex border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
            <Image
              src={booking.imageUrl}
              alt={booking.destinationName}
              className="w-48 object-cover shrink-0 hidden sm:block"
              width={192}
              height={120}
            />
            <div className="flex flex-col justify-between flex-1 p-5">
              <div>
                <StatusBadge status={booking.status} />
                <h2 className="text-lg font-medium text-zinc-900 dark:text-white mt-1 mb-2">
                  {booking.destinationName}
                </h2>
                <p className="text-sm text-zinc-500 flex items-center gap-1 mb-1">
                  <LuMapPin size={13} /> {booking.country} · {booking.category}
                </p>
                <p className="text-sm text-zinc-500 flex items-center gap-1 mb-1">
                  <CiCalendarDate size={14} /> Departure: {new Date(booking.departureDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
                <p className="text-xs text-zinc-400 flex items-center gap-1">
                  <LuHash size={12} /> Booking ID: {booking._id.slice(-6)}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-xl font-medium text-emerald-700">${Number(booking.price).toLocaleString()}</span>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 text-sm text-red-700 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                    <LuTrash size={13} /> Cancel
                  </button>
                  <Link href={`/bookings/${booking._id}`} className="flex items-center gap-1.5 text-sm text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors">
                    <LuEye size={13} /> View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyBookingPage;