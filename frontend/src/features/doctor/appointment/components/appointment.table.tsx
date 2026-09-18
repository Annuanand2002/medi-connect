import type { TableColumn } from "@/types/dataTable";

import {
  CalendarDays,
  Clock,
  Code,
  Mail,
  Stethoscope,
  UserRound,
} from "lucide-react";

import DataTable from "@/components/dataTable";

import type { DoctorAppointment } from "../types/appointmentHistory";
import { useNavigate } from "react-router-dom";

interface DoctorAppointmentHistoryTableProps {
  appointments: DoctorAppointment[];
}

const DoctorAppointmentHistoryTable = ({
  appointments,
}: DoctorAppointmentHistoryTableProps) => {
    const navigate = useNavigate()
  const handleViewAppointment = (id: string) => {
  navigate(`/doctor/appointment/singlePage/${id}`);
};
  const columns: TableColumn<DoctorAppointment>[] = [
    {
      key: "patient",
      header: "Patient",

      render: (appointment) => (
        <div className="doctor-cell">
          <div className="doctor-avatar">
            {appointment.patientName.charAt(0).toUpperCase()}
          </div>

          <div className="doctor-info">
            <strong>{appointment.patientName}</strong>

            <span>
              <Code size={12} />
              {appointment.patientCode}
            </span>
          </div>
        </div>
      ),
    },


    {
      key: "gender",
      header: "Gender",

      render: (appointment) => (
        <span className="doctor-specialization">{appointment.gender}</span>
      ),
    },

    {
      key: "appointmentCode",
      header: "Appointment",

      render: (appointment) => (
        <span className="appointment-code">
          <Stethoscope size={14} />
          {appointment.appointmentCode}
        </span>
      ),
    },

    {
      key: "dateTime",
      header: "Date & Time",

      render: (appointment) => (
        <div className="appointment-date-time">
          <div className="appointment-date">
            <CalendarDays size={14} />
            <span>
              {new Date(appointment.appointmentDate).toLocaleDateString()}
            </span>
          </div>

          <div className="appointment-time">
            <Clock size={14} />
            <span>
              {appointment.startTime} - {appointment.endTime}
            </span>
          </div>
        </div>
      ),
    },

    {
      key: "status",
      header: "Status",

      render: (appointment) => (
        <span
          className={`appointment-status appointment-status-${appointment.status.toLowerCase()}`}
        >
          {appointment.status}
        </span>
      ),
    },
        {
      key: "view",
      header: "Action",
      render: (appointment) => (
        <button
          onClick={() => handleViewAppointment(appointment.id)}
          className="view-button"
        >
          VIEW
        </button>
      ),
    },
  ];

  return (
    <DataTable
      data={appointments}
      columns={columns}
      rowKey={(appointment) => appointment.id}
      emptyState={
        <div className="doctor-request-empty">
          <div className="doctor-request-empty-icon">
            <UserRound size={23} />
          </div>

          <span>NO APPOINTMENTS</span>

          <h3>No appointments found</h3>

          <p>Your patient appointments will appear here.</p>
        </div>
      }
    />
  );
};

export default DoctorAppointmentHistoryTable;
