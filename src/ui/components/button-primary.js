import React from 'react';

export const ButtonPrimary = ({
  className = '',
  onClick = () => {},
  children,
}) => <button onClick={onClick} className={`max-w-sm rounded-lg px-6 py-4 bg-orange-m text-white copy-bold ${className}`}>{children}</button>