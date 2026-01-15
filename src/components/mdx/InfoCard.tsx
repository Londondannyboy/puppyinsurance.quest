'use client';

import { motion } from 'framer-motion';

interface InfoCardProps {
  title: string;
  content: string | React.ReactNode;
  icon?: string;
  variant?: 'default' | 'highlight' | 'warning' | 'success' | 'info';
  items?: Array<{ label: string; value: string }>;
}

export function InfoCard({ title, content, icon, variant = 'default', items }: InfoCardProps) {
  const variantStyles = {
    default: {
      container: 'bg-white/5 border-white/10',
      icon: 'bg-white/10 text-white',
      title: 'text-white',
    },
    highlight: {
      container: 'bg-amber-500/10 border-amber-500/30',
      icon: 'bg-amber-500/20 text-amber-400',
      title: 'text-amber-400',
    },
    warning: {
      container: 'bg-rose-500/10 border-rose-500/30',
      icon: 'bg-rose-500/20 text-rose-400',
      title: 'text-rose-400',
    },
    success: {
      container: 'bg-emerald-500/10 border-emerald-500/30',
      icon: 'bg-emerald-500/20 text-emerald-400',
      title: 'text-emerald-400',
    },
    info: {
      container: 'bg-blue-500/10 border-blue-500/30',
      icon: 'bg-blue-500/20 text-blue-400',
      title: 'text-blue-400',
    },
  };

  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-6 ${styles.container}`}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${styles.icon}`}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h4 className={`font-semibold mb-2 ${styles.title}`}>{title}</h4>
          {typeof content === 'string' ? (
            <p className="text-sm text-white/70">{content}</p>
          ) : (
            content
          )}

          {items && items.length > 0 && (
            <div className="mt-4 space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-white/60">{item.label}</span>
                  <span className="text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
