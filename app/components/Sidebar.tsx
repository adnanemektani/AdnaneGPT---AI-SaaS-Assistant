'use client';

interface Chat {
  id: string;
  title: string;
  messages: unknown[];
}

interface SidebarProps {
  open: boolean;
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
}

export default function Sidebar({ open, chats, activeChatId, onNewChat, onSelectChat }: SidebarProps) {
  if (!open) return null;

  return (
    <div className="w-64 h-screen bg-gray-100 dark:bg-gray-900 flex flex-col border-r border-gray-200 dark:border-gray-800 shrink-0">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl"></span>
          <span className="font-bold text-lg text-gray-900 dark:text-white">AdnaneGPT</span>
        </div>
      </div>

      {/* New Chat */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 transition"
        >
          <span className="text-lg">+</span>
          New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {chats.length === 0 && (
          <p className="text-xs text-gray-400 text-center mt-4">No chats yet</p>
        )}
        {chats.map(chat => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition ${
              activeChatId === chat.id
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            {chat.title}
          </button>
        ))}
      </div>
    </div>
  );
}