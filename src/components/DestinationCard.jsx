import Image from "next/image";
import Link from "next/link";
import { CiCalendarDate } from "react-icons/ci";
import { LuMapPin } from "react-icons/lu";

const DestinationCard = ({ destination }) => {
  const { _id, destinationName, country, imageUrl, duration, price } =
    destination;

  return (
    <div className="w-80 bg-white dark:bg-zinc-900 rounded-[20px] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
      {/* Image area */}
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          className="object-cover"
        />
        {/* Country badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
          <LuMapPin className="text-white text-xs" />
          <span className="text-white text-xs font-medium">{country}</span>
        </div>
      </div>

      {/* Info area */}
      <div className="p-5">
        <h2 className="text-xl font-medium text-zinc-900 dark:text-white tracking-tight mb-1">
          {destinationName}
        </h2>
        <div className="flex items-center gap-1.5 mb-4 text-zinc-500 text-sm">
          <CiCalendarDate className="text-base" />
          <span>{duration}</span>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-zinc-400">
              Starting from
            </p>
            <p className="text-2xl font-medium text-zinc-900 dark:text-white">
              $ {price}
            </p>
          </div>
          <Link href={`/destinations/${_id}`}>
            <button className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer">
              Book now →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DestinationCard;
