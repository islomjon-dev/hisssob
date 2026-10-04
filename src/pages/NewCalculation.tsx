import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, Package } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';
import { formatCurrency, generateId } from '../utils/format';
import { calculateItemTotal, calculateSubtotal, validateDiscount, calculateFinalTotal } from '../utils/calculations';
import { CalculationItem } from '../types';

export default function NewCalculation() {
  const { products, addCalculation, language, showToast } = useStore();
  const navigate = useNavigate();
  const [items, setItems] = useState<CalculationItem[]>([]);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showProductPicker, setShowProductPicker] = useState(false);

  // New item form
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState<string>('1');
  const [unit, setUnit] = useState('dona');
  const [unitPrice, setUnitPrice] = useState<string>('');

  const subtotal = calculateSubtotal(items);
  const discountValidation = validateDiscount(discountAmount, subtotal);
  const finalTotal = calculateFinalTotal(subtotal, discountAmount);

  const addItem = useCallback(() => {
    const qty = parseFloat(quantity);
    const price = parseFloat(unitPrice);

    if (!productName.trim()) {
      showToast("Mahsulot nomini kiriting", 'error');
      return;
    }
    if (isNaN(qty) || qty <= 0) {
      showToast("Miqdor 0 dan katta bo'lishi kerak", 'error');
      return;
    }
    if (isNaN(price) || price < 0) {
      showToast("Narx manfiy bo'lishi mumkin emas", 'error');
      return;
    }

    const newItem: CalculationItem = {
      id: generateId(),
      productName: productName.trim(),
      quantity: qty,
      unit,
      unitPrice: price,
      total: calculateItemTotal(qty, price),
    };

    setItems(prev => [...prev, newItem]);
    setProductName('');
    setQuantity('1');
    setUnitPrice('');
    setUnit('dona');
  }, [productName, quantity, unit, unitPrice, showToast]);

  const addFromProduct = useCallback((product: { name: string; price: number; unit: string }) => {
    const newItem: CalculationItem = {
      id: generateId(),
      productName: product.name,
      quantity: 1,
      unit: product.unit,
      unitPrice: product.price,
      total: calculateItemTotal(1, product.price),
    };
    setItems(prev => [...prev, newItem]);
    setShowProductPicker(false);
  }, []);

  const updateItem = (id: string, field: string, value: string | number) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: value };
      if (field === 'quantity' || field === 'unitPrice') {
        updated.total = calculateItemTotal(
          field === 'quantity' ? Number(value) : item.quantity,
          field === 'unitPrice' ? Number(value) : item.unitPrice
        );
      }
      return updated;
    }));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSave = async () => {
    if (items.length === 0) {
      showToast("Kamida bitta mahsulot qo'shing", 'error');
      return;
    }
    if (!discountValidation.valid) {
      showToast(discountValidation.error || "Xatolik", 'error');
      return;
    }

    setIsSaving(true);
    // Small delay to prevent double-click
    await new Promise(resolve => setTimeout(resolve, 300));
    const result = addCalculation(items, discountAmount, notes || undefined);
    setIsSaving(false);

    if (result.success) {
      navigate('/history');
    } else {
      showToast(result.error || "Xatolik", 'error');
    }
  };

  const clearAll = () => {
    setItems([]);
    setDiscountAmount(0);
    setNotes('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('newCalculation', language)}</h1>
        {items.length > 0 && (
          <button onClick={clearAll} className="text-sm text-red-500 hover:text-red-600 font-medium">
            Tozalash
          </button>
        )}
      </div>

      {/* Items List */}
      {items.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {items.map((item) => (
              <div key={item.id} className="p-3 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={item.productName}
                      onChange={e => updateItem(item.id, 'productName', e.target.value)}
                      className="w-full text-sm font-medium text-gray-900 dark:text-white bg-transparent border-0 p-0 focus:ring-0 focus:outline-none"
                    />
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        <label className="text-xs text-gray-500">{t('quantity', language)}:</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={e => updateItem(item.id, 'quantity', e.target.value)}
                          className="w-16 text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          min="0.01"
                          step="any"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <label className="text-xs text-gray-500">{t('price', language)}:</label>
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={e => updateItem(item.id, 'unitPrice', e.target.value)}
                          className="w-24 text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          min="0"
                          step="any"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(item.total)}</span>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Item Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t('addItem', language)}</h3>
        <div className="space-y-3">
          <input
            type="text"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            placeholder={t('productName', language)}
            className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">{t('quantity', language)}</label>
              <input
                type="number"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                min="0.01"
                step="any"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">{t('unit', language)}</label>
              <select
                value={unit}
                onChange={e => setUnit(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="dona">dona</option>
                <option value="kg">kg</option>
                <option value="litr">litr</option>
                <option value="quti">quti</option>
                <option value="dona">metr</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">{t('price', language)}</label>
              <input
                type="number"
                value={unitPrice}
                onChange={e => setUnitPrice(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                min="0"
                step="any"
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addItem} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
              <Plus size={16} /> {t('addItem', language)}
            </button>
            {products.length > 0 && (
              <button onClick={() => setShowProductPicker(true)} className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Package size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Picker Modal */}
      {showProductPicker && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4" onClick={() => setShowProductPicker(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md max-h-[70vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">{t('products', language)}</h3>
            </div>
            <div className="overflow-y-auto max-h-[50vh] divide-y divide-gray-100 dark:divide-gray-700">
              {products.map(product => (
                <button key={product.id} onClick={() => addFromProduct(product)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-left">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</span>
                  <span className="text-sm text-gray-500">{formatCurrency(product.price)}/{product.unit}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {items.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('subtotal', language)}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex justify-between items-center gap-3">
            <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{t('discountLabel', language)}</label>
            <input
              type="number"
              value={discountAmount || ''}
              onChange={e => {
                const val = parseFloat(e.target.value) || 0;
                setDiscountAmount(Math.max(0, val));
              }}
              className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm text-right"
              min="0"
              max={subtotal}
              step="any"
              placeholder="0"
            />
          </div>
          {!discountValidation.valid && (
            <p className="text-xs text-red-500">{discountValidation.error}</p>
          )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900 dark:text-white">{t('finalTotal', language)}</span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(finalTotal)}</span>
          </div>

          {/* Notes */}
          <div>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={t('notes', language)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving || !discountValidation.valid}
            className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors text-sm"
          >
            <Save size={18} />
            {isSaving ? t('saving', language) : t('save', language)}
          </button>
        </div>
      )}
    </div>
  );
}
