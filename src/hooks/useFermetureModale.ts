import { useEffect, type MouseEvent } from 'react';

/**
 * Ferme une fenêtre modale avec la touche Échap, et renvoie le gestionnaire à poser
 * sur le fond sombre pour la fermer d'un clic à côté de la fenêtre.
 *
 * `idTitre` est l'id du titre de la fenêtre (son aria-labelledby) : quand deux fenêtres
 * sont empilées (ex. confidentialité ouverte depuis le formulaire de démo), Échap ne
 * ferme que celle du dessus, pour ne pas perdre le formulaire en cours de saisie.
 */
export function useFermetureModale(estOuverte: boolean, fermer: () => void, idTitre: string) {
  useEffect(() => {
    if (!estOuverte) return;
    const surTouche = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const fenetres = document.querySelectorAll('[role="dialog"][aria-modal="true"]');
      const dessus = fenetres[fenetres.length - 1];
      if (dessus?.getAttribute('aria-labelledby') === idTitre) fermer();
    };
    document.addEventListener('keydown', surTouche);
    return () => document.removeEventListener('keydown', surTouche);
  }, [estOuverte, fermer, idTitre]);

  // Ne ferme que si le clic tombe sur le fond lui-même, pas dans la fenêtre.
  return (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) fermer();
  };
}
