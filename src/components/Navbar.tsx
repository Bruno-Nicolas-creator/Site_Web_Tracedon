import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

// Adresse de l'application TraceDon (logiciel Dons Invendus) où les clients se connectent.
const URL_CONNEXION = 'https://dons-invendus.vercel.app/connexion';
// L'application est encore fermée au public (écran de verrouillage) : le bouton « Se connecter »
// reste masqué jusqu'à son ouverture. Passer à true pour le réafficher.
const APPLICATION_OUVERTE = false;

interface NavbarProps {
  onOpenDemo: () => void;
  onScrollToSimulator: () => void;
}

export function Navbar({ onOpenDemo, onScrollToSimulator }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Lois Garot & AGEC', href: '#cadre-reglementaire' },
    { label: 'Comment ça marche', href: '#parcours-automatise' },
    { label: 'Simulateur d’Économies', href: '#simulateur-fiscal' },
    { label: 'Comparatif', href: '#comparatif' },
    { label: 'Pour les Associations', href: '#reseau-associations' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl 2xl:max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element Brand wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 font-display hover:opacity-90 transition-opacity"
        >
          {/* Logo commun avec l'application : « T » sur carré vert sapin */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-800 font-display text-lg font-semibold text-white" aria-hidden="true">
            T
          </div>
          <span>TraceDon</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden 2xl:flex items-center gap-5 text-sm font-medium text-slate-600 whitespace-nowrap">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-slate-900 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          {APPLICATION_OUVERTE && (
            <a
              href={URL_CONNEXION}
              className="px-2 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              Se connecter
            </a>
          )}
          <button
            type="button"
            onClick={onScrollToSimulator}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors border border-slate-300 hover:border-slate-400 bg-white rounded-full whitespace-nowrap"
          >
            Simuler mes gains
          </button>
          <button
            type="button"
            onClick={onOpenDemo}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors rounded-full shadow-xs whitespace-nowrap"
          >
            <span>Demander une démo</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex 2xl:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenDemo}
            className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full whitespace-nowrap"
          >
            Démo
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
            aria-label="Ouvrir le menu mobile"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="2xl:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-800 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            {APPLICATION_OUVERTE && (
              <a
                href={URL_CONNEXION}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-full"
              >
                Se connecter
              </a>
            )}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToSimulator();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
            >
              Simuler mes gains fiscaux
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
            >
              Demander une démo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
