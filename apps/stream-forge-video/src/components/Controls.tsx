import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, Phone, MonitorUp, MessageCircle } from 'lucide-react';

interface ControlsProps {
  isAudioOn: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onEndCall: () => void;
  onToggleChat: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isAudioOn,
  isVideoOn,
  isScreenSharing,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onEndCall,
  onToggleChat,
}) => {
  return (
    <div className="px-6 py-4 bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700/50">
      <div className="flex items-center space-x-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onToggleAudio}
          className={`p-4 rounded-xl ${
            isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
          } transition-colors`}
        >
          {isAudioOn ? <Mic size={24} className="text-white" /> : <MicOff size={24} className="text-white" />}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onToggleVideo}
          className={`p-4 rounded-xl ${
            isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
          } transition-colors`}
        >
          {isVideoOn ? <Video size={24} className="text-white" /> : <VideoOff size={24} className="text-white" />}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onToggleScreenShare}
          className={`p-4 rounded-xl ${
            isScreenSharing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
          } transition-colors`}
        >
          <MonitorUp size={24} className="text-white" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onToggleChat}
          className="p-4 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          <MessageCircle size={24} className="text-white" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onEndCall}
          className="p-4 rounded-xl bg-red-500 hover:bg-red-600 transition-colors"
        >
          <Phone size={24} className="text-white transform rotate-135" />
        </motion.button>
      </div>
    </div>
  );
};