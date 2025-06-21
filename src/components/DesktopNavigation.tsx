
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

interface DesktopNavigationProps {
  onSignOut: () => Promise<void>;
}

const DesktopNavigation = ({ onSignOut }: DesktopNavigationProps) => {
  const { user } = useAuth();

  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link 
        to="/category/culture" 
        className="text-sm font-medium text-foreground hover:text-primary transition-all duration-200 hover:scale-105"
      >
        Culture
      </Link>
      <Link 
        to="/category/business" 
        className="text-sm font-medium text-foreground hover:text-primary transition-all duration-200 hover:scale-105"
      >
        Business
      </Link>
      <Link 
        to="/category/lifestyle" 
        className="text-sm font-medium text-foreground hover:text-primary transition-all duration-200 hover:scale-105"
      >
        Lifestyle
      </Link>
      <Link 
        to="/category/creators" 
        className="text-sm font-medium text-foreground hover:text-primary transition-all duration-200 hover:scale-105"
      >
        Creators
      </Link>
      <Link 
        to="/category/insights" 
        className="text-sm font-medium text-foreground hover:text-primary transition-all duration-200 hover:scale-105"
      >
        Insights
      </Link>
      <Link 
        to="/shop" 
        className="text-sm font-medium text-foreground hover:text-primary transition-all duration-200 border border-border hover:border-primary px-3 py-1 rounded-md hover:bg-accent/50 hover:scale-105"
      >
        Shop
      </Link>
      {user ? (
        <Button 
          variant="outline" 
          onClick={onSignOut}
          className="text-sm font-medium hover:scale-105 transition-all duration-200"
          size="sm"
        >
          Sign Out
        </Button>
      ) : (
        <Button 
          asChild 
          variant="default" 
          size="sm" 
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:scale-105 transition-all duration-200"
        >
          <Link to="/auth" className="text-sm font-medium">
            Sign In / Sign Up
          </Link>
        </Button>
      )}
    </nav>
  );
};

export default DesktopNavigation;
