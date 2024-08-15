import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function Calendars({
  defaultYear,
  defaultMonth,
  defaultDay,
  onChange,
  holidayDate,
}) {
  const defaultDate = new Date(defaultYear, defaultMonth, defaultDay);

  const [selected, setSelected] = useState(defaultDate);
  const [currentMonth, setCurrentMonth] = useState(defaultDate);

  const handleDateSelect = (date) => {
    setSelected(date);
    onChange(date);
  };

  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
  };

  useEffect(() => {
    if (holidayDate) {
      const parsedDate = new Date(holidayDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
      setSelected(parsedDate);
      setCurrentMonth(parsedDate);
    }
  }, [holidayDate]);

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onDayClick={handleDateSelect}
      onMonthChange={handleMonthChange}
      showOverlay
      month={currentMonth}
      year={currentMonth.getFullYear()}
    />
  );
}
