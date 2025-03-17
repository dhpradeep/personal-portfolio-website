import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext';
import Footer from '../Footer';

const renderWithProviders = (ui) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
};

describe('Footer Component', () => {
  test('renders copyright information', () => {
    renderWithProviders(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} Your Name`, 'i'))).toBeInTheDocument();
  });

  test('renders social media links', () => {
    renderWithProviders(<Footer />);
    
    // Check if social links are rendered
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.length).toBeGreaterThanOrEqual(4); // GitHub, LinkedIn, Twitter, Email
    
    // Check if links have correct attributes
    const githubLink = socialLinks.find(link => link.href.includes('github.com'));
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});