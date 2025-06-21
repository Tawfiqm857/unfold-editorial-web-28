
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import MobileMenuButton from './MobileMenuButton';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-lg border-b' 
          : 'bg-background/90 backdrop-blur-sm shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-serif font-semibold tracking-tighter text-foreground">
            Unfold<span className="text-muted-foreground/60">.</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <DesktopNavigation onSignOut={handleSignOut} />

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <MobileMenuButton 
            isMobileMenuOpen={isMobileMenuOpen}
            onToggle={toggleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileNavigation 
        isMobileMenuOpen={isMobileMenuOpen}
        onSignOut={handleSignOut}
        onMenuItemClick={handleMenuItemClick}
      />
    </header>
  );
};

export default Header;
