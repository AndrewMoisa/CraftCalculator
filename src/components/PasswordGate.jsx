import { useState } from 'react';

const PASS_HASH = '0d4f4689c765630a900e34b06014ac17ba285b08ef87a49c5d266a517abe5cd9';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('calc_unlocked') === '1'
  );
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hash = await hashPassword(input);
    if (hash === PASS_HASH) {
      sessionStorage.setItem('calc_unlocked', '1');
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setInput('');
    }
  };

  if (unlocked) return children;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-black/60 border border-green-500/20 rounded-lg p-8"
      >
        <div className="text-green-500/40 text-xs font-mono mb-1">
          // authentication required
        </div>
        <h2 className="text-green-400 text-lg font-bold font-mono mb-6">
          {'>'} enter_password
          <span className="animate-pulse text-green-500/50">_</span>
        </h2>

        <input
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          placeholder="********"
          autoFocus
          className="w-full bg-black/60 border border-green-500/20 p-3 rounded text-lg font-mono text-green-400 focus:ring-1 focus:ring-green-500/40 focus:border-green-500/40 outline-none transition-all placeholder:text-green-500/15"
        />

        {error && (
          <p className="text-red-400/80 text-xs font-mono mt-2">
            {'>'} error: access_denied
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-4 py-2.5 rounded border border-green-500/30 bg-green-500/10 text-green-400 font-mono text-sm hover:bg-green-500/20 hover:border-green-500/50 transition-all cursor-pointer"
        >
          [AUTHENTICATE]
        </button>
      </form>
    </div>
  );
}

export default PasswordGate;
