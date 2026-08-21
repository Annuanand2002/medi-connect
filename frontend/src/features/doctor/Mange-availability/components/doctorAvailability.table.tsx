import { Pencil, Trash2 } from "lucide-react";

import DataTable from "@/components/dataTable";
import type { TableColumn } from "@/types/dataTable";
import type { DoctorAvailability } from "../types/doctorAvail.type";

interface AvailabilityTableProps {
  availability: DoctorAvailability[];
  onEdit: (row: DoctorAvailability) => void;
  onDelete: (row: DoctorAvailability) => void;
  isDeleting: boolean;
}

const AvailabilityTable = ({
  availability,
  onEdit,
  onDelete,
  isDeleting,
}: AvailabilityTableProps) => {
  const availableSlots = availability.filter(
    (item) => item.isAvailable && !item.isDeleted,
  );

  const columns: TableColumn<DoctorAvailability>[] = [
    {
      key: "dayOfWeek",
      header: "Day",
      render: (row) => (
        <span className="availability-day-chip">
          {row.dayOfWeek}
        </span>
      ),
    },
    {
      key: "startTime",
      header: "Start time",
      render: (row) => row.startTime,
    },
    {
      key: "endTime",
      header: "End time",
      render: (row) => row.endTime,
    },
    {
      key: "duration",
      header: "Duration",
      render: (row) => `${row.duration} min`,
    },
    {
      key: "breaks",
      header: "Breaks",
      render: (row) =>
        row.breaks.length > 0
          ? row.breaks
              .map(
                (breakTime) =>
                  `${breakTime.startTime} – ${breakTime.endTime}`,
              )
              .join(", ")
          : "No breaks",
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="availability-table-actions">
          <button
            type="button"
            className="availability-action-button availability-edit-button"
            onClick={() => onEdit(row)}
            title={`Edit ${row.dayOfWeek} availability`}
            aria-label={`Edit ${row.dayOfWeek} availability`}
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            className="availability-action-button availability-delete-button"
            onClick={() => onDelete(row)}
            disabled={isDeleting}
            title={`Delete ${row.dayOfWeek} availability`}
            aria-label={`Delete ${row.dayOfWeek} availability`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="availability-table">
      <DataTable
        data={availableSlots}
        columns={columns}
        rowKey={(row) => row.id}
        emptyState={
          <div className="availability-empty-state">
            <span>+</span>
            <h3>No availability added yet</h3>
            <p>Add your first consultation slot to start accepting bookings.</p>
          </div>
        }
      />
    </div>
  );
};

export default AvailabilityTable;