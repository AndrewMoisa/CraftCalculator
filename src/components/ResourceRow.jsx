const ResourceRow = ({ label, value, color }) => (
  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="text-sm text-slate-300 font-medium">{label}</span>
    </div>
    <span className="font-mono font-bold text-lg text-white">{value}</span>
  </div>
);

export default ResourceRow;