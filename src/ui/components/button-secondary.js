import React from 'react';

export const ButtonSecondary = ({
  className = '',
  onClick = () => {},
  children,
}) => <button onClick={onClick} className={`max-w-sm flex items-center rounded-lg shadow-lg px-5 py-3 bg-black text-white copy-bold ${className}`}>{children}</button>