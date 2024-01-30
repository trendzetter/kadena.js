import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { NumberField } from './NumberField';

import userEvent from '@testing-library/user-event';
import { Form } from '../Form';

// TODO: add more tests
describe('Textbox', () => {
  it('should render without errors', () => {
    render(<NumberField label="What is your name?" />);
    const textbox = screen.getByRole('textbox', { name: 'What is your name?' });
    expect(textbox).toBeInTheDocument();
  });

  it('should update value when use start typing ', async () => {
    render(<NumberField label="What is your name?" />);
    const textbox = screen.getByRole('textbox', { name: 'What is your name?' });
    await userEvent.type(textbox, 'John');
    expect(textbox).toHaveValue('John');
  });

  it('should render the provided description', () => {
    render(
      <NumberField
        label="What is your name?"
        description="This is a description"
      />,
    );
    const description = screen.getByText('This is a description');
    expect(description).toBeInTheDocument();
  });

  it('should render the provided error message', () => {
    render(
      <NumberField
        label="What is your name?"
        description="This is a description"
        isInvalid
        errorMessage="This is an error message"
      />,
    );
    const errorMessage = screen.getByText('This is an error message');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should render the provided start addon', () => {
    render(
      <NumberField label="What is your name?" startAddon={<span>icon</span>} />,
    );
    const icon = screen.getByText('icon');
    expect(icon).toBeInTheDocument();
  });

  it('should disable the input when isDisabled prop is true', () => {
    render(<NumberField label="What is your name?" disabled />);
    const textbox = screen.getByRole('textbox', { name: 'What is your name?' });
    expect(textbox).toBeDisabled();
  });

  it('should render the provided value', () => {
    render(<NumberField label="What is your name?" value={9} />);
    const textbox = screen.getByRole('textbox', { name: 'What is your name?' });
    expect(textbox).toHaveValue('John');
  });

  it('should render the provided placeholder', () => {
    render(
      <NumberField label="What is your name?" placeholder="Enter your name" />,
    );
    const textbox = screen.getByRole('textbox', { name: 'What is your name?' });
    expect(textbox).toHaveAttribute('placeholder', 'Enter your name');
  });

  it('should render the provided label', () => {
    render(<NumberField label="What is your name?" />);
    const label = screen.getByText('What is your name?');
    expect(label).toBeInTheDocument();
  });

  it('should show native validation error rendered inside a Form and validationBehavior="native"', async () => {
    render(
      <Form>
        <NumberField
          label="What is your name?"
          isRequired
          validationBehavior="native"
        />
        <button type="submit">Submit</button>
      </Form>,
    );
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);
    const textbox = screen.getByRole('textbox', { name: 'What is your name?' });
    expect(textbox).toBeInvalid();
  });
});
