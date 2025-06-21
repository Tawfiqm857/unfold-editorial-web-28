
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 animate-fade-in">
      <div className="text-center animate-scale-in">
        <h1 className="text-6xl font-bold mb-4 magazine-title animate-fade-in">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 animate-slide-in">
          Oops! Page not found
        </p>
        <p className="text-gray-500 dark:text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="hover:scale-105 transition-transform duration-200">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
