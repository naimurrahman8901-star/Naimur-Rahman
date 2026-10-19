import React from 'react';
import { SchoolInfo } from '../types';
import { BookOpen, Laptop, Microscope, Trophy, Users, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

interface AboutLeadershipProps {
  siteInfo: SchoolInfo;
}

export const AboutLeadership: React.FC<AboutLeadershipProps> = ({ siteInfo }) => {
  const facilities = [
    {
      title: 'Modern Science & Chemistry Labs',
      description: 'Fully equipped experimental apparatus for physics, chemistry, and biology research.',
      icon: Microscope
    },
    {
      title: 'Digital Multimedia & ICT Lab',
      description: 'High-speed networked workstations with programming and digital literacy curricula.',
      icon: Laptop
    },
    {
      title: 'Institutional Central Library',
      description: 'Extensive collection of 8,500+ academic volumes, literary classics, and journals.',
      icon: BookOpen
    },
    {
      title: 'Athletic Ground & Scout Troop',
      description: 'National award-winning scout unit and multi-sport grounds for football and cricket.',
      icon: Trophy
    }
  ];

  return (
    <section id="about" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-sky-600 font-bold mb-1">
            Institutional Legacy & Leadership
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Nurturing Character & Intellectual Excellence
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Since {siteInfo.establishedYear}, Atghar High School has remained dedicated to uplifting rural educational standards, inspiring scholars, and preparing moral future leaders for Bangladesh.
          </p>
        </div>

        {/* Headmaster's Statement Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden mb-16 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
            <div className="md:col-span-5 bg-slate-900 relative min-h-[300px] md:min-h-full">
              <img
                src={siteInfo.headmasterPhoto || '/src/assets/images/school_headmaster_portrait_1792436789143.jpg'}
                alt={siteInfo.headmasterName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent md:hidden" />
              <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
                <div className="font-bold text-sm">{siteInfo.headmasterName}</div>
                <div className="text-xs text-sky-300">{siteInfo.headmasterDesignation}</div>
              </div>
            </div>

            <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-sky-700 tracking-wider uppercase mb-2">
                  Headmaster's Message
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                  "Education is the Foundation of Both Wisdom and Civic Duty"
                </h3>
                <blockquote className="text-sm text-slate-700 leading-relaxed italic border-l-3 border-sky-500 pl-4 py-1 mb-6">
                  "{siteInfo.headmasterMessage}"
                </blockquote>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {siteInfo.history}
                </p>
              </div>

              <div className="hidden md:block pt-6 mt-6 border-t border-slate-200">
                <div className="font-bold text-slate-900 text-sm">{siteInfo.headmasterName}</div>
                <div className="text-xs text-slate-500">{siteInfo.headmasterDesignation}</div>
                <div className="text-[11px] text-sky-700 mt-0.5">Atghar High School, Swarupkathi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">Campus Infrastructure & Facilities</h3>
            <p className="text-xs text-slate-500 mt-1">Providing state-of-the-art facilities across our 3.8-acre green campus</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">{f.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
