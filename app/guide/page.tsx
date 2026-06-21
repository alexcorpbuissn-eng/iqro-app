'use client';

import { DarkHeader } from '@/components/shared/Header';
import { useLang } from '@/lib/i18n-context';

function GuideCard({
  icon, title, description, features
}: {
  icon: string;
  title: string;
  description: string;
  features: { dot: string; name: string; detail: string }[];
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 flex items-center gap-3 border-b border-gray-50">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="font-bold text-[#1C1C2E] text-sm">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3">
            <div className={`w-2 h-2 rounded-full ${f.dot} mt-1.5 flex-shrink-0`} />
            <div>
              <p className="text-sm font-semibold text-[#1C1C2E]">{f.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{f.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GuidePage() {
  const { lang } = useLang();

  const sections = [
    {
      labelUz: "OTA-ONA KABINETI",
      labelRu: "ЛИЧНЫЙ КАБИНЕТ",
      icon: "📱",
      titleUz: "Ota-ona kabineti",
      titleRu: "Личный кабинет",
      descUz: "Farzandingizning o'quv hayoti — bir ekranda",
      descRu: "Учёба вашего ребёнка — на одном экране",
      features: [
        {
          dot: "bg-green-500",
          nameUz: "Davomat", nameRu: "Посещаемость",
          detailUz: "Bugungi davomat holati va oxirgi 5 kunlik tarix. Keldi ✅ yoki Kelmadi ❌.",
          detailRu: "Статус посещаемости сегодня и история за 5 дней."
        },
        {
          dot: "bg-amber-500",
          nameUz: "Uy vazifasi", nameRu: "Домашнее задание",
          detailUz: "Barcha topshiriqlar va topshirish muddatlari. Topshirilgan / Baholangan holati.",
          detailRu: "Все задания и дедлайны. Статус сдачи и оценки."
        },
        {
          dot: "bg-red-500",
          nameUz: "To'lov", nameRu: "Оплата",
          detailUz: "Keyingi to'lov sanasi va miqdori. Muddati o'tgan bo'lsa, qizil rang bilan ko'rsatiladi.",
          detailRu: "Дата и сумма следующего платежа. Просрочка выделяется красным."
        },
        {
          dot: "bg-blue-500",
          nameUz: "Jadval", nameRu: "Расписание",
          detailUz: "Bu haftaning dars jadvali — kun va vaqt bilan.",
          detailRu: "Расписание уроков на эту неделю с днём и временем."
        }
      ]
    },
    {
      labelUz: "ADMIN PANEL",
      labelRu: "ПАНЕЛЬ АДМИНИСТРАТОРА",
      icon: "📊",
      titleUz: "Admin panel",
      titleRu: "Панель администратора",
      descUz: "3 filial bo'yicha to'liq nazorat",
      descRu: "Полный контроль по 3 филиалам",
      features: [
        {
          dot: "bg-red-500",
          nameUz: "Filiallar", nameRu: "Филиалы",
          detailUz: "Yangihayot, Qoraqamish va Sergeli filiallari orasida almashish. Har biri uchun alohida statistika.",
          detailRu: "Переключение между Янгихайот, Каракамыш и Сергели. Отдельная статистика для каждого."
        },
        {
          dot: "bg-green-500",
          nameUz: "Kunlik davomat", nameRu: "Дневная посещаемость",
          detailUz: "Bugun nechta o'quvchi kelgani va foiz ko'rsatkichi.",
          detailRu: "Сколько учеников пришло сегодня и процентный показатель."
        },
        {
          dot: "bg-blue-500",
          nameUz: "Haftalik grafik", nameRu: "Недельный график",
          detailUz: "Oxirgi 5 kunlik davomat foizi ustun diagrammada.",
          detailRu: "Процент посещаемости за последние 5 дней в виде столбчатой диаграммы."
        },
        {
          dot: "bg-amber-500",
          nameUz: "To'lovlar jadvali", nameRu: "Таблица оплат",
          detailUz: "O'quvchilar bo'yicha to'lov holati: To'langan, Kutilmoqda, Muddati o'tgan.",
          detailRu: "Статус оплаты по ученикам: Оплачено, Ожидается, Просрочено."
        }
      ]
    },
    {
      labelUz: "KURSLAR",
      labelRu: "КУРСЫ",
      icon: "📚",
      titleUz: "Kurslar katalogi",
      titleRu: "Каталог курсов",
      descUz: "To'rtta kurs — batafsil ma'lumot bilan",
      descRu: "Четыре курса — с подробной информацией",
      features: [
        {
          dot: "bg-blue-500",
          nameUz: "Matematika (Mental Arifmetika)", nameRu: "Matematika (Mental Arifmetika)",
          detailUz: "7–12 yosh. Usmon Xolmatov. Du/Chor/Jum 09:00–10:00. 350 000 so'm/oy.",
          detailRu: "7–12 лет. Usmon Xolmatov. Пн/Ср/Пт 09:00–10:00. 350 000 сум/мес."
        },
        {
          dot: "bg-red-500",
          nameUz: "English (General & IELTS)", nameRu: "English (General & IELTS)",
          detailUz: "10–18 yosh. Mr. Jasur. Du/Chor/Jum 15:00–17:00. 450 000 so'm/oy.",
          detailRu: "10–18 лет. Mr. Jasur. Пн/Ср/Пт 15:00–17:00. 450 000 сум/мес."
        },
        {
          dot: "bg-purple-500",
          nameUz: "Robototexnika", nameRu: "Робототехника",
          detailUz: "9–15 yosh. Dilshod Nazarov. Sesh/Pays 14:00–16:00. 500 000 so'm/oy.",
          detailRu: "9–15 лет. Dilshod Nazarov. Вт/Чт 14:00–16:00. 500 000 сум/мес."
        },
        {
          dot: "bg-amber-500",
          nameUz: "Tayyorlov guruhi", nameRu: "Подготовительная группа",
          detailUz: "5–7 yosh. Nargiza Yusupova. Har kuni 10:00–11:30. 300 000 so'm/oy.",
          detailRu: "5–7 лет. Nargiza Yusupova. Ежедневно 10:00–11:30. 300 000 сум/мес."
        }
      ]
    },
    {
      labelUz: "JADVAL",
      labelRu: "РАСПИСАНИЕ",
      icon: "📅",
      titleUz: "Dars jadvali",
      titleRu: "Расписание занятий",
      descUz: "Haftalik interaktiv jadval",
      descRu: "Интерактивное недельное расписание",
      features: [
        {
          dot: "bg-gray-400",
          nameUz: "Haftalik ko'rinish", nameRu: "Недельный вид",
          detailUz: "Dushanba–Juma, 08:00–19:00 oralig'idagi barcha darslar bir ko'rinishda.",
          detailRu: "Все занятия пн–пт, 08:00–19:00 в одном виде."
        },
        {
          dot: "bg-red-500",
          nameUz: "Dars tafsiloti", nameRu: "Детали урока",
          detailUz: "Istalgan dars blokiga bosing — o'qituvchi ismi va vaqtni ko'ring.",
          detailRu: "Нажмите на любой блок урока — увидите имя учителя и точное время."
        }
      ]
    },
    {
      labelUz: "ILOVANI O'RNATISH",
      labelRu: "УСТАНОВКА ПРИЛОЖЕНИЯ",
      icon: "📲",
      titleUz: "Ilovani telefoningizga o'rnating",
      titleRu: "Установите приложение на телефон",
      descUz: "App Store yoki Play Store siz kerak emas",
      descRu: "App Store и Play Store не нужны",
      features: [
        {
          dot: "bg-green-500",
          nameUz: "Android (Chrome)", nameRu: "Android (Chrome)",
          detailUz: "Saytni oching → brauzer menyusi (⋮) → 'Bosh ekranga qo'shish' → 'Qo'shish'.",
          detailRu: "Откройте сайт → меню браузера (⋮) → 'Добавить на главный экран' → 'Добавить'."
        },
        {
          dot: "bg-blue-500",
          nameUz: "iPhone (Safari)", nameRu: "iPhone (Safari)",
          detailUz: "Saytni oching → ulashish tugmasi (□↑) → 'Bosh ekranga qo'shish'.",
          detailRu: "Откройте сайт → кнопка поделиться (□↑) → 'На экран Домой'."
        }
      ]
    },
    {
      labelUz: "TIL SOZLAMALARI",
      labelRu: "ЯЗЫКОВЫЕ НАСТРОЙКИ",
      icon: "🌐",
      titleUz: "Til almashish",
      titleRu: "Переключение языка",
      descUz: "O'zbek va Rus tillari qo'llab-quvvatlanadi",
      descRu: "Поддерживаются узбекский и русский языки",
      features: [
        {
          dot: "bg-red-500",
          nameUz: "Har bir sahifada", nameRu: "На каждой странице",
          detailUz: "Yuqori o'ng burchakdagi UZ / RU tugmasi orqali istalgan vaqt tilni o'zgartiring.",
          detailRu: "Переключайте язык в любое время кнопкой UZ / RU в правом верхнем углу."
        },
        {
          dot: "bg-gray-400",
          nameUz: "Profil sahifasida", nameRu: "В профиле",
          detailUz: "Profil → Sozlamalar bo'limida ham til tugmasi mavjud.",
          detailRu: "Кнопка языка также доступна в Профиль → Настройки."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] pb-10">
      <div className="bg-[#111111] pb-6">
        <DarkHeader left="back" />
        <div className="max-w-2xl mx-auto px-4 pt-4 text-center">
          <h1 className="text-white text-xl font-bold tracking-widest uppercase mb-1">
            {lang === 'ru' ? "Руководство" : "QO'LLANMA"}
          </h1>
          <p className="text-white/60 text-sm">
            {lang === 'ru' ? "О приложении IQRO" : "IQRO ilovasi haqida"}
          </p>
        </div>
      </div>
      <div className="bg-[#F4F4F6] rounded-t-3xl -mt-4 relative z-10 pt-6">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          {sections.map((sec, idx) => (
            <div key={idx}>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
                {lang === 'ru' ? sec.labelRu : sec.labelUz}
              </p>
              <GuideCard
                icon={sec.icon}
                title={lang === 'ru' ? sec.titleRu : sec.titleUz}
                description={lang === 'ru' ? sec.descRu : sec.descUz}
                features={sec.features.map(f => ({
                  dot: f.dot,
                  name: lang === 'ru' ? f.nameRu : f.nameUz,
                  detail: lang === 'ru' ? f.detailRu : f.detailUz
                }))}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
