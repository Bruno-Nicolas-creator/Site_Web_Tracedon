import { useState } from 'react';
import { 
  Barcode, 
  PenTool, 
  Receipt, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  FileCheck2,
  ChevronDown
} from 'lucide-react';

interface ThreeStepsWorkflowProps {
  onOpenAuditModal: () => void;
  onOpenDemo: () => void;
}

export function ThreeStepsWorkflow({ onOpenAuditModal, onOpenDemo }: ThreeStepsWorkflowProps) {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: '01',
      title: 'Déclaration Intelligente',
      subtitle: 'Entrepôt & Rayon',
      icon: Barcode,
      action: 'Scan code-barres ou extraction automatique par IA de vos listes de stocks et tickets papier.',
      security: 'Blocage instantané si le produit fait l’objet d’un rappel sanitaire officiel (interrogation de l’API d’État RappelConso).',
      details: [
        'Interrogation automatique d’Open Food Facts (désignation, poids, allergènes)',
        'Extraction par vision IA : photographiez vos bordereaux, les lignes sont structurées sans ressaisie',
        'Contrôle sanitaire en amont : aucun produit sous rappel ne peut franchir le quai',
        'Gestion des dons alimentaires et des dons matériels divisibles (mobilier, textile, tech)'
      ]
    },
    {
      num: '02',
      title: 'Traçabilité & Enlèvement',
      subtitle: 'Quai de chargement',
      icon: PenTool,
      action: 'Mise en relation avec des associations dont le dossier (RNA, habilitation, déclaration DDPP) a été vérifié par un coordinateur.',
      security: 'Double signature électronique DocuSign sur le quai. Poids réel constaté et horodatage figés définitivement.',
      details: [
        'Convention de don bilatérale signée en amont (préalable obligatoire)',
        'Vérification contradictoire : températures, DLC constatées et allergènes vérifiés',
        'Règle sanitaire stricte : si DLC dépassée, refus obligatoire côté association',
        'Le bon d’enlèvement est scellé à la seconde : plus aucune modification n’est possible'
      ]
    },
    {
      num: '03',
      title: 'Valorisation Fiscale',
      subtitle: 'Bureau & Expert-Comptable',
      icon: Receipt,
      action: 'Génération automatique de l’Attestation d’Intérêt Général et du N° Cerfa : 16216*03.',
      security: 'Dossier complet stocké dans un coffre-fort numérique, prêt à être présenté en cas de contrôle fiscal.',
      details: [
        'Calcul de la réduction de 60 % sur la valeur de revient, plafond annuel compris (art. 238 bis du CGI)',
        'Attestation fiscale avec montant écrit en toutes lettres signée par l’association',
        'Inventaire horodaté pour justifier la dispense de reversement de TVA',
        'Calcul des kilos de CO2 évités selon la méthodologie Agribalyse / ADEME'
      ]
    }
  ];

  return (
    <section id="parcours-automatise" className="py-20 border-b border-slate-200 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
            <Sparkles className="h-4 w-4 text-emerald-700" />
            <span>Comment ça marche</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 font-display text-balance">
            De l'entrepôt à la déclaration d'impôt, chaque étape laisse une preuve.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            En cas de contrôle, la protection du donateur repose sur sa bonne foi : réalité de la remise, éligibilité de l'association, valeur des marchandises. TraceDon constitue ces preuves au fil du don, en 3 étapes simples pour vos équipes.
          </p>
        </div>

        {/* Téléphone : onglets 1 · 2 · 3, une seule étape affichée à la fois */}
        <div className="mt-10 lg:hidden flex gap-2" role="tablist" aria-label="Étapes du parcours">
          {steps.map((step, idx) => {
            const isSelected = activeStep === idx + 1;
            return (
              <button
                key={step.num}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveStep(idx + 1)}
                className={`flex-1 rounded-xl border px-2 py-2.5 text-xs font-semibold transition-colors ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className="block text-sm">{idx + 1}</span>
                <span className="block mt-0.5">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* 3 Step Interactive Grid (ordinateur : 3 cartes côte à côte) */}
        <div className="mt-4 lg:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx + 1;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx + 1)}
                className={`cursor-pointer rounded-2xl border transition-all duration-200 p-6 sm:p-8 flex-col justify-between space-y-6 ${isSelected ? 'flex' : 'hidden lg:flex'} ${
                  isSelected
                    ? 'border-slate-900 bg-slate-50 shadow-md ring-1 ring-slate-900/10'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-semibold text-slate-400">
                      {step.num}
                    </span>
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center border ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-500">
                      {step.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 font-display mt-0.5">
                      {step.title}
                    </h3>
                  </div>

                  {/* Action Block */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Action opérationnelle
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {step.action}
                    </p>
                  </div>

                  {/* Security Shield Block */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-900 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                      La preuve produite
                    </span>
                    <p className="text-xs text-emerald-950 leading-relaxed">
                      {step.security}
                    </p>
                  </div>

                  {/* Détails repliés : seuls ceux de l'étape sélectionnée sont affichés,
                      pour ne pas allonger la page (surtout sur téléphone) */}
                  {isSelected && (
                    <ul className="space-y-2 pt-2 text-xs text-slate-600">
                      {step.details.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 text-right">
                  <button
                    type="button"
                    aria-expanded={isSelected}
                    className="text-xs text-slate-800 font-medium inline-flex items-center gap-1"
                  >
                    <span>{isSelected ? 'Détails affichés' : 'Voir les détails'}</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isSelected ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Step Focus Banner */}
        <div className="mt-12 max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-700" />
              <span>Coffre-fort documentaire & traçabilité complète</span>
            </div>
            <div className="text-xs text-slate-600">
              Chaque étape génère des preuves horodatées, prêtes à être présentées en cas de contrôle DGFiP, DGCCRF ou DDPP.
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenAuditModal}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-full transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <FileCheck2 className="h-3.5 w-3.5 text-slate-600" />
              <span>Voir un exemple de dossier</span>
            </button>
            <button
              type="button"
              onClick={onOpenDemo}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-colors shadow-xs"
            >
              Demander une démo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
