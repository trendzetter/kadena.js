import { type IInputProps, Input } from '@components/Input';
import {
  type IInputWrapperProps,
  InputWrapper,
} from '@components/InputWrapper';
import React, { type FC } from 'react';

export interface ITextFieldProps
  extends Omit<IInputWrapperProps, 'children' | 'htmlFor'> {
  inputProps: Omit<IInputProps, 'disabled' | 'children' | 'leadingTextWidth'>;
}

export const TextField: FC<ITextFieldProps> = ({
  disabled = false,
  inputProps,
  ...rest
}) => {
  const { id } = inputProps;

  return (
    <InputWrapper htmlFor={id} disabled={disabled} {...rest}>
      <Input disabled={disabled} {...inputProps} />
    </InputWrapper>
  );
};
