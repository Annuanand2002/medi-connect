import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  GraduationCap,
  Mail,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ImagePreviewModal from "@/components/ImagePreviewModal";
import StatusBadge from "../../../features/admin/components/StatusBadge";
import DocumentCard from "../../../features/admin/components/DocumentCard";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getDoctorRequestDetailsThunk } from "../../../features/admin/redux/doctorRequestDetailsPage.thunk";
import { clearDoctorRequestDetails } from "../../../features/admin/redux/doctorRequestDetailsPage.slice";
import ApproveDoctorModal from "../../../features/admin/components/approveDoctorModal";
import RejectDoctorModal from "../../../features/admin/components/RejectDoctorModal";
import AdminLayout from "../../../layout/AdminLayout";
import { formateDate } from "@/utils/formateDate";
import "@/styles/admin/doctorRequestDetails.css";
import useSignedUrl from "@/hooks/getUrl";

const DoctorRequestDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { loading, request, error } = useAppSelector(
    (state) => state.doctorRequestDetails,
  );

  const [preview, setPreview] = useState({
    isOpen: false,
    imageUrl: "",
    title: "",
  });
  const { signedUrl } = useSignedUrl(request?.profileImg?.key);
  const [showApproveModal, setShowApproveModal] = useState(false);

  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getDoctorRequestDetailsThunk(id));
    }

    return () => {
      dispatch(clearDoctorRequestDetails());
    };
  }, [dispatch, id]);

  const handleImagePreview = (imageUrl: string, title: string) => {
    setPreview({
      isOpen: true,
      imageUrl,
      title,
    });
  };

  const closePreview = () => {
    setPreview({
      isOpen: false,
      imageUrl: "",
      title: "",
    });
  };

  if (loading) {
    return (
      <AdminLayout title="Doctor Request" subtitle="Loading application...">
        <div className="doctor-details-state">
          <div className="doctor-details-loader">
            <span />
            <span />
            <span />
          </div>

          <h3>Loading application</h3>

          <p>Fetching the doctor's application details.</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Doctor Request" subtitle="Unable to load application">
        <div className="doctor-details-state doctor-details-error">
          <div className="doctor-details-state-icon">!</div>

          <h3>Something went wrong</h3>

          <p>{error}</p>

          <Link
            to="/admin/doctor-request"
            className="doctor-details-state-link"
          >
            <ArrowLeft size={15} />
            Back to Requests
          </Link>
        </div>
      </AdminLayout>
    );
  }

  if (!request) {
    return (
      <AdminLayout title="Doctor Request" subtitle="Application not found">
        <div className="doctor-details-state">
          <div className="doctor-details-state-icon">
            <UserRound size={20} />
          </div>

          <h3>Doctor request not found</h3>

          <p>
            This application may have been removed or is no longer available.
          </p>

          <Link
            to="/admin/doctor-request"
            className="doctor-details-state-link"
          >
            <ArrowLeft size={15} />
            Back to Requests
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Doctor Request" subtitle="Review doctor application">
      <div className="doctor-details-page">
        <Link to="/admin/doctor-request" className="doctor-details-back">
          <ArrowLeft size={16} />
          Back to Requests
        </Link>

        <section className="doctor-profile-card">
          <div className="doctor-profile-main">
            <div className="doctor-profile-avatar">
              {signedUrl ? (
                <img
                  src={signedUrl}
                  alt={request.fullName}
                  className="doctor-profile-avatar-image"
                />
              ) : (
                <UserRound size={28} />
              )}
            </div>

            <div className="doctor-profile-info">
              <span className="doctor-profile-eyebrow">DOCTOR APPLICATION</span>

              <h2>{request.fullName}</h2>

              <div className="doctor-profile-meta">
                <span>
                  <Mail size={13} />
                  {request.email}
                </span>

                <span>
                  <Stethoscope size={13} />
                  {request.specialization}
                </span>
              </div>
            </div>
          </div>

          <div className="doctor-profile-status">
            <span className="status-caption">APPLICATION STATUS</span>

            <StatusBadge status={request.status} />
          </div>
        </section>

        <section className="doctor-details-section">
          <div className="doctor-section-heading">
            <div className="doctor-section-icon">
              <UserRound size={18} />
            </div>

            <div>
              <span>APPLICATION INFORMATION</span>

              <h3>Personal & Professional Details</h3>
            </div>
          </div>

          <div className="doctor-info-grid">
            <div className="doctor-info-item">
              <span>Full Name</span>

              <strong>{request.fullName}</strong>
            </div>

            <div className="doctor-info-item">
              <span>Email Address</span>

              <strong>{request.email}</strong>
            </div>

            <div className="doctor-info-item">
              <span>Date of Birth</span>

              <strong>
                <CalendarDays size={14} />
                {formateDate(request.dateOfBirth)}
              </strong>
            </div>

            <div className="doctor-info-item">
              <span>Qualification</span>

              <strong>
                <GraduationCap size={14} />
                {request.qualification}
              </strong>
            </div>

            <div className="doctor-info-item">
              <span>Specialization</span>

              <strong>{request.specialization}</strong>
            </div>

            <div className="doctor-info-item">
              <span>Experience</span>

              <strong>
                {request.experience}
                <small>years</small>
              </strong>
            </div>
          </div>
        </section>

        <section className="doctor-details-section">
          <div className="doctor-section-heading">
            <div className="doctor-section-icon">
              <GraduationCap size={18} />
            </div>

            <div>
              <span>VERIFICATION</span>

              <h3>Submitted Documents</h3>
            </div>
          </div>

          <p className="doctor-section-description">
            Review the documents submitted by the doctor before making your
            decision.
          </p>

          <div className="doctor-documents-grid">
            <DocumentCard
              title="Profile Image"
              fileKey={request.profileImg.key}
              type="image"
              onImageClick={handleImagePreview}
            />

            <DocumentCard
              title="Government ID"
              fileKey={request.governmentId.key}
              type="pdf"
            />

            <DocumentCard
              title="Medical License"
              fileKey={request.medicalLicense.key}
              type="pdf"
            />

            {request.degreeCertificates.map((certificate, index) => (
              <DocumentCard
                key={certificate.key}
                title={`Degree Certificate ${index + 1}`}
                fileKey={certificate.key}
                type="pdf"
              />
            ))}
          </div>
        </section>

        <section className="doctor-decision-card">
          <div className="doctor-decision-content">
            <span>FINAL REVIEW</span>

            <h3>Ready to make a decision?</h3>

            <p>
              Review the submitted information and documents carefully before
              approving or rejecting this application.
            </p>
          </div>

          <div className="doctor-decision-actions">
            <button
              disabled={
                request.status === "APPROVED" || request.status === "REJECTED"
              }
              type="button"
              onClick={() => setShowRejectModal(true)}
              className="doctor-reject-button"
            >
              Reject Application
            </button>

            <button
              disabled={
                request.status === "APPROVED" || request.status === "REJECTED"
              }
              type="button"
              onClick={() => setShowApproveModal(true)}
              className="doctor-approve-button"
            >
              Approve Doctor
            </button>
          </div>
        </section>

        <RejectDoctorModal
          open={showRejectModal}
          doctorRequestId={request.id}
          onClose={() => setShowRejectModal(false)}
          onSuccess={() => {
            dispatch(getDoctorRequestDetailsThunk(request.id));
            setShowRejectModal(false);
          }}
        />

        <ApproveDoctorModal
          open={showApproveModal}
          doctorRequestId={request.id}
          onClose={() => setShowApproveModal(false)}
          onSuccess={() => {
            dispatch(getDoctorRequestDetailsThunk(request.id));
            setShowApproveModal(false);
          }}
        />
        <ImagePreviewModal
          isOpen={preview.isOpen}
          imageUrl={preview.imageUrl}
          title={preview.title}
          onClose={closePreview}
        />
      </div>
    </AdminLayout>
  );
};

export default DoctorRequestDetailsPage;
