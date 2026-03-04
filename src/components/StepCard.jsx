function StepCard({ step, title, icon, children, isLast = false }) {
  return (
    <>
      <div className="bg-black/40 border border-green-500/15 rounded overflow-hidden">
        <div className="bg-green-500/5 px-4 py-2.5 border-b border-green-500/15 flex items-center gap-3">
          <span className="text-green-500/30 text-xs font-mono">[{step}]</span>
          <span className="text-sm">{icon}</span>
          <h3 className="text-green-400 text-sm font-mono">
            {title}
          </h3>
        </div>
        <div className="p-3 space-y-1.5">{children}</div>
      </div>
      {!isLast && (
        <div className="flex justify-center">
          <div className="w-px h-6 bg-green-500/15"></div>
        </div>
      )}
    </>
  );
}

export function MaterialLine({ label, value, sub, highlight = false }) {
  return (
    <div className="flex items-center justify-between py-1.5 px-3 bg-black/30 rounded border border-green-500/5">
      <div>
        <span className={`text-sm font-mono ${highlight ? 'text-green-400' : 'text-green-500/60'}`}>
          {label}
        </span>
        {sub && <div className="text-xs text-green-500/25 mt-0.5 font-mono">{sub}</div>}
      </div>
      <span
        className={`font-mono font-bold text-base ${
          highlight ? 'text-green-400' : 'text-green-300/70'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default StepCard;
