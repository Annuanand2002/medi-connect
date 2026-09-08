import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RefreshCw, ShieldCheck } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import DoctorRequestForm from "../components/doctorRequestForm";

import { getRetryDoctorRequestThunk } from "../redux/retryDoctor.thunk";
import { retryDoctorRequestThunk } from "../redux/retrySubmit.thunk";
import type { DoctorRequestFormData } from "../types/doctorRequest.type";
import logo from "@/assets/logo/mediconnect-logo.jpeg";
import robot from "@/assets/images/robot.png";
import "@/styles/doctor/retryDoctorRequest.css";

const RetryDoctorPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [successMessage, setSuccessMessage] = useState("");

  const { loading, retryRequest, error } = useAppSelector(
    (state) => state.retryDoctor,
  );

  useEffect(() => {
    if (!token) {
      navigate("/doctor/login", {
        replace: true,
      });

      return;
    }

    dispatch(getRetryDoctorRequestThunk(token));
  }, [dispatch, token, navigate]);

  const handleSubmit = async (data: DoctorRequestFormData) => {
    if (!token) return;

    const formData = new FormData();

    formData.append("token", token);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("qualification", data.qualification);
    formData.append("specialization", data.department);
    formData.append("experience", data.experience.toString());

    if (data.profileImg?.length > 0) {
      formData.append("profileImg", data.profileImg[0]);
    }

    if (data.governmentId?.length > 0) {
      formData.append("governmentId", data.governmentId[0]);
    }

    if (data.medicalLicense?.length > 0) {
      formData.append("medicalLicense", data.medicalLicense[0]);
    }

    if (data.degreeCertificates?.length > 0) {
      Array.from(data.degreeCertificates).forEach((file) => {
        formData.append("degreeCertificates", file);
      });
    }

    const resultAction = await dispatch(retryDoctorRequestThunk(formData));

    if (retryDoctorRequestThunk.fulfilled.match(resultAction)) {
      setSuccessMessage(resultAction.payload.message);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="retry-doctor-status">
          <RefreshCw size={26} className="retry-doctor-spinner" />

          <h2>Loading your application</h2>
          <p>Please wait while we retrieve your submitted details.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="retry-doctor-status retry-doctor-status-error">
          <div className="retry-doctor-status-icon">!</div>

          <h2>We couldn’t load your application</h2>
          <p>{error}</p>
        </div>
      );
    }

    if (!retryRequest) {
      return (
        <div className="retry-doctor-status">
          <div className="retry-doctor-status-icon">i</div>

          <h2>No application found</h2>
          <p>
            We couldn’t find an application associated with this retry link.
          </p>
        </div>
      );
    }

    return (
      <>
        <header className="retry-doctor-header">
          <span>APPLICATION UPDATE</span>

          <h1>Update your application.</h1>

          <p>
            Review your details, make the requested changes, and submit your
            application again for verification.
          </p>
        </header>

        {successMessage && (
          <div className="retry-doctor-alert" role="status">
            <span>✓</span>
            <p>{successMessage}</p>
          </div>
        )}

        <DoctorRequestForm
          loading={loading}
          initialValues={{
            fullName: retryRequest.fullName,
            email: retryRequest.email,
            dateOfBirth: retryRequest.dateOfBirth,
            qualification: retryRequest.qualification,
            department: retryRequest.department,
            experience: retryRequest.experience,
          }}
          onSubmit={handleSubmit}
        />

        <div className="retry-doctor-security-note">
          <ShieldCheck size={14} strokeWidth={1.8} />

          <span>Your updated documents are securely handled.</span>
        </div>
      </>
    );
  };

  return (
    <main className="retry-doctor-page">
      <section className="retry-doctor-shell">
        <aside className="retry-doctor-banner">
          <div className="retry-doctor-banner-grid" />
          <div className="retry-doctor-banner-orb retry-doctor-banner-orb-one" />
          <div className="retry-doctor-banner-orb retry-doctor-banner-orb-two" />

          <div className="retry-doctor-brand">
            <img src={logo} alt="MediConnect" />

            <div>
              <strong>MediConnect</strong>
              <span>Doctor Portal</span>
            </div>
          </div>

          <div className="retry-doctor-banner-copy">
            <span>APPLICATION REVIEW</span>

            <h1>
              Your next chapter
              <em> in care.</em>
            </h1>

            <p>
              Keep your professional profile current and take the next step
              toward joining the MediConnect care network.
            </p>
          </div>

          <div className="retry-doctor-robot-wrap">
            <div className="retry-doctor-robot-halo" />
            <span className="retry-doctor-orbit retry-doctor-orbit-one" />
            <span className="retry-doctor-orbit retry-doctor-orbit-two" />

            <img src={robot} alt="" className="retry-doctor-robot" />
          </div>

          <div className="retry-doctor-banner-card">
            <span>✓</span>

            <div>
              <strong>Simple and secure review</strong>
              <p>Update your details whenever requested.</p>
            </div>
          </div>
        </aside>

        <section className="retry-doctor-form-panel">
          <div className="retry-doctor-form-container">{renderContent()}</div>
        </section>
      </section>
    </main>
  );
};

export default RetryDoctorPage;
