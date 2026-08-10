import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import DoctorRequestForm from "../components/doctorRequestForm";

import { getRetryDoctorRequestThunk } from "../redux/retryDoctor.thunk";
import { retryDoctorRequestThunk } from "../redux/retrySubmit.thunk";

import type { DoctorRequestFormData } from "../types/doctorRequest.type";

const RetryDoctorPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [successMessage, SetSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { loading, retryRequest, error } = useAppSelector(
    (state) => state.retryDoctor,
  );

  useEffect(() => {
    if (!token) {
      navigate("/doctor/login");
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
    formData.append("specialization", data.specialization);
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
      SetSuccessMessage(resultAction.payload.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!retryRequest) {
    return <div>No application found.</div>;
  }

  return (
    <>
      {successMessage && (
        <div className="mb-4 rounded-md border border-green-300 bg-green-100 p-3 text-green-700">
          {successMessage}
        </div>
      )}

      <DoctorRequestForm
        loading={loading}
        initialValues={{
          fullName: retryRequest.fullName,
          email: retryRequest.email,
          dateOfBirth: retryRequest.dateOfBirth,
          qualification: retryRequest.qualification,
          specialization: retryRequest.specialization,
          experience: retryRequest.experience,
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default RetryDoctorPage;
