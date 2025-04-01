
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

interface WelcomeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  buttonText: string;
  variant?: 'default' | 'admin' | 'user';
  onClick?: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ 
  title, 
  description, 
  icon, 
  to, 
  buttonText,
  variant = 'default',
  onClick
}) => {
  const getBgColor = () => {
    switch (variant) {
      case 'admin':
        return 'bg-gradient-to-br from-sky-100 to-blue-100 border-sky-200';
      case 'user':
        return 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-200';
      default:
        return 'bg-gradient-to-br from-gray-50 to-gray-100';
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-md ${getBgColor()}`}>
      <CardHeader className="pb-2">
        <div className="mb-2 text-primary">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full gap-2 justify-between">
          <Link to={to} onClick={handleClick}>
            {buttonText}
            <ArrowRight size={16} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WelcomeCard;
