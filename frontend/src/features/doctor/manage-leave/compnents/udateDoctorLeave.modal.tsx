import { useState } from "react";
import "@/styles/doctor/addLeaveModal.css"

import { createDoctorLeaveSchema } from "../service/doctorLeave.modal";
import type { DoctorLeave } from "../types/doctorLeave.type";

interface UpdateDoctorLeaveData {
  startDate: string;
  endDate: string;
  reason: string;
}

interface UpdateDoctorLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  leave: DoctorLeave | null;
  onSubmit: (id: string, data: UpdateDoctorLeaveData) => Promise<string | null>;
  isLoading: boolean;
}

const UpdateDoctorLeaveModal = ({
  isOpen,
  onClose,
  leave,
  onSubmit,
  isLoading,
}: UpdateDoctorLeaveModalProps) => {
  const [startDate, setStartDate] = useState(
    leave?.startDate.slice(0, 10) ?? "",
  );

  const [endDate, setEndDate] = useState(leave?.endDate.slice(0, 10) ?? "");

  const [reason, setReason] = useState(leave?.reason ?? "");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [backendError, setBackendError] = useState("");

  if (!isOpen || !leave) {
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

    const data: UpdateDoctorLeaveData = {
      startDate: validation.data.startDate,
      endDate: validation.data.endDate,
      reason: validation.data.reason,
    };

    const error = await onSubmit(leave.id, data);

    if (error) {
      setBackendError(error);
    }
  };

  const handleClose = () => {
    if (isLoading) return;

    setErrors({});
    setBackendError("");

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* HEADER */}
        <div className="modal-header">
          <h2>Update Leave</h2>

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
          {backendError && <div className="form-error">{backendError}</div>}

          {/* START DATE */}
          <div className="form-group">
            <label htmlFor="update-leave-start-date">Start Date</label>

            <input
              id="update-leave-start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={isLoading}
            />

            {errors.startDate && (
              <p className="form-error">{errors.startDate}</p>
            )}
          </div>

          {/* END DATE */}
          <div className="form-group">
            <label htmlFor="update-leave-end-date">End Date</label>

            <input
              id="update-leave-end-date"
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={isLoading}
            />

            {errors.endDate && <p className="form-error">{errors.endDate}</p>}
          </div>

          {/* REASON */}
          <div className="form-group">
            <label htmlFor="update-leave-reason">Reason</label>

            <textarea
              id="update-leave-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for leave"
              rows={4}
              disabled={isLoading}
            />

            {errors.reason && <p className="form-error">{errors.reason}</p>}
          </div>

          {/* BUTTONS */}
          <div className="modal-actions">
            <button
              type="submit"
              className="modal-submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Leave"}
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

export default UpdateDoctorLeaveModal;
