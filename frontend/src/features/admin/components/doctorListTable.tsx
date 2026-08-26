import type { TableColumn } from "@/types/dataTable";
import type { Doctor } from "../types/doctorList";
import { formateDate } from "@/utils/formateDate";
import { ArrowUpRight, Code, Mail, UserRound } from "lucide-react";
import DataTable from "@/components/dataTable";
import { useAppDispatch } from "@/hooks/hooks";
import { toggleDoctorStatusThunk } from "../redux/toggleDoctorStatus.thunk";
import { useState } from "react";
import DoctorStatusModal from "./statusModa";

interface DoctorTableProps {
  requests: Doctor[];
}

const DoctorTable = ({ requests }: DoctorTableProps) => {
  const dispatch = useAppDispatch();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleConfirmStatusChange = async () => {
    if (!selectedDoctor) return;

    try {
      setIsUpdating(true);

      await dispatch(toggleDoctorStatusThunk(selectedDoctor.id)).unwrap();

      setSelectedDoctor(null);
    } catch (error) {
      console.error("Failed to update doctor status:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  const columns: TableColumn<Doctor>[] = [
    {
      key: "doctor",
      header: "Doctor",

      render: (request) => (
        <div className="doctor-cell">
          <div className="doctor-avatar">
            {request.fullName.charAt(0).toUpperCase()}
          </div>

          <div className="doctor-info">
            <strong>{request.fullName}</strong>
            <span>
              <Code size={12} />
              {request.doctorCode}
            </span>
            <span>
              <Mail size={12} />
              {request.email}
            </span>
          </div>
        </div>
      ),
    },

    {
      key: "department",
      header: "Department",

      render: (request) => (
        <span className="doctor-specialization">{request.department}</span>
      ),
    },

    {
      key: "experience",
      header: "Experience",

      render: (request) => (
        <span className="doctor-experience">
          {request.experience}

          <small>years</small>
        </span>
      ),
    },

    {
      key: "createdAt",
      header: "Joined",

      render: (request) => (
        <span className="doctor-date">{formateDate(request.createdAt)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",

      render: (request) => (
        <span className="doctor-specialization">{request.status}</span>
      ),
    },

    {
      key: "action",
      header: "Action",
      className: "doctor-action-heading",

      render: (request) => (
        <div className="doctor-action-cell">
          <button
            type="button"
            onClick={() => setSelectedDoctor(request)}
            className="doctor-view-buttons"
          >
            <span>{request.status === "BLOCKED" ? "ACTIVE" : "BLOCK"}</span>

            <ArrowUpRight size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={requests}
        columns={columns}
        rowKey={(request) => request.id}
        emptyState={
          <div className="doctor-request-empty">
            <div className="doctor-request-empty-icon">
              <UserRound size={23} />
            </div>

            <span>NO APPLICATIONS</span>

            <h3>No doctor requests found</h3>

            <p>
              Try adjusting your search or status filter to find what you're
              looking for.
            </p>
          </div>
        }
      />

      <DoctorStatusModal
        isOpen={selectedDoctor !== null}
        doctorName={selectedDoctor?.fullName ?? ""}
        action={selectedDoctor?.status === "BLOCKED" ? "ACTIVE" : "BLOCK"}
        isLoading={isUpdating}
        onClose={() => setSelectedDoctor(null)}
        onConfirm={handleConfirmStatusChange}
      />
    </>
  );
};

export default DoctorTable;
