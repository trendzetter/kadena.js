import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';
import { LeadingIcon, Plus, TrailingIcon } from '../Icon/System/SystemIcon';
import { Box } from '../Layout/Box/Box';
import { Heading } from '../Typography/Heading/Heading';
import type { IButtonProps } from './NewButton';
import { Button } from './NewButton';
import { button } from './NewButton.css';

// eslint-disable-next-line @kadena-dev/typedef-var
const buttonVariants = Object.keys(
  (button as any).classNames?.variants?.variant,
) as IButtonProps['variant'][];

// eslint-disable-next-line @kadena-dev/typedef-var
const buttonColors = Object.keys(
  (button as any).classNames?.variants?.color,
) as IButtonProps['color'][];

const meta: Meta<IButtonProps> = {
  title: 'Components/NewButton',
  component: Button,
  parameters: {
    status: { type: 'inDevelopment' },
    controls: {
      hideNoControlsWarning: true,
      sort: 'requiredFirst',
    },
    docs: {
      description: {
        component:
          'The Button component renders a button which will be styled according to the variant prop (`primary` being the default)',
      },
    },
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      description: '(deprecated) callback when button is clicked',
      table: {
        disable: true,
      },
    },
    variant: {
      options: buttonVariants,
      control: {
        type: 'select',
      },
      description: 'button style variant',
      table: {
        type: { summary: buttonVariants.join(' | ') },
        defaultValue: { summary: 'default' },
      },
    },
    color: {
      options: buttonColors,
      control: {
        type: 'select',
      },
      description: 'button color variant',
      table: {
        type: { summary: buttonColors.join(' | ') },
        defaultValue: { summary: 'default' },
      },
    },
    isDisabled: {
      description: 'only used when rendered as button',
      control: {
        type: 'boolean',
      },
    },
    isLoading: {
      description: 'loading state',
      control: {
        type: 'boolean',
      },
    },
    isCompact: {
      description: 'compact button style',
      control: {
        type: 'boolean',
      },
    },
  },
};

type Story = StoryObj<
  {
    text: string;
  } & IButtonProps
>;

export const Default: Story = {
  name: 'Button',
  args: {
    text: 'Click me',
    variant: 'contained',
    color: 'primary',
    isDisabled: false,
    isCompact: false,
    isLoading: false,
    icon: undefined,
    startIcon: undefined,
    endIcon: undefined,
  },
  render: ({ text, ...props }) => {
    return <Button {...props}>{text}</Button>;
  },
};

export const AllVariants: StoryFn<IButtonProps> = ({
  isCompact,
  isDisabled,
  isLoading,
}) => (
  <Box gap="$2" display="flex">
    <Box gap="$2" display="flex" flexDirection="column" alignItems="flex-start">
      <Heading variant="h6">Default</Heading>
      {buttonColors.map((color) => (
        <Button
          key={color}
          color={color}
          isCompact={isCompact}
          isDisabled={isDisabled}
          isLoading={isLoading}
          startIcon={<LeadingIcon />}
          endIcon={<TrailingIcon />}
        >
          {color}
        </Button>
      ))}
    </Box>

    <Box gap="$2" display="flex" flexDirection="column" alignItems="flex-start">
      <Heading variant="h6">Alternative</Heading>
      {buttonColors.map((color) => (
        <Button
          key={color}
          color={color}
          variant="alternative"
          isCompact={isCompact}
          isDisabled={isDisabled}
          isLoading={isLoading}
          startIcon={<LeadingIcon />}
          endIcon={<TrailingIcon />}
        >
          {color}
        </Button>
      ))}
    </Box>

    <Box gap="$2" display="flex" flexDirection="column" alignItems="flex-start">
      <Heading variant="h6">Outlined</Heading>
      {buttonColors.map((color) => (
        <Button
          key={color}
          color={color}
          variant="outlined"
          isCompact={isCompact}
          isDisabled={isDisabled}
          isLoading={isLoading}
          startIcon={<LeadingIcon />}
          endIcon={<TrailingIcon />}
        >
          {color}
        </Button>
      ))}
    </Box>

    <Box gap="$2" display="flex" flexDirection="column" alignItems="flex-start">
      <Heading variant="h6">Text</Heading>
      {buttonColors.map((color) => (
        <Button
          key={color}
          color={color}
          variant="text"
          isCompact={isCompact}
          isDisabled={isDisabled}
          isLoading={isLoading}
          startIcon={<LeadingIcon />}
          endIcon={<TrailingIcon />}
        >
          {color}
        </Button>
      ))}
    </Box>
  </Box>
);

export const StartIcon: StoryFn<IButtonProps> = ({
  isCompact,
  isDisabled,
  isLoading,
  color,
  variant,
}) => (
  <Button
    startIcon={<Plus />}
    isCompact={isCompact}
    isDisabled={isDisabled}
    isLoading={isLoading}
    color={color}
    variant={variant}
  >
    Click me
  </Button>
);

export const EndIcon: StoryFn<IButtonProps> = ({
  isCompact,
  isDisabled,
  isLoading,
  color,
  variant,
}) => (
  <Button
    endIcon={<Plus />}
    isCompact={isCompact}
    isDisabled={isDisabled}
    isLoading={isLoading}
    color={color}
    variant={variant}
  >
    Click me
  </Button>
);

export const OnlyIcon: StoryFn<IButtonProps> = ({
  isCompact,
  isDisabled,
  isLoading,
  color,
  variant,
}) => (
  <Button
    icon={<Plus />}
    isCompact={isCompact}
    isDisabled={isDisabled}
    isLoading={isLoading}
    color={color}
    variant={variant}
  />
);

export default meta;
