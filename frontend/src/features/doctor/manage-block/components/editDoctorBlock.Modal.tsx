import { useState } from "react";
import type { DoctorBlock } from "../types/doctorBlock";
import {
  DoctorBlockSchema,
  type DoctorBlockFormData,
} from "../services/doctorBlock.schema";

interface UpdateDoctorBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  block: DoctorBlock | null;
  onSubmit: (id: string, data: DoctorBlockFormData) => Promise<string | null>;
  isLoading: boolean;
}

const UpdateDoctorBlockModal = ({
  isOpen,
  onClose,
  block,
  onSubmit,
  isLoading,
}: UpdateDoctorBlockModalProps) => {
  const [date, setDate] = useState(block?.date.slice(0, 10) ?? "");

  const [startTime, setStartTime] = useState(block?.startTime ?? "");

  const [endTime, setEndTime] = useState(block?.endTime ?? "");

  const [reason, setReason] = useState(block?.reason ?? "");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [backendError, setBackendError] = useState("");

  if (!isOpen || !block) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setBackendError("");

    const validation = DoctorBlockSchema.safeParse({
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

    const data: DoctorBlockFormData = {
      date: validation.data.date,
      startTime: validation.data.startTime,
      endTime: validation.data.endTime,
      reason: validation.data.reason,
    };

    const error = await onSubmit(block.id, data);

    if (error) {
      setBackendError(error);
    }
  };

  const handleClose = () => {
    if (isLoading) {
      return;
    }

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
          <h2>Update Block</h2>

          <button type="button" onClick={handleClose} disabled={isLoading}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {backendError && <div className="form-error">{backendError}</div>}

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

          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Block"}
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

export default UpdateDoctorBlockModal;
