import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Image as ImageIcon, X, Calendar, Plus, Trash2, ZoomIn } from 'lucide-react';

interface ActivitiesGalleryProps {
  gallery: GalleryItem[];
  isAdminLoggedIn: boolean;
  onDeleteGalleryItem: (id: string) => void;
  onOpenAddGallery?: () => void;
}

export const ActivitiesGallery: React.FC<ActivitiesGalleryProps> = ({
  gallery,
  isAdminLoggedIn,
  onDeleteGalleryItem,
  onOpenAddGallery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Campus', 'Sports', 'Science & Tech', 'Cultural'];

  const filteredItems = gallery.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  return (
    <section id="gallery" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-sky-600 font-bold mb-1">
              Campus Life & Extra-Curricular Memories
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              School Activities & Social Gallery
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">
              {filteredItems.length} photos displayed
            </span>
            {isAdminLoggedIn && onOpenAddGallery && (
              <button
                onClick={onOpenAddGallery}
                className="px-3.5 py-1.5 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-colors shadow-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Upload Photo
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-600">No photos found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                <div
                  className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => setActivePhoto(item)}
                >
                  <img
                    src={item.photo}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 bg-white/90 text-slate-900 rounded-full shadow-md">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>
                  <span className="absolute top-2.5 right-2.5 bg-slate-950/70 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mb-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </div>
                    <h3
                      className="font-bold text-slate-900 text-sm leading-snug group-hover:text-sky-600 transition-colors cursor-pointer"
                      onClick={() => setActivePhoto(item)}
                    >
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {isAdminLoggedIn && (
                    <div className="mt-3 pt-2 border-t border-rose-100 flex justify-end">
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${item.title}"?`)) {
                            onDeleteGalleryItem(item.id);
                          }
                        }}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete Photo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-800 text-white flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{activePhoto.category}</span>
                <span>·</span>
                <span>{activePhoto.date}</span>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.photo}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <h3 className="text-base font-bold text-white">{activePhoto.title}</h3>
              {activePhoto.description && (
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {activePhoto.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
