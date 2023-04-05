import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const welcomeText = screen.getByText(/Welcome/i);
  expect(welcomeText).toBeInTheDocument();
});
