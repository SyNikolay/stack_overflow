import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DISPLAY_DATE_FORMAT } from "@/shared/lib";

interface DateFieldProps {
  label: string;
  value: Date | null;
  disabled?: boolean;
  maxDate?: Date;
  onChange: (date: Date | null) => void;
}

export const DateField = ({
  label,
  value,
  disabled,
  maxDate,
  onChange,
}: DateFieldProps) => (
  <DatePicker
    label={label}
    value={value}
    disabled={disabled}
    maxDate={maxDate}
    onChange={onChange}
    format={DISPLAY_DATE_FORMAT}
    slotProps={{
      textField: {
        size: "small",
        sx: { minWidth: 190 },
      },
    }}
  />
);
