import { pgTable, serial, text, integer, date, timestamp, json } from 'drizzle-orm/pg-core';

// ─── branches ─────────────────────────────────────────────────────────────────
// One of 3 physical locations of IQRO
export const branches = pgTable('branches', {
  id:      serial('id').primaryKey(),
  name:    text('name').notNull(),     // "Filial 1 — Yangihayot"
  address: text('address').notNull(),
  phone:   text('phone').notNull(),
  slug:    text('slug').notNull(),     // "yangihayot-1"
});

// ─── programs ─────────────────────────────────────────────────────────────────
// Course type: Mental Arifmetika, Speed Reading, English, etc.
export const programs = pgTable('programs', {
  id:        serial('id').primaryKey(),
  name:      text('name').notNull(),
  branchId:  integer('branch_id').notNull().references(() => branches.id),
});

// ─── groups ───────────────────────────────────────────────────────────────────
// A class group (e.g. "English A2 — M/Ch/J 15:00")
export const groups = pgTable('groups', {
  id:           serial('id').primaryKey(),
  name:         text('name').notNull(),
  programId:    integer('program_id').notNull().references(() => programs.id),
  branchId:     integer('branch_id').notNull().references(() => branches.id),
  teacherName:  text('teacher_name').notNull(),
  scheduleJson: json('schedule_json'),  // [{ day: "Mon", time: "15:00" }, ...]
  level:        text('level'),          // "Beginner" | "Elementary" | "Intermediate" etc.
});

// ─── students ─────────────────────────────────────────────────────────────────
export const students = pgTable('students', {
  id:             serial('id').primaryKey(),
  fullName:       text('full_name').notNull(),
  age:            integer('age'),
  groupId:        integer('group_id').notNull().references(() => groups.id),
  photoUrl:       text('photo_url'),
  enrollmentDate: date('enrollment_date'),
  status:         text('status').notNull().default('active'), // "active" | "inactive"
});

// ─── parents ──────────────────────────────────────────────────────────────────
// 1:1 for demo, upgrade to 1:many later
export const parents = pgTable('parents', {
  id:        serial('id').primaryKey(),
  fullName:  text('full_name').notNull(),
  phone:     text('phone').notNull(),
  studentId: integer('student_id').notNull().references(() => students.id),
});

// ─── attendance ───────────────────────────────────────────────────────────────
// One row per student per class day
export const attendance = pgTable('attendance', {
  id:        serial('id').primaryKey(),
  studentId: integer('student_id').notNull().references(() => students.id),
  date:      date('date').notNull(),
  status:    text('status').notNull(), // "present" | "absent" | "excused"
  notes:     text('notes'),
});

// ─── homework ─────────────────────────────────────────────────────────────────
// Homework assignment per group
export const homework = pgTable('homework', {
  id:          serial('id').primaryKey(),
  groupId:     integer('group_id').notNull().references(() => groups.id),
  title:       text('title').notNull(),
  description: text('description'),
  dueDate:     date('due_date').notNull(),
  createdAt:   timestamp('created_at').defaultNow(),
});

// ─── homework_status ──────────────────────────────────────────────────────────
// Per-student completion status for each homework
export const homeworkStatus = pgTable('homework_status', {
  id:         serial('id').primaryKey(),
  homeworkId: integer('homework_id').notNull().references(() => homework.id),
  studentId:  integer('student_id').notNull().references(() => students.id),
  status:     text('status').notNull().default('pending'), // "pending" | "submitted" | "graded"
  grade:      text('grade'),  // "A+" etc., only when status = "graded"
});

// ─── payments ─────────────────────────────────────────────────────────────────
export const payments = pgTable('payments', {
  id:         serial('id').primaryKey(),
  studentId:  integer('student_id').notNull().references(() => students.id),
  amountUzs:  integer('amount_uzs').notNull(),   // in Uzbek sum, e.g. 450000
  dueDate:    date('due_date').notNull(),
  paidDate:   date('paid_date'),
  status:     text('status').notNull().default('pending'), // "paid" | "pending" | "overdue"
  monthLabel: text('month_label').notNull(),               // "Iyun 2026"
});
