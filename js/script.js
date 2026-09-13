/* ============================================================
   Pytom.dev - Interaksi
   - Sidebar mobile (buka/tutup, overlay, Escape)
   - Highlight link navigasi aktif saat scroll
   ============================================================ */

(function () {
  'use strict';

  /* Aktifkan mode JS (untuk animasi reveal) */
  document.documentElement.classList.add('js');

  /* === Sidebar Mobile === */
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const sidebarClose = document.getElementById('sidebarClose');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    menuToggle.innerHTML = '<i class="bi bi-x-lg"></i>';
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener('click', function () {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });

    overlay.addEventListener('click', closeSidebar);

    if (sidebarClose) {
      sidebarClose.addEventListener('click', closeSidebar);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeSidebar();
      }
    });

    // Tutup sidebar saat salah satu link diklik
    sidebar.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeSidebar);
    });
  }

  /* === Highlight link navigasi aktif saat scroll === */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav-links a, .sidebar-nav a')
  );

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = '#' + entry.target.id;
            navLinks.forEach(function (link) {
              const isMatch = link.getAttribute('href') === id;
              link.classList.toggle('active', isMatch);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* === Fade-in saat scroll (sekali saja, ringan untuk mobile) === */
  const revealEls = Array.prototype.slice.call(
    document.querySelectorAll('.reveal')
  );

  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
      );

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  }
})();