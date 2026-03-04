import { useMemo } from 'react';
import { getWeaponById, getAmmoById, PIPELINE } from '../data/craftingData';

export function useWeaponCalculator(weaponId, quantity) {
  return useMemo(() => {
    const weapon = getWeaponById(weaponId);
    if (!weapon) return null;

    const { smelting, weaponParts: wp } = PIPELINE;

    // How many weapon parts needed total
    const partsNeeded = weapon.weaponParts * quantity;
    // How many crafts (each craft produces wp.output weapon parts)
    const crafts = Math.ceil(partsNeeded / wp.output);
    const partsProduced = crafts * wp.output;
    const surplus = partsProduced - partsNeeded;

    // Intermediates needed for all crafts
    const steel = crafts * wp.steel;
    const spring = crafts * wp.spring;
    const plastic = crafts * wp.plastic;
    const metalParts = crafts * wp.metalParts;

    // Raw ores needed for smelting
    const ironOre = steel * smelting.steel.ironOre;
    const coal = steel * smelting.steel.coal;
    const aluOre = spring * smelting.spring.aluOre;

    // Gold ingot (from extras if present)
    const goldIngots = weapon.extras?.['Lingou Aur']
      ? weapon.extras['Lingou Aur'] * quantity
      : 0;
    const goldOre = goldIngots * smelting.goldIngot.goldOre;

    // Extra materials (excluding gold ingot, handled above)
    const extras = weapon.extras
      ? Object.entries(weapon.extras)
          .filter(([name]) => name !== 'Lingou Aur')
          .map(([name, qty]) => ({
            name,
            quantity: qty * quantity,
          }))
      : [];

    return {
      weapon,
      mining: { ironOre, coal, aluOre, goldOre },
      smelting: { steel, spring, goldIngots },
      jobs: { plastic, metalParts },
      weaponParts: { crafts, produced: partsProduced, needed: partsNeeded, surplus },
      extras,
      totalWeapons: quantity,
    };
  }, [weaponId, quantity]);
}

export function useAmmoCalculator(ammoId, quantity) {
  return useMemo(() => {
    const ammo = getAmmoById(ammoId);
    if (!ammo) return null;

    const batches = Math.ceil(quantity / ammo.batchSize);
    const totalBullets = batches * ammo.batchSize;
    const casings = batches * ammo.batchSize;
    const copperOre = batches * ammo.casing.copperOre;
    const lead = batches * ammo.materials.lead;
    const gunpowder = batches * ammo.materials.gunpowder;
    // Gunpowder is crafted: 1 cărbune + 1 sulf = 1 praf de pușcă
    const coal = gunpowder;
    const sulfur = gunpowder;

    return {
      ammo,
      batches,
      totalBullets,
      casings,
      copperOre,
      lead,
      gunpowder,
      coal,
      sulfur,
    };
  }, [ammoId, quantity]);
}
