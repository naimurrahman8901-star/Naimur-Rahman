import React, { useState } from 'react';
import { Notice } from '../types';
import { Calendar, Pin, FileText, Search, ChevronRight, X, Printer, Share2, Check } from 'lucide-react';

interface NoticeBoardProps {
  notices: Notice[];
  selectedNotice: Notice | null;
  onSelectNotice: (notice: Notice | null) => void;
  isAdminLoggedIn: boolean;
  onDeleteNotice?: (id: string) => void;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({
  notices,
  selectedNotice,
  onSelectNotice,
  isAdminLoggedIn,
  onDeleteNotice
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedNoticeId, setCopiedNoticeId] = useState<string | null>(null);

  const categories = ['All', 'Examination', 'Admission', 'Academic', 'Holiday', 'Sports & Culture'];

  const filteredNotices = notices.filter((n) => {
    const matchesCategory = filterCategory === 'All' || n.category === filterCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyNoticeLink = (notice: Notice) => {
    navigator.clipboard.writeText(`${window.location.origin}#notice-${notice.id}`);
    setCopiedNoticeId(notice.id);
    setTimeout(() => setCopiedNoticeId(null), 2000);
  };

  return (
    <section id="notices" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-sky-600 font-bold mb-1">
              Official Institutional Announcements
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Notice Board & Circulars
            </h2>
          </div>
          <div className="text-sm text-slate-500">
            Total {filteredNotices.length} published announcements
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-slate-50 p-3 rounded-xl border border-slate-200">
          {/* Segmented Category Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  filterCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative sm:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circulars..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>
        </div>

        {/* Notices List */}
        {filteredNotices.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-600">No announcements match your search criteria.</p>
            <button
              onClick={() => {
                setFilterCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-sky-600 font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 text-xs text-slate-500 mb-1.5 flex-wrap">
                    <span className="flex items-center gap-1 font-mono text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {notice.date}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-sky-700">{notice.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-400">By {notice.publishedBy}</span>
                    {notice.isPinned && (
                      <span className="flex items-center gap-1 text-amber-700 font-semibold text-[11px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">
                        <Pin className="w-3 h-3" />
                        Pinned Notice
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors cursor-pointer mb-1"
                      onClick={() => onSelectNotice(notice)}>
                    {notice.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {notice.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                  <button
                    onClick={() => onSelectNotice(notice)}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg transition-colors flex items-center gap-1"
                  >
                    Read Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {isAdminLoggedIn && onDeleteNotice && (
                    <button
                      onClick={() => {
                        if (confirm(`Delete circular "${notice.title}"?`)) {
                          onDeleteNotice(notice.id);
                        }
                      }}
                      className="px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur-xs z-10">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span>{selectedNotice.category}</span>
                  <span>·</span>
                  <span>{selectedNotice.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedNotice.title}
                </h3>
              </div>
              <button
                onClick={() => onSelectNotice(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
              <div className="p-3 bg-sky-50 rounded-lg border border-sky-100 text-xs text-sky-900 font-medium">
                <strong>Executive Summary:</strong> {selectedNotice.summary}
              </div>

              <div className="whitespace-pre-line text-slate-800">
                {selectedNotice.content}
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <div>
                  <div className="font-semibold text-slate-800">{selectedNotice.publishedBy}</div>
                  <div>Atghar High School Academic Council</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyNoticeLink(selectedNotice)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-1 text-xs"
                    title="Copy Notice Link"
                  >
                    {copiedNoticeId === selectedNotice.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-1 text-xs"
                    title="Print Circular"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
