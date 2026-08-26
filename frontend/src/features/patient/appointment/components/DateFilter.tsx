import { CalendarDays } from "lucide-react";

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onApply: () => void;
}

const DateRangeFilter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApply,
}: DateRangeFilterProps) => {
  return (
    <div className="date-range-filter">
      <div className="date-range-field">
        <CalendarDays size={17} />

        <div>
          <label>From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
          />
        </div>
      </div>

      <div className="date-range-field">
        <CalendarDays size={17} />

        <div>
          <label>To</label>
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => onEndDateChange(e.target.value)}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onApply}
        disabled={!startDate || !endDate}
      >
        Apply
      </button>
    </div>
  );
};

export default DateRangeFilter;