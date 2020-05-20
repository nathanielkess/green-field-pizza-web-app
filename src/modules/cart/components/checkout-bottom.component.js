import React from 'react';
import { ButtonIcon } from '../../../design-system/components/button-icon';
import { Icon } from '../../../design-system/components/icon';
import { colors } from '../../../design-system/styles';

export const CheckoutButton = ({
  count = 0,
  className = '',
  onClick = () => { },
}) =>
  <div className={`inline-flex items-center ${className}`}>
    {count}
    <ButtonIcon onClick={onClick} className="ml-2" Icon={<Icon name="motorcycle" color={colors.white} size={30} />}>
      Checkout
    </ButtonIcon>
  </div>