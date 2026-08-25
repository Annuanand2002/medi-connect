import { useState } from "react";

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
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor:
          "rgba(0, 0, 0, 0.5)",

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
        {/* ========================
            HEADER
        ======================== */}

        <div className="modal-header">
          <h2>
            Update Availability
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ========================
              BACKEND ERROR
          ======================== */}

          {backendError && (
            <p className="form-error">
              {backendError}
            </p>
          )}

          {/* ========================
              DAY
          ======================== */}

          <div>
            <label>
              Day
            </label>

            <select
              value={dayOfWeek}
              onChange={(e) =>
                setDayOfWeek(
                  e.target
                    .value as Week,
                )
              }
              disabled={isLoading}
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

          {/* ========================
              START DATE
          ======================== */}

          <div>
            <label>
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(
                  e.target.value,
                )
              }
              disabled={isLoading}
            />

            {errors.startDate && (
              <p className="form-error">
                {errors.startDate}
              </p>
            )}
          </div>

          {/* ========================
              END DATE
          ======================== */}

          <div>
            <label>
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(
                  e.target.value,
                )
              }
              disabled={isLoading}
            />

            {errors.endDate && (
              <p className="form-error">
                {errors.endDate}
              </p>
            )}
          </div>

          {/* ========================
              START TIME
          ======================== */}

          <div>
            <label>
              Start Time
            </label>

            <input
              type="time"
              value={startTime}
              onChange={(e) =>
                setStartTime(
                  e.target.value,
                )
              }
              disabled={isLoading}
            />

            {errors.startTime && (
              <p className="form-error">
                {errors.startTime}
              </p>
            )}
          </div>

          {/* ========================
              END TIME
          ======================== */}

          <div>
            <label>
              End Time
            </label>

            <input
              type="time"
              value={endTime}
              onChange={(e) =>
                setEndTime(
                  e.target.value,
                )
              }
              disabled={isLoading}
            />

            {errors.endTime && (
              <p className="form-error">
                {errors.endTime}
              </p>
            )}
          </div>

          {/* ========================
              DURATION
          ======================== */}

          <div>
            <label>
              Duration
            </label>

            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) =>
                setDuration(
                  e.target.value,
                )
              }
              disabled={isLoading}
            />

            {errors.duration && (
              <p className="form-error">
                {errors.duration}
              </p>
            )}
          </div>

          {/* ========================
              BREAK START
          ======================== */}

          <div>
            <label>
              Break Start
            </label>

            <input
              type="time"
              value={breakStartTime}
              onChange={(e) =>
                setBreakStartTime(
                  e.target.value,
                )
              }
              disabled={isLoading}
            />

            {errors[
              "breaks.0.startTime"
            ] && (
              <p className="form-error">
                {
                  errors[
                    "breaks.0.startTime"
                  ]
                }
              </p>
            )}
          </div>

          {/* ========================
              BREAK END
          ======================== */}

          <div>
            <label>
              Break End
            </label>

            <input
              type="time"
              value={breakEndTime}
              onChange={(e) =>
                setBreakEndTime(
                  e.target.value,
                )
              }
              disabled={isLoading}
            />

            {errors[
              "breaks.0.endTime"
            ] && (
              <p className="form-error">
                {
                  errors[
                    "breaks.0.endTime"
                  ]
                }
              </p>
            )}
          </div>

          {/* ========================
              BUTTONS
          ======================== */}

          <div>
            <button
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Updating..."
                : "Update Availability"}
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