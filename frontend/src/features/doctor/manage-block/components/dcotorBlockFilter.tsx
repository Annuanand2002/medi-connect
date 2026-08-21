import { Search, CalendarDays } from "lucide-react";

interface DoctorBlockFiltersProps {
  search: string;
  date?: string;
  onSearchChange: (value: string) => void;
  onDateChange: (value?: string) => void;
}

const DoctorBlockFilters = ({
  search,
  date,
  onSearchChange,
  onDateChange,
}: DoctorBlockFiltersProps) => {
  return (
    <section className="doctor-request-filters">
      {/* Search */}
      <div className="doctor-search">
        <Search size={18} strokeWidth={1.8} />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by reason..."
          aria-label="Search by reason"
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

      {/* Date Filter */}
      <div className="doctor-status-filter">
        <CalendarDays size={16} strokeWidth={1.8} />

        <input
          type="date"
          value={date ?? ""}
          onChange={(event) => onDateChange(event.target.value || undefined)}
          aria-label="Filter by date"
        />

        {date && (
          <button
            type="button"
            onClick={() => onDateChange(undefined)}
            aria-label="Clear date"
          >
            ×
          </button>
        )}
      </div>
    </section>
  );
};

export default DoctorBlockFilters;
