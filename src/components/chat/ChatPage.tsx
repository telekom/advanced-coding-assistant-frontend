import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from '@/components/ui/Toaster';
import Chat from '@/components/chat/Chat';
import UserInput from '@/components/chat/UserInput';
import Persistence from './Persistence';

const ChatPage = () => {
  return <Chat navbar={<Navbar />} outlet={<Outlet />} userInput={<UserInput />} toaster={<Toaster />} persistenceOption={<Persistence />} />;
};

export default ChatPage;
