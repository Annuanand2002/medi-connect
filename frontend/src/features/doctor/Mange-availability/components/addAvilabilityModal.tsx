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

  // -------------------------
  // UPDATE BREAK
  // -------------------------

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

  // -------------------------
  // REMOVE BREAK
  // -------------------------

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
          width: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "8px",
        }}
      >

        {/* HEADER */}

        <div className="modal-header">

          <h2>
            Add Weekly Availability
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

          {/* BACKEND ERROR */}

          {backendError && (
            <div className="form-error">
              {backendError}
            </div>
          )}

          {/* DATE RANGE */}

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
            />

            {errors.startDate && (
              <p className="form-error">
                {errors.startDate}
              </p>
            )}

          </div>

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
            />

            {errors.endDate && (
              <p className="form-error">
                {errors.endDate}
              </p>
            )}

          </div>

          {/* DAYS */}

          <div>

            <label>
              Select Days
            </label>

            {days.map((day) => (

              <label
                key={day}
                style={{
                  display: "block",
                }}
              >

                <input
                  type="checkbox"
                  checked={selectedDays.includes(
                    day,
                  )}
                  onChange={() =>
                    handleDayToggle(day)
                  }
                />

                {day}

              </label>

            ))}

            {errors.days && (
              <p className="form-error">
                {errors.days}
              </p>
            )}

          </div>

          {/* SELECTED DAY DETAILS */}

          {selectedDays.map((day) => {

            const details =
              dayDetails[day];

            if (!details) {
              return null;
            }

            return (

              <div
                key={day}
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  border:
                    "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >

                <h3>
                  {day}
                </h3>

                {/* START */}

                <div>

                  <label>
                    Start Time
                  </label>

                  <input
                    type="time"
                    value={
                      details.startTime
                    }
                    onChange={(e) =>
                      updateDay(
                        day,
                        "startTime",
                        e.target.value,
                      )
                    }
                  />

                </div>

                {/* END */}

                <div>

                  <label>
                    End Time
                  </label>

                  <input
                    type="time"
                    value={
                      details.endTime
                    }
                    onChange={(e) =>
                      updateDay(
                        day,
                        "endTime",
                        e.target.value,
                      )
                    }
                  />

                </div>

                {/* DURATION */}

                <div>

                  <label>
                    Duration
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={
                      details.duration
                    }
                    onChange={(e) =>
                      updateDay(
                        day,
                        "duration",
                        e.target.value,
                      )
                    }
                  />

                </div>

                {/* BREAK */}

                {details.breaks.length ===
                0 ? (

                  <button
                    type="button"
                    onClick={() =>
                      addBreak(day)
                    }
                  >
                    Add Break
                  </button>

                ) : (

                  <div>

                    <label>
                      Break Start
                    </label>

                    <input
                      type="time"
                      value={
                        details
                          .breaks[0]
                          .startTime
                      }
                      onChange={(e) =>
                        updateBreak(
                          day,
                          "startTime",
                          e.target.value,
                        )
                      }
                    />

                    <label>
                      Break End
                    </label>

                    <input
                      type="time"
                      value={
                        details
                          .breaks[0]
                          .endTime
                      }
                      onChange={(e) =>
                        updateBreak(
                          day,
                          "endTime",
                          e.target.value,
                        )
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeBreak(day)
                      }
                    >
                      Remove Break
                    </button>

                  </div>

                )}

                {/* DAY ERROR */}

                {errors[day] && (
                  <p className="form-error">
                    {errors[day]}
                  </p>
                )}

              </div>
            );
          })}

          {/* BUTTONS */}

          <div
            style={{
              marginTop: "20px",
            }}
          >

            <button
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Adding..."
                : "Add Availability"}
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