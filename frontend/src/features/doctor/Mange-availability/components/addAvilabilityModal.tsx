import "@/styles/doctor/addModal.css"
import { useState } from "react";
import type {
  CreateDoctorAvailability,
  DoctorAvailabilityDay,
} from "../types/addDoctorAvail.type";
import type { Week } from "../types/doctorAvail.type";



interface AddAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateDoctorAvailability,
  ) => Promise<string | null>;
  isLoading: boolean;
}

const days: Week[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const AddAvailabilityModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: AddAvailabilityModalProps) => {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [selectedDays, setSelectedDays] = useState<Week[]>([]);

  const [dayDetails, setDayDetails] = useState<
    Record<string, DoctorAvailabilityDay>
  >({});

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [backendError, setBackendError] = useState("");

  if (!isOpen) {
    return null;
  }

  // -------------------------
  // SELECT / UNSELECT DAY
  // -------------------------

  const handleDayToggle = (day: Week) => {
    setSelectedDays((previous) => {

      if (previous.includes(day)) {
        const updated = previous.filter(
          (item) => item !== day,
        );

        setDayDetails((details) => {
          const copy = { ...details };
          delete copy[day];
          return copy;
        });

        return updated;
      }

      // Create default values for newly selected day
      setDayDetails((details) => ({
        ...details,

        [day]: {
          dayOfWeek: day,
          startTime: "",
          endTime: "",
          duration: 30,
          breaks: [],
        },
      }));

      return [...previous, day];
    });
  };

  // -------------------------
  // UPDATE DAY FIELD
  // -------------------------

  const updateDay = (
    day: Week,
    field:
      | "startTime"
      | "endTime"
      | "duration",
    value: string,
  ) => {

    setDayDetails((previous) => ({
      ...previous,

      [day]: {
        ...previous[day],

        [field]:
          field === "duration"
            ? Number(value)
            : value,
      },
    }));
  };


  const updateBreak = (
    day: Week,
    field: "startTime" | "endTime",
    value: string,
  ) => {

    setDayDetails((previous) => {

      const current = previous[day];

      return {
        ...previous,

        [day]: {
          ...current,

          breaks: [
            {
              ...(current?.breaks[0] ?? {
                startTime: "",
                endTime: "",
              }),

              [field]: value,
            },
          ],
        },
      };
    });
  };



  const removeBreak = (day: Week) => {

    setDayDetails((previous) => ({
      ...previous,

      [day]: {
        ...previous[day],
        breaks: [],
      },
    }));
  };

  // -------------------------
  // ADD BREAK
  // -------------------------

  const addBreak = (day: Week) => {

    setDayDetails((previous) => ({
      ...previous,

      [day]: {
        ...previous[day],
        breaks: [
          {
            startTime: "",
            endTime: "",
          },
        ],
      },
    }));
  };

  // -------------------------
  // SUBMIT
  // -------------------------

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {

    e.preventDefault();

    setErrors({});
    setBackendError("");

    // Basic validation

    if (!startDate) {
      setErrors({
        startDate: "Start date is required",
      });
      return;
    }

    if (!endDate) {
      setErrors({
        endDate: "End date is required",
      });
      return;
    }

    if (startDate >= endDate) {
      setErrors({
        endDate:
          "End date must be after start date",
      });
      return;
    }

    if (selectedDays.length === 0) {
      setErrors({
        days: "Select at least one day",
      });
      return;
    }

    // Validate every selected day

    for (const day of selectedDays) {

      const details = dayDetails[day];

      if (!details.startTime) {
        setErrors({
          [day]:
            "Start time is required",
        });
        return;
      }

      if (!details.endTime) {
        setErrors({
          [day]:
            "End time is required",
        });
        return;
      }

      if (
        details.startTime >=
        details.endTime
      ) {
        setErrors({
          [day]:
            "Start time must be before end time",
        });
        return;
      }

      if (!details.duration) {
        setErrors({
          [day]:
            "Duration is required",
        });
        return;
      }

      // Validate break

      for (const breakItem of details.breaks) {

        if (
          breakItem.startTime >=
          breakItem.endTime
        ) {
          setErrors({
            [day]:
              "Break start time must be before break end time",
          });
          return;
        }

        if (
          breakItem.startTime <
            details.startTime ||
          breakItem.endTime >
            details.endTime
        ) {
          setErrors({
            [day]:
              "Break must be within availability time",
          });
          return;
        }
      }
    }

    // -------------------------
    // CREATE PAYLOAD
    // -------------------------

    const daysData = selectedDays.map(
      (day) => dayDetails[day],
    );

    const data: CreateDoctorAvailability = {
      startDate,
      endDate,
      days: daysData,
    };

    console.log(
      "CREATE AVAILABILITY PAYLOAD:",
      data,
    );

    const error = await onSubmit(data);

    if (error) {
      setBackendError(error);
    }
  };

return (
  <div className="availability-modal-overlay">
    <div className="availability-modal">
      {/* HEADER */}
      <div className="availability-modal-header">
        <div>
          <span className="availability-modal-eyebrow">
            DOCTOR SCHEDULE
          </span>

          <h2>Add Weekly Availability</h2>

          <p>
            Set the dates and working hours for your availability.
          </p>
        </div>

        <button
          type="button"
          className="availability-modal-close"
          onClick={onClose}
          disabled={isLoading}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="availability-form">
        {/* BACKEND ERROR */}
        {backendError && (
          <div className="form-error availability-backend-error">
            {backendError}
          </div>
        )}

        {/* DATE RANGE */}
        <div className="availability-date-grid">
          <div className="availability-form-group">
            <label>Start Date</label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            {errors.startDate && (
              <p className="form-error">
                {errors.startDate}
              </p>
            )}
          </div>

          <div className="availability-form-group">
            <label>End Date</label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            {errors.endDate && (
              <p className="form-error">
                {errors.endDate}
              </p>
            )}
          </div>
        </div>

        {/* DAYS */}
        <div className="availability-form-group">
          <label>Select Days</label>

          <div className="availability-days">
            {days.map((day) => (
              <label
                key={day}
                className={`availability-day ${
                  selectedDays.includes(day)
                    ? "selected"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDayToggle(day)}
                />

                <span>{day}</span>
              </label>
            ))}
          </div>

          {errors.days && (
            <p className="form-error">
              {errors.days}
            </p>
          )}
        </div>

        {/* SELECTED DAY DETAILS */}
        <div className="availability-day-details">
          {selectedDays.map((day) => {
            const details = dayDetails[day];

            if (!details) {
              return null;
            }

            return (
              <div
                key={day}
                className="availability-day-card"
              >
                <div className="availability-day-card-header">
                  <h3>{day}</h3>
                </div>

                {/* TIME */}
                <div className="availability-time-grid">
                  <div className="availability-form-group">
                    <label>Start Time</label>

                    <input
                      type="time"
                      value={details.startTime}
                      onChange={(e) =>
                        updateDay(
                          day,
                          "startTime",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="availability-form-group">
                    <label>End Time</label>

                    <input
                      type="time"
                      value={details.endTime}
                      onChange={(e) =>
                        updateDay(
                          day,
                          "endTime",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>

                {/* DURATION */}
                <div className="availability-form-group">
                  <label>Slot Duration</label>

                  <div className="availability-duration-input">
                    <input
                      type="number"
                      min="1"
                      value={details.duration}
                      onChange={(e) =>
                        updateDay(
                          day,
                          "duration",
                          e.target.value,
                        )
                      }
                    />

                    <span>minutes</span>
                  </div>
                </div>

                {/* BREAK */}
                <div className="availability-break-section">
                  <div className="availability-break-header">
                    <label>Break</label>

                    {details.breaks.length === 0 && (
                      <button
                        type="button"
                        className="availability-add-break"
                        onClick={() => addBreak(day)}
                      >
                        + Add Break
                      </button>
                    )}
                  </div>

                  {details.breaks.length > 0 && (
                    <div className="availability-break-row">
                      <div className="availability-form-group">
                        <label>Break Start</label>

                        <input
                          type="time"
                          value={
                            details.breaks[0].startTime
                          }
                          onChange={(e) =>
                            updateBreak(
                              day,
                              "startTime",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div className="availability-form-group">
                        <label>Break End</label>

                        <input
                          type="time"
                          value={
                            details.breaks[0].endTime
                          }
                          onChange={(e) =>
                            updateBreak(
                              day,
                              "endTime",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <button
                        type="button"
                        className="availability-remove-break"
                        onClick={() =>
                          removeBreak(day)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* DAY ERROR */}
                {errors[day] && (
                  <p className="form-error">
                    {errors[day]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* BUTTONS */}
        <div className="availability-modal-footer">
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
            {isLoading
              ? "Adding..."
              : "Add Availability"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default AddAvailabilityModal;