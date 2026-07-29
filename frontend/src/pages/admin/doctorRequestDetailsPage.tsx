import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImagePreviewModal from "@/shared/components/ImagePreviewModal";
import StatusBadge from "../../features/admin/components/StatusBadge";
import DocumentCard from "../../features/admin/components/DocumentCard";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getDoctorRequestDetailsThunk } from "../../features/admin/redux/doctorRequestDetailsPage.thunk";
import { clearDoctorRequestDetails } from "../../features/admin/redux/doctorRequestDetailsPage.slice";
import AdminLayout from "../../shared/layouts/AdminLayout";
import { formateDate } from "@/shared/utils/formateDate";
import { getDepartmentsThunk } from "../../features/admin/redux/department.thunk";
import ApproveDoctorModal from "../../features/admin/components/approveDoctorModal";
import RejectDoctorModal from "../../features/admin/components/RejectDoctorModal";

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
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  console.log(showModal);
  useEffect(() => {
    dispatch(getDepartmentsThunk());
  }, [dispatch]);
  const { departments } = useAppSelector((state) => state.department);
  console.log(departments, "fdhuiegf");
  useEffect(() => {
    console.log("dep", departments);
  }, [departments]);

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
    console.log("imageURL", imageUrl);
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
      <AdminLayout title="Doctor Request" subtitle="Loading...">
        <div className="rounded-xl bg-white p-8 text-center shadow">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Doctor Request" subtitle="Error">
        <div className="rounded-xl bg-red-50 p-8 text-center text-red-600 shadow">
          {error}
        </div>
      </AdminLayout>
    );
  }

  if (!request) {
    return (
      <AdminLayout title="Doctor Request" subtitle="Not Found">
        <div className="rounded-xl bg-white p-8 text-center shadow">
          Doctor request not found.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Doctor Request Details"
      subtitle="Review doctor application"
    >
      <Link
        to="/admin/doctor-request"
        className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        ← Back to Requests
      </Link>

      <div className="rounded-xl bg-white p-8 shadow">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{request.fullName}</h2>

          <StatusBadge status={request.status} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Full Name</p>
            <p className="font-medium">{request.fullName}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-medium">{request.email}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Date of Birth</p>
            <p className="font-medium">{formateDate(request.dateOfBirth)}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Qualification</p>
            <p className="font-medium">{request.qualification}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Specialization</p>
            <p className="font-medium">{request.specialization}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Experience</p>
            <p className="font-medium">{request.experience} Years</p>
          </div>
        </div>

        <hr className="my-8" />

        <h3 className="mb-6 text-xl font-semibold">Documents</h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DocumentCard
            title="Profile Image"
            url={request.profileImg}
            type="image"
            onImageClick={handleImagePreview}
          />

          <DocumentCard
            title="Government ID"
            url={request.governmentId}
            type="pdf"
          />

          <DocumentCard
            title="Medical License"
            url={request.medicalLicense}
            type="pdf"
          />

          {request.degreeCertificates.map((certificate, index) => (
            <DocumentCard
              key={certificate}
              title={`Degree Certificate ${index + 1}`}
              url={certificate}
              type="pdf"
            />
          ))}
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setShowRejectModal(true)}
            className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
          >
            Reject
          </button>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
          >
            Approve
          </button>
        </div>
      </div>
      <RejectDoctorModal
        open={showRejectModal}
        doctorRequestId={request.id}
        onClose={() => setShowRejectModal(false)}
      />
      <ApproveDoctorModal
        open={showModal}
        doctorRequestId={request.id}
        onClose={() => setShowModal(false)}
      />
      <ImagePreviewModal
        isOpen={preview.isOpen}
        imageUrl={preview.imageUrl}
        title={preview.title}
        onClose={closePreview}
      />
    </AdminLayout>
  );
};

export default DoctorRequestDetailsPage;
