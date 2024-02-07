import React from 'react';
import { DateRangePicker, Stack } from 'rsuite';
import "rsuite/dist/rsuite.min.css"; 
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import { ValueType } from 'rsuite/lib/DateRangePicker';

interface CustomDateRangeProps {
  value?: ValueType;
  onChangeFunction: (value: ValueType) => void;
}

const predefinedRanges = [
    {
      label: 'Hoy',
      value: [new Date(), new Date()],
      placement: 'left'
    },
    {
      label: 'Ayer',
      value: [addDays(new Date(), -1), addDays(new Date(), -1)],
      placement: 'left'
    },
    {
      label: 'Esta semana',
      value: [startOfWeek(new Date()), endOfWeek(new Date())],
      placement: 'left'
    },
    {
      label: 'Últimos 30 días',
      value: [subDays(new Date(), 29), new Date()],
      placement: 'left'
    },
    {
      label: 'Este mes',
      value: [startOfMonth(new Date()), new Date()],
      placement: 'left'
    },
    {
      label: 'Mes pasado',
      value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
      placement: 'left'
    },
    {
      label: 'Este año',
      value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
      placement: 'left'
    },
    {
      label: 'Año pasado',
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
      placement: 'left'
    },
    {
      label: 'Desde inicio',
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
      placement: 'left'
    },
  ];

function CustomDateRange(props: CustomDateRangeProps) {
    const {value, onChangeFunction} = props;
  return (
    <Stack direction="column" spacing={8} alignItems="flex-start">
      <DateRangePicker
        value={value || [null, null]}
        onChange={(nextValue) => onChangeFunction(nextValue)}
        placeholder="Seleccionar fechas"
        appearance="default"
        showOneCalendar
        format="dd/MM/yyyy"
      />
    </Stack>
  );
}

export default CustomDateRange;
