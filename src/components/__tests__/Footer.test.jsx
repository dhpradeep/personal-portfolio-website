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

  test('renders all social icons', () => {
    renderWithProviders(<Footer />);
    
    // Check for specific social icons by their parent elements
    const socialIcons = document.querySelectorAll('.text-gray-600.dark\\:text-secondary');
    expect(socialIcons.length).toBeGreaterThanOrEqual(4);
  });

  test('renders responsive layout', () => {
    renderWithProviders(<Footer />);
    
    // Check for flex container
    const flexContainer = document.querySelector('.flex.flex-col.md\\:flex-row');
    expect(flexContainer).toBeInTheDocument();
  });

  test('renders all rights reserved text', () => {
    renderWithProviders(<Footer />);
    
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });
});