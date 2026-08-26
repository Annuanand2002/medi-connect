import { useEffect } from "react";
import "@/styles/patient/appointmnetConfirmed.css"
import { useLocation, useNavigate } from "react-router-dom";

import PatientLayout from "@/layout/PatientLayout";
import type { CreatedAppointment } from "../type/createAppointment.type";

interface LocationState {
  appointment?: CreatedAppointment;
}

const AppointmentConfirmedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;

  const appointment = state?.appointment;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/patient/dashboard", {
        replace: true,
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PatientLayout
      title="Appointment Confirmed"
      subtitle="Your appointment has been successfully booked."
    >
      <div className="appointment-confirmed-page">
        <div className="appointment-confirmed-card">
          <div className="appointment-success-icon">✓</div>

          <h2>Appointment Confirmed!</h2>

          <p>Your appointment has been successfully booked.</p>

          {appointment && (
            <div className="appointment-confirmed-details">
              <div>
                <span>Appointment Code</span>
                <strong>{appointment.appointmentCode}</strong>
              </div>

              <div>
                <span>Date</span>
                <strong>
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </strong>
              </div>

              <div>
                <span>Time</span>
                <strong>
                  {appointment.startTime} - {appointment.endTime}
                </strong>
              </div>
            </div>
          )}

          <p className="redirect-message">
            Redirecting to dashboard in 5 seconds...
          </p>
        </div>
      </div>
    </PatientLayout>
  );
};

export default AppointmentConfirmedPage;
