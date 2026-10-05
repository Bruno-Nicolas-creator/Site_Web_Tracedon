import { X } from 'lucide-react';
import { useFermetureModale } from '../hooks/useFermetureModale';

export type PageLegale = 'mentions' | 'confidentialite';

interface LegalModalProps {
  page: PageLegale | null;
  onClose: () => void;
}

// Informations à fournir par l'éditeur du site : tant qu'elles ne sont pas remplies,
// elles s'affichent en surbrillance pour ne pas être oubliées avant la mise en ligne.
function ACompleter({ children }: { children: string }) {
  return <mark className="bg-amber-100 text-amber-900 px-1 rounded">[À COMPLÉTER : {children}]</mark>;
}

function MentionsLegales() {
  return (
    <div className="space-y-5">
      <section className="space-y-1.5">
        <h4 className="font-bold text-slate-900">Éditeur du site</h4>
        <p>TraceDon SAS, société par actions simplifiée au capital de <ACompleter>capital social</ACompleter> €.</p>
        <p>Siège social : <ACompleter>adresse du siège</ACompleter></p>
        <p>RCS <ACompleter>ville d'immatriculation</ACompleter> · SIREN <ACompleter>numéro SIREN</ACompleter></p>
        <p>N° de TVA intracommunautaire : <ACompleter>numéro de TVA</ACompleter></p>
        <p>Contact : <a href="mailto:contact@tracedon.fr" className="underline">contact@tracedon.fr</a></p>
        <p>Directeur de la publication : <ACompleter>nom du représentant légal</ACompleter></p>
      </section>
      <section className="space-y-1.5">
        <h4 className="font-bold text-slate-900">Hébergeur</h4>
        <p><ACompleter>nom, adresse et téléphone de l'hébergeur</ACompleter></p>
      </section>
      <section className="space-y-1.5">
        <h4 className="font-bold text-slate-900">Propriété intellectuelle</h4>
        <p>L'ensemble des contenus de ce site (textes, visuels, logo) est la propriété de TraceDon SAS. Toute reproduction sans autorisation préalable est interdite.</p>
      </section>
      <section className="space-y-1.5">
        <h4 className="font-bold text-slate-900">Avertissement</h4>
        <p>Les informations juridiques et fiscales présentées sur ce site, ainsi que les résultats du simulateur, sont fournies à titre indicatif. Elles ne constituent pas un conseil juridique ou fiscal personnalisé et ne garantissent pas l'issue d'un contrôle de l'administration. Pour votre situation particulière, rapprochez-vous de votre expert-comptable ou de votre conseil.</p>
      </section>
    </div>
  );
}

function PolitiqueConfidentialite() {
  return (
    <div className="space-y-5">
      <section className="space-y-1.5">
        <h4 className="font-bold text-slate-900">Responsable du traitement</h4>
        <p>TraceDon SAS (coordonnées dans les mentions légales). Contact pour toute question sur vos données : <a href="mailto:contact@tracedon.fr" className="underline">contact@tracedon.fr</a>.</p>
      </section>
      <section className="space-y-1.5">
        <h4 className="font-bold text-slate-900">Données collectées</h4>
        <p>Lorsque vous demandez une démonstration, les informations que vous saisissez (nom, e-mail professionnel, téléphone, entreprise, fonction, volume d'invendus estimé, notes) sont placées dans un e-mail que vous envoyez vous-même depuis votre messagerie. Le site ne les enregistre pas et n'utilise ni cookie publicitaire ni outil de mesure d'audience.</p>
      </section>
      <section className="space-y-1.5">
        <h4 className="font-bold text-slate-900">Finalité et base légale</h4>
        <p>Ces données servent uniquement à répondre à votre demande de démonstration et à échanger avec vous sur nos services (mesures précontractuelles prises à votre demande). Elles ne sont ni vendues ni cédées à des tiers.</p>
      </section>
      <section className="space-y-1.5">
        <h4 className="font-bold text-slate-900">Durée de conservation</h4>
        <p>Les échanges avec un prospect sont conservés au maximum 3 ans après le dernier contact de votre part.</p>
      </section>
      <section className="space-y-1.5">
        <h4 className="font-bold text-slate-900">Vos droits</h4>
        <p>Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de limitation du traitement de vos données. Pour l'exercer, écrivez à <a href="mailto:contact@tracedon.fr" className="underline">contact@tracedon.fr</a>. Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).</p>
      </section>
    </div>
  );
}

export function LegalModal({ page, onClose }: LegalModalProps) {
  const fermerSurFond = useFermetureModale(page !== null, onClose, 'legal-modal-title');

  if (!page) return null;

  const titre = page === 'mentions' ? 'Mentions légales' : 'Politique de confidentialité';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200" onClick={fermerSurFond}>
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h3 id="legal-modal-title" className="text-base font-bold text-slate-900 font-display">
            {titre}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-sm text-slate-600 leading-relaxed">
          {page === 'mentions' ? <MentionsLegales /> : <PolitiqueConfidentialite />}
        </div>
      </div>
    </div>
  );
}
