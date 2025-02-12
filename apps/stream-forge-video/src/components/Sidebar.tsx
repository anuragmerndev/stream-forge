import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Participant, ChatMessage } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  view: 'chat' | 'participants';
  participants: Participant[];
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  view,
  participants,
  messages,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = React.useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="fixed right-0 top-16 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-lg"
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {view === 'chat' ? 'Chat' : 'Participants'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {view === 'participants' ? (
              <div className="flex-1 overflow-y-auto p-4 cursor-pointer">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <span className="text-lg">{participant.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-sm text-gray-500">
                        {participant.isActiveSpeaker ? 'Speaking' : 'Not speaking'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                  {messages.map((message) => (
                    <div key={message.id} className="mb-4">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-medium">{message.senderName}</span>
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700 dark:text-gray-300">
                        {message.content}
                      </p>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 rounded-full border dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </form>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};