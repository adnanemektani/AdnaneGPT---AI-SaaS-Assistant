'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import InputBar from './components/InputBar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const activeChat = chats.find(c => c.id === activeChatId);

  const newChat = () => {
    const id = Date.now().toString();
    const chat: Chat = { id, title: 'New Chat', messages: [] };
    setChats(prev => [chat, ...prev]);
    setActiveChatId(id);
  };

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;
    if (!activeChatId) {
      newChat();
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
    setChats(prev => prev.map(c =>
      c.id === activeChatId
        ? {
            ...c,
            title: c.messages.length === 0 ? input.slice(0, 30) : c.title,
            messages: [...c.messages, userMessage]
          }
        : c
    ));
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5678/webhook/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, user_id: 'user123' }),
      });
      const data = await res.json();
      const assistantMessage: Message = { role: 'assistant', content: data.reply };
      setChats(prev => prev.map(c =>
        c.id === activeChatId
          ? { ...c, messages: [...c.messages, assistantMessage] }
          : c
      ));
    } catch {
      setChats(prev => prev.map(c =>
        c.id === activeChatId
          ? { ...c, messages: [...c.messages, { role: 'assistant', content: 'Error, try again.' }] }
          : c
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-hidden">
        <Sidebar
          open={sidebarOpen}
          chats={chats}
          activeChatId={activeChatId}
          onNewChat={newChat}
          onSelectChat={setActiveChatId}
        />
        <div className="flex flex-col flex-1 min-w-0">
          <Header
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            darkMode={darkMode}
            onToggleDark={() => setDarkMode(!darkMode)}
          />
          <ChatArea
            messages={activeChat?.messages || []}
            loading={loading}
          />
          <InputBar onSend={sendMessage} loading={loading} />
        </div>
      </div>
    </div>
  );
}