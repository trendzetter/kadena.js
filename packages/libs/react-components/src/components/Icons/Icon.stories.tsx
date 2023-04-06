import { Grid } from '../Grid';
import { Stack } from '../Stack/Stack';
import { Text } from '../Typography';

import * as Icons from './';

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/react/api/csf
 * to learn how to use render functions.
 */
const meta: Meta<{ icon: string } & Icons.IIconProps> = {
  title: 'Icons',
  argTypes: {
    icon: {
      control: {
        type: 'text',
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;
type Story = StoryObj<{ icon: string } & Icons.IIconProps>;

export const Primary: Story = {
  name: 'Icon',
  args: {},
  render: ({ icon = '', size }) => {
    // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
    const searchRegexp = new RegExp(icon, 'i');
    return (
      <>
        <Grid.Container spacing="xl" templateColumns="repeat(6, 1fr)">
          {Object.entries(Icons)
            .filter(([k]) => searchRegexp.test(k))
            // eslint-disable-next-line @typescript-eslint/naming-convention
            .map(([k, Icon]) => (
              <Grid.Item key={k}>
                <Stack direction="column" alignItems="center" spacing="xs">
                  <Icon size={size} />
                  <Text size="sm">{k}</Text>
                </Stack>
              </Grid.Item>
            ))}
        </Grid.Container>
      </>
    );
  },
};
