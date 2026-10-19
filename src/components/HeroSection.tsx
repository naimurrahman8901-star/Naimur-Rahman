import React from 'react';
import { SchoolInfo } from '../types';
import { Search, FileText, Users, Award, BookOpen, MapPin, Phone } from 'lucide-react';

interface HeroSectionProps {
  siteInfo: SchoolInfo;
  onOpenResultLookup: () => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  siteInfo,
  onOpenResultLookup,
  onNavigate
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background Graphic / Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/school_campus_building_1792436786942.jpg"
          alt="Atghar High School Campus"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-35 filter contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          {/* Institutional Credentials */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-sky-300 font-semibold mb-4 tracking-wide">
            <span>EIIN: {siteInfo.eiin}</span>
            <span aria-hidden="true">·</span>
            <span>School Code: {siteInfo.schoolCode}</span>
            <span aria-hidden="true">·</span>
            <span>Established {siteInfo.establishedYear}</span>
            <span aria-hidden="true">·</span>
            <span>BISE Barishal</span>
          </div>

          {/* Bengali Name Banner */}
          <p className="text-xl sm:text-2xl font-serif-crest text-sky-200 tracking-wide mb-2 font-medium">
            {siteInfo.banglaName}
          </p>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans">
            {siteInfo.name}
          </h1>

          {/* Motto & Narrative */}
          <p className="text-lg sm:text-xl text-sky-100/90 font-medium italic mb-6">
            "{siteInfo.motto}"
          </p>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-8">
            {siteInfo.about}
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenResultLookup}
              className="px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm rounded-lg shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-slate-950" />
              Check Student Exam Result
            </button>
            <button
              onClick={() => onNavigate('notices')}
              className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-sm rounded-lg border border-slate-700 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              Notice Board
            </button>
            <button
              onClick={() => onNavigate('teachers')}
              className="px-5 py-3.5 bg-transparent hover:bg-white/10 text-slate-200 font-medium text-sm rounded-lg transition-colors flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-slate-300" />
              Teachers Directory
            </button>
          </div>
        </div>

        {/* Quick Contact & Location Ribbon */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
            <span>{siteInfo.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-sky-400 shrink-0" />
            <span>{siteInfo.phone}</span>
          </div>
        </div>
      </div>

      {/* 4-Item Metric Ribbon (Full-width row below hero split) */}
      <div className="relative z-10 border-t border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                {siteInfo.totalStudents}
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Enrolled Students
              </div>
            </div>

            <div className="p-2 border-l border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                {siteInfo.totalTeachers}
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Qualified Faculty
              </div>
            </div>

            <div className="p-2 border-l border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono tabular-nums">
                {siteInfo.passRate}
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                SSC Board Pass Rate
              </div>
            </div>

            <div className="p-2 border-l border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                {siteInfo.campusArea}
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Eco Green Campus
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
