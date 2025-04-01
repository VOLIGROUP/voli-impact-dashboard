
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { getUnseenKudos, markAllKudosAsSeenForUser } from '@/services/mockKudos';
import { useAuth } from '@/contexts/AuthContext';

export const useConfetti = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    if (user) {
      // Check for unseen kudos
      const unseenKudos = getUnseenKudos(user.id);
      
      if (unseenKudos.length > 0) {
        // Show confetti
        setShowConfetti(true);
        
        // Show toast notification
        toast({
          title: "You've received kudos!",
          description: `${unseenKudos.length} new kudos from your colleagues.`,
        });
        
        // Hide confetti after 5 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
        
        // Mark all kudos as seen
        markAllKudosAsSeenForUser(user.id);
      }
    }
  }, [user, toast]);
  
  return { showConfetti };
};
