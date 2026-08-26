import { useState } from "react";
import "@/styles/doctor/updateModal.css"
import type {

  UpdateDoctorAvailability,
} from "../types/addDoctorAvail.type";

import type { DoctorAvailability, Week } from "../types/doctorAvail.type";
import { updateAvailabilitySchema } from "../services/updateAvail";



interface UpdateAvailabilityModalProps {
  isOpen: boolean;

  availability: DoctorAvailability | null;

  onClose: () => void;

  onSubmit: (
    id: string,
    data: UpdateDoctorAvailability,
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
    data: UpdateDoctorAvailability,
  ) => Promise<string | null>;

  isLoading: boolean;
}

const UpdateAvailabilityForm = ({
  availability,
  onClose,
  onSubmit,
  isLoading,
}: UpdateAvailabilityFormProps) => {
  // -------------------------
  // FORM STATE
  // -------------------------

  const [dayOfWeek, setDayOfWeek] =
    useState<Week>(
      availability.dayOfWeek,
    );

  const [startDate, setStartDate] =
    useState(
      availability.startDate
        ? String(
            availability.startDate,
          ).slice(0, 10)
        : "",
    );

  const [endDate, setEndDate] =
    useState(
      availability.endDate
        ? String(
            availability.endDate,
          ).slice(0, 10)
        : "",
    );

  const [startTime, setStartTime] =
    useState(
      availability.startTime,
    );

  const [endTime, setEndTime] =
    useState(
      availability.endTime,
    );

  const [duration, setDuration] =
    useState(
      String(availability.duration),
    );

  const [breakStartTime, setBreakStartTime] =
    useState(
      availability.breaks[0]
        ?.startTime ?? "",
    );

  const [breakEndTime, setBreakEndTime] =
    useState(
      availability.breaks[0]
        ?.endTime ?? "",
    );

  const [errors, setErrors] =
    useState<Record<string, string>>(
      {},
    );

  const [backendError, setBackendError] =
    useState("");

  // -------------------------
  // SUBMIT
  // -------------------------

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    setErrors({});
    setBackendError("");

    // -------------------------
    // CREATE BREAKS ARRAY
    // -------------------------

    const breaks =
      breakStartTime && breakEndTime
        ? [
            {
              startTime:
                breakStartTime,
              endTime:
                breakEndTime,
            },
          ]
        : [];

    // -------------------------
    // CREATE UPDATE DATA
    // -------------------------

    const data: UpdateDoctorAvailability =
      {
        dayOfWeek,

        startTime,

        endTime,

        duration: Number(
          duration,
        ),

        breaks,

        startDate,

        endDate,
      };

    console.log(
      "UPDATE AVAILABILITY DATA:",
      data,
    );

    // -------------------------
    // ZOD VALIDATION
    // -------------------------

    const validation =
      updateAvailabilitySchema.safeParse(
        data,
      );

    if (!validation.success) {
      const fieldErrors: Record<
        string,
        string
      > = {};

      validation.error.issues.forEach(
        (issue) => {
          const field =
            issue.path.join(".");

          fieldErrors[field] =
            issue.message;
        },
      );

      setErrors(fieldErrors);

      return;
    }

    // -------------------------
    // CALL PARENT
    // -------------------------

    const error = await onSubmit(
      availability.id,
      data,
    );

    // -------------------------
    // BACKEND ERROR
    // -------------------------

    if (error) {
      setBackendError(error);

      return;
    }

    // Parent should normally close
    // the modal after successful update.
  };

return (
  <div className="availability-modal-overlay">
    <div className="availability-modal availability-modal-update">
      {/* Header */}
      <div className="modal-header">
        <div>
          <span className="modal-eyebrow">SCHEDULE</span>
          <h2>Update Availability</h2>
          <p>Modify the doctor's weekly availability.</p>
        </div>

        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          disabled={isLoading}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="availability-form">
        {/* Backend Error */}
        {backendError && (
          <div className="form-error-box">
            {backendError}
          </div>
        )}

        {/* Day */}
        <div className="availability-form-group">
          <label>Day</label>

          <select
            value={dayOfWeek}
            onChange={(e) =>
              setDayOfWeek(e.target.value as Week)
            }
            disabled={isLoading}
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
            <p className="field-error">{errors.dayOfWeek}</p>
          )}
        </div>

        {/* Date Range */}
        <div className="availability-form-row">
          <div className="availability-form-group">
            <label>Start Date</label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={isLoading}
            />

            {errors.startDate && (
              <p className="field-error">{errors.startDate}</p>
            )}
          </div>

          <div className="availability-form-group">
            <label>End Date</label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={isLoading}
            />

            {errors.endDate && (
              <p className="field-error">{errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Time */}
        <div className="availability-form-row">
          <div className="availability-form-group">
            <label>Start Time</label>

            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              disabled={isLoading}
            />

            {errors.startTime && (
              <p className="field-error">{errors.startTime}</p>
            )}
          </div>

          <div className="availability-form-group">
            <label>End Time</label>

            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              disabled={isLoading}
            />

            {errors.endTime && (
              <p className="field-error">{errors.endTime}</p>
            )}
          </div>
        </div>

        {/* Duration */}
        <div className="availability-form-group">
          <label>Duration</label>

          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            disabled={isLoading}
          />

          <span className="input-hint">
            Duration of each appointment slot in minutes.
          </span>

          {errors.duration && (
            <p className="field-error">{errors.duration}</p>
          )}
        </div>

        {/* Break */}
        <div className="availability-section">
          <div className="availability-section-title">
            <div>
              <h3>Break Time</h3>
              <p>Set the break period during this availability.</p>
            </div>
          </div>

          <div className="availability-form-row">
            <div className="availability-form-group">
              <label>Break Start</label>

              <input
                type="time"
                value={breakStartTime}
                onChange={(e) =>
                  setBreakStartTime(e.target.value)
                }
                disabled={isLoading}
              />

              {errors["breaks.0.startTime"] && (
                <p className="field-error">
                  {errors["breaks.0.startTime"]}
                </p>
              )}
            </div>

            <div className="availability-form-group">
              <label>Break End</label>

              <input
                type="time"
                value={breakEndTime}
                onChange={(e) =>
                  setBreakEndTime(e.target.value)
                }
                disabled={isLoading}
              />

              {errors["breaks.0.endTime"] && (
                <p className="field-error">
                  {errors["breaks.0.endTime"]}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="availability-modal-actions">
          <button
            type="button"
            className="availability-cancel-btn"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="availability-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Availability"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default UpdateAvailabilityModal;