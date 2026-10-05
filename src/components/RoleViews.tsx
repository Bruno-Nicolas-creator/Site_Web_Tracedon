import { useState } from 'react';
import { Building2, HeartHandshake, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

interface RoleViewsProps {
  onOpenDemo: () => void;
}

export function RoleViews({ onOpenDemo }: RoleViewsProps) {
  const [activeRole, setActiveRole] = useState<'enterprise' | 'association' | 'coordinator'>('enterprise');

  const roles = [
    {
      id: 'enterprise' as const,
      label: 'Entreprises & Enseignes',
      badge: 'Donateurs',
      icon: Building2,
      title: 'Simplifiez le quotidien de vos équipes quai et sécurisez la DAF.',
      features: [
        'Déclaration en 1 clic : scan EAN direct ou photo de listing traitée par vision IA',
        'Planning récurrent automatique : attribuez automatiquement vos dons du jour à votre association partenaire',
        'Attestations fiscales 238 bis pré-remplies et générées par exercice comptable'
      ]
    },
    {
      id: 'association' as const,
      label: 'Associations Caritatives',
      badge: 'Bénéficiaires',
      icon: HeartHandshake,
      title: 'Accédez à des gisements de dons qualifiés et conformes.',
      features: [
        'Place de marché géolocalisée : découvrez les dons alimentaires et matériels à proximité',
        'Dons matériels divisibles : sélectionnez uniquement les articles utiles à vos bénéficiaires',
        'Mandats bénévoles intégrés : autorisez vos bénévoles à signer électroniquement sur le quai'
      ]
    },
    {
      id: 'coordinator' as const,
      label: 'Coordinateurs & Réseaux',
      badge: 'Superviseurs',
      icon: Compass,
      title: 'Pilotez la conformité multi-sites et éliminez les dons orphelins.',
      features: [
        'Tableau de bord consolidé : tonnages donnés, taux de refus et impact CO2 évité',
        'Déblocage des dons orphelins : réassignation manuelle instantanée des dons sans preneur',
        'Veille conformité Loi Garot : alerte sur les magasins de plus de 400 m² sans partenaire habilité'
      ]
    }
  ];

  const currentRole = roles.find(r => r.id === activeRole) || roles[0];
  const Icon = currentRole.icon;

  return (
    <section id="reseau-associations" className="py-20 border-b border-slate-200 bg-slate-50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
            <Compass className="h-4 w-4 text-emerald-700" />
            <span>Un Écosystème Connecté</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 font-display text-balance">
            Une interface sur-mesure pour chaque acteur du don.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            TraceDon synchronise donateurs, associations d'aide alimentaire et superviseurs au sein d'une chaîne logistique et juridique unifiée.
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex p-1.5 bg-white border border-slate-200 rounded-xl gap-1 shadow-xs">
            {roles.map((r) => {
              const RoleIcon = r.icon;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setActiveRole(r.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                    activeRole === r.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <RoleIcon className="h-4 w-4" />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Role Card */}
        <div className="mt-10 max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                  {currentRole.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  {currentRole.title}
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenDemo}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors rounded-full flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
            >
              <span>Découvrir l'interface</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentRole.features.map((feature, fIdx) => (
              <div key={fIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
