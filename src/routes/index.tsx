import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

const BODY_HTML = `

<div class="route-progress" id="progress"></div>

<nav class="nav" id="nav">
  <div class="nav-inner">
    <a class="brand" href="#home" data-link>
      <span class="brand-mark">H</span>
      <span>SABIOSITA</span>
    </a>
    <div class="nav-links" id="navLinks">
      <a class="nav-link" href="#home" data-link>Home</a>
      <a class="nav-link" href="#properties" data-link>Properties</a>
      <a class="nav-link" href="#services" data-link>Services</a>
      <a class="nav-link" href="#about" data-link>About</a>
      <a class="nav-link" href="#contact" data-link>Contact</a>
    </div>
    <div class="nav-actions">
      <button class="saved-btn desktop-only" data-action="open-saved" aria-label="Saved properties">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        <span class="saved-count hidden" id="savedCount">0</span>
      </button>
      <a class="btn btn-primary btn-sm desktop-only" href="#contact" data-link>Free Consultation</a>
      <button class="hamburger" id="hamburger" aria-label="Menu"><span></span></button>
    </div>
  </div>
</nav>

<div class="mobile-menu" id="mobileMenu">
  <div class="mlinks">
    <a href="#home" data-link>Home</a>
    <a href="#properties" data-link>Properties</a>
    <a href="#services" data-link>Services</a>
    <a href="#about" data-link>About</a>
    <a href="#contact" data-link>Contact</a>
  </div>
  <div class="msocial">
    <a href="#" aria-label="Facebook">F</a>
    <a href="#" aria-label="Instagram">I</a>
    <a href="#" aria-label="LinkedIn">L</a>
    <a href="#" aria-label="Twitter">X</a>
  </div>
</div>

<main id="app"></main>

<a class="fab-whatsapp" href="https://wa.me/23490322992420?text=Hello%20Sabiosita%20Properties%2C%20I%20need%20help%20with%20a%20property." target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .02 5.36.02 11.99c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62a11.94 11.94 0 0 0 5.82 1.5h.01c6.62 0 11.99-5.36 11.99-12 0-3.2-1.25-6.21-3.48-8.4zM12 21.79h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.67.96.98-3.58-.24-.37a9.83 9.83 0 0 1-1.51-5.23C2.17 6.55 6.58 2.15 12 2.15c2.62 0 5.07 1.02 6.93 2.88a9.74 9.74 0 0 1 2.87 6.94c-.01 5.42-4.42 9.82-9.8 9.82zm5.39-7.36c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.94 1.16-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.58-.49-.5-.66-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.13-.27-.2-.57-.35z"/></svg>
  <span class="tip">Chat with us on WhatsApp</span>
</a>

<button class="fab-top" id="fabTop" aria-label="Scroll to top">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>
</button>

<div class="cookie" id="cookie">
  <p>We use cookies to improve your experience.</p>
  <button class="btn btn-primary btn-sm" id="cookieAccept">Accept</button>
</div>

<div class="toast-wrap" id="toastWrap"></div>

<div class="modal-backdrop" id="modal"><div class="modal" id="modalBody"></div></div>
<div class="modal-backdrop modal-wide" id="compareModal"><div class="modal" id="compareModalBody"></div></div>

<div class="lightbox" id="lightbox">
  <button class="lb-close" data-action="lb-close">×</button>
  <button class="lb-arrow lb-prev" data-action="lb-prev">‹</button>
  <img id="lbImg" alt="" />
  <button class="lb-arrow lb-next" data-action="lb-next">›</button>
  <div class="lb-counter" id="lbCounter"></div>
</div>



`;
const SITE_CSS = `
/* ============================================================
   DESIGN TOKENS
============================================================ */
:root{
  --gold:#C6A84B; --gold-light:#E8D48A; --gold-dark:#9A7B2F;
  --ink:#0D0D0D; --ink-soft:#1C1C1E; --slate:#2C2C2E;
  --mist:#F7F4EF; --white:#FFFFFF;
  --text-primary:#1C1C1E; --text-secondary:#6E6E73; --text-muted:#AEAEB2;
  --line:#E8E4DC;
  --green:#25D366;
  --success:#1f9d55; --error:#c0392b; --warning:#e67e22;

  --text-xs:clamp(0.7rem,1vw,.75rem);
  --text-sm:clamp(.8rem,1.2vw,.875rem);
  --text-base:clamp(.9rem,1.5vw,1rem);
  --text-lg:clamp(1rem,2vw,1.125rem);
  --text-xl:clamp(1.1rem,2.5vw,1.25rem);
  --text-2xl:clamp(1.3rem,3vw,1.5rem);
  --text-3xl:clamp(1.6rem,4vw,2rem);
  --text-4xl:clamp(2rem,5vw,2.8rem);
  --text-5xl:clamp(2.5rem,7vw,4rem);
  --text-hero:clamp(3rem,9vw,6.5rem);

  --space-xs:.25rem; --space-sm:.5rem; --space-md:1rem;
  --space-lg:1.5rem; --space-xl:2rem; --space-2xl:3rem;
  --space-3xl:4rem; --space-4xl:6rem; --space-5xl:8rem;

  --radius-sm:4px; --radius-md:8px; --radius-lg:16px; --radius-xl:24px; --radius-pill:100px;
  --shadow-sm:0 1px 3px rgba(0,0,0,.08);
  --shadow-md:0 4px 16px rgba(0,0,0,.12);
  --shadow-lg:0 8px 32px rgba(0,0,0,.16);
  --shadow-xl:0 20px 60px rgba(0,0,0,.24);
  --shadow-gold:0 8px 32px rgba(198,168,75,.25);
  --transition:220ms cubic-bezier(.4,0,.2,1);
  --transition-slow:450ms cubic-bezier(.4,0,.2,1);

  --nav-h:76px;
}

/* ============================================================
   RESET
============================================================ */
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{
  font-family:"Outfit",system-ui,sans-serif;
  font-size:var(--text-base);
  color:var(--text-primary);
  background:var(--white);
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
input,select,textarea{font-family:inherit;font-size:inherit}
h1,h2,h3,h4,h5,h6{margin:0;font-weight:600;line-height:1.15}
p{margin:0}
ul{margin:0;padding:0;list-style:none}

.container{width:min(1240px,92%);margin-inline:auto}
.serif{font-family:"Playfair Display",Georgia,serif}
.gold{color:var(--gold)}

/* ============================================================
   BUTTONS
============================================================ */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.55rem;
  padding:.95rem 1.6rem;border-radius:var(--radius-pill);
  font-weight:500;font-size:var(--text-base);
  transition:var(--transition);cursor:pointer;white-space:nowrap;
  min-height:48px;
}
.btn-primary{background:var(--gold);color:var(--ink)}
.btn-primary:hover{background:var(--gold-dark);color:#fff;transform:translateY(-2px);box-shadow:var(--shadow-gold)}
.btn-ghost{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.5)}
.btn-ghost:hover{background:rgba(255,255,255,.1);border-color:#fff}
.btn-dark{background:var(--ink);color:#fff}
.btn-dark:hover{background:var(--slate)}
.btn-outline{background:transparent;color:var(--ink);border:1.5px solid var(--ink)}
.btn-outline:hover{background:var(--ink);color:#fff}
.btn-sm{padding:.55rem 1rem;min-height:38px;font-size:var(--text-sm)}
.btn-block{width:100%}

/* ============================================================
   NAVBAR
============================================================ */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  height:var(--nav-h);
  display:flex;align-items:center;
  transition:background var(--transition),backdrop-filter var(--transition),box-shadow var(--transition),color var(--transition);
  color:#fff;
}
.nav.scrolled{background:rgba(255,255,255,.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);color:var(--ink);box-shadow:var(--shadow-sm)}
.nav-inner{width:min(1320px,94%);margin-inline:auto;display:flex;align-items:center;justify-content:space-between;gap:var(--space-lg)}
.brand{display:flex;align-items:center;gap:.65rem;font-family:"Playfair Display",serif;font-weight:700;font-size:1.45rem;letter-spacing:.02em}
.brand-mark{width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,var(--gold),var(--gold-dark));display:grid;place-items:center;color:var(--ink);font-weight:700;font-family:"Playfair Display",serif}
.nav-links{display:flex;gap:.4rem;align-items:center}
.nav-link{
  position:relative;padding:.6rem .9rem;font-size:.95rem;font-weight:500;border-radius:6px;
  transition:color var(--transition);
}
.nav-link::after{
  content:"";position:absolute;left:50%;bottom:6px;transform:translateX(-50%) scaleX(0);
  width:18px;height:2px;background:var(--gold);transition:transform var(--transition);transform-origin:center;
}
.nav-link:hover::after,.nav-link.active::after{transform:translateX(-50%) scaleX(1)}
.nav-link.active{color:var(--gold)}
.nav-actions{display:flex;align-items:center;gap:.75rem}
.saved-btn{
  position:relative;width:42px;height:42px;border-radius:50%;
  display:grid;place-items:center;background:rgba(255,255,255,.12);transition:var(--transition);
}
.nav.scrolled .saved-btn{background:rgba(13,13,13,.06)}
.saved-btn:hover{background:var(--gold);color:var(--ink)}
.saved-count{
  position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;padding:0 5px;
  background:var(--gold);color:var(--ink);font-size:.7rem;font-weight:700;
  border-radius:9px;display:grid;place-items:center;
}
.saved-count.hidden{display:none}
.hamburger{display:none;width:42px;height:42px;border-radius:8px;align-items:center;justify-content:center}
.hamburger span{display:block;width:22px;height:2px;background:currentColor;border-radius:2px;position:relative;transition:var(--transition)}
.hamburger span::before,.hamburger span::after{content:"";position:absolute;left:0;width:22px;height:2px;background:currentColor;border-radius:2px;transition:var(--transition)}
.hamburger span::before{top:-7px}.hamburger span::after{top:7px}
.nav.menu-open .hamburger span{background:transparent}
.nav.menu-open .hamburger span::before{top:0;transform:rotate(45deg)}
.nav.menu-open .hamburger span::after{top:0;transform:rotate(-45deg)}

@media (max-width:960px){
  .nav-links,.nav-actions .desktop-only{display:none}
  .hamburger{display:inline-flex}
}

/* Mobile menu overlay */
.mobile-menu{
  position:fixed;inset:0;background:var(--ink);color:#fff;z-index:999;
  padding:calc(var(--nav-h) + 2rem) 8% 2rem;
  display:flex;flex-direction:column;justify-content:space-between;
  opacity:0;pointer-events:none;transition:opacity var(--transition);
}
.mobile-menu.open{opacity:1;pointer-events:auto}
.mobile-menu .mlinks{display:flex;flex-direction:column;gap:1.1rem}
.mobile-menu .mlinks a{
  font-family:"Playfair Display",serif;font-size:2rem;
  opacity:0;transform:translateX(-20px);transition:opacity .4s, transform .4s;
}
.mobile-menu.open .mlinks a{opacity:1;transform:translateX(0)}
.mobile-menu.open .mlinks a:nth-child(1){transition-delay:.05s}
.mobile-menu.open .mlinks a:nth-child(2){transition-delay:.1s}
.mobile-menu.open .mlinks a:nth-child(3){transition-delay:.15s}
.mobile-menu.open .mlinks a:nth-child(4){transition-delay:.2s}
.mobile-menu.open .mlinks a:nth-child(5){transition-delay:.25s}
.mobile-menu .msocial{display:flex;gap:1rem;border-top:1px solid #333;padding-top:1.4rem}
.mobile-menu .msocial a{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:#1c1c1e;transition:var(--transition)}
.mobile-menu .msocial a:hover{background:var(--gold);color:var(--ink)}

/* ============================================================
   HERO
============================================================ */
.hero{
  position:relative;min-height:100dvh;color:#fff;display:flex;align-items:center;
  overflow:hidden;isolation:isolate;
  background:#000;
}
.hero-bg{
  position:absolute;inset:0;z-index:-2;
  background:url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80&auto=format") center/cover no-repeat;
  transform:scale(1.05);
}
.hero::before{ /* dark overlay */
  content:"";position:absolute;inset:0;z-index:-1;
  background:linear-gradient(105deg,rgba(0,0,0,.85) 0%,rgba(0,0,0,.55) 55%,rgba(0,0,0,.3) 100%);
}
.hero::after{ /* grain */
  content:"";position:absolute;inset:0;z-index:-1;opacity:.08;pointer-events:none;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/></svg>");
}
.hero-inner{width:min(1240px,92%);margin-inline:auto;padding-top:var(--nav-h)}
.hero-eyebrow{
  display:inline-block;font-size:.78rem;letter-spacing:.28em;color:var(--gold);
  text-transform:uppercase;font-weight:600;margin-bottom:1.4rem;
  padding:.5rem 1rem;border:1px solid rgba(198,168,75,.4);border-radius:var(--radius-pill);
}
.hero h1{margin:0 0 1.4rem}
.hero .h1-line{display:block;overflow:hidden}
.hero .h1-line>span{display:inline-block;opacity:0;transform:translateY(40px);animation:rise .9s cubic-bezier(.2,.8,.2,1) forwards}
.hero .h1-line:nth-child(1)>span{animation-delay:.15s}
.hero .h1-line:nth-child(2)>span{animation-delay:.35s}
.hero-l1{font-family:"Playfair Display",serif;font-style:italic;font-size:var(--text-5xl);font-weight:500;color:#fff}
.hero-l2{font-family:"Playfair Display",serif;font-size:var(--text-hero);font-weight:700;color:var(--gold);line-height:1}
.hero-sub{
  max-width:480px;color:rgba(255,255,255,.78);font-weight:300;
  font-size:var(--text-lg);margin:0 0 2rem;
  opacity:0;animation:rise .9s .55s forwards;
}
.hero-cta{display:flex;flex-wrap:wrap;gap:1rem;opacity:0;animation:rise .9s .7s forwards}
@keyframes rise{to{opacity:1;transform:translateY(0)}}

.trust-bar{
  position:absolute;left:0;right:0;bottom:0;z-index:1;
  background:rgba(13,13,13,.55);backdrop-filter:blur(10px);
  border-top:1px solid rgba(255,255,255,.08);
  padding:1.1rem 0;
}
.trust-inner{
  width:min(1240px,92%);margin-inline:auto;
  display:flex;justify-content:space-around;flex-wrap:wrap;gap:1rem;color:#fff;
}
.trust-item{display:flex;flex-direction:column;align-items:center;gap:.15rem;flex:1;min-width:140px;position:relative}
.trust-item:not(:last-child)::after{
  content:"";position:absolute;right:-.5rem;top:10%;height:80%;width:1px;background:linear-gradient(to bottom,transparent,var(--gold),transparent);
}
.trust-num{font-family:"Playfair Display",serif;font-size:1.6rem;color:var(--gold);font-weight:700}
.trust-label{font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.7)}

@media (max-width:760px){
  .trust-item:not(:last-child)::after{display:none}
  .trust-inner{justify-content:center}
}

/* ============================================================
   SMART SEARCH BAR
============================================================ */
.search-wrap{
  width:min(1180px,92%);margin:-3.5rem auto 0;position:relative;z-index:5;
}
.search-card{
  background:#fff;border-radius:var(--radius-xl);box-shadow:var(--shadow-xl);
  padding:1.2rem;display:grid;grid-template-columns:repeat(5,1fr) auto;gap:.5rem;align-items:end;
}
.search-field{display:flex;flex-direction:column;gap:.25rem;padding:.6rem .85rem;border-right:1px solid var(--line)}
.search-field:nth-child(5){border-right:none}
.search-field label{font-size:.7rem;letter-spacing:.15em;text-transform:uppercase;color:var(--text-secondary);font-weight:600}
.search-field select,.search-field input{
  border:none;outline:none;background:transparent;font-size:.95rem;color:var(--ink);font-weight:500;padding:0;width:100%;
}
.search-card .btn{height:54px;padding:0 1.8rem}
.search-advanced{
  grid-column:1/-1;display:none;border-top:1px dashed var(--line);padding-top:1rem;margin-top:.5rem;
  flex-wrap:wrap;gap:.7rem;align-items:center;
}
.search-advanced.open{display:flex}
.search-toggle{grid-column:1/-1;text-align:right;font-size:.8rem;color:var(--gold);font-weight:600;cursor:pointer;padding:.3rem .5rem}
.amenity-check{display:inline-flex;align-items:center;gap:.4rem;font-size:.85rem;padding:.4rem .8rem;border:1px solid var(--line);border-radius:var(--radius-pill);cursor:pointer}
.amenity-check input{accent-color:var(--gold)}

@media (max-width:1000px){
  .search-card{grid-template-columns:repeat(2,1fr);gap:0}
  .search-field{border-right:none;border-bottom:1px solid var(--line)}
  .search-card .btn{grid-column:1/-1;width:100%;margin-top:.5rem}
}
@media (max-width:520px){
  .search-card{grid-template-columns:1fr}
}

/* ============================================================
   SECTION HEADER
============================================================ */
section{padding:var(--space-4xl) 0}
.section-head{margin-bottom:var(--space-2xl);max-width:680px}
.section-head.center{margin-inline:auto;text-align:center}
.eyebrow{
  display:inline-block;font-size:.75rem;letter-spacing:.28em;color:var(--gold);
  text-transform:uppercase;font-weight:600;margin-bottom:.9rem;
}
.section-title{font-family:"Playfair Display",serif;font-size:var(--text-4xl);font-weight:700;color:var(--ink);margin-bottom:.7rem;line-height:1.1}
.section-sub{color:var(--text-secondary);font-size:var(--text-lg)}

/* ============================================================
   PROPERTY CARDS
============================================================ */
.filter-pills{display:flex;flex-wrap:wrap;gap:.55rem;margin-bottom:2rem}
.pill{
  padding:.55rem 1.1rem;border-radius:var(--radius-pill);
  background:var(--mist);color:var(--text-primary);font-size:.85rem;font-weight:500;
  cursor:pointer;transition:var(--transition);border:1px solid transparent;
}
.pill:hover{background:#ede7da}
.pill.active{background:var(--ink);color:#fff}

.prop-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.prop-grid .featured-card{grid-column:span 2}
@media (max-width:960px){.prop-grid{grid-template-columns:repeat(2,1fr)}.prop-grid .featured-card{grid-column:span 2}}
@media (max-width:620px){.prop-grid{grid-template-columns:1fr}.prop-grid .featured-card{grid-column:span 1}}

.pcard{
  position:relative;background:#fff;border-radius:var(--radius-lg);overflow:hidden;
  border:1px solid var(--line);transition:transform var(--transition),box-shadow var(--transition);
  display:flex;flex-direction:column;
}
.pcard::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--gold);transform:scaleX(0);transform-origin:left;transition:transform var(--transition);z-index:2}
.pcard:hover{transform:translateY(-4px);box-shadow:var(--shadow-xl)}
.pcard:hover::before{transform:scaleX(1)}
.pcard-media{position:relative;aspect-ratio:4/3;overflow:hidden;background:var(--mist)}
.pcard-media img{width:100%;height:100%;object-fit:cover;transition:transform var(--transition-slow)}
.pcard:hover .pcard-media img{transform:scale(1.06)}
.pcard-badges{position:absolute;top:.8rem;left:.8rem;display:flex;flex-direction:column;gap:.4rem;z-index:1}
.pcard-tools{position:absolute;top:.8rem;right:.8rem;display:flex;gap:.4rem;z-index:1}
.pcard-tool{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.95);display:grid;place-items:center;color:var(--ink);transition:var(--transition);font-size:.95rem}
.pcard-tool:hover{background:var(--gold);color:var(--ink)}
.pcard-tool.active{background:var(--gold);color:var(--ink)}
.pcard-body{padding:1.1rem 1.2rem 1.3rem;display:flex;flex-direction:column;gap:.55rem;flex:1}
.pcard-loc{font-size:.78rem;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.1em;display:flex;align-items:center;gap:.3rem}
.pcard-title{font-family:"Playfair Display",serif;font-size:1.2rem;font-weight:600;color:var(--ink);line-height:1.25}
.pcard-price{font-family:"Playfair Display",serif;font-size:1.4rem;color:var(--gold-dark);font-weight:700}
.pcard-price small{font-family:"Outfit",sans-serif;font-size:.7rem;color:var(--text-secondary);font-weight:400;letter-spacing:.05em;text-transform:uppercase;margin-left:.3rem}
.pcard-stats{display:flex;gap:1rem;padding-top:.7rem;border-top:1px solid var(--line);margin-top:auto;color:var(--text-secondary);font-size:.85rem;flex-wrap:wrap}
.pcard-stats span{display:inline-flex;align-items:center;gap:.3rem}

/* Featured card */
.featured-card .pcard-media{aspect-ratio:16/10}
.featured-card .pcard-title{font-size:1.55rem}
.ribbon{
  position:absolute;top:14px;left:-4px;background:var(--gold);color:var(--ink);
  font-size:.7rem;font-weight:700;letter-spacing:.18em;padding:.4rem .8rem;
  text-transform:uppercase;box-shadow:var(--shadow-sm);z-index:3;
}
.ribbon::after{content:"";position:absolute;left:0;bottom:-6px;border:3px solid transparent;border-top-color:var(--gold-dark);border-right-color:var(--gold-dark)}

/* Badges */
.badge{
  display:inline-block;padding:.32rem .65rem;font-size:.7rem;letter-spacing:.1em;
  text-transform:uppercase;font-weight:600;border-radius:var(--radius-sm);
  background:var(--ink);color:#fff;
}
.badge.sale{background:var(--gold);color:var(--ink)}
.badge.rent{background:#1d4ed8;color:#fff}
.badge.luxury{background:linear-gradient(135deg,#1c1c1e,#3a3a3c);color:var(--gold-light)}
.badge.new{background:var(--success);color:#fff}
.badge.reduced{background:var(--warning);color:#fff}
.badge.hot{background:var(--error);color:#fff}
.badge.verified{background:#0f766e;color:#fff}

/* List variant */
.pcard.list{flex-direction:row;align-items:stretch}
.pcard.list .pcard-media{aspect-ratio:auto;width:34%;min-width:240px}
.pcard.list .pcard-body{flex:1}
@media (max-width:680px){.pcard.list{flex-direction:column}.pcard.list .pcard-media{width:100%;aspect-ratio:4/3}}

/* Compact */
.pcard.compact{flex-direction:row;border:none;background:transparent}
.pcard.compact .pcard-media{width:100px;height:80px;flex:none;aspect-ratio:auto;border-radius:8px}
.pcard.compact .pcard-body{padding:.2rem .8rem;gap:.2rem}
.pcard.compact .pcard-stats{display:none}

/* ============================================================
   STATS DARK
============================================================ */
.stats-dark{
  background:var(--ink);color:#fff;position:relative;overflow:hidden;
}
.stats-dark::before{
  content:"";position:absolute;inset:0;opacity:.04;pointer-events:none;
  background-image:radial-gradient(rgba(198,168,75,.6) 1px,transparent 1px);background-size:30px 30px;
}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center;position:relative}
.stat-num{font-family:"Playfair Display",serif;font-size:clamp(2.5rem,6vw,4.5rem);color:var(--gold);font-weight:700;line-height:1}
.stat-label{margin-top:.5rem;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:.18em;font-size:.78rem}
@media (max-width:720px){.stats-grid{grid-template-columns:repeat(2,1fr)}}

/* ============================================================
   HOW IT WORKS
============================================================ */
.how{background:var(--mist)}
.how-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;position:relative}
.step{text-align:center;padding:1rem}
.step-num{
  width:64px;height:64px;border-radius:50%;border:2px solid var(--gold);
  display:grid;place-items:center;margin:0 auto 1rem;
  font-family:"Playfair Display",serif;color:var(--gold);font-weight:700;font-size:1.4rem;
  background:#fff;position:relative;z-index:1;
}
.step h3{font-family:"Playfair Display",serif;font-size:1.2rem;margin-bottom:.4rem;color:var(--ink)}
.step p{color:var(--text-secondary);font-size:.92rem}
@media (max-width:780px){.how-grid{grid-template-columns:repeat(2,1fr)}}

/* ============================================================
   PROPERTY TYPES
============================================================ */
.types-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem}
.type-card{
  position:relative;height:240px;border-radius:var(--radius-lg);overflow:hidden;cursor:pointer;
  display:flex;align-items:flex-end;color:#fff;
}
.type-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform var(--transition-slow)}
.type-card::before{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.85),rgba(0,0,0,.2) 60%,transparent);transition:var(--transition)}
.type-card:hover::before{background:linear-gradient(to top,rgba(0,0,0,.7),rgba(0,0,0,.15) 60%,transparent)}
.type-card:hover img{transform:scale(1.07)}
.type-content{position:relative;padding:1.4rem;width:100%}
.type-content h3{font-family:"Playfair Display",serif;font-size:1.5rem;transition:transform var(--transition)}
.type-content small{font-size:.78rem;letter-spacing:.15em;text-transform:uppercase;color:var(--gold-light);display:block;margin-bottom:.3rem}
.type-card:hover .type-content h3{transform:translateY(-4px)}
.type-arrow{opacity:0;font-size:.85rem;color:var(--gold);font-weight:600;letter-spacing:.1em;transition:var(--transition);transform:translateY(8px)}
.type-card:hover .type-arrow{opacity:1;transform:translateY(0)}
@media (max-width:780px){.types-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:480px){.types-grid{grid-template-columns:1fr}}

/* ============================================================
   AGENTS
============================================================ */
.agents-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.4rem}
.agent-card{
  background:#fff;border:1px solid var(--line);border-radius:var(--radius-lg);overflow:hidden;
  text-align:center;transition:var(--transition);
}
.agent-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg)}
.agent-photo{aspect-ratio:1;overflow:hidden;background:var(--mist)}
.agent-photo img{width:100%;height:100%;object-fit:cover;transition:transform var(--transition-slow)}
.agent-card:hover .agent-photo img{transform:scale(1.07)}
.agent-info{padding:1.1rem}
.agent-info h3{font-family:"Playfair Display",serif;font-size:1.15rem;color:var(--ink);margin-bottom:.15rem}
.agent-info .role{color:var(--gold);font-size:.8rem;letter-spacing:.15em;text-transform:uppercase;font-weight:600}
.agent-meta{display:flex;justify-content:center;gap:1rem;margin-top:.7rem;font-size:.82rem;color:var(--text-secondary)}
.agent-social{display:flex;justify-content:center;gap:.5rem;margin-top:.9rem;opacity:0;transform:translateY(8px);transition:var(--transition)}
.agent-card:hover .agent-social{opacity:1;transform:translateY(0)}
.agent-social a{width:34px;height:34px;border-radius:50%;background:var(--mist);display:grid;place-items:center;font-size:.85rem;transition:var(--transition)}
.agent-social a:hover{background:var(--gold);color:var(--ink)}
@media (max-width:980px){.agents-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:480px){.agents-grid{grid-template-columns:1fr}}

/* ============================================================
   TESTIMONIALS
============================================================ */
.testi{background:var(--ink);color:#fff;position:relative;overflow:hidden}
.testi::before{
  content:"\\201C";position:absolute;top:30px;left:6%;font-family:"Playfair Display",serif;
  font-size:18rem;color:var(--gold);opacity:.12;line-height:1;
}
.testi-track{position:relative;min-height:280px;max-width:820px;margin:0 auto;text-align:center}
.testi-slide{
  position:absolute;inset:0;opacity:0;transition:opacity .4s ease;display:flex;flex-direction:column;align-items:center;gap:1.4rem;justify-content:center;
}
.testi-slide.active{opacity:1;position:relative}
.testi-quote{font-family:"Playfair Display",serif;font-style:italic;font-size:var(--text-2xl);line-height:1.5;color:#fff}
.testi-author{display:flex;align-items:center;gap:.9rem}
.testi-author img{width:54px;height:54px;border-radius:50%;object-fit:cover;border:2px solid var(--gold)}
.testi-name{text-align:left}
.testi-name strong{display:block;color:#fff;font-weight:600}
.testi-name small{color:var(--text-muted);font-size:.82rem}
.testi-stars{color:var(--gold);letter-spacing:2px}
.testi-nav{display:flex;justify-content:center;gap:.6rem;margin-top:1.4rem}
.testi-dot{width:10px;height:10px;border-radius:50%;background:#3a3a3c;cursor:pointer;transition:var(--transition)}
.testi-dot.active{background:var(--gold);width:30px;border-radius:5px}
.testi-arrows{display:flex;justify-content:center;gap:1rem;margin-top:1rem}
.testi-arrows button{width:42px;height:42px;border-radius:50%;background:#1c1c1e;color:#fff;display:grid;place-items:center;transition:var(--transition)}
.testi-arrows button:hover{background:var(--gold);color:var(--ink)}

/* ============================================================
   BLOG
============================================================ */
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.blog-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius-lg);overflow:hidden;transition:var(--transition);cursor:pointer}
.blog-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.blog-card img{aspect-ratio:16/10;width:100%;object-fit:cover}
.blog-body{padding:1.2rem}
.blog-cat{font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:600}
.blog-card h3{font-family:"Playfair Display",serif;font-size:1.2rem;color:var(--ink);margin:.5rem 0}
.blog-card p{color:var(--text-secondary);font-size:.9rem}
.blog-meta{display:flex;gap:1rem;margin-top:.8rem;font-size:.78rem;color:var(--text-muted)}
@media (max-width:880px){.blog-grid{grid-template-columns:1fr}}

/* ============================================================
   NEWSLETTER
============================================================ */
.newsletter{background:var(--mist);text-align:center}
.newsletter form{display:flex;gap:.5rem;max-width:540px;margin:1.6rem auto 0;flex-wrap:wrap}
.newsletter input{
  flex:1;min-width:220px;padding:1rem 1.2rem;border:1px solid var(--line);
  border-radius:var(--radius-pill);background:#fff;outline:none;
}
.newsletter input:focus{border-color:var(--gold)}

/* ============================================================
   PAGE HERO (sub pages)
============================================================ */
.page-hero{
  position:relative;min-height:46vh;color:#fff;display:flex;align-items:flex-end;
  padding:calc(var(--nav-h) + 3rem) 0 3rem;overflow:hidden;
}
.page-hero::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.7),rgba(0,0,0,.55))}
.page-hero-bg{position:absolute;inset:0;background-size:cover;background-position:center;z-index:-1}
.page-hero h1{font-family:"Playfair Display",serif;font-size:var(--text-5xl);font-weight:700}
.crumb{display:flex;gap:.5rem;font-size:.85rem;color:rgba(255,255,255,.7);margin-bottom:.6rem}
.crumb a:hover{color:var(--gold)}

/* ============================================================
   PROPERTIES PAGE
============================================================ */
.props-layout{display:grid;grid-template-columns:280px 1fr;gap:2rem;align-items:start}
@media (max-width:980px){.props-layout{grid-template-columns:1fr}}

.sidebar-filters{
  position:sticky;top:calc(var(--nav-h) + 1rem);
  background:#fff;border:1px solid var(--line);border-radius:var(--radius-lg);
  padding:1.4rem;max-height:calc(100vh - var(--nav-h) - 2rem);overflow-y:auto;
}
@media (max-width:980px){.sidebar-filters{position:static;display:none}.sidebar-filters.open{display:block}}
.sf-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}
.sf-head h3{font-family:"Playfair Display",serif;font-size:1.2rem}
.sf-clear{font-size:.8rem;color:var(--gold);font-weight:600;cursor:pointer}
.fblock{padding:1rem 0;border-top:1px solid var(--line)}
.fblock:first-of-type{border-top:none}
.fblock h4{font-size:.78rem;letter-spacing:.15em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:.7rem;font-weight:600}
.seg{display:grid;grid-template-columns:1fr 1fr;background:var(--mist);border-radius:var(--radius-pill);padding:4px;gap:4px}
.seg button{padding:.5rem;border-radius:var(--radius-pill);font-size:.85rem;font-weight:500;transition:var(--transition)}
.seg button.active{background:var(--ink);color:#fff}
.range{display:flex;gap:.5rem;align-items:center;color:var(--text-secondary);font-size:.85rem}
.range input{flex:1;padding:.5rem .7rem;border:1px solid var(--line);border-radius:8px;outline:none;font-size:.85rem}
.chips{display:flex;flex-wrap:wrap;gap:.4rem}
.chip{padding:.4rem .8rem;font-size:.82rem;border:1px solid var(--line);border-radius:var(--radius-pill);cursor:pointer;transition:var(--transition);background:#fff}
.chip.active{background:var(--gold);border-color:var(--gold);color:var(--ink);font-weight:600}
.fcheck{display:flex;align-items:center;gap:.5rem;padding:.3rem 0;font-size:.9rem;cursor:pointer}
.fcheck input{accent-color:var(--gold)}

.results-bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.4rem;flex-wrap:wrap;gap:1rem}
.view-toggle{display:flex;border:1px solid var(--line);border-radius:8px;overflow:hidden}
.view-toggle button{padding:.5rem .8rem;font-size:.85rem;color:var(--text-secondary)}
.view-toggle button.active{background:var(--ink);color:#fff}
.sort-select{padding:.55rem .9rem;border:1px solid var(--line);border-radius:var(--radius-pill);background:#fff;font-size:.85rem;outline:none}

.empty{text-align:center;padding:4rem 1rem;color:var(--text-secondary)}
.empty svg{margin:0 auto 1rem}

/* mobile filter drawer */
.mobile-filter-btn{display:none;position:fixed;bottom:104px;left:50%;transform:translateX(-50%);z-index:90;background:var(--ink);color:#fff;padding:.8rem 1.4rem;border-radius:var(--radius-pill);box-shadow:var(--shadow-lg);font-size:.85rem;font-weight:600}
@media (max-width:980px){.mobile-filter-btn.show{display:block}}
.drawer{position:fixed;left:0;right:0;bottom:0;z-index:1100;background:#fff;border-top-left-radius:var(--radius-xl);border-top-right-radius:var(--radius-xl);max-height:85vh;overflow-y:auto;padding:1.4rem;transform:translateY(100%);transition:transform .3s ease}
.drawer.open{transform:translateY(0)}
.drawer-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1099;opacity:0;pointer-events:none;transition:opacity .3s}
.drawer-backdrop.open{opacity:1;pointer-events:auto}

/* ============================================================
   PROPERTY DETAIL
============================================================ */
.pd-gallery{position:relative}
.pd-main{width:100%;height:60vh;object-fit:cover;background:var(--mist);transition:opacity .25s}
.pd-thumbs{display:flex;gap:.5rem;padding:.7rem 0;overflow-x:auto}
.pd-thumb{width:120px;height:80px;flex:none;border-radius:8px;overflow:hidden;cursor:pointer;border:2px solid transparent;transition:var(--transition)}
.pd-thumb.active{border-color:var(--gold)}
.pd-thumb img{width:100%;height:100%;object-fit:cover}
.pd-view-all{position:absolute;bottom:90px;right:20px;background:rgba(13,13,13,.85);color:#fff;padding:.6rem 1.1rem;border-radius:var(--radius-pill);font-size:.85rem;backdrop-filter:blur(6px)}

.pd-layout{display:grid;grid-template-columns:1fr 380px;gap:2.5rem;margin-top:2rem}
@media (max-width:980px){.pd-layout{grid-template-columns:1fr}}

.pd-header{display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:1.4rem}
.pd-title{font-family:"Playfair Display",serif;font-size:var(--text-3xl);color:var(--ink)}
.pd-loc{color:var(--text-secondary);margin-top:.2rem}
.pd-price{font-family:"Playfair Display",serif;font-size:var(--text-3xl);color:var(--gold-dark);font-weight:700}
.pd-price small{font-family:"Outfit";font-size:.8rem;color:var(--text-secondary);font-weight:400;display:block;margin-top:.2rem}
.pd-actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.5rem}
.pd-action{display:inline-flex;align-items:center;gap:.4rem;padding:.55rem 1rem;border:1px solid var(--line);border-radius:var(--radius-pill);font-size:.82rem;background:#fff;transition:var(--transition);cursor:pointer}
.pd-action:hover{border-color:var(--gold);color:var(--gold-dark)}

.pd-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:1rem;background:var(--mist);border-radius:var(--radius-lg);padding:1.2rem;margin-bottom:2rem}
.pd-stat{text-align:center;display:flex;flex-direction:column;gap:.15rem}
.pd-stat strong{font-size:1.2rem;color:var(--ink);font-family:"Playfair Display",serif;font-weight:700}
.pd-stat span{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--text-secondary)}

.pd-tabs{display:flex;gap:.4rem;border-bottom:1px solid var(--line);margin-bottom:1.4rem;flex-wrap:wrap}
.pd-tab{padding:.8rem 1.2rem;font-weight:500;color:var(--text-secondary);border-bottom:2px solid transparent;margin-bottom:-1px;transition:var(--transition)}
.pd-tab.active{color:var(--ink);border-color:var(--gold)}
.pd-tabpanel{display:none}
.pd-tabpanel.active{display:block;animation:fade .3s ease}
@keyframes fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}

.feature-cols{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
@media (max-width:600px){.feature-cols{grid-template-columns:1fr}}
.feat-item{display:flex;align-items:center;gap:.6rem;padding:.5rem 0;color:var(--text-primary);font-size:.92rem}
.feat-item::before{content:"✓";color:var(--gold);font-weight:700}

.calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.4rem}
@media (max-width:600px){.calc-grid{grid-template-columns:1fr}}
.calc-grid label{display:block;font-size:.78rem;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.1em;margin-bottom:.3rem;font-weight:600}
.calc-grid input{width:100%;padding:.7rem .9rem;border:1px solid var(--line);border-radius:8px;outline:none}
.calc-result{background:var(--ink);color:#fff;padding:1.4rem;border-radius:var(--radius-lg)}
.calc-monthly{font-family:"Playfair Display",serif;font-size:var(--text-3xl);color:var(--gold);font-weight:700}
.calc-summary{display:flex;justify-content:space-between;flex-wrap:wrap;gap:.6rem;margin-top:.8rem;font-size:.85rem;color:rgba(255,255,255,.78)}
.calc-summary span strong{color:#fff}

.pd-side{display:flex;flex-direction:column;gap:1.2rem;position:sticky;top:calc(var(--nav-h) + 1rem);align-self:start}
@media (max-width:980px){.pd-side{position:static}}

.agent-side{background:#fff;border:1px solid var(--line);border-radius:var(--radius-lg);padding:1.4rem;text-align:center}
.agent-side img{width:90px;height:90px;border-radius:50%;margin:0 auto .8rem;object-fit:cover;border:3px solid var(--gold)}
.agent-side h4{font-family:"Playfair Display",serif;font-size:1.15rem;color:var(--ink)}
.agent-side .role{color:var(--gold);font-size:.78rem;letter-spacing:.15em;text-transform:uppercase;font-weight:600;margin-bottom:.6rem}
.agent-contact{display:flex;flex-direction:column;gap:.5rem;margin-top:1rem}

.inquiry-form{background:#fff;border:1px solid var(--line);border-radius:var(--radius-lg);padding:1.4rem}
.inquiry-form h4{font-family:"Playfair Display",serif;font-size:1.15rem;color:var(--ink);margin-bottom:.9rem}
.field{margin-bottom:.7rem}
.field input,.field textarea,.field select{width:100%;padding:.75rem .9rem;border:1px solid var(--line);border-radius:8px;outline:none;font-size:.9rem;transition:border-color var(--transition)}
.field input:focus,.field textarea:focus,.field select:focus{border-color:var(--gold)}
.field textarea{min-height:90px;resize:vertical;font-family:inherit}
.field .err{color:var(--error);font-size:.78rem;margin-top:.2rem;display:none}
.field.invalid .err{display:block}
.field.invalid input,.field.invalid textarea{border-color:var(--error)}
.char-count{text-align:right;font-size:.72rem;color:var(--text-muted);margin-top:.2rem}

.similar{margin-top:3rem}
.similar-row{display:flex;gap:1rem;overflow-x:auto;padding-bottom:1rem;scroll-snap-type:x mandatory}
.similar-row .pcard{min-width:280px;scroll-snap-align:start}

/* ============================================================
   ABOUT
============================================================ */
.story{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
@media (max-width:880px){.story{grid-template-columns:1fr}}
.story-img{position:relative}
.story-img img{border-radius:var(--radius-lg);width:100%;height:480px;object-fit:cover}
.story-img::before{content:"";position:absolute;inset:-15px -15px 15px 15px;border:2px solid var(--gold);border-radius:var(--radius-lg);z-index:-1}
.float-stat{position:absolute;bottom:-30px;left:-30px;background:#fff;padding:1.2rem 1.6rem;border-radius:var(--radius-lg);box-shadow:var(--shadow-xl);text-align:center}
.float-stat strong{display:block;font-family:"Playfair Display",serif;font-size:2rem;color:var(--gold)}
.float-stat span{color:var(--text-secondary);font-size:.8rem;text-transform:uppercase;letter-spacing:.1em}
@media (max-width:880px){.float-stat{position:static;margin-top:1rem}}

.mvv{background:var(--ink);color:#fff;padding:var(--space-4xl) 0}
.mvv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem}
.mvv-card{background:#1c1c1e;padding:2rem;border-radius:var(--radius-lg);transition:var(--transition);border:1px solid #2c2c2e}
.mvv-card:hover{border-color:var(--gold);transform:translateY(-4px)}
.mvv-card .icon{width:54px;height:54px;border-radius:12px;background:rgba(198,168,75,.15);color:var(--gold);display:grid;place-items:center;margin-bottom:1rem;font-size:1.4rem}
.mvv-card h3{font-family:"Playfair Display",serif;font-size:1.4rem;margin-bottom:.6rem}
.mvv-card p{color:rgba(255,255,255,.7);font-size:.95rem}
@media (max-width:780px){.mvv-grid{grid-template-columns:1fr}}

.timeline{position:relative;max-width:820px;margin:0 auto;padding:2rem 0}
.timeline::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,transparent,var(--gold),transparent)}
.tl-item{position:relative;width:50%;padding:1rem 2.5rem}
.tl-item:nth-child(odd){left:0;text-align:right}
.tl-item:nth-child(even){left:50%}
.tl-item::before{content:"";position:absolute;top:1.4rem;width:14px;height:14px;border-radius:50%;background:var(--gold);border:3px solid #fff;box-shadow:0 0 0 3px var(--gold)}
.tl-item:nth-child(odd)::before{right:-7px}
.tl-item:nth-child(even)::before{left:-7px}
.tl-year{font-family:"Playfair Display",serif;color:var(--gold);font-size:1.3rem;font-weight:700}
.tl-item h4{font-family:"Playfair Display",serif;color:var(--ink);font-size:1.1rem;margin:.2rem 0}
.tl-item p{color:var(--text-secondary);font-size:.88rem}
@media (max-width:680px){
  .timeline::before{left:14px}
  .tl-item,.tl-item:nth-child(even){width:100%;left:0;text-align:left;padding-left:2.4rem;padding-right:0}
  .tl-item::before{left:7px!important;right:auto!important}
}

.certs{display:flex;flex-wrap:wrap;justify-content:center;gap:1.4rem;margin-top:2rem}
.cert{padding:1.2rem 1.6rem;border:1px solid var(--line);border-radius:var(--radius-lg);font-family:"Playfair Display",serif;color:var(--text-secondary);font-style:italic;letter-spacing:.05em;background:#fff;transition:var(--transition)}
.cert:hover{border-color:var(--gold);color:var(--gold-dark);transform:translateY(-2px)}

/* ============================================================
   SERVICES
============================================================ */
.svc-section{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;padding:var(--space-4xl) 0;border-bottom:1px solid var(--line)}
.svc-section.flip .svc-img{order:2}
@media (max-width:880px){.svc-section,.svc-section.flip{grid-template-columns:1fr}.svc-section.flip .svc-img{order:0}}
.svc-img img{width:100%;height:440px;object-fit:cover;border-radius:var(--radius-lg)}
.svc-content h2{font-family:"Playfair Display",serif;font-size:var(--text-3xl);margin-bottom:1rem;color:var(--ink)}
.svc-bullets{display:grid;gap:.5rem;margin:1.2rem 0}
.svc-bullets li{display:flex;align-items:center;gap:.55rem;color:var(--text-primary)}
.svc-bullets li::before{content:"✦";color:var(--gold)}
.svc-steps{display:flex;gap:1rem;margin:1.4rem 0}
.svc-step{flex:1;padding:.8rem;border-left:3px solid var(--gold);background:var(--mist);border-radius:0 8px 8px 0}
.svc-step strong{display:block;font-family:"Playfair Display",serif;color:var(--gold-dark)}

.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem;margin-top:2rem}
@media (max-width:880px){.pricing-grid{grid-template-columns:1fr}}
.pcard-tier{background:#fff;border:1px solid var(--line);border-radius:var(--radius-lg);padding:2rem;transition:var(--transition);text-align:center}
.pcard-tier.featured{background:var(--ink);color:#fff;transform:scale(1.04);border-color:var(--gold);box-shadow:var(--shadow-xl)}
.pcard-tier:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.pcard-tier.featured:hover{transform:scale(1.04) translateY(-4px)}
.pcard-tier h3{font-family:"Playfair Display",serif;font-size:1.5rem;margin-bottom:.4rem}
.pcard-tier .price{font-family:"Playfair Display",serif;font-size:2.4rem;color:var(--gold);font-weight:700;margin:.8rem 0}
.pcard-tier ul{margin:1.4rem 0;display:flex;flex-direction:column;gap:.5rem;text-align:left}
.pcard-tier ul li{display:flex;gap:.5rem;font-size:.92rem}
.pcard-tier ul li::before{content:"✓";color:var(--gold)}

.faq-item{border-bottom:1px solid var(--line)}
.faq-q{display:flex;justify-content:space-between;align-items:center;padding:1.2rem 0;cursor:pointer;font-family:"Playfair Display",serif;font-size:1.1rem;color:var(--ink)}
.faq-toggle{width:28px;height:28px;border-radius:50%;background:var(--mist);display:grid;place-items:center;font-weight:700;transition:var(--transition);color:var(--gold-dark)}
.faq-item.open .faq-toggle{background:var(--gold);color:var(--ink);transform:rotate(45deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease;color:var(--text-secondary)}
.faq-item.open .faq-a{max-height:300px;padding-bottom:1.2rem}

/* ============================================================
   CONTACT
============================================================ */
.contact-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:2.5rem}
@media (max-width:880px){.contact-grid{grid-template-columns:1fr}}
.info-panel{background:var(--ink);color:#fff;padding:2rem;border-radius:var(--radius-lg);display:flex;flex-direction:column;gap:1.4rem}
.info-panel h3{font-family:"Playfair Display",serif;color:var(--gold)}
.info-panel .row{display:flex;gap:.7rem;align-items:flex-start;font-size:.9rem;color:rgba(255,255,255,.8)}
.info-panel .row .ico{width:34px;height:34px;border-radius:50%;background:rgba(198,168,75,.15);color:var(--gold);display:grid;place-items:center;flex:none}

.seg-reasons{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1rem}
.seg-reasons button{padding:.55rem 1.1rem;border-radius:var(--radius-pill);background:var(--mist);font-size:.85rem;font-weight:500}
.seg-reasons button.active{background:var(--ink);color:#fff}

.offices-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem;margin-top:2rem}
@media (max-width:880px){.offices-grid{grid-template-columns:1fr}}
.office-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius-lg);overflow:hidden;transition:var(--transition)}
.office-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.office-card img{aspect-ratio:16/10;object-fit:cover;width:100%}
.office-body{padding:1.2rem}
.office-body h3{font-family:"Playfair Display",serif;color:var(--ink);font-size:1.3rem;margin-bottom:.4rem}

/* Confetti */
.confetti{position:fixed;inset:0;pointer-events:none;z-index:1500;overflow:hidden}
.confetti span{position:absolute;width:8px;height:14px;top:-20px;animation:confetti-fall 2.4s linear forwards}
@keyframes confetti-fall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}

/* ============================================================
   FOOTER
============================================================ */
footer{background:var(--ink);color:rgba(255,255,255,.75);padding:var(--space-4xl) 0 1.4rem;margin-top:var(--space-4xl)}
.f-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.4fr;gap:2rem}
@media (max-width:880px){.f-grid{grid-template-columns:1fr 1fr}}
@media (max-width:520px){.f-grid{grid-template-columns:1fr}}
.f-col h4{font-family:"Playfair Display",serif;color:#fff;font-size:1.05rem;margin-bottom:1rem}
.f-col a{display:block;padding:.3rem 0;color:rgba(255,255,255,.6);font-size:.92rem;transition:var(--transition)}
.f-col a:hover{color:var(--gold)}
.f-brand p{margin:1rem 0;color:rgba(255,255,255,.55);font-size:.9rem;max-width:300px}
.f-social{display:flex;gap:.6rem;margin-top:.8rem}
.f-social a{width:38px;height:38px;border-radius:50%;background:#1c1c1e;display:grid;place-items:center;color:#fff;padding:0}
.f-social a:hover{background:var(--gold);color:var(--ink)}
.f-divider{height:1px;background:linear-gradient(to right,transparent,var(--gold),transparent);margin:2.4rem 0 1.4rem}
.f-bottom{display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;font-size:.82rem;color:rgba(255,255,255,.5)}
.f-bottom .links{display:flex;gap:1.2rem;flex-wrap:wrap}
.f-bottom .links a:hover{color:var(--gold)}

/* ============================================================
   FLOATING WIDGETS
============================================================ */
.fab-whatsapp{
  position:fixed;bottom:28px;right:28px;width:56px;height:56px;border-radius:50%;
  background:var(--green);color:#fff;display:grid;place-items:center;
  box-shadow:var(--shadow-lg);z-index:900;transition:var(--transition);
}
.fab-whatsapp:hover{transform:scale(1.05)}
.fab-whatsapp::before{content:"";position:absolute;inset:-6px;border-radius:50%;border:2px solid var(--green);animation:pulse 2s infinite;opacity:.6}
.fab-whatsapp .tip{position:absolute;right:70px;top:50%;transform:translateY(-50%);background:var(--ink);color:#fff;padding:.5rem .8rem;border-radius:8px;font-size:.78rem;white-space:nowrap;opacity:0;pointer-events:none;transition:var(--transition)}
.fab-whatsapp:hover .tip{opacity:1;right:78px}
@keyframes pulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.4);opacity:0}}
@media (max-width:600px){.fab-whatsapp{width:64px;height:64px;bottom:20px;right:20px}}

.fab-top{
  position:fixed;bottom:96px;right:28px;width:46px;height:46px;border-radius:50%;
  background:var(--gold);color:#fff;display:grid;place-items:center;
  box-shadow:var(--shadow-md);z-index:899;opacity:0;pointer-events:none;
  transition:opacity var(--transition),transform var(--transition);
  transform:translateY(10px);
}
.fab-top.show{opacity:1;pointer-events:auto;transform:translateY(0)}
.fab-top:hover{background:var(--gold-dark)}
@media (max-width:600px){.fab-top{right:24px;bottom:96px}}

/* ============================================================
   COOKIES
============================================================ */
.cookie{
  position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:950;
  background:var(--ink);color:#fff;padding:1rem 1.2rem;border-radius:var(--radius-lg);
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.8rem;
  box-shadow:var(--shadow-xl);max-width:680px;margin-inline:auto;
  transform:translateY(150%);transition:transform .4s ease;
}
.cookie.show{transform:translateY(0)}
.cookie p{font-size:.88rem;color:rgba(255,255,255,.85)}

/* ============================================================
   TOAST
============================================================ */
.toast-wrap{position:fixed;top:90px;right:20px;z-index:1600;display:flex;flex-direction:column;gap:.6rem;max-width:340px}
.toast{
  background:#fff;border-left:4px solid var(--gold);padding:.9rem 1.1rem;border-radius:8px;
  box-shadow:var(--shadow-lg);display:flex;align-items:center;gap:.7rem;
  animation:toast-in .3s ease;font-size:.88rem;
}
.toast.success{border-color:var(--success)}
.toast.error{border-color:var(--error)}
.toast.warning{border-color:var(--warning)}
.toast.out{animation:toast-out .3s ease forwards}
.toast button{margin-left:auto;font-size:1.1rem;color:var(--text-secondary)}
@keyframes toast-in{from{transform:translateX(120%);opacity:0}}
@keyframes toast-out{to{transform:translateX(120%);opacity:0}}

/* ============================================================
   MODALS / LIGHTBOX
============================================================ */
.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(6px);z-index:1400;display:grid;place-items:center;opacity:0;pointer-events:none;transition:opacity .25s}
.modal-backdrop.open{opacity:1;pointer-events:auto}
.modal{background:#fff;border-radius:var(--radius-lg);max-width:600px;width:92%;max-height:85vh;overflow-y:auto;padding:1.8rem;transform:scale(.95);transition:transform .25s}
.modal-backdrop.open .modal{transform:scale(1)}
.modal h3{font-family:"Playfair Display",serif;font-size:1.5rem;margin-bottom:.8rem;color:var(--ink)}
.modal-close{position:absolute;top:14px;right:18px;font-size:1.4rem;color:var(--text-secondary);width:34px;height:34px;border-radius:50%;background:var(--mist);display:grid;place-items:center}
.modal-wide .modal{max-width:920px}

.lightbox{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:1500;display:none;align-items:center;justify-content:center;flex-direction:column}
.lightbox.open{display:flex}
.lightbox img{max-width:92%;max-height:80vh;object-fit:contain}
.lb-counter{color:#fff;font-size:.9rem;letter-spacing:.1em;margin-top:1rem}
.lb-close{position:absolute;top:20px;right:20px;color:#fff;font-size:1.6rem;width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,.1)}
.lb-arrow{position:absolute;top:50%;transform:translateY(-50%);width:50px;height:50px;border-radius:50%;background:rgba(255,255,255,.15);color:#fff;display:grid;place-items:center;font-size:1.4rem}
.lb-prev{left:20px}.lb-next{right:20px}

/* Compare */
.compare-table{width:100%;border-collapse:collapse;font-size:.88rem}
.compare-table th,.compare-table td{padding:.7rem;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}
.compare-table th{background:var(--mist);font-weight:600}
.compare-table img{width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:.5rem}

/* ============================================================
   PROGRESS BAR
============================================================ */
.route-progress{position:fixed;top:0;left:0;right:0;height:3px;background:var(--gold);z-index:1300;transform:scaleX(0);transform-origin:left;transition:transform .3s ease}
.route-progress.loading{transform:scaleX(.7)}
.route-progress.done{transform:scaleX(1);opacity:0;transition:transform .2s,opacity .3s .2s}

/* ============================================================
   SCROLL REVEAL
============================================================ */
.reveal-up,.reveal-left,.reveal-right,.reveal-fade{opacity:0;transition:opacity .7s ease,transform .7s ease;transition-delay:var(--delay,0s)}
.reveal-up{transform:translateY(40px)}
.reveal-left{transform:translateX(-40px)}
.reveal-right{transform:translateX(40px)}
.reveal-up.in,.reveal-left.in,.reveal-right.in,.reveal-fade.in{opacity:1;transform:none}

/* page transition fade */
#app.fading{opacity:0;transition:opacity .2s}
#app{opacity:1;transition:opacity .2s}

/* prefers-reduced-motion */
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}
}
`;
const SITE_JS = "\n/* ===========================================================\n   DATA\n=========================================================== */\nconst AGENTS = [\n  { id:'a1', name:'Hassan Bello',     role:'Principal Consultant', specialty:'Luxury Estates', rating:4.9, sold:128, photo:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format', phone:'+23490322992421', email:'hassan@sabiositaproperties.com', whatsapp:'23490322992421' },\n  { id:'a2', name:'Aisha Mohammed',   role:'Senior Sales Lead',    specialty:'Residential',     rating:4.8, sold:97,  photo:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format', phone:'+23490322992422', email:'aisha@sabiositaproperties.com', whatsapp:'23490322992422' },\n  { id:'a3', name:'Tunde Ajayi',      role:'Commercial Director',  specialty:'Commercial',      rating:4.9, sold:84,  photo:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format', phone:'+23490322992423', email:'tunde@sabiositaproperties.com', whatsapp:'23490322992423' },\n  { id:'a4', name:'Chioma Okeke',     role:'Rental Specialist',    specialty:'Apartments',      rating:4.7, sold:142, photo:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format', phone:'+23490322992424', email:'chioma@sabiositaproperties.com', whatsapp:'23490322992424' },\n  { id:'a5', name:'Yusuf Ibrahim',    role:'Investment Advisor',   specialty:'Land & Plots',    rating:4.8, sold:63,  photo:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format', phone:'+23490322992425', email:'yusuf@sabiositaproperties.com', whatsapp:'23490322992425' },\n  { id:'a6', name:'Funmi Adeyemi',    role:'Property Manager',     specialty:'Management',      rating:4.9, sold:71,  photo:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format', phone:'+23490322992426', email:'funmi@sabiositaproperties.com', whatsapp:'23490322992426' }\n];\nconst agent = i => AGENTS[i % AGENTS.length];\n\nconst IMG = url => url + (url.includes('?')?'&':'?') + 'w=900&q=80&auto=format';\n\nconst PROPERTIES = [\n  { id:1, slug:'cliffside-villa-ikoyi', title:'Cliffside Modern Villa', type:'Villa', listing:'Sale',\n    price:380000000, location:'Banana Island', area:'Ikoyi', state:'Lagos',\n    coordinates:{lat:6.4396,lng:3.4419}, beds:5, baths:6, toilets:7, size:7200, yearBuilt:2022, parking:4, floors:3,\n    featured:true, badge:'Luxury', verified:true, views:1284, saves:96,\n    shortDesc:'Bespoke 5-bedroom waterfront villa with private dock and infinity pool.',\n    description:'Set on a rare half-acre plot with direct lagoon frontage, this masterpiece pairs minimalist Italian architecture with warm Nigerian craftsmanship. Floor-to-ceiling glass opens to a 25-meter infinity pool that mirrors the Lagos skyline at sunset.\\n\\nThe interior unfolds across three levels of curated living space — a triple-volume foyer, a chef-grade kitchen by Boffi, six en-suite bedrooms, and a rooftop entertainment deck with outdoor cinema. Smart-home throughout (Lutron, Sonos, KNX).\\n\\nIncluded: 24-hour security, 200 KVA generator, 30,000-liter water treatment, staff quarters, and four covered parking bays.',\n    amenities:['Infinity Pool','Smart Home','Private Dock','Gym','Cinema','Wine Cellar','Generator','Security','Parking'],\n    images:[\n      'https://images.unsplash.com/photo-1613490493576-7fde63acd811',\n      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',\n      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',\n      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',\n      'https://images.unsplash.com/photo-1600573472556-e636c2acda88'\n    ],\n    agentIdx:0,\n    nearby:{schools:['Greensprings School','British International'],hospitals:['Reddington Hospital','Lagoon Hospital'],malls:['The Palms','Ikoyi Mall']},\n    dateAdded:'2025-03-12', status:'available' },\n\n  { id:2, slug:'penthouse-eko-atlantic', title:'Sky Penthouse Eko Atlantic', type:'Apartment', listing:'Sale',\n    price:450000000, location:'Eko Pearl Towers', area:'Eko Atlantic', state:'Lagos',\n    coordinates:{lat:6.4031,lng:3.4046}, beds:4, baths:5, toilets:5, size:5400, yearBuilt:2023, parking:3, floors:1,\n    featured:true, badge:'New Listing', verified:true, views:892, saves:64,\n    shortDesc:'Top-floor penthouse with 360° ocean views and private rooftop terrace.',\n    description:'Crowning the iconic Eko Pearl Towers, this 5,400 sqft penthouse offers an uninterrupted 360° panorama of the Atlantic Ocean and Victoria Island skyline. A private elevator opens directly into a sun-drenched 18-foot great room.\\n\\nThe 1,200 sqft rooftop terrace features a heated jacuzzi, summer kitchen, and lounging garden — all wrapped in minimalist limestone and warm teak.\\n\\nResidence amenities include valet, concierge, two infinity pools, spa, and a co-working lounge on the executive floor.',\n    amenities:['Ocean View','Private Elevator','Concierge','Pool','Spa','Gym','Generator','Security','Parking'],\n    images:[\n      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',\n      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',\n      'https://images.unsplash.com/photo-1493809842364-78817add7ffb',\n      'https://images.unsplash.com/photo-1505691938895-1758d7feb511',\n      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'\n    ], agentIdx:1,\n    nearby:{schools:['Lekki British','Children\\'s International'],hospitals:['First Cardiology','EkoCorp Hospital'],malls:['Eko Hotel Mall','Maryland Mall']},\n    dateAdded:'2025-04-02', status:'available' },\n\n  { id:3, slug:'family-house-lekki', title:'5-Bed Family Home, Lekki Phase 1', type:'House', listing:'Sale',\n    price:185000000, location:'Lekki Phase 1', area:'Lekki', state:'Lagos',\n    coordinates:{lat:6.4474,lng:3.4732}, beds:5, baths:5, toilets:6, size:4200, yearBuilt:2020, parking:4, floors:2,\n    featured:true, badge:'Verified', verified:true, views:642, saves:38,\n    shortDesc:'Spacious family home in a serene gated estate.',\n    description:'Located in one of Lekki\\'s most sought-after gated estates, this beautifully finished 5-bedroom detached duplex sits on 600 sqm of landscaped grounds. Each en-suite bedroom features built-in wardrobes and balcony access.\\n\\nThe ground floor opens onto a generous garden, perfect for family entertaining. A separate 2-bedroom boys\\' quarters provides flexibility for staff or guests.\\n\\nEstate amenities include 24-hour security with biometric entry, paved roads, communal park, and reliable infrastructure.',\n    amenities:['Garden','Boys Quarters','Generator','Security','Parking','Borehole'],\n    images:[\n      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',\n      'https://images.unsplash.com/photo-1568605114967-8130f3a36994',\n      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',\n      'https://images.unsplash.com/photo-1570129477492-45c003edd2be',\n      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'\n    ], agentIdx:2,\n    nearby:{schools:['Greenwood House','Corona School'],hospitals:['First Consultants','Mainland Hospital'],malls:['The Palms','Circle Mall']},\n    dateAdded:'2025-02-18', status:'available' },\n\n  { id:4, slug:'serviced-apartment-vi', title:'Serviced 2-Bed, Victoria Island', type:'Apartment', listing:'Rent',\n    price:18000000, priceLabel:'/year', location:'Adeola Odeku', area:'Victoria Island', state:'Lagos',\n    coordinates:{lat:6.4281,lng:3.4219}, beds:2, baths:3, toilets:3, size:1450, yearBuilt:2021, parking:2, floors:1,\n    featured:false, badge:'Hot Deal', verified:true, views:1502, saves:121,\n    shortDesc:'Fully-serviced executive apartment in the heart of VI.',\n    description:'A turnkey serviced 2-bedroom apartment ideal for executives and diplomats. Floor-to-ceiling glass overlooks the V/I skyline, while the open-plan kitchen comes fitted with premium German appliances.\\n\\nRent includes 24/7 power, water, internet, full housekeeping (5 days a week), and access to the rooftop pool, gym, and business lounge.\\n\\nWalk to the lagoon, top dining, embassies, and the Eko Atlantic boardwalk in minutes.',\n    amenities:['Pool','Gym','Concierge','24/7 Power','Internet','Housekeeping','Security','Parking'],\n    images:[\n      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',\n      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc',\n      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',\n      'https://images.unsplash.com/photo-1554995207-c18c203602cb',\n      'https://images.unsplash.com/photo-1493809842364-78817add7ffb'\n    ], agentIdx:3,\n    nearby:{schools:['Children\\'s International','Atlantic Hall'],hospitals:['Reddington','First Cardiology'],malls:['Eko Hotel Mall','City Mall']},\n    dateAdded:'2025-04-21', status:'available' },\n\n  { id:5, slug:'duplex-maitama-abuja', title:'Contemporary Duplex, Maitama', type:'House', listing:'Sale',\n    price:265000000, location:'Maitama District', area:'Maitama', state:'Abuja',\n    coordinates:{lat:9.0856,lng:7.4928}, beds:5, baths:6, toilets:6, size:5800, yearBuilt:2022, parking:5, floors:2,\n    featured:false, badge:'New Listing', verified:true, views:412, saves:27,\n    shortDesc:'Architecturally striking duplex in Abuja\\'s premier diplomatic enclave.',\n    description:'Set among the embassies of Maitama, this signature 5-bedroom duplex is finished to international standards. A double-height marble foyer leads to interconnected entertainment rooms with garden views.\\n\\nThe rear grounds feature a 12-meter heated pool, outdoor lounge, and a fully fitted barbecue kitchen. Each bedroom is en-suite with walk-in dressing.\\n\\nIncludes a fully serviced 2-bedroom guest house, 100 KVA generator, and treated water plant.',\n    amenities:['Pool','BBQ Kitchen','Guest House','Smart Home','Generator','Security','Parking'],\n    images:[\n      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',\n      'https://images.unsplash.com/photo-1613490493576-7fde63acd811',\n      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',\n      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',\n      'https://images.unsplash.com/photo-1600573472556-e636c2acda88'\n    ], agentIdx:4,\n    nearby:{schools:['Regent School Abuja','Lead British'],hospitals:['Cedarcrest','Nizamiye Hospital'],malls:['Jabi Lake Mall','Ceddi Plaza']},\n    dateAdded:'2025-03-29', status:'available' },\n\n  { id:6, slug:'office-tower-vi', title:'Grade-A Office Floor, V/I', type:'Commercial', listing:'Rent',\n    price:42000000, priceLabel:'/year', location:'Akin Adesola', area:'Victoria Island', state:'Lagos',\n    coordinates:{lat:6.4290,lng:3.4150}, beds:0, baths:4, toilets:8, size:8500, yearBuilt:2019, parking:18, floors:1,\n    featured:false, badge:'Verified', verified:true, views:284, saves:14,\n    shortDesc:'8,500 sqft Grade-A office floor with raised flooring and curtain walling.',\n    description:'A full-floor Grade-A workspace within one of V/I\\'s newest commercial towers. The floor plate offers 8,500 sqft of raised flooring, a glass curtain wall, and 360° views.\\n\\nPrewired for fiber, with redundant power feeds, four high-speed elevators, and 18 dedicated parking bays.\\n\\nBuilding amenities include a ground-floor café, conference center, and 24/7 security with concierge.',\n    amenities:['Raised Flooring','Fiber Internet','24/7 Power','Conference Center','Café','Parking','Security'],\n    images:[\n      'https://images.unsplash.com/photo-1497366216548-37526070297c',\n      'https://images.unsplash.com/photo-1497366811353-6870744d04b2',\n      'https://images.unsplash.com/photo-1564069114553-7215e1ff1890',\n      'https://images.unsplash.com/photo-1577760258779-e787a1733016',\n      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6'\n    ], agentIdx:2,\n    nearby:{schools:[],hospitals:['Reddington Hospital'],malls:['Eko Hotel Mall']},\n    dateAdded:'2025-01-22', status:'available' },\n\n  { id:7, slug:'mini-flat-yaba', title:'Modern Mini Flat, Yaba', type:'Apartment', listing:'Rent',\n    price:1800000, priceLabel:'/year', location:'Sabo Yaba', area:'Yaba', state:'Lagos',\n    coordinates:{lat:6.5095,lng:3.3711}, beds:1, baths:1, toilets:1, size:480, yearBuilt:2023, parking:1, floors:1,\n    featured:false, badge:'New Listing', verified:true, views:986, saves:74,\n    shortDesc:'Smart, compact apartment perfect for young professionals.',\n    description:'A bright, well-finished mini flat in the buzzing Yaba tech corridor. Open-plan living with built-in kitchen, fully tiled bathroom, and POP ceilings throughout.\\n\\nThe building includes prepaid metering, secure access, fiber-ready risers, and shared parking. Walking distance to Yabatech, cafés, and the Co-Creation Hub.\\n\\nIdeal for engineers, students, or creatives seeking a hassle-free urban base.',\n    amenities:['Prepaid Meter','Fiber Ready','Security','Parking','Tiled Floor','POP Ceiling'],\n    images:[\n      'https://images.unsplash.com/photo-1502672023488-70e25813eb80',\n      'https://images.unsplash.com/photo-1505691938895-1758d7feb511',\n      'https://images.unsplash.com/photo-1493809842364-78817add7ffb',\n      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc',\n      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136'\n    ], agentIdx:3,\n    nearby:{schools:['Yabatech','UNILAG'],hospitals:['LUTH','Havana Specialist'],malls:['Tejuosho Mall']},\n    dateAdded:'2025-04-30', status:'available' },\n\n  { id:7.1, slug:'land-epe', title:'Prime Residential Land, Epe', type:'Land', listing:'Sale',\n    price:15000000, location:'Epe Expressway', area:'Epe', state:'Lagos',\n    coordinates:{lat:6.5847,lng:3.9817}, beds:0, baths:0, toilets:0, size:600, yearBuilt:0, parking:0, floors:0,\n    featured:false, badge:'Hot Deal', verified:true, views:534, saves:48,\n    shortDesc:'600 sqm dry land with C of O along Epe Expressway corridor.',\n    description:'A serviced 600 sqm residential plot inside a master-planned community. The land is dry, well-drained, and gazetted with a Certificate of Occupancy.\\n\\nGraded internal roads, perimeter fencing, and underground drainage already in place. The community plan includes a clubhouse, schools, and retail center scheduled for 2026.\\n\\nEpe is one of Lagos\\' fastest-appreciating corridors thanks to the Lekki Free Zone and Dangote Refinery developments.',\n    amenities:['C of O','Graded Roads','Fenced Estate','Drainage','24-hr Security'],\n    images:[\n      'https://images.unsplash.com/photo-1500382017468-9049fed747ef',\n      'https://images.unsplash.com/photo-1572370522994-6f1462b80bef',\n      'https://images.unsplash.com/photo-1589923188900-85dae523342b',\n      'https://images.unsplash.com/photo-1500382017468-9049fed747ef',\n      'https://images.unsplash.com/photo-1505855265981-d52719d1f37b'\n    ], agentIdx:4,\n    nearby:{schools:['Future Estate'],hospitals:[],malls:[]},\n    dateAdded:'2025-03-04', status:'available' },\n\n  { id:8, slug:'townhouse-asokoro', title:'Townhouse, Asokoro', type:'House', listing:'Rent',\n    price:24000000, priceLabel:'/year', location:'Asokoro', area:'Asokoro', state:'Abuja',\n    coordinates:{lat:9.0494,lng:7.5247}, beds:4, baths:4, toilets:5, size:3200, yearBuilt:2018, parking:3, floors:2,\n    featured:false, badge:'Verified', verified:true, views:367, saves:22,\n    shortDesc:'Family-ready 4-bed townhouse in a quiet diplomatic enclave.',\n    description:'A spacious 4-bedroom townhouse arranged across two airy floors. The house benefits from extensive natural light, a private rear garden, and a separate utility wing.\\n\\nFinished with porcelain tiles, oak parquet in bedrooms, and Italian sanitary ware. The kitchen is fully fitted with imported cabinetry.\\n\\nClose to the Presidential Villa, embassies, and key government institutions. Estate offers gated security and shared green space.',\n    amenities:['Garden','Fitted Kitchen','Generator','Security','Parking'],\n    images:[\n      'https://images.unsplash.com/photo-1568605114967-8130f3a36994',\n      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',\n      'https://images.unsplash.com/photo-1570129477492-45c003edd2be',\n      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',\n      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'\n    ], agentIdx:1,\n    nearby:{schools:['Regent','Capital Science Academy'],hospitals:['Cedarcrest','National Hospital'],malls:['Ceddi Plaza','Banex Plaza']},\n    dateAdded:'2025-02-09', status:'available' },\n\n  { id:9, slug:'villa-asaba', title:'Riverside Villa, Port Harcourt', type:'Villa', listing:'Sale',\n    price:175000000, location:'Old GRA', area:'Port Harcourt', state:'Rivers',\n    coordinates:{lat:4.8156,lng:7.0498}, beds:5, baths:5, toilets:6, size:4800, yearBuilt:2021, parking:4, floors:2,\n    featured:false, badge:'Price Reduced', verified:true, views:298, saves:18,\n    shortDesc:'Quiet riverside 5-bedroom villa with spacious grounds.',\n    description:'Tucked into a leafy corner of Port Harcourt\\'s Old GRA, this villa enjoys a rare riverside aspect across a private garden. All bedrooms en-suite with bespoke joinery.\\n\\nGround floor includes a formal dining wing, family lounge, and a fitted kitchen opening onto a covered patio. A 50 sqm staff quarters and dedicated guard house complete the compound.\\n\\nRecently reduced for a quick close. Suits a senior executive family or international relocation.',\n    amenities:['River View','Patio','Staff Quarters','Generator','Security','Parking'],\n    images:[\n      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',\n      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',\n      'https://images.unsplash.com/photo-1613490493576-7fde63acd811',\n      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',\n      'https://images.unsplash.com/photo-1600573472556-e636c2acda88'\n    ], agentIdx:0,\n    nearby:{schools:['Charles Dale','Graceland International'],hospitals:['Pamo Clinics','UPTH'],malls:['Port Harcourt Mall']},\n    dateAdded:'2024-12-14', status:'available' },\n\n  { id:10, slug:'studio-ibadan', title:'Studio Apartment, Bodija', type:'Apartment', listing:'Rent',\n    price:1200000, priceLabel:'/year', location:'Bodija', area:'Ibadan', state:'Oyo',\n    coordinates:{lat:7.4265,lng:3.9133}, beds:1, baths:1, toilets:1, size:380, yearBuilt:2022, parking:1, floors:1,\n    featured:false, badge:'Hot Deal', verified:true, views:712, saves:55,\n    shortDesc:'Compact studio in established Bodija — ready to move in.',\n    description:'Brand new studio apartment within a small modern block in Bodija. Features include open-plan living, a tiled kitchenette, and a private en-suite bathroom.\\n\\nThe building offers shared back-up power, prepaid water, and gated parking. Bodija puts you near UI, supermarkets, and the Ibadan tech hubs.\\n\\nLow-maintenance and affordable — perfect for students, NYSC members, or starters.',\n    amenities:['Back-up Power','Prepaid Water','Security','Parking','Tiled'],\n    images:[\n      'https://images.unsplash.com/photo-1502672023488-70e25813eb80',\n      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',\n      'https://images.unsplash.com/photo-1493809842364-78817add7ffb',\n      'https://images.unsplash.com/photo-1505691938895-1758d7feb511',\n      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc'\n    ], agentIdx:3,\n    nearby:{schools:['University of Ibadan'],hospitals:['UCH'],malls:['Heritage Mall','Cocoa Mall']},\n    dateAdded:'2025-04-12', status:'available' },\n\n  { id:11, slug:'shop-warehouse-ph', title:'Warehouse Complex, Trans Amadi', type:'Commercial', listing:'Sale',\n    price:220000000, location:'Trans Amadi Industrial', area:'Port Harcourt', state:'Rivers',\n    coordinates:{lat:4.8052,lng:7.0397}, beds:0, baths:2, toilets:4, size:14000, yearBuilt:2017, parking:30, floors:1,\n    featured:false, badge:'Verified', verified:true, views:174, saves:9,\n    shortDesc:'14,000 sqft logistics warehouse with admin block and yard.',\n    description:'Industrial warehouse complex with a 14,000 sqft heated/insulated bay, 8m clear height, and four loading docks. A two-story admin block adds 1,800 sqft of office space.\\n\\nThe site sits on 1.2 hectares with a fully tarmacked yard, perimeter wall, and 60 KVA standby generator. Ideal for FMCG, oil & gas, or e-commerce fulfillment.\\n\\nDirect access to Trans Amadi industrial corridor.',\n    amenities:['Loading Docks','Office Block','Standby Power','Yard','Security','Parking'],\n    images:[\n      'https://images.unsplash.com/photo-1553413077-190dd305871c',\n      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492',\n      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',\n      'https://images.unsplash.com/photo-1497366216548-37526070297c',\n      'https://images.unsplash.com/photo-1577760258779-e787a1733016'\n    ], agentIdx:2,\n    nearby:{schools:[],hospitals:[],malls:[]},\n    dateAdded:'2024-11-08', status:'available' },\n\n  { id:12, slug:'land-abuja-airport', title:'Acreage Plot, Abuja Airport Road', type:'Land', listing:'Sale',\n    price:38000000, location:'Lugbe', area:'Lugbe', state:'Abuja',\n    coordinates:{lat:8.9762,lng:7.3636}, beds:0, baths:0, toilets:0, size:1000, yearBuilt:0, parking:0, floors:0,\n    featured:false, badge:'New Listing', verified:true, views:402, saves:31,\n    shortDesc:'1,000 sqm prime land along the Abuja Airport corridor.',\n    description:'Strategically located 1,000 sqm plot inside a fast-growing residential community along Airport Road. Ideal for a private home or a small block of flats.\\n\\nDocuments include Right of Occupancy and a registered deed. The estate has graded roads and underground drainage.\\n\\nProximity to the Nnamdi Azikiwe International Airport, the new rail line, and Centenary City makes this a strong appreciation play.',\n    amenities:['R of O','Graded Roads','Drainage','Estate'],\n    images:[\n      'https://images.unsplash.com/photo-1500382017468-9049fed747ef',\n      'https://images.unsplash.com/photo-1572370522994-6f1462b80bef',\n      'https://images.unsplash.com/photo-1505855265981-d52719d1f37b',\n      'https://images.unsplash.com/photo-1589923188900-85dae523342b',\n      'https://images.unsplash.com/photo-1500382017468-9049fed747ef'\n    ], agentIdx:4,\n    nearby:{schools:[],hospitals:[],malls:['Dunes Mall']},\n    dateAdded:'2025-04-24', status:'available' },\n\n  { id:13, slug:'luxury-mansion-banana', title:'Banana Island Mansion', type:'Luxury', listing:'Sale',\n    price:450000000, location:'Banana Island', area:'Ikoyi', state:'Lagos',\n    coordinates:{lat:6.4452,lng:3.4495}, beds:6, baths:8, toilets:9, size:11000, yearBuilt:2024, parking:6, floors:3,\n    featured:true, badge:'Luxury', verified:true, views:2104, saves:218,\n    shortDesc:'Trophy 6-bedroom mansion with private cinema, spa and elevator.',\n    description:'A trophy-grade family compound by award-winning architect Omolade Aderemi. The 11,000 sqft residence spans three floors connected by a private glass elevator, with bespoke Calacatta marble throughout.\\n\\nIndulgences include a 14-seat home cinema, indoor spa with sauna and hammam, an art-grade wine cellar, and a temperature-controlled garage for six cars.\\n\\nThe grounds host a 30-meter lap pool, organic vegetable garden, and a separate two-bedroom guest pavilion.',\n    amenities:['Lap Pool','Cinema','Spa','Wine Cellar','Elevator','Smart Home','Guest Pavilion','Generator','Security','Parking'],\n    images:[\n      'https://images.unsplash.com/photo-1613977257363-707ba9348227',\n      'https://images.unsplash.com/photo-1613490493576-7fde63acd811',\n      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',\n      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',\n      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3'\n    ], agentIdx:0,\n    nearby:{schools:['Greensprings','British International'],hospitals:['Reddington','Lagoon'],malls:['The Palms','Ikoyi Mall']},\n    dateAdded:'2025-04-18', status:'available' },\n\n  { id:14, slug:'villa-magodo', title:'Tropical Villa, Magodo', type:'Villa', listing:'Sale',\n    price:155000000, location:'Magodo Phase 2', area:'Magodo', state:'Lagos',\n    coordinates:{lat:6.6149,lng:3.3760}, beds:5, baths:5, toilets:6, size:4400, yearBuilt:2020, parking:4, floors:2,\n    featured:false, badge:'Verified', verified:true, views:486, saves:34,\n    shortDesc:'Tropical-modern villa in gated Magodo Phase 2.',\n    description:'A relaxed tropical-modern villa within Magodo Phase 2\\'s premium GRA. Indoor and outdoor space blur through wide sliding glass walls onto a covered terrace and pool deck.\\n\\nFive en-suite bedrooms, an open kitchen with breakfast island, formal dining, and a media room. Solar plus inverter system delivers near-uninterrupted power.\\n\\nGated estate with paved access roads, 24-hr security, and a community park nearby.',\n    amenities:['Pool','Solar','Inverter','Generator','Security','Parking','Garden'],\n    images:[\n      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',\n      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',\n      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',\n      'https://images.unsplash.com/photo-1568605114967-8130f3a36994',\n      'https://images.unsplash.com/photo-1600573472556-e636c2acda88'\n    ], agentIdx:5,\n    nearby:{schools:['Caleb International','Vivian Fowler'],hospitals:['Lagoon Hospital','Eko Hospital'],malls:['Ikeja City Mall','Maryland Mall']},\n    dateAdded:'2025-01-30', status:'available' },\n\n  { id:15, slug:'penthouse-rent-ikoyi', title:'3-Bed Penthouse, Old Ikoyi', type:'Apartment', listing:'Rent',\n    price:35000000, priceLabel:'/year', location:'Bourdillon Road', area:'Ikoyi', state:'Lagos',\n    coordinates:{lat:6.4480,lng:3.4380}, beds:3, baths:4, toilets:4, size:2900, yearBuilt:2023, parking:3, floors:1,\n    featured:false, badge:'New Listing', verified:true, views:617, saves:46,\n    shortDesc:'Top-floor penthouse with skyline views on Bourdillon.',\n    description:'A 2,900 sqft top-floor penthouse on prestigious Bourdillon Road. Wraparound balconies frame views across Ikoyi and the lagoon at sunset.\\n\\nFitted with chef-grade appliances, marble baths, and full smart-home automation. Includes three reserved parking bays.\\n\\nResidents enjoy a rooftop pool, 24/7 power, concierge, and a fitness center.',\n    amenities:['Skyline View','Smart Home','Pool','Gym','Concierge','24/7 Power','Security','Parking'],\n    images:[\n      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',\n      'https://images.unsplash.com/photo-1493809842364-78817add7ffb',\n      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',\n      'https://images.unsplash.com/photo-1505691938895-1758d7feb511',\n      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136'\n    ], agentIdx:1,\n    nearby:{schools:['Children\\'s International','Greensprings'],hospitals:['Reddington','Lagoon'],malls:['The Palms','Ikoyi Mall']},\n    dateAdded:'2025-04-09', status:'available' }\n];\n// Normalize ids\nPROPERTIES.forEach((p,i)=>{ p.id = i+1; p.pricePerSqft = p.size? Math.round(p.price/Math.max(p.size,1)) : 0; p.images = p.images.map(IMG); p.agent = AGENTS[p.agentIdx]; });\n\nconst TESTIMONIALS = [\n  { quote:\"Hassan's team made our search effortless. Within four weeks we had moved into the perfect family home in Ikoyi.\", name:'Adaeze Nwankwo', loc:'Lagos', rating:5, photo:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&auto=format' },\n  { quote:\"Professional, transparent, and genuinely consultative. They helped us close on a commercial property at exactly the right valuation.\", name:'Kunle Olawale', loc:'Abuja', rating:5, photo:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format' },\n  { quote:\"As a returnee, I needed a partner I could trust remotely. They handled everything end-to-end. Highly recommended.\", name:'Dr. Amina Yusuf', loc:'London / Abuja', rating:5, photo:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format' },\n  { quote:\"From shortlisting to documentation, their attention to detail is unmatched in the Nigerian market.\", name:'Mark Anderson', loc:'Port Harcourt', rating:5, photo:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format' }\n];\n\nconst SERVICES = [\n  { title:'Property Sales', desc:'We match buyers to their perfect property — from first-time homes to trophy estates.', img:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80&auto=format', bullets:['Curated listings','Negotiation expertise','Title verification','Closing support'], steps:[{n:1,t:'Discovery',d:'Brief & shortlist'},{n:2,t:'Viewings',d:'Guided inspections'},{n:3,t:'Close',d:'Negotiate & complete'}] },\n  { title:'Rental Management', desc:'Hassle-free rentals for owners and tenants, backed by tight tenant screening.', img:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80&auto=format', bullets:['Tenant screening','Lease drafting','Rent collection','Maintenance coordination'], steps:[{n:1,t:'List',d:'Pricing & marketing'},{n:2,t:'Place',d:'Vetted tenants'},{n:3,t:'Manage',d:'Ongoing care'}] },\n  { title:'Real Estate Consulting', desc:'Data-driven advice for smart decisions across the Nigerian property market.', img:'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=80&auto=format', bullets:['Market reports','Feasibility studies','Asset valuation','Strategy briefs'], steps:[{n:1,t:'Define',d:'Mandate scoping'},{n:2,t:'Analyze',d:'Quant + qual'},{n:3,t:'Advise',d:'Actionable plan'}] },\n  { title:'Property Management', desc:'Full-service care for your investments — financial, physical, and reputational.', img:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format', bullets:['Facility upkeep','Compliance','Reporting','Reserve planning'], steps:[{n:1,t:'Audit',d:'Onboard property'},{n:2,t:'Operate',d:'Day-to-day'},{n:3,t:'Report',d:'Monthly P&L'}] },\n  { title:'Investment Advisory', desc:'Maximise ROI with expert guidance across short-let, build-to-rent, and resale.', img:'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80&auto=format', bullets:['ROI modeling','Asset allocation','Exit strategy','Diaspora plans'], steps:[{n:1,t:'Goal',d:'Risk profile'},{n:2,t:'Model',d:'Scenario test'},{n:3,t:'Deploy',d:'Acquire & manage'}] },\n  { title:'Legal & Documentation', desc:'Seamless, protected transactions — handled by our in-house legal partners.', img:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80&auto=format', bullets:['Title search','Deed drafting','Governor consent','Perfection of title'], steps:[{n:1,t:'Verify',d:'Title check'},{n:2,t:'Draft',d:'Documents'},{n:3,t:'Perfect',d:'Registry'}] }\n];\n\nconst TYPES = [\n  { name:'Houses',     img:'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&auto=format', filter:'House' },\n  { name:'Apartments', img:'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&auto=format', filter:'Apartment' },\n  { name:'Land',       img:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80&auto=format', filter:'Land' },\n  { name:'Commercial', img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format', filter:'Commercial' },\n  { name:'Villas',     img:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&auto=format', filter:'Villa' },\n  { name:'Luxury',     img:'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80&auto=format', filter:'Luxury' }\n];\n\nconst BLOG = [\n  { id:1, cat:'Market', title:'Lagos Real Estate Market Report 2025', excerpt:'A look at price movements, hot zones, and what to expect in H2.', img:'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80&auto=format', read:'6 min', date:'May 1, 2025',\n    body:'The Lagos real estate market in early 2025 is defined by two opposing forces: tight supply in the prime island corridors (Ikoyi, V/I, Eko Atlantic) and rapid greenfield expansion in the Lekki–Epe axis...\\n\\nPrices in prime Ikoyi rose 12% YoY, while serviced apartment rents in V/I grew 9%. Mortgages remain expensive at ~24% lending rates, which keeps the market overwhelmingly cash-driven.\\n\\nOur outlook: continued double-digit appreciation in coastal prime, slower but steadier growth in Lekki Phase 2 and Epe.' },\n  { id:2, cat:'Guide', title:'A First-Time Buyer\\'s Guide to Lagos', excerpt:'The seven-step playbook every first-time buyer in Lagos should know.', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format', read:'8 min', date:'April 22, 2025',\n    body:'Buying your first home in Lagos can feel daunting. Use this seven-step framework to keep the process moving without surprises:\\n\\n1. Set your real budget (price + 8% closing).\\n2. Pick your zone with a 10-year horizon.\\n3. Verify title — always start at the Lands Registry.\\n4. Inspect at different times of day.\\n5. Negotiate inclusive of governor\\'s consent.\\n6. Engage a SAN-led legal team.\\n7. Insure on day one.' },\n  { id:3, cat:'Investing', title:'Diaspora Investment Tips for 2025', excerpt:'How returnees and the diaspora should structure Nigerian property buys.', img:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format', read:'5 min', date:'April 11, 2025',\n    body:'Diaspora investors should approach Nigerian property differently from local buyers. Focus on liquid, dollar-hedged assets — short-let-friendly serviced apartments in V/I and Ikoyi are leading examples...\\n\\nUse a Nigerian-resident legal representative, set up a domiciliary account for inflows, and prefer titled properties (C of O) over allocations.' }\n];\n\nconst STATS = { properties:528, transactions:'₦52B+', years:12, satisfaction:98 };\n\nconst DB = { properties:PROPERTIES, agents:AGENTS, testimonials:TESTIMONIALS, services:SERVICES, stats:STATS, blog:BLOG, types:TYPES };\nwindow.DB = DB;\n\n/* ===========================================================\n   STATE & STORAGE\n=========================================================== */\nconst LS = {\n  get:(k,fb)=>{ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):fb; }catch(e){ return fb; } },\n  set:(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} },\n};\n\nconst state = {\n  page:'home',\n  filters:{ listing:'all', types:[], beds:[], baths:[], amenities:[], priceMin:0, priceMax:500000000, sizeMin:0, sizeMax:20000, area:'', yearMin:2000, yearMax:2026 },\n  sort:'newest',\n  view:'grid',\n  shown:12,\n  pillFilter:'All',\n  testiIndex:0,\n  searchQuery:'',\n  activeProperty:null,\n  compareList: LS.get('sabiosita_compare',[]),\n  savedIds: LS.get('sabiosita_saved',[]),\n  activeTab:'description',\n  galleryIdx:0,\n  pdActiveImage:0,\n  lightbox:{ open:false, images:[], idx:0 },\n  reasonContact:'Buy',\n};\n\nfunction setState(patch){ Object.assign(state,patch); }\n\n/* ===========================================================\n   UTILITIES\n=========================================================== */\nfunction fmtNaira(n){ if(n>=1e9) return '₦'+(n/1e9).toFixed(2)+'B'; if(n>=1e6) return '₦'+(n/1e6).toFixed(1)+'M'; if(n>=1e3) return '₦'+(n/1e3).toFixed(0)+'K'; return '₦'+n; }\nfunction fmtFull(n){ return '₦'+n.toLocaleString('en-NG'); }\nfunction escapeHTML(s){ return String(s).replace(/[&<>\"']/g, m=>({\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",\"\\\"\":\"&quot;\",\"'\":\"&#39;\"}[m])); }\nfunction uid(){ return Math.random().toString(36).slice(2,9); }\nfunction debounce(fn,ms){ let t; return (...a)=>{clearTimeout(t); t=setTimeout(()=>fn(...a),ms);} }\n\n/* ===========================================================\n   COMPONENTS\n=========================================================== */\nfunction Badge(label,type){ return `<span class=\"badge ${type||''}\">${escapeHTML(label)}</span>`; }\n\nfunction PropertyCard(p, variant='grid'){\n  const isSaved = state.savedIds.includes(p.id);\n  const badgeType = (p.badge||'').toLowerCase().includes('luxury')?'luxury': (p.badge||'').toLowerCase().includes('hot')?'hot': (p.badge||'').toLowerCase().includes('reduced')?'reduced': (p.badge||'').toLowerCase().includes('new')?'new': (p.badge||'').toLowerCase().includes('verified')?'verified':'';\n  const ribbon = (variant==='featured') ? `<div class=\"ribbon\">Featured</div>` : '';\n  const cls = `pcard ${variant==='featured'?'featured-card':''} ${variant==='list'?'list':''} ${variant==='compact'?'compact':''}`;\n  return `\n    <article class=\"${cls}\">\n      ${ribbon}\n      <a href=\"#property/${p.id}\" data-link class=\"pcard-media\">\n        <img loading=\"lazy\" width=\"800\" height=\"600\" src=\"${p.images[0]}\" alt=\"${escapeHTML(p.title)}\" />\n        <div class=\"pcard-badges\">\n          ${Badge(p.listing, p.listing==='Sale'?'sale':'rent')}\n          ${p.badge?Badge(p.badge,badgeType):''}\n        </div>\n        <div class=\"pcard-tools\">\n          <button class=\"pcard-tool ${isSaved?'active':''}\" data-action=\"save\" data-id=\"${p.id}\" aria-label=\"Save\">\n            <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"${isSaved?'currentColor':'none'}\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"/></svg>\n          </button>\n        </div>\n      </a>\n      <div class=\"pcard-body\">\n        <div class=\"pcard-loc\">📍 ${escapeHTML(p.area)}, ${escapeHTML(p.state)}</div>\n        <a href=\"#property/${p.id}\" data-link><h3 class=\"pcard-title\">${escapeHTML(p.title)}</h3></a>\n        <div class=\"pcard-price\">${fmtNaira(p.price)}<small>${p.priceLabel||''}</small></div>\n        <div class=\"pcard-stats\">\n          ${p.beds?`<span>🛏 ${p.beds} Beds</span>`:''}\n          ${p.baths?`<span>🛁 ${p.baths} Baths</span>`:''}\n          <span>📐 ${p.size.toLocaleString()} sqft</span>\n        </div>\n      </div>\n    </article>`;\n}\n\nfunction AgentCard(a){\n  return `<div class=\"agent-card reveal-up\">\n    <div class=\"agent-photo\"><img loading=\"lazy\" width=\"400\" height=\"400\" src=\"${a.photo}\" alt=\"${escapeHTML(a.name)}\" /></div>\n    <div class=\"agent-info\">\n      <h3>${escapeHTML(a.name)}</h3>\n      <div class=\"role\">${escapeHTML(a.role)}</div>\n      <div class=\"agent-meta\"><span>★ ${a.rating}</span><span>${a.sold} Sold</span></div>\n      <div class=\"agent-social\">\n        <a href=\"tel:${a.phone}\" aria-label=\"Call\">📞</a>\n        <a href=\"mailto:${a.email}\" aria-label=\"Email\">✉</a>\n        <a href=\"https://wa.me/${a.whatsapp}\" target=\"_blank\" rel=\"noopener\" aria-label=\"WhatsApp\">💬</a>\n      </div>\n    </div>\n  </div>`;\n}\n\nfunction TestimonialCard(t,i){\n  return `<div class=\"testi-slide ${i===state.testiIndex?'active':''}\" data-i=\"${i}\">\n    <div class=\"testi-stars\">${'★'.repeat(t.rating)}</div>\n    <p class=\"testi-quote\">\"${escapeHTML(t.quote)}\"</p>\n    <div class=\"testi-author\">\n      <img src=\"${t.photo}\" loading=\"lazy\" width=\"54\" height=\"54\" alt=\"${escapeHTML(t.name)}\" />\n      <div class=\"testi-name\"><strong>${escapeHTML(t.name)}</strong><small>${escapeHTML(t.loc)}</small></div>\n    </div>\n  </div>`;\n}\n\nfunction SectionHeader({eyebrow,title,sub,align='left'}){\n  return `<div class=\"section-head ${align==='center'?'center':''} reveal-up\">\n    ${eyebrow?`<div class=\"eyebrow\">${escapeHTML(eyebrow)}</div>`:''}\n    <h2 class=\"section-title\">${title}</h2>\n    ${sub?`<p class=\"section-sub\">${escapeHTML(sub)}</p>`:''}\n  </div>`;\n}\n\n/* ===========================================================\n   PAGES\n=========================================================== */\nfunction HomePage(){\n  const featured = DB.properties.filter(p=>p.featured);\n  const filteredHome = filterPills(DB.properties, state.pillFilter).slice(0,6);\n\n  return `\n  <section class=\"hero\">\n    <div class=\"hero-bg\" aria-hidden=\"true\"></div>\n    <div class=\"hero-inner\">\n      <span class=\"hero-eyebrow\">Nigeria's #1 Real Estate Consultancy</span>\n      <h1>\n        <span class=\"h1-line\"><span class=\"hero-l1\">Discover Your</span></span>\n        <span class=\"h1-line\"><span class=\"hero-l2\">Perfect Property</span></span>\n      </h1>\n      <p class=\"hero-sub\">Curated homes, considered advice, complete peace of mind. From Lagos waterfronts to Abuja diplomatic enclaves — we open the doors that matter.</p>\n      <div class=\"hero-cta\">\n        <a class=\"btn btn-primary\" href=\"#properties\" data-link>Explore Properties →</a>\n        <button class=\"btn btn-ghost\" data-action=\"watch-tour\">▶ Watch Tour</button>\n      </div>\n    </div>\n    <div class=\"trust-bar\">\n      <div class=\"trust-inner\">\n        <div class=\"trust-item\"><div class=\"trust-num\" data-count=\"500\">0</div><div class=\"trust-label\">Properties Sold</div></div>\n        <div class=\"trust-item\"><div class=\"trust-num\">₦52B+</div><div class=\"trust-label\">Transactions</div></div>\n        <div class=\"trust-item\"><div class=\"trust-num\" data-count=\"12\">0</div><div class=\"trust-label\">Years</div></div>\n        <div class=\"trust-item\"><div class=\"trust-num\" data-count=\"98\">0</div><div class=\"trust-label\">% Satisfaction</div></div>\n      </div>\n    </div>\n  </section>\n\n  <div class=\"search-wrap\">\n    <form class=\"search-card\" id=\"searchForm\">\n      <div class=\"search-field\">\n        <label>Location</label>\n        <select name=\"area\">\n          <option value=\"\">Any location</option>\n          ${[...new Set(DB.properties.map(p=>p.area))].map(a=>`<option>${a}</option>`).join('')}\n        </select>\n      </div>\n      <div class=\"search-field\">\n        <label>Type</label>\n        <select name=\"type\">\n          <option value=\"\">Any type</option>\n          ${TYPES.map(t=>`<option>${t.filter}</option>`).join('')}\n        </select>\n      </div>\n      <div class=\"search-field\">\n        <label>Listing</label>\n        <select name=\"listing\">\n          <option value=\"\">Any</option>\n          <option>Sale</option>\n          <option>Rent</option>\n        </select>\n      </div>\n      <div class=\"search-field\">\n        <label>Max price</label>\n        <select name=\"priceMax\">\n          <option value=\"\">Any</option>\n          <option value=\"50000000\">Up to ₦50M</option>\n          <option value=\"150000000\">Up to ₦150M</option>\n          <option value=\"300000000\">Up to ₦300M</option>\n          <option value=\"500000000\">Up to ₦500M</option>\n        </select>\n      </div>\n      <div class=\"search-field\">\n        <label>Bedrooms</label>\n        <select name=\"beds\">\n          <option value=\"\">Any</option>\n          <option value=\"1\">1+</option><option value=\"2\">2+</option>\n          <option value=\"3\">3+</option><option value=\"4\">4+</option><option value=\"5\">5+</option>\n        </select>\n      </div>\n      <button class=\"btn btn-primary\" type=\"submit\">🔍 Search</button>\n      <div class=\"search-toggle\" data-action=\"toggle-advanced\">+ Advanced search</div>\n      <div class=\"search-advanced\" id=\"searchAdv\">\n        ${['Pool','Gym','Generator','Security','Parking','Smart Home'].map(a=>`<label class=\"amenity-check\"><input type=\"checkbox\" name=\"amenity\" value=\"${a}\"/>${a}</label>`).join('')}\n      </div>\n    </form>\n  </div>\n\n  <section>\n    <div class=\"container\">\n      ${SectionHeader({eyebrow:'Handpicked For You', title:'Featured Listings', sub:'A curated selection of standout homes available right now.'})}\n      <div class=\"filter-pills\">\n        ${['All','For Sale','For Rent','Luxury','New Listing'].map(p=>`<button class=\"pill ${state.pillFilter===p?'active':''}\" data-action=\"pill\" data-val=\"${p}\">${p}</button>`).join('')}\n      </div>\n      <div class=\"prop-grid\">\n        ${filteredHome.map((p,i)=>PropertyCard(p, i===0?'featured':'grid')).join('')}\n      </div>\n      <div style=\"text-align:center;margin-top:2rem\">\n        <a class=\"btn btn-outline\" href=\"#properties\" data-link>View All Listings →</a>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"stats-dark\">\n    <div class=\"container\">\n      <div class=\"stats-grid\">\n        <div><div class=\"stat-num\" data-count=\"528\">0</div><div class=\"stat-label\">Properties Sold</div></div>\n        <div><div class=\"stat-num\">₦52B+</div><div class=\"stat-label\">Transactions</div></div>\n        <div><div class=\"stat-num\" data-count=\"12\">0</div><div class=\"stat-label\">Years Experience</div></div>\n        <div><div class=\"stat-num\" data-count=\"98\">0</div><div class=\"stat-label\">% Satisfaction</div></div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"how\">\n    <div class=\"container\">\n      ${SectionHeader({eyebrow:'How It Works', title:'A Simple Path To Your New Home', align:'center'})}\n      <div class=\"how-grid\">\n        ${[\n          {n:1,t:'Discover',d:'Browse our curated portfolio of verified properties.'},\n          {n:2,t:'Visit',d:'Book inspections — virtual or in-person.'},\n          {n:3,t:'Negotiate',d:'We handle pricing, terms, and documentation.'},\n          {n:4,t:'Move In',d:'Close confidently and settle into your new home.'}\n        ].map(s=>`<div class=\"step reveal-up\"><div class=\"step-num\">${s.n}</div><h3>${s.t}</h3><p>${s.d}</p></div>`).join('')}\n      </div>\n    </div>\n  </section>\n\n  <section>\n    <div class=\"container\">\n      ${SectionHeader({eyebrow:'Browse By Category', title:'Explore Property Types'})}\n      <div class=\"types-grid\">\n        ${TYPES.map(t=>{\n          const count = DB.properties.filter(p=>p.type===t.filter).length;\n          return `<a class=\"type-card reveal-up\" href=\"#properties?type=${encodeURIComponent(t.filter)}\" data-link>\n            <img loading=\"lazy\" width=\"600\" height=\"400\" src=\"${t.img}\" alt=\"${t.name}\" />\n            <div class=\"type-content\">\n              <small>${count} ${count===1?'property':'properties'}</small>\n              <h3>${t.name}</h3>\n              <div class=\"type-arrow\">BROWSE →</div>\n            </div>\n          </a>`;\n        }).join('')}\n      </div>\n    </div>\n  </section>\n\n  <section style=\"background:var(--mist)\">\n    <div class=\"container\">\n      ${SectionHeader({eyebrow:'Meet Our Experts', title:'Our Trusted Consultants', align:'center'})}\n      <div class=\"agents-grid\">${DB.agents.slice(0,4).map(AgentCard).join('')}</div>\n    </div>\n  </section>\n\n  <section class=\"testi\">\n    <div class=\"container\">\n      ${SectionHeader({eyebrow:'Client Stories', title:'<span style=\"color:#fff\">What Our Clients Say</span>', align:'center'})}\n      <div class=\"testi-track\" id=\"testiTrack\">${DB.testimonials.map(TestimonialCard).join('')}</div>\n      <div class=\"testi-arrows\">\n        <button data-action=\"testi-prev\" aria-label=\"Prev\">‹</button>\n        <button data-action=\"testi-next\" aria-label=\"Next\">›</button>\n      </div>\n      <div class=\"testi-nav\">\n        ${DB.testimonials.map((_,i)=>`<button class=\"testi-dot ${i===state.testiIndex?'active':''}\" data-action=\"testi-go\" data-i=\"${i}\" aria-label=\"Go to ${i+1}\"></button>`).join('')}\n      </div>\n    </div>\n  </section>\n\n  <section>\n    <div class=\"container\">\n      ${SectionHeader({eyebrow:'Insights', title:'Latest from the Journal'})}\n      <div class=\"blog-grid\">\n        ${DB.blog.map(b=>`<article class=\"blog-card reveal-up\" data-action=\"open-blog\" data-id=\"${b.id}\">\n          <img loading=\"lazy\" width=\"800\" height=\"500\" src=\"${b.img}\" alt=\"${escapeHTML(b.title)}\" />\n          <div class=\"blog-body\">\n            <span class=\"blog-cat\">${b.cat}</span>\n            <h3>${escapeHTML(b.title)}</h3>\n            <p>${escapeHTML(b.excerpt)}</p>\n            <div class=\"blog-meta\"><span>📅 ${b.date}</span><span>⏱ ${b.read}</span></div>\n          </div>\n        </article>`).join('')}\n      </div>\n    </div>\n  </section>\n\n  <section class=\"newsletter\">\n    <div class=\"container\">\n      ${SectionHeader({eyebrow:'Stay In The Loop', title:'New listings, market reports & insider deals', align:'center'})}\n      <form id=\"newsletterForm\">\n        <input type=\"email\" name=\"email\" placeholder=\"you@email.com\" required autocomplete=\"email\" />\n        <button class=\"btn btn-primary\" type=\"submit\">Subscribe</button>\n      </form>\n    </div>\n  </section>\n  ${Footer()}\n  `;\n}\n\n/* --- Properties page --- */\nfunction PropertiesPage(){\n  const f = state.filters;\n  const all = DB.properties;\n  const matches = all.filter(p=>{\n    if(f.listing!=='all' && p.listing.toLowerCase()!==f.listing) return false;\n    if(f.types.length && !f.types.includes(p.type)) return false;\n    if(f.beds.length && !f.beds.some(b=> b==='5+'?p.beds>=5:p.beds==parseInt(b))) return false;\n    if(f.baths.length && !f.baths.some(b=> b==='5+'?p.baths>=5:p.baths==parseInt(b))) return false;\n    if(p.price < f.priceMin || p.price > f.priceMax) return false;\n    if(f.amenities.length && !f.amenities.every(a=>p.amenities.includes(a))) return false;\n    if(f.area && p.area!==f.area) return false;\n    if(state.searchQuery){\n      const q = state.searchQuery.toLowerCase();\n      if(!(p.title+' '+p.area+' '+p.type).toLowerCase().includes(q)) return false;\n    }\n    return true;\n  });\n\n  // sort\n  const sorted = [...matches].sort((a,b)=>{\n    if(state.sort==='priceAsc') return a.price-b.price;\n    if(state.sort==='priceDesc') return b.price-a.price;\n    if(state.sort==='views') return b.views-a.views;\n    if(state.sort==='saves') return b.saves-a.saves;\n    return new Date(b.dateAdded)-new Date(a.dateAdded);\n  });\n\n  const visible = sorted.slice(0, state.shown);\n  const filterCount = (f.types.length+f.beds.length+f.baths.length+f.amenities.length+(f.listing!=='all'?1:0)+(f.area?1:0));\n\n  return `\n  <section class=\"page-hero\">\n    <div class=\"page-hero-bg\" style=\"background-image:url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80&auto=format')\"></div>\n    <div class=\"container\">\n      <div class=\"crumb\"><a href=\"#home\" data-link>Home</a> / <span>Properties</span></div>\n      <h1>All Properties</h1>\n      <p style=\"opacity:.8;margin-top:.4rem\">${matches.length} verified listings across Nigeria</p>\n    </div>\n  </section>\n\n  <section style=\"padding-top:2.5rem\">\n    <div class=\"container\">\n      <div class=\"props-layout\">\n        <aside class=\"sidebar-filters\" id=\"sidebar\">\n          <div class=\"sf-head\">\n            <h3>Filters ${filterCount?`<span style=\"background:var(--gold);color:var(--ink);font-size:.7rem;border-radius:10px;padding:2px 8px;margin-left:6px\">${filterCount}</span>`:''}</h3>\n            <span class=\"sf-clear\" data-action=\"clear-filters\">Clear all</span>\n          </div>\n          <div class=\"fblock\">\n            <h4>Listing Type</h4>\n            <div class=\"seg\">\n              <button class=\"${f.listing==='sale'?'active':''}\" data-action=\"filter-listing\" data-val=\"sale\">For Sale</button>\n              <button class=\"${f.listing==='rent'?'active':''}\" data-action=\"filter-listing\" data-val=\"rent\">For Rent</button>\n            </div>\n          </div>\n          <div class=\"fblock\">\n            <h4>Price Range (₦)</h4>\n            <div class=\"range\">\n              <input type=\"number\" id=\"pmin\" value=\"${f.priceMin}\" placeholder=\"Min\"/>\n              <span>—</span>\n              <input type=\"number\" id=\"pmax\" value=\"${f.priceMax}\" placeholder=\"Max\"/>\n            </div>\n          </div>\n          <div class=\"fblock\">\n            <h4>Property Type</h4>\n            ${[...new Set(all.map(p=>p.type))].map(t=>{\n              const count = all.filter(p=>p.type===t).length;\n              return `<label class=\"fcheck\"><input type=\"checkbox\" data-action=\"filter-type\" value=\"${t}\" ${f.types.includes(t)?'checked':''}/>${t} <span style=\"margin-left:auto;color:var(--text-muted);font-size:.78rem\">${count}</span></label>`;\n            }).join('')}\n          </div>\n          <div class=\"fblock\">\n            <h4>Bedrooms</h4>\n            <div class=\"chips\">\n              ${['1','2','3','4','5+'].map(b=>`<button class=\"chip ${f.beds.includes(b)?'active':''}\" data-action=\"filter-beds\" data-val=\"${b}\">${b}</button>`).join('')}\n            </div>\n          </div>\n          <div class=\"fblock\">\n            <h4>Bathrooms</h4>\n            <div class=\"chips\">\n              ${['1','2','3','4','5+'].map(b=>`<button class=\"chip ${f.baths.includes(b)?'active':''}\" data-action=\"filter-baths\" data-val=\"${b}\">${b}</button>`).join('')}\n            </div>\n          </div>\n          <div class=\"fblock\">\n            <h4>Amenities</h4>\n            ${['Pool','Gym','Generator','Security','Parking','Smart Home'].map(a=>`<label class=\"fcheck\"><input type=\"checkbox\" data-action=\"filter-amenity\" value=\"${a}\" ${f.amenities.includes(a)?'checked':''}/>${a}</label>`).join('')}\n          </div>\n          <div class=\"fblock\">\n            <h4>Location</h4>\n            <select class=\"sort-select\" style=\"width:100%\" data-action=\"filter-area\">\n              <option value=\"\">All areas</option>\n              ${[...new Set(all.map(p=>p.area))].map(a=>`<option ${f.area===a?'selected':''}>${a}</option>`).join('')}\n            </select>\n          </div>\n        </aside>\n\n        <div>\n          <div class=\"results-bar\">\n            <div>Showing <strong>${Math.min(visible.length,sorted.length)}</strong> of <strong>${sorted.length}</strong></div>\n            <div style=\"display:flex;gap:.6rem;align-items:center\">\n              <select class=\"sort-select\" data-action=\"sort\">\n                <option value=\"newest\" ${state.sort==='newest'?'selected':''}>Newest First</option>\n                <option value=\"priceAsc\" ${state.sort==='priceAsc'?'selected':''}>Price ↑</option>\n                <option value=\"priceDesc\" ${state.sort==='priceDesc'?'selected':''}>Price ↓</option>\n                <option value=\"views\" ${state.sort==='views'?'selected':''}>Most Viewed</option>\n                <option value=\"saves\" ${state.sort==='saves'?'selected':''}>Most Saved</option>\n              </select>\n              <div class=\"view-toggle\">\n                <button class=\"${state.view==='grid'?'active':''}\" data-action=\"view\" data-val=\"grid\">⊞ Grid</button>\n                <button class=\"${state.view==='list'?'active':''}\" data-action=\"view\" data-val=\"list\">☰ List</button>\n              </div>\n            </div>\n          </div>\n\n          ${visible.length ? `\n            <div class=\"${state.view==='list'?'':'prop-grid'}\" style=\"${state.view==='list'?'display:flex;flex-direction:column;gap:1.2rem':''}\">\n              ${visible.map(p=>PropertyCard(p, state.view==='list'?'list':'grid')).join('')}\n            </div>\n            ${sorted.length>state.shown?`<div style=\"text-align:center;margin-top:2rem\"><button class=\"btn btn-outline\" data-action=\"load-more\">Load More (${sorted.length-state.shown} left)</button></div>`:''}\n          ` : `\n            <div class=\"empty\">\n              <svg width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" style=\"color:var(--text-muted)\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/></svg>\n              <h3 style=\"font-family:Playfair Display,serif;color:var(--ink);margin:1rem 0 .4rem\">No properties match your filters</h3>\n              <p>Try widening your search or clearing some criteria.</p>\n              <button class=\"btn btn-outline\" style=\"margin-top:1rem\" data-action=\"clear-filters\">Clear filters</button>\n            </div>`}\n        </div>\n      </div>\n    </div>\n  </section>\n  ${state.compareList.length?`<button class=\"btn btn-primary\" style=\"position:fixed;bottom:170px;right:28px;z-index:90\" data-action=\"open-compare\">⚖ Compare (${state.compareList.length})</button>`:''}\n  ${Footer()}\n  `;\n}\n\n/* --- Property Detail --- */\nfunction PropertyDetailPage(id){\n  const p = DB.properties.find(x=>x.id===id);\n  if(!p) return NotFoundPage();\n  state.activeProperty = p;\n  // increment views\n  const viewed = LS.get('sabiosita_viewed',[]);\n  if(!viewed.includes(p.id)){ viewed.push(p.id); LS.set('sabiosita_viewed', viewed); }\n\n  const isSaved = state.savedIds.includes(p.id);\n  const similar = DB.properties.filter(x=>x.id!==p.id && (x.area===p.area || x.type===p.type)).slice(0,4);\n  const draft = LS.get('sabiosita_form_'+p.id, {});\n\n  return `\n  <section style=\"padding-top:calc(var(--nav-h) + 1rem);padding-bottom:1rem\">\n    <div class=\"container\">\n      <div class=\"crumb\" style=\"color:var(--text-secondary);margin-bottom:1rem\">\n        <a href=\"#home\" data-link>Home</a> / <a href=\"#properties\" data-link>Properties</a> / <span>${escapeHTML(p.type)}</span> / <span>${escapeHTML(p.title)}</span>\n      </div>\n      <div class=\"pd-gallery\">\n        <img id=\"pdMain\" class=\"pd-main\" src=\"${p.images[0]}\" alt=\"${escapeHTML(p.title)}\" />\n        <button class=\"pd-view-all\" data-action=\"lightbox-open\">📷 View All Photos (${p.images.length})</button>\n        <div class=\"pd-thumbs\">\n          ${p.images.map((img,i)=>`<div class=\"pd-thumb ${i===0?'active':''}\" data-action=\"pd-thumb\" data-i=\"${i}\"><img loading=\"lazy\" src=\"${img}\" alt=\"\"/></div>`).join('')}\n        </div>\n      </div>\n\n      <div class=\"pd-layout\">\n        <div>\n          <div class=\"pd-header\">\n            <div>\n              <h1 class=\"pd-title\">${escapeHTML(p.title)} ${p.verified?'<span class=\"badge verified\" style=\"vertical-align:middle\">Verified</span>':''}</h1>\n              <div class=\"pd-loc\">📍 ${escapeHTML(p.location)}, ${escapeHTML(p.area)}, ${escapeHTML(p.state)}</div>\n              <div style=\"margin-top:.5rem;color:var(--text-muted);font-size:.85rem\">Listed ${p.dateAdded} · ${p.views} views · ${p.saves} saves</div>\n            </div>\n            <div style=\"text-align:right\">\n              <div class=\"pd-price\">${fmtFull(p.price)}<small>${p.priceLabel||''} ${p.size?`· ${fmtNaira(p.pricePerSqft)}/sqft`:''}</small></div>\n            </div>\n          </div>\n\n          <div class=\"pd-actions\">\n            <button class=\"pd-action ${isSaved?'active':''}\" data-action=\"save\" data-id=\"${p.id}\">${isSaved?'✓ Saved':'💾 Save'}</button>\n            <button class=\"pd-action\" data-action=\"share\" data-id=\"${p.id}\">🔗 Share</button>\n            <button class=\"pd-action ${state.compareList.includes(p.id)?'active':''}\" data-action=\"compare-toggle\" data-id=\"${p.id}\">⚖ Compare</button>\n            <button class=\"pd-action\" data-action=\"print\">🖨 Print</button>\n            <button class=\"pd-action\" data-action=\"tour-360\">🌐 360° Tour</button>\n          </div>\n\n          <div class=\"pd-stats\">\n            ${p.beds?`<div class=\"pd-stat\"><strong>${p.beds}</strong><span>Beds</span></div>`:''}\n            ${p.baths?`<div class=\"pd-stat\"><strong>${p.baths}</strong><span>Baths</span></div>`:''}\n            <div class=\"pd-stat\"><strong>${p.size.toLocaleString()}</strong><span>Sqft</span></div>\n            <div class=\"pd-stat\"><strong>${p.type}</strong><span>Type</span></div>\n            ${p.yearBuilt?`<div class=\"pd-stat\"><strong>${p.yearBuilt}</strong><span>Built</span></div>`:''}\n            ${p.parking?`<div class=\"pd-stat\"><strong>${p.parking}</strong><span>Parking</span></div>`:''}\n            ${p.floors?`<div class=\"pd-stat\"><strong>${p.floors}</strong><span>Floors</span></div>`:''}\n          </div>\n\n          <div class=\"pd-tabs\">\n            ${['description','features','location','mortgage'].map(t=>`<button class=\"pd-tab ${state.activeTab===t?'active':''}\" data-action=\"pd-tab\" data-val=\"${t}\">${t.charAt(0).toUpperCase()+t.slice(1)}</button>`).join('')}\n          </div>\n\n          <div class=\"pd-tabpanel ${state.activeTab==='description'?'active':''}\" data-panel=\"description\">\n            ${p.description.split('\\n\\n').map(para=>`<p style=\"margin-bottom:1rem;color:var(--text-primary)\">${escapeHTML(para)}</p>`).join('')}\n          </div>\n\n          <div class=\"pd-tabpanel ${state.activeTab==='features'?'active':''}\" data-panel=\"features\">\n            <div class=\"feature-cols\">\n              <div>\n                <h4 style=\"font-family:Playfair Display,serif;margin-bottom:.6rem\">Interior</h4>\n                ${p.amenities.slice(0,Math.ceil(p.amenities.length/2)).map(a=>`<div class=\"feat-item\">${escapeHTML(a)}</div>`).join('')}\n              </div>\n              <div>\n                <h4 style=\"font-family:Playfair Display,serif;margin-bottom:.6rem\">Exterior / Building</h4>\n                ${p.amenities.slice(Math.ceil(p.amenities.length/2)).map(a=>`<div class=\"feat-item\">${escapeHTML(a)}</div>`).join('')}\n              </div>\n            </div>\n          </div>\n\n          <div class=\"pd-tabpanel ${state.activeTab==='location'?'active':''}\" data-panel=\"location\">\n            <iframe loading=\"lazy\" width=\"100%\" height=\"320\" style=\"border:0;border-radius:12px\"\n              src=\"https://www.google.com/maps?q=${p.coordinates.lat},${p.coordinates.lng}&z=14&output=embed\"\n              title=\"Map\"></iframe>\n            <div class=\"feature-cols\" style=\"margin-top:1.4rem\">\n              <div><h4 style=\"font-family:Playfair Display,serif\">Schools</h4>${(p.nearby.schools||[]).map(s=>`<div class=\"feat-item\">${escapeHTML(s)}</div>`).join('') || '<p style=\"color:var(--text-muted)\">—</p>'}</div>\n              <div><h4 style=\"font-family:Playfair Display,serif\">Hospitals</h4>${(p.nearby.hospitals||[]).map(s=>`<div class=\"feat-item\">${escapeHTML(s)}</div>`).join('') || '<p style=\"color:var(--text-muted)\">—</p>'}</div>\n            </div>\n          </div>\n\n          <div class=\"pd-tabpanel ${state.activeTab==='mortgage'?'active':''}\" data-panel=\"mortgage\">\n            <div class=\"calc-grid\">\n              <div><label>Property Price (₦)</label><input type=\"number\" id=\"cPrice\" value=\"${p.price}\"/></div>\n              <div><label>Down Payment (%)</label><input type=\"number\" id=\"cDown\" value=\"20\" min=\"0\" max=\"90\"/></div>\n              <div><label>Interest Rate (%)</label><input type=\"number\" id=\"cRate\" value=\"18\" step=\"0.1\"/></div>\n              <div><label>Loan Term (years)</label><input type=\"number\" id=\"cTerm\" value=\"20\"/></div>\n            </div>\n            <div class=\"calc-result\" id=\"cResult\"></div>\n          </div>\n\n          <div class=\"similar\">\n            <h2 style=\"font-family:Playfair Display,serif;margin-bottom:1rem\">Similar Properties</h2>\n            <div class=\"similar-row\">${similar.map(s=>PropertyCard(s,'grid')).join('')}</div>\n          </div>\n        </div>\n\n        <aside class=\"pd-side\">\n          <div class=\"agent-side\">\n            <img src=\"${p.agent.photo}\" loading=\"lazy\" width=\"90\" height=\"90\" alt=\"${escapeHTML(p.agent.name)}\"/>\n            <h4>${escapeHTML(p.agent.name)}</h4>\n            <div class=\"role\">${escapeHTML(p.agent.role)}</div>\n            <div style=\"color:var(--text-secondary);font-size:.85rem\">★ ${p.agent.rating} · ${p.agent.sold} sold</div>\n            <div class=\"agent-contact\">\n              <a class=\"btn btn-outline btn-sm\" href=\"tel:${p.agent.phone}\">📞 Call</a>\n              <a class=\"btn btn-outline btn-sm\" href=\"mailto:${p.agent.email}\">✉ Email</a>\n              <a class=\"btn btn-primary btn-sm\" target=\"_blank\" rel=\"noopener\" href=\"https://wa.me/${p.agent.whatsapp}?text=${encodeURIComponent('Hi, I am interested in '+p.title+' ('+fmtFull(p.price)+')')}\">💬 WhatsApp</a>\n            </div>\n          </div>\n\n          <form class=\"inquiry-form\" id=\"inquiryForm\" data-pid=\"${p.id}\">\n            <h4>Send Inquiry</h4>\n            <div class=\"field\"><input type=\"text\" name=\"name\" placeholder=\"Full name\" required value=\"${escapeHTML(draft.name||'')}\" autocomplete=\"name\"/><div class=\"err\">Please enter your name</div></div>\n            <div class=\"field\"><input type=\"email\" name=\"email\" placeholder=\"Email\" required value=\"${escapeHTML(draft.email||'')}\" autocomplete=\"email\"/><div class=\"err\">Valid email required</div></div>\n            <div class=\"field\"><input type=\"tel\" name=\"phone\" placeholder=\"Phone\" required inputmode=\"tel\" value=\"${escapeHTML(draft.phone||'')}\" autocomplete=\"tel\"/><div class=\"err\">Phone required</div></div>\n            <div class=\"field\"><textarea name=\"message\" placeholder=\"Message\">${escapeHTML(draft.message||\"I'm interested in \"+p.title+\" — please share more details.\")}</textarea></div>\n            <button class=\"btn btn-primary btn-block\" type=\"submit\">Send Inquiry</button>\n          </form>\n\n          <form class=\"inquiry-form\" id=\"viewingForm\" data-pid=\"${p.id}\">\n            <h4>Schedule a Viewing</h4>\n            <div class=\"field\"><input type=\"date\" name=\"date\" required min=\"${new Date().toISOString().slice(0,10)}\"/></div>\n            <div class=\"seg-reasons\" id=\"timeSlots\">\n              ${['Morning','Afternoon','Evening'].map((t,i)=>`<button type=\"button\" class=\"${i===0?'active':''}\" data-slot=\"${t}\">${t}</button>`).join('')}\n            </div>\n            <button class=\"btn btn-dark btn-block\" type=\"submit\">Book Viewing</button>\n          </form>\n        </aside>\n      </div>\n    </div>\n  </section>\n  ${Footer()}\n  `;\n}\n\n/* --- About --- */\nfunction AboutPage(){\n  return `\n  <section class=\"page-hero\">\n    <div class=\"page-hero-bg\" style=\"background-image:url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format')\"></div>\n    <div class=\"container\">\n      <div class=\"crumb\"><a href=\"#home\" data-link>Home</a> / <span>About</span></div>\n      <h1>Property, Refined.</h1>\n      <p style=\"opacity:.8;margin-top:.4rem;max-width:520px\">Twelve years of trusted advisory across Nigeria's most discerning addresses.</p>\n    </div>\n  </section>\n\n  <section>\n    <div class=\"container\">\n      <div class=\"story\">\n        <div class=\"reveal-left\">\n          ${SectionHeader({eyebrow:'Our Story', title:'Built on trust, delivered with craft.'})}\n          <p style=\"margin-bottom:1rem;color:var(--text-secondary)\">Founded in 2013 in Lagos, Sabiosita Properties began with a single conviction: that property in Nigeria deserved international standards of advisory, transparency, and care.</p>\n          <p style=\"margin-bottom:1rem;color:var(--text-secondary)\">From a two-person consultancy on Adeola Odeku, we have grown into a 50-strong firm spanning Lagos, Abuja, and Port Harcourt — but our DNA remains the same: hand-picked opportunities, honest counsel, and zero compromise.</p>\n          <p style=\"color:var(--text-secondary)\">Today we steward over ₦52 billion in client transactions, with a 98% client satisfaction rate and one of the highest repeat-engagement ratios in the market.</p>\n        </div>\n        <div class=\"story-img reveal-right\">\n          <img src=\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format\" alt=\"Our office\" />\n          <div class=\"float-stat\"><strong>12+</strong><span>Years of trust</span></div>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"mvv\">\n    <div class=\"container\">\n      <div class=\"mvv-grid\">\n        ${[\n          {i:'◆',t:'Mission',d:'To bring clarity and confidence to every property decision in Nigeria.'},\n          {i:'✦',t:'Vision',d:'To be West Africa\\'s most trusted real estate brand by 2030.'},\n          {i:'★',t:'Values',d:'Integrity. Discretion. Craftsmanship. Long-term partnership.'}\n        ].map(c=>`<div class=\"mvv-card reveal-up\"><div class=\"icon\">${c.i}</div><h3>${c.t}</h3><p>${c.d}</p></div>`).join('')}\n      </div>\n    </div>\n  </section>\n\n  <section class=\"stats-dark\">\n    <div class=\"container\">\n      <div class=\"stats-grid\">\n        <div><div class=\"stat-num\" data-count=\"528\">0</div><div class=\"stat-label\">Properties</div></div>\n        <div><div class=\"stat-num\" data-count=\"12\">0</div><div class=\"stat-label\">Years</div></div>\n        <div><div class=\"stat-num\" data-count=\"50\">0</div><div class=\"stat-label\">Agents</div></div>\n        <div><div class=\"stat-num\" data-count=\"98\">0</div><div class=\"stat-label\">% Satisfaction</div></div>\n      </div>\n    </div>\n  </section>\n\n  <section>\n    <div class=\"container\">\n      ${SectionHeader({eyebrow:'The Team', title:'Meet Our Consultants', align:'center'})}\n      <div class=\"agents-grid\">${DB.agents.map(AgentCard).join('')}</div>\n    </div>\n  </section>\n\n  <section style=\"background:var(--mist)\">\n    <div class=\"container\">\n      ${SectionHeader({eyebrow:'Our Journey', title:'Milestones', align:'center'})}\n      <div class=\"timeline\">\n        ${[\n          {y:'2013',t:'Founded in Lagos',d:'Started as a 2-person consultancy on Adeola Odeku.'},\n          {y:'2016',t:'Abuja Office',d:'Opened our second office in Maitama district.'},\n          {y:'2019',t:'₦10B Milestone',d:'Cumulative client transactions cross ₦10 billion.'},\n          {y:'2021',t:'Port Harcourt',d:'Expanded into the South-South market.'},\n          {y:'2023',t:'Diaspora Desk',d:'Launched our dedicated diaspora investment desk.'},\n          {y:'2025',t:'Today',d:'50+ consultants, ₦52B+ in transactions, 528 properties sold.'}\n        ].map(m=>`<div class=\"tl-item reveal-up\"><div class=\"tl-year\">${m.y}</div><h4>${m.t}</h4><p>${m.d}</p></div>`).join('')}\n      </div>\n    </div>\n  </section>\n\n  <section>\n    <div class=\"container\">\n      ${SectionHeader({eyebrow:'Trusted By', title:'Certifications & Memberships', align:'center'})}\n      <div class=\"certs\">\n        ${['NIESV','REDAN','ISO 9001','ARELON','LASRRA'].map(c=>`<div class=\"cert\">${c}</div>`).join('')}\n      </div>\n    </div>\n  </section>\n  ${Footer()}\n  `;\n}\n\n/* --- Services --- */\nfunction ServicesPage(){\n  return `\n  <section class=\"page-hero\">\n    <div class=\"page-hero-bg\" style=\"background-image:url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80&auto=format')\"></div>\n    <div class=\"container\">\n      <div class=\"crumb\"><a href=\"#home\" data-link>Home</a> / <span>Services</span></div>\n      <h1>End-to-End Real Estate Services</h1>\n      <p style=\"opacity:.8;margin-top:.4rem;max-width:560px\">Six pillars. One promise: clarity, craftsmanship, and complete protection of your interests.</p>\n    </div>\n  </section>\n\n  <section style=\"padding-top:0\">\n    <div class=\"container\">\n      ${DB.services.map((s,i)=>`\n        <div class=\"svc-section ${i%2?'flip':''}\">\n          <div class=\"svc-img reveal-${i%2?'right':'left'}\"><img loading=\"lazy\" src=\"${s.img}\" alt=\"${escapeHTML(s.title)}\"/></div>\n          <div class=\"svc-content reveal-${i%2?'left':'right'}\">\n            <div class=\"eyebrow\">Service 0${i+1}</div>\n            <h2>${escapeHTML(s.title)}</h2>\n            <p style=\"color:var(--text-secondary);margin-bottom:1rem\">${escapeHTML(s.desc)}</p>\n            <ul class=\"svc-bullets\">${s.bullets.map(b=>`<li>${escapeHTML(b)}</li>`).join('')}</ul>\n            <div class=\"svc-steps\">${s.steps.map(st=>`<div class=\"svc-step\"><strong>${st.n}. ${st.t}</strong>${st.d}</div>`).join('')}</div>\n            <a class=\"btn btn-outline\" href=\"#contact\" data-link>Inquire about ${s.title} →</a>\n          </div>\n        </div>\n      `).join('')}\n    </div>\n  </section>\n\n  <section style=\"background:var(--mist)\">\n    <div class=\"container\">\n      ${SectionHeader({eyebrow:'Pricing', title:'Engagement Packages', align:'center'})}\n      <div class=\"pricing-grid\">\n        ${[\n          {t:'Basic',p:'2.5%',f:['Listing & marketing','Buyer screening','Standard documentation','Email & WhatsApp support']},\n          {t:'Standard',p:'5%',f:['Everything in Basic','Pro photography','Featured placement','Negotiation & closing','Dedicated consultant'],featured:true},\n          {t:'Premium',p:'7.5%',f:['Everything in Standard','Drone & video tour','International marketing','Legal team handover','12-month aftercare']},\n        ].map(t=>`<div class=\"pcard-tier ${t.featured?'featured':''}\">\n          <h3>${t.t}</h3><div class=\"price\">${t.p}</div>\n          <small style=\"color:${t.featured?'rgba(255,255,255,.6)':'var(--text-muted)'}\">of transaction value</small>\n          <ul>${t.f.map(x=>`<li>${x}</li>`).join('')}</ul>\n          <a href=\"#contact\" data-link class=\"btn ${t.featured?'btn-primary':'btn-outline'} btn-block\">Get Started</a>\n        </div>`).join('')}\n      </div>\n      <p style=\"text-align:center;color:var(--text-secondary);margin-top:1.4rem\">Need a custom enterprise package? <a href=\"#contact\" data-link style=\"color:var(--gold);font-weight:600\">Contact us →</a></p>\n    </div>\n  </section>\n\n  <section>\n    <div class=\"container\" style=\"max-width:780px\">\n      ${SectionHeader({eyebrow:'FAQ', title:'Frequently Asked Questions', align:'center'})}\n      <div id=\"faq\">\n        ${[\n          ['What areas do you cover?','We operate across Lagos, Abuja, and Port Harcourt, with select projects in Ibadan and Asaba.'],\n          ['How are your fees structured?','Standard agency fee is 5% of transaction value, with bespoke arrangements for larger mandates.'],\n          ['Do you handle diaspora clients?','Yes — we have a dedicated diaspora desk handling end-to-end remote acquisitions and management.'],\n          ['Are all your listings verified?','Every listing undergoes title verification, physical inspection, and seller KYC before going live.'],\n          ['Can you assist with mortgages?','We work with a panel of partner banks to secure competitive mortgage offers for qualifying clients.'],\n          ['Do you manage short-let properties?','Yes — we operate a short-let division for owners seeking optimised yields on serviced apartments.'],\n          ['How long does a typical sale take?','Most prime-area sales close within 30–60 days, including title perfection.'],\n          ['What if I need legal documentation help?','Our in-house legal partners handle title search, drafting, governor\\'s consent, and registration.']\n        ].map(([q,a])=>`<div class=\"faq-item\"><div class=\"faq-q\" data-action=\"faq-toggle\">${escapeHTML(q)}<span class=\"faq-toggle\">+</span></div><div class=\"faq-a\"><p style=\"padding-top:.4rem\">${escapeHTML(a)}</p></div></div>`).join('')}\n      </div>\n    </div>\n  </section>\n  ${Footer()}\n  `;\n}\n\n/* --- Contact --- */\nfunction ContactPage(){\n  return `\n  <section class=\"page-hero\">\n    <div class=\"page-hero-bg\" style=\"background-image:url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80&auto=format')\"></div>\n    <div class=\"container\">\n      <div class=\"crumb\"><a href=\"#home\" data-link>Home</a> / <span>Contact</span></div>\n      <h1>Let's Talk Property</h1>\n      <p style=\"opacity:.8;margin-top:.4rem;max-width:520px\">Whether you're buying, selling, renting or investing — we'd love to hear from you.</p>\n    </div>\n  </section>\n\n  <section>\n    <div class=\"container\">\n      <div class=\"contact-grid\">\n        <div>\n          <div class=\"eyebrow\">Send a Message</div>\n          <h2 class=\"section-title\">How can we help?</h2>\n          <div class=\"seg-reasons\" id=\"reasonGroup\" style=\"margin-top:1.2rem\">\n            ${['Buy','Sell','Rent','Invest','Other'].map(r=>`<button type=\"button\" class=\"${state.reasonContact===r?'active':''}\" data-reason=\"${r}\">${r}</button>`).join('')}\n          </div>\n          <form id=\"contactForm\" style=\"margin-top:1rem;background:#fff;border:1px solid var(--line);border-radius:var(--radius-lg);padding:1.6rem\">\n            <div class=\"field\"><input type=\"text\" name=\"name\" placeholder=\"Full name\" required autocomplete=\"name\"/><div class=\"err\">Name is required</div></div>\n            <div class=\"field\"><input type=\"email\" name=\"email\" placeholder=\"Email\" required autocomplete=\"email\"/><div class=\"err\">Valid email required</div></div>\n            <div class=\"field\"><input type=\"tel\" name=\"phone\" placeholder=\"Phone\" required inputmode=\"tel\" autocomplete=\"tel\"/><div class=\"err\">Phone required</div></div>\n            <div class=\"field\"><input type=\"text\" name=\"subject\" placeholder=\"Subject\" required/><div class=\"err\">Subject required</div></div>\n            <div class=\"field\"><textarea name=\"message\" id=\"cMessage\" placeholder=\"${reasonPlaceholder()}\" maxlength=\"500\" required></textarea>\n              <div class=\"char-count\"><span id=\"charCount\">0</span>/500</div>\n              <div class=\"err\">Please write a message</div>\n            </div>\n            <p style=\"font-size:.78rem;color:var(--text-muted);margin-bottom:.8rem\">🔒 We never share your details.</p>\n            <button class=\"btn btn-primary btn-block\" type=\"submit\">Send Message</button>\n          </form>\n        </div>\n        <aside class=\"info-panel\">\n          <h3>Get in touch</h3>\n          <div class=\"row\"><div class=\"ico\">📍</div><div>24 Adeola Odeku Street<br/>Victoria Island, Lagos</div></div>\n          <div class=\"row\"><div class=\"ico\">📞</div><div>+234 810 000 0000<br/>+234 810 000 0001</div></div>\n          <div class=\"row\"><div class=\"ico\">✉</div><div>hello@sabiositaproperties.com<br/>sales@sabiositaproperties.com</div></div>\n          <div class=\"row\"><div class=\"ico\">🕐</div><div>Mon – Fri · 8am – 6pm<br/>Sat · 10am – 4pm</div></div>\n          <div class=\"row\"><div class=\"ico\">💬</div><div>\n            <a href=\"#\">Facebook</a> · <a href=\"#\">Instagram</a> · <a href=\"#\">LinkedIn</a> · <a href=\"#\">Twitter</a>\n          </div></div>\n        </aside>\n      </div>\n    </div>\n  </section>\n\n  <section style=\"padding-top:0\">\n    <div class=\"container\">\n      <iframe loading=\"lazy\" width=\"100%\" height=\"380\" style=\"border:0;border-radius:var(--radius-lg)\"\n        src=\"https://www.google.com/maps?q=6.4281,3.4219&z=14&output=embed\" title=\"Map\"></iframe>\n    </div>\n  </section>\n\n  <section style=\"background:var(--mist)\">\n    <div class=\"container\">\n      ${SectionHeader({eyebrow:'Our Offices', title:'Visit Us', align:'center'})}\n      <div class=\"offices-grid\">\n        ${[\n          {c:'Lagos',a:'24 Adeola Odeku, V/I',p:'+234 810 000 0000',img:'https://images.unsplash.com/photo-1577760258779-e787a1733016?w=800&q=80&auto=format'},\n          {c:'Abuja',a:'Plot 14 Aminu Kano, Wuse 2',p:'+234 810 000 0010',img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format'},\n          {c:'Port Harcourt',a:'5 Aba Road, GRA Phase 2',p:'+234 810 000 0020',img:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format'},\n        ].map(o=>`<div class=\"office-card reveal-up\">\n          <img loading=\"lazy\" src=\"${o.img}\" alt=\"${o.c} office\"/>\n          <div class=\"office-body\">\n            <h3>${o.c}</h3><p style=\"color:var(--text-secondary);font-size:.9rem\">${o.a}</p>\n            <p style=\"color:var(--text-secondary);font-size:.9rem;margin:.4rem 0 1rem\">📞 ${o.p}</p>\n            <a class=\"btn btn-outline btn-sm\" href=\"#\" target=\"_blank\">Get Directions →</a>\n          </div>\n        </div>`).join('')}\n      </div>\n    </div>\n  </section>\n  ${Footer()}\n  `;\n}\n\nfunction NotFoundPage(){\n  return `<section style=\"min-height:80vh;display:grid;place-items:center;text-align:center;padding:4rem 1rem\">\n    <div>\n      <h1 style=\"font-family:Playfair Display,serif;font-size:6rem;color:var(--gold);margin-bottom:0\">404</h1>\n      <p style=\"color:var(--text-secondary);margin-bottom:1.4rem\">We couldn't find that page.</p>\n      <a class=\"btn btn-primary\" href=\"#home\" data-link>← Back to Home</a>\n    </div>\n  </section>${Footer()}`;\n}\n\nfunction Footer(){\n  return `<footer>\n    <div class=\"container\">\n      <div class=\"f-grid\">\n        <div class=\"f-col f-brand\">\n          <div class=\"brand\" style=\"color:#fff\">\n            <span class=\"brand-mark\">H</span>\n            <span style=\"font-family:Playfair Display,serif;font-weight:700\">SABIOSITA</span>\n          </div>\n          <p>Nigeria's trusted real estate firm — bringing clarity, craft and confidence to every property decision.</p>\n          <div class=\"f-social\">\n            <a href=\"#\" aria-label=\"Facebook\">F</a>\n            <a href=\"#\" aria-label=\"Instagram\">I</a>\n            <a href=\"#\" aria-label=\"LinkedIn\">L</a>\n            <a href=\"#\" aria-label=\"Twitter\">X</a>\n          </div>\n        </div>\n        <div class=\"f-col\"><h4>Quick Links</h4>\n          <a href=\"#home\" data-link>Home</a>\n          <a href=\"#properties\" data-link>Properties</a>\n          <a href=\"#services\" data-link>Services</a>\n          <a href=\"#about\" data-link>About</a>\n          <a href=\"#contact\" data-link>Contact</a>\n        </div>\n        <div class=\"f-col\"><h4>Property Types</h4>\n          ${TYPES.map(t=>`<a href=\"#properties?type=${encodeURIComponent(t.filter)}\" data-link>${t.name}</a>`).join('')}\n        </div>\n        <div class=\"f-col\"><h4>Get In Touch</h4>\n          <p style=\"color:rgba(255,255,255,.6);font-size:.9rem;line-height:1.7\">📍 24 Adeola Odeku, V/I, Lagos<br/>📞 +234 810 000 0000<br/>✉ hello@sabiositaproperties.com</p>\n          <form id=\"footerNewsletter\" style=\"margin-top:.8rem;display:flex;gap:.4rem\">\n            <input type=\"email\" placeholder=\"Your email\" required style=\"flex:1;padding:.6rem .8rem;border-radius:8px;border:1px solid #2c2c2e;background:#1c1c1e;color:#fff;outline:none\"/>\n            <button class=\"btn btn-primary btn-sm\" type=\"submit\">Join</button>\n          </form>\n        </div>\n      </div>\n      <div class=\"f-divider\"></div>\n      <div class=\"f-bottom\">\n        <div>© 2025 Sabiosita Properties. All rights reserved.</div>\n        <div class=\"links\"><a href=\"#\">Privacy</a><a href=\"#\">Terms</a><a href=\"#\">Cookies</a><a href=\"#\">Sitemap</a></div>\n      </div>\n    </div>\n  </footer>`;\n}\n\nfunction reasonPlaceholder(){\n  const map = {\n    Buy:\"Tell us what you're looking to buy...\",\n    Sell:\"Tell us about the property you'd like to sell...\",\n    Rent:\"Tell us about your ideal rental...\",\n    Invest:\"Share your investment goals and budget...\",\n    Other:\"How can we help?\"\n  };\n  return map[state.reasonContact] || map.Other;\n}\n\n/* ===========================================================\n   FILTER PILL HELPER (home)\n=========================================================== */\nfunction filterPills(arr, pill){\n  if(pill==='All') return arr;\n  if(pill==='For Sale') return arr.filter(p=>p.listing==='Sale');\n  if(pill==='For Rent') return arr.filter(p=>p.listing==='Rent');\n  if(pill==='Luxury') return arr.filter(p=>p.type==='Luxury' || p.type==='Villa' || p.price>=200000000);\n  if(pill==='New Listing') return arr.filter(p=>p.badge==='New Listing');\n  return arr;\n}\n\n/* ===========================================================\n   ROUTING\n=========================================================== */\nfunction parseHash(){\n  const h = location.hash.replace(/^#/, '') || 'home';\n  const [path, qs] = h.split('?');\n  const parts = path.split('/');\n  const params = {};\n  if(qs){ qs.split('&').forEach(p=>{ const [k,v]=p.split('='); params[k]=decodeURIComponent(v||''); }); }\n  return { page: parts[0]||'home', id: parts[1], params };\n}\n\nfunction render(){\n  const app = document.getElementById('app');\n  const { page, id, params } = parseHash();\n  state.page = page;\n\n  // Apply URL params for properties page\n  if(page==='properties'){\n    if(params.type) state.filters.types = [params.type];\n    if(params.listing) state.filters.listing = params.listing;\n    if(params.beds) state.filters.beds = [params.beds];\n  }\n\n  // progress bar\n  const prog = document.getElementById('progress');\n  prog.classList.remove('done'); prog.classList.add('loading');\n\n  app.classList.add('fading');\n  setTimeout(()=>{\n    let html='';\n    if(page==='home') html = HomePage();\n    else if(page==='properties') html = PropertiesPage();\n    else if(page==='property' && id) html = PropertyDetailPage(parseInt(id));\n    else if(page==='about') html = AboutPage();\n    else if(page==='services') html = ServicesPage();\n    else if(page==='contact') html = ContactPage();\n    else html = NotFoundPage();\n\n    app.innerHTML = html;\n    app.classList.remove('fading');\n\n    // restore scroll\n    const ss = sessionStorage.getItem('scroll_'+location.hash);\n    window.scrollTo({ top: ss?parseInt(ss):0, behavior:'instant' });\n\n    // update active link\n    document.querySelectorAll('.nav-link').forEach(a=>{\n      a.classList.toggle('active', a.getAttribute('href')==='#'+page);\n    });\n    // saved count\n    updateSavedCount();\n    // observers / interactive setup\n    setupReveals();\n    setupCounters();\n    setupHomeIfAny();\n    setupPropertyDetailIfAny();\n    setupContactIfAny();\n\n    prog.classList.remove('loading'); prog.classList.add('done');\n  }, 180);\n}\n\nwindow.addEventListener('hashchange', ()=>{\n  // store scroll for previous page\n  sessionStorage.setItem('scroll_'+lastHash, window.scrollY);\n  lastHash = location.hash;\n  render();\n});\n\nlet lastHash = location.hash;\n\n/* ===========================================================\n   EVENT DELEGATION\n=========================================================== */\ndocument.addEventListener('click', (e)=>{\n  const a = e.target.closest('[data-link]');\n  if(a){\n    // let normal hash navigation happen\n    closeMobileMenu();\n    return;\n  }\n\n  const t = e.target.closest('[data-action]');\n  if(!t) return;\n  const act = t.dataset.action;\n\n  switch(act){\n    case 'save': toggleSave(parseInt(t.dataset.id)); break;\n    case 'open-saved': openSavedModal(); break;\n    case 'pill': state.pillFilter = t.dataset.val; render(); break;\n    case 'testi-prev': testiGo(state.testiIndex-1); break;\n    case 'testi-next': testiGo(state.testiIndex+1); break;\n    case 'testi-go': testiGo(parseInt(t.dataset.i)); break;\n    case 'open-blog': openBlog(parseInt(t.dataset.id)); break;\n    case 'watch-tour': openVideoModal(); break;\n    case 'toggle-advanced': document.getElementById('searchAdv').classList.toggle('open'); break;\n    case 'filter-listing': state.filters.listing = (state.filters.listing===t.dataset.val?'all':t.dataset.val); state.shown=12; render(); break;\n    case 'filter-type': toggleArr(state.filters.types, t.value); state.shown=12; render(); break;\n    case 'filter-amenity': toggleArr(state.filters.amenities, t.value); state.shown=12; render(); break;\n    case 'filter-beds': toggleArr(state.filters.beds, t.dataset.val); state.shown=12; render(); break;\n    case 'filter-baths': toggleArr(state.filters.baths, t.dataset.val); state.shown=12; render(); break;\n    case 'filter-area': /* handled on change */ break;\n    case 'sort': /* handled on change */ break;\n    case 'view': state.view = t.dataset.val; render(); break;\n    case 'load-more': state.shown += 12; render(); break;\n    case 'clear-filters': clearFilters(); break;\n    case 'pd-tab': state.activeTab = t.dataset.val; document.querySelectorAll('.pd-tab').forEach(x=>x.classList.toggle('active', x.dataset.val===t.dataset.val)); document.querySelectorAll('.pd-tabpanel').forEach(p=>p.classList.toggle('active', p.dataset.panel===t.dataset.val)); break;\n    case 'pd-thumb': swapMainImage(parseInt(t.dataset.i), t); break;\n    case 'lightbox-open': openLightbox(state.activeProperty.images, 0); break;\n    case 'lb-close': closeLightbox(); break;\n    case 'lb-prev': lightboxStep(-1); break;\n    case 'lb-next': lightboxStep(1); break;\n    case 'compare-toggle': toggleCompare(parseInt(t.dataset.id)); break;\n    case 'open-compare': openCompareModal(); break;\n    case 'share': shareProp(parseInt(t.dataset.id)); break;\n    case 'print': window.print(); break;\n    case 'tour-360': toast('360° tour coming soon!','info'); break;\n    case 'faq-toggle': t.parentElement.classList.toggle('open'); break;\n  }\n});\n\ndocument.addEventListener('change', (e)=>{\n  const t = e.target.closest('[data-action]');\n  if(!t) return;\n  if(t.dataset.action==='filter-area'){ state.filters.area = t.value; state.shown=12; render(); }\n  if(t.dataset.action==='sort'){ state.sort = t.value; render(); }\n});\n\ndocument.addEventListener('input', (e)=>{\n  if(e.target.id==='pmin'){ state.filters.priceMin = parseInt(e.target.value)||0; debouncedRender(); }\n  if(e.target.id==='pmax'){ state.filters.priceMax = parseInt(e.target.value)||500000000; debouncedRender(); }\n  if(['cPrice','cDown','cRate','cTerm'].includes(e.target.id)){ updateMortgage(); }\n  if(e.target.id==='cMessage'){ document.getElementById('charCount').textContent = e.target.value.length; }\n  // inquiry form draft\n  const inq = e.target.closest('#inquiryForm');\n  if(inq){\n    const pid = inq.dataset.pid;\n    const data = Object.fromEntries(new FormData(inq).entries());\n    LS.set('sabiosita_form_'+pid, data);\n  }\n});\n\nconst debouncedRender = debounce(render, 350);\n\nfunction toggleArr(arr,v){ const i=arr.indexOf(v); if(i>-1) arr.splice(i,1); else arr.push(v); }\nfunction clearFilters(){ state.filters = { listing:'all', types:[], beds:[], baths:[], amenities:[], priceMin:0, priceMax:500000000, sizeMin:0, sizeMax:20000, area:'', yearMin:2000, yearMax:2026 }; state.shown=12; render(); }\n\n/* ===========================================================\n   FORM SUBMISSIONS\n=========================================================== */\ndocument.addEventListener('submit', (e)=>{\n  const f = e.target;\n  if(f.id==='searchForm'){\n    e.preventDefault();\n    const fd = new FormData(f);\n    const params = new URLSearchParams();\n    if(fd.get('type')) params.set('type', fd.get('type'));\n    if(fd.get('listing')) params.set('listing', fd.get('listing'));\n    if(fd.get('beds')) params.set('beds', fd.get('beds'));\n    if(fd.get('priceMax')) state.filters.priceMax = parseInt(fd.get('priceMax'));\n    if(fd.get('area')) state.filters.area = fd.get('area');\n    state.filters.amenities = fd.getAll('amenity');\n    location.hash = '#properties' + (params.toString()?'?'+params.toString():'');\n    return;\n  }\n  if(f.id==='newsletterForm' || f.id==='footerNewsletter'){\n    e.preventDefault();\n    const email = f.querySelector('input[type=email]').value.trim();\n    if(!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)){ toast('Please enter a valid email','error'); return; }\n    const subs = LS.get('sabiosita_subscribers',[]);\n    if(subs.includes(email)){ toast('You are already subscribed','info'); return; }\n    subs.push(email); LS.set('sabiosita_subscribers', subs);\n    f.innerHTML = '<div style=\"padding:1rem;color:var(--success);font-weight:600\">✓ You\\'re subscribed! Welcome aboard.</div>';\n    return;\n  }\n  if(f.id==='inquiryForm'){\n    e.preventDefault();\n    if(!validateForm(f)) return;\n    LS.removeItem && LS.removeItem('sabiosita_form_'+f.dataset.pid);\n    localStorage.removeItem('sabiosita_form_'+f.dataset.pid);\n    f.reset();\n    toast('Inquiry sent! Our team will be in touch shortly.','success');\n    return;\n  }\n  if(f.id==='viewingForm'){\n    e.preventDefault();\n    const slot = f.querySelector('#timeSlots .active')?.dataset.slot || 'Morning';\n    openModal('Viewing Booked!', `<p>Your viewing is scheduled for <strong>${f.date.value}</strong> (${slot}). Our consultant will confirm by phone.</p>`);\n    return;\n  }\n  if(f.id==='contactForm'){\n    e.preventDefault();\n    if(!validateForm(f)) return;\n    f.reset();\n    confettiBurst();\n    openModal('Message sent!','<p>Thank you — we\\'ve received your message and will respond within one business hour.</p>');\n    return;\n  }\n});\n\nfunction validateForm(form){\n  let ok=true;\n  form.querySelectorAll('.field').forEach(f=>f.classList.remove('invalid'));\n  form.querySelectorAll('input[required],textarea[required]').forEach(inp=>{\n    const val = inp.value.trim();\n    let bad = !val;\n    if(inp.type==='email' && val && !/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(val)) bad=true;\n    if(bad){ inp.closest('.field')?.classList.add('invalid'); ok=false; }\n  });\n  return ok;\n}\n\n/* time slots toggle on detail */\ndocument.addEventListener('click',(e)=>{\n  const slotBtn = e.target.closest('#timeSlots button');\n  if(slotBtn){ slotBtn.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('active')); slotBtn.classList.add('active'); }\n  const reasonBtn = e.target.closest('#reasonGroup button');\n  if(reasonBtn){\n    reasonBtn.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('active'));\n    reasonBtn.classList.add('active');\n    state.reasonContact = reasonBtn.dataset.reason;\n    const msg = document.getElementById('cMessage');\n    if(msg) msg.placeholder = reasonPlaceholder();\n  }\n});\n\n/* ===========================================================\n   SAVED PROPERTIES\n=========================================================== */\nfunction toggleSave(id){\n  const i = state.savedIds.indexOf(id);\n  if(i>-1){ state.savedIds.splice(i,1); toast('Removed from saved','info'); }\n  else { state.savedIds.push(id); toast('Saved!','success'); }\n  LS.set('sabiosita_saved', state.savedIds);\n  updateSavedCount();\n  // update icons in place\n  document.querySelectorAll(`[data-action=\"save\"][data-id=\"${id}\"]`).forEach(b=>{\n    b.classList.toggle('active', state.savedIds.includes(id));\n    const svg = b.querySelector('svg'); if(svg) svg.setAttribute('fill', state.savedIds.includes(id)?'currentColor':'none');\n    if(b.classList.contains('pd-action')) b.innerHTML = state.savedIds.includes(id)?'✓ Saved':'💾 Save';\n  });\n}\nfunction updateSavedCount(){\n  const el = document.getElementById('savedCount');\n  if(!el) return;\n  el.textContent = state.savedIds.length;\n  el.classList.toggle('hidden', state.savedIds.length===0);\n}\nfunction openSavedModal(){\n  const list = DB.properties.filter(p=>state.savedIds.includes(p.id));\n  openModal('Saved Properties', list.length\n    ? `<div style=\"display:flex;flex-direction:column;gap:.4rem\">${list.map(p=>`<a href=\"#property/${p.id}\" data-link onclick=\"document.getElementById('modal').classList.remove('open')\" style=\"display:flex;gap:.6rem;padding:.5rem;border:1px solid var(--line);border-radius:8px\"><img src=\"${p.images[0]}\" style=\"width:80px;height:60px;object-fit:cover;border-radius:6px\"/><div><strong>${escapeHTML(p.title)}</strong><div style=\"font-size:.8rem;color:var(--text-secondary)\">${escapeHTML(p.area)} · ${fmtNaira(p.price)}</div></div></a>`).join('')}</div>`\n    : '<p style=\"color:var(--text-secondary)\">You haven\\'t saved any properties yet. Tap the bookmark icon on a listing to save it for later.</p>');\n}\n\n/* ===========================================================\n   COMPARE\n=========================================================== */\nfunction toggleCompare(id){\n  const i = state.compareList.indexOf(id);\n  if(i>-1) state.compareList.splice(i,1);\n  else if(state.compareList.length<3) state.compareList.push(id);\n  else { toast('You can compare up to 3 properties','warning'); return; }\n  LS.set('sabiosita_compare', state.compareList);\n  if(state.compareList.length>=2 && i===-1) openCompareModal();\n  render();\n}\nfunction openCompareModal(){\n  const items = DB.properties.filter(p=>state.compareList.includes(p.id));\n  const rows = ['Image','Price','Type','Beds','Baths','Size','Location','Amenities','Agent'];\n  const m = document.getElementById('compareModal');\n  document.getElementById('compareModalBody').innerHTML = `\n    <button class=\"modal-close\" onclick=\"document.getElementById('compareModal').classList.remove('open')\">×</button>\n    <h3>Compare Properties</h3>\n    <div style=\"overflow-x:auto\"><table class=\"compare-table\">\n      <thead><tr><th></th>${items.map(p=>`<th>${escapeHTML(p.title)}</th>`).join('')}</tr></thead>\n      <tbody>\n        <tr><th>Image</th>${items.map(p=>`<td><img src=\"${p.images[0]}\" alt=\"\"/></td>`).join('')}</tr>\n        <tr><th>Price</th>${items.map(p=>`<td><strong style=\"color:var(--gold-dark)\">${fmtFull(p.price)}</strong>${p.priceLabel||''}</td>`).join('')}</tr>\n        <tr><th>Type</th>${items.map(p=>`<td>${p.type}</td>`).join('')}</tr>\n        <tr><th>Beds</th>${items.map(p=>`<td>${p.beds||'—'}</td>`).join('')}</tr>\n        <tr><th>Baths</th>${items.map(p=>`<td>${p.baths||'—'}</td>`).join('')}</tr>\n        <tr><th>Size</th>${items.map(p=>`<td>${p.size.toLocaleString()} sqft</td>`).join('')}</tr>\n        <tr><th>Location</th>${items.map(p=>`<td>${escapeHTML(p.area)}, ${escapeHTML(p.state)}</td>`).join('')}</tr>\n        <tr><th>Amenities</th>${items.map(p=>`<td>${p.amenities.slice(0,5).join(', ')}</td>`).join('')}</tr>\n        <tr><th>Agent</th>${items.map(p=>`<td>${escapeHTML(p.agent.name)}</td>`).join('')}</tr>\n        <tr><th></th>${items.map(p=>`<td><a class=\"btn btn-primary btn-sm\" href=\"#property/${p.id}\" data-link onclick=\"document.getElementById('compareModal').classList.remove('open')\">Inquire</a></td>`).join('')}</tr>\n      </tbody>\n    </table></div>`;\n  m.classList.add('open');\n}\n\n/* ===========================================================\n   GALLERY / LIGHTBOX\n=========================================================== */\nfunction swapMainImage(i, thumbEl){\n  const main = document.getElementById('pdMain');\n  if(!main) return;\n  main.style.opacity='0';\n  setTimeout(()=>{ main.src = state.activeProperty.images[i]; main.style.opacity='1'; },150);\n  document.querySelectorAll('.pd-thumb').forEach(t=>t.classList.remove('active'));\n  thumbEl.classList.add('active');\n  state.pdActiveImage = i;\n}\nfunction openLightbox(images, idx){\n  state.lightbox = { open:true, images, idx };\n  document.getElementById('lbImg').src = images[idx];\n  document.getElementById('lbCounter').textContent = (idx+1)+' / '+images.length;\n  document.getElementById('lightbox').classList.add('open');\n}\nfunction closeLightbox(){ document.getElementById('lightbox').classList.remove('open'); state.lightbox.open=false; }\nfunction lightboxStep(d){\n  const lb = state.lightbox;\n  lb.idx = (lb.idx + d + lb.images.length) % lb.images.length;\n  document.getElementById('lbImg').src = lb.images[lb.idx];\n  document.getElementById('lbCounter').textContent = (lb.idx+1)+' / '+lb.images.length;\n}\ndocument.addEventListener('keydown',(e)=>{\n  if(state.lightbox.open){\n    if(e.key==='Escape') closeLightbox();\n    if(e.key==='ArrowLeft') lightboxStep(-1);\n    if(e.key==='ArrowRight') lightboxStep(1);\n  }\n  if(e.key==='Escape'){ document.getElementById('modal').classList.remove('open'); document.getElementById('compareModal').classList.remove('open'); closeMobileMenu(); }\n});\n// touch swipe\nlet touchX=0;\ndocument.addEventListener('touchstart',e=>{ if(state.lightbox.open) touchX = e.touches[0].clientX; });\ndocument.addEventListener('touchend',e=>{\n  if(!state.lightbox.open) return;\n  const dx = e.changedTouches[0].clientX - touchX;\n  if(Math.abs(dx)>40) lightboxStep(dx<0?1:-1);\n});\n\n/* ===========================================================\n   MORTGAGE CALC\n=========================================================== */\nfunction updateMortgage(){\n  const price = parseFloat(document.getElementById('cPrice').value)||0;\n  const downP = parseFloat(document.getElementById('cDown').value)||0;\n  const rate  = parseFloat(document.getElementById('cRate').value)||0;\n  const years = parseFloat(document.getElementById('cTerm').value)||1;\n  const principal = price * (1 - downP/100);\n  const monthlyR = rate/100/12;\n  const n = years*12;\n  let monthly;\n  if(monthlyR===0) monthly = principal/n;\n  else monthly = principal * monthlyR * Math.pow(1+monthlyR,n) / (Math.pow(1+monthlyR,n)-1);\n  const total = monthly*n;\n  const interest = total - principal;\n  document.getElementById('cResult').innerHTML = `\n    <div style=\"font-size:.8rem;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.6)\">Estimated Monthly Payment</div>\n    <div class=\"calc-monthly\">${fmtFull(Math.round(monthly))}</div>\n    <div class=\"calc-summary\">\n      <span>Total paid: <strong>${fmtNaira(total)}</strong></span>\n      <span>Total interest: <strong>${fmtNaira(interest)}</strong></span>\n      <span>Principal: <strong>${fmtNaira(principal)}</strong></span>\n    </div>\n  `;\n}\n\n/* ===========================================================\n   TESTIMONIALS CAROUSEL\n=========================================================== */\nlet testiTimer;\nfunction testiGo(i){\n  const total = DB.testimonials.length;\n  state.testiIndex = (i + total) % total;\n  document.querySelectorAll('.testi-slide').forEach((s,idx)=>s.classList.toggle('active', idx===state.testiIndex));\n  document.querySelectorAll('.testi-dot').forEach((d,idx)=>d.classList.toggle('active', idx===state.testiIndex));\n}\nfunction startTesti(){\n  clearInterval(testiTimer);\n  testiTimer = setInterval(()=>testiGo(state.testiIndex+1), 5000);\n}\n\n/* ===========================================================\n   COUNT UP\n=========================================================== */\nfunction setupCounters(){\n  const obs = new IntersectionObserver(entries=>{\n    entries.forEach(en=>{\n      if(en.isIntersecting){\n        const el = en.target;\n        const target = parseInt(el.dataset.count);\n        let cur = 0;\n        const dur = 1400, start = performance.now();\n        function step(t){\n          const p = Math.min(1,(t-start)/dur);\n          cur = Math.round(target * (1 - Math.pow(1-p,3)));\n          el.textContent = cur;\n          if(p<1) requestAnimationFrame(step);\n        }\n        requestAnimationFrame(step);\n        obs.unobserve(el);\n      }\n    });\n  },{threshold:0.4});\n  document.querySelectorAll('[data-count]').forEach(el=>obs.observe(el));\n}\n\n/* ===========================================================\n   REVEALS\n=========================================================== */\nfunction setupReveals(){\n  const obs = new IntersectionObserver(entries=>{\n    entries.forEach(en=>{\n      if(en.isIntersecting){ en.target.classList.add('in'); obs.unobserve(en.target); }\n    });\n  },{threshold:0.15});\n  document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.reveal-fade').forEach(el=>obs.observe(el));\n}\n\n/* ===========================================================\n   PER-PAGE INIT\n=========================================================== */\nfunction setupHomeIfAny(){\n  if(state.page!=='home') return;\n  startTesti();\n  const track = document.getElementById('testiTrack');\n  if(track){\n    track.addEventListener('mouseenter',()=>clearInterval(testiTimer));\n    track.addEventListener('mouseleave',startTesti);\n  }\n}\nfunction setupPropertyDetailIfAny(){\n  if(state.page!=='property') return;\n  if(document.getElementById('cPrice')) updateMortgage();\n}\nfunction setupContactIfAny(){\n  if(state.page!=='contact') return;\n}\n\n/* ===========================================================\n   MISC: nav scroll, top button, mobile menu, modals, toasts\n=========================================================== */\nconst nav = document.getElementById('nav');\nconst fabTop = document.getElementById('fabTop');\nwindow.addEventListener('scroll', ()=>{\n  const y = window.scrollY;\n  nav.classList.toggle('scrolled', y>80);\n  fabTop.classList.toggle('show', y>400);\n}, {passive:true});\nfabTop.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));\n\nconst ham = document.getElementById('hamburger');\nconst mobileMenu = document.getElementById('mobileMenu');\nham.addEventListener('click', ()=>{\n  nav.classList.toggle('menu-open');\n  mobileMenu.classList.toggle('open');\n});\nfunction closeMobileMenu(){ nav.classList.remove('menu-open'); mobileMenu.classList.remove('open'); }\n\n/* Modals */\nfunction openModal(title, content){\n  document.getElementById('modalBody').innerHTML = `<button class=\"modal-close\" onclick=\"document.getElementById('modal').classList.remove('open')\">×</button><h3>${title}</h3>${content}`;\n  document.getElementById('modal').classList.add('open');\n}\ndocument.getElementById('modal').addEventListener('click',e=>{ if(e.target.id==='modal') e.currentTarget.classList.remove('open'); });\ndocument.getElementById('compareModal').addEventListener('click',e=>{ if(e.target.id==='compareModal') e.currentTarget.classList.remove('open'); });\ndocument.getElementById('lightbox').addEventListener('click',e=>{ if(e.target.id==='lightbox') closeLightbox(); });\n\nfunction openVideoModal(){\n  openModal('Sabiosita Properties Brand Tour',`<div style=\"position:relative;padding-top:56.25%\"><iframe style=\"position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:10px\" src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\" allowfullscreen title=\"Tour\"></iframe></div>`);\n}\nfunction openBlog(id){\n  const b = DB.blog.find(x=>x.id===id);\n  if(!b) return;\n  openModal(b.title, `<img src=\"${b.img}\" style=\"width:100%;border-radius:8px;margin-bottom:1rem\"/><div style=\"font-size:.78rem;color:var(--gold);text-transform:uppercase;letter-spacing:.15em\">${b.cat} · ${b.date} · ${b.read}</div>${b.body.split('\\n\\n').map(p=>`<p style=\"margin-top:.8rem;color:var(--text-secondary)\">${escapeHTML(p)}</p>`).join('')}`);\n}\nfunction shareProp(id){\n  const url = location.origin + location.pathname + '#property/'+id;\n  if(navigator.share){ navigator.share({title:'Property',url}).catch(()=>{}); }\n  else { navigator.clipboard?.writeText(url); toast('Link copied to clipboard','success'); }\n}\n\n/* Toasts */\nfunction toast(msg, type='info'){\n  const wrap = document.getElementById('toastWrap');\n  const t = document.createElement('div');\n  t.className = 'toast '+type;\n  t.innerHTML = `<span>${escapeHTML(msg)}</span><button aria-label=\"Close\">×</button>`;\n  wrap.appendChild(t);\n  const remove = ()=>{ t.classList.add('out'); setTimeout(()=>t.remove(),300); };\n  t.querySelector('button').addEventListener('click',remove);\n  setTimeout(remove, 4000);\n}\n\n/* Confetti */\nfunction confettiBurst(){\n  const c = document.createElement('div'); c.className='confetti';\n  const colors = ['#C6A84B','#E8D48A','#9A7B2F','#1C1C1E','#FFFFFF'];\n  for(let i=0;i<60;i++){\n    const s = document.createElement('span');\n    s.style.left = Math.random()*100+'%';\n    s.style.background = colors[Math.floor(Math.random()*colors.length)];\n    s.style.animationDelay = (Math.random()*.6)+'s';\n    s.style.animationDuration = (1.6+Math.random()*1.4)+'s';\n    s.style.transform = 'rotate('+(Math.random()*360)+'deg)';\n    c.appendChild(s);\n  }\n  document.body.appendChild(c);\n  setTimeout(()=>c.remove(),3500);\n}\n\n/* Cookie */\nconst cookie = document.getElementById('cookie');\nif(!LS.get('sabiosita_cookie',false)){\n  setTimeout(()=>cookie.classList.add('show'), 1500);\n}\ndocument.getElementById('cookieAccept').addEventListener('click',()=>{\n  LS.set('sabiosita_cookie',true);\n  cookie.classList.remove('show');\n});\n\n/* Init */\nrender();\n";
const JSONLD = "\n{\n  \"@context\":\"https://schema.org\",\n  \"@type\":\"RealEstateAgent\",\n  \"name\":\"Sabiosita Properties\",\n  \"description\":\"Nigeria's trusted real estate firm offering sales, rentals, management and consultancy.\",\n  \"url\":\"https://sabiositaproperties.com\",\n  \"telephone\":\"+23490322992420\",\n  \"address\":{\"@type\":\"PostalAddress\",\"streetAddress\":\"24 Adeola Odeku Street\",\"addressLocality\":\"Victoria Island, Lagos\",\"addressRegion\":\"Lagos\",\"postalCode\":\"101241\",\"addressCountry\":\"NG\"},\n  \"geo\":{\"@type\":\"GeoCoordinates\",\"latitude\":6.4281,\"longitude\":3.4219},\n  \"openingHours\":\"Mo-Fr 08:00-18:00\",\n  \"sameAs\":[\"https://facebook.com/hassanrealestate\",\"https://instagram.com/hassanrealestate\",\"https://linkedin.com/company/hassanrealestate\",\"https://twitter.com/hassanrealty\"]\n}\n";

export const Route = createFileRoute('/')({
  component: SitePage,
  head: () => ({
    meta: [
      { title: 'Sabiosita Properties | Buy, Sell & Rent Properties in Lagos, Abuja & Nigeria' },
      { name: 'description', content: "Nigeria's trusted real estate firm. Browse 500+ verified properties for sale and rent in Lagos, Abuja & Port Harcourt. Expert consultants, seamless transactions." },
      { name: 'theme-color', content: '#0D0D0D' },
      { property: 'og:site_name', content: 'Sabiosita Properties' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Sabiosita Properties | Buy, Sell & Rent Properties in Nigeria' },
      { property: 'og:description', content: "Nigeria's #1 real estate consultancy. 500+ verified listings across Lagos, Abuja & Port Harcourt." },
      { property: 'og:image', content: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Sabiosita Properties' },
      { name: 'twitter:description', content: 'Discover your perfect property in Nigeria.' },
      { name: 'twitter:image', content: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format' },
    ],
    links: [
      { rel: 'canonical', href: 'https://sabiositaproperties.com/' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      { rel: 'preconnect', href: 'https://images.unsplash.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500;1,700&family=Outfit:wght@300;400;500;600;700&display=swap' },
    ],
    scripts: [
      { type: 'application/ld+json', children: JSONLD },
    ],
  }),
});

function SitePage() {
  const ranRef = useRef(false);
  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;
    const s = document.createElement('script');
    s.textContent = SITE_JS;
    document.body.appendChild(s);
    return () => { s.remove(); };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SITE_CSS }} />
      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
    </>
  );
}
