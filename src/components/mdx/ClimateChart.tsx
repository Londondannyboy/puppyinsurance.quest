'use client';

import { motion } from 'framer-motion';

interface ClimateChartProps {
  type: string;
  annualSunshineHours?: number;
  seasons?: Record<string, {
    months: string[];
    temp_avg_c: number;
    temp_min_c?: number;
    description: string;
  }>;
  bestMonths?: string[];
  rating?: number;
  humidity?: number;
}

export function ClimateChart({
  type,
  annualSunshineHours,
  seasons,
  bestMonths,
  rating,
  humidity,
}: ClimateChartProps) {
  const maxTemp = seasons ? Math.max(...Object.values(seasons).map(s => s.temp_avg_c)) : 35;

  // Weather icons based on season
  const getSeasonIcon = (name: string) => {
    if (name.includes('summer') || name.includes('hot')) return '☀️';
    if (name.includes('winter') || name.includes('cool')) return '❄️';
    if (name.includes('rainy')) return '🌧️';
    if (name.includes('spring')) return '🌸';
    if (name.includes('autumn') || name.includes('fall')) return '🍂';
    return '🌤️';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌡️</span>
            <div>
              <h3 className="text-lg font-semibold text-white">Climate Overview</h3>
              <p className="text-sm text-white/60">{type} Climate</p>
            </div>
          </div>
          {rating && (
            <div className="flex items-center gap-2">
              <span className="text-2xl">☀️</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-amber-400">{rating}</div>
                <div className="text-xs text-white/50">Climate Rating</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 border-b border-white/10">
        {annualSunshineHours && (
          <div className="p-4 text-center border-r border-white/10">
            <div className="text-2xl mb-1">☀️</div>
            <div className="text-xl font-bold text-white">{annualSunshineHours.toLocaleString()}</div>
            <div className="text-xs text-white/50">Sunshine hours/year</div>
          </div>
        )}
        {humidity && (
          <div className="p-4 text-center border-r border-white/10">
            <div className="text-2xl mb-1">💧</div>
            <div className="text-xl font-bold text-white">{humidity}%</div>
            <div className="text-xs text-white/50">Avg humidity</div>
          </div>
        )}
        {bestMonths && (
          <div className="p-4 text-center">
            <div className="text-2xl mb-1">✨</div>
            <div className="text-sm font-bold text-white">{bestMonths.slice(0, 2).join(', ')}</div>
            <div className="text-xs text-white/50">Best months</div>
          </div>
        )}
      </div>

      {/* Seasons */}
      {seasons && (
        <div className="p-6">
          <h4 className="text-sm font-medium text-white/50 mb-4">SEASONAL BREAKDOWN</h4>
          <div className="space-y-4">
            {Object.entries(seasons).map(([name, data], index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getSeasonIcon(name)}</span>
                    <div>
                      <span className="font-medium text-white capitalize">{name.replace('_', ' ')}</span>
                      <div className="text-xs text-white/50">{data.months.join(', ')}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">{data.temp_avg_c}°C</div>
                    {data.temp_min_c && (
                      <div className="text-xs text-white/50">Low: {data.temp_min_c}°C</div>
                    )}
                  </div>
                </div>

                {/* Temperature bar */}
                <div className="mt-2">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.temp_avg_c / maxTemp) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className={`h-full rounded-full ${
                        data.temp_avg_c > 30 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                        data.temp_avg_c > 20 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        data.temp_avg_c > 10 ? 'bg-gradient-to-r from-blue-400 to-yellow-500' :
                        'bg-gradient-to-r from-blue-500 to-blue-400'
                      }`}
                    />
                  </div>
                </div>

                <p className="text-xs text-white/60 mt-2">{data.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Best Months Highlight */}
      {bestMonths && bestMonths.length > 0 && (
        <div className="px-6 py-4 bg-emerald-500/10 border-t border-emerald-500/20">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✨</span>
            <span className="text-sm text-white/80">Best time to visit: </span>
            <span className="text-sm font-medium text-emerald-400">{bestMonths.join(', ')}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
