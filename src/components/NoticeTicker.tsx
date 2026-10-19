import React from 'react';
import { Notice } from '../types';
import { Bell, ChevronRight } from 'lucide-react';

interface NoticeTickerProps {
  notices: Notice[];
  onSelectNotice: (notice: Notice) => void;
}

export const NoticeTicker: React.FC<NoticeTickerProps> = ({ notices, onSelectNotice }) => {
  const latestNotices = notices.slice(0, 3);
  if (!latestNotices.length) return null;

  return (
    <div className="bg-sky-950/80 border-b border-sky-800/60 text-sky-100 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="bg-sky-600 text-white font-semibold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Bell className="w-3 h-3" />
            Notice
          </span>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-200 truncate">
            {latestNotices.map((n, i) => (
              <button
                key={n.id}
                onClick={() => onSelectNotice(n)}
                className="hover:text-sky-300 hover:underline flex items-center gap-1.5 truncate text-left focus:outline-none"
              >
                {i > 0 && <span className="text-sky-500/60 select-none">/</span>}
                <span className="text-slate-400 shrink-0 text-[11px]">{n.date}:</span>
                <span className="truncate">{n.title}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onSelectNotice(latestNotices[0])}
          className="text-sky-400 hover:text-sky-200 flex items-center gap-1 text-[11px] font-semibold shrink-0 ml-auto"
        >
          View Latest
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
