export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  avatar?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  userId: string;
  name: string;
  price: number;
  unit: string;
  barcode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CalculationItem {
  id: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface Calculation {
  id: string;
  userId: string;
  items: CalculationItem[];
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  language: 'uz' | 'ru' | 'en';
  theme: 'light' | 'dark';
  currency: string;
  dateFormat: string;
}

export type Language = 'uz' | 'ru' | 'en';
