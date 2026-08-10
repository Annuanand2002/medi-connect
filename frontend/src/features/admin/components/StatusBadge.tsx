import type {
  DoctorRequestStatus,
} from "../types/doctorRequestList.types";

interface StatusBadgeProps {
  status: DoctorRequestStatus;
}

const StatusBadge = ({
  status,
}: StatusBadgeProps) => {

  const normalizedStatus =
    status.toLowerCase();

  return (
    <span
      className={`status-badge status-${normalizedStatus}`}
    >
      <span className="status-badge-dot" />

      <span>
        {normalizedStatus}
      </span>
    </span>
  );
};

export default StatusBadge;
