/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import { Button, Slider } from "@mui/material";
import React from "react";
import { useCallback, useState } from "react";
import { addDays, format } from 'date-fns';
import { type DateRange, DayPicker } from "react-day-picker";
import 'react-day-picker/style.css';

export const MUIButton = qwikify$(Button);
export const MUISlider = qwikify$(Slider, { eagerness: "hover" });

export const TableApp = qwikify$(() => {
  const pastMonth = new Date();
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4)
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const handleRangeSelect = useCallback((newRange: DateRange | undefined) => {
    setRange(newRange);
  }, []);

  const footer = React.useMemo(() => {
    if (range?.from) {
      if (!range.to) {
        return <p>{format(range.from, 'PPP')}</p>;
      } else if (range.to) {
        return (
          <p>
            {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
          </p>
        );
      }
    }
    return <p>Please pick the first day.</p>;
  }, [range]);

  return (
    <DayPicker
      mode="range"
      defaultMonth={pastMonth}
      selected={range}
      footer={footer}
      onSelect={handleRangeSelect}
    />
  );
});
