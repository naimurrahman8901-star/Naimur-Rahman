import React, { useState } from 'react';
import { AppData, SchoolInfo, Teacher, Student, Notice, GalleryItem, SubjectMark } from '../types';
import { calculateGPA } from '../data/initialData';
import {
  Lock,
  LogOut,
  X,
  Settings,
  Users,
  GraduationCap,
  Bell,
  Image as ImageIcon,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Upload,
  Eye
} from 'lucide-react';

interface AdminPortalProps {
  appData: AppData;
  isAdminLoggedIn: boolean;
  onLogin: (password: string) => boolean;
  onLogout: () => void;
  onUpdateSiteInfo: (info: Partial<SchoolInfo>) => void;
  onUpdateAdminPass: (newPass: string) => void;
  onAddTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  onDeleteTeacher: (id: string) => void;
  onAddStudent: (student: Omit<Student, 'id'>) => void;
  onDeleteStudent: (id: string) => void;
  onAddNotice: (notice: Omit<Notice, 'id'>) => void;
  onDeleteNotice: (id: string) => void;
  onAddGallery: (gallery: Omit<GalleryItem, 'id'>) => void;
  onDeleteGallery: (id: string) => void;
  onResetDefaults: () => void;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  appData,
  isAdminLoggedIn,
  onLogin,
  onLogout,
  onUpdateSiteInfo,
  onUpdateAdminPass,
  onAddTeacher,
  onDeleteTeacher,
  onAddStudent,
  onDeleteStudent,
  onAddNotice,
  onDeleteNotice,
  onAddGallery,
  onDeleteGallery,
  onResetDefaults,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'teachers' | 'students' | 'notices' | 'gallery' | 'system'>('settings');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper to convert uploaded image to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // 1. Settings Form State
  const [siteForm, setSiteForm] = useState({
    name: appData.siteInfo.name,
    banglaName: appData.siteInfo.banglaName || '',
    motto: appData.siteInfo.motto,
    about: appData.siteInfo.about,
    address: appData.siteInfo.address,
    phone: appData.siteInfo.phone,
    emergencyPhone: appData.siteInfo.emergencyPhone || '',
    email: appData.siteInfo.email,
    facebook: appData.siteInfo.facebook,
    youtube: appData.siteInfo.youtube,
    eiin: appData.siteInfo.eiin,
    schoolCode: appData.siteInfo.schoolCode
  });
  const [newAdminPassword, setNewAdminPassword] = useState('');

  // 2. Add Teacher Form State
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    banglaName: '',
    designation: 'Assistant Teacher',
    department: 'Science' as Teacher['department'],
    subject: '',
    qualification: '',
    contact: '',
    email: '',
    photo: '',
    joiningYear: new Date().getFullYear().toString()
  });

  // 3. Add Student Form State
  const [studentForm, setStudentForm] = useState({
    name: '',
    class: 'Class 10' as Student['class'],
    section: 'Section A' as Student['section'],
    roll: 1,
    gpa: 5.0,
    grade: 'A+',
    examResult: 'GPA 5.00 (Golden A+)',
    guardianName: '',
    guardianContact: '',
    attendanceRate: '95%',
    remarks: 'Diligent scholar with excellent conduct.',
    photo: ''
  });

  // 4. Add Notice Form State
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    category: 'Examination' as Notice['category'],
    summary: '',
    content: '',
    isPinned: false,
    publishedBy: 'Administrative Council'
  });

  // 5. Add Gallery Form State
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Campus' as GalleryItem['category'],
    photo: '',
    date: 'October 2026',
    description: ''
  });

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(loginPass);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setLoginPass('');
      showToast('Admin authenticated successfully');
    }
  };

  // Handle Settings Submit
  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteInfo(siteForm);
    if (newAdminPassword.trim()) {
      onUpdateAdminPass(newAdminPassword.trim());
      setNewAdminPassword('');
    }
    showToast('School settings updated successfully');
  };

  // Handle Teacher Submit
  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherForm.name || !teacherForm.subject) return;

    onAddTeacher({
      ...teacherForm,
      photo: teacherForm.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    });

    setTeacherForm({
      name: '',
      banglaName: '',
      designation: 'Assistant Teacher',
      department: 'Science',
      subject: '',
      qualification: '',
      contact: '',
      email: '',
      photo: '',
      joiningYear: new Date().getFullYear().toString()
    });
    showToast('Teacher profile added to directory');
  };

  // Handle Student Submit
  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.roll) return;

    // Generate default realistic subjects based on class & GPA
    const sampleMarks: SubjectMark[] = [
      { subjectName: 'Bangla', fullMarks: 100, obtainedMarks: Math.round(studentForm.gpa >= 5 ? 88 : 75), letterGrade: studentForm.grade, gradePoint: studentForm.gpa },
      { subjectName: 'English', fullMarks: 100, obtainedMarks: Math.round(studentForm.gpa >= 5 ? 90 : 78), letterGrade: studentForm.grade, gradePoint: studentForm.gpa },
      { subjectName: 'Mathematics', fullMarks: 100, obtainedMarks: Math.round(studentForm.gpa >= 5 ? 95 : 80), letterGrade: studentForm.grade, gradePoint: studentForm.gpa },
      { subjectName: 'General Science', fullMarks: 100, obtainedMarks: Math.round(studentForm.gpa >= 5 ? 89 : 76), letterGrade: studentForm.grade, gradePoint: studentForm.gpa },
      { subjectName: 'ICT', fullMarks: 50, obtainedMarks: Math.round(studentForm.gpa >= 5 ? 48 : 39), letterGrade: studentForm.grade, gradePoint: studentForm.gpa }
    ];

    onAddStudent({
      ...studentForm,
      subjects: sampleMarks,
      photo: studentForm.photo || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
    });

    setStudentForm({
      name: '',
      class: 'Class 10',
      section: 'Section A',
      roll: (studentForm.roll + 1),
      gpa: 5.0,
      grade: 'A+',
      examResult: 'GPA 5.00 (Golden A+)',
      guardianName: '',
      guardianContact: '',
      attendanceRate: '95%',
      remarks: 'Diligent scholar with disciplined conduct.',
      photo: ''
    });
    showToast('Student academic record added');
  };

  // Handle Notice Submit
  const handleNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.content) return;

    onAddNotice({
      ...noticeForm,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });

    setNoticeForm({
      title: '',
      category: 'Examination',
      summary: '',
      content: '',
      isPinned: false,
      publishedBy: 'Administrative Council'
    });
    showToast('Official notice published');
  };

  // Handle Gallery Submit
  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.photo) return;

    onAddGallery({
      ...galleryForm
    });

    setGalleryForm({
      title: '',
      category: 'Campus',
      photo: '',
      date: 'October 2026',
      description: ''
    });
    showToast('Activity photo added to gallery');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full my-6 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                School Administrative Management Portal
              </h2>
              <p className="text-xs text-slate-400">
                {isAdminLoggedIn ? 'Logged in with Master Administrative Privileges' : 'Authentication Required'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={() => {
                  onLogout();
                  showToast('Logged out of admin console');
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast alert */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between shrink-0">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {toastMessage}
            </span>
          </div>
        )}

        {/* Content Body */}
        {!isAdminLoggedIn ? (
          /* LOGIN FORM */
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full my-auto text-center">
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Admin Authentication
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Enter the institutional master password to manage records, faculty profiles, and school circulars.
            </p>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Master Password:
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter admin password (default: admin123)"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Incorrect password. Default master key is <strong>admin123</strong>.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded-lg transition-colors shadow-xs"
              >
                Sign In to Dashboard
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
              Demo Access: Enter <strong>admin123</strong> to test full administrative CRUD capabilities.
            </div>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-60 bg-slate-50 border-r border-slate-200 p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Settings className="w-4 h-4" />
                Site Info & Logo
              </button>

              <button
                onClick={() => setActiveTab('teachers')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'teachers'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Users className="w-4 h-4" />
                Teachers ({appData.teachers.length})
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'students'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Students & Results ({appData.students.length})
              </button>

              <button
                onClick={() => setActiveTab('notices')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'notices'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Bell className="w-4 h-4" />
                Notices ({appData.notices.length})
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'gallery'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Gallery ({appData.gallery.length})
              </button>

              <div className="pt-2 mt-auto border-t border-slate-200">
                <button
                  onClick={() => setActiveTab('system')}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                    activeTab === 'system'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  <RotateCcw className="w-4 h-4" />
                  System & Reset
                </button>
              </div>
            </div>

            {/* Main Tab Panel */}
            <div className="flex-1 p-6 overflow-y-auto bg-white">
              
              {/* TAB 1: SITE SETTINGS */}
              {activeTab === 'settings' && (
                <div className="max-w-2xl">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    1. Update School Information, Logo & Password
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Modify the institution name, crest motto, contact details, or change the administrative access key.
                  </p>

                  <form onSubmit={handleSettingsSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">School Name (English):</label>
                        <input
                          type="text"
                          required
                          value={siteForm.name}
                          onChange={(e) => setSiteForm({ ...siteForm, name: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Bengali Name (বাংলা নাম):</label>
                        <input
                          type="text"
                          value={siteForm.banglaName}
                          onChange={(e) => setSiteForm({ ...siteForm, banglaName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-serif-crest"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Motto / Subtitle:</label>
                      <input
                        type="text"
                        value={siteForm.motto}
                        onChange={(e) => setSiteForm({ ...siteForm, motto: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">About / Overview Description:</label>
                      <textarea
                        rows={3}
                        value={siteForm.about}
                        onChange={(e) => setSiteForm({ ...siteForm, about: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      />
                    </div>

                    {/* Logo Upload */}
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <label className="block font-bold text-slate-700 mb-1">Upload School Logo Image:</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const b64 = await fileToBase64(file);
                            onUpdateSiteInfo({ logo: b64 });
                            showToast('Logo image uploaded');
                          }
                        }}
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">Accepts PNG, JPG, or SVG emblem file.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Address:</label>
                        <input
                          type="text"
                          value={siteForm.address}
                          onChange={(e) => setSiteForm({ ...siteForm, address: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Phone:</label>
                        <input
                          type="text"
                          value={siteForm.phone}
                          onChange={(e) => setSiteForm({ ...siteForm, phone: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Email:</label>
                        <input
                          type="email"
                          value={siteForm.email}
                          onChange={(e) => setSiteForm({ ...siteForm, email: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">EIIN Code:</label>
                        <input
                          type="text"
                          value={siteForm.eiin}
                          onChange={(e) => setSiteForm({ ...siteForm, eiin: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Facebook Page URL:</label>
                        <input
                          type="url"
                          value={siteForm.facebook}
                          onChange={(e) => setSiteForm({ ...siteForm, facebook: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">YouTube Channel URL:</label>
                        <input
                          type="url"
                          value={siteForm.youtube}
                          onChange={(e) => setSiteForm({ ...siteForm, youtube: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Change Password */}
                    <div className="pt-3 border-t border-slate-200">
                      <label className="block font-bold text-slate-700 mb-1">
                        Change Admin Master Password:
                      </label>
                      <input
                        type="password"
                        placeholder="Leave blank to keep existing password"
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors shadow-xs"
                    >
                      Save General Settings
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 2: MANAGE TEACHERS */}
              {activeTab === 'teachers' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      2. Add New Teacher / Faculty Member
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Add educators and instructors to the publicly visible faculty directory.
                    </p>

                    <form onSubmit={handleTeacherSubmit} className="space-y-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Teacher Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Md. Ashraful Islam"
                            value={teacherForm.name}
                            onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Bengali Name (বাংলা নাম)</label>
                          <input
                            type="text"
                            placeholder="e.g. মোঃ আশরাফুল ইসলাম"
                            value={teacherForm.banglaName}
                            onChange={(e) => setTeacherForm({ ...teacherForm, banglaName: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-serif-crest"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Designation *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Senior Teacher, Headmaster"
                            value={teacherForm.designation}
                            onChange={(e) => setTeacherForm({ ...teacherForm, designation: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Department</label>
                          <select
                            value={teacherForm.department}
                            onChange={(e) => setTeacherForm({ ...teacherForm, department: e.target.value as any })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          >
                            <option value="Administration">Administration</option>
                            <option value="Science">Science</option>
                            <option value="Languages">Languages</option>
                            <option value="Arts & Humanities">Arts & Humanities</option>
                            <option value="ICT & Vocational">ICT & Vocational</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Teaching Subject *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Physics & Mathematics"
                            value={teacherForm.subject}
                            onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Academic Qualification</label>
                          <input
                            type="text"
                            placeholder="e.g. M.Sc in Physics (DU), B.Ed"
                            value={teacherForm.qualification}
                            onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                          <input
                            type="text"
                            placeholder="+880 1712-000000"
                            value={teacherForm.contact}
                            onChange={(e) => setTeacherForm({ ...teacherForm, contact: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Photo Upload or URL */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Teacher Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const b64 = await fileToBase64(file);
                              setTeacherForm({ ...teacherForm, photo: b64 });
                            }
                          }}
                          className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Teacher Profile
                      </button>
                    </form>
                  </div>

                  {/* Existing Faculty List */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-3">Existing Faculty Directory ({appData.teachers.length})</h4>
                    <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                      {appData.teachers.map((t) => (
                        <div key={t.id} className="p-3 bg-white flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={t.photo || 'https://via.placeholder.com/40'}
                              alt={t.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-full object-cover border border-slate-200"
                            />
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 text-xs truncate">{t.name}</div>
                              <div className="text-[11px] text-slate-500">{t.designation} · {t.subject}</div>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              if (confirm(`Delete ${t.name}?`)) {
                                onDeleteTeacher(t.id);
                                showToast('Teacher profile removed');
                              }
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: MANAGE STUDENTS & RESULTS */}
              {activeTab === 'students' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      3. Add Student Record & Exam Result
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Create student enrollment and evaluation credentials. The portal will automatically compute and prepare the certified marksheet.
                    </p>

                    <form onSubmit={handleStudentSubmit} className="space-y-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sadia Sultana"
                            value={studentForm.name}
                            onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Class *</label>
                          <select
                            value={studentForm.class}
                            onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value as any })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          >
                            <option value="Class 6">Class 6</option>
                            <option value="Class 7">Class 7</option>
                            <option value="Class 8">Class 8</option>
                            <option value="Class 9">Class 9</option>
                            <option value="Class 10">Class 10</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Class Roll Number *</label>
                          <input
                            type="number"
                            min="1"
                            required
                            value={studentForm.roll}
                            onChange={(e) => setStudentForm({ ...studentForm, roll: parseInt(e.target.value) || 1 })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Exam Result / Summary *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. GPA 5.00 or Passed"
                            value={studentForm.examResult}
                            onChange={(e) => setStudentForm({ ...studentForm, examResult: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">GPA (Out of 5.00)</label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="5.0"
                            value={studentForm.gpa}
                            onChange={(e) => {
                              const g = parseFloat(e.target.value) || 0;
                              let letter = 'F';
                              if (g >= 5.0) letter = 'A+';
                              else if (g >= 4.0) letter = 'A';
                              else if (g >= 3.5) letter = 'A-';
                              else if (g >= 3.0) letter = 'B';
                              setStudentForm({ ...studentForm, gpa: g, grade: letter });
                            }}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Letter Grade</label>
                          <select
                            value={studentForm.grade}
                            onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-bold"
                          >
                            <option value="A+">A+ (5.00)</option>
                            <option value="A">A (4.00)</option>
                            <option value="A-">A- (3.50)</option>
                            <option value="B">B (3.00)</option>
                            <option value="C">C (2.00)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Guardian Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Md. Shafiqul Alam"
                            value={studentForm.guardianName}
                            onChange={(e) => setStudentForm({ ...studentForm, guardianName: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Teacher Remarks</label>
                          <input
                            type="text"
                            placeholder="e.g. Excellent conduct and active scout member."
                            value={studentForm.remarks}
                            onChange={(e) => setStudentForm({ ...studentForm, remarks: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Photo Upload */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Student Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const b64 = await fileToBase64(file);
                              setStudentForm({ ...studentForm, photo: b64 });
                            }
                          }}
                          className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Student Record
                      </button>
                    </form>
                  </div>

                  {/* Existing Student List */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-3">Enrolled Students ({appData.students.length})</h4>
                    <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                      {appData.students.map((s) => (
                        <div key={s.id} className="p-3 bg-white flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">
                              #{s.roll}
                            </span>
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 text-xs truncate">{s.name}</div>
                              <div className="text-[11px] text-slate-500">{s.class} · {s.examResult}</div>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              if (confirm(`Delete student record for ${s.name}?`)) {
                                onDeleteStudent(s.id);
                                showToast('Student record removed');
                              }
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: MANAGE NOTICES */}
              {activeTab === 'notices' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      4. Publish Official Notice / Circular
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Broadcast circulars for examinations, holidays, admissions, and campus events.
                    </p>

                    <form onSubmit={handleNoticeSubmit} className="space-y-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Notice Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Schedule of Annual Sports Meet 2026"
                          value={noticeForm.title}
                          onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Category</label>
                          <select
                            value={noticeForm.category}
                            onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value as any })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          >
                            <option value="Examination">Examination</option>
                            <option value="Admission">Admission</option>
                            <option value="Academic">Academic</option>
                            <option value="Holiday">Holiday</option>
                            <option value="Sports & Culture">Sports & Culture</option>
                            <option value="General">General</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Published Authority</label>
                          <input
                            type="text"
                            value={noticeForm.publishedBy}
                            onChange={(e) => setNoticeForm({ ...noticeForm, publishedBy: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Short Summary (1-2 sentences)</label>
                        <input
                          type="text"
                          required
                          placeholder="Brief description shown on notice list"
                          value={noticeForm.summary}
                          onChange={(e) => setNoticeForm({ ...noticeForm, summary: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Detailed Circular Content *</label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Write the full institutional directive or circular text here..."
                          value={noticeForm.content}
                          onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isPinned"
                          checked={noticeForm.isPinned}
                          onChange={(e) => setNoticeForm({ ...noticeForm, isPinned: e.target.checked })}
                          className="w-4 h-4 text-sky-600 rounded"
                        />
                        <label htmlFor="isPinned" className="font-semibold text-slate-700 cursor-pointer">
                          Pin this announcement to top of Notice Board
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Publish Circular
                      </button>
                    </form>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-3">Published Circulars ({appData.notices.length})</h4>
                    <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                      {appData.notices.map((n) => (
                        <div key={n.id} className="p-3 bg-white flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 text-xs truncate">{n.title}</div>
                            <div className="text-[11px] text-slate-500">{n.category} · {n.date}</div>
                          </div>

                          <button
                            onClick={() => {
                              if (confirm(`Delete circular "${n.title}"?`)) {
                                onDeleteNotice(n.id);
                                showToast('Circular removed');
                              }
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: MANAGE GALLERY */}
              {activeTab === 'gallery' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      5. Upload Activity / Social Photo
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Add memorable captures from school sports, science fairs, celebrations, and campus life.
                    </p>

                    <form onSubmit={handleGallerySubmit} className="space-y-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Caption / Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. District Volleyball Tournament Winners 2026"
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Category</label>
                          <select
                            value={galleryForm.category}
                            onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          >
                            <option value="Campus">Campus</option>
                            <option value="Sports">Sports</option>
                            <option value="Science & Tech">Science & Tech</option>
                            <option value="Cultural">Cultural</option>
                            <option value="Celebrations">Celebrations</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Date</label>
                          <input
                            type="text"
                            placeholder="e.g. October 2026"
                            value={galleryForm.date}
                            onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Description</label>
                        <textarea
                          rows={2}
                          placeholder="Brief description of event or attendees..."
                          value={galleryForm.description}
                          onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      {/* Photo Upload or URL */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Select Photo File *</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const b64 = await fileToBase64(file);
                              setGalleryForm({ ...galleryForm, photo: b64 });
                            }
                          }}
                          className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                        />
                        {galleryForm.photo && (
                          <div className="mt-2 w-28 h-20 rounded-lg overflow-hidden border border-slate-300">
                            <img src={galleryForm.photo} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={!galleryForm.photo}
                        className="px-5 py-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-400 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Upload Gallery Photo
                      </button>
                    </form>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-3">Gallery Photos ({appData.gallery.length})</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {appData.gallery.map((g) => (
                        <div key={g.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                          <img src={g.photo} alt={g.title} className="w-full h-24 object-cover" />
                          <div className="p-2">
                            <div className="text-[11px] font-bold text-slate-900 truncate">{g.title}</div>
                            <div className="text-[10px] text-slate-500">{g.category}</div>
                            <button
                              onClick={() => {
                                if (confirm(`Delete "${g.title}"?`)) {
                                  onDeleteGallery(g.id);
                                  showToast('Photo deleted');
                                }
                              }}
                              className="mt-2 text-[10px] font-semibold text-rose-600 hover:underline block"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: SYSTEM & RESET */}
              {activeTab === 'system' && (
                <div className="space-y-6 max-w-lg">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      System Data & Demo Reset
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage local persistent data or reset application to original pre-loaded school records.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800">Export Application Backup</h4>
                    <p className="text-xs text-slate-600">
                      Export all teachers, students, exam results, and site settings as a JSON file.
                    </p>
                    <button
                      onClick={() => {
                        const blob = new Blob([JSON.stringify(appData, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `atghar_high_school_backup_${new Date().toISOString().split('T')[0]}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                        showToast('Backup JSON downloaded');
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg transition-colors"
                    >
                      Download Full Backup (.json)
                    </button>
                  </div>

                  <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 space-y-3">
                    <h4 className="text-xs font-bold text-rose-900">Reset to Default Data</h4>
                    <p className="text-xs text-rose-700">
                      Restores all original sample teachers, students, exam results, notices, and gallery images from the institutional template.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to restore default demo records? Custom additions will be replaced.')) {
                          onResetDefaults();
                          showToast('Data reset to default school records');
                        }
                      }}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg transition-colors"
                    >
                      Reset All Data to Factory Defaults
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
