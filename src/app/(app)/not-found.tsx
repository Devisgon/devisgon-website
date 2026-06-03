import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col min-h-[80vh] bg-[var(--background)] relative">
        
        {/* Main Content Area */}
        <main className="flex-grow flex items-center justify-center relative overflow-hidden py-20">
          
          <h1 className="text-[30vw] font-[1000] leading-none select-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[var(--t_primary)] to-[var(--bg_primary)] opacity-40 absolute z-0">
            404
          </h1>

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--t_primary)] mb-4 tracking-tight">
              Page Not Found
            </h2>
            <p className="text-[var(--t_secondary)] max-w-md mb-10 opacity-80 font-medium">
              The link you followed may be broken, or the page may have been removed.
            </p>

            {/* Button Group */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link 
                href="/" 
                className="px-8 py-3 bg-[var(--btn_primary)] text-[var(--btn_secondary)] rounded-full font-bold text-sm transition-all hover:scale-105 shadow-lg shadow-[var(--t_secondary)]/20"
              >
                Go to Home
              </Link>
              
              <Link 
                href="/contact" 
                className="px-8 py-3 border border-[var(--t_secondary)] text-[var(--t_secondary)] rounded-full font-bold text-sm transition-all hover:bg-[var(--bg_primary)]"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[var(--primry)] rounded-full blur-[120px] opacity-10 pointer-events-none z-[-1]"></div>
        </main>

      </div>
    </>
  );
}
