import AceViewerComponent from './index';

import { render, screen } from '@testing-library/react';
import React from 'react';

describe('AceViewerComponent', () => {
  test('renders correctly without code', () => {
    render(<AceViewerComponent />);

    // Assert that the AceEditor component is rendered
    const aceEditor = screen.getByRole('textbox');
    expect(aceEditor).toBeInTheDocument();

    // Assert that the AceEditor component has the default props
    expect(aceEditor).toHaveValue('');
  });
});
