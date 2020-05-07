import React from 'react';

export const ButtonIcon = ({
  className = '',
  onClick = () => {},
  Icon,
  children,
}) => <button onClick={onClick} className={`max-w-sm flex items-center rounded-lg px-5 py-1 bg-black text-white copy-bold ${className}`}>
  <span className="mr-2">{Icon}</span>
  {children}
</button>