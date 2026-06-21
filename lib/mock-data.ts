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

// ─── Courses ───────────────────────────────────────────────────────────────────
export type LessonStatus = 'completed' | 'pending';

export interface Course {
  id: string;
  nameUz: string;
  nameRu: string;
  teacher: string;
  ageRangeUz: string;
  ageRangeRu: string;
  priceUzs: number;
  descriptionUz: string;
  descriptionRu: string;
  scheduleUz: string;
  scheduleRu: string;
  colorClass: string; // tailwind bg color for the card accent
  lessons: { id: number; titleUz: string; titleRu: string; status: LessonStatus }[];
}

export const courses: Course[] = [
  {
    id: 'matematika',
    nameUz: 'Matematika',
    nameRu: 'Математика',
    teacher: 'Usmon Xolmatov',
    ageRangeUz: '7–12 yosh',
    ageRangeRu: '7–12 лет',
    priceUzs: 350000,
    descriptionUz: "Mental arifmetika asosida tez hisoblash, mantiqiy fikrlash va muammolarni yechish ko'nikmasini rivojlantirish.",
    descriptionRu: 'Развитие навыков быстрого счёта, логического мышления и решения задач на основе ментальной арифметики.',
    scheduleUz: "Du, Chor, Jum — 09:00–10:00",
    scheduleRu: "Пн, Ср, Пт — 09:00–10:00",
    colorClass: 'bg-blue-500',
    lessons: [
      { id: 1, titleUz: "Sonlar va hisoblash asoslari",        titleRu: "Числа и основы счёта",              status: 'completed' },
      { id: 2, titleUz: "Qo'shish va ayirish tezligi",         titleRu: "Скорость сложения и вычитания",     status: 'completed' },
      { id: 3, titleUz: "Ko'paytirish jadvalini eslab qolish", titleRu: "Запоминание таблицы умножения",     status: 'completed' },
      { id: 4, titleUz: "Mental abakus — 1-daraja",           titleRu: "Ментальные счёты — уровень 1",      status: 'pending' },
      { id: 5, titleUz: "Muammolarni yechish strategiyalari", titleRu: "Стратегии решения задач",            status: 'pending' },
    ],
  },
  {
    id: 'english',
    nameUz: 'English',
    nameRu: 'Английский',
    teacher: 'Mr. Jasur',
    ageRangeUz: '10–18 yosh',
    ageRangeRu: '10–18 лет',
    priceUzs: 450000,
    descriptionUz: "General English va IELTS tayyorlovi. Native speaker ustozi bilan amaliy muloqot, grammatika va yozish ko'nikmalarini rivojlantirish.",
    descriptionRu: 'General English и подготовка к IELTS. Разговорная практика с носителем языка, грамматика и развитие навыков письма.',
    scheduleUz: "Du, Chor, Jum — 15:00–17:00",
    scheduleRu: "Пн, Ср, Пт — 15:00–17:00",
    colorClass: 'bg-red-500',
    lessons: [
      { id: 1, titleUz: "Unit 1 — Greetings & Introductions", titleRu: "Урок 1 — Приветствия и знакомства", status: 'completed' },
      { id: 2, titleUz: "Unit 2 — Present Simple tense",      titleRu: "Урок 2 — Настоящее простое время",  status: 'completed' },
      { id: 3, titleUz: "Unit 3 — Past Simple tense",         titleRu: "Урок 3 — Прошедшее простое время",  status: 'completed' },
      { id: 4, titleUz: "Unit 4 — Future tenses",             titleRu: "Урок 4 — Будущие времена",          status: 'completed' },
      { id: 5, titleUz: "Unit 5 — Vocabulary list",           titleRu: "Урок 5 — Список слов",              status: 'pending' },
      { id: 6, titleUz: "Unit 6 — Reading comprehension",     titleRu: "Урок 6 — Чтение с пониманием",      status: 'pending' },
    ],
  },
  {
    id: 'robototexnika',
    nameUz: 'Robototexnika',
    nameRu: 'Робототехника',
    teacher: 'Dilshod Nazarov',
    ageRangeUz: '9–15 yosh',
    ageRangeRu: '9–15 лет',
    priceUzs: 500000,
    descriptionUz: "Lego Mindstorms va Arduino orqali robotlarni qurish va dasturlashni o'rganish. Ijodiy va muhandislik tafakkurini rivojlantirish.",
    descriptionRu: 'Конструирование и программирование роботов с помощью Lego Mindstorms и Arduino. Развитие творческого и инженерного мышления.',
    scheduleUz: "Sesh, Pays — 14:00–16:00",
    scheduleRu: "Вт, Чт — 14:00–16:00",
    colorClass: 'bg-purple-500',
    lessons: [
      { id: 1, titleUz: "Robot nima? Asosiy tushunchalar",    titleRu: "Что такое робот? Основные понятия",  status: 'completed' },
      { id: 2, titleUz: "Lego EV3 bilan tanishish",           titleRu: "Знакомство с Lego EV3",              status: 'completed' },
      { id: 3, titleUz: "Harakatlanuvchi robot qurish",       titleRu: "Постройка движущегося робота",       status: 'pending' },
      { id: 4, titleUz: "Sensorlar va ulardan foydalanish",   titleRu: "Датчики и их использование",         status: 'pending' },
      { id: 5, titleUz: "Arduino — birinchi loyiha",          titleRu: "Arduino — первый проект",            status: 'pending' },
    ],
  },
  {
    id: 'tayyorlov',
    nameUz: "Tayyorlov guruhi",
    nameRu: 'Подготовительная группа',
    teacher: "Nargiza Yusupova",
    ageRangeUz: '5–7 yosh',
    ageRangeRu: '5–7 лет',
    priceUzs: 300000,
    descriptionUz: "Maktabga tayyorlov: o'qish, yozish, hisoblash va ijodiy faollik. Prezident maktablariga kirish imtihoniga tayyorlash.",
    descriptionRu: "Подготовка к школе: чтение, письмо, счёт и творческая активность. Подготовка к вступительным экзаменам в Президентские школы.",
    scheduleUz: "Du, Sesh, Chor, Pays, Jum — 10:00–11:30",
    scheduleRu: "Пн, Вт, Ср, Чт, Пт — 10:00–11:30",
    colorClass: 'bg-amber-500',
    lessons: [
      { id: 1, titleUz: "Harflarni o'rganish — A dan M gacha", titleRu: "Изучение букв — от А до М",          status: 'completed' },
      { id: 2, titleUz: "Harflarni o'rganish — N dan Z gacha", titleRu: "Изучение букв — от Н до Я",          status: 'completed' },
      { id: 3, titleUz: "1 dan 20 gacha sonlar",               titleRu: "Числа от 1 до 20",                   status: 'completed' },
      { id: 4, titleUz: "So'zlardan gaplar tuzish",            titleRu: "Составление предложений из слов",    status: 'pending' },
      { id: 5, titleUz: "Ijodiy rasm chizish",                 titleRu: "Творческое рисование",               status: 'pending' },
    ],
  },
];

// ─── Schedule Grid ──────────────────────────────────────────────────────────────
// Each entry: col = Mon(0)..Fri(4), startHour, startMin, durationMins
export interface ScheduleLesson {
  id: string;
  courseId: string;
  nameUz: string;
  nameRu: string;
  teacher: string;
  col: number;        // 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri
  startHour: number;
  startMin: number;
  durationMins: number;
  colorClass: string; // tailwind bg color
}

export const scheduleGrid: ScheduleLesson[] = [
  { id: 'sl1', courseId: 'matematika', nameUz: 'Matematika',    nameRu: 'Математика',    teacher: 'Usmon X.',   col: 0, startHour: 9,  startMin: 0,  durationMins: 60,  colorClass: 'bg-blue-500'   },
  { id: 'sl2', courseId: 'matematika', nameUz: 'Matematika',    nameRu: 'Математика',    teacher: 'Usmon X.',   col: 2, startHour: 9,  startMin: 0,  durationMins: 60,  colorClass: 'bg-blue-500'   },
  { id: 'sl3', courseId: 'english',    nameUz: 'English',       nameRu: 'Английский',    teacher: 'Mr. Jasur',  col: 0, startHour: 15, startMin: 0,  durationMins: 120, colorClass: 'bg-red-500'    },
  { id: 'sl4', courseId: 'english',    nameUz: 'English',       nameRu: 'Английский',    teacher: 'Mr. Jasur',  col: 2, startHour: 15, startMin: 0,  durationMins: 120, colorClass: 'bg-red-500'    },
  { id: 'sl5', courseId: 'english',    nameUz: 'English',       nameRu: 'Английский',    teacher: 'Mr. Jasur',  col: 4, startHour: 15, startMin: 0,  durationMins: 120, colorClass: 'bg-red-500'    },
  { id: 'sl6', courseId: 'robototexnika', nameUz: 'Robototexnika', nameRu: 'Робототехника', teacher: 'Dilshod N.', col: 1, startHour: 14, startMin: 0, durationMins: 120, colorClass: 'bg-purple-500' },
  { id: 'sl7', courseId: 'robototexnika', nameUz: 'Robototexnika', nameRu: 'Робототехника', teacher: 'Dilshod N.', col: 3, startHour: 14, startMin: 0, durationMins: 120, colorClass: 'bg-purple-500' },
  { id: 'sl8', courseId: 'tayyorlov',  nameUz: "Tayyorlov",     nameRu: 'Подготовка',    teacher: 'Nargiza Y.', col: 1, startHour: 10, startMin: 0,  durationMins: 90,  colorClass: 'bg-amber-500'  },
  { id: 'sl9', courseId: 'tayyorlov',  nameUz: "Tayyorlov",     nameRu: 'Подготовка',    teacher: 'Nargiza Y.', col: 3, startHour: 10, startMin: 0,  durationMins: 90,  colorClass: 'bg-amber-500'  },
];

// Grid config
export const GRID_START_HOUR = 8;   // 08:00
export const GRID_END_HOUR   = 19;  // 19:00
export const SLOT_HEIGHT_PX  = 56;  // px per 60 min

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
