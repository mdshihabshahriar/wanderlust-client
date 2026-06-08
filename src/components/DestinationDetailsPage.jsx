"use client";
import { DeleteDialog } from "@/components/DeleteDialog";
import { EditModal } from "@/components/EditModal";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { BsSunrise } from "react-icons/bs";
import { CgShoppingCart } from "react-icons/cg";
import { FaPlaceOfWorship, FaUmbrellaBeach } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { MdHotel } from "react-icons/md";
import { toast } from "react-toastify";

const DestinationDetailsPage = ({ destination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  console.log(user);

  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
      userName: user?.name,
      userImage: user?.image,
      destinationId: destination._id,
      destinationName: destination.destinationName,
      price: destination.price,
      imageUrl: destination.imageUrl,
      country: destination.country,
      bookingDate: new Date().toISOString(),
      departureDate: destination.departureDate,
    };
    console.log("Booking data:", bookingData);

    const res = await fetch("http://localhost:6001/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();
    console.log("Booking response:", data);

    if (res.ok) {
      toast.success("Booking successful!");
    } else {
      toast.error("Booking failed: " + data.message);
    }
  };

  const {
    destinationName,
    country,
    category,
    price,
    duration,
    departureDate,
    imageUrl,
    description,
  } = destination;

  const highlights = [
    {
      icon: <FaUmbrellaBeach />,
      title: "Pristine beaches",
      sub: "Kuta, Seminyak & Nusa Dua",
    },
    {
      icon: <FaPlaceOfWorship />,
      title: "Cultural attractions",
      sub: "Temples, rice terraces & local arts",
    },
    {
      icon: <MdHotel />,
      title: "Luxury resorts",
      sub: "5-star accommodations included",
    },
    {
      icon: <BsSunrise />,
      title: "Breathtaking sunsets",
      sub: "Tanah Lot & Uluwatu cliff views",
    },
  ];

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <div className="flex justify-end items-center gap-3 mt-5 mb-3">
        <EditModal destination={destination} />
        <DeleteDialog destination={destination} />
      </div>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Hero image */}
        <div className="relative">
          <Image
            src={imageUrl}
            alt={destinationName}
            width={800}
            height={420}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-3 left-3 bg-emerald-50 text-emerald-800 text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
          <span className="absolute top-3 right-3 bg-emerald-700 text-white text-xs font-medium px-3 py-1 rounded-full">
            Featured
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Title + Price */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-medium text-zinc-900 dark:text-white">
                {destinationName}
              </h1>
              <p className="text-sm text-zinc-500 flex items-center gap-1 mt-1">
                <LuMapPin /> {country}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-400">per person</p>
              <p className="text-2xl font-medium text-zinc-900 dark:text-white">
                ${price}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Duration", value: duration },
              {
                label: "Departure",
                value: departureDate
                  ? new Date(departureDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Not set",
              },
              { label: "Category", value: category },
              { label: "Availability", value: "Available" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4"
              >
                <p className="text-xs text-zinc-400 mb-1">{label}</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
              About this trip
            </p>
            <p className="text-sm text-zinc-500 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">
              Trip highlights
            </p>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {highlights.map(({ icon, title, sub }) => (
                <div key={title} className="flex items-center gap-3 py-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {title}
                    </p>
                    <p className="text-xs text-zinc-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Book CTA */}
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-zinc-500">Total price</span>
              <span className="text-lg font-medium text-zinc-900 dark:text-white">
                ${price}{" "}
                <span className="text-xs font-normal text-zinc-400">
                  / person
                </span>
              </span>
            </div>
            <Button
              onClick={handleBooking}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              <CgShoppingCart size={17} /> Book this trip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
