import { Mail } from 'lucide-react';
import type { PageLegale } from './LegalModal';

interface FooterProps {
  onOpenDemo: () => void;
  onOpenAuditModal: () => void;
  onOpenLegal: (page: PageLegale) => void;
}

export function Footer({ onOpenDemo, onOpenAuditModal, onOpenLegal }: FooterProps) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-display font-semibold text-lg">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-100 font-display text-sm font-semibold text-emerald-900" aria-hidden="true">
                T
              </div>
              <span>TraceDon</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              La plateforme Legaltech & Fiscale du don d'invendus alimentaires et non-alimentaires. Sécurisation Loi Garot, Loi AGEC & Art. 238 bis CGI.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              TraceDon SAS · Siège social : Nice, France
            </div>
          </div>

          {/* Solutions & Cadre */}
          <div className="space-y-2">
            <div className="font-semibold uppercase tracking-wider text-slate-200 text-xs">
              Cadre Légal & Fiscal
            </div>
            <ul className="space-y-1.5">
              <li>
                <a href="#cadre-reglementaire" className="hover:text-emerald-400 transition-colors">
                  Loi Garot (Alimentaire &gt; 400 m²)
                </a>
              </li>
              <li>
                <a href="#cadre-reglementaire" className="hover:text-emerald-400 transition-colors">
                  Loi AGEC (Non-alimentaire neuf)
                </a>
              </li>
              <li>
                <a href="#simulateur-fiscal" className="hover:text-emerald-400 transition-colors">
                  Article 238 bis du CGI (60 % IS)
                </a>
              </li>
              <li>
                <a href="#simulateur-fiscal" className="hover:text-emerald-400 transition-colors">
                  Dispense de TVA & régularisation
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAuditModal}
                  className="text-left hover:text-white transition-colors"
                >
                  Exemple N° Cerfa : 16216*03
                </button>
              </li>
            </ul>
          </div>

          {/* Plateforme */}
          <div className="space-y-2">
            <div className="font-semibold uppercase tracking-wider text-slate-200 text-xs">
              Plateforme & Rôles
            </div>
            <ul className="space-y-1.5">
              <li>
                <a href="#parcours-automatise" className="hover:text-emerald-400 transition-colors">
                  Scan & Détection RappelConso
                </a>
              </li>
              <li>
                <a href="#parcours-automatise" className="hover:text-emerald-400 transition-colors">
                  Double signature DocuSign quai
                </a>
              </li>
              <li>
                <a href="#reseau-associations" className="hover:text-emerald-400 transition-colors">
                  Réseau associations habilitées
                </a>
              </li>
              <li>
                <a href="#reseau-associations" className="hover:text-emerald-400 transition-colors">
                  Supervision multi-magasins
                </a>
              </li>
              <li>
                <a href="#comparatif" className="hover:text-emerald-400 transition-colors">
                  Comparatif Détruire vs TraceDon
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Contact */}
          <div className="space-y-2">
            <div className="font-semibold uppercase tracking-wider text-slate-200 text-xs">
              Contact & Démonstration
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-slate-300">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="mailto:contact@tracedon.fr" className="hover:text-white transition-colors">
                  contact@tracedon.fr
                </a>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="w-full py-2 px-3 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-full transition-colors text-center shadow-xs"
                >
                  Demander une démo
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} TraceDon SAS. Tous droits réservés.
          </div>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => onOpenLegal('mentions')} className="hover:text-slate-300 transition-colors">Mentions Légales</button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={() => onOpenLegal('confidentialite')} className="hover:text-slate-300 transition-colors">Politique de Confidentialité</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
