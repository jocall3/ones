import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { cn } from '../../lib/utils';

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date) => void;
  placeholderText?: string;
  className?: string;
  [key: string]: any; // Allow other props
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  placeholderText = 'Select date',
  className,
  ...props
}) => {
  const [startDate, setStartDate] = useState<Date | null>(selected);

  const handleChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      onChange(date);
    } else {
      setStartDate(null);
      onChange(null as any); // Or handle null case appropriately
    }
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      placeholderText={placeholderText}
      className={cn(
        'border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary',
        className
      )}
      {...props}
    />
  );
};

export default CustomDatePicker;