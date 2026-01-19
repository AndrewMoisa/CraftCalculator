import { useMemo } from 'react';
import { getWeaponById } from '../data/Weapons';

export function useWeaponCalculator(weaponId, quantity) {
  return useMemo(() => {
    const weapon = getWeaponById(weaponId);
    if (!weapon) return null;

    const { crafting, smelting, recipe, additionalParts, ammunition } = weapon;

    // Check if this is ammunition (no crafting property)
    if (!crafting && ammunition) {
      // Handle ammunition calculation
      const batchesNeeded = Math.ceil(quantity / ammunition.batchSize);
      const totalBullets = batchesNeeded * ammunition.bullets.quantity;
      
      // Calculate casing requirements
      const totalCasings = batchesNeeded * ammunition.casing.quantity;
      const casingBatches = Math.ceil(totalCasings / ammunition.casing.quantity);
      
      const rawMaterials = {
        copperOre: casingBatches * ammunition.casing.smelting.copperOre,
        casing: totalCasings,
        lead: batchesNeeded * ammunition.bullets.materials.lead,
        gunpowder: batchesNeeded * ammunition.bullets.materials.gunpowder,
      };

      return {
        weapon,
        rawMaterials,
        intermediates: {
          casing: totalCasings
        },
        totalWeaponParts: 0,
        usedWeaponParts: 0,
        surplusWeaponParts: 0,
        totalCrafts: batchesNeeded,
        isAmmunition: true,
        totalBullets,
      };
    }

    // Calculate weapon parts needed
    const totalCrafts = crafting.craftsNeeded * quantity;
    const totalWeaponParts = totalCrafts * crafting.partsPerCraft;
    const usedWeaponParts = recipe.weaponParts * quantity;
    const surplusWeaponParts = totalWeaponParts - usedWeaponParts;

    // Calculate materials per craft
    const materialsPerCraft = crafting.materials;
    
    // Calculate total intermediate materials (steel, springs, etc.)
    const intermediates = {
      steel: totalCrafts * materialsPerCraft.steel,
      spring: totalCrafts * materialsPerCraft.spring,
    };

    // Calculate raw materials for weapon parts crafting
    const rawMaterials = {
      ironOre: intermediates.steel * smelting.steel.ironOre,
      coalOre: intermediates.steel * smelting.steel.coalOre,
      aluOre: intermediates.spring * smelting.spring.aluOre,
      plastic: totalCrafts * materialsPerCraft.plastic,
      metalParts: totalCrafts * materialsPerCraft.metalParts,
    };

    // Add additional parts if they exist (like pistol body, SMG barrel)
    if (additionalParts) {
      Object.entries(additionalParts).forEach(([partName, partData]) => {
        const partQuantity = recipe[partName] * quantity;
        
        if (partData.materials.steel) {
          const steelNeeded = partQuantity * partData.materials.steel;
          intermediates.steel += steelNeeded;
          rawMaterials.ironOre += steelNeeded * smelting.steel.ironOre;
          rawMaterials.coalOre += steelNeeded * smelting.steel.coalOre;
        }
        
        if (partData.materials.plastic) {
          rawMaterials.plastic += partQuantity * partData.materials.plastic;
        }
        
        if (partData.materials.metalParts) {
          rawMaterials.metalParts += partQuantity * partData.materials.metalParts;
        }
      });
    }

    // Add special recipe items (gold ingot, etc.)
    Object.entries(recipe).forEach(([key, value]) => {
      if (!['weaponParts', 'pistolBody', 'smgBarrel'].includes(key)) {
        rawMaterials[key] = value * quantity;
      }
    });

    return {
      weapon,
      rawMaterials,
      intermediates,
      totalWeaponParts,
      usedWeaponParts,
      surplusWeaponParts,
      totalCrafts,
    };
  }, [weaponId, quantity]);
}