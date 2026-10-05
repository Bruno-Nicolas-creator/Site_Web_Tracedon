// Refait les captures d'écran de l'application TraceDon affichées dans l'accroche du site.
//
// Prérequis : l'application TraceDon (Dons Invendus) tourne en local sur http://localhost:3000
// et Google Chrome est installé. Lancement : npm run captures
//
// Le script ne fait que naviguer avec les comptes de démonstration (aucune création, aucune
// signature). Attention : la base locale est celle de la production, il ne faut donc jamais
// ajouter ici de clic sur un bouton qui modifie des données (« Publier », « Valider », « Signer »...).
//
// Les noms d'entreprises réelles présents dans les données de démo sont remplacés à l'image
// (voir MASQUES) : la base n'est pas modifiée. Relire chaque capture avant de la publier.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const APP = process.env.APP_URL ?? 'http://localhost:3000';
const SORTIE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'captures');
const PORT = 9333;

// Écrans capturés. `defilerPx` fait défiler la page avant la capture, `cliquer` clique sur
// l'onglet portant exactement ce texte. L'identifiant du bon d'enlèvement vient des données
// de démo : s'il n'existe plus, en choisir un autre (bouton « Voir le bon d'enlèvement » du
// compte association, page /dons).
const ECRANS = [
  { compte: 'carrefour@exemple.fr', url: '/', fichier: 'declaration.png', defilerPx: 560 },
  { compte: 'coeur@exemple.fr', url: '/bon-enlevement/cmud0nool0001kynkunyv1h5a', fichier: 'bon-enlevement.png' },
  { compte: 'carrefour@exemple.fr', url: '/archives', fichier: 'attestations.png', cliquer: 'Attestations fiscales' },
];

// Noms réels remplacés à l'image (la base n'est pas modifiée).
const MASQUES = [
  ['Carrefour City Nice Masséna', 'Supermarché du Centre'],
  ['Carrefour City', 'Supermarché du Centre'],
  ['Carrefour', 'Supermarché'],
  ['2026-TEST-ATT-1', '2026-0139'],
  ['TEST-ATT-1', '0139'],
];

fs.mkdirSync(SORTIE, { recursive: true });
const profil = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-captures-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profil}`, '--no-first-run', 'about:blank']);
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

// Pilotage de Chrome par son protocole de débogage (sans dépendance supplémentaire).
let ws;
let id = 0;
const enAttente = new Map();
function cdp(method, params = {}) {
  return new Promise((resolve, reject) => {
    const n = ++id;
    enAttente.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params }));
  });
}
async function evaluer(expr) {
  const r = await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 300));
  return r.result.value;
}
async function aller(url) {
  await cdp('Page.navigate', { url });
  for (let i = 0; i < 60; i++) {
    await attendre(500);
    try {
      if ((await evaluer('document.readyState')) === 'complete') break;
    } catch {}
  }
  await attendre(2500);
}

try {
  let cible;
  for (let i = 0; i < 40 && !cible; i++) {
    await attendre(500);
    try {
      cible = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === 'page');
    } catch {}
  }
  if (!cible) throw new Error('Chrome ne répond pas : vérifier CHROME_PATH.');
  ws = new WebSocket(cible.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && enAttente.has(d.id)) {
      const p = enAttente.get(d.id);
      enAttente.delete(d.id);
      d.error ? p.reject(new Error(d.error.message)) : p.resolve(d.result);
    }
  };
  await cdp('Page.enable');
  await cdp('Network.enable');
  // Format téléphone, en double densité pour une image nette.
  await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

  let compteActuel = null;
  for (const e of ECRANS) {
    if (e.compte !== compteActuel) {
      // En local, le mot de passe des comptes de démo est pré-rempli sur la page de connexion.
      await cdp('Network.clearBrowserCookies');
      await aller(`${APP}/connexion`);
      await evaluer(`(() => {
        const champ = document.getElementById('email');
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(champ, ${JSON.stringify(e.compte)});
        champ.dispatchEvent(new Event('input', { bubbles: true }));
        champ.form.requestSubmit();
      })()`);
      for (let i = 0; i < 40; i++) {
        await attendre(500);
        if ((await evaluer('location.pathname').catch(() => '/connexion')) !== '/connexion') break;
      }
      compteActuel = e.compte;
    }
    await aller(APP + e.url);
    if (e.cliquer) {
      await evaluer(`(() => { const bouton = [...document.querySelectorAll('button,a,[role=tab]')].find(x => x.innerText.trim() === ${JSON.stringify(e.cliquer)}); bouton?.click(); })()`);
      await attendre(2000);
    }
    const texte = await evaluer(`(() => {
      // Masque les outils de développement (indicateur Next.js, sélecteur de profil de test).
      const style = document.createElement('style');
      style.textContent = 'nextjs-portal{display:none!important} .fixed.bottom-20.right-3{display:none!important}';
      document.head.appendChild(style);
      const masques = ${JSON.stringify(MASQUES)};
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = w.nextNode())) {
        let t = n.nodeValue;
        for (const [a, b] of masques) t = t.split(a).join(b);
        if (/^\\d{20,}\\.jpg$/.test(t.trim())) t = 'liste-du-jour.jpg';
        n.nodeValue = t;
      }
      window.scrollTo(0, ${e.defilerPx || 0});
      return document.body.innerText.slice(0, 1500);
    })()`);
    await attendre(800);
    const img = await cdp('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(SORTIE, e.fichier), Buffer.from(img.data, 'base64'));
    // Le texte affiché sert à relire rapidement ce que contient chaque capture.
    console.log(`== ${e.fichier} (${APP}${e.url})\n${texte.replace(/\n+/g, ' | ')}\n`);
  }
} finally {
  try {
    ws?.close();
  } catch {}
  chrome.kill();
  try {
    fs.rmSync(profil, { recursive: true, force: true });
  } catch {}
}
