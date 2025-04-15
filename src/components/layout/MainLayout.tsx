
import { ReactNode } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isAuthPage = location.pathname.includes("/auth");
  
  // Mock auth state - in a real app this would come from your auth context
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole") || "";

  const handleSignIn = () => {
    navigate("/auth/login");
  };

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case "victim":
        return "/dashboard";
      case "intern":
        return "/dashboard/intern";
      case "lawyer":
        return "/dashboard/lawyer";
      default:
        return "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-law-50 to-white">
      {!isAuthPage && (
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="container mx-auto py-4 px-4 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-law-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">LC</span>
              </div>
              <h1 className="text-xl font-semibold text-law-800">Legal Consult</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-law-700 hover:text-law-900 font-medium transition-colors">
                Home
              </Link>
              {isLoggedIn && (
                <>
                  <Link 
                    to={getDashboardLink()} 
                    className="text-law-700 hover:text-law-900 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/directory" 
                    className="text-law-700 hover:text-law-900 font-medium transition-colors"
                  >
                    Lawyer Directory
                  </Link>
                </>
              )}
              {isLoggedIn ? (
                <Button 
                  onClick={handleSignOut}
                  className="bg-law-600 hover:bg-law-700 text-white"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              ) : (
                <Button 
                  onClick={handleSignIn}
                  className="bg-law-600 hover:bg-law-700 text-white"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              )}
            </nav>
            <button className="md:hidden text-law-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </header>
      )}
      <main className="container mx-auto px-4 py-6">{children}</main>
      <footer className="bg-law-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal Consult</h3>
              <p className="text-sm text-gray-300">
                Connecting victims' families with legal support through skilled interns and experienced lawyers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-sm text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-sm text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <p className="text-sm text-gray-300 mb-2">
                <span className="block">Email: info@legalconsult.com</span>
                <span className="block">Phone: (555) 123-4567</span>
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Legal Consult. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
