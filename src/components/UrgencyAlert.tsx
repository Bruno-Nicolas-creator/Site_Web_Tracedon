import { AlertTriangle, Scale, Ban, CheckCircle2 } from 'lucide-react';

export function UrgencyAlert() {
  return (
    <section id="cadre-reglementaire" className="py-20 border-b border-slate-200 bg-slate-50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 shadow-xs">
            <AlertTriangle className="h-4 w-4 text-rose-700" />
            <span>Sécurité Réglementaire & Risques Sanctionnels</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 font-display text-balance">
            Détruire ses invendus est désormais illégal.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Ce n'est plus une simple perte économique : c'est une infraction sanctionnée par de lourdes amendes administratives, encore méconnue de nombreuses entreprises.
          </p>
        </div>

        {/* 2 Regulatory Shock Cards: Loi Garot & Loi AGEC */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Card 1: Loi Garot */}
          <div className="rounded-2xl border border-rose-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                  Alimentaire · Loi Garot
                </span>
                <h3 className="text-2xl font-bold text-slate-900 font-display mt-1">
                  Interdiction stricte de détruire
                </h3>
              </div>
              <div className="h-10 w-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 shrink-0">
                <Ban className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="text-xs text-slate-500 uppercase font-semibold">L'infraction légale</div>
                <div className="text-slate-900 font-medium">
                  Interdiction de javelliser, compacter ou détruire des denrées alimentaires encore consommables.
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="text-xs text-slate-500 uppercase font-semibold">Entreprises assujetties</div>
                <div className="text-slate-900 font-medium">
                  Commerces & surfaces de vente &gt; 400 m², restauration collective, industries agroalimentaires (&gt; 50 M€ CA).
                </div>
              </div>

              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
                <div className="text-xs text-rose-800 font-bold uppercase tracking-wide">La sanction DGCCRF & DDPP</div>
                <div className="text-xl font-bold text-rose-800">
                  Amende jusqu'à 0,1 % du chiffre d'affaires
                </div>
                <div className="text-xs text-rose-700/90 mt-1">
                  Exemple : jusqu'à 100 000 € d'amende pour une entreprise à 100 M€ de CA.
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Loi AGEC */}
          <div className="rounded-2xl border border-amber-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Non-Alimentaire · Loi AGEC
                </span>
                <h3 className="text-2xl font-bold text-slate-900 font-display mt-1">
                  Zéro destruction d'invendus neufs
                </h3>
              </div>
              <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <Scale className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="text-xs text-slate-500 uppercase font-semibold">L'infraction légale</div>
                <div className="text-slate-900 font-medium">
                  Interdiction d'éliminer, incinérer ou mettre en décharge les invendus neufs (textile, chaussures, mobilier, électroménager, hygiène).
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="text-xs text-slate-500 uppercase font-semibold">Entreprises assujetties</div>
                <div className="text-slate-900 font-medium">
                  <strong className="text-amber-900 font-semibold">Toutes les entreprises sans exception</strong>, sans aucun seuil de taille ou de chiffre d'affaires.
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                <div className="text-xs text-amber-800 font-bold uppercase tracking-wide">La sanction DGCCRF</div>
                <div className="text-xl font-bold text-amber-800">
                  Jusqu'à 15 000 € par manquement
                </div>
                <div className="text-xs text-amber-700/90 mt-1">
                  Amende administrative cumulable par infraction constatée lors des contrôles d'inspection.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
