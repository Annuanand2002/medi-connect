import DoctorRequestForm from "../../../features/doctor/components/doctorRequestForm";
import type { DoctorRequestFormData } from "../types/doctorRequest.type";
import logo from "../../../assets/logo/mediconnect-logo.jpeg";
import robot from "../../../assets/images/robot.png";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { applyDoctorRequestThunk } from "../../../features/doctor/redux/doctorRequest.thunk";
import { Link } from "react-router-dom";
import { buildDoctorRequestFormData } from "../../../features/doctor/utils/doctorRequestFormData";

import "@/styles/doctor/doctorReq.css";

const DoctorRequestPage = () => {
  const dispatch = useAppDispatch();

  const { loading, success, message } = useAppSelector(
    (state) => state.doctorRequest,
  );

  const handleSubmit = async (data: DoctorRequestFormData) => {
    const formData = buildDoctorRequestFormData(data);

    await dispatch(applyDoctorRequestThunk(formData));
  };

  return (
    <main className="doctor-request-page">
      <section className="doctor-request-shell">
        <aside className="doctor-request-banner">
          <div className="doctor-request-banner-grid" />
          <div className="doctor-request-banner-orb doctor-request-banner-orb-one" />
          <div className="doctor-request-banner-orb doctor-request-banner-orb-two" />

          <div className="doctor-request-brand">
            <img src={logo} alt="MediConnect" className="doctor-request-logo" />

            <div>
              <strong>MediConnect</strong>
              <span>Doctor Portal</span>
            </div>
          </div>

          <div className="doctor-request-robot-wrap">
            <div className="doctor-request-robot-halo" />
            <span className="doctor-request-orbit doctor-request-orbit-one" />
            <span className="doctor-request-orbit doctor-request-orbit-two" />

            <img src={robot} alt="" className="doctor-request-robot" />
          </div>

          <div className="doctor-request-trust-card">
            <span className="doctor-request-trust-icon">✓</span>

            <div>
              <strong>Built for trusted care</strong>
              <p>
                Verified doctors, secure access, and connected consultations.
              </p>
            </div>
          </div>
        </aside>

        <section className="doctor-request-panel">
          <div className="doctor-request-form-container">
            <header className="doctor-request-header">
              <span className="doctor-request-form-label">
                DOCTOR APPLICATION
              </span>

              <h2>Start your application.</h2>

              <p>
                Tell us about your professional background. Our team will review
                your application shortly.
              </p>
            </header>

            {message && (
              <div
                className={`doctor-request-alert ${
                  success
                    ? "doctor-request-alert-success"
                    : "doctor-request-alert-error"
                }`}
                role="alert"
              >
                <span className="doctor-request-alert-icon">
                  {success ? "✓" : "!"}
                </span>

                <p>{message}</p>
              </div>
            )}

            <DoctorRequestForm loading={loading} onSubmit={handleSubmit} />

            <footer className="doctor-request-login">
              <p>
                Already have an account? <Link to="/doctor/login">Sign in</Link>
              </p>
            </footer>
          </div>
        </section>
      </section>
    </main>
  );
};

export default DoctorRequestPage;
