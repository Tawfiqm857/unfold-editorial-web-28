
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  
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
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/category/culture" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Culture
          </Link>
          <Link to="/category/business" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Business
          </Link>
          <Link to="/category/lifestyle" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Lifestyle
          </Link>
          <Link to="/category/creators" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Creators
          </Link>
          <Link to="/category/insights" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Insights
          </Link>
          <Link to="/shop" className="text-sm font-medium text-foreground hover:text-primary transition-colors border border-border px-3 py-1 rounded-md hover:bg-accent">
            Shop
          </Link>
          {user ? (
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="text-sm font-medium"
              size="sm"
            >
              Sign Out
            </Button>
          ) : (
            <Button asChild variant="default" size="sm">
              <Link to="/auth" className="text-sm font-medium">
                Sign In / Sign Up
              </Link>
            </Button>
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </>
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out bg-background/95 backdrop-blur-md border-b overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'
        }`}
      >
        <nav className="container mx-auto px-4 flex flex-col space-y-3 pb-4">
          <Link 
            to="/category/culture" 
            className="text-lg font-medium px-4 py-3 hover:bg-accent rounded-md text-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Culture
          </Link>
          <Link 
            to="/category/business" 
            className="text-lg font-medium px-4 py-3 hover:bg-accent rounded-md text-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Business
          </Link>
          <Link 
            to="/category/lifestyle" 
            className="text-lg font-medium px-4 py-3 hover:bg-accent rounded-md text-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Lifestyle
          </Link>
          <Link 
            to="/category/creators" 
            className="text-lg font-medium px-4 py-3 hover:bg-accent rounded-md text-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Creators
          </Link>
          <Link 
            to="/category/insights" 
            className="text-lg font-medium px-4 py-3 hover:bg-accent rounded-md text-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Insights
          </Link>
          <Link 
            to="/shop" 
            className="text-lg font-medium px-4 py-3 hover:bg-accent rounded-md text-foreground border border-border"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop Printed Copies
          </Link>
          {user ? (
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="text-lg font-medium mx-4 justify-start"
            >
              Sign Out
            </Button>
          ) : (
            <Button asChild className="mx-4">
              <Link 
                to="/auth" 
                className="text-lg font-medium text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In / Sign Up
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
