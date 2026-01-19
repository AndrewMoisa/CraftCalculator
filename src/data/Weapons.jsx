export const WEAPONS = {
  TEC: {
    id: 'TEC',
    name: 'TEC-9',
    icon: '/assets/tec.png',
    recipe: {
      weaponParts: 6,
    },
    crafting: {
      partsPerCraft: 2,
      craftsNeeded: 2, // 2 crafts × 2 = 4 parts (exact)
      materials: {
        steel: 1,
        spring: 1,
        plastic: 1,
        metalParts: 2
      }
    },
    smelting: {
      steel: { ironOre: 4, coalOre: 4 },
      spring: { aluOre: 4 }
    },
  },
   DB: {
    id: 'DB',
    name: 'Desert Eagle',
    icon: '/assets/db.png',
    recipe: {
      weaponParts: 5,
      goldIngot: 1
    },
    crafting: {
      partsPerCraft: 2,
      craftsNeeded: 3, // 3 crafts × 2 = 6 parts (1 surplus)
      materials: {
        steel: 1,      // per craft
        spring: 1,     // per craft
        plastic: 1,    // per craft
        metalParts: 2  // per craft
      }
    },
    smelting: {
      steel: { ironOre: 4, coalOre: 4 },  // 4 iron + 4 coal = 1 steel
      spring: { aluOre: 4 }                // 4 alu ore = 1 spring
    }
  },
};

export const getWeaponById = (id) => WEAPONS[id];
export const getAllWeapons = () => Object.values(WEAPONS);