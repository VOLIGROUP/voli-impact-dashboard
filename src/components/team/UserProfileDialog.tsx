
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UserProfile from './UserProfile';

interface UserProfileDialogProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({ userId, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <UserProfile userId={userId} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
