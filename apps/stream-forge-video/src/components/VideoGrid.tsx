import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, Users } from 'lucide-react';
import type { Participant } from '../types';

interface VideoGridProps {
  participants: Participant[];
  toggleParticipants: () => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ participants, toggleParticipants }) => {
  const getVisibleParticipants = (total: number) => {
    if (window.innerWidth >= 1024) {
      return total > 9 ? 8 : total;
    }
    if (window.innerWidth >= 768) {
      return total > 6 ? 5 : total;
    }
    return total > 4 ? 3 : total;
  };

  const getGridConfig = (count: number) => {
    if (window.innerWidth >= 1024) {
      if (count <= 1) return 'grid-cols-1';
      if (count === 2) return 'grid-cols-2';
      if (count <= 4) return 'grid-cols-2';
       return 'grid-cols-3';
    }
    if (window.innerWidth >= 768) {
      if (count <= 1) return 'grid-cols-1';
      if (count === 2) return 'grid-cols-2';
      if (count <= 4) return 'grid-cols-2';
      return 'grid-cols-3';
    }
    if (count <= 1) return 'grid-cols-1';
    return 'grid-cols-2';
  };

  const visibleCount = getVisibleParticipants(participants.length);
  const hasOverflow = participants.length > visibleCount;
  const overflowCount = participants.length - visibleCount;
  const visibleParticipants = participants.slice(0, visibleCount);

  return (
    <div
      className={`grid gap-4 p-4 h-full ${getGridConfig(visibleCount + (hasOverflow ? 1 : 0))} auto-rows-fr`}
    >
      {visibleParticipants.map((participant) => (
        <motion.div
          key={participant.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`relative rounded-lg overflow-hidden bg-gray-800 ${
            participant.isActiveSpeaker ? "ring-2 ring-blue-500" : ""
          }`}
        >
          {participant.isVideoOn ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=300&fit=crop)`,
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
              <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {participant.name[0]}
                </span>
              </div>
            </div>
          )}

          <div className="absolute bottom-4 left-4 flex space-x-2">
            {!participant.isAudioOn ? (
              <div className="p-1.5 rounded-full bg-red-500">
                <MicOff size={16} className="text-white" />
              </div>
            ) : (
              <div className="p-1.5 rounded-full bg-gray-400">
                <Mic size={16} className="text-white" />
              </div>
            )}
            {!participant.isVideoOn ? (
              <div className="p-1.5 rounded-full bg-red-500">
                <VideoOff size={16} className="text-white" />
              </div>
            ) : (
              <div className="p-1.5 rounded-full bg-gray-400">
                <Video size={16} className="text-white" />
              </div>
            )}
          </div>

          <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md bg-black/50">
            <span className="text-sm text-white">{participant.name}</span>
          </div>
        </motion.div>
      ))}

      {hasOverflow && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-lg overflow-hidden bg-gray-800 "
          onClick={toggleParticipants}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700 hover:bg-gray-800 cursor-pointer duration-200 ease-in-out">
            <div className="flex items-center space-x-2 text-white">
              <Users size={20} />
              <span className="text-xl font-semibold">+{overflowCount}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};