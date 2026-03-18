import { useState, useEffect, useRef, useCallback } from "react";

const DESTINATIONS = [
  { city: "Barcelone", emoji: "🇪🇸", gradient: "linear-gradient(135deg,#E8553D,#F4A742)", tag: "Gaudí, Tapas, Plage" },
  { city: "Tokyo", emoji: "🇯🇵", gradient: "linear-gradient(135deg,#D81B60,#F8BBD0)", tag: "Temples, Sushi, Néon" },
  { city: "New York", emoji: "🇺🇸", gradient: "linear-gradient(135deg,#1565C0,#E53935)", tag: "Broadway, Pizza, Skyline" },
  { city: "Marrakech", emoji: "🇲🇦", gradient: "linear-gradient(135deg,#E65100,#FFB74D)", tag: "Souks, Riads, Désert" },
  { city: "Bali", emoji: "🇮🇩", gradient: "linear-gradient(135deg,#00695C,#4DB6AC)", tag: "Rizières, Surf, Temples" },
  { city: "Rome", emoji: "🇮🇹", gradient: "linear-gradient(135deg,#2E7D32,#C62828)", tag: "Colisée, Pasta, Vespa" },
  { city: "Lisbonne", emoji: "🇵🇹", gradient: "linear-gradient(135deg,#1565C0,#FDD835)", tag: "Tram, Pastéis, Fado" },
  { city: "Dubaï", emoji: "🇦🇪", gradient: "linear-gradient(135deg,#C6A600,#1A1A1A)", tag: "Luxe, Désert, Skyline" },
  { city: "Bangkok", emoji: "🇹🇭", gradient: "linear-gradient(135deg,#FF6F00,#E040FB)", tag: "Street food, Temples, Night" },
  { city: "Phuket", emoji: "🇹🇭", gradient: "linear-gradient(135deg,#00BCD4,#006064)", tag: "Plages, Îles, Plongée" },
  { city: "Kuala Lumpur", emoji: "🇲🇾", gradient: "linear-gradient(135deg,#FFD600,#0D47A1)", tag: "Tours, Street food, Culture" },
  { city: "Los Angeles", emoji: "🇺🇸", gradient: "linear-gradient(135deg,#FF8F00,#E91E63)", tag: "Hollywood, Surf, Sunset" },
  { city: "Londres", emoji: "🇬🇧", gradient: "linear-gradient(135deg,#1A237E,#C62828)", tag: "Pubs, Musées, Camden" },
  { city: "Marbella", emoji: "🇪🇸", gradient: "linear-gradient(135deg,#F57F17,#00897B)", tag: "Beach clubs, Luxe, Tapas" },
  { city: "Istanbul", emoji: "🇹🇷", gradient: "linear-gradient(135deg,#C62828,#ECEFF1)", tag: "Bosphore, Bazars, Kebab" },
  { city: "Amsterdam", emoji: "🇳🇱", gradient: "linear-gradient(135deg,#FF6F00,#1565C0)", tag: "Canaux, Vélos, Musées" },
  { city: "Cancún", emoji: "🇲🇽", gradient: "linear-gradient(135deg,#00BFA5,#FFD600)", tag: "Cenotes, Plage, Maya" },
  { city: "Rio de Janeiro", emoji: "🇧🇷", gradient: "linear-gradient(135deg,#2E7D32,#FFD600)", tag: "Samba, Plages, Cristo" },
  { city: "Mykonos", emoji: "🇬🇷", gradient: "linear-gradient(135deg,#1565C0,#FFFFFF)", tag: "Cyclades, Fêtes, Soleil" },
  { city: "Séoul", emoji: "🇰🇷", gradient: "linear-gradient(135deg,#D81B60,#1A237E)", tag: "K-pop, BBQ, Palais" },
];

const FEATURES = [
  { icon: "🤖", title: "IA personnalisée", desc: "Recommandations adaptées aux goûts de chaque voyageur — culture, gastronomie, aventure ou détente" },
  { icon: "👥", title: "Multi-voyageurs", desc: "Gérez les préférences de chaque membre du groupe — régime alimentaire, budget, intérêts" },
  { icon: "📅", title: "Planning jour par jour", desc: "Organisez activités, restaurants, bars et hôtels dans un planificateur visuel par journée" },
  { icon: "💰", title: "Budget intelligent", desc: "Suivi en temps réel des dépenses par voyageur avec alertes et graphiques de répartition" },
  { icon: "🍽️", title: "Catalogue riche", desc: "30+ lieux par destination : activités, restaurants étoilés, bars cachés, hôtels de rêve" },
  { icon: "🤝", title: "Conciergerie voyage", desc: "Un expert négocie et réserve tout pour vous — jusqu'à -15% sur les meilleurs tarifs" },
];

const TESTIMONIALS = [
  { name: "Marie L.", city: "Paris", text: "On a planifié notre voyage à Bali en 20 minutes au lieu de 3 soirées. Les suggestions étaient parfaites pour notre groupe.", stars: 5 },
  { name: "Thomas R.", city: "Lyon", text: "L'agent nous a trouvé un hôtel 30% moins cher que ce qu'on avait trouvé nous-mêmes. Le service vaut largement les 8%.", stars: 5 },
  { name: "Sofia M.", city: "Bruxelles", text: "Enfin une app qui comprend que dans un groupe, tout le monde n'a pas les mêmes envies. Le budget tracker est génial.", stars: 5 },
  { name: "Karim B.", city: "Bordeaux", text: "Les recommandations sponsorisées étaient honnêtes — le restaurant à Marrakech était incroyable. Aucun piège à touristes.", stars: 4 },
];

const FAQS = [
  { q: "C'est vraiment gratuit ?", a: "Oui, la version gratuite permet de planifier un voyage pour 3 voyageurs avec toutes les fonctionnalités de base. Le Premium débloque les voyageurs illimités, l'export PDF et les suggestions IA avancées." },
  { q: "Comment gagnez-vous de l'argent ?", a: "Nous touchons des commissions d'affiliation quand vous réservez via nos partenaires (Booking.com, GetYourGuide, Skyscanner). Le prix est identique pour vous — on est rémunéré par le partenaire, pas par vous." },
  { q: "Les recommandations sont-elles fiables ?", a: "Nos recommandations sont basées sur les avis réels et vos préférences. Les contenus sponsorisés sont clairement identifiés avec un badge doré." },
  { q: "Puis-je utiliser l'app pour un groupe ?", a: "C'est exactement pour ça qu'elle est conçue ! Chaque voyageur a son profil avec ses préférences, et l'IA adapte les suggestions en conséquence." },
  { q: "Comment fonctionne le service conciergerie ?", a: "Cliquez sur 'Réserver avec un expert', un agent dédié vous contacte sous 2h. Il négocie les tarifs et finalise toutes vos réservations. Commission de 8% uniquement si vous êtes satisfait." },
];

/* ═══ FADE-IN WITH INTERSECTION OBSERVER ═══ */
function FI({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `all .8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══ LEGAL MODAL ═══ */
function LegalModal({ type, onClose }) {
  const content = {
    mentions: {
      title: "Mentions légales",
      body: `Éditeur du site : VoyageAI\nSite hébergé par : Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA\n\nDirecteur de la publication : Chafik Oubouragaa\nContact : contact@voyageai.app\n\nConformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site VoyageAI l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.`,
    },
    privacy: {
      title: "Politique de confidentialité",
      body: `VoyageAI s'engage à protéger vos données personnelles conformément au RGPD.\n\nDonnées collectées :\n• Adresse email (inscription à la liste d'attente)\n• Préférences de voyage (utilisation de l'application)\n\nFinalité : Fournir un service de planification de voyage personnalisé et communiquer sur les mises à jour du produit.\n\nBase légale : Consentement (inscription volontaire).\n\nConservation : Vos données sont conservées tant que votre compte est actif. Vous pouvez demander leur suppression à tout moment.\n\nHébergement : Les données sont hébergées par Vercel (USA) et ConvertKit (USA) sous garanties adéquates.\n\nVos droits : Accès, rectification, suppression, portabilité, opposition. Contact : contact@voyageai.app\n\nCookies : Ce site n'utilise pas de cookies de tracking. Aucune donnée n'est partagée avec des tiers à des fins publicitaires.`,
    },
    cgu: {
      title: "Conditions Générales d'Utilisation",
      body: `En utilisant VoyageAI, vous acceptez les présentes conditions.\n\nObjet : VoyageAI est un outil de planification de voyage assisté par intelligence artificielle. Les recommandations sont fournies à titre indicatif.\n\nCompte : L'inscription est gratuite. Vous êtes responsable de la confidentialité de vos identifiants.\n\nContenu : Les prix, horaires et disponibilités affichés sont indicatifs et peuvent varier. VoyageAI ne garantit pas l'exactitude des informations en temps réel.\n\nAffiliation : Certains liens renvoient vers des partenaires (Booking.com, GetYourGuide, etc.). Les prix affichés sont identiques à ceux du site partenaire.\n\nContenus sponsorisés : Les recommandations sponsorisées sont clairement identifiées par un badge doré.\n\nResponsabilité : VoyageAI ne saurait être tenu responsable des réservations effectuées via des sites tiers.\n\nModification : Ces CGU peuvent être mises à jour. La date de dernière modification sera indiquée.\n\nDroit applicable : Droit français. Tribunal compétent : Paris.`,
    },
    contact: {
      title: "Contact",
      body: `Pour toute question, suggestion ou demande :\n\n📧 Email : contact@voyageai.app\n\n🐦 Twitter/X : @voyageai_app\n\n📸 Instagram : @voyageai\n\nTemps de réponse moyen : 24-48h\n\nPour les demandes relatives à vos données personnelles (RGPD), merci de préciser "RGPD" dans l'objet de votre message.`,
    },
  };
  const c = content[type];
  if (!c) return null;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", backdropFilter: "blur(8px)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#1A1816", borderRadius: 22, padding: "28px 24px", maxWidth: 560, width: "100%", maxHeight: "85vh", overflowY: "auto", border: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontFamily: IS, fontSize: 24, color: "#F5F2ED" }}>{c.title}</h2>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.08)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#999", fontSize: 16 }}>✕</button>
        </div>
        <div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.8, whiteSpace: "pre-line" }}>{c.body}</div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [yearly, setYearly] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  }, [scrollY]);

  const scrollToEmail = useCallback(() => {
    const hero = document.getElementById("hero-email");
    if (hero) hero.scrollIntoView({ behavior: "smooth", block: "center" });
    setMenuOpen(false);
  }, []);

  const handleSubmit = async () => {
    if (!email.includes("@")) return;
    try {
      await fetch("https://api.convertkit.com/v3/forms/9216002/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: "B5FBOzmpHUNVhMmY4FQsYQ", email })
      });
    } catch(e) {}
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div style={S.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0 }
        body { background: #0C0A08; overflow-x: hidden }
        ::selection { background: #2D6A4F55; color: #fff }
        ::-webkit-scrollbar { width: 6px }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px }
        html { scroll-behavior: smooth }
        @keyframes float { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(-12px) } }
        @keyframes pulse { 0%,100% { opacity: .6 } 50% { opacity: 1 } }
        @keyframes grain { 0% { transform: translate(0,0) } 10% { transform: translate(-5%,-10%) } 20% { transform: translate(-15%,5%) } 30% { transform: translate(7%,-25%) } 40% { transform: translate(-5%,25%) } 50% { transform: translate(-15%,10%) } 60% { transform: translate(15%,0%) } 70% { transform: translate(0%,15%) } 80% { transform: translate(3%,35%) } 90% { transform: translate(-10%,10%) } 100% { transform: translate(0,0) } }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .hamburger { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* ═══ GRAIN OVERLAY ═══ */}
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", opacity: .035, background: "url('data:image/svg+xml,<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noise)\"/></svg>')", animation: "grain 8s steps(10) infinite" }} />

      {/* ═══ NAV ═══ */}
      <nav style={{ ...S.nav, background: scrollY > 50 ? "rgba(12,10,8,.92)" : "transparent", backdropFilter: scrollY > 50 ? "blur(20px)" : "none", borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
        <div style={S.navInner}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#2D6A4F,#52B788)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 16, fontWeight: 800 }}>V</span></div>
            <span style={{ fontFamily: IS, fontSize: 22, color: "#F5F2ED" }}>VoyageAI</span>
          </div>

          {/* Desktop nav */}
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a href="#features" style={S.navLink}>Fonctionnalités</a>
            <a href="#destinations" style={S.navLink}>Destinations</a>
            <a href="#pricing" style={S.navLink}>Tarifs</a>
            <a href="#faq" style={S.navLink}>FAQ</a>
            <button onClick={scrollToEmail} style={S.navCta}>Commencer — Gratuit</button>
          </div>

          {/* Hamburger button */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <span style={{ width: 22, height: 2, background: "#F5F2ED", borderRadius: 2, transition: "all .3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <span style={{ width: 22, height: 2, background: "#F5F2ED", borderRadius: 2, transition: "all .3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 22, height: 2, background: "#F5F2ED", borderRadius: 2, transition: "all .3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>

        {/* Mobile menu */}
        <div className="mobile-menu" style={{ display: menuOpen ? "flex" : "none", flexDirection: "column", gap: 16, padding: "16px 24px 24px", background: "rgba(12,10,8,.96)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <a href="#features" onClick={() => setMenuOpen(false)} style={{ ...S.navLink, fontSize: 15 }}>Fonctionnalités</a>
          <a href="#destinations" onClick={() => setMenuOpen(false)} style={{ ...S.navLink, fontSize: 15 }}>Destinations</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} style={{ ...S.navLink, fontSize: 15 }}>Tarifs</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} style={{ ...S.navLink, fontSize: 15 }}>FAQ</a>
          <button onClick={scrollToEmail} style={{ ...S.navCta, width: "100%", padding: "12px 0" }}>Commencer — Gratuit</button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={S.hero}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 20%, rgba(45,106,79,.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(82,183,136,.06) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", top: "15%", left: "8%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,106,79,.08) 0%, transparent 70%)", animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,85,61,.06) 0%, transparent 70%)", animation: "float 6s ease-in-out infinite 2s" }} />

        <div style={S.heroContent}>
          <FI><div style={{ display: "inline-block", background: "rgba(45,106,79,.15)", border: "1px solid rgba(45,106,79,.25)", borderRadius: 30, padding: "6px 18px", fontSize: 12, color: "#52B788", fontWeight: 600, letterSpacing: .5, marginBottom: 24 }}>✨ Planificateur de voyage intelligent</div></FI>
          <FI delay={100}><h1 style={S.heroTitle}>Votre prochain voyage,<br /><span style={{ fontStyle: "italic", color: "#52B788" }}>pensé pour vous</span></h1></FI>
          <FI delay={200}><p style={S.heroSub}>L'IA qui connaît les goûts de chaque voyageur pour créer des itinéraires sur-mesure — restaurants, activités, hôtels et budget, tout en un.</p></FI>
          <FI delay={300}>
            <div id="hero-email">
              {!submitted ? (
                <div style={S.emailRow}>
                  <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} placeholder="votre@email.com" style={S.emailInput} />
                  <button onClick={handleSubmit} style={S.emailBtn}>Accès anticipé →</button>
                </div>
              ) : (
                <div style={{ background: "rgba(45,106,79,.15)", border: "1px solid rgba(45,106,79,.3)", borderRadius: 16, padding: "16px 24px", display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14, color: "#52B788" }}>
                  <span style={{ fontSize: 24 }}>🎉</span> Bienvenue ! Vous recevrez votre accès très bientôt.
                </div>
              )}
            </div>
          </FI>
          <FI delay={400}><p style={{ fontSize: 12, color: "#666", marginTop: 12 }}>Gratuit · Pas de carte bancaire · 20 destinations</p></FI>

          {/* Stats */}
          <FI delay={500}><div style={{ display: "flex", gap: 40, marginTop: 48, justifyContent: "center", flexWrap: "wrap" }}>
            {[["20", "Destinations"], ["30+", "Lieux par ville"], ["5", "Catégories"], ["∞", "Possibilités"]].map(([n, l], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 32, fontWeight: 500, color: "#F5F2ED" }}>{n}</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 2, letterSpacing: 1, textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div></FI>
        </div>
      </section>

      {/* ═══ DESTINATIONS MARQUEE ═══ */}
      <section id="destinations" style={{ padding: "80px 0 60px", overflow: "hidden" }}>
        <FI><div style={{ textAlign: "center", marginBottom: 40, padding: "0 24px" }}>
          <h2 style={S.sectionTitle}>Explorez le monde</h2>
          <p style={S.sectionSub}>20 destinations avec des catalogues complets — et ce n'est que le début</p>
        </div></FI>
        <div style={{ display: "flex", gap: 16, padding: "0 24px", overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}>
          {DESTINATIONS.map((d, i) => (
            <FI key={d.city} delay={100 + i * 60}>
              <div style={{ minWidth: 180, scrollSnapAlign: "start", borderRadius: 20, overflow: "hidden", background: "#161412", border: "1px solid rgba(255,255,255,.06)", cursor: "pointer", transition: "all .3s" }}>
                <div style={{ background: d.gradient, height: 100, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ fontSize: 48, filter: "drop-shadow(0 4px 12px rgba(0,0,0,.3))" }}>{d.emoji}</span>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontFamily: IS, fontSize: 20, color: "#F5F2ED" }}>{d.city}</div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{d.tag}</div>
                </div>
              </div>
            </FI>
          ))}
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <FI><div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={S.sectionTitle}>Tout ce dont vous avez besoin</h2>
          <p style={S.sectionSub}>Un seul outil pour remplacer 10 onglets ouverts</p>
        </div></FI>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <FI key={i} delay={80 + i * 60}>
              <div style={{ background: "#161412", borderRadius: 20, padding: "28px 24px", border: "1px solid rgba(255,255,255,.06)", transition: "all .3s", cursor: "default" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(45,106,79,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16, border: "1px solid rgba(45,106,79,.15)" }}>{f.icon}</div>
                <h3 style={{ fontFamily: IS, fontSize: 20, color: "#F5F2ED", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "#999", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </FI>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <FI><div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={S.sectionTitle}>3 étapes, 10 minutes</h2>
          <p style={S.sectionSub}>De l'idée au voyage planifié</p>
        </div></FI>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { step: "01", title: "Qui voyage ?", desc: "Ajoutez chaque voyageur avec ses préférences — régime, budget, intérêts", icon: "👥" },
            { step: "02", title: "Explorez & sauvez", desc: "Parcourez le catalogue IA, sauvez vos coups de cœur, planifiez par jour", icon: "🔍" },
            { step: "03", title: "Réservez tout", desc: "Réservez vous-même via nos partenaires ou laissez un expert s'en charger", icon: "🎉" }
          ].map((s, i) => (
            <FI key={i} delay={100 + i * 100}>
              <div style={{ flex: "1 1 240px", textAlign: "center", position: "relative" }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 64, fontWeight: 500, color: "rgba(45,106,79,.1)", lineHeight: 1 }}>{s.step}</div>
                <div style={{ fontSize: 40, marginTop: -20, marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontFamily: IS, fontSize: 22, color: "#F5F2ED", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.5, maxWidth: 260, margin: "0 auto" }}>{s.desc}</p>
              </div>
            </FI>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <FI><div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={S.sectionTitle}>Ils ont testé</h2>
        </div></FI>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {TESTIMONIALS.map((t, i) => (
            <FI key={i} delay={60 + i * 60}>
              <div style={{ background: "#161412", borderRadius: 18, padding: "22px 20px", border: "1px solid rgba(255,255,255,.06)" }}>
                <div style={{ color: "#F5A623", fontSize: 14, letterSpacing: 2, marginBottom: 12 }}>{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
                <p style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6, marginBottom: 16, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#2D6A4F,#52B788)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12 }}>{t.name[0]}</div>
                  <div><div style={{ fontSize: 12, color: "#F5F2ED", fontWeight: 600 }}>{t.name}</div><div style={{ fontSize: 10, color: "#666" }}>{t.city}</div></div>
                </div>
              </div>
            </FI>
          ))}
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <FI><div style={{ textAlign: "center", marginBottom: 16 }}>
          <h2 style={S.sectionTitle}>Tarifs simples</h2>
          <p style={S.sectionSub}>Commencez gratuitement, passez à Premium quand vous voulez</p>
        </div></FI>
        <FI delay={50}><div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div style={{ background: "#1A1816", borderRadius: 30, padding: 4, display: "inline-flex", gap: 4, border: "1px solid rgba(255,255,255,.06)" }}>
            <button onClick={() => setYearly(false)} style={{ ...S.toggleBtn, ...(yearly ? {} : S.toggleActive) }}>Mensuel</button>
            <button onClick={() => setYearly(true)} style={{ ...S.toggleBtn, ...(yearly ? S.toggleActive : {}) }}>Annuel <span style={{ background: "#2D6A4F", color: "#fff", fontSize: 9, padding: "2px 6px", borderRadius: 10, marginLeft: 4 }}>-50%</span></button>
          </div>
        </div></FI>
        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 700, margin: "0 auto" }}>
          <FI delay={100}>
            <div style={{ background: "#161412", borderRadius: 24, padding: "32px 28px", border: "1px solid rgba(255,255,255,.06)" }}>
              <div style={{ fontSize: 12, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5 }}>Gratuit</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 40, color: "#F5F2ED", marginTop: 8 }}>0€</div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 4, marginBottom: 24 }}>Pour toujours</div>
              {["3 voyageurs max", "9 destinations", "Catalogue complet", "Planning jour par jour", "Budget tracker basique"].map(f => (
                <div key={f} style={{ fontSize: 13, color: "#aaa", padding: "6px 0", display: "flex", gap: 8 }}><span style={{ color: "#52B788" }}>✓</span>{f}</div>
              ))}
              <button onClick={scrollToEmail} style={{ ...S.pricingBtn, background: "transparent", border: "2px solid #333", color: "#F5F2ED", marginTop: 24 }}>Commencer gratuitement</button>
            </div>
          </FI>
          <FI delay={160}>
            <div style={{ background: "linear-gradient(160deg,#161412,#1B2A1F)", borderRadius: 24, padding: "32px 28px", border: "2px solid #2D6A4F", position: "relative" }}>
              <div style={{ position: "absolute", top: -12, right: 20, background: "linear-gradient(135deg,#FFD600,#FFA000)", color: "#000", fontSize: 10, fontWeight: 800, padding: "4px 14px", borderRadius: 20 }}>POPULAIRE</div>
              <div style={{ fontSize: 12, color: "#52B788", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5 }}>💎 Premium</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 40, color: "#F5F2ED", marginTop: 8 }}>{yearly ? "2,49€" : "4,99€"}<span style={{ fontSize: 14, color: "#888" }}>/mois</span></div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 4, marginBottom: 24 }}>{yearly ? "Facturé 29,99€/an" : "Sans engagement"}</div>
              {["Voyageurs illimités", "Suggestions IA avancées", "Export PDF du voyage", "Alertes de prix", "Budget tracker avancé", "Sans publicités", "Support prioritaire"].map(f => (
                <div key={f} style={{ fontSize: 13, color: "#ccc", padding: "6px 0", display: "flex", gap: 8 }}><span style={{ color: "#52B788" }}>✓</span>{f}</div>
              ))}
              <button onClick={scrollToEmail} style={{ ...S.pricingBtn, marginTop: 24 }}>Passer à Premium →</button>
            </div>
          </FI>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" style={{ padding: "80px 24px", maxWidth: 700, margin: "0 auto" }}>
        <FI><div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={S.sectionTitle}>Questions fréquentes</h2>
        </div></FI>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQS.map((f, i) => (
            <FI key={i} delay={40 + i * 40}>
              <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ background: "#161412", borderRadius: 16, padding: "18px 22px", border: "1px solid rgba(255,255,255,.06)", cursor: "pointer", transition: "all .2s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, color: "#F5F2ED", fontWeight: 600 }}>{f.q}</span>
                  <span style={{ color: "#52B788", fontSize: 18, transition: "transform .3s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </div>
                {openFaq === i && <p style={{ fontSize: 13, color: "#999", lineHeight: 1.6, marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,.06)" }}>{f.a}</p>}
              </div>
            </FI>
          ))}
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section style={{ padding: "100px 24px 80px", textAlign: "center" }}>
        <FI><div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: IS, fontSize: "clamp(28px, 5vw, 44px)", color: "#F5F2ED", lineHeight: 1.15, marginBottom: 16 }}>Prêt à planifier<br /><span style={{ fontStyle: "italic", color: "#52B788" }}>votre prochain voyage</span> ?</h2>
          <p style={{ fontSize: 15, color: "#888", lineHeight: 1.6, marginBottom: 32 }}>Rejoignez les voyageurs qui planifient plus intelligemment.</p>
          {!submitted ? (
            <div style={{ ...S.emailRow, maxWidth: 440, margin: "0 auto" }}>
              <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} placeholder="votre@email.com" style={S.emailInput} />
              <button onClick={handleSubmit} style={S.emailBtn}>Rejoindre →</button>
            </div>
          ) : (
            <div style={{ color: "#52B788", fontSize: 16 }}>🎉 Vous êtes inscrit !</div>
          )}
        </div></FI>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "40px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg,#2D6A4F,#52B788)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>V</span></div>
            <span style={{ fontFamily: IS, fontSize: 16, color: "#888" }}>VoyageAI</span>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { label: "Mentions légales", key: "mentions" },
              { label: "Confidentialité", key: "privacy" },
              { label: "CGU", key: "cgu" },
              { label: "Contact", key: "contact" },
            ].map(l => (
              <button key={l.key} onClick={() => setLegalModal(l.key)} style={{ fontSize: 12, color: "#666", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, textDecoration: "none" }}>{l.label}</button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "#444" }}>© 2026 VoyageAI · Fait avec ❤️</div>
        </div>
      </footer>

      {/* ═══ LEGAL MODALS ═══ */}
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
    </div>
  );
}

const IS = "'Instrument Serif', serif";
const S = {
  page: { fontFamily: "'Outfit', sans-serif", background: "#0C0A08", color: "#F5F2ED", minHeight: "100vh", WebkitFontSmoothing: "antialiased" },
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, transition: "all .3s", padding: "0 24px" },
  navInner: { maxWidth: 1100, margin: "0 auto", padding: "14px 0", display: "flex", justifyContent: "space-between", alignItems: "center" },
  navLink: { fontSize: 13, color: "#999", textDecoration: "none", fontWeight: 500, transition: "color .2s" },
  navCta: { background: "linear-gradient(135deg,#2D6A4F,#52B788)", color: "#fff", border: "none", borderRadius: 24, padding: "8px 20px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
  hero: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "120px 24px 80px", textAlign: "center" },
  heroContent: { position: "relative", zIndex: 1, maxWidth: 700 },
  heroTitle: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(36px, 6vw, 64px)", color: "#F5F2ED", lineHeight: 1.1, marginBottom: 20 },
  heroSub: { fontSize: "clamp(14px, 2vw, 17px)", color: "#999", lineHeight: 1.6, maxWidth: 520, margin: "0 auto 32px" },
  emailRow: { display: "flex", gap: 8, background: "#1A1816", borderRadius: 18, padding: 6, border: "1px solid rgba(255,255,255,.08)", maxWidth: 480, margin: "0 auto" },
  emailInput: { flex: 1, background: "transparent", border: "none", padding: "12px 16px", fontSize: 14, color: "#F5F2ED", fontFamily: "inherit", outline: "none", minWidth: 0 },
  emailBtn: { background: "linear-gradient(135deg,#2D6A4F,#52B788)", color: "#fff", border: "none", borderRadius: 14, padding: "12px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(45,106,79,.3)" },
  sectionTitle: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(28px, 4vw, 44px)", color: "#F5F2ED", lineHeight: 1.15, marginBottom: 12 },
  sectionSub: { fontSize: 15, color: "#888", maxWidth: 480, margin: "0 auto", lineHeight: 1.5 },
  toggleBtn: { background: "transparent", border: "none", color: "#888", padding: "8px 18px", borderRadius: 26, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .2s" },
  toggleActive: { background: "#2D6A4F", color: "#fff" },
  pricingBtn: { width: "100%", background: "linear-gradient(135deg,#2D6A4F,#52B788)", color: "#fff", border: "none", borderRadius: 14, padding: "13px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(45,106,79,.25)" },
};
