export type Lang = 'uz' | 'ru';

export const translations = {
  uz: {
    appName: 'IQRO',
    tagline: "O'quv markazi — ota-onalar va o'quvchilar uchun",
    parentPortal: "Ota-ona Kabineti",
    adminPanel: "Admin Panel",
    enterPortal: "Kirish",

    // Attendance
    attendance: "Davomat",
    present: "Keldi ✅",
    absent: "Kelmadi ❌",
    excused: "Sababli ⚠️",
    todayStatus: "Bugungi holat",
    weekHistory: "Haftalik davomat",
    monday: "Dushanba",
    tuesday: "Seshanba",
    wednesday: "Chorshanba",
    thursday: "Payshanba",
    friday: "Juma",
    saturday: "Shanba",
    future: "Kutilmoqda",

    // Homework
    homework: "Uy vazifasi",
    pending: "Topshirilmagan",
    submitted: "Topshirilgan",
    graded: "Baholangan",
    dueTomorrow: "Ertaga topshirish",
    dueDate: "Topshirish sanasi",

    // Payment
    nextPayment: "Keyingi to'lov",
    amount: "Miqdor",
    due: "Sana",
    paymentStatus: "Holat",
    paymentPending: "Kutilmoqda",
    paymentOverdue: "Muddati o'tgan",
    paymentPaid: "To'langan",
    currency: "so'm",

    // Schedule
    schedule: "Dars jadvali",
    thisWeek: "Bu hafta",
    subject: "Fan",
    time: "Vaqt",

    // Student card
    student: "O'quvchi",
    group: "Guruh",
    teacher: "O'qituvchi",
    age: "Yosh",
    branch: "Filial",

    // Admin
    adminDashboard: "Admin Panel",
    totalStudents: "Jami o'quvchilar",
    todayAttendance: "Bugungi davomat",
    overduePayments: "Muddati o'tgan to'lovlar",
    upcomingPayments: "Kelayotgan to'lovlar",
    weeklyAttendance: "Haftalik davomat",
    studentName: "O'quvchi ismi",
    dueOn: "Sana",
    status: "Holat",
    overdue: "Muddati o'tgan",
    paid: "To'langan",
    branchTab: "Filial",

    // Install prompt
    addToHomeScreen: "Ilovani telefonga qo'shing",
    addButton: "Qo'shish",
    dismiss: "Yopish",

    // Landing
    landingHeadline: "Bolangizning o'quv hayoti — doim qo'lingizda",
    landingSubtitle: "Davomat, uy vazifasi, to'lovlar — hamma narsa bir joyda",

    // Nav
    navHome: "Bosh sahifa",
    navCourses: "Kurslar",
    navSchedule: "Jadval",
    navProfile: "Profil",

    // Home CTA
    viewCourses: "Kurslarni ko'rish",
    heroTitle: "IQRO",
    heroTagline: "Bilim — kelajaging kaliti",
    heroSub: "Zamonaviy ta'lim, tajribali o'qituvchilar, isbotlangan natijalar.",

    // Courses
    courseCatalog: "Kurslar",
    courseMonth: "oylik",
    ageRange: "Yosh",
    enroll: "Ro'yxatdan o'tish",
    enrolled: "Ro'yxatdan o'tilgan",
    courseDetail: "Kurs haqida",
    lessons: "Darslar",
    lessonCompleted: "Yakunlangan",
    lessonPending: "Kutilmoqda",
    courseScheduleLabel: "Dars jadvali",
    courseTeacher: "O'qituvchi",
    coursePrice: "To'lov",
    backToCourses: "Kurslarga qaytish",

    // Schedule screen
    scheduleTitle: "Dars jadvali",
    scheduleThisWeek: "Bu hafta",
    dayMon: "Du",
    dayTue: "Se",
    dayWed: "Ch",
    dayThu: "Pa",
    dayFri: "Ju",
  },
  ru: {
    appName: 'IQRO',
    tagline: 'Учебный центр — для родителей и учеников',
    parentPortal: 'Личный кабинет',
    adminPanel: 'Панель администратора',
    enterPortal: 'Войти',

    // Attendance
    attendance: 'Посещаемость',
    present: 'Присутствует ✅',
    absent: 'Отсутствует ❌',
    excused: 'Уважительная ⚠️',
    todayStatus: 'Статус сегодня',
    weekHistory: 'Посещаемость за неделю',
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    saturday: 'Суббота',
    future: 'Ожидается',

    // Homework
    homework: 'Домашнее задание',
    pending: 'Не сдано',
    submitted: 'Сдано',
    graded: 'Оценено',
    dueTomorrow: 'Сдать завтра',
    dueDate: 'Срок сдачи',

    // Payment
    nextPayment: 'Следующий платёж',
    amount: 'Сумма',
    due: 'Срок',
    paymentStatus: 'Статус',
    paymentPending: 'Ожидается',
    paymentOverdue: 'Просрочен',
    paymentPaid: 'Оплачено',
    currency: 'сум',

    // Schedule
    schedule: 'Расписание',
    thisWeek: 'Эта неделя',
    subject: 'Предмет',
    time: 'Время',

    // Student card
    student: 'Ученик',
    group: 'Группа',
    teacher: 'Учитель',
    age: 'Возраст',
    branch: 'Филиал',

    // Admin
    adminDashboard: 'Панель администратора',
    totalStudents: 'Всего учеников',
    todayAttendance: 'Посещаемость сегодня',
    overduePayments: 'Просроченные платежи',
    upcomingPayments: 'Предстоящие платежи',
    weeklyAttendance: 'Посещаемость за неделю',
    studentName: 'Имя ученика',
    dueOn: 'Срок',
    status: 'Статус',
    overdue: 'Просрочен',
    paid: 'Оплачено',
    branchTab: 'Филиал',

    // Install prompt
    addToHomeScreen: 'Добавьте приложение на экран',
    addButton: 'Добавить',
    dismiss: 'Закрыть',

    // Landing
    landingHeadline: 'Учёба вашего ребёнка — всегда под рукой',
    landingSubtitle: 'Посещаемость, домашние задания, оплаты — всё в одном месте',

    // Nav
    navHome: 'Главная',
    navCourses: 'Курсы',
    navSchedule: 'Расписание',
    navProfile: 'Профиль',

    // Home CTA
    viewCourses: 'Смотреть курсы',
    heroTitle: 'IQRO',
    heroTagline: 'Знания — ключ к будущему',
    heroSub: 'Современное образование, опытные педагоги, проверенные результаты.',

    // Courses
    courseCatalog: 'Курсы',
    courseMonth: 'в месяц',
    ageRange: 'Возраст',
    enroll: 'Записаться',
    enrolled: 'Записан',
    courseDetail: 'О курсе',
    lessons: 'Уроки',
    lessonCompleted: 'Пройдено',
    lessonPending: 'Ожидается',
    courseScheduleLabel: 'Расписание занятий',
    courseTeacher: 'Учитель',
    coursePrice: 'Оплата',
    backToCourses: 'Назад к курсам',

    // Schedule screen
    scheduleTitle: 'Расписание',
    scheduleThisWeek: 'Эта неделя',
    dayMon: 'Пн',
    dayTue: 'Вт',
    dayWed: 'Ср',
    dayThu: 'Чт',
    dayFri: 'Пт',
  },
} as const;

export type TranslationKey = keyof typeof translations.uz;
