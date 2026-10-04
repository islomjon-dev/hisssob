import { create } from 'zustand';
import { User, Product, Calculation, Settings, CalculationItem, Language } from '../types';
import * as storage from '../utils/storage';
import { generateId } from '../utils/format';
import { calculateSubtotal, calculateFinalTotal, validateDiscount } from '../utils/calculations';

interface AppState {
  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;

  // Products
  products: Product[];
  addProduct: (data: { name: string; price: number; unit: string }) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Calculations
  calculations: Calculation[];
  addCalculation: (items: CalculationItem[], discountAmount: number, notes?: string) => { success: boolean; error?: string };
  deleteCalculation: (id: string) => void;

  // Settings
  settings: Settings;
  updateSettings: (data: Partial<Settings>) => void;
  language: Language;

  // Toast
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
}

export const useStore = create<AppState>((set, get) => {
  // Initialize from storage
  const currentUserId = storage.getCurrentUserId();
  const users = storage.getUsers();
  const currentUser = currentUserId ? users.find(u => u.id === currentUserId) || null : null;
  const settings = storage.getSettings();

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    products: currentUser ? storage.getUserProducts(currentUser.id) : [],
    calculations: currentUser ? storage.getUserCalculations(currentUser.id) : [],
    settings,
    language: settings.language,
    toast: null,

    login: (email: string, password: string) => {
      const users = storage.getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        return { success: false, error: "Email yoki parol noto'g'ri" };
      }
      storage.setCurrentUserId(user.id);
      set({
        currentUser: user,
        isAuthenticated: true,
        products: storage.getUserProducts(user.id),
        calculations: storage.getUserCalculations(user.id),
      });
      return { success: true };
    },

    register: (data) => {
      const users = storage.getUsers();
      if (users.find(u => u.email === data.email)) {
        return { success: false, error: "Bu email allaqachon ro'yxatdan o'tgan" };
      }
      const newUser: User = {
        id: generateId(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      storage.saveUsers(users);
      storage.setCurrentUserId(newUser.id);
      set({
        currentUser: newUser,
        isAuthenticated: true,
        products: [],
        calculations: [],
      });
      return { success: true };
    },

    logout: () => {
      storage.setCurrentUserId(null);
      set({
        currentUser: null,
        isAuthenticated: false,
        products: [],
        calculations: [],
      });
    },

    updateProfile: (data) => {
      const { currentUser } = get();
      if (!currentUser) return;
      const users = storage.getUsers();
      const idx = users.findIndex(u => u.id === currentUser.id);
      if (idx === -1) return;
      users[idx] = { ...users[idx], ...data };
      storage.saveUsers(users);
      set({ currentUser: users[idx] });
    },

    addProduct: (data) => {
      const { currentUser } = get();
      if (!currentUser) return;
      const product: Product = {
        id: generateId(),
        userId: currentUser.id,
        name: data.name,
        price: data.price,
        unit: data.unit,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const products = storage.getProducts();
      products.push(product);
      storage.saveProducts(products);
      set({ products: storage.getUserProducts(currentUser.id) });
      get().showToast("Mahsulot qo'shildi", 'success');
    },

    updateProduct: (id, data) => {
      const { currentUser } = get();
      if (!currentUser) return;
      const products = storage.getProducts();
      const idx = products.findIndex(p => p.id === id);
      if (idx === -1) return;
      products[idx] = { ...products[idx], ...data, updatedAt: new Date().toISOString() };
      storage.saveProducts(products);
      set({ products: storage.getUserProducts(currentUser.id) });
    },

    deleteProduct: (id) => {
      const { currentUser } = get();
      if (!currentUser) return;
      const products = storage.getProducts().filter(p => p.id !== id);
      storage.saveProducts(products);
      set({ products: storage.getUserProducts(currentUser.id) });
      get().showToast("Mahsulot o'chirildi", 'success');
    },

    addCalculation: (items, discountAmount, notes) => {
      const { currentUser } = get();
      if (!currentUser) return { success: false, error: 'Not authenticated' };
      
      const subtotal = calculateSubtotal(items);
      const validation = validateDiscount(discountAmount, subtotal);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }
      const finalTotal = calculateFinalTotal(subtotal, discountAmount);

      const calculation: Calculation = {
        id: generateId(),
        userId: currentUser.id,
        items,
        subtotal,
        discountAmount,
        finalTotal,
        notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const calculations = storage.getCalculations();
      calculations.push(calculation);
      storage.saveCalculations(calculations);
      set({ calculations: storage.getUserCalculations(currentUser.id) });
      get().showToast("Hisob-kitob saqlandi", 'success');
      return { success: true };
    },

    deleteCalculation: (id) => {
      const { currentUser } = get();
      if (!currentUser) return;
      const calculations = storage.getCalculations().filter(c => c.id !== id);
      storage.saveCalculations(calculations);
      set({ calculations: storage.getUserCalculations(currentUser.id) });
      get().showToast("Hisob-kitob o'chirildi", 'success');
    },

    updateSettings: (data) => {
      const { settings } = get();
      const newSettings = { ...settings, ...data };
      storage.saveSettings(newSettings);
      set({ settings: newSettings, language: newSettings.language });
    },

    showToast: (message, type) => {
      set({ toast: { message, type } });
      setTimeout(() => set({ toast: null }), 3000);
    },

    clearToast: () => set({ toast: null }),
  };
});
