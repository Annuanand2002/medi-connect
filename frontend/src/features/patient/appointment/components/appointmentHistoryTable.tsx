import type { TableColumn } from "@/types/dataTable";
import { CalendarDays, Clock, Code, UserRound } from "lucide-react";
import DataTable from "@/components/dataTable";
import type { PatientAppointment } from "../type/appointmentList";
import { useNavigate } from "react-router-dom";

interface AppointmentHistoryTableProps {
  appointments: PatientAppointment[];
}

const AppointmentHistoryTable = ({
  appointments,
}: AppointmentHistoryTableProps) => {
  const navigate = useNavigate()
  const handleViewAppointment = (id: string) => {
  navigate(`/patient/appointment/singlePage/${id}`);
};
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
            <strong>Dr.{appointment.doctorName}</strong>

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

          <p>Your appointment history will appear here.</p>
        </div>
      }
    />
  );
};

export default AppointmentHistoryTable;
