import { useState } from "react";
import { createDoctorBlockSchema } from "../types/createDoctorModal";

interface CreateDoctorBlockData {
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
}

interface CreateDoctorBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateDoctorBlockData) => Promise<string | null>;
  isLoading: boolean;
}

const CreateDoctorBlockModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: CreateDoctorBlockModalProps) => {
  const [date, setDate] = useState("");

  const [startTime, setStartTime] = useState("");

  const [endTime, setEndTime] = useState("");

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

    const validation = createDoctorBlockSchema.safeParse({
      date,
      startTime,
      endTime,
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

    const data: CreateDoctorBlockData = {
      date: validation.data.date,
      startTime: validation.data.startTime,
      endTime: validation.data.endTime,
      reason: validation.data.reason,
    };

    const error = await onSubmit(data);

    if (error) {
      setBackendError(error);
    }
  };

  const handleClose = () => {
    if (isLoading) {
      return;
    }

    setDate("");
    setStartTime("");
    setEndTime("");
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
          <h2>Block Doctor Availability</h2>

          <button type="button" onClick={handleClose} disabled={isLoading}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* BACKEND ERROR */}

          {backendError && <div className="form-error">{backendError}</div>}

          {/* DATE */}

          <div>
            <label htmlFor="block-date">Date</label>

            <input
              id="block-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={isLoading}
            />

            {errors.date && <p className="form-error">{errors.date}</p>}
          </div>

          {/* START TIME */}

          <div>
            <label htmlFor="block-start-time">Start Time</label>

            <input
              id="block-start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              disabled={isLoading}
            />

            {errors.startTime && (
              <p className="form-error">{errors.startTime}</p>
            )}
          </div>

          {/* END TIME */}

          <div>
            <label htmlFor="block-end-time">End Time</label>

            <input
              id="block-end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              disabled={isLoading}
            />

            {errors.endTime && <p className="form-error">{errors.endTime}</p>}
          </div>

          {/* REASON */}

          <div>
            <label htmlFor="block-reason">Reason</label>

            <textarea
              id="block-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for block"
              rows={4}
              disabled={isLoading}
            />

            {errors.reason && <p className="form-error">{errors.reason}</p>}
          </div>

          {/* BUTTONS */}

          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Blocking..." : "Block Time"}
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

export default CreateDoctorBlockModal;
