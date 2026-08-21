import { ArrowUpRight, Mail, UserRound } from "lucide-react";

import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import type { DoctorRequest } from "../types/doctorRequestList.types";

import { formateDate } from "@/utils/formateDate";
import type { TableColumn } from "@/types/dataTable";
import DataTable from "@/components/dataTable";

interface DoctorRequestTableProps {
  requests: DoctorRequest[];
}

const DoctorRequestTable = ({ requests }: DoctorRequestTableProps) => {
  const columns: TableColumn<DoctorRequest>[] = [
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
      header: "Requested",

      render: (request) => (
        <span className="doctor-date">{formateDate(request.createdAt)}</span>
      ),
    },

    {
      key: "status",
      header: "Status",

      render: (request) => <StatusBadge status={request.status} />,
    },

    {
      key: "action",
      header: "Action",
      className: "doctor-action-heading",

      render: (request) => (
        <div className="doctor-action-cell">
          <Link
            to={`/admin/doctor-request/${request.id}`}
            className="doctor-view-button"
          >
            <span>View Details</span>

            <ArrowUpRight size={15} />
          </Link>
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

          <span>NO APPLICATIONS</span>

          <h3>No doctor requests found</h3>

          <p>
            Try adjusting your search or status filter to find what you're
            looking for.
          </p>
        </div>
      }
    />
  );
};

export default DoctorRequestTable;
