
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditableUserProfile from './EditableUserProfile';

interface UserProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <EditableUserProfile onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
