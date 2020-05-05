import React from 'react';

export default {
  title: 'Typography',
  // component: Button,
};


const TextCard = ({ className, children }) => (
  <p className={`${className}`}>{children}</p>
)


export const Colors = () => (
  <div>
    <TextCard className="heading-1">heading-1</TextCard>
    <TextCard className="heading-2">heading-2</TextCard>
    <TextCard className="copy">copy</TextCard>
    <TextCard className="copy-bold">copy-bold</TextCard>
    <TextCard className="emphasize">emphasize</TextCard>
  </div>
);
