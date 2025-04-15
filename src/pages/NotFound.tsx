
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h1 className="text-9xl font-bold text-blue-900">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 max-w-md mt-6">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Button size="lg" className="mt-8 bg-blue-700 hover:bg-blue-800">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </MainLayout>
  );
};

export default NotFound;
