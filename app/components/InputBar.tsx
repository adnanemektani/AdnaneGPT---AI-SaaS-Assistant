'use client';

import { useState, useRef } from 'react';

interface InputBarProps {
  onSend: (message: string) => void;
  loading: boolean;
}

export default function InputBar({ onSend, loading }: InputBarProps) {
  const [input, setInput] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
          
          {/* Input */}
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Message AdnaneGPT..."
            rows={1}
            className="bg-transparent outline-none resize-none text-sm text-gray-900 dark:text-white placeholder-gray-400 w-full max-h-40 overflow-y-auto"
          />

          {/* Bottom bar */}
          <div className="flex items-center justify-between">
            
            {/* Left — + button */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-400"
              >
                +
              </button>

              {/* Dropdown menu */}
              {showMenu && (
                <div className="absolute bottom-10 left-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-1 w-44 z-10">
                  <button
                    onClick={() => { fileRef.current?.click(); setShowMenu(false); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300"
                  >
                    📄 Upload File
                  </button>
                  <button
                    onClick={() => { fileRef.current?.click(); setShowMenu(false); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300"
                  >
                    🖼️ Upload Image
                  </button>
                </div>
              )}
              <input ref={fileRef} type="file" className="hidden" />
            </div>

            {/* Right — Send button */}
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center disabled:opacity-30 hover:opacity-80 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white dark:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-2">
          AdnaneGPT can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}