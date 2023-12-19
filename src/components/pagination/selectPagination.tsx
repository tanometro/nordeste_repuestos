import React from 'react';
import { SelectProps } from '../interfaces';

function SelectPagination(props: SelectProps) {
    const {onChange, pagination, values} = props;
  return (
        <select
            className="w-12 h-10 text-center border border-gray-500 text-black rounded"
            onChange={onChange}
            required
            name="roleId"
            value={pagination}
            >
            {values.map((value, index) => (
                <option key={index} value={value}>
                {value}
                </option>
            ))}
        </select>
  )
}

export default SelectPagination