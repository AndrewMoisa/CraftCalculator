import React from 'react';
import { getAllWeapons } from '../data/Weapons';

function BulletSelector({ selectedBullet, onBulletChange }) {
  const allItems = getAllWeapons();
  // Filter only ammunition items
  const bullets = allItems.filter(item => item.ammunition && !item.crafting);

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-2xl mb-8">
      <label className="block text-xs font-bold uppercase text-slate-500 mb-3">
        Selectează Tipul de Muniție
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {bullets.map((bullet) => (
          <button
            key={bullet.id}
            onClick={() => onBulletChange(bullet.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedBullet === bullet.id
                ? 'border-orange-500 bg-orange-500/20'
                : 'border-slate-600 bg-slate-900 hover:border-slate-500'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{bullet.id}</div>
              <div className="text-xs text-slate-400 mt-1">{bullet.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default BulletSelector;
