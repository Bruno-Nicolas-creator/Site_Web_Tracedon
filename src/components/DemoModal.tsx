import { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { DemoRequest } from '../types';
import type { PageLegale } from './LegalModal';
import { useFermetureModale } from '../hooks/useFermetureModale';

const EMAIL_CONTACT = 'contact@tracedon.fr';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledNotes?: string;
  onOpenLegal: (page: PageLegale) => void;
}

export function DemoModal({ isOpen, onClose, prefilledNotes, onOpenLegal }: DemoModalProps) {
  const [formData, setFormData] = useState<DemoRequest>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    role: 'DAF / Direction Financière',
    inventoryEstimated: '150 000 € à 500 000 € / an',
    notes: prefilledNotes || ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledNotes) {
      setFormData(prev => ({ ...prev, notes: prefilledNotes }));
    }
  }, [prefilledNotes]);

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };
  const fermerSurFond = useFermetureModale(isOpen, handleResetAndClose, 'demo-modal-title');

  if (!isOpen) return null;

  // Le site n'a pas de serveur : la demande est transmise via un e-mail pré-rempli
  // que le visiteur envoie lui-même depuis sa messagerie.
  const lienEmail = () => {
    const sujet = `Demande de démo TraceDon – ${formData.company}`;
    const corps = [
      `Nom : ${formData.fullName}`,
      `E-mail : ${formData.email}`,
      `Téléphone : ${formData.phone}`,
      `Entreprise : ${formData.company}`,
      `Fonction : ${formData.role}`,
      `Volume annuel d'invendus estimé : ${formData.inventoryEstimated}`,
      `Notes : ${formData.notes || '–'}`,
    ].join('\n');
    return `mailto:${EMAIL_CONTACT}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = lienEmail();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200" onClick={fermerSurFond}>
      <div 
        className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 id="demo-modal-title" className="text-base font-bold text-slate-900 font-display">
                Demander une démo TraceDon
              </h3>
              <p className="text-xs text-slate-500">
                Audit personnalisé de votre conformité et simulation fiscale en 20 min
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto h-14 w-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900 font-display">
                  Plus qu'une étape : envoyez l'e-mail
                </h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Votre messagerie vient de s'ouvrir avec votre demande déjà rédigée. Cliquez sur <strong>« Envoyer »</strong> pour nous la transmettre : nous revenons vers vous dès réception.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs space-y-1.5 text-slate-600">
                Votre messagerie ne s'est pas ouverte ?{' '}
                <a href={lienEmail()} className="text-slate-900 font-semibold underline">Réessayer</a>
                {' '}ou écrivez-nous directement à{' '}
                <a href={`mailto:${EMAIL_CONTACT}`} className="text-slate-900 font-semibold underline">{EMAIL_CONTACT}</a>.
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-colors mt-2 shadow-xs"
              >
                Retour au site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">
                    Nom & Prénom <span className="text-emerald-700">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Marc Dubois"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">
                    Email professionnel <span className="text-emerald-700">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="m.dubois@entreprise.fr"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">
                    Téléphone <span className="text-emerald-700">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="06 12 34 56 78"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">
                    Entreprise / Enseigne <span className="text-emerald-700">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Ex: Hyper U, Monoprix, Decathlon..."
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">
                    Votre fonction
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="DAF / Direction Financière">DAF / Direction Financière</option>
                    <option value="Directeur de Magasin">Directeur de Magasin</option>
                    <option value="Responsable RSE / Qualité">Responsable RSE / Qualité</option>
                    <option value="Responsable Logistique & Quai">Responsable Logistique & Quai</option>
                    <option value="Dirigeant / Propriétaire">Dirigeant / Propriétaire</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">
                    Volume annuel d'invendus (est.)
                  </label>
                  <select
                    value={formData.inventoryEstimated}
                    onChange={(e) => setFormData({ ...formData, inventoryEstimated: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="< 50 000 € / an">&lt; 50 000 € / an</option>
                    <option value="50 000 € à 150 000 € / an">50 000 € à 150 000 € / an</option>
                    <option value="150 000 € à 500 000 € / an">150 000 € à 500 000 € / an</option>
                    <option value="> 500 000 € / an">&gt; 500 000 € / an (Multi-sites)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  Notes ou contexte particulier
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ex: Nous souhaitons remplacer notre gestion papier et automatiser la convention avec nos associations locales..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 resize-none"
                />
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
                <span>
                  Vos informations servent uniquement à répondre à votre demande.{' '}
                  <button type="button" onClick={() => onOpenLegal('confidentialite')} className="underline font-semibold">
                    Politique de confidentialité
                  </button>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors rounded-full shadow-xs flex items-center justify-center gap-2 "
              >
                <span>Préparer l'e-mail de ma demande</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
