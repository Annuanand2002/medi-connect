import { Search, SlidersHorizontal } from "lucide-react";
import type { AppointmentStatus } from "../type/appointmentList";

interface AppointmentHistoryFiltersProps {
  search: string;
  status?: AppointmentStatus;

  onSearchChange: (value: string) => void;
  onStatusChange: (value?: AppointmentStatus) => void;
}

const AppointmentHistoryFilters = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: AppointmentHistoryFiltersProps) => {
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
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search by doctor or appointment code..."
          aria-label="Search appointments"
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

      {/* Appointment Status */}
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
                : (event.target.value as AppointmentStatus),
            )
          }
          aria-label="Filter by appointment status"
        >
          <option value="">
            All Status
          </option>

          <option value="BOOKED">
            Booked
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>

          <option value="RESCHEDULED">
            Rescheduled
          </option>
        </select>
      </div>
    </section>
  );
};

export default AppointmentHistoryFilters;

