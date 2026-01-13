import React from 'react';
import { Story, Meta } from '@storybook/react';
import DataTable from './DataTable';

export default {
  title: 'Components/UI/DataTable',
  component: DataTable,
  argTypes: {
    columns: {
      control: 'array',
      description: 'Array of column definitions',
    },
    data: {
      control: 'array',
      description: 'Array of data objects',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the data is loading',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    onRowClick: {
      action: 'clicked',
      description: 'Callback function for row click',
    },
  },
} as Meta;

const Template: Story<React.ComponentProps<typeof DataTable>> = (args) => <DataTable {...args} />;

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Age', accessor: 'age' },
  { Header: 'Occupation', accessor: 'occupation' },
];

const data = [
  { name: 'John Doe', age: 30, occupation: 'Software Engineer' },
  { name: 'Jane Smith', age: 25, occupation: 'Data Scientist' },
  { name: 'Peter Jones', age: 40, occupation: 'Project Manager' },
];

export const Default = Template.bind({});
Default.args = {
  columns: columns,
  data: data,
};

export const Loading = Template.bind({});
Loading.args = {
  columns: columns,
  data: [],
  loading: true,
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  columns: columns,
  data: [],
  error: 'Failed to load data.',
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  columns: columns,
  data: [],
};

export const WithRowClick = Template.bind({});
WithRowClick.args = {
  columns: columns,
  data: data,
  onRowClick: (row) => alert(`Clicked on row: ${row.name}`),
};