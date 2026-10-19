import React, { useState, useEffect } from 'react';
import { AppData, Student, Notice, SchoolInfo, Teacher, GalleryItem } from './types';
import { INITIAL_DATA } from './data/initialData';
import { Navbar } from './components/Navbar';
import { NoticeTicker } from './components/NoticeTicker';
import { HeroSection } from './components/HeroSection';
import { NoticeBoard } from './components/NoticeBoard';
import { TeachersDirectory } from './components/TeachersDirectory';
import { StudentsPortal } from './components/StudentsPortal';
import { ActivitiesGallery } from './components/ActivitiesGallery';
import { AboutLeadership } from './components/AboutLeadership';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TranscriptModal } from './components/TranscriptModal';
import { AdminPortal } from './components/AdminPortal';

const STORAGE_KEY = 'atghar_school_data_v2';

export default function App() {
  // Load data from LocalStorage or use realistic Initial Data
  const [appData, setAppData] = useState<AppData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading stored school data:', e);
    }
    return INITIAL_DATA;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    } catch (e) {
      console.error('Error saving school data:', e);
    }
  }, [appData]);

  // Active section tracking
  const [activeSection, setActiveSection] = useState<string>('home');

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('atghar_admin_auth') === 'true';
  });

  // Modal dialog states
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState<boolean>(false);
  const [selectedTranscriptStudent, setSelectedTranscriptStudent] = useState<Student | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  // Smooth navigation handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Admin Login
  const handleAdminLogin = (password: string): boolean => {
    if (password === appData.adminPass) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('atghar_admin_auth', 'true');
      return true;
    }
    return false;
  };

  // Admin Logout
  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('atghar_admin_auth');
  };

  // Update School Info
  const handleUpdateSiteInfo = (info: Partial<SchoolInfo>) => {
    setAppData((prev) => ({
      ...prev,
      siteInfo: { ...prev.siteInfo, ...info }
    }));
  };

  // Update Admin Password
  const handleUpdateAdminPass = (newPass: string) => {
    setAppData((prev) => ({
      ...prev,
      adminPass: newPass
    }));
  };

  // Teacher Handlers
  const handleAddTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...teacher,
      id: `t-${Date.now()}`
    };
    setAppData((prev) => ({
      ...prev,
      teachers: [newTeacher, ...prev.teachers]
    }));
  };

  const handleDeleteTeacher = (id: string) => {
    setAppData((prev) => ({
      ...prev,
      teachers: prev.teachers.filter((t) => t.id !== id)
    }));
  };

  // Student Handlers
  const handleAddStudent = (student: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...student,
      id: `s-${Date.now()}`
    };
    setAppData((prev) => ({
      ...prev,
      students: [newStudent, ...prev.students]
    }));
  };

  const handleDeleteStudent = (id: string) => {
    setAppData((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s.id !== id)
    }));
  };

  // Notice Handlers
  const handleAddNotice = (notice: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...notice,
      id: `n-${Date.now()}`
    };
    setAppData((prev) => ({
      ...prev,
      notices: [newNotice, ...prev.notices]
    }));
  };

  const handleDeleteNotice = (id: string) => {
    setAppData((prev) => ({
      ...prev,
      notices: prev.notices.filter((n) => n.id !== id)
    }));
  };

  // Gallery Handlers
  const handleAddGallery = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `g-${Date.now()}`
    };
    setAppData((prev) => ({
      ...prev,
      gallery: [newItem, ...prev.gallery]
    }));
  };

  const handleDeleteGallery = (id: string) => {
    setAppData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id)
    }));
  };

  // Reset to Demo Defaults
  const handleResetDefaults = () => {
    setAppData(INITIAL_DATA);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Quick shortcut to result lookup
  const handleOpenResultLookup = () => {
    handleNavigate('students');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Top Navbar adhering strictly to Top Bar Contract */}
      <Navbar
        siteInfo={appData.siteInfo}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
        onOpenResultLookup={handleOpenResultLookup}
      />

      {/* Live Notice Ticker */}
      <NoticeTicker
        notices={appData.notices}
        onSelectNotice={(notice) => setSelectedNotice(notice)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroSection
          siteInfo={appData.siteInfo}
          onOpenResultLookup={handleOpenResultLookup}
          onNavigate={handleNavigate}
        />

        {/* Notices & Circulars */}
        <NoticeBoard
          notices={appData.notices}
          selectedNotice={selectedNotice}
          onSelectNotice={setSelectedNotice}
          isAdminLoggedIn={isAdminLoggedIn}
          onDeleteNotice={handleDeleteNotice}
        />

        {/* Respected Teachers Directory */}
        <TeachersDirectory
          teachers={appData.teachers}
          isAdminLoggedIn={isAdminLoggedIn}
          onDeleteTeacher={handleDeleteTeacher}
          onOpenAddTeacher={() => setIsAdminPortalOpen(true)}
        />

        {/* Student Directory & Exam Results Portal */}
        <StudentsPortal
          students={appData.students}
          onSelectStudent={(student) => setSelectedTranscriptStudent(student)}
          isAdminLoggedIn={isAdminLoggedIn}
          onDeleteStudent={handleDeleteStudent}
          onOpenAddStudent={() => setIsAdminPortalOpen(true)}
        />

        {/* School Activities & Social Gallery */}
        <ActivitiesGallery
          gallery={appData.gallery}
          isAdminLoggedIn={isAdminLoggedIn}
          onDeleteGalleryItem={handleDeleteGallery}
          onOpenAddGallery={() => setIsAdminPortalOpen(true)}
        />

        {/* About Leadership & Facilities */}
        <AboutLeadership
          siteInfo={appData.siteInfo}
        />

        {/* Contact & Administration Desk */}
        <ContactSection
          siteInfo={appData.siteInfo}
        />

      </main>

      {/* Institutional Footer */}
      <Footer
        siteInfo={appData.siteInfo}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Official Academic Transcript / Marksheet Modal */}
      {selectedTranscriptStudent && (
        <TranscriptModal
          student={selectedTranscriptStudent}
          siteInfo={appData.siteInfo}
          onClose={() => setSelectedTranscriptStudent(null)}
        />
      )}

      {/* Full Admin Management Portal Modal */}
      {isAdminPortalOpen && (
        <AdminPortal
          appData={appData}
          isAdminLoggedIn={isAdminLoggedIn}
          onLogin={handleAdminLogin}
          onLogout={handleAdminLogout}
          onUpdateSiteInfo={handleUpdateSiteInfo}
          onUpdateAdminPass={handleUpdateAdminPass}
          onAddTeacher={handleAddTeacher}
          onDeleteTeacher={handleDeleteTeacher}
          onAddStudent={handleAddStudent}
          onDeleteStudent={handleDeleteStudent}
          onAddNotice={handleAddNotice}
          onDeleteNotice={handleDeleteNotice}
          onAddGallery={handleAddGallery}
          onDeleteGallery={handleDeleteGallery}
          onResetDefaults={handleResetDefaults}
          onClose={() => setIsAdminPortalOpen(false)}
        />
      )}

    </div>
  );
}
