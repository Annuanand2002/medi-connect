import { Search, SlidersHorizontal } from "lucide-react";

import type {
  DoctorRequestStatus,
} from "../types/doctorRequestList.types";

interface DoctorRequestFiltersProps {
  search: string;
  status?: DoctorRequestStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (value?: DoctorRequestStatus) => void;
}

const DoctorRequestFilters = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: DoctorRequestFiltersProps) => {
  return (
    <section className="doctor-request-filters">
      {/* Search */}
      <div className="doctor-search">
        <Search
          size={18}
          strokeWidth={1.8}
        />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or email..."
          aria-label="Search doctor requests"
        />

        {search && (
          <button
            type="button"
            className="doctor-search-clear"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Status */}
      <div className="doctor-status-filter">
        <SlidersHorizontal
          size={16}
          strokeWidth={1.8}
        />

        <select
          value={status ?? ""}
          onChange={(event) =>
            onStatusChange(
              event.target.value === ""
                ? undefined
                : (event.target.value as DoctorRequestStatus),
            )
          }
          aria-label="Filter by status"
        >
          <option value="">All Status</option>

          <option value="PENDING">
            Pending
          </option>

          <option value="APPROVED">
            Approved
          </option>

          <option value="REJECTED">
            Rejected
          </option>
        </select>
      </div>
    </section>
  );
};

export default DoctorRequestFilters;
