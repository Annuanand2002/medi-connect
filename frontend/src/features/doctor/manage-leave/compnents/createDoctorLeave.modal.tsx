import { useState } from "react";
import { createDoctorLeaveSchema } from "../service/doctorLeave.modal";

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
        {/* HEADER */}

        <div className="modal-header">
          <h2>Apply for Leave</h2>

          <button type="button" onClick={handleClose} disabled={isLoading}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* BACKEND ERROR */}

          {backendError && <div className="form-error">{backendError}</div>}

          {/* START DATE */}

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

          {/* END DATE */}

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

          {/* REASON */}

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

          {/* BUTTONS */}

          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Apply Leave"}
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

export default CreateDoctorLeaveModal;
