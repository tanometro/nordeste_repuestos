import React from 'react';
import { PrimaryButtonProps } from '../interfaces';

function RoundedButton(props: PrimaryButtonProps) {
    const {title, onClickfunction} = props;
  return (
    <button
        type="button" 
        onClick={onClickfunction}
        className="hover:bg-blue-600 transform transition-transform hover:scale-105 mr-2 h-10 w-56 text-white bg-custom-red rounded-2xl">
          {title}
    </button>
  )
}

export default RoundedButton