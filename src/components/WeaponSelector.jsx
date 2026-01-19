import React from 'react';
import { getAllWeapons } from '../data/Weapons';

function WeaponSelector({ selectedWeapon, onWeaponChange }) {
  const allItems = getAllWeapons();
  // Filter only weapons (items with crafting property)
  const weapons = allItems.filter(item => item.crafting);

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-2xl mb-8">
      <label className="block text-xs font-bold uppercase text-slate-500 mb-3">
        Selectează Arma
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {weapons.map((weapon) => (
          <button
            key={weapon.id}
            onClick={() => onWeaponChange(weapon.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedWeapon === weapon.id
                ? 'border-orange-500 bg-orange-500/20'
                : 'border-slate-600 bg-slate-900 hover:border-slate-500'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{weapon.id}</div>
              <div className="text-xs text-slate-400 mt-1">{weapon.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default WeaponSelector;