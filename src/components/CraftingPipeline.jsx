import StepCard, { MaterialLine } from './StepCard';

function CraftingPipeline({ calc }) {
  const { weapon, mining, smelting, jobs, weaponParts, extras, totalWeapons } =
    calc;

  return (
    <div>
      {/* Step 1: Mining */}
      <StepCard step={1} title="Mină" icon="⛏️">
        <MaterialLine label="Minereu Fier" value={mining.ironOre} />
        <MaterialLine label="Cărbune" value={mining.coal} />
        <MaterialLine label="Minereu Aluminiu" value={mining.aluOre} />
        {mining.goldOre > 0 && (
          <MaterialLine label="Minereu Aur" value={mining.goldOre} />
        )}
      </StepCard>

      {/* Step 2: Topitorie + Joburi */}
      <StepCard step={2} title="Topitorie & Joburi" icon="🔥">
        <MaterialLine
          label="Oțel"
          value={smelting.steel}
          sub={`${mining.ironOre} fier + ${mining.coal} cărbune → ${smelting.steel} oțel  (4 fier + 4 cărbune = 1 oțel)`}
          highlight
        />
        <MaterialLine
          label="Arc"
          value={smelting.spring}
          sub={`${mining.aluOre} aluminiu → ${smelting.spring} arc  (4 aluminiu = 1 arc)`}
          highlight
        />
        {smelting.goldIngots > 0 && (
          <MaterialLine
            label="Lingou Aur"
            value={smelting.goldIngots}
            sub={`${mining.goldOre} aur → ${smelting.goldIngots} lingou  (4 aur = 1 lingou)`}
            highlight
          />
        )}
        <div className="h-px bg-green-500/10 my-1"></div>
        <MaterialLine
          label="Plastic"
          value={jobs.plastic}
          sub="Direct din job"
        />
        <MaterialLine
          label="Piese Metal"
          value={jobs.metalParts}
          sub="Direct din job"
        />
      </StepCard>

      {/* Step 3: Weapon Parts */}
      <StepCard step={3} title="Craft Piese Armă" icon="🔧">
        <div className="bg-black/30 rounded p-3 border border-green-500/10 mb-1 font-mono">
          <div className="text-xs text-green-500/30 mb-1">// rețetă per craft:</div>
          <div className="text-sm text-green-500/60">
            1× Oțel + 1× Arc + 1× Plastic + 2× Piese Metal ={' '}
            <span className="text-green-400 font-bold">2 Piese Armă</span>
          </div>
        </div>
        <MaterialLine
          label="Craft-uri necesare"
          value={weaponParts.crafts}
          highlight
        />
        <MaterialLine label="Piese produse" value={weaponParts.produced} />
        <MaterialLine label="Piese necesare" value={weaponParts.needed} />
        {weaponParts.surplus > 0 && (
          <MaterialLine
            label="Surplus"
            value={`+${weaponParts.surplus}`}
            sub="Piese rămase în plus"
          />
        )}
      </StepCard>

      {/* Step 4: Assembly Components */}
      <StepCard step={4} title="Componente" icon="🔩">
        {weapon.assemblyParts.map((part) => {
          const totalQty = part.qty * totalWeapons;
          const totalCost = totalQty * part.partsCost;
          return (
            <MaterialLine
              key={part.name}
              label={`${totalQty}× ${part.name}`}
              value={`${totalCost} piese`}
              sub={part.partsCost > 1 ? `${part.partsCost} piese armă per bucată` : 'direct'}
              highlight={part.partsCost > 1}
            />
          );
        })}
        {smelting.goldIngots > 0 && (
          <>
            <div className="h-px bg-green-500/10 my-1"></div>
            <MaterialLine
              label="Lingou Aur"
              value={`${smelting.goldIngots}×`}
            />
          </>
        )}
        {extras.length > 0 && (
          <>
            <div className="h-px bg-green-500/10 my-1"></div>
            {extras.map((e) => (
              <MaterialLine key={e.name} label={e.name} value={`${e.quantity}×`} sub="Comandă directă" />
            ))}
          </>
        )}
      </StepCard>

      {/* Step 5: Final Result */}
      <StepCard step={5} title="Asamblare Finală" icon="✅" isLast>
        <div className="text-center pt-4 border-t border-green-500/10">
          <div className="text-5xl font-bold text-green-400 font-mono">
            {totalWeapons}
          </div>
          <div className="text-xs text-green-500/40 mt-2 font-mono">
            {weapon.name} // created
          </div>
        </div>
      </StepCard>
    </div>
  );
}

export default CraftingPipeline;
