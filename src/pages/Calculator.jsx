import React, { useState } from 'react';
import ResourceRow from '../components/ResourceRow';
import dbIcon from '../assets/db.png';

function Calculator() {
  const [quantity, setQuantity] = useState(10);

  // Pentru 1 DB ai nevoie de: 5 piese armă + 1 lingou aur
  // Pentru 5 piese armă ai nevoie de: 3 craft-uri (fiecare craft = 2 piese, deci 3×2=6 piese, 1 surplus)
  // Pentru 1 craft (2 piese armă): 1 Plastic + 1 Oțel + 1 Arc + 2 Piese Metal
  
  const craftsNeeded = 3; // 3 craft-uri pentru 5 piese armă (per DB)
  const partsNeeded = 5;  // 5 piese armă per DB
  
  // Resurse necesare pentru 1 DB, pornind de la materii prime
  // 4 minereuri = 1 lingou
  // Pentru 1 oțel: 4 fier + 4 cărbune (nu 4 total, ci 4 din fiecare!)
  const rawMaterials = {
    ironOre: 12,      // 3 oțel × 4 fier per oțel
    coalOre: 12,      // 3 oțel × 4 cărbune per oțel
    aluOre: 12,       // 3 arcuri × 4 aluminiu per arc
    plastic: 3,       // 3 craft-uri × 1 plastic
    metalParts: 6,    // 3 craft-uri × 2 piese
    goldIngot: 1      // rămâne la fel
  };

  // Produse intermediare
  const intermediates = {
    steel: 3,         // din 12 fier + 12 cărbune = 3 oțel
    spring: 3,        // din 12 minereu aluminiu = 3 arcuri
    weaponParts: 6    // 3 craft-uri × 2 piese = 6 piese armă (5 folosite, 1 surplus per DB)
  };

  const total = (val) => val * quantity;
  const totalWeaponParts = intermediates.weaponParts * quantity;
  const usedWeaponParts = partsNeeded * quantity;
  const surplusWeaponParts = totalWeaponParts - usedWeaponParts;

  return (
    <div className="min-h-screen p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-yellow-200 uppercase tracking-tighter">
            Calculator Crafting
          </h1>
          <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest">Sistem Management Resurse v1.0</p>
        </header>

        <div className='flex items-center justify-center m-4 gap-4'>
          <img className="w-xs" src={dbIcon} alt="db icon" />
          <div className='flex flex-col'>
            <span className='text-white text-1xl uppercase'>5x - piesă armă</span>
            <span className='text-white text-1xl uppercase'>1x - lingou aur</span>
            <span className='text-slate-500 text-xs mt-2'>┗━ 1 Craft = 2 Piese Armă</span>
            <span className='text-slate-500 text-xs'>┗━ 1 Oțel + 1 Arc + 1 Plastic + 2 Piese Metal</span>
            <span className='text-amber-500 text-xs mt-1'>⚠ 3 craft-uri = 6 piese (1 surplus per DB)</span>
            <span className='text-blue-400 text-xs mt-1'>ℹ️ 4 minereuri = 1 lingou</span>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-2xl mb-8">
          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Cantitate Arme (DB)</label>
          <input 
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
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
              <ResourceRow label="Minereu Fier" value={total(rawMaterials.ironOre)} color="bg-orange-500" />
              <ResourceRow label="Minereu Cărbune" value={total(rawMaterials.coalOre)} color="bg-zinc-600" />
              <ResourceRow label="Minereu Aluminiu" value={total(rawMaterials.aluOre)} color="bg-blue-300" />
              <ResourceRow label="Plastic" value={total(rawMaterials.plastic)} color="bg-green-500" />
              <ResourceRow label="Piese Metal" value={total(rawMaterials.metalParts)} color="bg-slate-400" />
              <ResourceRow label="Lingou Aur" value={total(rawMaterials.goldIngot)} color="bg-yellow-400" />
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
                  <span className="text-xl font-bold text-orange-300">{total(intermediates.steel)}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {total(rawMaterials.ironOre)} Fier + {total(rawMaterials.coalOre)} Cărbune
                </div>
                <div className="text-xs text-slate-600">
                  (4 Fier + 4 Cărbune = 1 Oțel)
                </div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Arc (Aluminiu)</span>
                  <span className="text-xl font-bold text-blue-300">{total(intermediates.spring)}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {total(rawMaterials.aluOre)} Minereu Aluminiu
                </div>
                <div className="text-xs text-slate-600">
                  (4 Minereuri = 1 Arc)
                </div>
              </div>
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
                <div className="text-5xl font-mono font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-yellow-300">
                  {totalWeaponParts}
                </div>
                <div className="text-xs text-slate-400 uppercase mt-2">Piese Armă Obținute</div>
              </div>
              <div className="h-px bg-slate-700 w-1/2 mx-auto"></div>
              <div className="text-sm text-slate-500">
                Din {total(intermediates.steel)} Oțel + {total(intermediates.spring)} Arcuri + {total(rawMaterials.plastic)} Plastic + {total(rawMaterials.metalParts)} Piese Metal
              </div>
              <div className="text-xs text-slate-600 mt-2">
                ({total(craftsNeeded)} craft-uri × 2 piese = {totalWeaponParts} piese)
              </div>
              <div className="text-xs text-amber-600">
                (Folosite: {usedWeaponParts} piese | Surplus: {surplusWeaponParts} piese)
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{total(rawMaterials.goldIngot)}</div>
                    <div className="text-xs text-slate-400 uppercase">Lingouri Aur</div>
                  </div>
                  <div className="text-slate-600 text-2xl">+</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">{usedWeaponParts}</div>
                    <div className="text-xs text-slate-400 uppercase">Piese Armă</div>
                  </div>
                  <div className="text-slate-600 text-2xl">=</div>
                </div>
                <div className="text-3xl font-bold text-green-400">{quantity}</div>
                <div className="text-xs text-slate-400 uppercase">Arme DB Finale</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;