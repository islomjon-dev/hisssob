import { Language } from '../types';

type TranslationKeys = {
  // Navigation
  dashboard: string;
  newCalculation: string;
  history: string;
  products: string;
  reports: string;
  calculator: string;
  settings: string;
  profile: string;
  logout: string;
  login: string;
  register: string;

  // Auth
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  loginTitle: string;
  registerTitle: string;
  noAccount: string;
  hasAccount: string;

  // Calculation
  productName: string;
  quantity: string;
  price: string;
  total: string;
  addItem: string;
  subtotal: string;
  discount: string;
  discountLabel: string;
  finalTotal: string;
  save: string;
  saving: string;
  notes: string;
  unit: string;

  // History
  search: string;
  today: string;
  yesterday: string;
  week: string;
  month: string;
  all: string;
  noCalculations: string;
  deleteConfirm: string;
  delete: string;
  cancel: string;

  // Products
  addProduct: string;
  editProduct: string;
  noProducts: string;
  deleteProduct: string;

  // Reports
  dailyTotal: string;
  weeklyTotal: string;
  monthlyTotal: string;
  totalDiscount: string;
  totalCalculations: string;
  noData: string;
  chartDaily: string;
  chartMonthly: string;

  // Settings
  language: string;
  theme: string;
  currency: string;
  dateFormat: string;
  dark: string;
  light: string;
  exportData: string;
  importData: string;
  account: string;

  // Dashboard
  todayCalculations: string;
  todayTotal: string;
  allCalculations: string;
  allDiscounts: string;
  recentCalculations: string;
  quickNew: string;
  welcome: string;

  // Common
  app: string;
  error: string;
  success: string;
  loading: string;
  noDataAvailable: string;
  saved: string;
  deleted: string;
  print: string;
  share: string;
  receipt: string;
  date: string;
  time: string;
  receiptId: string;
};

const translations: Record<Language, TranslationKeys> = {
  uz: {
    dashboard: 'Bosh sahifa',
    newCalculation: 'Yangi hisob-kitob',
    history: 'Tarix',
    products: 'Mahsulotlar',
    reports: 'Hisobotlar',
    calculator: 'Kalkulyator',
    settings: 'Sozlamalar',
    profile: 'Profil',
    logout: 'Chiqish',
    login: 'Kirish',
    register: "Ro'yxatdan o'tish",
    firstName: 'Ism',
    lastName: 'Familiya',
    email: 'Email',
    phone: 'Telefon',
    password: 'Parol',
    confirmPassword: 'Parolni tasdiqlang',
    loginTitle: 'Kirish',
    registerTitle: "Ro'yxatdan o'tish",
    noAccount: "Hisobingiz yo'qmi?",
    hasAccount: 'Hisobingiz bormi?',
    productName: 'Mahsulot nomi',
    quantity: 'Miqdor',
    price: 'Narx',
    total: 'Jami',
    addItem: 'Mahsulot qo\'shish',
    subtotal: 'Mahsulotlar jami',
    discount: 'Skidka',
    discountLabel: "Skidka (so'm)",
    finalTotal: 'Yakuniy summa',
    save: 'Saqlash',
    saving: 'Saqlanmoqda...',
    notes: 'Izoh',
    unit: 'Birlik',
    search: 'Qidirish...',
    today: 'Bugun',
    yesterday: 'Kecha',
    week: 'Hafta',
    month: 'Oy',
    all: 'Hammasi',
    noCalculations: "Hozircha hisob-kitoblar yo'q",
    deleteConfirm: "O'chirishni tasdiqlaysizmi?",
    delete: "O'chirish",
    cancel: 'Bekor qilish',
    addProduct: 'Mahsulot qo\'shish',
    editProduct: 'Tahrirlash',
    noProducts: "Hozircha mahsulotlar yo'q",
    deleteProduct: "Mahsulotni o'chirish",
    dailyTotal: 'Kunlik jami',
    weeklyTotal: 'Haftalik jami',
    monthlyTotal: 'Oylik jami',
    totalDiscount: 'Jami skidka',
    totalCalculations: 'Jami hisob-kitoblar',
    noData: "Ma'lumot yetarli emas",
    chartDaily: 'Kunlik hisobot',
    chartMonthly: 'Oylik hisobot',
    language: 'Til',
    theme: 'Mavzu',
    currency: 'Valyuta',
    dateFormat: 'Sana formati',
    dark: "Qorong'u",
    light: 'Yorug\'',
    exportData: "Ma'lumotlarni eksport",
    importData: "Ma'lumotlarni import",
    account: 'Hisob',
    todayCalculations: "Bugungi hisob-kitoblar",
    todayTotal: "Bugungi jami summa",
    allCalculations: "Jami hisob-kitoblar",
    allDiscounts: "Jami skidka",
    recentCalculations: "Oxirgi hisob-kitoblar",
    quickNew: "Yangi hisob-kitob",
    welcome: "Xush kelibsiz",
    app: 'HISSOB',
    error: 'Xatolik',
    success: "Muvaffaqiyatli",
    loading: 'Yuklanmoqda...',
    noDataAvailable: "Ma'lumot mavjud emas",
    saved: "Muvaffaqiyatli saqlandi",
    deleted: "Muvaffaqiyatli o'chirildi",
    print: 'Chop etish',
    share: "Ulashish",
    receipt: 'Chek',
    date: 'Sana',
    time: 'Vaqt',
    receiptId: 'Chek raqami',
  },
  ru: {
    dashboard: 'Главная',
    newCalculation: 'Новый расчёт',
    history: 'История',
    products: 'Товары',
    reports: 'Отчёты',
    calculator: 'Калькулятор',
    settings: 'Настройки',
    profile: 'Профиль',
    logout: 'Выход',
    login: 'Вход',
    register: 'Регистрация',
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'Эл. почта',
    phone: 'Телефон',
    password: 'Пароль',
    confirmPassword: 'Подтвердите пароль',
    loginTitle: 'Вход',
    registerTitle: 'Регистрация',
    noAccount: 'Нет аккаунта?',
    hasAccount: 'Есть аккаунт?',
    productName: 'Название товара',
    quantity: 'Количество',
    price: 'Цена',
    total: 'Итого',
    addItem: 'Добавить товар',
    subtotal: 'Сумма товаров',
    discount: 'Скидка',
    discountLabel: 'Скидка (сум)',
    finalTotal: 'Итоговая сумма',
    save: 'Сохранить',
    saving: 'Сохранение...',
    notes: 'Примечание',
    unit: 'Единица',
    search: 'Поиск...',
    today: 'Сегодня',
    yesterday: 'Вчера',
    week: 'Неделя',
    month: 'Месяц',
    all: 'Все',
    noCalculations: 'Пока нет расчётов',
    deleteConfirm: 'Подтверждаете удаление?',
    delete: 'Удалить',
    cancel: 'Отмена',
    addProduct: 'Добавить товар',
    editProduct: 'Редактировать',
    noProducts: 'Пока нет товаров',
    deleteProduct: 'Удалить товар',
    dailyTotal: 'Дневная сумма',
    weeklyTotal: 'Недельная сумма',
    monthlyTotal: 'Месячная сумма',
    totalDiscount: 'Общая скидка',
    totalCalculations: 'Всего расчётов',
    noData: 'Недостаточно данных',
    chartDaily: 'Дневной отчёт',
    chartMonthly: 'Месячный отчёт',
    language: 'Язык',
    theme: 'Тема',
    currency: 'Валюта',
    dateFormat: 'Формат даты',
    dark: 'Тёмная',
    light: 'Светлая',
    exportData: 'Экспорт данных',
    importData: 'Импорт данных',
    account: 'Аккаунт',
    todayCalculations: 'Расчёты за сегодня',
    todayTotal: 'Сумма за сегодня',
    allCalculations: 'Всего расчётов',
    allDiscounts: 'Общая скидка',
    recentCalculations: 'Последние расчёты',
    quickNew: 'Новый расчёт',
    welcome: 'Добро пожаловать',
    app: 'HISSOB',
    error: 'Ошибка',
    success: 'Успешно',
    loading: 'Загрузка...',
    noDataAvailable: 'Нет данных',
    saved: 'Успешно сохранено',
    deleted: 'Успешно удалено',
    print: 'Печать',
    share: 'Поделиться',
    receipt: 'Чек',
    date: 'Дата',
    time: 'Время',
    receiptId: 'Номер чека',
  },
  en: {
    dashboard: 'Dashboard',
    newCalculation: 'New Calculation',
    history: 'History',
    products: 'Products',
    reports: 'Reports',
    calculator: 'Calculator',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    loginTitle: 'Login',
    registerTitle: 'Register',
    noAccount: "Don't have an account?",
    hasAccount: 'Have an account?',
    productName: 'Product name',
    quantity: 'Quantity',
    price: 'Price',
    total: 'Total',
    addItem: 'Add item',
    subtotal: 'Subtotal',
    discount: 'Discount',
    discountLabel: 'Discount (sum)',
    finalTotal: 'Final Total',
    save: 'Save',
    saving: 'Saving...',
    notes: 'Notes',
    unit: 'Unit',
    search: 'Search...',
    today: 'Today',
    yesterday: 'Yesterday',
    week: 'Week',
    month: 'Month',
    all: 'All',
    noCalculations: 'No calculations yet',
    deleteConfirm: 'Confirm deletion?',
    delete: 'Delete',
    cancel: 'Cancel',
    addProduct: 'Add Product',
    editProduct: 'Edit',
    noProducts: 'No products yet',
    deleteProduct: 'Delete product',
    dailyTotal: 'Daily total',
    weeklyTotal: 'Weekly total',
    monthlyTotal: 'Monthly total',
    totalDiscount: 'Total discount',
    totalCalculations: 'Total calculations',
    noData: 'Not enough data',
    chartDaily: 'Daily report',
    chartMonthly: 'Monthly report',
    language: 'Language',
    theme: 'Theme',
    currency: 'Currency',
    dateFormat: 'Date format',
    dark: 'Dark',
    light: 'Light',
    exportData: 'Export data',
    importData: 'Import data',
    account: 'Account',
    todayCalculations: "Today's calculations",
    todayTotal: "Today's total",
    allCalculations: 'Total calculations',
    allDiscounts: 'Total discounts',
    recentCalculations: 'Recent calculations',
    quickNew: 'New calculation',
    welcome: 'Welcome',
    app: 'HISSOB',
    error: 'Error',
    success: 'Success',
    loading: 'Loading...',
    noDataAvailable: 'No data available',
    saved: 'Saved successfully',
    deleted: 'Deleted successfully',
    print: 'Print',
    share: 'Share',
    receipt: 'Receipt',
    date: 'Date',
    time: 'Time',
    receiptId: 'Receipt ID',
  },
};

export function t(key: keyof TranslationKeys, lang: Language): string {
  return translations[lang][key] || translations.uz[key] || key;
}

export default translations;
