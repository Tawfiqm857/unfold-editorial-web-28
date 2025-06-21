
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

interface MobileNavigationProps {
  isMobileMenuOpen: boolean;
  onSignOut: () => Promise<void>;
  onMenuItemClick: () => void;
}

const MobileNavigation = ({ isMobileMenuOpen, onSignOut, onMenuItemClick }: MobileNavigationProps) => {
  const { user } = useAuth();

  return (
    <div 
      className={`md:hidden transition-all duration-300 ease-in-out bg-background/95 backdrop-blur-md border-b overflow-hidden ${
        isMobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'
      }`}
    >
      <nav className="container mx-auto px-4 flex flex-col space-y-3 pb-4">
        <Link 
          to="/category/culture" 
          className="text-lg font-medium px-4 py-3 hover:bg-accent rounded-md text-foreground transition-all duration-200 hover:scale-105"
          onClick={onMenuItemClick}
        >
          Culture
        </Link>
        <Link 
          to="/category/business" 
          className="text-lg font-medium px-4 py-3 hover:bg-accent rounded-md text-foreground transition-all duration-200 hover:scale-105"
          onClick={onMenuItemClick}
        >
          Business
        </Link>
        <Link 
          to="/category/lifestyle" 
          className="text-lg font-medium px-4 py-3 hover:bg-accent rounded-md text-foreground transition-all duration-200 hover:scale-105"
          onClick={onMenuItemClick}
        >
          Lifestyle
        </Link>
        <Link 
          to="/category/creators" 
          className="text-lg font-medium px-4 py-3 hover:bg-accent rounded-md text-foreground transition-all duration-200 hover:scale-105"
          onClick={onMenuItemClick}
        >
          Creators
        </Link>
        <Link 
          to="/category/insights" 
          className="text-lg font-medium px-4 py-3 hover:bg-accent rounded-md text-foreground transition-all duration-200 hover:scale-105"
          onClick={onMenuItemClick}
        >
          Insights
        </Link>
        <Link 
          to="/shop" 
          className="text-lg font-medium px-4 py-3 hover:bg-accent rounded-md text-foreground border border-border transition-all duration-200 hover:scale-105"
          onClick={onMenuItemClick}
        >
          Shop Magazine Copies
        </Link>
        {user ? (
          <Button 
            variant="outline" 
            onClick={onSignOut}
            className="text-lg font-medium mx-4 justify-start hover:scale-105 transition-all duration-200"
          >
            Sign Out
          </Button>
        ) : (
          <Button 
            asChild 
            className="mx-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:scale-105 transition-all duration-200"
          >
            <Link 
              to="/auth" 
              className="text-lg font-medium text-center"
              onClick={onMenuItemClick}
            >
              Sign In / Sign Up
            </Link>
          </Button>
        )}
      </nav>
    </div>
  );
};

export default MobileNavigation;
