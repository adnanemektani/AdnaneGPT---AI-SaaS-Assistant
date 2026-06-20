'use client';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

export default function Header({ sidebarOpen, onToggleSidebar, darkMode, onToggleDark }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shrink-0">
      {/* Left — toggle sidebar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo — visible only when sidebar closed */}
        {!sidebarOpen && (
          <div className="flex items-center gap-2">
            <span className="text-xl">ℳ</span>
            <span className="font-bold text-gray-900 dark:text-white">AdnaneGPT</span>
          </div>
        )}
      </div>

      {/* Right — dark mode toggle */}
      <button
        onClick={onToggleDark}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        title="Toggle dark mode"
      >
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4a8 8 0 100 16A8 8 0 0012 4zm0-2a10 10 0 110 20A10 10 0 0112 2z"/>
            <path d="M12 6a6 6 0 100 12A6 6 0 0012 6z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        )}
      </button>
    </header>
  );
}