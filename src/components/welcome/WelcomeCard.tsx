
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface WelcomeCardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  to?: string;
  buttonText?: string;
  variant?: 'default' | 'admin' | 'user';
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ 
  title = "Welcome to Voli", 
  description = "Start measuring and tracking your impact today", 
  icon, 
  to = "/dashboard", 
  buttonText = "Get Started",
  variant = 'default'
}) => {
  const getCardClassName = () => {
    switch (variant) {
      case 'admin':
        return "border-2 border-amber-400/60";
      case 'user':
        return "border-2 border-blue-400/60";
      default:
        return "border-2 border-voli-primary/20";
    }
  };

  return (
    <Card className={getCardClassName()}>
      <CardContent className="p-6 space-y-4">
        <div className="flex flex-col items-center text-center space-y-2">
          {icon && <div className="text-voli-primary">{icon}</div>}
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-500">{description}</p>
        </div>
        
        <Button asChild className="w-full bg-voli-primary hover:bg-voli-secondary text-black">
          <Link to={to}>
            {buttonText}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
