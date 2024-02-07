import React from 'react';
import { SubmitButtonProps } from '../../types/interfaces';

function SubmitButton(props: SubmitButtonProps) {
  const { title, mt } = props;
  return (
    <button
      type="submit"
      className={`mt-${mt ? mt : ''} w-2/4 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
    >
      {title}
    </button>
  );
}

export default SubmitButton