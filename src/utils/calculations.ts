import { CalculationItem } from '../types';

export function calculateItemTotal(quantity: number, unitPrice: number): number {
  return Math.round(quantity * unitPrice);
}

export function calculateSubtotal(items: CalculationItem[]): number {
  return items.reduce((sum, item) => sum + item.total, 0);
}

export function validateDiscount(discountAmount: number, subtotal: number): { valid: boolean; error?: string } {
  if (discountAmount < 0) {
    return { valid: false, error: "Skidka manfiy bo'lishi mumkin emas" };
  }
  if (discountAmount > subtotal) {
    return { valid: false, error: "Skidka jami summadan katta bo'lishi mumkin emas" };
  }
  return { valid: true };
}

export function calculateFinalTotal(subtotal: number, discountAmount: number): number {
  return Math.max(0, subtotal - discountAmount);
}

export function createCalculationItem(
  id: string,
  productName: string,
  quantity: number,
  unit: string,
  unitPrice: number
): CalculationItem {
  return {
    id,
    productName,
    quantity,
    unit,
    unitPrice,
    total: calculateItemTotal(quantity, unitPrice),
  };
}
