import React from 'react';
import { colors } from './../styles';


export const IconX = ({
  width = 20,
  height = 20,
  color = colors.black,
}) => (
  <svg width={width} height={height} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 12.6856C14 12.5439 13.9433 12.4023 13.8414 12.3003L11.5411 10L13.8414 7.69972C13.9433 7.59773 14 7.45609 14 7.31445C14 7.1728 13.9433 7.03116 13.8414 6.92918L13.0708 6.15864C12.9688 6.05666 12.8272 6 12.6856 6C12.5439 6 12.4023 6.05666 12.3003 6.15864L10 8.45892L7.69972 6.15864C7.59773 6.05666 7.45609 6 7.31445 6C7.1728 6 7.03116 6.05666 6.92918 6.15864L6.15864 6.92918C6.05666 7.03116 6 7.1728 6 7.31445C6 7.45609 6.05666 7.59773 6.15864 7.69972L8.45892 10L6.15864 12.3003C6.05666 12.4023 6 12.5439 6 12.6856C6 12.8272 6.05666 12.9688 6.15864 13.0708L6.92918 13.8414C7.03116 13.9433 7.1728 14 7.31445 14C7.45609 14 7.59773 13.9433 7.69972 13.8414L10 11.5411L12.3003 13.8414C12.4023 13.9433 12.5439 14 12.6856 14C12.8272 14 12.9688 13.9433 13.0708 13.8414L13.8414 13.0708C13.9433 12.9688 14 12.8272 14 12.6856Z" fill={color}/>
  </svg>
);