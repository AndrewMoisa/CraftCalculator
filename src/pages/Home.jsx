import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4 font-mono">
      <div className="max-w-lg w-full">
        {/* Terminal window */}
        <div className="border border-green-500/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,0,0.05)]">
          {/* Title bar */}
          <div className="bg-green-500/10 border-b border-green-500/20 px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
            <span className="text-green-500/50 text-xs ml-2">primejdie@craft:~</span>
          </div>
          {/* Terminal body */}
          <div className="bg-black/60 p-6 space-y-3 text-sm">
            <div className="text-green-500/60">
              <span className="text-green-400">$</span> cat /etc/motd
            </div>
            <pre className="text-green-400 text-xs leading-relaxed">{`
  ██████╗██████╗  █████╗ ███████╗████████╗
 ██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
 ██║     ██████╔╝███████║█████╗     ██║   
 ██║     ██╔══██╗██╔══██║██╔══╝     ██║   
 ╚██████╗██║  ██║██║  ██║██║        ██║   
  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝        ╚═╝   
`}</pre>
            <div className="text-green-500/60">
              <span className="text-green-400">$</span> echo $VERSION
            </div>
            <div className="text-green-300">Craft Calculator v2.0</div>
            <div className="text-green-500/60">
              <span className="text-green-400">$</span> echo $AUTHOR
            </div>
            <div className="text-green-300">Primejdie</div>
            <div className="text-green-500/60 mt-4">
              <span className="text-green-400">$</span> ./start_calculator.sh
            </div>
            <Link
              to="/calculator"
              className="inline-block mt-2 px-6 py-2 border border-green-500/40 text-green-400 hover:bg-green-500/10 hover:border-green-400 transition-all rounded font-mono text-sm"
            >
              {'>'} LAUNCH_
            </Link>
            <div className="text-green-500/30 animate-pulse mt-2">█</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;