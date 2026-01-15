'use client';

import { motion } from 'framer-motion';

interface QualityMetric {
  label: string;
  value: number;
  maxValue?: number;
  icon?: string;
}

interface QualityOfLifeRadarProps {
  title?: string;
  country?: string;
  flag?: string;
  metrics: QualityMetric[];
  overallScore?: number;
}

export function QualityOfLifeRadar({
  title,
  country,
  flag,
  metrics,
  overallScore,
}: QualityOfLifeRadarProps) {
  const getColorClass = (value: number, max: number = 100) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return { bar: 'bg-emerald-500', text: 'text-emerald-400' };
    if (percentage >= 60) return { bar: 'bg-amber-500', text: 'text-amber-400' };
    if (percentage >= 40) return { bar: 'bg-orange-500', text: 'text-orange-400' };
    return { bar: 'bg-rose-500', text: 'text-rose-400' };
  };

  const getRating = (value: number, max: number = 100) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Fair';
    return 'Challenging';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {flag && <span className="text-2xl">{flag}</span>}
            <div>
              <h3 className="text-lg font-semibold text-white">
                {title || 'Quality of Life'}
              </h3>
              {country && <p className="text-sm text-white/60">{country}</p>}
            </div>
          </div>
          {overallScore && (
            <div className="text-center">
              <div className={`text-3xl font-bold ${getColorClass(overallScore, 10).text}`}>
                {overallScore.toFixed(1)}
              </div>
              <div className="text-xs text-white/50">Overall Score</div>
            </div>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="p-6 space-y-4">
        {metrics.map((metric, index) => {
          const max = metric.maxValue || 100;
          const colors = getColorClass(metric.value, max);
          const percentage = (metric.value / max) * 100;

          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {metric.icon && <span>{metric.icon}</span>}
                  <span className="text-sm text-white/80">{metric.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${colors.text}`}>
                    {metric.value.toFixed(1)}
                  </span>
                  <span className="text-xs text-white/40">
                    / {max}
                  </span>
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className={`h-full rounded-full ${colors.bar}`}
                />
              </div>
              <div className="text-right mt-1">
                <span className={`text-xs ${colors.text}`}>{getRating(metric.value, max)}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="px-6 py-3 bg-white/5 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-white/60">80+ Excellent</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-white/60">60-79 Good</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-white/60">40-59 Fair</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-white/60">&lt;40 Challenging</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
