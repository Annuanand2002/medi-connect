import { useState } from "react";
import type {
  CreateDoctorAvailability,
  Week,
} from "../types/addDoctorAvail.type";
import type { DoctorAvailability } from "../types/doctorAvail.type";
import { addAvailabilitySchema } from "../services/avilability.modal";

interface UpdateAvailabilityModalProps {
  isOpen: boolean;
  availability: DoctorAvailability | null;
  onClose: () => void;
  onSubmit: (
    id: string,
    data: CreateDoctorAvailability,
  ) => Promise<string | null>;
  isLoading: boolean;
}

const UpdateAvailabilityModal = ({
  isOpen,
  availability,
  onClose,
  onSubmit,
  isLoading,
}: UpdateAvailabilityModalProps) => {
  if (!isOpen || !availability) {
    return null;
  }

  return (
    <UpdateAvailabilityForm
      availability={availability}
      onClose={onClose}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};

interface UpdateAvailabilityFormProps {
  availability: DoctorAvailability;
  onClose: () => void;
  onSubmit: (
    id: string,
    data: CreateDoctorAvailability,
  ) => Promise<string | null>;
  isLoading: boolean;
}

const UpdateAvailabilityForm = ({
  availability,
  onClose,
  onSubmit,
  isLoading,
}: UpdateAvailabilityFormProps) => {
  const [dayOfWeek, setDayOfWeek] = useState<Week>(
    availability.dayOfWeek,
  );

  const [startTime, setStartTime] = useState(
    availability.startTime,
  );

  const [endTime, setEndTime] = useState(
    availability.endTime,
  );

  const [duration, setDuration] = useState(
    String(availability.duration),
  );

  const [breakStartTime, setBreakStartTime] = useState(
    availability.breaks[0]?.startTime ?? "",
  );

  const [breakEndTime, setBreakEndTime] = useState(
    availability.breaks[0]?.endTime ?? "",
  );

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [backendError, setBackendError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    setErrors({});
    setBackendError("");

    const validation =
      addAvailabilitySchema.safeParse({
        dayOfWeek,
        startTime,
        endTime,
        duration: duration
          ? Number(duration)
          : undefined,
        breakStartTime,
        breakEndTime,
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

    const breaks =
      breakStartTime && breakEndTime
        ? [
            {
              startTime: breakStartTime,
              endTime: breakEndTime,
            },
          ]
        : [];

    const data: CreateDoctorAvailability = {
      dayOfWeek,
      startTime,
      endTime,
      breaks,
      duration: Number(duration),
      isAvailable: availability.isAvailable,
    };

    const error = await onSubmit(
      availability.id,
      data,
    );

    if (error) {
      setBackendError(error);
    }
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
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "8px",
        }}
      >
        <div className="modal-header">
          <h2>Update Availability</h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {backendError && (
            <p className="form-error">
              {backendError}
            </p>
          )}

          {/* DAY */}
          <div>
            <label>Day</label>

            <select
              value={dayOfWeek}
              onChange={(e) =>
                setDayOfWeek(e.target.value as Week)
              }
            >
              <option value="MONDAY">Monday</option>
              <option value="TUESDAY">Tuesday</option>
              <option value="WEDNESDAY">Wednesday</option>
              <option value="THURSDAY">Thursday</option>
              <option value="FRIDAY">Friday</option>
              <option value="SATURDAY">Saturday</option>
              <option value="SUNDAY">Sunday</option>
            </select>

            {errors.dayOfWeek && (
              <p className="form-error">
                {errors.dayOfWeek}
              </p>
            )}
          </div>

          {/* START TIME */}
          <div>
            <label>Start Time</label>

            <input
              type="time"
              value={startTime}
              onChange={(e) =>
                setStartTime(e.target.value)
              }
            />

            {errors.startTime && (
              <p className="form-error">
                {errors.startTime}
              </p>
            )}
          </div>

          {/* END TIME */}
          <div>
            <label>End Time</label>

            <input
              type="time"
              value={endTime}
              onChange={(e) =>
                setEndTime(e.target.value)
              }
            />

            {errors.endTime && (
              <p className="form-error">
                {errors.endTime}
              </p>
            )}
          </div>

          {/* DURATION */}
          <div>
            <label>Duration</label>

            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
            />

            {errors.duration && (
              <p className="form-error">
                {errors.duration}
              </p>
            )}
          </div>

          {/* BREAK START */}
          <div>
            <label>Break Start</label>

            <input
              type="time"
              value={breakStartTime}
              onChange={(e) =>
                setBreakStartTime(e.target.value)
              }
            />

            {errors.breakStartTime && (
              <p className="form-error">
                {errors.breakStartTime}
              </p>
            )}
          </div>

          {/* BREAK END */}
          <div>
            <label>Break End</label>

            <input
              type="time"
              value={breakEndTime}
              onChange={(e) =>
                setBreakEndTime(e.target.value)
              }
            />

            {errors.breakEndTime && (
              <p className="form-error">
                {errors.breakEndTime}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Updating..."
                : "Update Slot"}
            </button>

            <button
              type="button"
              onClick={onClose}
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

export default UpdateAvailabilityModal;