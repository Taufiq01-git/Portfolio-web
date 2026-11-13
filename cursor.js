/* Custom cursor for the case-study pages (mouse devices only).
   Same look as the About page: dot + orbiting ring + corner brackets on interactive targets. */
(function () {
  if (!window.matchMedia || !matchMedia('(pointer: fine)').matches || !matchMedia('(hover: hover)').matches) return;
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var css = document.createElement('style');
  css.textContent = 'html[data-cur-on],html[data-cur-on] *{cursor:none!important}';
  document.head.appendChild(css);
  var Z = 2147483000, th = (document.currentScript && document.currentScript.getAttribute('data-theme')) || (/tasmi/.test(location.pathname) ? 'tasmi' : /solide/.test(location.pathname) ? 'solide' : ''), TH = { tasmi: ['#3F7A55', '#9fd3ae'], solide: ['#ea580c', '#fdba74'] }[th] || ['#2563eb', '#cfe0ff'], B = TH[0], L = TH[1];
  function mk(html) { var d = document.createElement('div'); d.setAttribute('aria-hidden', 'true'); d.innerHTML = html; return d.firstChild; }
  var brk = mk('<div style="position:fixed;left:0;top:0;width:0;height:0;z-index:' + (Z - 2) + ';pointer-events:none;opacity:0;color:' + B + ';transform:translate(-200px,-200px);transition:transform .38s cubic-bezier(.2,.8,.2,1),width .38s cubic-bezier(.2,.8,.2,1),height .38s cubic-bezier(.2,.8,.2,1),opacity .25s,color .38s"><span style="position:absolute;left:0;top:0;width:12px;height:12px;border-left:2px solid currentColor;border-top:2px solid currentColor"></span><span style="position:absolute;right:0;top:0;width:12px;height:12px;border-right:2px solid currentColor;border-top:2px solid currentColor"></span><span style="position:absolute;left:0;bottom:0;width:12px;height:12px;border-left:2px solid currentColor;border-bottom:2px solid currentColor"></span><span style="position:absolute;right:0;bottom:0;width:12px;height:12px;border-right:2px solid currentColor;border-bottom:2px solid currentColor"></span></div>');
  var dot = mk('<div style="position:fixed;left:0;top:0;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;background:#fff;box-shadow:0 0 0 1.5px ' + B + ';z-index:' + Z + ';pointer-events:none;opacity:0;will-change:transform"></div>');
  var ring = mk('<div style="position:fixed;left:0;top:0;width:28px;height:28px;margin:-14px 0 0 -14px;border-radius:50%;border:1.5px solid currentColor;color:' + B + ';z-index:' + (Z - 1) + ';pointer-events:none;opacity:0;will-change:transform;transition:opacity .25s,width .35s cubic-bezier(.34,1.56,.64,1),height .35s cubic-bezier(.34,1.56,.64,1),margin .35s cubic-bezier(.34,1.56,.64,1)"><div style="position:absolute;inset:-1.5px"><span style="position:absolute;left:50%;top:-3.5px;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:currentColor"></span></div><div style="position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:currentColor;opacity:0;transition:opacity .25s,transform .18s cubic-bezier(.34,1.56,.64,1)"></div></div>');
  [brk, ring, dot].forEach(function (e) { document.body.appendChild(e); });
  var orb = ring.firstChild, inn = ring.lastChild;
  var TG = 'a,button,summary,[role="button"],[data-tgt],[onclick]';
  var mx = -9999, my = -9999, raf = 0, down = false, tg = null, dark = false, lastEl = null, lastDark = false;
  var cache = new WeakMap();
  function lum(c) { var m = c.match(/[\d.]+/g); if (!m) return 1; if (m.length > 3 && +m[3] < 0.05) return -1; return (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) / 255; }
  function isDark(el) {
    for (var n = el, i = 0; n && n.nodeType === 1 && i < 30; n = n.parentElement, i++) {
      var c = cache.get(n); if (c !== undefined) return c;
      var l = lum(getComputedStyle(n).backgroundColor);
      if (l >= 0) { var r = l < 0.4; cache.set(n, r); return r; }
    }
    return false;
  }
  function pick() {
    if (mx < -999) { tg = null; return; }
    var el = document.elementFromPoint(mx, my);
    if (el !== lastEl) { lastEl = el; tg = el && el.closest && el.closest(TG); lastDark = el ? isDark(el) : false; }
    dark = lastDark;
  }
  function frame(now) {
    raf = 0; if (document.hidden) return;
    var on = mx > -999, col = dark ? L : B;
    dot.style.opacity = on ? 1 : 0; dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)'; dot.style.boxShadow = '0 0 0 1.5px ' + col;
    ring.style.opacity = on ? 1 : 0; ring.style.color = col; ring.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
    orb.style.transform = rm ? 'none' : 'rotate(' + (now * 0.2) + 'deg)';
    inn.style.opacity = tg ? (down ? 0.7 : 0.38) : 0; inn.style.transform = 'scale(' + (down ? 0.5 : 1) + ')';
    if (on && tg && !tg.hasAttribute('data-nobrk') && !tg.closest('[data-nvb],[data-brkpad]')) {
      var r = tg.getBoundingClientRect(), pd = 6, W = innerWidth, H = innerHeight, bw = r.width + pd * 2, bh = r.height + pd * 2;
      if (r.width < W * 0.9 && r.height < H * 0.6 && r.width > 0) {
        var ob = Math.min(tg.__br !== undefined ? tg.__br : (tg.__br = parseFloat(getComputedStyle(tg).borderTopLeftRadius) || 0), r.height / 2, r.width / 2), rad = Math.min(ob + pd, bw / 2, bh / 2), SZ = Math.min(Math.max(12, rad + 4), bw, bh);
        if (brk.__s !== rad + '|' + SZ) {
          brk.__s = rad + '|' + SZ;
          var RR = ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius'];
          for (var k = 0; k < 4; k++) { var e = brk.children[k]; e.style.transition = 'width .38s cubic-bezier(.2,.8,.2,1),height .38s cubic-bezier(.2,.8,.2,1),border-radius .38s cubic-bezier(.2,.8,.2,1)'; e.style.boxSizing = 'border-box'; e.style.width = e.style.height = SZ + 'px'; for (var q = 0; q < 4; q++) e.style[RR[q]] = q === k ? rad + 'px' : '0'; }
        }
        brk.style.color = col; brk.style.transform = 'translate(' + (r.left - pd) + 'px,' + (r.top - pd) + 'px)'; brk.style.width = bw + 'px'; brk.style.height = bh + 'px'; brk.style.opacity = 1;
      } else brk.style.opacity = 0;
    } else brk.style.opacity = 0;
    if (on) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }
  document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; dot.style.transform = ring.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)'; pick(); kick(); }, { passive: true });
  addEventListener('scroll', function () { lastEl = null; pick(); kick(); }, { passive: true });
  document.addEventListener('mousedown', function () { down = true; kick(); });
  document.addEventListener('mouseup', function () { down = false; });
  document.documentElement.addEventListener('mouseleave', function () { mx = my = -9999; tg = null; lastEl = null; kick(); });
  document.documentElement.setAttribute('data-cur-on', '1');
})();
