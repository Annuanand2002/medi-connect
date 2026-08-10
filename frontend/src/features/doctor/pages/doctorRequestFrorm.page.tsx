import DoctorRequestForm from "../../../features/doctor/components/doctorRequestForm";
import type { DoctorRequestFormData } from "../types/doctorRequest.type";
import logo from "../../../assets/logo/mediconnect-logo.jpeg";
import robot from "../../../assets/images/robot.png"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { applyDoctorRequestThunk } from "../../../features/doctor/redux/doctorRequest.thunk";
import { Link } from "react-router-dom";
import { buildDoctorRequestFormData } from "../../../features/doctor/utils/doctorRequestFormData";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl shadow-blue-900/10">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Dark Blue Section */}
          <div className="relative flex flex-col bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-8 md:p-10 text-white min-h-[600px]">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>

            {/* Top Left - Logo and Brand */}
            <div className="relative z-10 flex items-center gap-3">
              <img
                src={logo}
                alt="Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-lg"
              />
              <span className="text-2xl font-bold tracking-tight">
                MediConnect
              </span>
            </div>

            {/* Middle - Robot Image */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-8">
              <img
                src={robot}
                alt="Robot"
                className="w-full max-w-sm drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Bottom - Text Content */}
            <div className="relative z-10 text-center space-y-3">
              <p className="text-2xl font-semibold tracking-wide">
                Welcome Doctor
              </p>
              <p className="text-blue-100 max-w-sm mx-auto leading-relaxed">
                Start your consultation, appointments and AI assistance by
                filling the form.
              </p>
              <div className="inline-block bg-blue-600/30 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium text-blue-50 mt-2 border border-blue-500/30">
                Your health, simplified
              </div>
            </div>
          </div>

          {/* Right Side - White Section */}
          <div className="bg-white p-8 md:p-10">
            <div className="mb-8">
              <div className="inline-block px-4 py-1 bg-blue-50 rounded-full text-blue-700 text-xs font-semibold tracking-wider uppercase mb-3 border border-blue-100">
                Get Started
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Doctor Registration
              </h1>
              <p className="mt-2 text-gray-500">
                Apply to join the MediConnect platform.
              </p>
            </div>

            {message && (
              <div
                className={`mb-6 rounded-xl border px-5 py-4 text-sm font-medium ${
                  success
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            <DoctorRequestForm loading={loading} onSubmit={handleSubmit} />

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/doctor/login"
                  className="font-semibold text-blue-700 hover:text-blue-800 transition-colors duration-200 hover:underline underline-offset-2"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRequestPage;
