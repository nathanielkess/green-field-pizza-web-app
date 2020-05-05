import React from 'react';

export const ButtonPill = ({
  className = '',
  onClick = () => {},
  isOn = false,
  children,
}) => <button onClick={onClick} className={`max-w-sm rounded-lg shadow-lg px-3 py-1 bg-gray-m text-black copy ${(isOn)?'bg-yellow-m':'bg-grey-m'} ${className}`}>{children}</button>