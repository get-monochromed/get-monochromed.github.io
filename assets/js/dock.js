(() => {
  document.documentElement.classList.add("js");
  const wrap = document.getElementById("dockWrap");
  const dock = document.getElementById("dock");
  const slider = document.getElementById("dockSlider");
  if (!wrap || !dock || !slider) return;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // How long the pointer must rest on a link before the pill commits to it.
  // Without this, sliding across the dock fires a move per link, and simply
  // passing through the bar starts an animation that mouseleave immediately
  // cancels. Raise it if the bar still feels twitchy, lower it for snappier
  // tracking.
  const HOVER_INTENT = 100;

  const links = [...dock.querySelectorAll("[data-dock]")];
  const active = dock.querySelector(".active") || links[0];

  let swapTimer = 0;
  let intentTimer = 0;
  let frame = 0;
  let pending = null;
  let snapToken = 0;

  const current = () => dock.querySelector(".on-pill") || active;

  function paint(el, instant) {
    if (!el) { slider.style.opacity = "0"; return; }
    // Both rectangles are measured before any style is written. Reading a
    // box after writing one forces a synchronous layout on every hover,
    // which is what made the sliding feel uneven.
    const d = dock.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    slider.style.width = r.width + "px";
    slider.style.transform = `translateX(${r.left - d.left}px)`;
    slider.style.opacity = "1";

    // The pill spends 250ms crossing, so the light label is applied part
    // way through instead of up front.
    clearTimeout(swapTimer);
    if (instant || reduce) {
      links.forEach((l) => l.classList.toggle("on-pill", l === el));
    } else {
      swapTimer = setTimeout(() => {
        links.forEach((l) => l.classList.toggle("on-pill", l === el));
      }, 120);
    }
  }

  // Animated move, coalesced to at most one measure-and-paint per frame.
  function place(el) {
    pending = el;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      paint(pending, false);
      pending = null;
    });
  }

  // Move with no slide at all. Used for the first paint and for re-measuring:
  // .slider sits at left:0 in the markup until JS positions it, so letting it
  // transition from there looked like a second slide (home -> wherever you just
  // clicked) on every page load. The class is removed once the new position has
  // been committed, guarded by a token so overlapping calls cannot re-enable
  // transitions early.
  function snap(el) {
    clearTimeout(intentTimer);
    if (frame) { cancelAnimationFrame(frame); frame = 0; }
    pending = null;
    const token = ++snapToken;
    slider.classList.add("no-anim");
    paint(el, true);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (token === snapToken) slider.classList.remove("no-anim");
    }));
  }

  snap(active);

  // Webfonts change label widths, so re-measure without animating once they land.
  const resync = () => snap(current());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(resync);
  addEventListener("load", resync);
  addEventListener("resize", resync);

  // Fluid preview: the pill follows the pointer once it settles, and returns on
  // leave. The delay is what stops a quick pass-through from starting a slide.
  links.forEach((a) => {
    a.addEventListener("mouseenter", () => {
      clearTimeout(intentTimer);
      intentTimer = setTimeout(() => place(a), HOVER_INTENT);
    });
    // Keyboard focus has no "passing through", so it commits at once.
    a.addEventListener("focus", () => {
      clearTimeout(intentTimer);
      place(a);
    });
  });
  dock.addEventListener("mouseleave", () => {
    clearTimeout(intentTimer);
    place(active);
  });

  // Hide on scroll down, show on scroll up.
  let last = scrollY, lock = false;
  addEventListener("scroll", () => {
    if (lock) return;
    lock = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      if (y > 140 && y > last + 4) wrap.classList.add("hide");
      else if (y < last - 4 || y < 140) wrap.classList.remove("hide");
      last = y;
      lock = false;
    });
  }, { passive: true });

  if (reduce) slider.style.transition = "none";
})();
