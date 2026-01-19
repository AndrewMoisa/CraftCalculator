import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-700 mb-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          <div className="flex gap-6 text-2xl font-semibold">
            <Link 
              to="/" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/calculator" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Guns
            </Link>
            <Link 
              to="/bullets" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Bullets
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;