import { useState } from "react";
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
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          width: "500px",
          maxWidth: "90%",
          borderRadius: "8px",
        }}
      >
        <div className="modal-header">
          <h2>Update Leave</h2>

          <button type="button" onClick={handleClose} disabled={isLoading}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {backendError && <div className="form-error">{backendError}</div>}

          <div>
            <label>Start Date</label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={isLoading}
            />

            {errors.startDate && (
              <p className="form-error">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label>End Date</label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={isLoading}
            />

            {errors.endDate && <p className="form-error">{errors.endDate}</p>}
          </div>

          <div>
            <label>Reason</label>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for leave"
              rows={4}
              disabled={isLoading}
            />

            {errors.reason && <p className="form-error">{errors.reason}</p>}
          </div>

          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Leave"}
            </button>

            <button type="button" onClick={handleClose} disabled={isLoading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDoctorLeaveModal;
