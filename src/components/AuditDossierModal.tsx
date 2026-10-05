import { useState } from 'react';
import { useFermetureModale } from '../hooks/useFermetureModale';
import { 
  X, 
  ShieldCheck, 
  FileCheck2, 
  CheckCircle2, 
  Lock, 
  Barcode, 
  Printer
} from 'lucide-react';

interface AuditDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuditDossierModal({ isOpen, onClose }: AuditDossierModalProps) {
  const [activeTab, setActiveTab] = useState<'cerfa' | 'bon' | 'sanitaire'>('cerfa');

  const fermerSurFond = useFermetureModale(isOpen, onClose, 'audit-modal-title');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200" onClick={fermerSurFond}>
      <div 
        className="relative w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 id="audit-modal-title" className="text-base font-bold text-slate-900 font-display">
                Exemple de dossier justificatif · TraceDon
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                REF : 2026-ATT-0042 · Document d'illustration
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-white px-6 pt-2 gap-2 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('cerfa')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'cerfa'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. Attestation Fiscale · N° Cerfa : 16216*03
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bon')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'bon'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            2. Bon d'Enlèvement Horodaté (DocuSign)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sanitaire')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'sanitaire'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            3. Contrôles sanitaires & association
          </button>
        </div>

        {/* Modal Content Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/60">
          {activeTab === 'cerfa' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span>Document officiel recevable par la Direction Générale des Finances Publiques (DGFiP).</span>
                </span>
                <span className="font-mono font-bold text-emerald-800">60 % DÉDUCTIBLE</span>
              </div>

              {/* Realistic Cerfa Visual Mock */}
              <div className="rounded-xl border border-slate-300 bg-white text-slate-900 p-6 sm:p-8 font-sans shadow-sm space-y-6">
                <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                  <div>
                    <div className="text-xs uppercase font-bold tracking-wider text-slate-500 font-mono">
                      RÉPUBLIQUE FRANÇAISE · MINISTÈRE DE L'ÉCONOMIE
                    </div>
                    <div className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                      REÇU AU TITRE DES DONS À CERTAINS ORGANISMES D'INTÉRÊT GÉNÉRAL
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Article 200 et 238 bis du Code Général des Impôts · N° Cerfa : 16216*03
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-slate-600 bg-slate-100 p-2.5 rounded border border-slate-200">
                    <div>Attestation N° : <strong>2026-ATT-0042</strong></div>
                    <div>Date : 03/10/2026</div>
                  </div>
                </div>

                {/* Parties */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-700 uppercase text-xs">Organisme Bénéficiaire :</div>
                    <div className="font-semibold text-slate-900 text-sm">Banque Alimentaire d'Île-de-France</div>
                    <div className="text-slate-600 font-mono">RNA : W751000842 · SIRET : 341 892 102 00014</div>
                    <div className="text-slate-600">Statut : Association reconnue d'utilité publique (Décret du 12/04/1988)</div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-700 uppercase text-xs">Entreprise Donatrice :</div>
                    <div className="font-semibold text-slate-900 text-sm">DISTRI-DISTRIB SAS (Hypermarché)</div>
                    <div className="text-slate-600 font-mono">SIRET : 419 823 104 00029 · Surface : 2 400 m²</div>
                    <div className="text-slate-600">Adresse : 14 Avenue des Commerces, 78140 Vélizy</div>
                  </div>
                </div>

                {/* Calculations */}
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Nature du don :</span>
                    <span className="font-medium text-slate-900">Don en nature d'invendus alimentaires consommables (84 enlèvements)</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1.5">
                    <span className="text-slate-600">Poids total cumulé déclaré :</span>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">12 450 kg</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1.5">
                    <span className="text-slate-600">Valeur de revient déclarée et vérifiée :</span>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">48 500,00 € HT</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1.5 text-slate-800">
                    <span className="text-slate-600">Montant en toutes lettres :</span>
                    <span className="font-semibold italic">Quarante-huit mille cinq cents euros</span>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded flex justify-between items-center text-sm font-bold text-emerald-950 mt-2">
                    <span>Réduction d'impôt imputable sur l'IS (60 %) :</span>
                    <span className="text-base font-mono text-emerald-800">29 100,00 €</span>
                  </div>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                  <div className="p-3 border border-slate-200 rounded text-center bg-slate-50">
                    <div className="text-xs text-slate-500 uppercase font-bold">Signature Électronique Certifiée</div>
                    <div className="font-bold text-slate-900 mt-1">Pour l'organisme bénéficiaire</div>
                    <div className="font-mono text-xs text-emerald-700 mt-2 font-medium">✓ Signé via DocuSign eIDAS</div>
                    <div className="text-[9px] text-slate-400 font-mono">ID: ds-99a2-1b84-4f2a</div>
                  </div>
                  <div className="p-3 border border-slate-200 rounded text-center bg-slate-50">
                    <div className="text-xs text-slate-500 uppercase font-bold">Sceau Numérique d'Inviolabilité</div>
                    <div className="font-mono text-slate-800 text-xs font-bold mt-1">TraceDon Vault #2026</div>
                    <div className="font-mono text-xs text-slate-500 mt-2">Horodatage : 03/10/2026 14:26:18 UTC</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bon' && (
            <div className="space-y-4">
              <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4 font-mono text-xs shadow-xs">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-slate-900 font-bold">BON D'ENLÈVEMENT QUAI N° BE-2026-0914</span>
                  <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">STATUT : SIGNÉ PAR LES DEUX PARTIES</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 font-sans">
                  <div>
                    <span className="text-slate-500">Heure de présentation : </span>
                    <span className="text-slate-900 font-semibold font-mono">14:15:02</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Heure de clôture quai : </span>
                    <span className="text-slate-900 font-semibold font-mono">14:26:18</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Température mesurée quai : </span>
                    <span className="text-emerald-800 font-bold font-mono">+3.8 °C (Chaîne du froid OK)</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Poids constaté au pont-bascule : </span>
                    <span className="text-slate-900 font-bold font-mono">142,5 kg</span>
                  </div>
                </div>

                <div className="mt-4 p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <div className="font-sans font-semibold text-slate-900">Articles contradictoirement vérifiés :</div>
                  <div className="space-y-1.5 text-slate-600 font-sans">
                    <div className="flex justify-between">
                      <span>• Yaourts Bio Fermiers (Lot Y482) - DLC J+2 - T° 3.6°C</span>
                      <span className="text-emerald-800 font-semibold">Accepté (48 unités)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Pain de mie multicéréales - DDM J+15</span>
                      <span className="text-emerald-800 font-semibold">Accepté (35 unités)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Plateau salades composées - DLC J+1 - T° 4.0°C</span>
                      <span className="text-emerald-800 font-semibold">Accepté (20 unités)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-950 text-xs font-sans">
                  <strong>Ordre de signature respecté :</strong> Le donateur a signé à 14:22:04, suivi par le bénévole mandaté de l'association à 14:26:18. Transfert de propriété documenté.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sanitaire' && (
            <div className="space-y-4">
              <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4 text-xs shadow-xs">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-slate-900 font-bold font-mono">AUDIT D'ÉLIGIBILITÉ SANITAIRE & ASSOCIATIVE</span>
                  <span className="text-slate-500 font-mono">CONTRÔLES À LA DÉCLARATION</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">Contrôle RappelConso (data.economie.gouv.fr)</div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        Comparaison de chaque article avec la base officielle des rappels de produits lors de sa déclaration.
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-semibold text-xs">
                      0 RAPPEL ACTIF
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">Habilitation DRAAF / DREETS Aide Alimentaire</div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        Habilitation à l'aide alimentaire (régionale ou nationale) en cours de validité.
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-semibold text-xs">
                      AGRÉMENT RÉGIONAL VALIDE
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">Déclaration Sanitaire DDPP & Chaîne du froid</div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        Déclaration DDPP et attestation chaîne du froid déposées par l'association dans son dossier.
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-semibold text-xs">
                      CONFORME DDPP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-slate-700" />
            <span>Tous ces éléments sont générés automatiquement par TraceDon lors de chaque opération de don.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-colors shadow-xs"
          >
            Fermer l'aperçu
          </button>
        </div>
      </div>
    </div>
  );
}
