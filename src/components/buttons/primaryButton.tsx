import React from 'react';
import { PrimaryButtonProps } from '../../types/interfaces';

function PrimaryButton(props: PrimaryButtonProps) {
    const {onClickfunction, title} = props;
  return (
    <button
          type="button"
          onClick={onClickfunction}
          className="w-auto h-10 mx-1 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {title}
    </button>
  )
}

export default PrimaryButton