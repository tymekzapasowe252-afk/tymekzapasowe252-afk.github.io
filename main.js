// Main JS

// ============================================
// TestoShoop — SPA Router + Working Auth
// ============================================

const API_URL = 'http://localhost:3000/api';

// --- Auth State ---
let currentUser = null;

// --- API Helpers ---
async function apiCall(endpoint, method = 'GET', body = null) {
  const token = localStorage.getItem('pv_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = token;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'API Error');
  return data;
}

// --- Auth ---
async function checkAuth() {
  const token = localStorage.getItem('pv_token');
  if (!token) return null;

  try {
    currentUser = await apiCall('/user/me');
    return currentUser;
  } catch (e) {
    console.error('Auth check failed:', e);
    logout();
    return null;
  }
}

async function login(email, password) {
  const data = await apiCall('/auth/login', 'POST', { email, password });
  localStorage.setItem('pv_token', data.token);
  currentUser = data.user;
  return currentUser;
}

async function register(username, email, password) {
  const data = await apiCall('/auth/register', 'POST', { username, email, password });
  localStorage.setItem('pv_token', data.token);
  currentUser = data.user;
  return currentUser;
}

function logout() {
  localStorage.removeItem('pv_token');
  currentUser = null;
  navigate();
}

function getLoggedIn() {
  return currentUser;
}


// --- Pages ---
const pages = {
  home: () => `
    <section class="hero page-transition">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">🎮 Marketplace for Cheetos</div>
          <h1 class="hero-title">
            Premium Tools for
            <span class="hero-title--highlight">FiveM</span> &
            <span class="hero-title--highlight alt">Minecraft</span>
          </h1>
          <p class="hero-subtitle">
            Discover Best Cheeto For Fivem And Minecraft.
          </p>
          <div class="hero-cta">
            <a href="#catalog" class="btn btn--primary">
              <span class="btn-icon">📦</span> Catalog
            </a>
            <a href="#register" class="btn btn--secondary">
              <span class="btn-icon">✨</span> Create Account
            </a>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number" data-target="2500">0</span>+
              <span class="stat-label">Opinions</span>
            </div>
            <div class="stat">
              <span class="stat-number" data-target="840">0</span>+
              <span class="stat-label">Developers</span>
            </div>
            <div class="stat">
              <span class="stat-number" data-target="15000">0</span>+
              <span class="stat-label">Downloads</span>
            </div>
          </div>
        </div>
        <div class="hero-illustration">
          <div class="hero-img-wrapper">
            <img src="./hero.png" alt="FiveM and Minecraft marketplace illustration" class="hero-img" />
            <div class="hero-glow"></div>
          </div>
          <div class="float-element float-1">🧊</div>
          <div class="float-element float-2">⚙️</div>
          <div class="float-element float-3">🗺️</div>
          <div class="float-element float-4">💎</div>
          <div class="float-element float-5">🔧</div>
        </div>
      </div>
    </section>
  `,

  catalog: () => `
    <section class="catalog-page page-transition">
      <div class="catalog-container">
        <div class="page-heading-wrap">
          <h1 class="page-heading">Products</h1>
        </div>
        <p class="page-desc">Choose your platform and level up your server.</p>
        <div class="catalog-grid">
          <div class="product-card product-minecraft">
            <div class="product-badge minecraft-badge">Minecraft</div>
            <div class="product-icon-wrap">
              <span class="product-icon">⛏️</span>
            </div>
            <h2 class="product-name">Minecraft Cheeto</h2>
            <p class="product-desc">
              The ultimate Minecraft enhancement suite. PvP, utility, render, and more.
            </p>
            <ul class="product-features">
              <li>🎯 Advanced PvP modules</li>
              <li>🌍 ESP & World utilities</li>
              <li>⚡ Optimized performance</li>
              <li>🔄 Auto-updates</li>
              <li>🛡️ Undetected & secure</li>
            </ul>
            <div class="product-footer">
              <span class="product-price">$14.99</span>
              <a href="#" class="btn btn--mint btn--sm">Get Access</a>
            </div>
          </div>
          <div class="product-card product-fivem">
            <div class="product-badge fivem-badge">FiveM</div>
            <div class="product-icon-wrap">
              <span class="product-icon">🚗</span>
            </div>
            <h2 class="product-name">FiveM Cheeto</h2>
            <p class="product-desc">
              Premium FiveM tool suite. Aimbot, ESP, teleport, vehicle spawner, and more.
            </p>
            <ul class="product-features">
              <li>🎯 Precision aimbot</li>
              <li>👁️ Player & vehicle ESP</li>
              <li>🚀 Teleport & speed</li>
              <li>🚗 Vehicle spawner</li>
              <li>🛡️ Anti-ban protection</li>
            </ul>
            <div class="product-footer">
              <span class="product-price">$19.99</span>
              <a href="#" class="btn btn--primary btn--sm">Get Access</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  faq: () => `
    <section class="faq-page page-transition">
      <div class="faq-container">
        <div class="page-heading-wrap">
          <h1 class="page-heading">FAQ</h1>
        </div>
        <p class="page-desc">Everything you need to know.</p>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              <span>How do I purchase a resource?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>Browse our catalog, select the product, and complete checkout. Instant delivery.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              <span>Is it safe to use?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>All products are tested and come with built-in security features.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              <span>What payment methods are accepted?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>PayPal, credit/debit cards, and cryptocurrency. All transactions are encrypted.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              <span>Is there a refund policy?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>7-day refund policy. Contact support if a product doesn't work as described.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              <span>Do I get updates after purchase?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>Free lifetime updates. New features and fixes are pushed automatically.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  support: () => `
    <section class="support-page page-transition">
      <div class="support-container">
        <div class="page-heading-wrap">
          <h1 class="page-heading">Support</h1>
        </div>
        <p class="page-desc">We're here 24/7.</p>
        <div class="support-grid">
          <div class="support-option">
            <div class="support-option-icon">💬</div>
            <h3>Discord</h3>
            <p>Join our community for instant support and updates.</p>
            <a href="#" class="btn btn--discord btn--sm">Join</a>
          </div>
          <div class="support-option">
            <div class="support-option-icon">📧</div>
            <h3>Email</h3>
            <p>Send a message. We respond within 24 hours.</p>
            <a href="#" class="btn btn--outline btn--sm">Send</a>
          </div>
          <div class="support-option">
            <div class="support-option-icon">📋</div>
            <h3>Tickets</h3>
            <p>Open a ticket for technical issues.</p>
            <a href="#" class="btn btn--outline btn--sm">Open</a>
          </div>
        </div>
      </div>
    </section>
  `,

  login: () => {
    const session = getLoggedIn();
    if (session) {
      return `
        <section class="login-page page-transition">
          <div class="login-container dashboard-container">
            <div class="dashboard-card">
              <div class="dashboard-header">
                <h1>Welcome, <span class="dashboard-username">${session.username}</span></h1>
                <p>Member since 2026</p>
              </div>
              
              <div id="admin-panel-container"></div>

              <div class="dashboard-section">
                <h2>Active Cheetos</h2>
                <div id="license-list" class="license-list">
                  <!-- Licenses injected here -->
                  <div class="license-item placeholder">
                    <p>No active subscriptions.</p>
                  </div>
                </div>
              </div>

              <div class="dashboard-section">
                <h2>Redeem License</h2>
                <form id="redeem-form" class="redeem-form">
                  <div class="form-group">
                    <input type="text" id="license-key" placeholder="Enter License Key (e.g. KEY-123)" required />
                  </div>
                  <button type="submit" class="btn btn--mint btn--full">Redeem</button>
                  <div id="redeem-message"></div>
                </form>
              </div>

              <button class="btn btn--outline btn--full" id="logout-btn">Logout</button>
            </div>
          </div>
        </section>
      `;
    }
    return `
      <section class="login-page page-transition">
        <div class="login-container">
          <div class="login-card">
            <div class="login-header">
              <span class="login-icon">🔐</span>
              <h1>Login</h1>
              <p>Access your purchases and dashboard.</p>
            </div>
            <div id="login-message"></div>
            <form class="login-form" id="login-form">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="you@example.com" required />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="••••••••" required />
              </div>
              <button type="submit" class="btn btn--primary btn--full">Log In</button>
              <p class="login-footer-text">
                Don't have an account? <a href="#register" class="link-accent">Create one</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    `;
  },

  register: () => {
    const session = getLoggedIn();
    if (session) {
      return `
        <section class="login-page page-transition">
          <div class="login-container dashboard-container">
            <div class="dashboard-card">
              <div class="dashboard-header">
                <h1>Welcome, <span class="dashboard-username">${session.username}</span></h1>
                <p>Member since 2026</p>
              </div>
              
              <div id="admin-panel-container"></div>

              <div class="dashboard-section">
                <h2>Active Cheetos</h2>
                <div id="license-list" class="license-list">
                  <!-- Licenses injected here -->
                  <div class="license-item placeholder">
                    <p>No active subscriptions.</p>
                  </div>
                </div>
              </div>

              <div class="dashboard-section">
                <h2>Redeem License</h2>
                <form id="redeem-form" class="redeem-form">
                  <div class="form-group">
                    <input type="text" id="license-key" placeholder="Enter License Key (e.g. KEY-123)" required />
                  </div>
                  <button type="submit" class="btn btn--mint btn--full">Redeem</button>
                  <div id="redeem-message"></div>
                </form>
              </div>

              <button class="btn btn--outline btn--full" id="logout-btn">Logout</button>
            </div>
          </div>
        </section>
      `;
    }
    return `
      <section class="login-page page-transition">
        <div class="login-container">
          <div class="login-card">
            <div class="login-header">
              <span class="login-icon">✨</span>
              <h1>Create Account</h1>
              <p>Join TestoShoop and get access to premium resources.</p>
            </div>
            <div id="register-message"></div>
            <form class="login-form" id="register-form">
              <div class="form-group">
                <label for="reg-username">Username</label>
                <input type="text" id="reg-username" placeholder="YourName" required minlength="3" />
              </div>
              <div class="form-group">
                <label for="reg-email">Email</label>
                <input type="email" id="reg-email" placeholder="you@example.com" required />
              </div>
              <div class="form-group">
                <label for="reg-password">Password</label>
                <input type="password" id="reg-password" placeholder="••••••••" required minlength="6" />
              </div>
              <div class="form-group">
                <label for="reg-confirm">Confirm Password</label>
                <input type="password" id="reg-confirm" placeholder="••••••••" required />
              </div>
              <button type="submit" class="btn btn--primary btn--full">Create Account</button>
              <p class="login-footer-text">
                Already have an account? <a href="#login" class="link-accent">Log in</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    `;
  },
};

// --- Router ---
function navigate() {
  const hash = window.location.hash.slice(1) || 'home';
  const pageFn = pages[hash];

  if (!pageFn) {
    app.innerHTML = pages.home();
  } else {
    app.innerHTML = typeof pageFn === 'function' ? pageFn() : pageFn;
  }

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === hash) {
      link.classList.add('active');
    }
  });

  // Update nav login text based on session
  const session = getLoggedIn();
  const loginLink = document.querySelector('.nav-link--login');
  if (loginLink) {
    if (session) {
      loginLink.textContent = session.username;
      loginLink.href = '#login';
    } else {
      loginLink.textContent = 'Login';
      loginLink.href = '#login';
    }
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
  afterRender(hash);
}

function afterRender(page) {
  requestAnimationFrame(() => {
    document.querySelectorAll('.page-transition').forEach(el => el.classList.add('visible'));
  });

  if (page === 'home') { initStatCounters(); initScrollRevealCards(); }
  if (page === 'faq') { initFAQ(); }
  if (page === 'login') { initLoginForm(); initLogoutBtn(); initDashboard(); }
  if (page === 'register') { initRegisterForm(); initLogoutBtn(); initDashboard(); }
  if (page === 'catalog') { initCatalogCards(); }
  if (page === 'support') { initSupportCards(); }
}

// --- Init ---
// --- Init ---
document.addEventListener('DOMContentLoaded', async () => {
  initNavbar();
  initMobileMenu();
  initBackgroundLines();
  await checkAuth();
  navigate();
});

window.addEventListener('hashchange', navigate);

// --- Navbar scroll ---
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// --- Mobile Menu ---
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
}

// --- FAQ ---
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// --- Stat Counters ---
function initStatCounters() {
  const stats = document.querySelectorAll('.stat-number');
  if (!stats.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounters(stats); observer.disconnect(); }
    });
  }, { threshold: 0.5 });
  stats.forEach(stat => observer.observe(stat));
}

function animateCounters(stats) {
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();
    function update(t) {
      const p = Math.min((t - startTime) / duration, 1);
      stat.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target).toLocaleString();
      if (p < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// --- Card animations ---
function initScrollRevealCards() {
  const cards = document.querySelectorAll('.feature-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
  });
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; } });
  }, { threshold: 0.05 });
  cards.forEach(c => obs.observe(c));
}

function initCatalogCards() {
  staggerIn('.product-card');
}
function initSupportCards() {
  staggerIn('.support-option');
}
function staggerIn(selector) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }));
  });
}

// --- Login Form (API) ---
function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const msgEl = document.getElementById('login-message');

    try {
      const user = await login(email, password);
      showMessage(msgEl, `Welcome back, ${user.username}!`, 'success');
      setTimeout(() => {
        window.location.hash = '#home';
      }, 800);
    } catch (err) {
      showMessage(msgEl, err.message, 'error');
    }
  });
}

// --- Register Form (API) ---
function initRegisterForm() {
  const form = document.getElementById('register-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    const msgEl = document.getElementById('register-message');

    if (password !== confirm) return showMessage(msgEl, 'Passwords don\'t match.', 'error');
    if (password.length < 6) return showMessage(msgEl, 'Password must be at least 6 characters.', 'error');
    if (username.length < 3) return showMessage(msgEl, 'Username must be at least 3 characters.', 'error');

    try {
      await register(username, email, password);
      showMessage(msgEl, 'Account created! Redirecting...', 'success');
      setTimeout(() => {
        window.location.hash = '#home';
      }, 1000);
    } catch (err) {
      showMessage(msgEl, err.message, 'error');
    }
  });
}


// --- Dashboard & Licenses ---
async function initDashboard() {
  const list = document.getElementById('license-list');
  // Use global currentUser
  if (!list || !currentUser) return;

  const licenses = currentUser.licenses || [];

  if (licenses.length > 0) {
    list.innerHTML = licenses.map(lic => `
      <div class="license-item">
        <div class="license-info">
          <span class="license-name">${lic.name}</span>
          <span class="license-duration badge-${lic.type}">${lic.duration}</span>
        </div>
        <div class="license-expiry">Expires: ${lic.expiry}</div>
      </div>
    `).join('');
  } else {
    list.innerHTML = `<div class="license-item placeholder"><p>No active subscriptions.</p></div>`;
  }

  // --- ADMIN PANEL (kotzlasu) ---
  const adminPanelContainer = document.getElementById('admin-panel-container');
  if (currentUser.username === 'kotzlasu') {
    if (adminPanelContainer) {
      adminPanelContainer.innerHTML = `
        <div class="dashboard-section admin-section">
          <h2>⚡ Admin: Generate Keys</h2>
          <form id="admin-gen-form" class="admin-form">
            <div class="form-row">
              <select id="gen-product">
                <option value="FiveM Cheeto">FiveM Cheeto</option>
                <option value="Minecraft Cheeto">Minecraft Cheeto</option>
              </select>
              <select id="gen-duration">
                <option value="1 Day">1 Day</option>
                <option value="1 Week">1 Week</option>
                <option value="1 Month">1 Month</option>
                <option value="1 Year">1 Year</option>
                <option value="Lifetime">Lifetime</option>
              </select>
            </div>
            <button type="submit" class="btn btn--primary btn--full">Generate Key</button>
          </form>
          <div id="admin-output" class="admin-output"></div>
        </div>

        <div class="dashboard-section admin-section">
          <h2>👥 Manage Users</h2>
          <div id="admin-user-list">Loading users...</div>
        </div>
      `;

      // Render Users & Licenses
      const userListEl = document.getElementById('admin-user-list');
      if (userListEl) {
        try {
          const users = await apiCall('/admin/users');
          const userHTML = users.map((u) => {
            if (!u.licenses || u.licenses.length === 0) return '';
            return `
              <div class="admin-user-item">
                <h3>${u.username}</h3>
                <div class="admin-user-licenses">
                  ${u.licenses.map((lic, lIndex) => `
                    <div class="admin-license-row">
                      <span>${lic.name} (${lic.duration}) <small>Exp: ${lic.expiry}</small></span>
                      <button class="btn btn--secondary btn--sm remove-license-btn" data-username="${u.username}" data-index="${lIndex}">Remove</button>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('') || '<p>No active licenses found for any user.</p>';

          userListEl.innerHTML = userHTML;

          userListEl.addEventListener('click', async (e) => {
            if (e.target.classList.contains('remove-license-btn')) {
              const username = e.target.dataset.username;
              const index = e.target.dataset.index;

              if (confirm(`Remove license from ${username}?`)) {
                try {
                  await apiCall(`/admin/users/${username}/licenses/${index}`, 'DELETE');
                  initDashboard(); // Refresh UI
                } catch (err) {
                  alert(err.message);
                }
              }
            }
          });
        } catch (err) {
          userListEl.innerHTML = `<p class="error">Failed to load users: ${err.message}</p>`;
        }
      }

      document.getElementById('admin-gen-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const product = document.getElementById('gen-product').value;
        const duration = document.getElementById('gen-duration').value;

        let days = 0;
        if (duration === '1 Day') days = 1;
        if (duration === '1 Week') days = 7;
        if (duration === '1 Month') days = 30;
        if (duration === '1 Year') days = 365;
        if (duration === 'Lifetime') days = 9999;

        const type = product.includes('Minecraft') ? 'gold' : 'blue';

        try {
          const res = await apiCall('/admin/keys/generate', 'POST', { product, duration, days, type });
          const key = res.key;

          const out = document.getElementById('admin-output');
          out.innerHTML = `
              <div class="generated-key-box">
                <p>Generated Key:</p>
                <code onclick="navigator.clipboard.writeText('${key}')">${key}</code>
                <span class="copy-hint">(Click to copy)</span>
              </div>
            `;
        } catch (err) {
          alert('Failed to generate key: ' + err.message);
        }
      });
    }
  }

  // Redeem form
  const form = document.getElementById('redeem-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const keyInput = document.getElementById('license-key');
      const key = keyInput.value.trim();
      const msgEl = document.getElementById('redeem-message');

      try {
        const res = await apiCall('/license/redeem', 'POST', { key });
        // Refresh user data
        currentUser = await apiCall('/user/me');

        showMessage(msgEl, `Redeemed: ${res.license.name} (${res.license.duration})!`, 'success');
        keyInput.value = '';
        setTimeout(() => initDashboard(), 1000);
      } catch (err) {
        showMessage(msgEl, err.message, 'error');
      }
    });
  }
}

// --- Logout ---
function initLogoutBtn() {
  const btn = document.getElementById('logout-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    logout();
  });
}

// --- Auth message display ---
function showMessage(el, text, type) {
  if (!el) return;
  el.className = `auth-message ${type}`;
  el.textContent = text;
}

// --- Background Lines ---
function initBackgroundLines() {
  const canvas = document.getElementById('bg-lines');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width, h = canvas.height;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 14]);

    const pts = [];
    for (let i = 0; i < 10; i++) pts.push({ x: Math.random() * w, y: Math.random() * h });

    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(
        (a.x + b.x) / 2 + (Math.random() - 0.5) * 80,
        (a.y + b.y) / 2 + (Math.random() - 0.5) * 80,
        b.x, b.y
      );
      ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    pts.forEach((p, i) => {
      if (i % 2 === 0) { ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill(); }
    });
  }

  resize();
  window.addEventListener('resize', resize);
}

