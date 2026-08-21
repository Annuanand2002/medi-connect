import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import DataTable from "@/components/dataTable";
import type { TableColumn } from "@/types/dataTable";

import type { DoctorBlock } from "../types/doctorBlock";
import DeleteBlockConfirmModal from "./deleteDoctorBlcok.Mdoal";
import { formateDate } from "@/utils/formateDate";

interface DoctorBlockTableProps {
  blocks: DoctorBlock[];
  onEdit: (block: DoctorBlock) => void;
  onDelete: (block: DoctorBlock) => void;
  isDeleting?: boolean;
}

const DoctorBlockTable = ({
  blocks,
  onEdit,
  onDelete,
  isDeleting = false,
}: DoctorBlockTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedBlock, setSelectedBlock] = useState<DoctorBlock | null>(null);

  // =========================
  // DELETE CLICK
  // =========================

  const handleDeleteClick = (block: DoctorBlock) => {
    setSelectedBlock(block);
    setIsDeleteModalOpen(true);
  };

  // =========================
  // CONFIRM DELETE
  // =========================

  const handleConfirmDelete = () => {
    if (!selectedBlock) return;

    onDelete(selectedBlock);

    setIsDeleteModalOpen(false);
    setSelectedBlock(null);
  };
  // =========================
  // CLOSE MODAL
  // =========================

  const handleCloseDeleteModal = () => {
    if (isDeleting) {
      return;
    }

    setIsDeleteModalOpen(false);
    setSelectedBlock(null);
  };

  const columns: TableColumn<DoctorBlock>[] = [
    {
      key: "date",
      header: "Date",
      render: (row) => formateDate(row.date),
    },
    {
      key: "startTime",
      header: "Start Time",
      render: (row) => row.startTime,
    },

    {
      key: "endTime",
      header: "End Time",
      render: (row) => row.endTime,
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
        data={blocks}
        columns={columns}
        rowKey={(row) => row.id}
        emptyState={<div className="doctor-request-empty">No blocks found</div>}
      />

      <DeleteBlockConfirmModal
        isOpen={isDeleteModalOpen}
        blockReason={selectedBlock?.reason}
        isDeleting={isDeleting}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default DoctorBlockTable;
