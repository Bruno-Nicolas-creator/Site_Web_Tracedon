import { ArrowRight, ShieldCheck, Mail } from 'lucide-react';

interface CtaBannerProps {
  onOpenDemo: () => void;
  onScrollToSimulator: () => void;
}

export function CtaBanner({ onOpenDemo, onScrollToSimulator }: CtaBannerProps) {
  return (
    <section className="py-20 relative bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 sm:p-12 text-center space-y-8 shadow-xl text-white">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <span>TRACEDON · TRACEZ · SAUVEZ · VALORISEZ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white font-display text-balance">
            Cessez de payer pour détruire vos invendus.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Les lois AGEC et Garot sont en vigueur. Les contrôles s'intensifient. L'outil est prêt : transformez dès maintenant votre chaîne d'invendus en un actif financier sécurisé.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all rounded-full shadow-xs flex items-center justify-center gap-2 group"
            >
              <span>Demander une démo</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={onScrollToSimulator}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full transition-colors"
            >
              Calculer mon ROI en direct
            </button>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>Contact direct : <strong className="text-white">contact@tracedon.fr</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Conforme DGFiP · Loi AGEC · Loi Garot</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-semibold">tracedon.fr</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
