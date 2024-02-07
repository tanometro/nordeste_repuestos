import React from 'react';
import { SearchInputProps } from '../../types/interfaces';

function SearchInput(props: SearchInputProps) {
    const {placeholder, value, onChangeFunction} = props;
  return (
    <input
        className="rounded-2xl border border-custom-red h-10 w-8/12 text-center text-black"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChangeFunction}
    />
  )
}

export default SearchInput