import React, { useState } from 'react';
import { SchoolInfo } from '../types';
import { GraduationCap, ShieldCheck, Menu, X, Search, Lock } from 'lucide-react';

interface NavbarProps {
  siteInfo: SchoolInfo;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isAdminLoggedIn: boolean;
  onOpenAdmin: () => void;
  onOpenResultLookup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  siteInfo,
  activeSection,
  onNavigate,
  isAdminLoggedIn,
  onOpenAdmin,
  onOpenResultLookup
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'notices', label: 'Notices' },
    { id: 'teachers', label: 'Teachers' },
    { id: 'students', label: 'Students & Results' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand Element Wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 text-left whitespace-nowrap shrink-0 group focus:outline-none"
        >
          {siteInfo.logo ? (
            <img
              src={siteInfo.logo}
              alt={siteInfo.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-sky-400 bg-white"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <GraduationCap className="w-5 h-5 text-sky-100" />
            </div>
          )}
          <div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors whitespace-nowrap">
              {siteInfo.name}
            </span>
            <div className="text-[11px] text-sky-300/80 font-medium tracking-wide">
              EIIN: {siteInfo.eiin} · Est. {siteInfo.establishedYear}
            </div>
          </div>
        </button>

        {/* Zone 2: 4–5 concise single-line text links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-sky-400 py-1 ${
                  isActive ? 'text-sky-400 border-b-2 border-sky-400 font-semibold' : 'text-slate-300'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenResultLookup}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-sky-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Search className="w-3.5 h-3.5 text-sky-400" />
            Check Result
          </button>

          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              isAdminLoggedIn
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm'
            }`}
          >
            {isAdminLoggedIn ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-100" />
                Admin Dashboard
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-rose-100" />
                Admin Login
              </>
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenAdmin}
            className={`p-2 rounded-lg text-xs font-semibold ${
              isAdminLoggedIn ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
            }`}
            title="Admin Panel"
          >
            <Lock className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeSection === link.id
                  ? 'bg-sky-950 text-sky-400'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenResultLookup();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-2.5 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-lg"
            >
              Check Exam Result
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className={`w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg text-white ${
                isAdminLoggedIn ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            >
              {isAdminLoggedIn ? 'Open Admin Dashboard' : 'Admin Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
