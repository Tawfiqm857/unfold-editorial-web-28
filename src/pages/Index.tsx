import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import UserProfile from '@/components/UserProfile';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to Our Magazine
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover amazing articles, insights, and stories from our community of writers.
            </p>
          </div>

          {user ? (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Welcome back, {user.email}!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  You're successfully logged in. Explore the magazine content or manage your profile.
                </p>
              </div>
              
              <UserProfile />
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/table-of-contents">
                  <Button size="lg" className="w-full sm:w-auto">
                    Browse Articles
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center space-y-8">
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
                  <Button size="lg" className="w-full">
                    Sign In / Sign Up
                  </Button>
                </Link>
                <Link to="/table-of-contents">
                  <Button variant="outline" size="lg" className="w-full">
                    Browse Articles
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
