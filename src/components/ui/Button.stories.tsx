import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button } from './button';

export default {
  title: 'Components/UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<React.ComponentProps<typeof Button>> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  variant: 'default',
  size: 'default',
};

export const Destructive = Template.bind({});
Destructive.args = {
  children: 'Destructive',
  variant: 'destructive',
  size: 'default',
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Outline',
  variant: 'outline',
  size: 'default',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary',
  variant: 'secondary',
  size: 'default',
};

export const Ghost = Template.bind({});
Ghost.args = {
  children: 'Ghost',
  variant: 'ghost',
  size: 'default',
};

export const Link = Template.bind({});
Link.args = {
  children: 'Link',
  variant: 'link',
  size: 'default',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small',
  variant: 'default',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large',
  variant: 'default',
  size: 'lg',
};

export const Icon = Template.bind({});
Icon.args = {
  children: 'Icon',
  variant: 'default',
  size: 'icon',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  variant: 'default',
  size: 'default',
  disabled: true,
};