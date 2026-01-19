import React, { useState } from 'react';
import ResourceRow from '../components/ResourceRow';
import BulletSelector from '../components/BulletSelector';
import { useWeaponCalculator } from '../hooks/useWeaponCalculator';

function BulletsCalculator() {
  const [quantity, setQuantity] = useState(30);
  const [selectedBullet, setSelectedBullet] = useState('AMO9MM');

  const calculation = useWeaponCalculator(selectedBullet, quantity);

  if (!calculation) return null;

  const { 
    weapon, 
    rawMaterials, 
    intermediates, 
    totalCrafts,
    totalBullets
  } = calculation;

  return (
    <div className="min-h-screen p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-yellow-200 uppercase tracking-tighter">
            Bullets Calculator
          </h1>
          <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest">
            Sistem Management Muniție v1.0
          </p>
        </header>

        <BulletSelector 
          selectedBullet={selectedBullet} 
          onBulletChange={setSelectedBullet} 
        />

        <div className='flex items-center justify-center m-4 gap-4'>
          <img className="w-60 object-contain" src={weapon.icon} alt={weapon.name} />
          <div className='flex flex-col'>
            <span className='text-white text-xl font-bold uppercase'>{weapon.name}</span>
            <div className='text-slate-500 text-xs mt-2 space-y-1'>
              <div>30x Gloanțe per Craft</div>
              <div className="text-amber-400">📍 {weapon.ammunition.bullets.location}</div>
            </div>
          </div>
        </div>
        
        <div className='flex items-center justify-center m-4 gap-4'>
          <span className='text-slate-400 text-sm italic'>{weapon.craftDescription.description}</span>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-2xl mb-8">
          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
            Cantitate Gloanțe Dorite
          </label>
          <input 
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full bg-slate-900 border border-slate-600 p-4 rounded-xl text-3xl font-mono focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            step="30"
          />
          <p className="text-xs text-slate-400 mt-2">
            💡 Tip: Gloanțele se fabrică în batch-uri de 30. Poți scrie orice număr manual sau folosi săgețile pentru incrementare cu 30.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="bg-slate-700/50 p-4 border-b border-slate-600">
              <h2 className="font-bold flex items-center gap-2">
                <span className="text-orange-400 text-xl font-black">💎</span> MATERII PRIME
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {rawMaterials.copperOre && (
                <ResourceRow label="Minereu Cupru" value={rawMaterials.copperOre} color="bg-amber-600" />
              )}
              {rawMaterials.lead && (
                <ResourceRow label="Plumb" value={rawMaterials.lead} color="bg-gray-500" />
              )}
              {rawMaterials.gunpowder && (
                <ResourceRow label="Praf de Pușcă" value={rawMaterials.gunpowder} color="bg-yellow-600" />
              )}
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="bg-slate-700/50 p-4 border-b border-slate-600">
              <h2 className="font-bold flex items-center gap-2">
                <span className="text-blue-400 text-xl font-black">🔥</span> PROCESARE
              </h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-slate-900 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Casing-uri Necesare</span>
                  <span className="text-xl font-bold text-amber-300">{intermediates.casing}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {rawMaterials.copperOre} Cupru
                </div>
                <div className="text-xs text-slate-600">
                  (2 Cupru = 30 Casing-uri)
                </div>
                <div className="text-xs text-amber-400 mt-1">
                  📍 {weapon.ammunition.casing.location}
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-blue-500/30">
                <div className="text-xs text-blue-400 font-bold mb-2">FABRICARE GLOANȚE</div>
                <div className="space-y-1 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Casing-uri:</span>
                    <span className="text-white">{intermediates.casing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plumb:</span>
                    <span className="text-white">{rawMaterials.lead}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Praf de Pușcă:</span>
                    <span className="text-white">{rawMaterials.gunpowder}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
          <div className="bg-slate-700/50 p-4 border-b border-slate-600">
            <h2 className="font-bold flex items-center gap-2">
              <span className="text-yellow-400 text-xl font-black">⚙️</span> REZULTAT FINAL
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center space-y-4">
              <div>
                <div className="text-sm text-slate-400 uppercase mb-2">Batch-uri Necesare</div>
                <div className="text-3xl font-mono font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-yellow-300">
                  {totalCrafts}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  ({totalCrafts} × 30 gloanțe = {totalBullets} gloanțe)
                </div>
              </div>
              <div className="h-px bg-slate-700 w-1/2 mx-auto"></div>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="text-6xl font-bold text-green-400">{totalBullets}</div>
                <div className="text-xs text-slate-400 uppercase mt-2">Gloanțe {weapon.name} Create</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulletsCalculator;
