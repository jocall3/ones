import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from './button';

export default {
  title: 'Components/UI/Card',
  component: Card,
  subcomponents: { CardHeader, CardTitle, CardDescription, CardContent, CardFooter },
  argTypes: {
    className: { control: 'text' },
  },
} as Meta;

const Template: Story = (args) => (
  <Card className={args.className}>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
      This is the card content. You can put anything here.
    </CardContent>
    <CardFooter>
      <Button>Action</Button>
    </CardFooter>
  </Card>
);

export const Default = Template.bind({});
Default.args = {};

export const WithCustomContent = (args) => (
  <Card className={args.className}>
    <CardHeader>
      <CardTitle>Custom Content Card</CardTitle>
      <CardDescription>This card has custom content.</CardDescription>
    </CardHeader>
    <CardContent>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </CardContent>
    <CardFooter>
      <Button>Another Action</Button>
    </CardFooter>
  </Card>
);

WithCustomContent.args = {};

export const WithNoHeader = (args) => (
  <Card className={args.className}>
    <CardContent>
      This card has no header.
    </CardContent>
    <CardFooter>
      <Button>Action</Button>
    </CardFooter>
  </Card>
);

WithNoHeader.args = {};

export const WithNoFooter = (args) => (
  <Card className={args.className}>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
      This card has no footer.
    </CardContent>
  </Card>
);

WithNoFooter.args = {};

export const WithCustomClassName = Template.bind({});
WithCustomClassName.args = {
  className: 'bg-blue-100 border-2 border-blue-500',
};