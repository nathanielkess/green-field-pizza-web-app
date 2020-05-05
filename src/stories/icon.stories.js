import React from 'react';
import { IconX  } from './../ui/components/icon-x';
// import { colors } from './../ui/styles/'
import { colors } from './../ui/styles';
import { IconLeftArrow } from '../ui/components/icon-left-arrow';
import { IconMotorcycle } from '../ui/components/icon-motorcycle';

export default {
  title: 'Icons',
};



export const Icons = () => {
  return (
    <div>
      <IconX />
      <IconLeftArrow />
      <IconMotorcycle />
    </div>
  );
};