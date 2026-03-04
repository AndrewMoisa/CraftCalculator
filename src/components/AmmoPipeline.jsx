import StepCard, { MaterialLine } from './StepCard';

function AmmoPipeline({ calc }) {
  const { ammo, batches, totalBullets, casings, copperOre, lead, gunpowder, coal, sulfur } =
    calc;

  return (
    <div>
      {/* Step 1: Mină — all raw materials */}
      <StepCard step={1} title="Mină" icon="⛏️">
        <MaterialLine label="Cupru" value={copperOre} sub={`${ammo.casing.copperOre} cupru → ${ammo.batchSize} casing-uri`} />
        <MaterialLine label="Cărbune" value={coal} sub="pentru praf de pușcă" />
        <MaterialLine label="Sulf" value={sulfur} sub="pentru praf de pușcă" />
        <MaterialLine label="Plumb" value={lead} />
      </StepCard>

      {/* Step 2: Topire & Craft — casings + gunpowder */}
      <StepCard step={2} title="Topire & Craft" icon="🔥">
        <MaterialLine
          label={ammo.casing.name}
          value={casings}
          sub={`${copperOre} cupru → ${casings} casing-uri`}
          highlight
        />
        <div className="text-xs text-green-500/30 px-3 mt-1 font-mono">
          // {ammo.casing.location}
        </div>
        <div className="h-px bg-green-500/10 my-1"></div>
        <MaterialLine
          label="Praf de Pușcă"
          value={gunpowder}
          sub={`${coal} cărbune + ${sulfur} sulf → ${gunpowder} praf`}
          highlight
        />
      </StepCard>

      {/* Step 3: Fabricare Gloanțe — final assembly */}
      <StepCard step={3} title="Fabricare Gloanțe" icon="✅" isLast>
        <div className="text-sm text-green-500/40 italic px-3 mb-3 font-mono">
          {ammo.assembly}
        </div>
        <div className="text-xs text-green-500/30 px-3 mb-4 font-mono">
          // {ammo.location}
        </div>
        <MaterialLine
          label="Batch-uri necesare"
          value={batches}
          sub={`${batches} × ${ammo.batchSize} gloanțe`}
          highlight
        />
        <div className="text-center pt-4 border-t border-green-500/10 mt-3">
          <div className="text-5xl font-bold text-green-400 font-mono">
            {totalBullets}
          </div>
          <div className="text-xs text-green-500/40 mt-2 font-mono">
            Gloanțe {ammo.name} // created
          </div>
        </div>
      </StepCard>
    </div>
  );
}

export default AmmoPipeline;
