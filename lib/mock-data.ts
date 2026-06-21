// Mock data for IQRO demo app
// All data is hardcoded — no real database queries in v1

export type AttendanceStatus = 'present' | 'absent' | 'excused' | 'future';
export type PaymentStatus = 'paid' | 'pending' | 'overdue';
export type HomeworkStatus = 'pending' | 'submitted' | 'graded';

// ─── Demo Student ──────────────────────────────────────────────────────────────
export const demoStudent = {
  id: 1,
  fullName: 'Karimov Alisher',
  age: 12,
  group: 'English A2 — M/Ch/J 15:00',
  teacher: 'Mr. Jasur',
  branch: 'Filial 1 — Yangihayot',
  branchShort: 'Filial 1',
  photoUrl: 'https://i.pravatar.cc/150?img=12',
  program: 'General English',
};

// ─── Demo Parent ───────────────────────────────────────────────────────────────
export const demoParent = {
  id: 1,
  fullName: 'Karimova Malika',
  phone: '+998 90 123 45 67',
  studentId: 1,
};

// ─── This Week's Attendance ────────────────────────────────────────────────────
export const weekAttendance: { day: string; dayRu: string; date: string; status: AttendanceStatus }[] = [
  { day: 'Dushanba', dayRu: 'Пон', date: 'Jun 16', status: 'present' },
  { day: 'Seshanba', dayRu: 'Вт',  date: 'Jun 17', status: 'present' },
  { day: 'Chorshanba', dayRu: 'Ср', date: 'Jun 18', status: 'absent' },
  { day: 'Payshanba', dayRu: 'Чт', date: 'Jun 19', status: 'present' },  // today
  { day: 'Juma',     dayRu: 'Пт',  date: 'Jun 20', status: 'future' },
];

// Today's status (Thursday = present)
export const todayAttendanceStatus: AttendanceStatus = 'present';

// ─── Homework ──────────────────────────────────────────────────────────────────
export const homeworkItems: {
  id: number;
  title: string;
  titleRu: string;
  dueDate: string;
  status: HomeworkStatus;
  dueLabel: string;
  dueLabelRu: string;
}[] = [
  {
    id: 1,
    title: 'Unit 5 — Vocabulary list',
    titleRu: 'Юнит 5 — Список слов',
    dueDate: '2026-06-22',
    status: 'pending',
    dueLabel: 'Ertaga topshirish',
    dueLabelRu: 'Сдать завтра',
  },
  {
    id: 2,
    title: 'Reading: The Lost City p.34–36',
    titleRu: 'Чтение: The Lost City стр.34–36',
    dueDate: '2026-06-27',
    status: 'pending',
    dueLabel: 'Dush, 27-iyun',
    dueLabelRu: 'Пон, 27 июня',
  },
];

// ─── Payment ───────────────────────────────────────────────────────────────────
export const demoPayment = {
  id: 1,
  amountUzs: 450000,
  dueDate: '2026-06-25',
  dueDateLabel: '25-iyun, 2026',
  dueDateLabelRu: '25 июня, 2026',
  status: 'pending' as PaymentStatus,
  monthLabel: 'Iyun 2026',
  monthLabelRu: 'Июнь 2026',
};

// ─── Schedule ──────────────────────────────────────────────────────────────────
export const weekSchedule: { day: string; dayRu: string; time: string; subject: string; isToday?: boolean }[] = [
  { day: 'Dushanba', dayRu: 'Понедельник', time: '15:00 – 17:00', subject: 'English A2' },
  { day: 'Chorshanba', dayRu: 'Среда', time: '15:00 – 17:00', subject: 'English A2' },
  { day: 'Juma', dayRu: 'Пятница', time: '15:00 – 17:00', subject: 'English A2' },
];

// ─── Admin — Branch Data ────────────────────────────────────────────────────────
export const branches = [
  { id: 1, name: 'Filial 1 — Yangihayot', address: "Shokirariq ko'cha, 141, 3-qavat", phone: '+998 71 234 56 78' },
  { id: 2, name: 'Filial 2 — Qoraqamish', address: "Qoraqamish ko'chasi, 22, 2-qavat", phone: '+998 71 234 56 79' },
  { id: 3, name: 'Filial 3 — Sergeli',    address: "Kattabog' ko'chasi, 7, 1-qavat",   phone: '+998 71 234 56 80' },
];

// ─── Admin — Branch Stats ───────────────────────────────────────────────────────
export const branchStats: Record<number, {
  totalStudents: number;
  todayPresent: number;
  todayTotal: number;
  overdueCount: number;
}> = {
  1: { totalStudents: 47, todayPresent: 38, todayTotal: 47, overdueCount: 2 },
  2: { totalStudents: 34, todayPresent: 29, todayTotal: 34, overdueCount: 1 },
  3: { totalStudents: 28, todayPresent: 22, todayTotal: 28, overdueCount: 3 },
};

// ─── Admin — Weekly Attendance Chart ───────────────────────────────────────────
export const weeklyChartData: Record<number, { day: string; dayRu: string; pct: number | null }[]> = {
  1: [
    { day: 'Dush', dayRu: 'Пн', pct: 88 },
    { day: 'Sesh', dayRu: 'Вт', pct: 79 },
    { day: 'Chor', dayRu: 'Ср', pct: 83 },
    { day: 'Pays', dayRu: 'Чт', pct: 81 },
    { day: 'Juma', dayRu: 'Пт', pct: null },
  ],
  2: [
    { day: 'Dush', dayRu: 'Пн', pct: 91 },
    { day: 'Sesh', dayRu: 'Вт', pct: 85 },
    { day: 'Chor', dayRu: 'Ср', pct: 88 },
    { day: 'Pays', dayRu: 'Чт', pct: 85 },
    { day: 'Juma', dayRu: 'Пт', pct: null },
  ],
  3: [
    { day: 'Dush', dayRu: 'Пн', pct: 78 },
    { day: 'Sesh', dayRu: 'Вт', pct: 82 },
    { day: 'Chor', dayRu: 'Ср', pct: 75 },
    { day: 'Pays', dayRu: 'Чт', pct: 79 },
    { day: 'Juma', dayRu: 'Пт', pct: null },
  ],
};

// ─── Admin — Payments Table ─────────────────────────────────────────────────────
export const paymentsTableData: Record<number, {
  id: number;
  studentName: string;
  amountUzs: number;
  dueDate: string;
  dueDateLabel: string;
  status: PaymentStatus;
}[]> = {
  1: [
    { id: 1, studentName: 'Karimov Alisher',   amountUzs: 450000, dueDate: '2026-06-25', dueDateLabel: 'Iyun 25', status: 'pending' },
    { id: 2, studentName: 'Yusupova Kamola',   amountUzs: 450000, dueDate: '2026-06-25', dueDateLabel: 'Iyun 25', status: 'pending' },
    { id: 3, studentName: 'Toshmatov Bobur',   amountUzs: 500000, dueDate: '2026-06-20', dueDateLabel: 'Iyun 20', status: 'overdue' },
    { id: 4, studentName: 'Nazarova Dilnoza',  amountUzs: 450000, dueDate: '2026-06-30', dueDateLabel: 'Iyun 30', status: 'pending' },
    { id: 5, studentName: 'Rahimov Sherzod',   amountUzs: 500000, dueDate: '2026-06-15', dueDateLabel: 'Iyun 15', status: 'overdue' },
    { id: 6, studentName: "Mirzayeva Lobar",   amountUzs: 450000, dueDate: '2026-07-01', dueDateLabel: 'Iyul 1',  status: 'pending' },
  ],
  2: [
    { id: 7,  studentName: 'Hasanov Sardor',   amountUzs: 450000, dueDate: '2026-06-25', dueDateLabel: 'Iyun 25', status: 'pending' },
    { id: 8,  studentName: "Normatova Feruza", amountUzs: 500000, dueDate: '2026-06-18', dueDateLabel: 'Iyun 18', status: 'overdue' },
    { id: 9,  studentName: 'Qodirov Jasur',    amountUzs: 450000, dueDate: '2026-06-30', dueDateLabel: 'Iyun 30', status: 'paid'    },
    { id: 10, studentName: 'Tursunova Zulfiya',amountUzs: 450000, dueDate: '2026-07-01', dueDateLabel: 'Iyul 1',  status: 'pending' },
  ],
  3: [
    { id: 11, studentName: 'Ergashev Doniyor', amountUzs: 500000, dueDate: '2026-06-20', dueDateLabel: 'Iyun 20', status: 'overdue' },
    { id: 12, studentName: 'Usmonova Barno',   amountUzs: 450000, dueDate: '2026-06-25', dueDateLabel: 'Iyun 25', status: 'pending' },
    { id: 13, studentName: "Xoliqov Bekzod",   amountUzs: 500000, dueDate: '2026-06-15', dueDateLabel: 'Iyun 15', status: 'overdue' },
    { id: 14, studentName: 'Salimova Hulkar',  amountUzs: 450000, dueDate: '2026-06-28', dueDateLabel: 'Iyun 28', status: 'paid'    },
    { id: 15, studentName: 'Bobojonov Sanjar', amountUzs: 450000, dueDate: '2026-07-01', dueDateLabel: 'Iyul 1',  status: 'overdue' },
  ],
};
