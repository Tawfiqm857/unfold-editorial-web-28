
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
          ? 'bg-background/80 backdrop-blur-md shadow-sm border-b' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-xl flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-serif font-semibold tracking-tighter">
            Unfold<span className="text-muted-foreground/60">.</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/category/culture" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Culture
          </Link>
          <Link to="/category/business" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Business
          </Link>
          <Link to="/category/lifestyle" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Lifestyle
          </Link>
          <Link to="/category/creators" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Creators
          </Link>
          <Link to="/category/insights" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Insights
          </Link>
          <Link to="/shop" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Shop
          </Link>
          {user ? (
            <Button 
              variant="ghost" 
              onClick={handleSignOut}
              className="text-sm font-medium hover:text-primary/80 transition-colors"
            >
              Sign Out
            </Button>
          ) : (
            <Link to="/auth" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Sign In / Sign Up
            </Link>
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
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
        className={`md:hidden transition-all duration-300 ease-in-out bg-background border-b overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'
        }`}
      >
        <nav className="container flex flex-col space-y-4 pb-4">
          <Link 
            to="/category/culture" 
            className="text-lg font-medium px-4 py-2 hover:bg-muted rounded-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Culture
          </Link>
          <Link 
            to="/category/business" 
            className="text-lg font-medium px-4 py-2 hover:bg-muted rounded-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Business
          </Link>
          <Link 
            to="/category/lifestyle" 
            className="text-lg font-medium px-4 py-2 hover:bg-muted rounded-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Lifestyle
          </Link>
          <Link 
            to="/category/creators" 
            className="text-lg font-medium px-4 py-2 hover:bg-muted rounded-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Creators
          </Link>
          <Link 
            to="/category/insights" 
            className="text-lg font-medium px-4 py-2 hover:bg-muted rounded-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Insights
          </Link>
          <Link 
            to="/shop" 
            className="text-lg font-medium px-4 py-2 hover:bg-muted rounded-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop
          </Link>
          {user ? (
            <Button 
              variant="ghost" 
              onClick={handleSignOut}
              className="text-lg font-medium px-4 py-2 hover:bg-muted rounded-md text-left justify-start"
            >
              Sign Out
            </Button>
          ) : (
            <Link 
              to="/auth" 
              className="text-lg font-medium px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In / Sign Up
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
