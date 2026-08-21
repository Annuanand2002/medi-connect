import { Search, SlidersHorizontal } from "lucide-react";
import type { PatientStatus } from "../types/patientList";


interface PatientFiltersProps {
  search: string;
  status?: PatientStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (value?: PatientStatus) => void;
}

const PatientFilters = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: PatientFiltersProps) => {
  return (
    <section className="doctor-request-filters">
      {/* Search */}
      <div className="doctor-search">
        <Search size={18} strokeWidth={1.8} />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or email..."
          aria-label="Search by patientCode"
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
        <SlidersHorizontal size={16} strokeWidth={1.8} />

        <select
          value={status ?? ""}
          onChange={(event) =>
            onStatusChange(
              event.target.value === ""
                ? undefined
                : (event.target.value as PatientStatus),
            )
          }
          aria-label="Filter by status"
        >
          <option value="">All Status</option>

          <option value="ACTIVE">ACTIVE</option>

          <option value="BLOCKED">BLOCKED</option>
        </select>
      </div>
    </section>
  );
};

export default PatientFilters;
