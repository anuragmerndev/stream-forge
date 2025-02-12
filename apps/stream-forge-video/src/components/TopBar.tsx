import React from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

interface TopBarProps {
  meetingName: string;
  participantCount: number;
  onToggleParticipants: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  meetingName,
  participantCount,
  onToggleParticipants,
}) => {
  const handleCopyInvite = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Meeting link copied to clipboard!');
  };

  return (
    <div className="w-full bg-gray-800/90 backdrop-blur-sm border-b border-gray-700/50">
      <div className="max-w-full mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-lg font-semibold">{meetingName}</h1>
        
        <div className="flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onToggleParticipants}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <Users size={20} />
            <span>{participantCount}</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyInvite}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            Invite
          </motion.button>
        </div>
      </div>
    </div>
  );
};