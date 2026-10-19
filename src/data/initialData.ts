import { AppData, SubjectMark } from '../types';

export const calculateGPA = (subjects: SubjectMark[]): { gpa: number; grade: string } => {
  if (!subjects.length) return { gpa: 0, grade: 'F' };
  const totalGP = subjects.reduce((sum, s) => sum + s.gradePoint, 0);
  const avg = Number((totalGP / subjects.length).toFixed(2));
  
  let grade = 'F';
  if (avg >= 5.0) grade = 'A+';
  else if (avg >= 4.0) grade = 'A';
  else if (avg >= 3.5) grade = 'A-';
  else if (avg >= 3.0) grade = 'B';
  else if (avg >= 2.0) grade = 'C';
  else if (avg >= 1.0) grade = 'D';

  return { gpa: avg, grade };
};

export const INITIAL_DATA: AppData = {
  adminPass: 'admin123',
  siteInfo: {
    name: 'Atghar High School',
    banglaName: 'আটঘর উচ্চ বিদ্যালয়',
    motto: 'Knowledge, Integrity, and Excellence',
    logo: '',
    about: 'Atghar High School is a premier academic institution founded with the mission of illuminating minds and fostering ethical leadership. Over decades of dedicated service, our institution has built a rich legacy of academic distinctions, national science accolades, and character-building extracurriculars.',
    history: 'Established in 1968 by local philanthropists and visionary educators, Atghar High School began with modest classrooms and a handful of dedicated scholars. Today, it stands as a distinguished model secondary school affiliated with the Board of Intermediate and Secondary Education, serving over 1,450 students across a picturesque 3.8-acre green campus.',
    headmasterMessage: 'Education is the supreme catalyst that shapes character and equips our youth to navigate an evolving global society. At Atghar High School, our distinguished faculty is steadfastly devoted to cultivating not only academic mastery in mathematics, sciences, and languages, but also unshakeable moral integrity, creative inquiry, and civic pride.',
    headmasterName: 'Md. Abdur Rahim Finch, M.Sc, B.Ed',
    headmasterDesignation: 'Headmaster & Principal',
    headmasterPhoto: '/src/assets/images/school_headmaster_portrait_1792436789143.jpg',
    address: 'Atghar Bazar Road, Swarupkathi, Pirojpur, Barishal Division',
    phone: '+880 1712-345678',
    emergencyPhone: '+880 1823-987654',
    email: 'info@atgharhighschool.edu.bd',
    facebook: 'https://facebook.com/atgharhighschool',
    youtube: 'https://youtube.com/@atgharhighschool',
    establishedYear: '1968',
    eiin: '132456',
    schoolCode: '4021',
    campusArea: '3.8 Acres',
    totalStudents: '1,450+',
    totalTeachers: '46 Faculty & Staff',
    passRate: '99.4%'
  },
  teachers: [
    {
      id: 't-1',
      name: 'Md. Abdur Rahim Finch',
      banglaName: 'মোঃ আব্দুর রহিম',
      designation: 'Headmaster',
      department: 'Administration',
      subject: 'Institutional Leadership & Ethics',
      qualification: 'M.Sc (Physics), B.Ed (1st Class), DU',
      contact: '+880 1712-345678',
      email: 'headmaster@atgharhighschool.edu.bd',
      photo: '/src/assets/images/school_headmaster_portrait_1792436789143.jpg',
      joiningYear: '2008'
    },
    {
      id: 't-2',
      name: 'Begum Rashida Sultana',
      banglaName: 'বেগম রাশিদা সুলতানা',
      designation: 'Assistant Headmaster',
      department: 'Administration',
      subject: 'English Language & Literature',
      qualification: 'M.A in English, B.Ed',
      contact: '+880 1715-882211',
      email: 'rashida.sultana@atgharhighschool.edu.bd',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      joiningYear: '2012'
    },
    {
      id: 't-3',
      name: 'Subrata Kumar Roy',
      banglaName: 'সুব্রত কুমার রায়',
      designation: 'Senior Teacher',
      department: 'Science',
      subject: 'Higher Mathematics & Physics',
      qualification: 'M.Sc in Applied Mathematics (RU)',
      contact: '+880 1718-445566',
      email: 'subrata.roy@atgharhighschool.edu.bd',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      joiningYear: '2010'
    },
    {
      id: 't-4',
      name: 'Farhana Akhtar',
      banglaName: 'ফারহানা আক্তার',
      designation: 'Senior Teacher',
      department: 'Languages',
      subject: 'Bangla First & Second Paper',
      qualification: 'M.A in Bengali Language & Linguistics (JU)',
      contact: '+880 1729-112233',
      email: 'farhana.akhtar@atgharhighschool.edu.bd',
      photo: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80',
      joiningYear: '2014'
    },
    {
      id: 't-5',
      name: 'Tanvir Ahmed Chowdhury',
      banglaName: 'তানভীর আহমেদ চৌধুরী',
      designation: 'Assistant Teacher',
      department: 'ICT & Vocational',
      subject: 'Information & Communication Technology',
      qualification: 'B.Sc in Computer Science & Engineering',
      contact: '+880 1819-334455',
      email: 'tanvir.ict@atgharhighschool.edu.bd',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      joiningYear: '2019'
    },
    {
      id: 't-6',
      name: 'Mohammad Nazrul Islam',
      banglaName: 'মোহাম্মদ নজরুল ইসলাম',
      designation: 'Assistant Teacher',
      department: 'Science',
      subject: 'Chemistry & General Science',
      qualification: 'B.Sc (Hons), M.Sc in Chemistry (CU)',
      contact: '+880 1733-556677',
      email: 'nazrul.science@atgharhighschool.edu.bd',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      joiningYear: '2016'
    },
    {
      id: 't-7',
      name: 'Mahmuda Begum',
      banglaName: 'মাহমুদা বেগম',
      designation: 'Assistant Teacher',
      department: 'Arts & Humanities',
      subject: 'Bangladesh & Global Studies, History',
      qualification: 'M.A in History, B.Ed',
      contact: '+880 1744-889900',
      email: 'mahmuda.history@atgharhighschool.edu.bd',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      joiningYear: '2015'
    },
    {
      id: 't-8',
      name: 'Kazi Motiur Rahman',
      banglaName: 'কাজী মতিউর রহমান',
      designation: 'Physical Education Instructor',
      department: 'Administration',
      subject: 'Physical Education & Scout Commander',
      qualification: 'B.P.Ed, National Scout Medalist',
      contact: '+880 1755-667788',
      email: 'sports@atgharhighschool.edu.bd',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      joiningYear: '2011'
    }
  ],
  students: [
    {
      id: 's-101',
      name: 'Tanzir Hasan Nibir',
      class: 'Class 10',
      section: 'Section A',
      roll: 1,
      examResult: 'GPA 5.00 (Golden A+)',
      gpa: 5.0,
      grade: 'A+',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      guardianName: 'Abul Hasan',
      guardianContact: '+880 1711-234567',
      attendanceRate: '98%',
      remarks: 'Outstanding performance across Science, Mathematics, and Debate.',
      subjects: [
        { subjectName: 'Bangla', fullMarks: 100, obtainedMarks: 91, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'English', fullMarks: 100, obtainedMarks: 88, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'General Mathematics', fullMarks: 100, obtainedMarks: 97, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'Physics', fullMarks: 100, obtainedMarks: 94, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'Chemistry', fullMarks: 100, obtainedMarks: 92, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'Biology', fullMarks: 100, obtainedMarks: 90, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'ICT', fullMarks: 50, obtainedMarks: 48, letterGrade: 'A+', gradePoint: 5.0 }
      ]
    },
    {
      id: 's-102',
      name: 'Sumaiya Akter Meem',
      class: 'Class 10',
      section: 'Section A',
      roll: 2,
      examResult: 'GPA 5.00 (A+)',
      gpa: 5.0,
      grade: 'A+',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      guardianName: 'Mokhlesur Rahman',
      guardianContact: '+880 1712-349988',
      attendanceRate: '96%',
      remarks: 'Excellent discipline and consistent distinction in examinations.',
      subjects: [
        { subjectName: 'Bangla', fullMarks: 100, obtainedMarks: 89, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'English', fullMarks: 100, obtainedMarks: 92, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'General Mathematics', fullMarks: 100, obtainedMarks: 94, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'Physics', fullMarks: 100, obtainedMarks: 88, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'Chemistry', fullMarks: 100, obtainedMarks: 90, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'Higher Mathematics', fullMarks: 100, obtainedMarks: 93, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'ICT', fullMarks: 50, obtainedMarks: 47, letterGrade: 'A+', gradePoint: 5.0 }
      ]
    },
    {
      id: 's-103',
      name: 'Rafiul Islam Siam',
      class: 'Class 10',
      section: 'Section B',
      roll: 3,
      examResult: 'GPA 4.86 (A)',
      gpa: 4.86,
      grade: 'A',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      guardianName: 'Nurul Islam',
      guardianContact: '+880 1819-223344',
      attendanceRate: '94%',
      remarks: 'Strong analytical skills, school cricket team vice-captain.',
      subjects: [
        { subjectName: 'Bangla', fullMarks: 100, obtainedMarks: 82, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'English', fullMarks: 100, obtainedMarks: 78, letterGrade: 'A', gradePoint: 4.0 },
        { subjectName: 'General Mathematics', fullMarks: 100, obtainedMarks: 92, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'Physics', fullMarks: 100, obtainedMarks: 86, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'Chemistry', fullMarks: 100, obtainedMarks: 84, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'Higher Mathematics', fullMarks: 100, obtainedMarks: 89, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'ICT', fullMarks: 50, obtainedMarks: 45, letterGrade: 'A+', gradePoint: 5.0 }
      ]
    },
    {
      id: 's-901',
      name: 'Ayesha Siddiqua',
      class: 'Class 9',
      section: 'Section A',
      roll: 1,
      examResult: 'GPA 5.00 (Golden A+)',
      gpa: 5.0,
      grade: 'A+',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      guardianName: 'Dr. Rafiqul Bari',
      guardianContact: '+880 1713-998877',
      attendanceRate: '99%',
      remarks: 'Topper of Class 9, winner of District Science Olympiad.',
      subjects: [
        { subjectName: 'Bangla', fullMarks: 100, obtainedMarks: 93, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'English', fullMarks: 100, obtainedMarks: 90, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'Mathematics', fullMarks: 100, obtainedMarks: 99, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'General Science', fullMarks: 100, obtainedMarks: 95, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'Bangladesh & Global Studies', fullMarks: 100, obtainedMarks: 89, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'ICT', fullMarks: 50, obtainedMarks: 49, letterGrade: 'A+', gradePoint: 5.0 }
      ]
    },
    {
      id: 's-902',
      name: 'Nahidul Karim',
      class: 'Class 9',
      section: 'Section A',
      roll: 2,
      examResult: 'GPA 4.75 (A)',
      gpa: 4.75,
      grade: 'A',
      photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      guardianName: 'Fazlul Karim',
      guardianContact: '+880 1714-445577',
      attendanceRate: '93%',
      remarks: 'Good progress in sciences and dedicated laboratory worker.',
      subjects: [
        { subjectName: 'Bangla', fullMarks: 100, obtainedMarks: 80, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'English', fullMarks: 100, obtainedMarks: 76, letterGrade: 'A', gradePoint: 4.0 },
        { subjectName: 'Mathematics', fullMarks: 100, obtainedMarks: 88, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'General Science', fullMarks: 100, obtainedMarks: 84, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'ICT', fullMarks: 50, obtainedMarks: 44, letterGrade: 'A+', gradePoint: 5.0 }
      ]
    },
    {
      id: 's-801',
      name: 'Sabrina Hossain Snigdha',
      class: 'Class 8',
      section: 'Padma',
      roll: 1,
      examResult: 'GPA 5.00 (Golden A+)',
      gpa: 5.0,
      grade: 'A+',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      guardianName: 'Altaf Hossain',
      guardianContact: '+880 1817-991122',
      attendanceRate: '97%',
      remarks: 'Junior Scholarship candidate, remarkable recitation and quiz talent.',
      subjects: [
        { subjectName: 'Bangla', fullMarks: 100, obtainedMarks: 92, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'English', fullMarks: 100, obtainedMarks: 94, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'Mathematics', fullMarks: 100, obtainedMarks: 98, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'General Science', fullMarks: 100, obtainedMarks: 91, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'ICT', fullMarks: 50, obtainedMarks: 48, letterGrade: 'A+', gradePoint: 5.0 }
      ]
    },
    {
      id: 's-701',
      name: 'Mahir Faisal',
      class: 'Class 7',
      section: 'Meghna',
      roll: 1,
      examResult: 'GPA 5.00 (A+)',
      gpa: 5.0,
      grade: 'A+',
      photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
      guardianName: 'Faisal Mahmud',
      guardianContact: '+880 1720-334455',
      attendanceRate: '95%',
      remarks: 'Curious learner, active scout member.',
      subjects: [
        { subjectName: 'Bangla', fullMarks: 100, obtainedMarks: 88, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'English', fullMarks: 100, obtainedMarks: 86, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'Mathematics', fullMarks: 100, obtainedMarks: 94, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'General Science', fullMarks: 100, obtainedMarks: 90, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'ICT', fullMarks: 50, obtainedMarks: 46, letterGrade: 'A+', gradePoint: 5.0 }
      ]
    },
    {
      id: 's-601',
      name: 'Zarin Tasnim',
      class: 'Class 6',
      section: 'Section A',
      roll: 1,
      examResult: 'GPA 5.00 (A+)',
      gpa: 5.0,
      grade: 'A+',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      guardianName: 'Tareq Munshi',
      guardianContact: '+880 1730-112244',
      attendanceRate: '98%',
      remarks: 'Highest marks in the primary graduation entrance assessment.',
      subjects: [
        { subjectName: 'Bangla', fullMarks: 100, obtainedMarks: 91, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'English', fullMarks: 100, obtainedMarks: 89, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'Mathematics', fullMarks: 100, obtainedMarks: 96, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'General Science', fullMarks: 100, obtainedMarks: 93, letterGrade: 'A+', gradePoint: 5.0 },
        { subjectName: 'ICT', fullMarks: 50, obtainedMarks: 47, letterGrade: 'A+', gradePoint: 5.0 }
      ]
    }
  ],
  notices: [
    {
      id: 'n-1',
      title: 'Notice for Online Result Publication & Marksheet Distribution 2026',
      date: 'October 18, 2026',
      category: 'Examination',
      summary: 'Annual Evaluation Examination results for Classes 6 through 10 have been finalized and are accessible on the web portal.',
      content: 'All students, guardians, and faculty members are hereby informed that the Annual Academic Examination Results for academic year 2026 have been published. Digital marksheets and grade transcripts are accessible directly via the Student Portal. Physical certified transcripts with the official institutional seal can be collected from the school administrative office between 10:00 AM and 2:00 PM on weekdays.',
      isPinned: true,
      publishedBy: 'Controller of Examinations'
    },
    {
      id: 'n-2',
      title: 'Admission Circular for Session 2027 (Classes 6 to 9)',
      date: 'October 12, 2026',
      category: 'Admission',
      summary: 'Registration and lottery submission forms for upcoming academic session 2027 are available online.',
      content: 'Applications for admission into Classes 6, 7, 8, and 9 for Academic Session 2027 are officially open. Guardians may submit admission applications either through our digital helpdesk form or by collecting application packs directly from the school counter. Quotas for scouts, freedom fighters, and physically challenged students are preserved strictly under National Education Board guidelines.',
      isPinned: true,
      publishedBy: 'Admissions Committee'
    },
    {
      id: 'n-3',
      title: 'Inter-School Science Fair & Tech Exhibition Schedule',
      date: 'October 05, 2026',
      category: 'Academic',
      summary: 'Annual STEM fair showcasing student robotics and green innovations scheduled for next month.',
      content: 'The 28th Annual Atghar High School Science and Innovation Fair will be held in the Multipurpose Auditorium. Students from classes 7 to 10 are encouraged to register their scientific models and robotics projects by November 5. Outstanding innovations will receive the coveted Swarupkathi District Trophy.',
      isPinned: false,
      publishedBy: 'Science Club Convener'
    },
    {
      id: 'n-4',
      title: 'Annual Sports Meet & Track Competition 2026',
      date: 'September 28, 2026',
      category: 'Sports & Culture',
      summary: 'Two-day sporting meet on the main school ground featuring 32 track and field events.',
      content: 'The Annual Sports Meet will convene across two thrilling days on the central playground. Events include 100m sprint, relay race, high jump, shot put, and traditional cultural display. All registered participants must report to Sports Instructor Kazi Motiur Rahman.',
      isPinned: false,
      publishedBy: 'Physical Education Department'
    },
    {
      id: 'n-5',
      title: 'Autumn Vacation & Durga Puja Institutional Recess Notification',
      date: 'September 20, 2026',
      category: 'Holiday',
      summary: 'School academic classes will remain closed during scheduled autumn holidays.',
      content: 'Academic classes will remain suspended during the autumn festival recess. Administrative offices will resume normal operational shifts following government gazette directives. Online portal services remain functional 24/7.',
      isPinned: false,
      publishedBy: 'Headmaster Office'
    }
  ],
  gallery: [
    {
      id: 'g-1',
      title: 'Atghar High School Main Academic Campus & Grounds',
      category: 'Campus',
      photo: '/src/assets/images/school_campus_building_1792436786942.jpg',
      date: 'October 2026',
      description: 'The scenic three-story academic building and expansive central ground hosting our national flag assembly.'
    },
    {
      id: 'g-2',
      title: 'STEM Innovation & Annual Robotics Science Fair',
      category: 'Science & Tech',
      photo: '/src/assets/images/school_science_fair_1792436788143.jpg',
      date: 'September 2026',
      description: 'Senior students demonstrating automated sorting robotics and renewable energy models.'
    },
    {
      id: 'g-3',
      title: 'Annual Athletics Meet & Track Championship',
      category: 'Sports',
      photo: '/src/assets/images/school_sports_day_1792436789320.jpg',
      date: 'August 2026',
      description: 'High school sprint runners racing down the track backed by spirited cheers from student house stands.'
    },
    {
      id: 'g-4',
      title: 'Classroom & Digital Multimedia Lab Session',
      category: 'Campus',
      photo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
      date: 'July 2026',
      description: 'Modern multimedia classroom where teachers incorporate interactive computer curricula.'
    },
    {
      id: 'g-5',
      title: 'International Mother Language Day Celebration',
      category: 'Cultural',
      photo: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
      date: 'February 2026',
      description: 'Floral tribute at the Shaheed Minar followed by heartfelt poetry recitation and patriotic songs.'
    },
    {
      id: 'g-6',
      title: 'Inter-District Football Tournament Champions',
      category: 'Sports',
      photo: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1000&q=80',
      date: 'January 2026',
      description: 'Our senior football team celebrating their championship trophy victory on the school pavilion.'
    }
  ]
};
