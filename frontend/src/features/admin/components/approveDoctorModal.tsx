import { useState } from "react";
import { Check, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { approveDoctorThunk } from "../redux/approveDoctorThunk";

interface ApproveDoctorModalProps {
  open: boolean;
  doctorRequestId: string;
  department: string;
  onClose: () => void;
  onSuccess: () => void;
}

const ApproveDoctorModal = ({
  open,
  doctorRequestId,
  department,
  onClose,
  onSuccess,
}: ApproveDoctorModalProps) => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.doctorRequest);

  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!open) {
    return null;
  }

  const handleApproveClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmApprove = async () => {
    const resultAction = await dispatch(
      approveDoctorThunk({
        doctorRequestId,
      }),
    );

    if (approveDoctorThunk.fulfilled.match(resultAction)) {
      setShowConfirmation(false);
      onSuccess();
      onClose();
    }
  };

  const handleClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div
      className="doctor-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="approve-doctor-title"
    >
      <div className="doctor-modal">
        <div className="doctor-modal-header">
          <div className="doctor-modal-heading">
            <div className="doctor-modal-icon doctor-modal-icon-success">
              <Check size={19} />
            </div>

            <div>
              <span>APPLICATION REVIEW</span>

              <h2 id="approve-doctor-title">Approve Doctor</h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="doctor-modal-close"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="doctor-modal-body">
          {!showConfirmation ? (
            <>
              <p className="doctor-modal-description">
                Review the department selected by the doctor before approving
                the application.
              </p>

              <div className="doctor-modal-field">
                <label>Department</label>

                <div className="doctor-selected-department">{department}</div>
              </div>
            </>
          ) : (
            <>
              <div className="doctor-modal-confirmation">
                <div className="doctor-modal-icon doctor-modal-icon-success">
                  <Check size={19} />
                </div>

                <div>
                  <h3>Are you sure you want to approve?</h3>

                  <p>
                    This will approve the doctor application and create the
                    doctor account.
                  </p>
                </div>
              </div>

              <div className="doctor-modal-field">
                <label>Department</label>

                <div className="doctor-selected-department">{department}</div>
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="doctor-modal-footer">
          {!showConfirmation ? (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="doctor-modal-cancel"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApproveClick}
                className="doctor-modal-confirm doctor-modal-confirm-success"
              >
                <Check size={16} />
                Approve Doctor
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleCancelConfirmation}
                className="doctor-modal-cancel"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmApprove}
                disabled={loading}
                className="doctor-modal-confirm doctor-modal-confirm-success"
              >
                <Check size={16} />

                {loading ? "Approving..." : "Yes, Approve"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApproveDoctorModal;
