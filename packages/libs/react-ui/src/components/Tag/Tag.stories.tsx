import { Button } from '@components/Button';
import { type ITagProps, Tag } from '@components/Tag';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta<
  {
    hasClose: boolean;
    text: string;
  } & ITagProps
> = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
    },
    hasClose: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<
  {
    text: string;
    hasClose: boolean;
  } & ITagProps
>;

export const Primary: Story = {
  name: 'Tag',
  args: {
    text: 'Chain:1',
    hasClose: true,
  },
  render: ({ text, hasClose }) => {
    const [closed, setClosed] = useState(false);

    if (closed) return <Button onClick={() => setClosed(false)}>Reset</Button>;
    return (
      <Tag onClose={hasClose ? () => setClosed(true) : undefined}>{text}</Tag>
    );
  },
};
