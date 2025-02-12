import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { VideoGrid } from './components/VideoGrid';
import { Controls } from './components/Controls';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import type { Participant, ChatMessage } from './types';

const MOCK_PARTICIPANTS: Participant[] = [
  {
    id: '1',
    name: 'John Doe',
    isVideoOn: false,
    isAudioOn: false,
    isScreenSharing: false,
    isActiveSpeaker: false,
  },
  {
    id: '2',
    name: 'Jane Smith',
    isVideoOn: false,
    isAudioOn: false,
    isScreenSharing: true,
    isActiveSpeaker: false,
  },
  {
    id: '3',
    name: 'Bob Johnson',
    isVideoOn: true,
    isAudioOn: true,
    isScreenSharing: false,
    isActiveSpeaker: true,
  },
  {
    id: '4',
    name: 'Bob Johnson',
    isVideoOn: true,
    isAudioOn: true,
    isScreenSharing: false,
    isActiveSpeaker: false,
  },
  {
    id: '5',
    name: 'Bob Johnson',
    isVideoOn: true,
    isAudioOn: true,
    isScreenSharing: false,
    isActiveSpeaker: false,
  },
  {
    id: '6',
    name: 'Bob Johnson',
    isVideoOn: true,
    isAudioOn: true,
    isScreenSharing: false,
    isActiveSpeaker: false,
  },
  {
    id: '7',
    name: 'Bob Johnson',
    isVideoOn: true,
    isAudioOn: true,
    isScreenSharing: false,
    isActiveSpeaker: false,
  },
  {
    id: '8',
    name: 'Bob Johnson',
    isVideoOn: true,
    isAudioOn: true,
    isScreenSharing: false,
    isActiveSpeaker: false,
  },
  {
    id: '9',
    name: 'Bob Johnson',
    isVideoOn: true,
    isAudioOn: true,
    isScreenSharing: false,
    isActiveSpeaker: false,
  },
  {
    id: '10',
    name: 'Bob Johnson',
    isVideoOn: true,
    isAudioOn: true,
    isScreenSharing: false,
    isActiveSpeaker: false,
  },
  {
    id: '11',
    name: 'Bob Johnson',
    isVideoOn: true,
    isAudioOn: true,
    isScreenSharing: false,
    isActiveSpeaker: false,
  },
];

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    senderId: '1',
    senderName: 'John Doe',
    content: 'Hello everyone!',
    timestamp: new Date(),
  },
  {
    id: '2',
    senderId: '2',
    senderName: 'Jane Smith',
    content: 'Hi John, how are you?',
    timestamp: new Date(),
  },
];

function App() {
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarView, setSidebarView] = useState<'chat' | 'participants'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: '1',
      senderName: 'You',
      content,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  const toggleSideBar = (functionality: 'chat' | 'participants') => {
    setSidebarView(functionality);
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <ToastContainer position="top-center" limit={2} autoClose={2000} />
      
      <TopBar 
        meetingName="Team Standup"
        participantCount={MOCK_PARTICIPANTS.length}
        onToggleParticipants={() => {
          toggleSideBar('participants');
        }}
      />
      
      <main className="flex-1 relative min-h-0">
        <VideoGrid participants={MOCK_PARTICIPANTS} toggleParticipants={() => toggleSideBar("participants")}/>
        
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-10">
          <Controls
            isAudioOn={isAudioOn}
            isVideoOn={isVideoOn}
            isScreenSharing={isScreenSharing}
            onToggleAudio={() => setIsAudioOn(!isAudioOn)}
            onToggleVideo={() => setIsVideoOn(!isVideoOn)}
            onToggleScreenShare={() => setIsScreenSharing(!isScreenSharing)}
            onEndCall={() => toast.success('Call ended')}
            onToggleChat={() => {
              toggleSideBar('chat');
            }}
          />
        </div>
      </main>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        view={sidebarView}
        participants={MOCK_PARTICIPANTS}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default App;