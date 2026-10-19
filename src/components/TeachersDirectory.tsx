import React, { useState } from 'react';
import { Teacher } from '../types';
import { Mail, Phone, GraduationCap, Search, X, Briefcase, Calendar } from 'lucide-react';

interface TeachersDirectoryProps {
  teachers: Teacher[];
  isAdminLoggedIn: boolean;
  onDeleteTeacher: (id: string) => void;
  onOpenAddTeacher?: () => void;
}

export const TeachersDirectory: React.FC<TeachersDirectoryProps> = ({
  teachers,
  isAdminLoggedIn,
  onDeleteTeacher,
  onOpenAddTeacher
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTeacher, setActiveTeacher] = useState<Teacher | null>(null);

  const departments = [
    'All',
    'Administration',
    'Science',
    'Languages',
    'Arts & Humanities',
    'ICT & Vocational'
  ];

  const filteredTeachers = teachers.filter((t) => {
    const matchesDept = selectedDepartment === 'All' || t.department === selectedDepartment;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.banglaName && t.banglaName.includes(searchQuery));
    return matchesDept && matchesSearch;
  });

  return (
    <section id="teachers" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-sky-600 font-bold mb-1">
              Distinguished Educators & Academic Mentors
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Our Respected Teachers & Staff
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">
              {filteredTeachers.length} faculty members listed
            </span>
            {isAdminLoggedIn && onOpenAddTeacher && (
              <button
                onClick={onOpenAddTeacher}
                className="px-3.5 py-1.5 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-colors shadow-xs"
              >
                + Add Teacher
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedDepartment === dept
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="relative sm:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty by name or subject..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>
        </div>

        {/* Faculty Grid */}
        {filteredTeachers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <GraduationCap className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-600">No teacher profiles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
              >
                {/* Photo container */}
                <div className="aspect-square bg-slate-100 overflow-hidden relative">
                  {teacher.photo ? (
                    <img
                      src={teacher.photo}
                      alt={teacher.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                      <GraduationCap className="w-16 h-16" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-slate-950/70 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded font-medium">
                    {teacher.department}
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {teacher.name}
                    </h3>
                    {teacher.banglaName && (
                      <p className="text-xs text-sky-700 font-serif-crest mt-0.5">
                        {teacher.banglaName}
                      </p>
                    )}
                    <p className="text-xs font-semibold text-slate-600 mt-1">
                      {teacher.designation}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      <span className="font-medium text-slate-700">Subject:</span> {teacher.subject}
                    </p>
                    {teacher.qualification && (
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 italic">
                        {teacher.qualification}
                      </p>
                    )}
                  </div>

                  {/* Actions & Contact */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveTeacher(teacher)}
                      className="text-xs font-semibold text-sky-600 hover:text-sky-800"
                    >
                      View Details
                    </button>

                    <div className="flex items-center gap-1.5">
                      {teacher.contact && (
                        <a
                          href={`tel:${teacher.contact}`}
                          title={`Call ${teacher.contact}`}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {teacher.email && (
                        <a
                          href={`mailto:${teacher.email}`}
                          title={`Email ${teacher.email}`}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {isAdminLoggedIn && (
                    <div className="mt-3 pt-2 border-t border-rose-100">
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${teacher.name}?`)) {
                            onDeleteTeacher(teacher.id);
                          }
                        }}
                        className="w-full py-1 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded transition-colors"
                      >
                        Delete Teacher
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Teacher Detail Modal */}
      {activeTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-6 border-b border-slate-200 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={activeTeacher.photo || 'https://via.placeholder.com/80'}
                  alt={activeTeacher.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover border-2 border-sky-500"
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{activeTeacher.name}</h3>
                  {activeTeacher.banglaName && (
                    <p className="text-xs text-sky-700 font-serif-crest">{activeTeacher.banglaName}</p>
                  )}
                  <p className="text-xs font-semibold text-slate-600">{activeTeacher.designation}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTeacher(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">Department:</span>
                  <span className="font-semibold text-slate-900">{activeTeacher.department}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">Primary Subject:</span>
                  <span className="font-semibold text-slate-900">{activeTeacher.subject}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Academic Qualifications:</span>
                <span className="font-semibold text-slate-900">{activeTeacher.qualification}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">Contact Phone:</span>
                  <a href={`tel:${activeTeacher.contact}`} className="font-semibold text-sky-600 hover:underline">
                    {activeTeacher.contact || 'N/A'}
                  </a>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">Official Email:</span>
                  <a href={`mailto:${activeTeacher.email}`} className="font-semibold text-sky-600 hover:underline truncate block">
                    {activeTeacher.email || 'N/A'}
                  </a>
                </div>
              </div>

              {activeTeacher.joiningYear && (
                <div className="flex items-center gap-1.5 text-slate-500 pt-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Serving institution since {activeTeacher.joiningYear}</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveTeacher(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-800 text-white rounded-lg hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
