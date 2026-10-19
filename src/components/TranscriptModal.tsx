import React from 'react';
import { Student, SchoolInfo } from '../types';
import { X, Printer, Award, CheckCircle2, Shield } from 'lucide-react';

interface TranscriptModalProps {
  student: Student;
  siteInfo: SchoolInfo;
  onClose: () => void;
}

export const TranscriptModal: React.FC<TranscriptModalProps> = ({
  student,
  siteInfo,
  onClose
}) => {
  const totalFullMarks = student.subjects.reduce((sum, s) => sum + s.fullMarks, 0);
  const totalObtainedMarks = student.subjects.reduce((sum, s) => sum + s.obtainedMarks, 0);
  const percentage = totalFullMarks > 0 ? ((totalObtainedMarks / totalFullMarks) * 100).toFixed(1) : '0';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Top bar controls */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Award className="w-4 h-4 text-sky-400" />
            <span>Academic Transcript & Marksheet Viewer</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Marksheet Container */}
        <div id="printable-transcript" className="p-8 sm:p-10 bg-white text-slate-900 font-sans">
          
          {/* Institutional Header */}
          <div className="text-center border-b-2 border-slate-900 pb-5 mb-6">
            <p className="text-sm font-serif-crest text-sky-900 font-bold tracking-widest uppercase">
              {siteInfo.banglaName}
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-0.5">
              {siteInfo.name}
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              {siteInfo.address} · EIIN: {siteInfo.eiin} · School Code: {siteInfo.schoolCode}
            </p>
            <div className="inline-block mt-3 px-4 py-1 bg-slate-100 rounded-full border border-slate-300 text-xs font-bold uppercase tracking-wider text-slate-800">
              Annual Evaluation Academic Transcript & Marksheet
            </div>
          </div>

          {/* Student Bio Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl mb-6 text-xs">
            <div>
              <span className="text-slate-500 block">Student Name:</span>
              <strong className="text-slate-900 text-sm block truncate">{student.name}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Class & Section:</span>
              <strong className="text-slate-900 text-sm block">{student.class} ({student.section})</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Class Roll No:</span>
              <strong className="text-slate-900 text-sm block font-mono">#{student.roll}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Academic Year:</span>
              <strong className="text-slate-900 text-sm block">2026</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Guardian Name:</span>
              <strong className="text-slate-900 block truncate">{student.guardianName || 'N/A'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Attendance:</span>
              <strong className="text-emerald-700 block">{student.attendanceRate || '95%'}</strong>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 block">Evaluation Status:</span>
              <strong className="text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Passed with Distinction ({student.examResult})
              </strong>
            </div>
          </div>

          {/* Subject Marks Table */}
          <div className="border border-slate-300 rounded-lg overflow-hidden mb-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold">
                  <th className="py-2.5 px-3">SL</th>
                  <th className="py-2.5 px-3">Subject Name</th>
                  <th className="py-2.5 px-3 text-center">Full Marks</th>
                  <th className="py-2.5 px-3 text-center">Obtained Marks</th>
                  <th className="py-2.5 px-3 text-center">Letter Grade</th>
                  <th className="py-2.5 px-3 text-center">Grade Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {student.subjects.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3 text-slate-500 font-mono">{idx + 1}</td>
                    <td className="py-2 px-3 font-medium text-slate-900">{sub.subjectName}</td>
                    <td className="py-2 px-3 text-center font-mono">{sub.fullMarks}</td>
                    <td className="py-2 px-3 text-center font-bold font-mono text-slate-900">
                      {sub.obtainedMarks}
                    </td>
                    <td className="py-2 px-3 text-center font-bold text-sky-700">
                      {sub.letterGrade}
                    </td>
                    <td className="py-2 px-3 text-center font-mono font-semibold">
                      {sub.gradePoint.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 border-t-2 border-slate-300 font-bold text-slate-900">
                  <td colSpan={2} className="py-2.5 px-3 text-right">Grand Total:</td>
                  <td className="py-2.5 px-3 text-center font-mono">{totalFullMarks}</td>
                  <td className="py-2.5 px-3 text-center font-mono text-slate-900 font-extrabold">
                    {totalObtainedMarks} ({percentage}%)
                  </td>
                  <td className="py-2.5 px-3 text-center text-sky-800 font-extrabold">{student.grade}</td>
                  <td className="py-2.5 px-3 text-center font-mono text-emerald-700 font-extrabold">
                    {student.gpa.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Performance & Grading Scale Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-800 block mb-1">Teacher's Remarks:</span>
              <p className="text-slate-600 italic">
                "{student.remarks || 'Diligent student demonstrating disciplined academic progress and moral character.'}"
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-800 block mb-1">Standard Grading Scale (BISE):</span>
              <div className="grid grid-cols-3 gap-1 text-[11px] text-slate-600">
                <span>80-100%: <strong>A+ (5.0)</strong></span>
                <span>70-79%: <strong>A (4.0)</strong></span>
                <span>60-69%: <strong>A- (3.5)</strong></span>
                <span>50-59%: <strong>B (3.0)</strong></span>
                <span>40-49%: <strong>C (2.0)</strong></span>
                <span>33-39%: <strong>D (1.0)</strong></span>
              </div>
            </div>
          </div>

          {/* Official Signatures */}
          <div className="pt-12 mt-8 border-t border-slate-300 flex items-center justify-between text-xs text-slate-700">
            <div className="text-center">
              <div className="w-36 border-b border-slate-400 mb-1" />
              <span>Prepared & Verified by</span>
              <div className="text-[11px] text-slate-500">Class Teacher</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-sky-600/40 mx-auto flex items-center justify-center text-[10px] text-sky-800 font-bold uppercase tracking-wider mb-1 rotate-12">
                Official Seal
              </div>
              <div className="text-[11px] text-slate-400">Atghar High School</div>
            </div>

            <div className="text-center">
              <div className="w-36 border-b border-slate-400 mb-1" />
              <strong>{siteInfo.headmasterName}</strong>
              <div className="text-[11px] text-slate-500">{siteInfo.headmasterDesignation}</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
