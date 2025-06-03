
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
          onClick={onSignOut}
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
  );
};

export default DesktopNavigation;
