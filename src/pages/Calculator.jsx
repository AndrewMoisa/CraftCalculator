import React, { useState } from 'react';
import ResourceRow from '../components/ResourceRow';
import WeaponSelector from '../components/WeaponSelector';
import { useWeaponCalculator } from '../hooks/useWeaponCalculator';

function Calculator() {
  const [quantity, setQuantity] = useState(1);
  const [selectedWeapon, setSelectedWeapon] = useState('TEC');

  const calculation = useWeaponCalculator(selectedWeapon, quantity);

  if (!calculation) return null;

  const { 
    weapon, 
    rawMaterials, 
    intermediates, 
    totalWeaponParts, 
    usedWeaponParts, 
    surplusWeaponParts,
    totalCrafts 
  } = calculation;

  return (
    <div className="min-h-screen p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-yellow-200 uppercase tracking-tighter">
            Gun Calculator Crafting
          </h1>
          <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest">
            Sistem Management Resurse v1.0
          </p>
        </header>

        <WeaponSelector 
          selectedWeapon={selectedWeapon} 
          onWeaponChange={setSelectedWeapon} 
        />

        <div className='flex items-center justify-center m-4 gap-4'>
          <img className="w-60 object-contain" src={weapon.icon} alt={weapon.name} />
          <div className='flex flex-col'>
            <span className='text-white text-xl font-bold uppercase'>{weapon.name}</span>
            <div className='text-slate-500 text-xs mt-2 space-y-1'>
              {Object.entries(weapon.recipe).map(([key, value]) => (
                <div key={key}>
                  {value}x {key.replace(/([A-Z])/g, ' $1').trim()} -TOTAL NECESARE
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center m-4 gap-4'>
          <span className='text-slate-400 text-sm italic'> {weapon.craftDescription.description}</span>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-2xl mb-8">
          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
            Cantitate Arme ({weapon.id})
          </label>
          <input 
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full bg-slate-900 border border-slate-600 p-4 rounded-xl text-3xl font-mono focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="bg-slate-700/50 p-4 border-b border-slate-600">
              <h2 className="font-bold flex items-center gap-2">
                <span className="text-orange-400 text-xl font-black">💎</span> MATERII PRIME
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {rawMaterials.ironOre && (
                <ResourceRow label="Minereu Fier" value={rawMaterials.ironOre} color="bg-orange-500" />
              )}
              {rawMaterials.coalOre && (
                <ResourceRow label="Minereu Cărbune" value={rawMaterials.coalOre} color="bg-zinc-600" />
              )}
              {rawMaterials.aluOre && (
                <ResourceRow label="Minereu Aluminiu" value={rawMaterials.aluOre} color="bg-blue-300" />
              )}
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="bg-slate-700/50 p-4 border-b border-slate-600">
              <h2 className="font-bold flex items-center gap-2">
                <span className="text-blue-400 text-xl font-black">🔥</span> TOPIRE
              </h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-slate-900 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Oțel Necesar</span>
                  <span className="text-xl font-bold text-orange-300">{intermediates.steel}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {rawMaterials.ironOre} Fier + {rawMaterials.coalOre} Cărbune
                </div>
                <div className="text-xs text-slate-600">
                  (4 Fier + 4 Cărbune = 1 Oțel)
                </div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Arc (Aluminiu)</span>
                  <span className="text-xl font-bold text-blue-300">{intermediates.spring}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {rawMaterials.aluOre} Minereu Aluminiu
                </div>
                <div className="text-xs text-slate-600">
                  (4 Minereuri = 1 Arc)
                </div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Plastic</span>
                  <span className="text-xl font-bold text-blue-300">{rawMaterials.plastic}</span>
                </div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Piese Metal</span>
                  <span className="text-xl font-bold text-blue-300">{rawMaterials.metalParts}</span>
                </div>
              </div>
              {rawMaterials.goldIngot > 0 && (
                <div className="bg-slate-900 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Lingou Aur</span>
                    <span className="text-xl font-bold text-yellow-400">{rawMaterials.goldIngot}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
          <div className="bg-slate-700/50 p-4 border-b border-slate-600">
            <h2 className="font-bold flex items-center gap-2">
              <span className="text-yellow-400 text-xl font-black">⚙️</span> PROCESARE FINALĂ
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center space-y-4">
              <div>
                <div className="text-3xl font-mono font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-yellow-300">
                  {totalWeaponParts}
                </div>
                <div className="text-xs text-slate-400 uppercase mt-2">Piese Armă Obținute</div>
              </div>
              <div className="h-px bg-slate-700 w-1/2 mx-auto"></div>
              <div className="text-xs text-slate-600 mt-2">
                ({totalCrafts} craft-uri × 2 piese = {totalWeaponParts} piese)
              </div>
              {surplusWeaponParts > 0 && (
                <div className="text-xs text-amber-600">
                  (Folosite: {usedWeaponParts} piese | Surplus: {surplusWeaponParts} piese)
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="text-6xl font-bold text-green-400">{quantity}</div>
                <div className="text-xs text-slate-400 uppercase">Arma {weapon.id} Creata</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;