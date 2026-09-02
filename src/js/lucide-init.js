/*
 * Centraliza os ícones funcionais do site na biblioteca Lucide.
 * Marcas (Instagram, Facebook, YouTube, Apple e WhatsApp) e ilustrações
 * decorativas permanecem como vetores próprios por não serem ícones Lucide.
 */
(function initLucideIcons() {
  function replace(selector, name) {
    document.querySelectorAll(selector).forEach((icon) => {
      const replacement = document.createElement('i');
      replacement.dataset.lucide = name;

      const classes = icon.getAttribute('class');
      if (classes) replacement.setAttribute('class', classes);

      ['width', 'height', 'style', 'aria-label', 'aria-hidden'].forEach((attribute) => {
        if (icon.hasAttribute(attribute)) {
          replacement.setAttribute(attribute, icon.getAttribute(attribute));
        }
      });

      icon.replaceWith(replacement);
    });
  }

  function apply() {
    replace('.testimonials-prev-btn svg', 'chevron-left');
    replace('.testimonials-next-btn svg', 'chevron-right');
    replace('.dep-play-btn svg', 'play');
    replace('.dep-play-pause-btn .icon-play', 'play');
    replace('.dep-play-pause-btn .icon-pause', 'pause');
    replace('.dep-rewind-btn svg', 'rewind');
    replace('.dep-forward-btn svg', 'fast-forward');
    replace('.dep-volume-btn .icon-volume-on', 'volume-2');
    replace('.dep-volume-btn .icon-volume-off', 'volume-x');
    replace('.dep-fullscreen-btn svg', 'maximize');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  window.refreshLucideIcons = apply;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }
})();
