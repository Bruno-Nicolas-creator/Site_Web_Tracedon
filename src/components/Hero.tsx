import { useState } from 'react';
import { ArrowRight, FileCheck2, CheckCircle2, Barcode, PenTool, Receipt } from 'lucide-react';

interface HeroProps {
  onOpenDemo: () => void;
  onScrollToSimulator: () => void;
  onOpenAuditModal: () => void;
}

const ECRANS = [
  {
    id: 'declaration' as const,
    onglet: "1. Déclaration",
    icone: Barcode,
    titre: "Listez votre don en quelques secondes",
    texte: "Scannez les codes-barres, photographiez votre listing ou dictez : TraceDon structure les articles et vérifie chacun dans la base officielle RappelConso.",
    image: '/captures/declaration.png',
    alt: "Écran « Nouveau don » de TraceDon : liste de 13 articles avec leur quantité et leur poids",
  },
  {
    id: 'signature' as const,
    onglet: "2. Quai & signature",
    icone: PenTool,
    titre: "Le bon d'enlèvement, signé sur le quai",
    texte: "Le bénévole relève la quantité, la température et la DLC de chaque article, puis donateur et association signent avec DocuSign. Le bon est horodaté à la seconde près.",
    image: '/captures/bon-enlevement.png',
    alt: "Écran du bon d'enlèvement : contrôle de la quantité, de la température et de la DLC, puis signatures DocuSign",
  },
  {
    id: 'cerfa' as const,
    onglet: "3. Attestation fiscale",
    icone: Receipt,
    titre: "Vos attestations fiscales, prêtes à chaque période",
    texte: "TraceDon regroupe les bons d'enlèvement par association et par période, et prépare l'attestation fiscale (art. 238 bis du CGI) que l'association signe en ligne.",
    image: '/captures/attestations.png',
    alt: "Écran des archives : liste des attestations fiscales avec leur période et leur montant",
  },
];

export function Hero({ onOpenDemo, onScrollToSimulator, onOpenAuditModal }: HeroProps) {
  const [activeTab, setActiveTab] = useState<(typeof ECRANS)[number]['id']>('declaration');
  const ecranActif = ECRANS.find((e) => e.id === activeTab) ?? ECRANS[0];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-18 md:pb-28 bg-white border-b border-slate-200">
      {/* Subtle architectural background */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Institutional kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/90 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
            <span>Plateforme SaaS Legaltech & Fiscale du don d'invendus</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.12] font-display text-balance">
            Transformez vos invendus d'un <span className="text-amber-800 underline decoration-amber-300/80 decoration-2 underline-offset-4">risque légal</span> en un <span className="text-emerald-800 underline decoration-emerald-300/80 decoration-2 underline-offset-4">actif financier</span> automatisé.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
            Sécurisez votre conformité aux lois Garot & AGEC. Récupérez <strong className="font-semibold text-slate-900">60 % en réduction d'impôt (art. 238 bis du CGI)</strong> et n'ayez pas à reverser <strong className="font-semibold text-slate-900">la TVA déduite à l'achat</strong>. TraceDon constitue en 3 clics un dossier justificatif complet, prêt à présenter en cas de contrôle.
          </p>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onScrollToSimulator}
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 transition-all rounded-full shadow-xs flex items-center justify-center gap-2 group"
            >
              <span>Calculer mon gain fiscal</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 transition-all rounded-full shadow-xs flex items-center justify-center gap-2"
            >
              <span>Demander une démo</span>
            </button>
          </div>

          {/* Unboxed Proof Metadata */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              Réduction d'impôt art. 238 bis CGI
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              Scan anti-rappel RappelConso officiel
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              Signatures certifiées DocuSign eIDAS
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              Méthodologie Agribalyse ADEME
            </span>
          </div>
        </div>

        {/* Aperçu de l'application : vraies captures (comptes de démonstration, noms d'entreprises réelles masqués) */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3.5 gap-3">
            <span className="text-sm text-slate-700 font-semibold">L'application TraceDon en 3 écrans</span>

            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium" role="tablist" aria-label="Écrans de l'application">
              {ECRANS.map((ecran) => {
                const Icone = ecran.icone;
                const actif = activeTab === ecran.id;
                return (
                  <button
                    key={ecran.id}
                    type="button"
                    role="tab"
                    aria-selected={actif}
                    onClick={() => setActiveTab(ecran.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                      actif ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icone className="h-3.5 w-3.5" />
                    <span>{ecran.onglet}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 md:p-10 bg-white grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">{ecranActif.titre}</h3>
              <p className="text-base text-slate-600 leading-relaxed">{ecranActif.texte}</p>
              {ecranActif.id === 'cerfa' && (
                <button
                  type="button"
                  onClick={onOpenAuditModal}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm rounded-full transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <FileCheck2 className="h-4 w-4" />
                  <span>Voir un exemple de dossier justificatif</span>
                </button>
              )}
              <p className="text-xs text-slate-500">Capture réelle de l'application, avec des données de démonstration.</p>
            </div>

            {/* Cadre de téléphone */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-[240px] sm:w-[260px] rounded-[2.25rem] border-[9px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden">
                <img
                  key={ecranActif.id}
                  src={ecranActif.image}
                  alt={ecranActif.alt}
                  width={390}
                  height={844}
                  className="block w-full h-auto rounded-[1.6rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
