import { useState } from 'react';
import { Delete, RotateCcw } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';

export default function CalculatorPage() {
  const { language } = useStore();
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetNext, setResetNext] = useState(false);

  const handleNumber = (num: string) => {
    if (resetNext) {
      setDisplay(num);
      setResetNext(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (resetNext) {
      setDisplay('0.');
      setResetNext(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    if (prevValue !== null && operation && !resetNext) {
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(result);
    } else {
      setPrevValue(current);
    }
    setOperation(op);
    setResetNext(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (prevValue === null || !operation) return;
    const current = parseFloat(display);
    const result = calculate(prevValue, current, operation);
    setDisplay(String(parseFloat(result.toFixed(10))));
    setPrevValue(null);
    setOperation(null);
    setResetNext(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setResetNext(false);
  };

  const handleDelete = () => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const buttons = [
    { label: 'C', action: handleClear, className: 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white' },
    { label: '⌫', action: handleDelete, className: 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white' },
    { label: '%', action: () => { setDisplay(String(parseFloat(display) / 100)); setResetNext(true); }, className: 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white' },
    { label: '÷', action: () => handleOperation('÷'), className: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' },
    { label: '7', action: () => handleNumber('7'), className: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' },
    { label: '8', action: () => handleNumber('8'), className: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' },
    { label: '9', action: () => handleNumber('9'), className: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' },
    { label: '×', action: () => handleOperation('×'), className: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' },
    { label: '4', action: () => handleNumber('4'), className: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' },
    { label: '5', action: () => handleNumber('5'), className: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' },
    { label: '6', action: () => handleNumber('6'), className: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' },
    { label: '-', action: () => handleOperation('-'), className: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' },
    { label: '1', action: () => handleNumber('1'), className: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' },
    { label: '2', action: () => handleNumber('2'), className: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' },
    { label: '3', action: () => handleNumber('3'), className: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' },
    { label: '+', action: () => handleOperation('+'), className: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' },
    { label: '0', action: () => handleNumber('0'), className: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white col-span-2' },
    { label: '.', action: handleDecimal, className: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' },
    { label: '=', action: handleEquals, className: 'bg-blue-600 text-white' },
  ];

  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('calculator', language)}</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Display */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
          <div className="text-right">
            {prevValue !== null && operation && (
              <p className="text-xs text-gray-400">{prevValue} {operation}</p>
            )}
            <p className="text-3xl font-bold text-gray-900 dark:text-white truncate">{display}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-1 p-2">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.action}
              className={`${btn.className} ${btn.label === '0' ? 'col-span-2' : ''} h-14 rounded-lg text-lg font-medium transition-colors active:opacity-70`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
