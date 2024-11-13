import { ThemeProvider } from './components/provider/ThemeProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import ErrorPage from '@/components/ui/ErrorPage';
import { TooltipProvider } from '@/components/ui/Tooltip';
import Messages from '@/components/messages/Messages';
import ChatPage from '@/components/chat/ChatPage';
import { FontProvider } from '@/components/provider/FontProvider';

function App() {
  return (
    <BrowserRouter>
      <FontProvider defaultFont="medium" storageKey="fontSize">
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<ChatPage />}>
                <Route path="/chat/:id" element={<Messages />}></Route>
                <Route path="/" element={<Messages />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </TooltipProvider>
        </ThemeProvider>
      </FontProvider>
    </BrowserRouter>
  );
}

export default App;
