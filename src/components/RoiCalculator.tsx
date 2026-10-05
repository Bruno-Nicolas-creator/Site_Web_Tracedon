import { useState, useId } from 'react';
import { 
  Calculator, 
  Leaf, 
  ArrowRight, 
  CheckCircle2, 
  Car
} from 'lucide-react';
import { IndustryType, IndustryConfig } from '../types';

interface RoiCalculatorProps {
  onOpenDemo: (prefilledNotes?: string) => void;
}

const INDUSTRIES: IndustryConfig[] = [
  {
    id: 'gms',
    label: 'Grande Distribution (GMS)',
    defaultStock: 250000,
    vatRate: 0.055,
    co2Factor: 2.8,
    destructionRate: 0.07,
    relevantLaw: 'Loi Garot (Surfaces > 400m²)',
    potentialSanction: 'Jusqu’à 0,1 % du CA annuel'
  },
  {
    id: 'non_alimentaire',
    label: 'Électronique, Bazar & Maison',
    defaultStock: 180000,
    vatRate: 0.20,
    co2Factor: 4.2,
    destructionRate: 0.09,
    relevantLaw: 'Loi AGEC (Zéro destruction neuf)',
    potentialSanction: '15 000 € par manquement constaté'
  },
  {
    id: 'textile',
    label: 'Textile, Habillement & Mode',
    defaultStock: 200000,
    vatRate: 0.20,
    co2Factor: 8.5,
    destructionRate: 0.10,
    relevantLaw: 'Loi AGEC (Zéro destruction neuf)',
    potentialSanction: '15 000 € par manquement constaté'
  },
  {
    id: 'agroalimentaire',
    label: 'Industrie Agroalimentaire',
    defaultStock: 400000,
    vatRate: 0.055,
    co2Factor: 3.1,
    destructionRate: 0.06,
    relevantLaw: 'Loi Garot (Surfaces > 400m²)',
    potentialSanction: 'Jusqu’à 0,1 % du CA annuel'
  },
  {
    id: 'restauration',
    label: 'Restauration Collective & Traiteurs',
    defaultStock: 80000,
    vatRate: 0.10,
    co2Factor: 2.5,
    destructionRate: 0.08,
    relevantLaw: 'Loi Garot (Surfaces > 400m²)',
    potentialSanction: 'Jusqu’à 0,1 % du CA annuel'
  }
];

export function RoiCalculator({ onOpenDemo }: RoiCalculatorProps) {
  const [selectedIndustryId, setSelectedIndustryId] = useState<IndustryType>('gms');
  const [costValue, setCostValue] = useState<number>(200000);

  const [chiffreAffaires, setChiffreAffaires] = useState<number>(50000000);

  const costInputId = useId();
  const caInputId = useId();

  const currentIndustry = INDUSTRIES.find(i => i.id === selectedIndustryId) || INDUSTRIES[0];

  // Calculations
  // Art. 238 bis CGI : réduction de 60 % (jusqu'à 2 M€ de dons par an), plafonnée chaque année
  // à 20 000 € ou 0,5 % du CA HT si ce montant est plus élevé ; l'excédent est reportable 5 ans.
  const reductionTheorique = Math.round(costValue * 0.60);
  const plafondAnnuel = Math.max(20000, Math.round(chiffreAffaires * 0.005));
  const taxReductionIS = Math.min(reductionTheorique, plafondAnnuel);
  const excedentReportable = reductionTheorique - taxReductionIS;
  // TVA déduite à l'achat que l'entreprise n'a pas à reverser : ce n'est pas un gain, elle n'entre pas dans le total.
  const vatRecovered = Math.round(costValue * currentIndustry.vatRate);
  const destructionSavings = Math.round(costValue * currentIndustry.destructionRate);
  const netDirectCashGain = taxReductionIS + destructionSavings;
  const co2AvoidedKg = Math.round(costValue * (currentIndustry.co2Factor / 10));
  const carKmEquivalent = Math.round(co2AvoidedKg * 5.2);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat('fr-FR').format(val);
  };

  const handleConsultantRequest = () => {
    const summary = `Simulation TraceDon (${currentIndustry.label}) : Valeur invendus ${formatCurrency(costValue)} , CA annuel HT ${formatCurrency(chiffreAffaires)} -> Réduction d'impôt IS estimée cette année : ${formatCurrency(taxReductionIS)} (excédent reportable : ${formatCurrency(excedentReportable)}), Économie benne : ${formatCurrency(destructionSavings)}, CO2 évité : ${formatNumber(co2AvoidedKg)} kg.`;
    onOpenDemo(summary);
  };

  return (
    <section id="simulateur-fiscal" className="py-20 border-b border-slate-200 bg-slate-50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
            <Calculator className="h-4 w-4 text-emerald-700" />
            <span>Simulateur Financier & Fiscal Interactif</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 font-display text-balance">
            Donner rapporte plus que détruire. Calculez combien.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Un invendu donné à une association éligible n'est plus une perte sèche : il nourrit ou équipe des personnes, réduit votre empreinte carbone, ouvre droit à une réduction d'impôt et vous évite les frais de destruction.
          </p>
        </div>

        {/* Les trois chiffres clés : fiscalité, TVA et impact carbone (ce dernier suit la valeur saisie plus bas) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 space-y-2">
            <div className="text-4xl font-semibold font-display text-amber-900 tabular-nums">60 %</div>
            <div className="font-bold text-slate-900">de réduction d'impôt sur les sociétés</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Calculée sur le prix de revient (pas le prix de vente), dans la limite d'un plafond annuel (art. 238 bis du CGI).
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 space-y-2">
            <div className="text-4xl font-semibold font-display text-emerald-900 tabular-nums">0 €</div>
            <div className="font-bold text-slate-900">de TVA à reverser</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Les dons aux associations éligibles sont dispensés de régularisation de la TVA déduite à l'achat.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-300 bg-emerald-100/60 p-5 space-y-2">
            <div className="flex items-baseline gap-2">
              <Leaf className="h-6 w-6 text-emerald-800 self-center" aria-hidden="true" />
              <span className="text-4xl font-semibold font-display text-emerald-900 tabular-nums">
                {co2AvoidedKg >= 1000 ? `${formatNumber(Math.round(co2AvoidedKg / 100) / 10)} t` : `${formatNumber(co2AvoidedKg)} kg`}
              </span>
            </div>
            <div className="font-bold text-slate-900">de CO₂ évités par an</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Estimation pour la valeur d'invendus saisie ci-dessous. Dans l'application, le calcul se fait don par don avec les données ADEME.
            </p>
          </div>
        </div>

        {/* Industry Selector Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              type="button"
              onClick={() => {
                setSelectedIndustryId(ind.id);
                setCostValue(ind.defaultStock);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedIndustryId === ind.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>

        {/* Simulator Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs text-emerald-800 uppercase font-semibold">
                  Paramètres de votre flux
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Valeur de revient annuelle des invendus
                </h3>
                <p className="text-xs text-slate-500">
                  Prix d'achat ou coût de fabrication hors marge commerciale (assiette légale art. 238 bis du CGI).
                </p>
              </div>

              {/* Slider & Number Display */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor={costInputId} className="text-xs text-slate-600 font-medium">Montant annuel HT</label>
                  <span className="text-2xl font-bold text-slate-900 tabular-nums">
                    {formatCurrency(costValue)}
                  </span>
                </div>
                <input
                  id={costInputId}
                  type="range"
                  min="20000"
                  max="1500000"
                  step="10000"
                  value={costValue}
                  onChange={(e) => setCostValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-800"
                  aria-label="Valeur de revient annuelle des invendus"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>20 000 €</span>
                  <span>500 000 €</span>
                  <span>1 500 000 €</span>
                </div>
              </div>

              {/* Chiffre d'affaires : sert au plafond de la réduction d'impôt */}
              <div className="space-y-1.5">
                <label htmlFor={caInputId} className="text-xs text-slate-600 font-medium">
                  Chiffre d'affaires annuel HT de l'entreprise
                </label>
                <div className="relative">
                  <input
                    id={caInputId}
                    type="text"
                    inputMode="numeric"
                    value={formatNumber(chiffreAffaires)}
                    // Affiché avec espaces (« 50 000 000 ») : on ne garde que les chiffres saisis.
                    onChange={(e) => setChiffreAffaires(Number(e.target.value.replace(/\D/g, '')) || 0)}
                    className="w-full pl-3 pr-8 py-2 text-sm rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">€</span>
                </div>
                <p className="text-xs text-slate-500">
                  Plafond annuel de la réduction : <strong className="text-slate-700">{formatCurrency(plafondAnnuel)}</strong> (20 000 € ou 0,5 % du CA HT si c'est plus).
                </p>
              </div>

              {/* Regulatory Badge Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Réglementation applicable :</span>
                  <strong className="text-slate-900 font-semibold">{currentIndustry.relevantLaw}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Risque de sanction administrative :</span>
                  <strong className="text-rose-700 font-semibold">{currentIndustry.potentialSanction}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Taux de TVA préservé :</span>
                  <strong className="text-slate-900 font-semibold">{formatNumber(currentIndustry.vatRate * 100)} %</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 leading-relaxed border-t border-slate-200">
              💡 <span className="text-slate-700 font-medium">TraceDon automatise le contrôle sanitaire (RappelConso), le bon d'enlèvement scellé et l'attestation fiscale officielle pour débloquer ces montants.</span>
            </div>
          </div>

          {/* Results Column (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                    Synthèse financière annuelle
                  </span>
                  <div className="text-sm text-slate-600">
                    Bénéfice net direct pour votre trésorerie
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Gain Financier Total</div>
                  <div className="text-3xl sm:text-4xl font-semibold text-emerald-800 tabular-nums">
                    {formatCurrency(netDirectCashGain)}
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown Rows */}
              <div className="mt-6 space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                      <span>Réduction d'Impôt IS (60 % art. 238 bis CGI)</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {excedentReportable > 0
                        ? `Plafonnée cette année ; ${formatCurrency(excedentReportable)} reportables sur les 5 exercices suivants, dans la même limite annuelle`
                        : 'Imputable sur votre impôt sur les sociétés de l\'exercice'}
                    </div>
                  </div>
                  <span className="text-base font-bold text-emerald-800 tabular-nums">
                    +{formatCurrency(taxReductionIS)}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                      <span>Économie sur coûts de destruction & bennes</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Suppression des frais de collecte déchets, incinération et enfouissement (~{formatNumber(Math.round(currentIndustry.destructionRate * 100))} %)
                    </div>
                  </div>
                  <span className="text-base font-bold text-emerald-800 tabular-nums">
                    +{formatCurrency(destructionSavings)}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                      <span>TVA déduite à l'achat, à ne pas reverser</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Dispense de régularisation pour les dons aux associations éligibles. Ce n'est pas un gain : non inclus dans le total.
                    </div>
                  </div>
                  <span className="text-base font-bold text-slate-500 tabular-nums">
                    {formatCurrency(vatRecovered)}
                  </span>
                </div>
              </div>

              {/* Ecological & ESG Metric */}
              <div className="mt-4 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-emerald-950">
                      Impact Carbone Évité (ADEME Agribalyse)
                    </div>
                    <div className="text-xs text-emerald-800">
                      Données RSE prêtes à reprendre dans votre déclaration extra-financière CSRD
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-emerald-900 tabular-nums">
                    {formatNumber(co2AvoidedKg)} kg CO2e
                  </div>
                  <div className="text-xs text-emerald-700 flex items-center justify-end gap-1">
                    <Car className="h-3 w-3" />
                    <span>~{formatNumber(carKmEquivalent)} km auto</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Estimation indicative, hors conseil fiscal. Taux de 60 % applicable jusqu'à 2 M€ de dons par an (au-delà, 40 %, sauf dons aux organismes d'aide alimentaire). Les économies de destruction et l'impact carbone sont des moyennes sectorielles.
            </p>

            {/* CTAs */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleConsultantRequest}
                className="w-full sm:flex-1 py-3 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors rounded-full flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Demander une démo avec ma simulation</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
