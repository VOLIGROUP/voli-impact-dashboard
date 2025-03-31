
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <img src="/voli-logo.png" alt="VOLI" className="h-16 mb-8" />
      
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! We couldn't find the page you're looking for.
      </p>
      
      <div className="flex space-x-4">
        <Button asChild variant="outline">
          <Link to="/dashboard">
            <Home className="h-4 w-4 mr-2" />
            Go to Dashboard
          </Link>
        </Button>
        
        <Button
          asChild
          className="bg-voli-primary hover:bg-voli-secondary text-black"
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
