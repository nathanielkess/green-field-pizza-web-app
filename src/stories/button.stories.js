import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { ButtonPrimary } from '../ui/components/button-primary';
import { ButtonPill } from '../ui/components/button-pill';
import { ButtonSecondary } from '../ui/components/button-secondary';
import { IconMotorcycle } from './../ui/components/icon-motorcycle';
import { colors } from './../ui/styles'
import { ButtonIcon } from '../ui/components/button-icon';

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

