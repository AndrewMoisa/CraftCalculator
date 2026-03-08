// ═══════════════════════════════════════════════════════
// UNIVERSAL CRAFTING PIPELINE
// The recipe up to weapon parts is always the same.
// Only the number of weapon parts differs per weapon.
// ═══════════════════════════════════════════════════════

export const PIPELINE = {
  // Smelting ratios
  smelting: {
    steel: { ironOre: 4, coal: 4 },   // 4 minereu fier + 4 cărbune = 1 oțel
    spring: { aluOre: 4 },            // 4 minereu aluminiu = 1 arc
    goldIngot: { goldOre: 4 },        // 4 minereu aur = 1 lingou aur
  },
  // Weapon parts craft: 1 craft → 2 piese armă
  weaponParts: {
    steel: 1,
    spring: 1,
    plastic: 1,
    metalParts: 2,
    output: 2,
  },
};

// ═══════════════════════════════════════════════════════
// WEAPONS
// Each weapon only defines what's unique: parts needed,
// assembly description, and any extra materials.
// ═══════════════════════════════════════════════════════

export const WEAPONS = [
  {
    id: 'TEC',
    name: 'TEC-9',
    icon: '/assets/tec.png',
    assemblyParts: [
      { name: 'Piese Armă', qty: 1, partsCost: 1 },
      { name: 'Corp Pistol', qty: 1, partsCost: 1 },
      { name: 'Țeavă SMG', qty: 1, partsCost: 2 },
    ],
  },
  {
    id: 'DB',
    name: 'DB',
    icon: '/assets/db.png',
    assemblyParts: [
      { name: 'Piese Armă', qty: 3, partsCost: 1 },
      { name: 'Corp Pistol', qty: 1, partsCost: 1 },
      { name: 'Țeavă Rifle', qty: 1, partsCost: 3 },
    ],
    extras: { 'Lingou Aur': 1 },
  },
  {
    id: 'MAK',
    name: 'Mini AK',
    icon: '/assets/mak.png',
    assemblyParts: [
      { name: 'Piese Armă', qty: 1, partsCost: 1 },
      { name: 'Țeavă SMG', qty: 1, partsCost: 2 },
      { name: 'Corp Rifle', qty: 1, partsCost: 3 },
    ],
  },
  {
    id: 'MG',
    name: 'Mini Gun',
    icon: '/assets/mg.png',
    assemblyParts: [
      { name: 'Piese Armă', qty: 3, partsCost: 1 },
      { name: 'Butstock', qty: 1, partsCost: 2 },
      { name: 'Țeavă Rifle', qty: 1, partsCost: 3 },
      { name: 'Corp Rifle', qty: 1, partsCost: 3 },
    ],
  },
  {
    id: 'ARMK2',
    name: 'ARMK2',
    icon: '/assets/armk2.png',
    assemblyParts: [
      { name: 'Piese Armă', qty: 3, partsCost: 1 },
      { name: 'Butstock', qty: 1, partsCost: 2 },
      { name: 'Țeavă Rifle', qty: 1, partsCost: 3 },
      { name: 'Corp Rifle', qty: 1, partsCost: 3 },
    ],
  },
  {
    id: 'HR',
    name: 'Heavy Revolver',
    icon: '/assets/heavy.png',
    assemblyParts: [
      { name: 'Piese Armă', qty: 4, partsCost: 1 },
      { name: 'Țeavă Rifle', qty: 1, partsCost: 1 },
      { name: 'Corp Pistol', qty: 1, partsCost: 1 },
    ],
    extras: { 'Blueprint': 1 },
  },
];

// ═══════════════════════════════════════════════════════
// AMMUNITION
// ═══════════════════════════════════════════════════════

export const AMMUNITION = [
  {
    id: 'AMO9MM',
    name: '9mm PBM',
    icon: '/assets/9mm.png',
    batchSize: 30,
    casing: { name: 'Casing 9mm PBM', copperOre: 1, location: 'Topitorie (sus pe scări)' },
    materials: { lead: 1, gunpowder: 1 },  // 1 gunpowder = 1 cărbune + 1 sulf
    assembly: '30x Casing + 1x Plumb + 1x Praf de Pușcă = 30 Gloanțe',
    location: 'Cayo - Fabricat Arme (jos)',
  },
  {
    id: 'AMO762',
    name: '7.62mm Compact Rifle',
    icon: '/assets/762.png',
    batchSize: 30,
    casing: { name: 'Casing 7.62mm', copperOre: 1, location: 'Topitorie (sus pe scări)' },
    materials: { lead: 2, gunpowder: 2 },  // 2 gunpowder = 2 cărbune + 2 sulf
    assembly: '30x Casing + 2x Plumb + 2x Praf de Pușcă = 30 Gloanțe',
    location: 'Cayo - Fabricat Arme (jos)',
  },
  {
    id: 'AMO765',
    name: '7.65mm',
    icon: '/assets/762.png',
    batchSize: 20,
    casing: { name: 'Casing 7.65mm', copperOre: 2, location: 'Topitorie (sus pe scări)' },
    materials: { lead: 2, gunpowder: 2 },  // 2 gunpowder = 2 cărbune + 2 sulf
    assembly: '20x Casing + 2x Plumb + 2x Praf de Pușcă = 20 Gloanțe',
    location: 'Cayo - Fabricat Arme (jos)',
  },
];

// ═══════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════

// Auto-calculate weaponParts from assemblyParts
WEAPONS.forEach((w) => {
  w.weaponParts = w.assemblyParts.reduce((sum, p) => sum + p.qty * p.partsCost, 0);
});

export const getWeaponById = (id) => WEAPONS.find((w) => w.id === id);
export const getAmmoById = (id) => AMMUNITION.find((a) => a.id === id);
