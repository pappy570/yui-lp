/* ============================================
   子どもとおとなの訪問看護ステーション結 - JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHamburger();
  initSmoothScroll();
  initFadeIn();
  initTabs();
  initFAQ();
  initContactForm();
});

/* --- Header scroll effect --- */
function initHeader() {
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Hamburger menu --- */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  document.body.appendChild(overlay);

  const toggle = () => {
    const isOpen = nav.classList.toggle('is-open');
    hamburger.classList.toggle('is-active');
    overlay.classList.toggle('is-active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const close = () => {
    nav.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    overlay.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggle);
  overlay.addEventListener('click', close);

  // Close on nav link click
  nav.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('click', close);
  });
}

/* --- Smooth scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      const headerHeight = document.getElementById('header').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* --- Fade-in on scroll --- */
function initFadeIn() {
  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation for siblings
          const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
          let delay = 0;
          siblings.forEach((sibling, i) => {
            if (sibling === entry.target) {
              delay = i * 100;
            }
          });

          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, Math.min(delay, 300));

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* --- Service tabs --- */
function initTabs() {
  const tabs = document.querySelectorAll('.services__tab');
  const panels = document.querySelectorAll('.services__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('services__tab--active'));
      tab.classList.add('services__tab--active');

      panels.forEach(panel => {
        panel.classList.remove('services__panel--active');
        if (panel.id === `tab-${target}`) {
          panel.classList.add('services__panel--active');

          // Re-trigger fade-in for newly visible cards
          panel.querySelectorAll('.fade-in').forEach(el => {
            el.classList.remove('is-visible');
            requestAnimationFrame(() => {
              el.classList.add('is-visible');
            });
          });
        }
      });
    });
  });
}

/* --- FAQ accordion --- */
function initFAQ() {
  const items = document.querySelectorAll('.faq__item');

  items.forEach(item => {
    const question = item.querySelector('.faq__question');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all
      items.forEach(i => i.classList.remove('is-open'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });
}

/* --- Contact form (frontend only) --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      alert('必須項目をご入力ください。');
      return;
    }

    // Show success message
    alert('お問い合わせありがとうございます。\n内容を確認の上、担当者よりご連絡いたします。');
    form.reset();
  });
}
