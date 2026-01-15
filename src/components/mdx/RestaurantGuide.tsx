'use client';

import { motion } from 'framer-motion';

interface Restaurant {
  name: string;
  city: string;
  cuisine: string;
  price: string;
  michelin?: number;
}

interface RestaurantGuideProps {
  title?: string;
  country?: string;
  flag?: string;
  restaurants: Restaurant[];
  signatureDishes?: string[];
  michelinTotal?: number;
  avgCasual?: number;
  avgFine?: number;
  currency?: string;
}

export function RestaurantGuide({
  title,
  country,
  flag,
  restaurants,
  signatureDishes,
  michelinTotal,
  avgCasual,
  avgFine,
  currency = '€',
}: RestaurantGuideProps) {
  const getPriceColor = (price: string) => {
    const count = (price.match(/€/g) || []).length;
    if (count >= 4) return 'text-purple-400';
    if (count >= 3) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getMichelinStars = (count: number) => {
    return '⭐'.repeat(count);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500/20 to-orange-500/20 px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {flag && <span className="text-2xl">{flag}</span>}
            <div>
              <h3 className="text-lg font-semibold text-white">
                {title || `${country} Dining Guide`}
              </h3>
              <p className="text-sm text-white/60">Best restaurants & cuisine</p>
            </div>
          </div>
          {michelinTotal !== undefined && michelinTotal > 0 && (
            <div className="flex items-center gap-2 bg-amber-500/20 px-3 py-1.5 rounded-full">
              <span className="text-amber-400">⭐</span>
              <span className="text-sm font-medium text-amber-400">{michelinTotal} Michelin Stars</span>
            </div>
          )}
        </div>
      </div>

      {/* Price Stats */}
      {(avgCasual || avgFine) && (
        <div className="grid grid-cols-2 border-b border-white/10">
          {avgCasual && (
            <div className="p-4 text-center border-r border-white/10">
              <div className="text-sm text-white/60 mb-1">Casual Dining</div>
              <div className="text-xl font-bold text-emerald-400">{currency}{avgCasual}</div>
              <div className="text-xs text-white/40">avg per person</div>
            </div>
          )}
          {avgFine && (
            <div className="p-4 text-center">
              <div className="text-sm text-white/60 mb-1">Fine Dining</div>
              <div className="text-xl font-bold text-amber-400">{currency}{avgFine}</div>
              <div className="text-xs text-white/40">avg per person</div>
            </div>
          )}
        </div>
      )}

      {/* Signature Dishes */}
      {signatureDishes && signatureDishes.length > 0 && (
        <div className="p-4 border-b border-white/10">
          <h4 className="text-xs font-medium text-white/50 mb-3">SIGNATURE DISHES</h4>
          <div className="flex flex-wrap gap-2">
            {signatureDishes.map((dish, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-orange-500/20 text-orange-400 text-sm rounded-full"
              >
                🍽️ {dish}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Restaurant List */}
      <div className="p-4">
        <h4 className="text-xs font-medium text-white/50 mb-3">TOP RESTAURANTS</h4>
        <div className="space-y-3">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-semibold text-white">{restaurant.name}</h5>
                    {restaurant.michelin && (
                      <span className="text-sm">{getMichelinStars(restaurant.michelin)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-white/50">{restaurant.city}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-xs text-white/50">{restaurant.cuisine}</span>
                  </div>
                </div>
                <span className={`text-sm font-medium ${getPriceColor(restaurant.price)}`}>
                  {restaurant.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
