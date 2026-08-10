import { useState } from "react";
import {
  AlertTriangle,
  Send,
  X,
} from "lucide-react";

import { useAppDispatch } from "@/hooks/hooks";

import { rejectDoctorThunk } from "../redux/rejectDoctorThunk";

interface RejectDoctorModalProps {
  open: boolean;
  doctorRequestId: string;
  onClose: () => void;
  onSuccess :()=>void;
}

const RejectDoctorModal = ({
  open,
  doctorRequestId,
  onClose,
  onSuccess
}: RejectDoctorModalProps) => {
  const dispatch = useAppDispatch();

  const [reason, setReason] =
    useState("");

  if (!open) {
    return null;
  }

  const handleReject = async () => {
    if (!reason.trim()) {
      return;
    }

    const resultAction = await dispatch(
      rejectDoctorThunk({
        doctorRequestId,
        rejectReason: reason.trim(),
      }),
    );

    if (
      rejectDoctorThunk.fulfilled.match(
        resultAction,
      )
    ) {
      setReason("");
      onSuccess()
      onClose();
    }
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <div
      className="doctor-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reject-doctor-title"
    >
      <div className="doctor-modal">

        <div className="doctor-modal-header">

          <div className="doctor-modal-heading">

            <div className="doctor-modal-icon doctor-modal-icon-danger">
              <AlertTriangle size={18} />
            </div>

            <div>
              <span>
                APPLICATION REVIEW
              </span>

              <h2 id="reject-doctor-title">
                Reject Application
              </h2>
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


        <div className="doctor-modal-body">

          <div className="doctor-rejection-notice">

            <AlertTriangle size={17} />

            <p>
              The rejection reason will be included
              in the email sent to the doctor.
            </p>

          </div>


          <div className="doctor-modal-field">

            <label>
              Rejection Reason
            </label>

            <textarea
              rows={5}
              value={reason}
              onChange={(event) =>
                setReason(
                  event.target.value,
                )
              }
              placeholder="Explain why this application is being rejected..."
            />

            <span className="doctor-field-hint">
              Please provide a clear and professional
              explanation.
            </span>

          </div>

        </div>


        <div className="doctor-modal-footer">

          <button
            type="button"
            onClick={handleClose}
            className="doctor-modal-cancel"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!reason.trim()}
            onClick={handleReject}
            className="doctor-modal-confirm doctor-modal-confirm-danger"
          >
            <Send size={15} />
            Reject Application
          </button>

        </div>

      </div>
    </div>
  );
};

export default RejectDoctorModal;