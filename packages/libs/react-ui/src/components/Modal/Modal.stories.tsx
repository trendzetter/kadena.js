import { Button } from '@components/Button';
import type { IModalProps } from '@components/Modal';
import { Modal } from '@components/Modal';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ModalContent } from './StoryComponents';

import { useModal } from './useModal';

const meta: Meta<{ title?: string } & IModalProps> = {
  title: 'Layout/Modal',
  parameters: {
    status: {
      type: ['inDevelopment'],
    },
    docs: {
      description: {
        component:
          'The component library exposes a `ModalProvider` and `useModal` hook that can be used with an element with id "modalportal" to display content in a modal.<br><br>To render a modal you need to add `<div id="modalportal" />` as the last child of the document body and wrap your content in the `ModalProvider` component. Then you can pass jsx and a title to the `renderModal` function from the `useModal` hook to render content in the modal.<br><br>See the code for this story for an example.',
      },
    },
  },
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
      description: 'Title of the modal.',
    },
  },
};

export default meta;
type Story = StoryObj<{ title?: string } & IModalProps>;

export const Primary: Story = {
  name: 'Modal',
  args: {
    title: 'Modal Title',
  },
  render: ({ title }) => {
    const { triggerProps, modalProps } = useModal();

    return (
      <>
        <Button {...triggerProps}>Modal Trigger</Button>
        <Modal {...modalProps} title={title}>
          <ModalContent />
        </Modal>
      </>
    );
  },
};
