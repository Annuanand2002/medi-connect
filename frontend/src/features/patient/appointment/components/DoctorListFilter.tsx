import { Search, SlidersHorizontal } from "lucide-react";

interface DoctorFiltersProps {
  search: string;
  department?: string;
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value?: string) => void;
}

const DoctorListFilters = ({
  search,
  department,
  onSearchChange,
  onDepartmentChange,
}: DoctorFiltersProps) => {
  return (
    <section className="doctor-request-filters">
      {/* Search */}
      <div className="doctor-search">
        <Search size={18} strokeWidth={1.8} />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search by doctor name..."
          aria-label="Search doctors"
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

      {/* Department */}
      <div className="doctor-status-filter">
        <SlidersHorizontal
          size={16}
          strokeWidth={1.8}
        />

        <select
          value={department ?? ""}
          onChange={(event) =>
            onDepartmentChange(
              event.target.value === ""
                ? undefined
                : event.target.value,
            )
          }
          aria-label="Filter by department"
        >
          <option value="">All Departments</option>

          <option value="CARDIOLOGY">
            Cardiology
          </option>

          <option value="DERMATOLOGY">
            Dermatology
          </option>

          <option value="NEUROLOGY">
            Neurology
          </option>

          <option value="ORTHOPEDICS">
            Orthopedics
          </option>

          <option value="GENERAL_MEDICINE">
            General Medicine
          </option>

          <option value="PEDIATRICS">
            Pediatrics
          </option>
        </select>
      </div>
    </section>
  );
};

export default DoctorListFilters;