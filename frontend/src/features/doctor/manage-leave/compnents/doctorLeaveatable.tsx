import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import DataTable from "@/components/dataTable";
import type { TableColumn } from "@/types/dataTable";

import type { DoctorLeave } from "../types/doctorLeave.type";
import { formateDate } from "@/utils/formateDate";
import DeleteLeaveConfirmModal from "./deleteDoctorLeave.modal";

interface DoctorLeaveTableProps {
  leaves: DoctorLeave[];
  onEdit: (leave: DoctorLeave) => void;
  onDelete: (leave: DoctorLeave) => void;
  isDeleting?: boolean;
}

const DoctorLeaveTable = ({
  leaves,
  onEdit,
  onDelete,
  isDeleting = false,
}: DoctorLeaveTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedLeave, setSelectedLeave] = useState<DoctorLeave | null>(null);

  // =========================
  // DELETE CLICK
  // =========================

  const handleDeleteClick = (leave: DoctorLeave) => {
    setSelectedLeave(leave);
    setIsDeleteModalOpen(true);
  };

  // =========================
  // CONFIRM DELETE
  // =========================

  const handleConfirmDelete = () => {
    if (!selectedLeave) return;

    onDelete(selectedLeave);

    setIsDeleteModalOpen(false);
    setSelectedLeave(null);
  };
  // =========================
  // CLOSE MODAL
  // =========================

  const handleCloseDeleteModal = () => {
    if (isDeleting) {
      return;
    }

    setIsDeleteModalOpen(false);
    setSelectedLeave(null);
  };

  const columns: TableColumn<DoctorLeave>[] = [
    {
      key: "startDate",
      header: "Start Date",
      render: (row) => formateDate(row.startDate),
    },

    {
      key: "endDate",
      header: "End Date",
      render: (row) => formateDate(row.endDate),
    },

    {
      key: "reason",
      header: "Reason",
      render: (row) => row.reason,
    },

    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(row)}
            disabled={isDeleting}
            title="Edit"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() => handleDeleteClick(row)}
            disabled={isDeleting}
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={leaves}
        columns={columns}
        rowKey={(row) => row.id}
        emptyState={<div className="doctor-request-empty">No leaves found</div>}
      />

      <DeleteLeaveConfirmModal
        isOpen={isDeleteModalOpen}
        leaveReason={selectedLeave?.reason}
        isDeleting={isDeleting}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default DoctorLeaveTable;
