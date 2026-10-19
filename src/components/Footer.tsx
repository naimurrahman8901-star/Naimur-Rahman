import React from 'react';
import { SchoolInfo } from '../types';
import { GraduationCap, ArrowUp, ShieldCheck } from 'lucide-react';

interface FooterProps {
  siteInfo: SchoolInfo;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  siteInfo,
  onNavigate,
  onOpenAdmin,
  isAdminLoggedIn
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center font-bold">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                {siteInfo.name}
              </span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              {siteInfo.motto}. Recognized under the Board of Intermediate and Secondary Education (BISE) Barishal. Fostering future scholars and conscientious citizens through modern education.
            </p>
            <div className="text-[11px] text-sky-400 font-mono">
              EIIN: {siteInfo.eiin} · Code: {siteInfo.schoolCode} · Est. {siteInfo.establishedYear}
            </div>
          </div>

          {/* Col 2: Institutional Portals */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home & Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('notices')} className="hover:text-white transition-colors">
                  Notice Board & Circulars
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('teachers')} className="hover:text-white transition-colors">
                  Respected Faculty Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('students')} className="hover:text-white transition-colors">
                  Students & Exam Results
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors">
                  Campus Life & Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Administrative Access */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Staff & Administration</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              Authorized faculty and administrative personnel can access the control panel to update marks, faculty profiles, and announcements.
            </p>
            <button
              onClick={onOpenAdmin}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                isAdminLoggedIn
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {isAdminLoggedIn ? 'Admin Console (Active)' : 'Admin Login'}
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>{siteInfo.address}</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded transition-colors flex items-center gap-1"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
