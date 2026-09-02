/* ==========================================================================
   SUPERMERCADO MAIS B — MAIN JS (v11)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Hero Swiper ── */
  if (typeof Swiper !== 'undefined' && document.querySelector('.hero-swiper')) {
    new Swiper('.hero-swiper', {
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: '.hero-swiper .swiper-pagination', clickable: true },
      navigation: { nextEl: '.hero-swiper .swiper-button-next', prevEl: '.hero-swiper .swiper-button-prev' },
      effect: 'fade',
      fadeEffect: { crossFade: true }
    });
  }

  /* ── Depoimentos Premium Carousel & Video Modal ── */
  function initTestimonialsCarousel() {
    const track      = document.getElementById('dep-track') || document.querySelector('.testimonials-carousel-track');
    const cards      = track ? track.querySelectorAll('.dep-video-card') : [];
    const prevBtn    = document.getElementById('dep-prev-btn') || document.querySelector('.testimonials-prev-btn');
    const nextBtn    = document.getElementById('dep-next-btn') || document.querySelector('.testimonials-next-btn');
    const dotsWrap   = document.getElementById('dep-dots')    || document.querySelector('.testimonials-dots');
    const wrapper    = document.querySelector('.testimonials-carousel-wrapper');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    const GAP = 24;

    function getVisible() {
      if (window.innerWidth > 768) return 2;
      return 1;
    }

    function maxIdx() {
      return Math.max(0, cards.length - getVisible());
    }

    function goTo(idx) {
      currentIndex = Math.max(0, Math.min(idx, maxIdx()));
      const cardW = cards[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * (cardW + GAP)}px)`;

      cards.forEach((card, i) => {
        card.classList.toggle('active-slide', i === currentIndex);
      });

      if (prevBtn) prevBtn.disabled = (currentIndex === 0);
      if (nextBtn) nextBtn.disabled = (currentIndex === maxIdx());

      if (dotsWrap) {
        dotsWrap.querySelectorAll('.testimonial-dot').forEach((d, i) => {
          d.classList.toggle('active', i === currentIndex);
        });
      }
    }

    function updateDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      const count = maxIdx() + 1;
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('span');
        dot.className = `testimonial-dot ${i === currentIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    const fsModal = document.getElementById('dep-fullscreen-modal');
    const fsVideo = document.getElementById('dep-fs-video');

    function openCellularFullscreen(origVideo) {
      if (!fsModal || !fsVideo) return;
      origVideo.pause();
      
      const currentSrc = origVideo.currentSrc || origVideo.src || (origVideo.querySelector('source') && origVideo.querySelector('source').src);
      fsVideo.src = currentSrc;
      fsVideo.currentTime = origVideo.currentTime;
      fsVideo.muted = origVideo.muted;
      
      const cardContainer = origVideo.closest('.dep-video-card');
      if (cardContainer) {
        const origTag = cardContainer.querySelector('.dep-card-tag');
        const fsTag = fsModal.querySelector('#dep-fs-tag');
        if (origTag && fsTag) {
          fsTag.innerHTML = origTag.innerHTML;
          const durationEl = fsTag.querySelector('.dep-tag-duration');
          if (durationEl) durationEl.style.display = 'none';
        }
      }
      
      const playPauseBtn = fsModal.querySelector('.dep-play-pause-btn');
      if (playPauseBtn) {
        const iconPlay = playPauseBtn.querySelector('.icon-play');
        const iconPause = playPauseBtn.querySelector('.icon-pause');
        if (origVideo.paused) {
          if (iconPlay) iconPlay.style.display = 'block';
          if (iconPause) iconPause.style.display = 'none';
        } else {
          if (iconPlay) iconPlay.style.display = 'none';
          if (iconPause) iconPause.style.display = 'block';
        }
      }

      const volumeBtn = fsModal.querySelector('.dep-volume-btn');
      if (volumeBtn) {
        const iconVolOn = volumeBtn.querySelector('.icon-volume-on');
        const iconVolOff = volumeBtn.querySelector('.icon-volume-off');
        if (origVideo.muted) {
          if (iconVolOn) iconVolOn.style.display = 'none';
          if (iconVolOff) iconVolOff.style.display = 'block';
        } else {
          if (iconVolOn) iconVolOn.style.display = 'block';
          if (iconVolOff) iconVolOff.style.display = 'none';
        }
      }
      
      const volumeSlider = fsModal.querySelector('.dep-volume-slider');
      if (volumeSlider) {
        volumeSlider.value = origVideo.muted ? 0 : origVideo.volume;
      }

      fsModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      fsVideo.play().catch(() => {});
      fsModal.activeOriginalVideo = origVideo;
    }

    function closeCellularFullscreen() {
      if (!fsModal || !fsVideo) return;
      fsVideo.pause();
      fsModal.classList.remove('active');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      const origVideo = fsModal.activeOriginalVideo;
      if (origVideo) {
        origVideo.currentTime = fsVideo.currentTime;
        origVideo.muted = fsVideo.muted;
        origVideo.volume = fsVideo.volume;
        
        const cardContainer = origVideo.closest('.dep-video-card');
        if (cardContainer) {
          const origVolumeBtn = cardContainer.querySelector('.dep-volume-btn');
          const origVolumeSlider = cardContainer.querySelector('.dep-volume-slider');
          if (origVolumeBtn) {
            const iconVolOn = origVolumeBtn.querySelector('.icon-volume-on');
            const iconVolOff = origVolumeBtn.querySelector('.icon-volume-off');
            if (fsVideo.muted) {
              if (iconVolOn) iconVolOn.style.display = 'none';
              if (iconVolOff) iconVolOff.style.display = 'block';
            } else {
              if (iconVolOn) iconVolOn.style.display = 'block';
              if (iconVolOff) iconVolOff.style.display = 'none';
            }
          }
          if (origVolumeSlider) {
            origVolumeSlider.value = fsVideo.muted ? 0 : fsVideo.volume;
          }
        }
        
        origVideo.play().catch(() => {});
      }
    }

    if (fsModal && fsVideo) {
      const closeBtn = fsModal.querySelector('.dep-fs-close-btn');
      const backdrop = fsModal.querySelector('.dep-fs-backdrop');
      if (closeBtn) closeBtn.addEventListener('click', closeCellularFullscreen);
      if (backdrop) backdrop.addEventListener('click', closeCellularFullscreen);
      
      const phoneFrame = fsModal.querySelector('.dep-fs-phone-frame');
      
      fsVideo.addEventListener('play', () => {
        if (phoneFrame) phoneFrame.classList.add('playing');
      });
      
      fsVideo.addEventListener('pause', () => {
        if (phoneFrame) {
          phoneFrame.classList.remove('playing');
          phoneFrame.classList.remove('touch-active');
        }
      });
      
      fsVideo.addEventListener('ended', () => {
        if (phoneFrame) {
          phoneFrame.classList.remove('playing');
          phoneFrame.classList.remove('touch-active');
        }
      });
      
      const triggerFsPlay = (e) => {
        e.stopPropagation();
        if (fsVideo.paused) {
          fsVideo.play().catch(() => {});
        } else {
          fsVideo.pause();
        }
      };

      if (phoneFrame) {
        phoneFrame.addEventListener('click', (e) => {
          if (phoneFrame.classList.contains('playing') && e.pointerType === 'touch') {
            e.stopPropagation();
            e.preventDefault();
            if (!phoneFrame.classList.contains('touch-active')) {
              phoneFrame.classList.add('touch-active');
              clearTimeout(phoneFrame.touchTimeout);
              phoneFrame.touchTimeout = setTimeout(() => {
                phoneFrame.classList.remove('touch-active');
              }, 3000);
            } else {
              phoneFrame.classList.remove('touch-active');
              triggerFsPlay(e);
            }
          } else if (e.target === fsVideo) {
            triggerFsPlay(e);
          }
        });
      }
      
      setupCustomControls(fsModal, fsVideo);
    }

    function setupCustomControls(container, video) {
      const controls = container.querySelector('.dep-custom-controls');
      if (!controls) return;

      controls.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      const playPauseBtn = controls.querySelector('.dep-play-pause-btn');
      const rewindBtn    = controls.querySelector('.dep-rewind-btn');
      const forwardBtn   = controls.querySelector('.dep-forward-btn');
      const volumeBtn    = controls.querySelector('.dep-volume-btn');
      const volumeSlider = controls.querySelector('.dep-volume-slider');
      const fullscreenBtn = controls.querySelector('.dep-fullscreen-btn');
      const timeline     = controls.querySelector('.dep-controls-timeline-wrapper');
      const progress     = controls.querySelector('.dep-controls-timeline-progress');
      const timeText     = controls.querySelector('.dep-ctrl-time');

      if (!playPauseBtn) return;

      const iconPlay = playPauseBtn.querySelector('.icon-play');
      const iconPause = playPauseBtn.querySelector('.icon-pause');

      playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });

      if (rewindBtn) {
        rewindBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          video.currentTime = Math.max(0, video.currentTime - 10);
        });
      }

      if (forwardBtn) {
        forwardBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
        });
      }

      if (volumeBtn) {
        const iconVolOn = volumeBtn.querySelector('.icon-volume-on');
        const iconVolOff = volumeBtn.querySelector('.icon-volume-off');
        volumeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          video.muted = !video.muted;
          if (video.muted) {
            if (iconVolOn) iconVolOn.style.display = 'none';
            if (iconVolOff) iconVolOff.style.display = 'block';
            if (volumeSlider) volumeSlider.value = 0;
          } else {
            if (iconVolOn) iconVolOn.style.display = 'block';
            if (iconVolOff) iconVolOff.style.display = 'none';
            if (volumeSlider) volumeSlider.value = video.volume || 1;
          }
        });
      }

      if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
          e.stopPropagation();
          const val = parseFloat(e.target.value);
          video.volume = val;
          if (val === 0) {
            video.muted = true;
          } else {
            video.muted = false;
          }
          if (volumeBtn) {
            const iconVolOn = volumeBtn.querySelector('.icon-volume-on');
            const iconVolOff = volumeBtn.querySelector('.icon-volume-off');
            if (video.muted) {
              if (iconVolOn) iconVolOn.style.display = 'none';
              if (iconVolOff) iconVolOff.style.display = 'block';
            } else {
              if (iconVolOn) iconVolOn.style.display = 'block';
              if (iconVolOff) iconVolOff.style.display = 'none';
            }
          }
        });
      }

      if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openCellularFullscreen(video);
        });
      }

      function formatTime(secs) {
        if (isNaN(secs)) return '00:00';
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = Math.floor(secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
      }

      video.addEventListener('timeupdate', () => {
        if (video.duration) {
          const pct = (video.currentTime / video.duration) * 100;
          if (progress) progress.style.width = `${pct}%`;
          if (timeText) {
            timeText.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
          }
        }
      });

      if (timeline) {
        timeline.addEventListener('click', (e) => {
          e.stopPropagation();
          const rect = timeline.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const width = rect.width;
          if (video.duration) {
            video.currentTime = (clickX / width) * video.duration;
          }
        });
      }

      video.addEventListener('play', () => {
        if (iconPlay) iconPlay.style.display = 'none';
        if (iconPause) iconPause.style.display = 'block';
      });
      video.addEventListener('pause', () => {
        if (iconPlay) iconPlay.style.display = 'block';
        if (iconPause) iconPause.style.display = 'none';
      });
    }

    cards.forEach(card => {
      const video   = card.querySelector('.dep-video');
      const playBtn = card.querySelector('.dep-play-btn');

      if (!video) return;

      setupCustomControls(card, video);

      video.addEventListener('play', () => {
        cards.forEach(c => {
          if (c !== card) {
            const v = c.querySelector('.dep-video');
            if (v) v.pause();
          }
        });
        card.classList.add('playing');
      });

      video.addEventListener('pause', () => {
        card.classList.remove('playing');
        card.classList.remove('touch-active');
      });

      video.addEventListener('ended', () => {
        card.classList.remove('playing');
        card.classList.remove('touch-active');
        card.removeAttribute('data-started');
        video.currentTime = 0;
      });

      function triggerPlay(e) {
        e.stopPropagation();
        if (video.paused) {
          if (!card.hasAttribute('data-started')) {
            video.currentTime = 0;
            card.setAttribute('data-started', 'true');
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }

      if (playBtn) playBtn.addEventListener('click', triggerPlay);
      
      card.addEventListener('click', function(e) {
        if (card.classList.contains('playing') && e.pointerType === 'touch') {
          e.stopPropagation();
          e.preventDefault();
          if (!card.classList.contains('touch-active')) {
            card.classList.add('touch-active');
            clearTimeout(card.touchTimeout);
            card.touchTimeout = setTimeout(() => {
              card.classList.remove('touch-active');
            }, 3000);
          } else {
            card.classList.remove('touch-active');
            triggerPlay(e);
          }
        } else {
          triggerPlay(e);
        }
      });
    });

    if (wrapper) {
      let startX = 0;
      wrapper.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
      wrapper.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) goTo(currentIndex + (dx < 0 ? 1 : -1));
      }, { passive: true });

      wrapper.setAttribute('tabindex', '0');
      wrapper.setAttribute('role', 'region');
      wrapper.setAttribute('aria-label', 'Depoimentos de clientes');
      wrapper.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(currentIndex - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex + 1); }
      });
    }

    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    window.addEventListener('resize', debounce(() => {
      updateDots();
      goTo(currentIndex);
    }, 150));

    updateDots();
    setTimeout(() => goTo(0), 100);
  }

  initTestimonialsCarousel();

  /* ── Banners Promocionais Swiper ── */
  if (typeof Swiper !== 'undefined' && document.querySelector('.banners-swiper')) {
    new Swiper('.banners-swiper', {
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: { el: '.banners-swiper .swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.banners-swiper .swiper-button-next',
        prevEl: '.banners-swiper .swiper-button-prev',
      },
      breakpoints: {
        768: { slidesPerView: 1, spaceBetween: 24 }
      }
    });
  }

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
      });

      // Toggle current
      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ── Header e Topbar são gerenciados modularmente em src/js/header.js ── */
});

