import React from 'react';
import { ButtonIcon } from '../../components/button-icon';
import { IconMotorcycle } from './../../components/icon-motorcycle';
import { colors } from '../../styles';

export const CheckoutButton = ({
  count = 0,
  className = '',
  onClick = () => {},
}) => 
  <div className={`inline-flex items-center ${className}`}>
    {count}
    <ButtonIcon onClick={onClick} className="ml-2" Icon={<IconMotorcycle color={colors.white} width={30} height={30} />}>
      Checkout
    </ButtonIcon>
  </div>