import { User, Product, Calculation, Settings } from '../types';

const KEYS = {
  USERS: 'hissob_users',
  CURRENT_USER: 'hissob_current_user',
  PRODUCTS: 'hissob_products',
  CALCULATIONS: 'hissob_calculations',
  SETTINGS: 'hissob_settings',
};

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Users
export function getUsers(): User[] {
  return getItem<User[]>(KEYS.USERS, []);
}

export function saveUsers(users: User[]): void {
  setItem(KEYS.USERS, users);
}

export function getCurrentUserId(): string | null {
  return localStorage.getItem(KEYS.CURRENT_USER);
}

export function setCurrentUserId(userId: string | null): void {
  if (userId) {
    localStorage.setItem(KEYS.CURRENT_USER, userId);
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
}

// Products
export function getProducts(): Product[] {
  return getItem<Product[]>(KEYS.PRODUCTS, []);
}

export function saveProducts(products: Product[]): void {
  setItem(KEYS.PRODUCTS, products);
}

export function getUserProducts(userId: string): Product[] {
  return getProducts().filter(p => p.userId === userId);
}

// Calculations
export function getCalculations(): Calculation[] {
  return getItem<Calculation[]>(KEYS.CALCULATIONS, []);
}

export function saveCalculations(calculations: Calculation[]): void {
  setItem(KEYS.CALCULATIONS, calculations);
}

export function getUserCalculations(userId: string): Calculation[] {
  return getCalculations().filter(c => c.userId === userId);
}

// Settings
export function getSettings(): Settings {
  return getItem<Settings>(KEYS.SETTINGS, {
    language: 'uz',
    theme: 'light',
    currency: "so'm",
    dateFormat: 'DD.MM.YYYY',
  });
}

export function saveSettings(settings: Settings): void {
  setItem(KEYS.SETTINGS, settings);
}
