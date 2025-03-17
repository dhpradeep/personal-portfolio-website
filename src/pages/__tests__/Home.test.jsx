import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import Home from '../Home';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        {ui}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Home Page', () => {
  test('renders hero section with name and title', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByText(/Hello, I'm/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
  });

  test('renders call-to-action buttons', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByText(/View My Work/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Me/i)).toBeInTheDocument();
  });

  test('buttons have correct links', () => {
    renderWithProviders(<Home />);
    
    const viewWorkButton = screen.getByText(/View My Work/i).closest('a');
    const contactButton = screen.getByText(/Contact Me/i).closest('a');
    
    expect(viewWorkButton).toHaveAttribute('href', '/projects');
    expect(contactButton).toHaveAttribute('href', '/contact');
  });

  test('buttons are clickable', () => {
    renderWithProviders(<Home />);
    
    const viewWorkButton = screen.getByText(/View My Work/i).closest('button');
    const contactButton = screen.getByText(/Contact Me/i).closest('button');
    
    fireEvent.click(viewWorkButton);
    fireEvent.click(contactButton);
  });

  test('renders description text', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByText(/I build responsive, user-friendly web applications/i)).toBeInTheDocument();
    expect(screen.getByText(/Passionate about creating intuitive user experiences/i)).toBeInTheDocument();
  });

  test('renders hero background', () => {
    renderWithProviders(<Home />);
    
    const heroBackground = document.querySelector('.bg-hero-pattern');
    expect(heroBackground).toBeInTheDocument();
  });
});