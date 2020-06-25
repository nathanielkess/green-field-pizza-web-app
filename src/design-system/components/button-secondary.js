import React from 'react';

export const ButtonSecondary = ({
  className = '',
  onClick = () => {},
  children,
  testId,
  disabled = false,
}) => <button data-cy-id={testId} onClick={onClick} disabled={disabled} className={`max-w-sm flex items-center rounded-lg shadow-lg px-5 py-3 bg-black text-white copy-bold ${className}`}>{children}</button>
