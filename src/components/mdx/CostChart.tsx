'use client';

import { motion } from 'framer-motion';

interface CostItem {
  label: string;
  amount: number;
  currency?: string;
  color?: string;
}

interface CostChartProps {
  title?: string;
  items: CostItem[];
  total?: number;
  currency?: string;
  showPercentage?: boolean;
}

export function CostChart({ title, items, total, currency = '€', showPercentage = true }: CostChartProps) {
  const calculatedTotal = total || items.reduce((sum, item) => sum + item.amount, 0);
  const maxAmount = Math.max(...items.map(i => i.amount));

  const colors = [
    'bg-amber-500',
    'bg-emerald-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-rose-500',
    'bg-cyan-500',
    'bg-orange-500',
    'bg-pink-500',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-2xl border border-white/10 p-6"
    >
      {title && (
        <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      )}

      <div className="space-y-4">
        {items.map((item, index) => {
          const percentage = (item.amount / calculatedTotal) * 100;
          const widthPercentage = (item.amount / maxAmount) * 100;
          const color = item.color || colors[index % colors.length];

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">
                    {currency}{item.amount.toLocaleString()}
                  </span>
                  {showPercentage && (
                    <span className="text-xs text-white/50">
                      ({percentage.toFixed(1)}%)
                    </span>
                  )}
                </div>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                  className={`h-full ${color} rounded-full`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Total */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: items.length * 0.1 + 0.2 }}
        className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center"
      >
        <span className="text-white/60 font-medium">Monthly Total</span>
        <span className="text-2xl font-bold text-white">
          {currency}{calculatedTotal.toLocaleString()}
        </span>
      </motion.div>
    </motion.div>
  );
}
