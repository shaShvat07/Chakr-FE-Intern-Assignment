// @/components/ui/datepicker.tsx
import React, { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input";

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ selected, onChange, placeholderText }, ref) => {
    return (
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        customInput={<Input ref={ref} placeholder="Select a Deadline" />}
      />
    );
  }
);

DatePicker.displayName = "DatePicker";
