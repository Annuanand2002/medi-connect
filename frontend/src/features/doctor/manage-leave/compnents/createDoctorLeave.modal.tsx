import { useState } from "react";
import { createDoctorLeaveSchema } from "../service/doctorLeave.modal";
import "@/styles/doctor/addLeaveModal.css"

interface CreateDoctorLeaveData {
  startDate: string;
  endDate: string;
  reason: string;
}

interface CreateDoctorLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateDoctorLeaveData) => Promise<string | null>;
  isLoading: boolean;
}

const CreateDoctorLeaveModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: CreateDoctorLeaveModalProps) => {
  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const [reason, setReason] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [backendError, setBackendError] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setBackendError("");

    const validation = createDoctorLeaveSchema.safeParse({
      startDate,
      endDate,
      reason,
    });

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};

      validation.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (field) {
          fieldErrors[String(field)] = issue.message;
        }
      });

      setErrors(fieldErrors);

      return;
    }

    const data: CreateDoctorLeaveData = {
      startDate: validation.data.startDate,

      endDate: validation.data.endDate,

      reason: validation.data.reason,
    };

    const error = await onSubmit(data);

    if (error) {
      setBackendError(error);
    }
  };

  const handleClose = () => {
    if (isLoading) return;

    setStartDate("");
    setEndDate("");
    setReason("");
    setErrors({});
    setBackendError("");

    onClose();
  };

return (
  <div className="modal-overlay">
    <div className="modal-container">
      {/* HEADER */}
      <div className="modal-header">
        <h2>Apply for Leave</h2>

        <button
          type="button"
          className="modal-close-button"
          onClick={handleClose}
          disabled={isLoading}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="modal-form">
        {/* BACKEND ERROR */}
        {backendError && (
          <div className="form-error">
            {backendError}
          </div>
        )}

        {/* START DATE */}
        <div className="form-group">
          <label htmlFor="leave-start-date">
            Start Date
          </label>

          <input
            id="leave-start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={isLoading}
          />

          {errors.startDate && (
            <p className="form-error">
              {errors.startDate}
            </p>
          )}
        </div>

        {/* END DATE */}
        <div className="form-group">
          <label htmlFor="leave-end-date">
            End Date
          </label>

          <input
            id="leave-end-date"
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={isLoading}
          />

          {errors.endDate && (
            <p className="form-error">
              {errors.endDate}
            </p>
          )}
        </div>

        {/* REASON */}
        <div className="form-group">
          <label htmlFor="leave-reason">
            Reason
          </label>

          <textarea
            id="leave-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for leave"
            rows={4}
            disabled={isLoading}
          />

          {errors.reason && (
            <p className="form-error">
              {errors.reason}
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="modal-actions">
          <button
            type="submit"
            className="modal-submit-button"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Apply Leave"}
          </button>

          <button
            type="button"
            className="modal-cancel-button"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default CreateDoctorLeaveModal;
