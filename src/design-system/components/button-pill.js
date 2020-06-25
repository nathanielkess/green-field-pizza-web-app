import React from 'react';

export const ButtonPill = ({
  className = '',
  onClick = () => {},
  isOn = false,
  testId,
  children,
}) => <button data-cy-id={testId} onClick={onClick} className={`whitespace-no-wrap max-w-sm rounded-lg px-3 py-1 bg-gray-m text-black copy ${(isOn)?'bg-yellow-m':'bg-grey-m'} ${className}`}>{children}</button>
