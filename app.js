/* All Teknologies — small progressive enhancements. No dependencies. */
(() => {
  'use strict';

  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header gains a blurred bar once the page scrolls */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('stuck', window.scrollY > 12);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
  }

  /* Reveal sections as they enter the viewport */
  const targets = document.querySelectorAll('.reveal');
  const showAll = () => targets.forEach((el) => el.classList.add('in'));

  if (calm || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    targets.forEach((el) => io.observe(el));

    /* Backstop: nothing stays invisible if the observer never fires */
    setTimeout(showAll, 3000);
  }

  /* Cursor-tracked spotlight on cards */
  if (!calm && matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  /* Stagger the mock dashboard bars so they grow in sequence */
  document.querySelectorAll('.bars i').forEach((bar, i) => {
    bar.style.animationDelay = `${360 + i * 85}ms`;
  });
})();
