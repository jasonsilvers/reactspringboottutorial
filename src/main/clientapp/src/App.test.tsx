import React from 'react';
import { render, waitForDomChange, screen } from '@testing-library/react';
import App from './App';

test('Show loading spinner', () => {
    const { getByText } = render(<App />);
    // expect(screen.getByText("No StudentsList")).toBeInTheDocument();
});
