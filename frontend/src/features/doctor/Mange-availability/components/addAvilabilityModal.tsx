import { useState } from "react";
import type {
  CreateDoctorAvailability,
  Week,
} from "../types/addDoctorAvail.type";
import { addAvailabilitySchema } from "../services/avilability.modal";

interface AddAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateDoctorAvailability,
  ) => Promise<string | null>;
  isLoading: boolean;
}

const AddAvailabilityModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: AddAvailabilityModalProps) => {
      console.log("Modal isOpen:", isOpen);
  const [dayOfWeek, setDayOfWeek] =
    useState<Week>("MONDAY");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");

  const [breakStartTime, setBreakStartTime] =
    useState("");

  const [breakEndTime, setBreakEndTime] =
    useState("");

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [backendError, setBackendError] =
    useState("");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();
 console.log("1. HANDLE SUBMIT");
    setErrors({});
    setBackendError("");

    // ZOD VALIDATION
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

  console.log("2. VALIDATION RESULT:", validation);

    if (!validation.success) {
         console.log("3. VALIDATION FAILED");
    console.log(validation.error.issues);
      const fieldErrors: Record<string, string> =
        {};

      validation.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (field) {
          fieldErrors[String(field)] =
            issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }
  console.log("4. VALIDATION PASSED");
    // CREATE BREAKS ARRAY
    const breaks =
      breakStartTime && breakEndTime
        ? [
            {
              startTime: breakStartTime,
              endTime: breakEndTime,
            },
          ]
        : [];

    // REQUEST DATA
    const data: CreateDoctorAvailability = {
      dayOfWeek,
      startTime,
      endTime,
      breaks,
      duration: Number(duration),
      isAvailable: true,
    };
    console.log("5. CALLING PARENT:", data);

    // CALL BACKEND
    const error = await onSubmit(data);
      console.log("6. PARENT RESPONSE:", error);

    // SHOW BACKEND ERROR
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
        {/* HEADER */}
        <div className="modal-header">
          <h2>Add Availability Slot</h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          {/* BACKEND ERROR */}
          {backendError && (
            <div className="form-error">
              {backendError}
            </div>
          )}

          {/* DAY */}
          <div>
            <label>Day</label>

            <select
              value={dayOfWeek}
              onChange={(e) =>
                setDayOfWeek(
                  e.target.value as Week,
                )
              }
            >
              <option value="MONDAY">
                Monday
              </option>

              <option value="TUESDAY">
                Tuesday
              </option>

              <option value="WEDNESDAY">
                Wednesday
              </option>

              <option value="THURSDAY">
                Thursday
              </option>

              <option value="FRIDAY">
                Friday
              </option>

              <option value="SATURDAY">
                Saturday
              </option>

              <option value="SUNDAY">
                Sunday
              </option>
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
              placeholder="Duration in minutes"
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

          {/* BUTTONS */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Adding..."
                : "Add Slot"}
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

export default AddAvailabilityModal;