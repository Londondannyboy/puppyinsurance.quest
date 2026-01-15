'use client';

import { motion } from 'framer-motion';

interface ProsConsProps {
  title?: string;
  pros: string[];
  cons: string[];
  country?: string;
  flag?: string;
}

export function ProsCons({ title, pros, cons, country, flag }: ProsConsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
    >
      {/* Header */}
      {(title || country) && (
        <div className="bg-white/5 px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {flag && <span className="text-2xl">{flag}</span>}
            <h3 className="text-lg font-semibold text-white">
              {title || `${country} - Pros & Cons`}
            </h3>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2">
        {/* Pros */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="font-semibold text-emerald-400">Pros</h4>
          </div>
          <ul className="space-y-3">
            {pros.map((pro, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3"
              >
                <span className="text-emerald-400 mt-1">+</span>
                <span className="text-sm text-white/80">{pro}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h4 className="font-semibold text-rose-400">Cons</h4>
          </div>
          <ul className="space-y-3">
            {cons.map((con, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                className="flex items-start gap-3"
              >
                <span className="text-rose-400 mt-1">-</span>
                <span className="text-sm text-white/80">{con}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
