
import { Button } from "@/components/ui/button";

interface MobileMenuButtonProps {
  isMobileMenuOpen: boolean;
  onToggle: () => void;
}

const MobileMenuButton = ({ isMobileMenuOpen, onToggle }: MobileMenuButtonProps) => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="md:hidden"
      onClick={onToggle}
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
  );
};

export default MobileMenuButton;
