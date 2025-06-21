
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { TableOfContents } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from "./ui/button";
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <Header />
      {isHomePage && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 animate-slide-in">
          <Link to="/table-of-contents">
            <Button size="icon" variant="secondary" className="rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105" aria-label="Table of Contents">
              <TableOfContents className="h-5 w-5" />
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      )}
      {!isAuthPage && !isHomePage && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
          <ThemeToggle />
        </div>
      )}
      <main className="flex-grow transition-all duration-300">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
