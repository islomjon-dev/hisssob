import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Printer, Share2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';
import { formatCurrency, formatDate, formatTime } from '../utils/format';

export default function CalculationDetail() {
  const { id } = useParams<{ id: string }>();
  const { calculations, deleteCalculation, language, showToast } = useStore();
  const navigate = useNavigate();

  const calc = calculations.find(c => c.id === id);

  if (!calc) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Hisob-kitob topilmadi</p>
        <button onClick={() => navigate('/history')} className="mt-3 text-blue-600 text-sm hover:underline">
          Tarixga qaytish
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(t('deleteConfirm', language))) {
      deleteCalculation(calc.id);
      navigate('/history');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const text = formatReceiptText();
    if (navigator.share) {
      try {
        await navigator.share({ title: 'HISSOB - Chek', text });
      } catch {
        copyToClipboard(text);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast("Nusxalandi", 'success');
    }).catch(() => {
      showToast("Nusxalab bo'lmadi", 'error');
    });
  };

  const formatReceiptText = () => {
    let text = "═══════════════════════\n";
    text += "        HISSOB\n";
    text += "═══════════════════════\n";
    text += `${t('date', language)}: ${formatDate(calc.createdAt)}\n`;
    text += `${t('time', language)}: ${formatTime(calc.createdAt)}\n`;
    text += `${t('receiptId', language)}: ${calc.id}\n`;
    text += "───────────────────────\n";
    calc.items.forEach(item => {
      text += `${item.productName}\n`;
      text += `  ${item.quantity} ${item.unit} × ${formatCurrency(item.unitPrice)} = ${formatCurrency(item.total)}\n`;
    });
    text += "───────────────────────\n";
    text += `${t('subtotal', language)}: ${formatCurrency(calc.subtotal)}\n`;
    if (calc.discountAmount > 0) {
      text += `${t('discount', language)}: -${formatCurrency(calc.discountAmount)}\n`;
    }
    text += `${t('finalTotal', language)}: ${formatCurrency(calc.finalTotal)}\n`;
    text += "═══════════════════════\n";
    return text;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/history')} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft size={20} />
          <span className="text-sm">{t('history', language)}</span>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={handleShare} className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" title={t('share', language)}>
            <Share2 size={18} />
          </button>
          <button onClick={handlePrint} className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" title={t('print', language)}>
            <Printer size={18} />
          </button>
          <button onClick={handleDelete} className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" title={t('delete', language)}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Receipt */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden print:border-0 print:shadow-none" id="receipt">
        {/* Receipt Header */}
        <div className="text-center p-6 border-b border-gray-200 dark:border-gray-700 print:border-gray-300">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">HISSOB</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('receipt', language)}</p>
        </div>

        {/* Info */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700 print:bg-white">
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
            <div>{t('date', language)}: <span className="font-medium text-gray-900 dark:text-white">{formatDate(calc.createdAt)}</span></div>
            <div>{t('time', language)}: <span className="font-medium text-gray-900 dark:text-white">{formatTime(calc.createdAt)}</span></div>
            <div className="col-span-2">{t('receiptId', language)}: <span className="font-medium text-gray-900 dark:text-white">{calc.id}</span></div>
          </div>
        </div>

        {/* Items */}
        <div className="p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 print:border-gray-300">
                <th className="text-left py-2 font-medium text-gray-500 dark:text-gray-400 text-xs">{t('productName', language)}</th>
                <th className="text-center py-2 font-medium text-gray-500 dark:text-gray-400 text-xs">{t('quantity', language)}</th>
                <th className="text-right py-2 font-medium text-gray-500 dark:text-gray-400 text-xs">{t('price', language)}</th>
                <th className="text-right py-2 font-medium text-gray-500 dark:text-gray-400 text-xs">{t('total', language)}</th>
              </tr>
            </thead>
            <tbody>
              {calc.items.map(item => (
                <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700 print:border-gray-200">
                  <td className="py-2 text-gray-900 dark:text-white">{item.productName}</td>
                  <td className="py-2 text-center text-gray-600 dark:text-gray-400">{item.quantity} {item.unit}</td>
                  <td className="py-2 text-right text-gray-600 dark:text-gray-400">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-2 text-right font-medium text-gray-900 dark:text-white">{formatCurrency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="px-4 pb-4 space-y-2">
          <div className="border-t border-gray-200 dark:border-gray-700 print:border-gray-300 pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t('subtotal', language)}</span>
              <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(calc.subtotal)}</span>
            </div>
            {calc.discountAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-orange-600 dark:text-orange-400">{t('discount', language)}</span>
                <span className="font-medium text-orange-600 dark:text-orange-400">-{formatCurrency(calc.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 print:border-gray-300 pt-3">
              <span className="text-gray-900 dark:text-white">{t('finalTotal', language)}</span>
              <span className="text-blue-600 dark:text-blue-400">{formatCurrency(calc.finalTotal)}</span>
            </div>
          </div>
        </div>

        {calc.notes && (
          <div className="px-4 pb-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('notes', language)}: {calc.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
