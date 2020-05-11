import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { ButtonPrimary } from './../components/button-primary';
import { ButtonPill } from './../components/button-pill';
import { ButtonSecondary } from './../components/button-secondary';
import { IconMotorcycle } from '././../components/icon-motorcycle';
import { colors } from './../styles'
import { ButtonIcon } from './../components/button-icon';

export default {
  title: 'Button',
  component: Button,
};

export const Primary = () => (
  <ButtonPrimary onClick={action('clicked')} className="text-center">Primary Button</ButtonPrimary>
);

export const Secondary = () => (
  <>
    <ButtonSecondary onClick={action('clicked')} className="text-center">Secondary Button</ButtonSecondary>
  </>
);

export const Icon = () => (
  <>
    <ButtonIcon 
      onClick={action('clicked')} 
      className="text-center"
      Icon={<IconMotorcycle color={colors.white} width={40} height={40} />}
      >
        Icon Button
    </ButtonIcon>
  </>
);

export const Pill = () => (
  <>
    <ButtonPill onClick={action('clicked')} className="text-center">Pill Off</ButtonPill>
    <br />
    <br />
    <ButtonPill onClick={action('clicked')} isOn className="text-center">Pill On</ButtonPill>
  </>
);

