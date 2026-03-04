import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-3 py-1 rounded text-sm transition-all ${
      location.pathname === path
        ? 'text-green-400 bg-green-500/10 border border-green-500/30'
        : 'text-green-500/50 hover:text-green-400 border border-transparent hover:border-green-500/20'
    }`;

  return (
    <nav className="bg-black/80 backdrop-blur border-b border-green-500/15">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <span className="text-green-500/40 text-xs">
            <span className="text-green-400">{'>'}</span> craft_calc
          </span>
          <div className="flex gap-2">
            <Link to="/" className={linkClass('/')}>
              ~/home
            </Link>
            <Link to="/calculator" className={linkClass('/calculator')}>
              ~/calc
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;