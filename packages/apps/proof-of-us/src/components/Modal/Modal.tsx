//@TODO: this modal needs to much nicer. but for now it does the job

import { Stack } from '@kadena/react-ui';
import type { FC, MouseEventHandler, PropsWithChildren } from 'react';
import { useRef } from 'react';
import { Heading } from '../Typography/Heading';
import { backgroundClass, dialogClass } from './style.css';

interface IProps extends PropsWithChildren {
  label: string;
  onClose: () => void;
}

export const Modal: FC<IProps> = ({ label, children, onClose }) => {
  const backRef = useRef<HTMLButtonElement>(null);

  const handleClose: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();

    if (evt.target !== backRef.current) return;
    onClose();
  };
  return (
    <button ref={backRef} className={backgroundClass} onClick={handleClose}>
      <section className={dialogClass}>
        <Stack paddingBlock="md">
          <Heading as="h6">{label}</Heading>
        </Stack>
        {children}
      </section>
    </button>
  );
};