export const WEAPONS = {
  TEC: {
    id: 'TEC',
    name: 'TEC-9',
    icon: '/assets/tec.png',
    recipe: {
      weaponParts: 7,
    },
    crafting: {
      partsPerCraft: 2,
      craftsNeeded: 4, // 4 crafts × 2 = 8 parts (1 surplus)
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
    craftDescription: {
       description: '4X Piese Armă, 1x Corp Pistol, 1x Țeavă SMG', 
    }
  },
   DB: {
    id: 'DB',
    name: 'Desert Eagle',
    icon: '/assets/db.png',
    recipe: {
      weaponParts: 7,
      goldIngot: 1
    },
    crafting: {
      partsPerCraft: 2,
      craftsNeeded: 4, // 4 crafts × 2 = 8 parts (1 surplus)
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
    },
    craftDescription: {
       description: '3X Piese Armă, 1x Corp Pistol, 1x Țeavă Rifle', 
    }
  },
  MAK: {
    id: 'MAK',
    name: 'Mini AK',
    icon: '/assets/mak.png',
    recipe: {
      weaponParts: 6,
    },
    crafting: {
      partsPerCraft: 2,
      craftsNeeded: 2, // 2 crafts × 2 = 4 parts (1 surplus)
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
    },
    craftDescription: {
       description: '1X Piese Armă, 1x Țeavă SMG, 1x Corp Rifle', 
    }
  },
  MG: {
    id: 'MG',
    name: 'Mini Gun',
    icon: '/assets/mg.png',
    recipe: {
      weaponParts: 11,
    },
    crafting: {
      partsPerCraft: 2,
      craftsNeeded: 6, // 6 crafts × 2 = 12 parts (1 surplus)
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
    },
    craftDescription: {
       description: '3x Piesa arma, 1x Butstock, 1x Țeavă Rifle, 1x Corp Rifle', 
    }
  },
  ARMK2: {
    id: 'ARMK2',
    name: 'ARMK2',
    icon: '/assets/armk2.png',
    recipe: {
      weaponParts: 11,
    },
    crafting: {
      partsPerCraft: 2,
      craftsNeeded: 6, // 6 crafts × 2 = 12 parts (1 surplus)
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
    },
    craftDescription: {
       description: '1x Butstock, 1x Țeavă Rifle, 1x Corp Rifle', 
    }
  },
  AMO9MM: {
    id: 'AMO9MM',
    name: '9mm PBM',
    icon: '/assets/9mm.png',
    recipe: {
      casing: 30,      // 30 casing-uri 9mm PBM
      lead: 1,         // 1 plumb
      gunpowder: 1     // 1 praf de pușcă
    },
    ammunition: {
      batchSize: 30,   // 30 gloanțe per craft
      casing: {
        name: 'Casing 9mm PBM',
        quantity: 30,  // 30 casing-uri
        smelting: {
          copperOre: 2 // 2 cupru pentru 30 casing-uri
        },
        location: 'Topitorie (sus pe scări)'
      },
      bullets: {
        quantity: 30,  // 30 gloanțe
        materials: {
          casing: 30,    // 30 casing-uri
          lead: 1,       // 1 plumb
          gunpowder: 1   // 1 praf de pușcă
        },
        location: 'Cayo - Fabricat Arme (jos)'
      }
    },
    craftDescription: {
       description: '30x Casing 9mm PBM + 1x Plumb + 1x Praf de Pușcă = 30 Gloanțe', 
    }
  },
  AMO762: {
    id: 'AMO762',
    name: '7.62mm Compact Rifle',
    icon: '/assets/762.png',
    recipe: {
      casing: 30,      // 30 casing-uri 7.62mm
      lead: 2,         // 2 plumb
      gunpowder: 2     // 2 praf de pușcă
    },
    ammunition: {
      batchSize: 30,   // 30 gloanțe per craft
      casing: {
        name: 'Casing 7.62mm',
        quantity: 30,  // 30 casing-uri
        smelting: {
          copperOre: 2 // 2 cupru pentru 30 casing-uri
        },
        location: 'Topitorie (sus pe scări)'
      },
      bullets: {
        quantity: 30,  // 30 gloanțe
        materials: {
          casing: 30,    // 30 casing-uri
          lead: 2,       // 2 plumb
          gunpowder: 2   // 2 praf de pușcă
        },
        location: 'Cayo - Fabricat Arme (jos)'
      }
    },
    craftDescription: {
       description: '30x Casing 7.62mm + 2x Plumb + 2x Praf de Pușcă = 30 Gloanțe', 
    }
  },

};

export const getWeaponById = (id) => WEAPONS[id];
export const getAllWeapons = () => Object.values(WEAPONS);