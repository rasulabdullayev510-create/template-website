// Shared nav + footer renderer
// Called by every page after config.js loads

// Track page visit
(function() {
  if (!window.TRACKING_API || window.TRACKING_API.includes('YOUR-APP')) return;
  const page = location.pathname.split('/').pop().replace('.html','') || 'home';
  fetch(window.TRACKING_API + '/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page })
  }).catch(function(){});
})();

function renderNav(activePage) {
  const C = window.CLIENT;
  const pages = [
    { id: 'home',     label: 'Home'     },
    { id: 'services', label: 'Services' },
    { id: 'reviews',  label: 'Reviews'  },
    { id: 'contact',  label: 'Contact'  },
  ];

  const links = pages.map(p =>
    `<a href="#" id="nav-${p.id}" onclick="navigateTo('${p.id}');return false;" class="${activePage === p.id ? 'active' : ''}">${p.label}</a>`
  ).join('') + `<a href="${C.bookingUrl || '#'}" class="nav-cta" target="_blank">Book Now</a>`;

  const logoHtml = C.logoSrc
    ? `<img class="nav-brand-img" src="${C.logoSrc}" alt="${C.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';
  const emojiHtml = `<div class="nav-brand-emoji" style="${C.logoSrc ? 'display:none' : ''}">${C.logoEmoji || '◈'}</div>`;

  document.getElementById('navbar').innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="nav-brand">
        ${logoHtml}${emojiHtml}
        <span>${C.name}</span>
      </a>
      <div class="nav-links" id="nav-links">${links}</div>
      <button class="nav-toggle" id="nav-toggle">☰</button>
    </div>
  `;

  // Mobile toggle
  document.getElementById('nav-toggle').addEventListener('click', function() {
    var isOpen = document.getElementById('nav-links').classList.toggle('open');
    this.textContent = isOpen ? '✕' : '☰';
    document.body.classList.toggle('menu-open', isOpen);
  });
  // Close menu on nav link click
  document.getElementById('nav-links').querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      document.getElementById('nav-links').classList.remove('open');
      document.getElementById('nav-toggle').textContent = '☰';
      document.body.classList.remove('menu-open');
    });
  });
}

function renderFooter() {
  const C = window.CLIENT;
  const year = new Date().getFullYear();

  const socials = [
    { url: C.instagram,      svg: '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>' },
    { url: C.facebook,       svg: '<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' },
    { url: C.googleMapsLink, svg: '<svg viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>' },
  ].filter(s => s.url).map(s =>
    `<a href="${s.url}" class="social-btn" target="_blank" rel="noopener">${s.svg}</a>`
  ).join('');

  document.getElementById('footer').innerHTML = `
    <div class="wrap">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-brand-name">${C.name}</div>
          <div class="footer-brand-sub">${C.tagline}</div>
          ${socials ? `<div class="social-row" style="margin-top:20px">${socials}</div>` : ''}
        </div>
        <div class="footer-col">
          <h4>Pages</h4>
          <a href="index.html">Home</a>
          <a href="services.html">Services</a>
          <a href="reviews.html">Reviews</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <a href="tel:${C.phone}">${C.phone}</a>
          <a href="mailto:${C.email}">${C.email}</a>
          <a href="${C.bookingUrl || '#'}" target="_blank">Book Online →</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${year} ${C.name}. All rights reserved.</span>
        <span>${C.address}</span>
      </div>
    </div>
  `;
}
