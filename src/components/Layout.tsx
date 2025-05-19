
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isHomePage && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          <Link to="/table-of-contents">
            <Button size="icon" variant="secondary" className="rounded-full shadow-md hover:shadow-lg transition-all" aria-label="Table of Contents">
              <TableOfContents className="h-5 w-5" />
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      )}
      <main className="flex-grow pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
