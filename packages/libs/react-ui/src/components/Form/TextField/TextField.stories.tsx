import type { ITextFieldProps } from '@components/Form';
import { TextField } from '@components/Form';
import { statusVariant } from '@components/Form/FormFieldWrapper/FormFieldWrapper.css';
import { SystemIcon } from '@components/Icon';
import type { Meta, StoryObj } from '@storybook/react';
import { vars } from '@theme/vars.css';
import React from 'react';

type StoryProps = {
  helperText: string;
  leadingText: string;
  startIcon: React.ReactElement | '-';
} & Omit<ITextFieldProps, 'startIcon'>;

const meta: Meta<StoryProps> = {
  title: 'Form/TextField',
  parameters: {
    status: { type: 'inDevelopment' },
    docs: {
      description: {
        component:
          'TextField is the composition of Input and FormFieldWrapper to provide an input with a label, helper text, and other peripheral information.',
      },
    },
  },
  argTypes: {
    label: {
      description: 'Label for the input',
      control: {
        type: 'text',
      },
    },
    tag: {
      description: 'Tag that is rendered next to the label',
      control: {
        type: 'text',
      },
    },
    info: {
      description: 'Text that is rendered on the top right with an info icon',
      control: {
        type: 'text',
      },
    },
    helperText: {
      description:
        'Text that is rendered below the input to give the user additional information. Often will be used for validation messages.',
      control: {
        type: 'text',
      },
    },
    leadingText: {
      description: "Leading text that is rendered inside the input's border.",
      control: {
        type: 'text',
      },
    },
    leadingTextWidth: {
      description:
        'Width of the leading text. Defaults to the size of the text itself.',
      control: {
        type: 'select',
      },
      options: [
        undefined,
        ...Object.keys(vars.sizes).map((key) => key as keyof typeof vars.sizes),
      ],
    },
    status: {
      options: [
        undefined,
        ...(Object.keys(statusVariant) as (keyof typeof statusVariant)[]),
      ],
      description:
        'This determines the color of the helper text and input border. It can be used to indicate an error.',
      control: {
        type: 'select',
      },
    },
    disabled: {
      description: 'Disables the input and applies visual styling.',
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    startIcon: {
      description:
        'Icon rendered inside the input to the left of the input text.',
      options: ['-', ...Object.keys(SystemIcon)],
      control: {
        type: 'select',
      },
    },
  },
};

type Story = StoryObj<StoryProps>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/react/api/csf
 * to learn how to use render functions.
 */

export const Group: Story = {
  name: 'Text Field',
  args: {
    tag: 'tag',
    helperText: 'This is helper text',
    info: '(optional)',
    label: 'Label',
    disabled: false,
    status: undefined,
    startIcon: <SystemIcon.Account />,
    leadingText: 'Leading',
    leadingTextWidth: undefined,
  },
  render: ({
    leadingText,
    startIcon,
    disabled,
    status,
    tag,
    helperText,
    info,
    label,
    leadingTextWidth,
  }) => {
    // Fix this to render the selection
    // const IconComponent =
    //   startIcon !== '-'
    //     ? SystemIcon[startIcon as unknown as keyof typeof SystemIcon]
    //     : undefined;

    return (
      <TextField
        tag={tag}
        info={info}
        label={label}
        status={status}
        disabled={disabled}
        helperText={helperText}
        leadingTextWidth={leadingTextWidth}
        inputProps={{
          id: 'inputStory',
          leadingText,
          startIcon: startIcon !== '-' ? startIcon : undefined,
          placeholder: 'This is a placeholder',
        }}
      />
    );
  },
};

export default meta;
