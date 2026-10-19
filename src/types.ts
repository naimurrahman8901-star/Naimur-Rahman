export interface SchoolInfo {
  name: string;
  banglaName: string;
  motto: string;
  logo: string;
  about: string;
  history: string;
  headmasterMessage: string;
  headmasterName: string;
  headmasterDesignation: string;
  headmasterPhoto: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  facebook: string;
  youtube: string;
  establishedYear: string;
  eiin: string;
  schoolCode: string;
  campusArea: string;
  totalStudents: string;
  totalTeachers: string;
  passRate: string;
}

export interface SubjectMark {
  subjectName: string;
  fullMarks: number;
  obtainedMarks: number;
  letterGrade: string;
  gradePoint: number;
}

export interface Teacher {
  id: string;
  name: string;
  banglaName?: string;
  designation: string;
  department: 'Administration' | 'Science' | 'Arts & Humanities' | 'Commerce' | 'Languages' | 'ICT & Vocational';
  subject: string;
  qualification: string;
  contact: string;
  email: string;
  photo: string;
  joiningYear: string;
}

export interface Student {
  id: string;
  name: string;
  class: 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10';
  section: 'Section A' | 'Section B' | 'Padma' | 'Meghna';
  roll: number;
  examResult: string; // e.g. "GPA 5.00 (Golden A+)"
  gpa: number;
  grade: string;
  photo: string;
  guardianName: string;
  guardianContact: string;
  subjects: SubjectMark[];
  attendanceRate: string;
  remarks: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Academic' | 'Examination' | 'Admission' | 'Holiday' | 'Sports & Culture' | 'General';
  summary: string;
  content: string;
  isPinned: boolean;
  publishedBy: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Sports' | 'Science & Tech' | 'Cultural' | 'Celebrations';
  photo: string;
  date: string;
  description: string;
}

export interface AppData {
  adminPass: string;
  siteInfo: SchoolInfo;
  teachers: Teacher[];
  students: Student[];
  notices: Notice[];
  gallery: GalleryItem[];
}
