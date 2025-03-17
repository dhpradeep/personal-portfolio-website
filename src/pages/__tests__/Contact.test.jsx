import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext';
import Contact from '../Contact';

// Mock framer-motion and react-intersection-observer
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

jest.mock('react-intersection-observer', () => ({
  useInView: () => [jest.fn(), true],
}));

// Mock setTimeout
jest.useFakeTimers();

const renderWithProviders = (ui) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
};

describe('Contact Page', () => {
  test('renders contact section with heading', () => {
    renderWithProviders(<Contact />);
    
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
  });

  test('renders contact information', () => {
    renderWithProviders(<Contact />);
    
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/your\.email@example\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByText(/\+1 \(123\) 456-7890/i)).toBeInTheDocument();
    expect(screen.getByText(/Location/i)).toBeInTheDocument();
    expect(screen.getByText(/San Francisco, CA/i)).toBeInTheDocument();
  });

  test('renders contact form with all fields', () => {
    renderWithProviders(<Contact />);
    
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Message/i)).toBeInTheDocument();
    expect(screen.getByText(/Send Message/i)).toBeInTheDocument();
  });

  test('form validation works - requires all fields', () => {
    renderWithProviders(<Contact />);
    
    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Your Email/i);
    const messageInput = screen.getByLabelText(/Your Message/i);
    
    // Check if inputs have required attribute
    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(messageInput).toBeRequired();
  });

  test('form submission works correctly', async () => {
    renderWithProviders(<Contact />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Your Name/i), {
      target: { value: 'Test User' },
    });
    
    fireEvent.change(screen.getByLabelText(/Your Email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/Your Message/i), {
      target: { value: 'This is a test message' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByText(/Send Message/i));
    
    // Check if button text changes to "Sending..."
    expect(screen.getByText(/Sending.../i)).toBeInTheDocument();
    
    // Fast-forward timers
    jest.advanceTimersByTime(1500);
    
    // Check for success message
    expect(screen.getByText(/Your message has been sent successfully!/i)).toBeInTheDocument();
    
    // Check if form was reset
    expect(screen.getByLabelText(/Your Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Your Email/i)).toHaveValue('');
    expect(screen.getByLabelText(/Your Message/i)).toHaveValue('');
  });
});