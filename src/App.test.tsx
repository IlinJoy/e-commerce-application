import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('renders the heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: "I'm App!" })).toBeInTheDocument();
  });
});
