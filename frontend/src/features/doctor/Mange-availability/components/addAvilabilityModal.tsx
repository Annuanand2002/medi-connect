
import "@/styles/doctor/addModal.css";
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

  // ---------------------------------------
  // SELECT / UNSELECT DAY
  // ---------------------------------------

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

  // ---------------------------------------
  // UPDATE DAY FIELD
  // ---------------------------------------

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

  // ---------------------------------------
  // ADD BREAK
  // ---------------------------------------

  const addBreak = (day: Week) => {
    setDayDetails((previous) => {
      const current = previous[day];

      if (!current) {
        return previous;
      }

      return {
        ...previous,

        [day]: {
          ...current,

          breaks: [
            ...current.breaks,

            {
              startTime: "",
              endTime: "",
            },
          ],
        },
      };
    });
  };

  // ---------------------------------------
  // UPDATE BREAK
  // ---------------------------------------

  const updateBreak = (
    day: Week,
    breakIndex: number,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    setDayDetails((previous) => {
      const current = previous[day];

      if (!current) {
        return previous;
      }

      const updatedBreaks = current.breaks.map(
        (breakItem, index) =>
          index === breakIndex
            ? {
                ...breakItem,
                [field]: value,
              }
            : breakItem,
      );

      return {
        ...previous,

        [day]: {
          ...current,
          breaks: updatedBreaks,
        },
      };
    });
  };

  // ---------------------------------------
  // REMOVE BREAK
  // ---------------------------------------

  const removeBreak = (
    day: Week,
    breakIndex: number,
  ) => {
    setDayDetails((previous) => {
      const current = previous[day];

      if (!current) {
        return previous;
      }

      return {
        ...previous,

        [day]: {
          ...current,

          breaks: current.breaks.filter(
            (_, index) => index !== breakIndex,
          ),
        },
      };
    });
  };

  // ---------------------------------------
  // SUBMIT
  // ---------------------------------------

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    setErrors({});
    setBackendError("");

    // ---------------------------------------
    // DATE VALIDATION
    // ---------------------------------------

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

    // ---------------------------------------
    // DAY VALIDATION
    // ---------------------------------------

    if (selectedDays.length === 0) {
      setErrors({
        days: "Select at least one day",
      });

      return;
    }

    // ---------------------------------------
    // VALIDATE EACH DAY
    // ---------------------------------------

    for (const day of selectedDays) {
      const details = dayDetails[day];

      if (!details.startTime) {
        setErrors({
          [day]: "Start time is required",
        });

        return;
      }

      if (!details.endTime) {
        setErrors({
          [day]: "End time is required",
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
          [day]: "Duration is required",
        });

        return;
      }

      // ---------------------------------------
      // VALIDATE ALL BREAKS
      // ---------------------------------------

      for (
        let i = 0;
        i < details.breaks.length;
        i++
      ) {
        const breakItem =
          details.breaks[i];

        // Break start/end required

        if (!breakItem.startTime) {
          setErrors({
            [day]: `Break ${i + 1} start time is required`,
          });

          return;
        }

        if (!breakItem.endTime) {
          setErrors({
            [day]: `Break ${i + 1} end time is required`,
          });

          return;
        }

        // Break start must be before break end

        if (
          breakItem.startTime >=
          breakItem.endTime
        ) {
          setErrors({
            [day]:
              `Break ${i + 1} start time must be before break end time`,
          });

          return;
        }

        // Break must be inside availability time

        if (
          breakItem.startTime <
            details.startTime ||
          breakItem.endTime >
            details.endTime
        ) {
          setErrors({
            [day]:
              `Break ${i + 1} must be within availability time`,
          });

          return;
        }

        // ---------------------------------------
        // CHECK BREAK OVERLAPPING
        // ---------------------------------------

        for (
          let j = 0;
          j < details.breaks.length;
          j++
        ) {
          if (i === j) {
            continue;
          }

          const otherBreak =
            details.breaks[j];

          const overlaps =
            breakItem.startTime <
              otherBreak.endTime &&
            breakItem.endTime >
              otherBreak.startTime;

          if (overlaps) {
            setErrors({
              [day]:
                `Break ${i + 1} overlaps with Break ${j + 1}`,
            });

            return;
          }
        }
      }
    }

    // ---------------------------------------
    // CREATE PAYLOAD
    // ---------------------------------------

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
              Set the dates and working hours for
              your availability.
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

        <form
          onSubmit={handleSubmit}
          className="availability-form"
        >

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
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
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
                onChange={(e) =>
                  setEndDate(e.target.value)
                }
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
                    onChange={() =>
                      handleDayToggle(day)
                    }
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
              const details =
                dayDetails[day];

              if (!details) {
                return null;
              }

              return (
                <div
                  key={day}
                  className="availability-day-card"
                >

                  {/* DAY HEADER */}

                  <div className="availability-day-card-header">
                    <h3>{day}</h3>
                  </div>

                  {/* TIME */}

                  <div className="availability-time-grid">

                    <div className="availability-form-group">

                      <label>
                        Start Time
                      </label>

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

                      <label>
                        End Time
                      </label>

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

                    <label>
                      Slot Duration
                    </label>

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

                      <span>
                        minutes
                      </span>

                    </div>

                  </div>

                  {/* BREAKS */}

                  <div className="availability-break-section">

                    <div className="availability-break-header">

                      <label>
                        Breaks
                      </label>

                      <button
                        type="button"
                        className="availability-add-break"
                        onClick={() =>
                          addBreak(day)
                        }
                      >
                        + Add Break
                      </button>

                    </div>

                    {/* BREAK LIST */}

                    {details.breaks.length === 0 && (
                      <p>
                        No breaks added.
                      </p>
                    )}

                    {details.breaks.map(
                      (breakItem, index) => (
                        <div
                          key={index}
                          className="availability-break-row"
                        >

                          {/* BREAK START */}

                          <div className="availability-form-group">

                            <label>
                              Break {index + 1} Start
                            </label>

                            <input
                              type="time"
                              value={
                                breakItem.startTime
                              }
                              onChange={(e) =>
                                updateBreak(
                                  day,
                                  index,
                                  "startTime",
                                  e.target.value,
                                )
                              }
                            />

                          </div>

                          {/* BREAK END */}

                          <div className="availability-form-group">

                            <label>
                              Break {index + 1} End
                            </label>

                            <input
                              type="time"
                              value={
                                breakItem.endTime
                              }
                              onChange={(e) =>
                                updateBreak(
                                  day,
                                  index,
                                  "endTime",
                                  e.target.value,
                                )
                              }
                            />

                          </div>

                          {/* REMOVE */}

                          <button
                            type="button"
                            className="availability-remove-break"
                            onClick={() =>
                              removeBreak(
                                day,
                                index,
                              )
                            }
                          >
                            Remove
                          </button>

                        </div>
                      ),
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

