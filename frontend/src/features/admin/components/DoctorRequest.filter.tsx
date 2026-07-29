import type { DoctorRequestStatus } from "../../../entites/doctor/doctorRequestList.types";

interface DoctorRequestFiltersProps {
  search: string;
  status?: DoctorRequestStatus;

  onSearchChange: (value: string) => void;
  onStatusChange: (value?: DoctorRequestStatus) => void;
}

const DoctorRequestFilters = ({
  //search,
  status,
  //onSearchChange,
  onStatusChange,
}: DoctorRequestFiltersProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Search */}
      {/* <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 md:max-w-sm"
      /> */}

      {/* Status Filter */}
      <select
        value={status ?? ""}
        onChange={(e) =>
          onStatusChange(
            e.target.value === ""
              ? undefined
              : (e.target.value as DoctorRequestStatus),
          )
        }
        className="rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
      >
        <option value="">All Status</option>
        <option value="PENDING">PENDING</option>
        <option value="APPROVED">APPROVED</option>
        <option value="REJECTED">REJECTED</option>
      </select>
    </div>
  );
};

export default DoctorRequestFilters;
