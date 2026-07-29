import type { DoctorRequestStatus } from "../../../entites/doctor/doctorRequestList.types";

interface StatusBadgeProps {
  status: DoctorRequestStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    approved: "bg-green-100 text-green-700 border border-green-200",
    rejected: "bg-red-100 text-red-700 border border-red-200",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
