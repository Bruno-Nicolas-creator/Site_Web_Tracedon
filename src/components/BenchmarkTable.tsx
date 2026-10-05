import { CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react';

export function BenchmarkTable() {
  const rows = [
    {
      criteria: 'Impôt sur les Sociétés (IS)',
      destroy: { text: 'Aucun gain (Perte sèche)', status: 'bad' },
      manual: { text: 'Réduction de 60 % (si justificatifs complets)', status: 'warn' },
      tracedon: { text: 'Réduction de 60 % (justificatifs générés)', status: 'good' },
      note: 'Art. 238 bis du CGI sur le prix de revient, dans la limite du plafond annuel (associations d’intérêt général)'
    },
    {
      criteria: 'Avantage TVA',
      destroy: { text: 'Perdue (ou reversée)', status: 'bad' },
      manual: { text: 'Pas de reversement (si inventaire complet)', status: 'warn' },
      tracedon: { text: 'Pas de reversement (inventaire horodaté)', status: 'good' },
      note: 'Dispense de régularisation, uniquement pour les dons aux associations reconnues d’utilité publique (RUP)'
    },
    {
      criteria: 'Risque Légal (AGEC / Garot)',
      destroy: { text: 'Amende lourde (0,1% CA ou 15 000 €)', status: 'bad' },
      manual: { text: 'Partiellement éliminé', status: 'warn' },
      tracedon: { text: 'Conformité suivie en continu', status: 'good' },
      note: 'Audits des conventions & habilitations d’aide alimentaire'
    },
    {
      criteria: 'Temps Administratif',
      destroy: { text: 'Faible (mais illégal)', status: 'bad' },
      manual: { text: 'Extrême (chronophage, ressaisies)', status: 'bad' },
      tracedon: { text: '3 Clics par don (Scan & Signature)', status: 'good' },
      note: 'Moins de 2 minutes par enlèvement sur quai'
    },
    {
      criteria: 'Sécurité Contrôle Fiscal',
      destroy: { text: 'Néant (Infraction constatée)', status: 'bad' },
      manual: { text: 'Faible (Rejet fréquent des reçus)', status: 'bad' },
      tracedon: { text: 'Renforcée (justificatifs complets et horodatés)', status: 'good' },
      note: 'Bons d’enlèvement reliés au N° Cerfa : 16216*03'
    },
    {
      criteria: 'Sécurité Sanitaire (Alimentaire)',
      destroy: { text: 'N/A', status: 'bad' },
      manual: { text: 'Risque élevé (aucun filtre direct)', status: 'bad' },
      tracedon: { text: 'Filtre automatique RappelConso', status: 'good' },
      note: 'Vérification en temps réel de la base publique d’État'
    },
    {
      criteria: 'Rapport Carbone & RSE (CSRD)',
      destroy: { text: 'Bilan carbone négatif (déchets)', status: 'bad' },
      manual: { text: 'Estimation manuelle floue', status: 'bad' },
      tracedon: { text: 'Calcul basé sur ADEME Agribalyse', status: 'good' },
      note: 'Produit par produit (viande, crèmerie, légumes, textile)'
    }
  ];

  return (
    <section id="comparatif" className="py-20 border-b border-slate-200 bg-slate-50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
            <Sparkles className="h-4 w-4 text-emerald-700" />
            <span>Matrice de Décision B2B</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 font-display text-balance">
            Le comparatif financier et opérationnel.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Bordereaux papier perdus, associations non vérifiées, Cerfa incomplets : le don « à la main » expose à un redressement. Voici ce que change TraceDon.
          </p>
        </div>

        {/* Version téléphone : une carte par critère, la réponse TraceDon en premier
            (le tableau à 4 colonnes coupait la colonne TraceDon hors de l'écran) */}
        <div className="mt-10 space-y-4 md:hidden">
          {rows.map((row, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
              <div>
                <div className="font-semibold text-slate-900 text-base">{row.criteria}</div>
                <div className="text-xs text-slate-500 mt-0.5">{row.note}</div>
              </div>
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 flex items-start gap-2 text-sm text-emerald-900 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <span><span className="font-normal text-emerald-800">TraceDon : </span>{row.tracedon.text}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-slate-50 p-2.5">
                  <div className="text-slate-500 mb-0.5">Don manuel</div>
                  <div className="text-slate-700 font-medium">{row.manual.text}</div>
                </div>
                <div className="rounded-lg bg-rose-50/60 p-2.5">
                  <div className="text-rose-700 mb-0.5">Détruire</div>
                  <div className="text-rose-800 font-medium">{row.destroy.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="hidden md:block mt-14 max-w-5xl mx-auto overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider">
                  <th scope="col" className="p-4 sm:p-5 text-slate-600 font-bold w-1/3">
                    Critères clés
                  </th>
                  <th scope="col" className="p-4 sm:p-5 text-rose-700 font-bold text-center w-1/5">
                    Détruire l'invendu
                  </th>
                  <th scope="col" className="p-4 sm:p-5 text-slate-600 font-bold text-center w-1/5">
                    Don Manuel (Sans outil)
                  </th>
                  <th scope="col" className="p-4 sm:p-5 text-emerald-900 font-bold text-center w-1/4 bg-emerald-50/70 border-l border-r border-emerald-200">
                    <span className="flex items-center justify-center gap-1.5">
                      <span>TraceDon</span>
                      <span className="text-xs font-sans font-semibold bg-emerald-700 text-white px-1.5 py-0.5 rounded">Recommandé</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 sm:p-5">
                      <div className="font-semibold text-slate-900 text-sm">{row.criteria}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{row.note}</div>
                    </td>

                    {/* Détruire */}
                    <td className="p-4 sm:p-5 text-center">
                      <div className="inline-flex items-center justify-center gap-1.5 text-xs text-rose-700">
                        <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                        <span className="font-medium">{row.destroy.text}</span>
                      </div>
                    </td>

                    {/* Don Manuel */}
                    <td className="p-4 sm:p-5 text-center">
                      <div className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-600">
                        {row.manual.status === 'warn' ? (
                          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                        ) : (
                          <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                        )}
                        <span className="font-medium">{row.manual.text}</span>
                      </div>
                    </td>

                    {/* TraceDon */}
                    <td className="p-4 sm:p-5 text-center bg-emerald-50/40 border-l border-r border-emerald-200">
                      <div className="inline-flex items-center justify-center gap-1.5 text-xs text-emerald-900 font-bold">
                        <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                        <span>{row.tracedon.text}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
