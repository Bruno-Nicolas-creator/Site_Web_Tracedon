import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Comment est calculée la réduction d’impôt de 60 % selon l'article 238 bis du CGI ?",
      a: "Pour un don à une association d’intérêt général, la réduction fiscale de 60 % s’applique sur le coût de revient hors taxes (prix d’achat pour un distributeur ou coût de fabrication pour un industriel), et non sur le prix de vente public. Ce montant est imputé directement sur votre impôt sur les sociétés (IS) de l’exercice, dans la limite de 20 000 € ou 0,5 % du chiffre d'affaires HT (avec report possible sur 5 ans). Par ailleurs, si le don est fait à une association reconnue d’utilité publique (RUP), la TVA déduite à l’achat n’a pas à être reversée : ces dons sont dispensés de régularisation."
    },
    {
      q: "Quel est l’impact opérationnel pour mes équipes de quai et de magasin ?",
      a: "TraceDon a été spécialement conçu pour le terrain : l’opération prend moins de 2 minutes. Les équipes peuvent scanner les codes-barres ou simplement photographier leur listing papier / ticket pour que l'IA extrait les lignes sans ressaisie. La double signature électronique s’effectue en direct sur smartphone ou tablette lors de l’enlèvement."
    },
    {
      q: "Pouvons-nous continuer à travailler avec nos associations partenaires habituelles ?",
      a: "Absolument. Vos associations partenaires historiques peuvent rejoindre TraceDon gratuitement en quelques minutes. TraceDon centralise leur numéro RNA, leur déclaration DDPP et leurs habilitations, pour que vous puissiez vérifier leur éligibilité avant de signer la convention."
    },
    {
      q: "Comment démarrer avec TraceDon ?",
      a: "TraceDon est une solution SaaS 100 % Cloud : aucun déploiement de serveur lourd n’est requis. Il suffit de créer le compte de l’établissement et d’inviter vos associations partenaires : la prise en main se fait directement depuis un navigateur, sur ordinateur, tablette ou smartphone."
    }
  ];

  return (
    <section className="py-20 border-b border-slate-200 bg-white relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
            <HelpCircle className="h-4 w-4 text-emerald-700" />
            <span>Foire Aux Questions Réglementaires & Techniques</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 font-display text-balance">
            Questions fréquentes sur TraceDon
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tout ce que les directeurs de magasins, directeurs financiers et juristes doivent savoir sur notre solution.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-sm sm:text-base text-slate-900">
                    {faq.q}
                  </span>
                  <div className={`p-1 rounded-md text-slate-500 transition-transform ${isOpen ? 'rotate-180 text-emerald-800' : ''}`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
