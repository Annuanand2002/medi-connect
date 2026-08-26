import type { TableColumn } from "@/types/dataTable";
import {
  CalendarDays,
  Clock,
  Code,
  Stethoscope,
  UserRound,
} from "lucide-react";

import DataTable from "@/components/dataTable";
import type { PatientAppointment } from "../type/appointmentList";

interface AppointmentHistoryTableProps {
  appointments: PatientAppointment[];
}

const AppointmentHistoryTable = ({
  appointments,
}: AppointmentHistoryTableProps) => {
  const columns: TableColumn<PatientAppointment>[] = [
    {
      key: "doctor",
      header: "Doctor",

      render: (appointment) => (
        <div className="doctor-cell">
          <div className="doctor-avatar">
            {appointment.doctorName.charAt(0).toUpperCase()}
          </div>

          <div className="doctor-info">
            <strong>{appointment.doctorName}</strong>

            <span>
              <Code size={12} />
              {appointment.doctorCode}
            </span>
          </div>
        </div>
      ),
    },

    {
      key: "department",
      header: "Department",

      render: (appointment) => (
        <span className="doctor-specialization">{appointment.department}</span>
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
      key: "date",
      header: "Date",

      render: (appointment) => (
        <span className="appointment-date">
          <CalendarDays size={14} />

          {new Date(appointment.appointmentDate).toLocaleDateString()}
        </span>
      ),
    },

    {
      key: "time",
      header: "Time",

      render: (appointment) => (
        <span className="appointment-time">
          <Clock size={14} />
          {appointment.startTime} - {appointment.endTime}
        </span>
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

          <p>Your appointment history will appear here.</p>
        </div>
      }
    />
  );
};

export default AppointmentHistoryTable;
