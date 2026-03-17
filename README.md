# ✈️ VoyageAI — Landing Page

Planificateur de voyage intelligent par IA.

---

## 🚀 Déployer en 5 minutes (gratuit)

### Prérequis
- Un compte GitHub (gratuit) → https://github.com
- Un compte Vercel (gratuit) → https://vercel.com

---

### Étape 1 — Installer sur ton Mac/PC

Ouvre le Terminal et copie ces commandes une par une :

```bash
# 1. Installe Node.js si pas déjà fait (https://nodejs.org)
# Vérifie avec :
node --version   # doit afficher v18+ ou v20+

# 2. Va dans le dossier du projet
cd voyageai-landing

# 3. Installe les dépendances
npm install

# 4. Teste en local
npm run dev
# → Ouvre http://localhost:5173 dans ton navigateur
# → Tu dois voir ta landing page 🎉
```

---

### Étape 2 — Mettre sur GitHub

```bash
# 1. Initialise Git
git init
git add .
git commit -m "🚀 VoyageAI landing page"

# 2. Crée un repo sur GitHub
#    → Va sur https://github.com/new
#    → Nom : voyageai-landing
#    → Privé ou Public → Crée

# 3. Connecte et pousse
git remote add origin https://github.com/TON_USERNAME/voyageai-landing.git
git branch -M main
git push -u origin main
```

---

### Étape 3 — Déployer sur Vercel (2 clics)

1. Va sur **https://vercel.com/new**
2. Clique **"Import Git Repository"**
3. Sélectionne **voyageai-landing**
4. Vercel détecte automatiquement Vite → clique **"Deploy"**
5. Attends 30 secondes...
6. 🎉 **Ton site est live !** → `https://voyageai-landing.vercel.app`

---

### Étape 4 — Nom de domaine personnalisé (optionnel, ~10€/an)

1. Achète un domaine sur **https://www.namecheap.com** (ex: `voyageai.app`)
2. Dans Vercel → Settings → Domains → Ajoute ton domaine
3. Vercel te donne les DNS à configurer → copie-les dans Namecheap
4. SSL automatique et gratuit ✅

---

## 📧 Connecter la capture d'emails

### Option A — ConvertKit (gratuit jusqu'à 10 000 abonnés)

1. Crée un compte sur **https://convertkit.com**
2. Crée un formulaire → récupère l'URL de l'API
3. Dans `Landing.jsx`, remplace la fonction `handleSubmit` :

```javascript
const handleSubmit = async () => {
  if (!email.includes("@")) return;
  try {
    await fetch("https://api.convertkit.com/v3/forms/VOTRE_FORM_ID/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: "VOTRE_API_KEY",
        email: email
      })
    });
    setSubmitted(true);
    setEmail("");
  } catch (e) { console.error(e) }
};
```

### Option B — Mailchimp (gratuit jusqu'à 500 abonnés)

Même principe avec l'API Mailchimp.

---

## 🔗 Configurer l'affiliation

Inscris-toi sur ces plateformes et remplace les IDs :

| Partenaire | Inscription | Commission | Délai |
|-----------|------------|------------|-------|
| **Travelpayouts** | https://travelpayouts.com | Agrège tout | 24h |
| **Booking.com** | https://www.booking.com/affiliate-program | 25-40% de leur com | 48h |
| **GetYourGuide** | https://partner.getyourguide.com | 8% | 24h |
| **Skyscanner** | https://partners.skyscanner.net | CPC ~0.30€ | 48h |
| **TheFork** | https://www.thefork.com/partners | ~3€/résa | 1 sem |

Dans `travel-app.jsx`, remplace `VOTRE_ID` par tes vrais IDs dans l'objet `AFFILIATES`.

---

## 📊 Analytics (gratuit)

Ajoute Plausible (respecte la vie privée, pas de cookies) :

1. Crée un compte sur **https://plausible.io** (gratuit 30 jours, puis 9€/mois)
2. Ajoute dans `index.html` avant `</head>` :

```html
<script defer data-domain="voyageai.app" src="https://plausible.io/js/script.js"></script>
```

Alternative 100% gratuite : **Umami** (https://umami.is) en self-hosted.

---

## 📁 Structure du projet

```
voyageai-landing/
├── index.html          ← Page HTML avec SEO + JSON-LD
├── package.json        ← Dépendances npm
├── vite.config.js      ← Config Vite
├── vercel.json         ← Config déploiement Vercel
├── .gitignore          ← Fichiers à ignorer
├── README.md           ← Ce fichier
└── src/
    ├── main.jsx        ← Point d'entrée React
    └── Landing.jsx     ← La landing page
```

---

## 🎯 Checklist de lancement

- [ ] Teste en local (`npm run dev`)
- [ ] Déploie sur Vercel
- [ ] Connecte un nom de domaine
- [ ] Configure ConvertKit pour les emails
- [ ] Inscris-toi aux programmes d'affiliation
- [ ] Ajoute les analytics
- [ ] Partage sur les réseaux sociaux
- [ ] Poste sur Product Hunt quand tu as 50+ inscrits

---

## 💡 Prochaines étapes

1. **Collecte 100 emails** → preuve de demande
2. **Connecte les APIs réelles** (Amadeus pour les vols, Booking API)
3. **Lance sur Product Hunt** → trafic gratuit massif
4. **Itère selon les retours** des premiers utilisateurs

Bon lancement ! 🚀
