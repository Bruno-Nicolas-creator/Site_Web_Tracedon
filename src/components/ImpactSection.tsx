import { Scale, Leaf, Car, HeartHandshake } from 'lucide-react';

// Uniquement les indicateurs réellement calculés par l'application TraceDon (bon d'enlèvement,
// profil, tableau de bord du coordinateur) : pas de chiffre national ni d'équivalence non mesurée.
const INDICATEURS = [
  {
    icone: Scale,
    titre: 'Kilos sauvés de la benne',
    texte: "Le poids de chaque don, relevé sur le bon d'enlèvement au moment de la remise.",
  },
  {
    icone: Leaf,
    titre: 'CO₂ évité',
    texte: 'Calculé article par article avec les données ADEME (Agribalyse, via Impact CO₂).',
  },
  {
    icone: Car,
    titre: 'Équivalent en kilomètres de voiture',
    texte: "Pour rendre l'impact parlant pour vos équipes, vos clients et votre direction.",
  },
  {
    icone: HeartHandshake,
    titre: 'Dons remis aux associations',
    texte: 'Le nombre de dons réalisés, suivi mois par mois.',
  },
];

export function ImpactSection() {
  return (
    <section id="impact" className="py-20 border-b border-slate-200 bg-emerald-50/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 bg-white px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
            <Leaf className="h-4 w-4 text-emerald-700" />
            <span>Votre impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 font-display text-balance">
            Chaque don compte. TraceDon le mesure.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Un invendu donné, c'est de la nourriture ou un objet utile qui évite la benne, et les ressources qui ont servi à le produire qui ne sont pas perdues. Après chaque enlèvement, l'application calcule automatiquement l'impact de votre don : de quoi nourrir votre rapport RSE avec des chiffres mesurés plutôt qu'estimés.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {INDICATEURS.map(({ icone: Icone, titre, texte }) => (
            <div key={titre} className="rounded-2xl border border-emerald-200 bg-white p-6 space-y-3 shadow-xs">
              <div className="h-11 w-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Icone className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 font-display">{titre}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{texte}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-600 max-w-2xl mx-auto">
          Vos chiffres cumulés sont visibles dans votre profil, et ceux de tout le réseau dans le tableau de bord du coordinateur.
        </p>
      </div>
    </section>
  );
}
