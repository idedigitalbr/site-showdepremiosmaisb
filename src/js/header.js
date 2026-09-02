/**
 * ==========================================================================
 * HEADER & TOPBAR STANDALONE — JAVASCRIPT MODULAR
 * Gerencia: Toggle Mobile, Fechamento Automático, ScrollSpy e Ícones Lucide.
 * ==========================================================================
 */

(function () {
  'use strict';

  function initHeader() {
    var toggle = document.getElementById('mobile-toggle');
    var navLeft = document.getElementById('nav-left');
    var navRight = document.getElementById('nav-right');
    var header = document.querySelector('.site-header');
    var headerInner = toggle ? toggle.closest('.header-inner') : null;

    /* ── 1. Toggle Menu Mobile ── */
    if (toggle && navLeft && navRight) {
      function openMobileMenu() {
        navLeft.classList.add('open');
        navRight.classList.add('open');
        if (headerInner) headerInner.classList.add('menu-open');
        toggle.setAttribute('aria-expanded', 'true');
      }

      function closeMobileMenu() {
        navLeft.classList.remove('open');
        navRight.classList.remove('open');
        if (headerInner) headerInner.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }

      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = navLeft.classList.contains('open');
        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });

      // Fechar menu ao clicar em qualquer link de navegação ou botão CTA
      var allNavLinks = document.querySelectorAll('.nav-link, .btn-cta-red, .btn-cta-gold, .nav-link-cta-clube, .header-logo');
      allNavLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          closeMobileMenu();
        });
      });

      // Fechar menu ao clicar fora do header
      document.addEventListener('click', function (e) {
        if (header && !header.contains(e.target)) {
          closeMobileMenu();
        }
      });

      // Fechar menu ao pressionar a tecla ESC
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closeMobileMenu();
        }
      });
    }

    /* ── 2. Efeito Smart Scroll Fluido (Oculta ao Descer / Revela ao Subir) ── */
    if (header) {
      var lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
      var scrollThreshold = 6; // Limiar de sensibilidade para evitar microtrepidações
      var hideOffset = 80; // Distância do topo para começar a esconder
      var isTicking = false;

      function updateHeader() {
        var currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Trata rolagem negativa ou topo da página (iOS bounce / pull-down)
        if (currentScrollY <= 0) {
          header.classList.remove('header-hidden');
          header.classList.remove('scrolled');
          lastScrollY = 0;
          isTicking = false;
          return;
        }

        // Aplica efeito visual de header flutuante / escuro quando scrolado
        if (currentScrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }

        // Se o menu mobile estiver aberto, mantém o header sempre visível
        var isMobileMenuOpen = navLeft && navLeft.classList.contains('open');
        if (isMobileMenuOpen) {
          header.classList.remove('header-hidden');
          lastScrollY = currentScrollY;
          isTicking = false;
          return;
        }

        var diff = currentScrollY - lastScrollY;

        // Rolando para BAIXO: esconde suavemente o header após passar do topo
        if (diff > scrollThreshold && currentScrollY > hideOffset) {
          header.classList.add('header-hidden');
        }
        // Rolando para CIMA: reaparece instantaneamente e de forma fluida
        else if (diff < -scrollThreshold) {
          header.classList.remove('header-hidden');
        }

        lastScrollY = currentScrollY;
        isTicking = false;
      }

      var handleScroll = function () {
        if (!isTicking) {
          window.requestAnimationFrame(updateHeader);
          isTicking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Executa no carregamento inicial
    }

    /* ── 3. ScrollSpy Automático (Marca o link ativo conforme o scroll) ── */
    var sections = document.querySelectorAll('section[id], div[id].scroll-target');
    var navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              var href = link.getAttribute('href');
              if (href === '#' + id) {
                link.classList.add('active');
              } else if (href.startsWith('#')) {
                link.classList.remove('active');
              }
            });
          }
        });
      }, {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      });

      sections.forEach(function (sec) {
        observer.observe(sec);
      });
    }

    /* ── 4. Inicializador dos Ícones Lucide ── */
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  // Inicializa quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();
