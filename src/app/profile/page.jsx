'use client';

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = session?.user;

  useEffect(() => {
    if (!user?.id) return;

    const fetchBookings = async () => {
      try {
        const token = await authClient.getToken();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* User Info Card */}
      <div className="flex items-center gap-5 p-6 border rounded-xl mb-8 bg-gray-50">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-white text-3xl font-bold">
            {user.name?.[0]}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full mt-1 inline-block">
            Member
          </span>
        </div>
      </div>

      {/* Bookings Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My Bookings</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16 border rounded-xl">
            <p className="text-4xl mb-3">🗺️</p>
            <p className="text-gray-500">No bookings yet. Start exploring!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="border rounded-xl p-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{booking.destinationName}</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      📅{" "}
                      {booking.bookingDate
                        ? new Date(booking.bookingDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      👥 {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                    </p>
                  </div>
                  <span className="text-cyan-600 font-bold text-lg">
                    ${booking.totalPrice}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;