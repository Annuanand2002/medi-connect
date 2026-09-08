import type { TableColumn } from "@/types/dataTable";
import type { Doctor } from "../type/getDoctorList";
import { ArrowUpRight, Code, Mail, UserRound } from "lucide-react";
import DataTable from "@/components/dataTable";
import "@/styles/patient/doctorListPage.css";

interface DoctorTableProps {
  requests: Doctor[];
  onBook: (doctorId: string) => void;
}

const DoctorListTable = ({ requests, onBook }: DoctorTableProps) => {
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
            <strong>Dr.{request.fullName}</strong>

            <span>
              <Code size={12} />
              {request.doctorCode}
            </span>
          </div>
        </div>
      ),
    },
    {
      key : "email",
      header : "Email",
      render : (request)=>(
        <span>
          <Mail size={12} />
          {request.email}</span>
      )
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
          <small> years</small>
        </span>
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
            className="doctor-view-buttons"
            onClick={() => onBook(request.id)}
          >
            Book Appointment
            <ArrowUpRight size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={requests}
      columns={columns}
      rowKey={(request) => request.id}
      emptyState={
        <div className="doctor-request-empty">
          <div className="doctor-request-empty-icon">
            <UserRound size={23} />
          </div>

          <span>NO DOCTORS</span>

          <h3>No doctors found</h3>

          <p>Try adjusting your search or department filter.</p>
        </div>
      }
    />
  );
};

export default DoctorListTable;
