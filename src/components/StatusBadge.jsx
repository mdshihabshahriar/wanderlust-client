import { BsCheckCircle, BsClock, BsXCircle } from "react-icons/bs";

export const StatusBadge = ({ status }) => {
if (!status) return null;
  const styles = {
    confirmed: "bg-emerald-50 text-emerald-800",
    pending: "bg-amber-50 text-amber-800",
    cancelled: "bg-red-50 text-red-800",
  };

  const icons = {
    confirmed: <BsCheckCircle size={12} />,
    pending: <BsClock size={12} />,
    cancelled: <BsXCircle size={12} />,
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${styles[status] || styles.pending}`}
    >
      {icons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
