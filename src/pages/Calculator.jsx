import { useState } from 'react';
import { WEAPONS, AMMUNITION } from '../data/craftingData';
import {
  useWeaponCalculator,
  useAmmoCalculator,
} from '../hooks/useCraftCalculator';
import CraftingPipeline from '../components/CraftingPipeline';
import AmmoPipeline from '../components/AmmoPipeline';

function Calculator() {
  const [tab, setTab] = useState('weapons');
  const [selectedWeapon, setSelectedWeapon] = useState('TEC');
  const [weaponQty, setWeaponQty] = useState(1);
  const [selectedAmmo, setSelectedAmmo] = useState('AMO9MM');
  const [ammoQty, setAmmoQty] = useState(30);

  const weaponCalc = useWeaponCalculator(selectedWeapon, weaponQty);
  const ammoCalc = useAmmoCalculator(selectedAmmo, ammoQty);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-green-400 tracking-tight">
            {'>'} craft_calculator<span className="animate-pulse text-green-500/50">_</span>
          </h1>
          <p className="text-green-500/30 mt-1 text-xs">
            // resource management system v2.0
          </p>
        </header>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8 font-mono text-sm">
          <button
            onClick={() => setTab('weapons')}
            className={`flex-1 py-2.5 rounded border transition-all cursor-pointer ${
              tab === 'weapons'
                ? 'bg-green-500/10 text-green-400 border-green-500/40 shadow-[0_0_10px_rgba(0,255,0,0.05)]'
                : 'bg-black/40 text-green-500/30 border-green-500/10 hover:border-green-500/25 hover:text-green-500/50'
            }`}
          >
            [0] arme
          </button>
          <button
            onClick={() => setTab('ammo')}
            className={`flex-1 py-2.5 rounded border transition-all cursor-pointer ${
              tab === 'ammo'
                ? 'bg-green-500/10 text-green-400 border-green-500/40 shadow-[0_0_10px_rgba(0,255,0,0.05)]'
                : 'bg-black/40 text-green-500/30 border-green-500/10 hover:border-green-500/25 hover:text-green-500/50'
            }`}
          >
            [1] muniție
          </button>
        </div>

        {tab === 'weapons' ? (
          <>
            {/* Weapon Selector */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
              {WEAPONS.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedWeapon(w.id)}
                  className={`p-2 rounded border transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    selectedWeapon === w.id
                      ? 'border-green-500/50 bg-green-500/10 shadow-[0_0_15px_rgba(0,255,0,0.08)]'
                      : 'border-green-500/10 bg-black/40 hover:border-green-500/25'
                  }`}
                >
                  <img
                    src={w.icon}
                    alt={w.name}
                    className="w-12 h-12 object-contain"
                  />
                  <span className={`text-[10px] ${selectedWeapon === w.id ? 'text-green-400' : 'text-green-500/40'}`}>
                    {w.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Weapon Info */}
            {weaponCalc && (
              <div className="flex items-center gap-4 bg-black/40 border border-green-500/15 rounded p-4 mb-6">
                <img
                  src={weaponCalc.weapon.icon}
                  alt={weaponCalc.weapon.name}
                  className="w-20 h-20 object-contain"
                />
                <div className="text-sm">
                  <div className="text-green-400 font-bold">
                    {weaponCalc.weapon.name}
                  </div>
                  <div className="text-green-500/40 text-xs mt-1">
                    parts_required: {weaponCalc.weapon.weaponParts}
                  </div>
                  <div className="text-green-500/30 text-xs mt-1">
                    {weaponCalc.weapon.assemblyParts.map((p, i) => (
                      <span key={p.name}>
                        {i > 0 && ' + '}{p.qty}×{p.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="bg-black/40 border border-green-500/15 p-4 rounded mb-8">
              <label className="block text-xs text-green-500/40 mb-2">
                {'>'} set quantity =
              </label>
              <input
                type="number"
                value={weaponQty}
                onChange={(e) =>
                  setWeaponQty(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-full bg-black/60 border border-green-500/20 p-3 rounded text-xl font-mono text-green-400 focus:ring-1 focus:ring-green-500/40 focus:border-green-500/40 outline-none transition-all"
              />
            </div>

            {/* Crafting Pipeline */}
            {weaponCalc && <CraftingPipeline calc={weaponCalc} />}
          </>
        ) : (
          <>
            {/* Ammo Selector */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {AMMUNITION.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setSelectedAmmo(a.id);
                    setAmmoQty(a.batchSize);
                  }}
                  className={`p-2 rounded border transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    selectedAmmo === a.id
                      ? 'border-green-500/50 bg-green-500/10 shadow-[0_0_15px_rgba(0,255,0,0.08)]'
                      : 'border-green-500/10 bg-black/40 hover:border-green-500/25'
                  }`}
                >
                  <img
                    src={a.icon}
                    alt={a.name}
                    className="w-12 h-12 object-contain"
                  />
                  <span className={`text-[10px] ${selectedAmmo === a.id ? 'text-green-400' : 'text-green-500/40'}`}>
                    {a.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Ammo Info */}
            {ammoCalc && (
              <div className="flex items-center gap-4 bg-black/40 border border-green-500/15 rounded p-4 mb-6">
                <img
                  src={ammoCalc.ammo.icon}
                  alt={ammoCalc.ammo.name}
                  className="w-20 h-20 object-contain"
                />
                <div className="text-sm">
                  <div className="text-green-400 font-bold">
                    {ammoCalc.ammo.name}
                  </div>
                  <div className="text-green-500/40 text-xs mt-1">
                    batch_size: {ammoCalc.ammo.batchSize}
                  </div>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="bg-black/40 border border-green-500/15 p-4 rounded mb-8">
              <label className="block text-xs text-green-500/40 mb-2">
                {'>'} set bullet_count =
              </label>
              <input
                type="number"
                value={ammoQty}
                onChange={(e) =>
                  setAmmoQty(Math.max(1, parseInt(e.target.value) || 1))
                }
                step={ammoCalc ? ammoCalc.ammo.batchSize : 30}
                className="w-full bg-black/60 border border-green-500/20 p-3 rounded text-xl font-mono text-green-400 focus:ring-1 focus:ring-green-500/40 focus:border-green-500/40 outline-none transition-all"
              />
              <p className="text-xs text-green-500/30 mt-2">
                // batch_size = {ammoCalc ? ammoCalc.ammo.batchSize : 30}
              </p>
            </div>

            {/* Ammo Pipeline */}
            {ammoCalc && <AmmoPipeline calc={ammoCalc} />}
          </>
        )}
      </div>
    </div>
  );
}

export default Calculator;