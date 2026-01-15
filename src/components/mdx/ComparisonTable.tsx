'use client';

import { motion } from 'framer-motion';

interface ComparisonItem {
  label: string;
  values: [string | number, string | number];
  highlight?: boolean;
  better?: 0 | 1; // Which country is better (0 or 1)
}

interface ComparisonTableProps {
  countries: [string, string];
  flags?: [string, string];
  items: ComparisonItem[];
  title?: string;
}

export function ComparisonTable({ countries, flags, items, title }: ComparisonTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
    >
      {title && (
        <div className="bg-white/5 px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      )}

      {/* Header */}
      <div className="grid grid-cols-3 bg-white/5">
        <div className="p-4 text-white/60 text-sm font-medium">Metric</div>
        <div className="p-4 text-center border-l border-white/10">
          <div className="flex items-center justify-center gap-2">
            {flags?.[0] && <span className="text-2xl">{flags[0]}</span>}
            <span className="font-semibold text-white">{countries[0]}</span>
          </div>
        </div>
        <div className="p-4 text-center border-l border-white/10">
          <div className="flex items-center justify-center gap-2">
            {flags?.[1] && <span className="text-2xl">{flags[1]}</span>}
            <span className="font-semibold text-white">{countries[1]}</span>
          </div>
        </div>
      </div>

      {/* Rows */}
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`grid grid-cols-3 border-t border-white/10 ${
            item.highlight ? 'bg-amber-500/10' : ''
          }`}
        >
          <div className="p-4 flex items-center">
            <span className={`text-sm ${item.highlight ? 'text-amber-400 font-medium' : 'text-white/80'}`}>
              {item.label}
            </span>
          </div>
          <div className={`p-4 text-center border-l border-white/10 ${
            item.better === 0 ? 'bg-emerald-500/10' : ''
          }`}>
            <span className={`text-sm ${
              item.better === 0 ? 'text-emerald-400 font-semibold' : 'text-white'
            }`}>
              {item.values[0]}
            </span>
          </div>
          <div className={`p-4 text-center border-l border-white/10 ${
            item.better === 1 ? 'bg-emerald-500/10' : ''
          }`}>
            <span className={`text-sm ${
              item.better === 1 ? 'text-emerald-400 font-semibold' : 'text-white'
            }`}>
              {item.values[1]}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
