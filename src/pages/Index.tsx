
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UserProfile from '@/components/UserProfile';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 animate-fade-in">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-slide-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 magazine-title">
            Welcome to Unfold Magazine
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A bold new space where stories rise, style speaks, and every page drips with purpose and pulse.
          </p>
        </div>

        {user ? (
          <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Welcome back, {user.email}!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                You're successfully logged in. Explore the magazine content or manage your profile.
              </p>
            </div>
            
            <div className="transform transition-all duration-300 hover:scale-105">
              <UserProfile />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/table-of-contents">
                <Button size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform duration-200">
                  Browse Articles
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform duration-200">
                  Shop Printed Copies
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform duration-200">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Join Our Community
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Sign up or log in to access exclusive content and features.
              </p>
            </div>
            
            <div className="space-y-4">
              <Link to="/auth" className="block">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-transform duration-200">
                  Sign In / Sign Up
                </Button>
              </Link>
              <Link to="/table-of-contents">
                <Button variant="outline" size="lg" className="w-full hover:scale-105 transition-transform duration-200">
                  Browse Articles
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" size="lg" className="w-full hover:scale-105 transition-transform duration-200">
                  Shop Printed Copies
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
