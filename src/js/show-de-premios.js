/**
 * Show de Prêmios Mais B — Interações da Campanha (2026)
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. FAQ Accordion
  var faqItems = document.querySelectorAll('.sp-faq-item');
  faqItems.forEach(function (item) {
    var header = item.querySelector('.sp-faq-header');
    if (header) {
      header.addEventListener('click', function () {
        var isActive = item.classList.contains('faq-active');
        
        faqItems.forEach(function (other) {
          if (other !== item) {
            other.classList.remove('faq-active');
          }
        });

        if (isActive) {
          item.classList.remove('faq-active');
        } else {
          item.classList.add('faq-active');
        }
      });
    }
  });

  // 2. Cronômetro Regressivo do Sorteio Oficial (Sincronizado Globalmente no Horário de Brasília UTC-3)
  // Campanha Show de Prêmios 2026.02 — Sorteio em 29/01/2027 às 18:00h
  var OFFICIAL_DRAW_DATE = new Date('2027-01-29T18:00:00-03:00').getTime();
  var globalTargetDate = OFFICIAL_DRAW_DATE;

  function updateCountdown() {
    var now = Date.now();
    var difference = globalTargetDate - now;

    if (difference <= 0) {
      difference = 0;
    }

    var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);

    var pad = function (n) { return String(n).padStart(2, '0'); };

    var elDays = document.getElementById('cd-days');
    var elHours = document.getElementById('cd-hours');
    var elMinutes = document.getElementById('cd-minutes');
    var elSeconds = document.getElementById('cd-seconds');

    if (elDays) elDays.textContent = pad(days);
    if (elHours) elHours.textContent = pad(hours);
    if (elMinutes) elMinutes.textContent = pad(minutes);
    if (elSeconds) elSeconds.textContent = pad(seconds);
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 3. Modal Clube + Fidelidade
  var clubeModal = document.getElementById('clube-modal');
  var openModalBtns = document.querySelectorAll('#open-clube-modal, [data-open-clube-modal]');
  var closeModalBtns = document.querySelectorAll('#close-clube-modal, .clube-modal-close, [data-close-clube-modal]');

  var scrollPos = 0;

  function openClubeModal() {
    if (clubeModal) {
      scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + scrollPos + 'px';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
      clubeModal.scrollTop = 0;
      clubeModal.classList.add('active');
      clubeModal.setAttribute('aria-hidden', 'false');
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }
  }

  function closeClubeModal() {
    if (clubeModal) {
      clubeModal.classList.remove('active');
      clubeModal.setAttribute('aria-hidden', 'true');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
      window.scrollTo(0, scrollPos);
    }
  }

  openModalBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openClubeModal();
    });
  });

  closeModalBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      closeClubeModal();
    });
  });

  // Fechar ao clicar no backdrop (fora do conteúdo)
  if (clubeModal) {
    clubeModal.addEventListener('click', function (e) {
      if (e.target === clubeModal) {
        closeClubeModal();
      }
    });
  }

  // Fechar com tecla ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && clubeModal && clubeModal.classList.contains('active')) {
      closeClubeModal();
    }
  });

  // 4. FAQ Accordion dentro do Modal Clube+
  function toggleClubeModalFaq(e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
    }
    var item = document.getElementById('modal-faq-item') || document.querySelector('.clube-modal-faq .faq-item');
    var btn = document.getElementById('modal-faq-toggle') || document.querySelector('.clube-modal-faq .faq-q');
    if (item) {
      var isOpen = item.classList.contains('open');
      if (isOpen) {
        item.classList.remove('open');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      }
    }
  }
  window.toggleClubeModalFaq = toggleClubeModalFaq;

  var modalFaqBtn = document.getElementById('modal-faq-toggle');
  if (modalFaqBtn) {
    modalFaqBtn.addEventListener('click', toggleClubeModalFaq, true);
  }
});

// Suporte global antes do DOMContentLoaded
window.toggleClubeModalFaq = function (e) {
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
    if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
  }
  var item = document.getElementById('modal-faq-item') || document.querySelector('.clube-modal-faq .faq-item');
  var btn = document.getElementById('modal-faq-toggle') || document.querySelector('.clube-modal-faq .faq-q');
  if (item) {
    var isOpen = item.classList.contains('open');
    if (isOpen) {
      item.classList.remove('open');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('open');
      if (btn) btn.setAttribute('aria-expanded', 'true');
    }
  }
};


