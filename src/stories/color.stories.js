import React from 'react';

export default {
  title: 'Color',
  // component: Button,
};


const ColorCard = ({ className, children }) => (
  <div className={`font-sans px-5 flex flex-1 items-center justify-center content-center h-16 inline-block m-2 rounded ${className}`}>
   {children}
  </div>
)


export const Colors = () => (
  <div>
    <ColorCard className="bg-orange-m">orange-m</ColorCard>
    <ColorCard className="bg-yellow-m">yellow-m</ColorCard>
    <ColorCard className="bg-black text-white">black</ColorCard>
    <ColorCard className="bg-gray-m">gray-m</ColorCard>
  </div>
);
