import React, { useState } from 'react';
import { Student } from '../types';
import { Search, UserCheck, Award, FileText, CheckCircle2, Filter, Trash2, Plus } from 'lucide-react';

interface StudentsPortalProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  isAdminLoggedIn: boolean;
  onDeleteStudent: (id: string) => void;
  onOpenAddStudent?: () => void;
}

export const StudentsPortal: React.FC<StudentsPortalProps> = ({
  students,
  onSelectStudent,
  isAdminLoggedIn,
  onDeleteStudent,
  onOpenAddStudent
}) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'lookup'>('directory');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Lookup form state
  const [lookupClass, setLookupClass] = useState<string>('Class 10');
  const [lookupRoll, setLookupRoll] = useState<string>('1');
  const [lookupError, setLookupError] = useState<string | null>(null);

  const classes = ['All', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  const filteredStudents = students.filter((s) => {
    const matchesClass = selectedClass === 'All' || s.class === selectedClass;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.roll.toString().includes(searchQuery) ||
      s.section.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);

    const rollNum = parseInt(lookupRoll.trim(), 10);
    if (isNaN(rollNum)) {
      setLookupError('Please enter a valid numeric Roll Number.');
      return;
    }

    const found = students.find((s) => s.class === lookupClass && s.roll === rollNum);

    if (found) {
      onSelectStudent(found);
    } else {
      setLookupError(`No academic record found for ${lookupClass} with Roll Number ${rollNum}. Please check the credentials or contact the examination cell.`);
    }
  };

  return (
    <section id="students" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-sky-600 font-bold mb-1">
              Examination Cell & Student Directory
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Student Records & Exam Results
            </h2>
          </div>

          {/* Tab selector */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'directory'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Browse Directory
            </button>
            <button
              onClick={() => setActiveTab('lookup')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'lookup'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-sky-600" />
              Direct Result Lookup
            </button>
          </div>
        </div>

        {/* MODE 1: Direct Result Lookup Box */}
        {activeTab === 'lookup' && (
          <div className="max-w-xl mx-auto mb-12 p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Online Result & Marksheet Verification
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your Academic Class and Roll Number to generate your certified marksheet.
              </p>
            </div>

            <form onSubmit={handleLookupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Class:
                </label>
                <select
                  value={lookupClass}
                  onChange={(e) => setLookupClass(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                >
                  <option value="Class 6">Class 6 (Six)</option>
                  <option value="Class 7">Class 7 (Seven)</option>
                  <option value="Class 8">Class 8 (Eight)</option>
                  <option value="Class 9">Class 9 (Nine)</option>
                  <option value="Class 10">Class 10 (Ten)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enter Class Roll Number:
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  placeholder="e.g. 1"
                  value={lookupRoll}
                  onChange={(e) => setLookupRoll(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-mono"
                />
              </div>

              {lookupError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                  {lookupError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Find & Generate Marksheet
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500 text-center">
              Quick Test: Try <strong>Class 10</strong> with <strong>Roll 1</strong> or <strong>Class 9</strong> with <strong>Roll 1</strong>.
            </div>
          </div>
        )}

        {/* Controls Bar for Directory Mode */}
        {activeTab === 'directory' && (
          <>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-slate-50 p-3 rounded-xl border border-slate-200">
              {/* Class Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {classes.map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      selectedClass === cls
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>

              {/* Search & Actions */}
              <div className="flex items-center gap-3">
                <div className="relative sm:w-64 shrink-0">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by student name or roll..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>

                {isAdminLoggedIn && onOpenAddStudent && (
                  <button
                    onClick={onOpenAddStudent}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-colors shadow-xs flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Student
                  </button>
                )}
              </div>
            </div>

            {/* Students Grid */}
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <UserCheck className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-600">No student records found matching this class or query.</p>
                <button
                  onClick={() => {
                    setSelectedClass('All');
                    setSearchQuery('');
                  }}
                  className="mt-3 text-xs text-sky-600 font-semibold hover:underline"
                >
                  Show all classes
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
                  >
                    {/* Header with Photo & Roll */}
                    <div className="p-4 flex items-center gap-3 border-b border-slate-100 bg-slate-50/50">
                      <div className="relative">
                        <img
                          src={student.photo || 'https://via.placeholder.com/80'}
                          alt={student.name}
                          referrerPolicy="no-referrer"
                          className="w-13 h-13 rounded-full object-cover border-2 border-slate-200"
                        />
                        <span className="absolute -bottom-1 -right-1 bg-slate-900 text-white text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full">
                          #{student.roll}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-900 text-sm leading-snug truncate">
                          {student.name}
                        </h3>
                        <div className="text-xs text-slate-500">
                          {student.class} · {student.section}
                        </div>
                      </div>
                    </div>

                    {/* Result Summary */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Exam Result:</span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                            {student.examResult}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">GPA Score:</span>
                          <span className="font-mono font-extrabold text-slate-800">
                            {student.gpa.toFixed(2)} / 5.00
                          </span>
                        </div>

                        {student.guardianName && (
                          <div className="text-[11px] text-slate-500 truncate pt-1">
                            Guardian: {student.guardianName}
                          </div>
                        )}
                      </div>

                      {/* Action */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onSelectStudent(student)}
                          className="w-full py-1.5 text-xs font-semibold bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Official Marksheet
                        </button>

                        {isAdminLoggedIn && (
                          <button
                            onClick={() => {
                              if (confirm(`Delete student ${student.name} (Roll #${student.roll})?`)) {
                                onDeleteStudent(student.id);
                              }
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Student"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};
