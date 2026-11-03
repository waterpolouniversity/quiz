/* Waterpolo University – Black Friday add-ons for the Podia page /black-friday
   Loaded from Podia's "Website tracking code". Edit this file (not Podia) to change things. */
(function () {
  if (!/^\/black-friday\/?$/.test(location.pathname)) return;

  var CHECKOUT = 'https://www.waterpolouniversity.com/01a0b6b9-f9c9-7dcd-a649-3ec57c71401a/buy?coupon=BF75';
  var OPEN = Date.parse('2026-11-15T00:00:00-05:00');
  var END  = Date.parse('2026-11-30T23:59:59-05:00');
  var WIDGET = 'https://waterpolouniversity.github.io/quiz/bf/';

  function findLeaf(text) {
    var els = document.querySelectorAll('body *');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.children.length === 0 && el.textContent.trim() === text) return el;
    }
    return null;
  }

  // 1) Live countdown under the "Black Friday countdown" title
  function placeCountdown() {
    if (document.getElementById('wpu-bf-countdown')) return true;
    var anchor = findLeaf('Black Friday countdown');
    if (!anchor) return false;
    var f = document.createElement('iframe');
    f.id = 'wpu-bf-countdown';
    f.src = WIDGET;
    f.title = 'Black Friday countdown';
    f.setAttribute('scrolling', 'no');
    f.style.cssText = 'display:block;width:100%;max-width:1100px;height:560px;border:0;margin:24px auto 0;background:transparent';
    var box = anchor.parentElement;
    box.parentElement.insertBefore(f, box.nextSibling);
    window.addEventListener('message', function (e) {
      if (e.data && e.data.wpuCountdownHeight) f.style.height = (e.data.wpuCountdownHeight + 4) + 'px';
    });
    return true;
  }

  // 2) Locked "Join for $75/year" button right under the hero image
  function placeHeroButton() {
    if (document.getElementById('wpu-bf-herobtn')) return true;
    var anchor = findLeaf('Black Friday: $75 a Year');
    if (!anchor) return false;
    var css = document.createElement('style');
    css.textContent =
      '#wpu-bf-herobtn{text-align:center;margin:28px auto 8px;font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}' +
      '#wpu-bf-herobtn a{display:inline-block;background:#ffc83d;color:#070c33;font-weight:800;font-size:18px;text-decoration:none;padding:16px 34px;border-radius:999px;box-shadow:0 10px 30px rgba(255,200,61,.35);transition:transform .15s,filter .3s,opacity .3s}' +
      '#wpu-bf-herobtn a:hover{transform:translateY(-2px) scale(1.03)}' +
      '#wpu-bf-herobtn.locked a{filter:blur(2px);opacity:.55;pointer-events:none;cursor:not-allowed}' +
      '#wpu-bf-herobtn .msg{display:none;margin-top:10px;font-size:14px;font-weight:700;color:#ffc83d}' +
      '#wpu-bf-herobtn.locked .msg{display:block}';
    document.head.appendChild(css);
    var wrap = document.createElement('div');
    wrap.id = 'wpu-bf-herobtn';
    wrap.innerHTML = '<a target="_top">Join for $75/year</a><div class="msg">🔒 Unlocks Sunday, Nov 15</div>';
    // climb to the text block that sits next to the hero image, insert right before it
    var node = anchor;
    while (node.parentElement && node.parentElement !== document.body && !node.parentElement.querySelector('img')) node = node.parentElement;
    node.parentElement.insertBefore(wrap, node);
    var a = wrap.querySelector('a');
    function update() {
      var now = Date.now();
      if (now < OPEN) { wrap.className = 'locked'; a.removeAttribute('href'); wrap.style.display = ''; }
      else if (now < END) { wrap.className = ''; a.href = CHECKOUT; wrap.style.display = ''; }
      else { wrap.style.display = 'none'; }
    }
    update(); setInterval(update, 1000);
    return true;
  }

  function run(n) {
    var a = placeCountdown(), b = placeHeroButton();
    if ((!a || !b) && n > 0) setTimeout(function () { run(n - 1); }, 300);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { run(20); });
  else run(20);
})();
