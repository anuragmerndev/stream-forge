export interface Participant {
  id: string;
  name: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isScreenSharing: boolean;
  isActiveSpeaker: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
}