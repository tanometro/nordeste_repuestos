import React from 'react';
import { PrimaryButtonProps } from '../interfaces';

function EditButton(props: PrimaryButtonProps) {
    const {title, onClickfunction} = props;
  return (
    <button onClick={onClickfunction}>
        <a className="text-custom-red px-3">{title}</a>
    </button>
  )
}

export default EditButton