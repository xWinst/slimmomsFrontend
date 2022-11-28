import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

// Запуск: npm test
// Launches the test runner in the interactive watch mode.
// See the section about running tests for more information.
// https://facebook.github.io/create-react-app/docs/running-tests
