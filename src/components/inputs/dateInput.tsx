import React, {useState, useRef} from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateInputProps } from '../interfaces';

function DateInput(props: DateInputProps) {
  const { onClickFunction, range, setRange, open, setOpen } = props;

  const refOne = useRef<HTMLDivElement | null>(null);

  const hideOnEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e: React.MouseEvent) => {
    if (refOne.current && !refOne.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  const rangeChange = (item: any) => {
    setRange([item.selection]);
  };

  return (
    <div className="calendarWrap">
      <input
        value={`${format(range[0]?.startDate, 'dd/MM/yyyy')} a ${format(
          range[0]?.endDate,
          'dd/MM/yyyy'
        )}`}
        readOnly
        className="rounded-2xl border border-custom-red h-10 w-full text-center text-black"
        onClick={onClickFunction}
      />
      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => {
              const { startDate, endDate } = item.selection;
              if (startDate !== undefined && endDate !== undefined) {
                setRange([{ startDate, endDate, key: 'selection' }]);
              }
            }}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
}

export default DateInput;