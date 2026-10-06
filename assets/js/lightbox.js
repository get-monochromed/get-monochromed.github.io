/* Fullscreen image viewer.
 *
 * Any image in a post body (`data-full` comes from the render-image hook) opens
 * fullscreen at the source file's own resolution. How you zoom:
 *
 *   trackpad pinch  the browser turns a two-finger pinch into a wheel event with
 *                   ctrlKey set, so this handler catches it — no library, no slider
 *   touchscreen     two-finger pinch, zooming about the midpoint of the fingers
 *   mouse / touch    single click (mouse) or double-tap (touch) toggles between fit
 *                   and one fixed step in, anchored where you pointed; again undoes it
 *   drag            pans once zoomed (one finger on touch)
 *   close           esc, the × button, or a click on the backdrop — never a click on
 *                   the image itself, which is the zoom toggle
 *
 * Everything is a CSS transform on the overlay's own <img>, so the page behind
 * never moves and the layout is untouched.
 */
(() => {
  // --- knobs -----------------------------------------------------------------
  // Fixed zoom applied by the click / double-tap, as a multiple of the fit scale.
  const ZOOM_STEP = 2.5;
  // Ceiling when the picture already fits the screen at its own size (a small
  // screenshot has room to grow); otherwise the ceiling is 1:1 source pixels, so
  // zooming can never show mushier pixels than the original file has.
  const MAX_WHEN_IT_FITS = 4;
  // Pointer travel, in px, above which a press counts as a pan instead of a tap.
  const TAP_SLOP = 8;
  const DOUBLE_TAP_MS = 300;
  // Trackpad pinch / ctrl+wheel sensitivity. Pinch events arrive ~60/s, each a few
  // px of deltay, so a gentle per-event factor compounds into a smooth zoom; the
  // clamp keeps one notch of a real mouse wheel from jumping.
  const WHEEL_K = 0.01;
  const WHEEL_MIN = 0.8;
  const WHEEL_MAX = 1.25;
  // ---------------------------------------------------------------------------

  const overlay = document.createElement("div");
  overlay.className = "lb";
  overlay.hidden = true;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Image viewer — press escape or click outside to close");
  overlay.innerHTML =
    '<button class="lb-close" type="button" aria-label="Close image viewer">&times;</button>' +
    '<img class="lb-img" alt="" decoding="async" draggable="false">' +
    '<p class="lb-hint">pinch or double-tap to zoom &middot; esc to close</p>';
  document.body.appendChild(overlay);

  const img = overlay.querySelector(".lb-img");
  const hint = overlay.querySelector(".lb-hint");
  const closeBtn = overlay.querySelector(".lb-close");

  let nw = 0, nh = 0;            // source pixels
  let scale = 1, tx = 0, ty = 0; // transform: translate(tx,ty) scale(scale)
  let fit = 1, max = 1;
  let isOpen = false;

  const pointers = new Map();    // pointerId -> {x,y}
  let pinch = null;              // {d, scale, tx, ty, mx, my} at gesture start
  let pan = null;                // {x,y,tx,ty,moved,type} for the press in flight
  let lastTap = 0;
  let hintTimer = 0;

  const half = () => ({ x: innerWidth / 2, y: innerHeight / 2 });

  function fitScale() {
    // 0.94 leaves a margin so the picture never touches the window edge.
    return Math.min((innerWidth * 0.94) / nw, (innerHeight * 0.94) / nh, 1);
  }

  function limits() {
    fit = fitScale();
    // A picture that already fits the screen at 1:1 is a small screenshot, so it
    // has room to grow; anything larger stops at 1:1 source pixels.
    max = fit >= 1 ? MAX_WHEN_IT_FITS : 1;
  }

  function clamp() {
    // When the picture is bigger than the window its edges stop at the window edge;
    // when it is smaller it stays centred. Either way it cannot be thrown off-screen.
    const limX = Math.max(0, (nw * scale - innerWidth) / 2);
    const limY = Math.max(0, (nh * scale - innerHeight) / 2);
    tx = Math.min(limX, Math.max(-limX, tx));
    ty = Math.min(limY, Math.max(-limY, ty));
  }

  function apply() {
    img.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
    overlay.classList.toggle("is-zoomed", scale > fit * 1.01);
  }

  const clampScale = (s) => Math.min(max, Math.max(fit, s));

  /* Zoom to `next` while keeping the image point under (ux,uy) pinned there. */
  function zoomTo(next, ux, uy) {
    const s = clampScale(next);
    if (s === scale) return;
    const c = half();
    const k = s / scale;
    tx = ux - c.x - k * (ux - c.x - tx);
    ty = uy - c.y - k * (uy - c.y - ty);
    scale = s;
    clamp();
    apply();
  }

  function reset() {
    scale = fit;
    tx = ty = 0;
    apply();
  }

  function animate(on) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    overlay.classList.toggle("is-anim", on);
    if (!on) return;
    const off = () => overlay.classList.remove("is-anim");
    setTimeout(off, 260);
  }

  function toggleZoom(ux, uy) {
    animate(true);
    if (scale > fit * 1.01) reset();
    else zoomTo(fit * ZOOM_STEP, ux, uy);
  }

  /* ------------------------------------------------------------------ opening */
  function open(src, alt, w, h) {
    nw = w;
    nh = h;
    img.style.width = nw + "px";
    img.style.height = nh + "px";
    // Half the element's own size pulls it onto the layer's centre, whatever its
    // size — see the .lb-img rule. The zoom maths assumes the centre sits at the
    // middle of the window.
    img.style.marginLeft = -(nw / 2) + "px";
    img.style.marginTop = -(nh / 2) + "px";
    img.alt = alt;
    img.classList.remove("is-ready");
    overlay.classList.add("is-loading");
    img.onload = img.onerror = () => {
      overlay.classList.remove("is-loading");
      img.classList.add("is-ready");
    };
    img.src = src;

    limits();
    reset();
    pointers.clear();
    pinch = pan = null;
    lastTap = 0;

    overlay.hidden = false;
    isOpen = true;
    document.documentElement.classList.add("lb-open");
    apply();
    closeBtn.focus({ preventScroll: true });

    // The hint is a one-off: it says what the gestures are, then gets out of the way.
    hint.classList.add("is-visible");
    clearTimeout(hintTimer);
    hintTimer = setTimeout(() => hint.classList.remove("is-visible"), 2800);
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    overlay.hidden = true;
    overlay.classList.remove("is-zoomed", "is-loading", "is-panning", "is-anim");
    img.removeAttribute("src"); // drops an in-flight download of a multi-MB webp
    document.documentElement.classList.remove("lb-open");
    clearTimeout(hintTimer);
    hint.classList.remove("is-visible");
  }

  /* ------------------------------------------------------------------ triggers */
  document.addEventListener("click", (e) => {
    if (isOpen) return;
    const thumb = e.target.closest(".prose img[data-full]");
    if (!thumb) return;
    e.preventDefault();
    open(thumb.dataset.full, thumb.alt || "", +thumb.dataset.fullW, +thumb.dataset.fullH);
  });

  document.addEventListener("keydown", (e) => {
    if (isOpen && e.key === "Escape") {
      e.preventDefault();
      close();
    }
  });

  addEventListener("resize", () => {
    if (!isOpen) return;
    const wasAtFit = scale <= fit * 1.01;
    limits();
    if (wasAtFit) reset();
    else { scale = clampScale(scale); clamp(); apply(); }
  });

  /* ------------------------------------------------------------------- gestures */
  overlay.addEventListener("pointerdown", (e) => {
    if (e.target === closeBtn) return;
    overlay.setPointerCapture?.(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 2) {
      // A second finger turns the press into a pinch; any pan in flight is void.
      pan = null;
      const [a, b] = [...pointers.values()];
      pinch = {
        d: Math.hypot(a.x - b.x, a.y - b.y),
        mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2,
        scale, tx, ty,
      };
      overlay.classList.remove("is-anim");
    } else if (pointers.size === 1) {
      // The capture below retargets later pointer events to the overlay, so the
      // element actually pressed has to be remembered here.
      pan = { x: e.clientX, y: e.clientY, tx, ty, moved: 0, type: e.pointerType, hit: e.target };
      if (scale > fit * 1.01) overlay.classList.add("is-panning");
    }
  });

  overlay.addEventListener("pointermove", (e) => {
    const p = pointers.get(e.pointerId);
    if (!p) return;
    p.x = e.clientX;
    p.y = e.clientY;

    if (pinch && pointers.size >= 2) {
      const [a, b] = [...pointers.values()];
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const s = clampScale(pinch.scale * (Math.hypot(a.x - b.x, a.y - b.y) / pinch.d));
      // Pin the image point that was under the fingers' midpoint, and let the
      // midpoint's own travel pan the picture at the same time.
      const c = half();
      const px = (pinch.mx - c.x - pinch.tx) / pinch.scale;
      const py = (pinch.my - c.y - pinch.ty) / pinch.scale;
      scale = s;
      tx = mx - c.x - s * px;
      ty = my - c.y - s * py;
      clamp();
      apply();
      return;
    }

    if (pan) {
      const dx = e.clientX - pan.x, dy = e.clientY - pan.y;
      pan.moved = Math.max(pan.moved, Math.hypot(dx, dy));
      if (scale > fit * 1.01) {
        tx = pan.tx + dx;
        ty = pan.ty + dy;
        clamp();
        apply();
      }
    }
  });

  function endPointer(e) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinch = null;
    if (pointers.size) return;

    const p = pan;
    pan = null;
    overlay.classList.remove("is-panning");
    // A press that dragged was a pan, and a press the browser cancelled is nothing.
    // After a pinch `pan` is already null, so trailing fingers never register as taps.
    if (!p || p.moved > TAP_SLOP || e.type === "pointercancel") return;

    if (p.type === "touch") {
      // Touch: only the double-tap toggles (a single tap on the backdrop closes,
      // which is what a phone user expects of a lightbox).
      if (p.hit === overlay) return close();
      const now = performance.now();
      if (now - lastTap < DOUBLE_TAP_MS) {
        lastTap = 0;
        toggleZoom(e.clientX, e.clientY);
      } else {
        lastTap = now;
      }
      return;
    }

    if (p.hit === img) toggleZoom(e.clientX, e.clientY);
    else if (p.hit === overlay) close();
  }

  overlay.addEventListener("pointerup", endPointer);
  overlay.addEventListener("pointercancel", endPointer);
  closeBtn.addEventListener("click", close);

  overlay.addEventListener("wheel", (e) => {
    e.preventDefault(); // never let the page behind scroll or zoom
    // A bare wheel is not a zoom: on a trackpad it is a two-finger scroll, on a
    // mouse it is the wheel — neither is a pinch. Ctrl+wheel is what every browser
    // synthesises from a trackpad pinch, so that is what zooms.
    if (!e.ctrlKey) return;
    const d = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    const k = Math.min(WHEEL_MAX, Math.max(WHEEL_MIN, Math.exp(-d * WHEEL_K)));
    zoomTo(scale * k, e.clientX, e.clientY);
  }, { passive: false });
})();
