/* Renders everything in content/site.config.js (window.SITE) into the page.
   A null or empty value hides its part. Loaded as a classic script after the config and before the
   kit's modules, so the page is complete before system.js and motion.js run. */
(function () {
  'use strict';
  var SITE = window.SITE || {};
  var doc = document;
  var $ = function (sel, root) { return (root || doc).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); };
  var has = function (v) { return v !== null && v !== undefined && v !== ''; };
  var el = function (tag, cls, text) {
    var n = doc.createElement(tag);
    if (cls) n.className = cls;
    if (has(text)) n.textContent = text;
    return n;
  };
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Join links: every [data-join] opens the official form in a new tab. */
  $$('[data-join]').forEach(function (a) {
    if (!has(SITE.joinUrl)) { a.hidden = true; return; }
    a.href = SITE.joinUrl;
    a.target = '_blank';
    a.rel = 'noopener';
    var label = (a.getAttribute('data-join-label') || a.textContent || '').trim();
    if (!a.hasAttribute('aria-label')) a.setAttribute('aria-label', label + ' (opens the join form in a new tab)');
  });

  /* The site URL, typed once with a caret that blinks a few times and rests. */
  var urlBox = $('[data-site-url]');
  if (urlBox && has(SITE.siteUrl)) {
    var url = String(SITE.siteUrl);
    var typed = $('.hero__url-typed', urlBox);
    $('[data-site-url-text]', urlBox).textContent = url;
    urlBox.hidden = false;
    if (reduced) {
      typed.textContent = url;
      urlBox.classList.add('is-done');
    } else {
      var i = 0;
      var step = function () {
        i += 1;
        typed.textContent = url.slice(0, i);
        if (i < url.length) setTimeout(step, 55 + Math.random() * 45);
        else urlBox.classList.add('is-done');
      };
      setTimeout(step, 1100);
    }
  }

  /* Next meetup: the note while the date is null, a countdown once it is set. */
  var m = SITE.nextMeetup;
  var card = $('[data-meetup]');
  if (card && m && (has(m.date) || has(m.note) || has(m.title))) {
    card.hidden = false;
    var titleEl = $('[data-meetup-title]', card);
    var metaEl = $('[data-meetup-meta]', card);
    var countEl = $('[data-meetup-count]', card);
    var when = has(m.date) ? new Date(m.date) : null;
    if (when && isNaN(when.getTime())) when = null;
    if (has(m.title)) titleEl.textContent = m.title; else titleEl.hidden = true;
    if (when) {
      var part = function (o) { return when.toLocaleString('en-GB', Object.assign({ timeZone: 'Asia/Kolkata' }, o)); };
      var dateText = part({ weekday: 'short' }) + ' ' + part({ day: 'numeric' }) + ' ' + part({ month: 'short' }) + ' ' + part({ year: 'numeric' }) + ', ' +
        part({ hour: 'numeric', minute: '2-digit', hour12: true }).replace(/\s?([ap])\.?m\.?/i, ' $1m').toLowerCase() + ' IST';
      metaEl.textContent = dateText + (has(m.venue) ? ' · ' + m.venue : '');
      var plural = function (n, w) { return n + ' ' + w + (n === 1 ? '' : 's'); };
      var tick = function () {
        var ms = when.getTime() - Date.now();
        if (ms <= 0) { countEl.textContent = 'Happening now or already over. Watch this space for the next one.'; return false; }
        var mins = Math.floor(ms / 60000);
        var d = Math.floor(mins / 1440), h = Math.floor((mins % 1440) / 60), mm = mins % 60;
        countEl.textContent = 'Starts in ' + (d ? plural(d, 'day') + ', ' : '') + plural(h, 'hour') + ', ' + plural(mm, 'minute');
        return true;
      };
      if (tick()) {
        // once a minute, aligned to the minute
        setTimeout(function () { if (tick()) setInterval(tick, 60000); }, 60000 - (Date.now() % 60000) + 50);
      }
      card.classList.add('has-date');
    } else {
      metaEl.textContent = has(m.note) ? m.note : '';
      if (has(m.venue)) metaEl.textContent += (metaEl.textContent ? ' · ' : '') + m.venue;
      countEl.hidden = true;
    }
  }

  /* Perks */
  var perks = $('[data-perks]');
  if (perks) {
    var list = Array.isArray(SITE.perks) ? SITE.perks.filter(Boolean) : [];
    if (!list.length) { var ps = perks.closest('section'); if (ps) ps.hidden = true; }
    list.forEach(function (p) {
      var row = el('div', 'perk');
      row.appendChild(el('dt', 'perk__title', p.title));
      if (has(p.body)) row.appendChild(el('dd', 'perk__body', p.body));
      perks.appendChild(row);
    });
  }

  /* A small line drawing for an update card, picked by its tag (anything else gets a note) */
  var DRAWINGS = {
    meetup: ['an envelope with an invite in it', '<path class="d-fill" d="M52 30 L110 26 L114 70 L56 74 Z"/><path class="d-line" d="M30 48 L130 44 L134 112 L34 116 Z M30 48 L82 86 L130 44"/>'],
    workshop: ['a terminal window with a prompt', '<path class="d-fill" d="M28 26 L132 26 L132 42 L28 42 Z"/><path class="d-line" d="M28 26 L132 26 L132 108 L28 108 Z M48 62 L62 72 L48 82 M72 86 L96 86"/>'],
    hackathon: ['a trophy cup', '<path class="d-fill" d="M54 24 L106 24 C106 62 96 78 80 80 C64 78 54 62 54 24 Z"/><path class="d-line" d="M54 32 C36 32 34 58 56 62 M106 32 C124 32 126 58 104 62 M80 80 L80 100 M60 110 C70 102 90 102 100 110"/>'],
    note: ['a note pinned to a board', '<path class="d-fill" d="M46 30 L114 26 L118 104 L50 108 Z"/><path class="d-line" d="M62 54 L100 52 M62 70 L100 68 M62 86 L88 85"/><circle class="d-line" cx="80" cy="26" r="5"/>']
  };
  var drawing = function (tag) {
    var d = DRAWINGS[String(tag || '').toLowerCase()] || DRAWINGS.note;
    var wrap = el('div', 'update__panel');
    wrap.setAttribute('role', 'img');
    wrap.setAttribute('aria-label', 'Line drawing: ' + d[0]);
    wrap.innerHTML = '<svg viewBox="0 0 160 130" fill="none" aria-hidden="true">' + d[1] + '</svg>';
    return wrap;
  };

  /* Updates: up to three cards */
  var updates = $('[data-updates]');
  if (updates) {
    var ul = (Array.isArray(SITE.updates) ? SITE.updates.filter(Boolean) : []).slice(0, 3);
    if (!ul.length) { var us = updates.closest('section'); if (us) us.hidden = true; }
    updates.style.setProperty('--n', ul.length);
    ul.forEach(function (u) {
      var art = el('article', 'card update span-4' + (has(u.url) ? '' : ' m-nolift'));
      if (has(u.tag)) art.appendChild(el('p', 'update__tag', u.tag));
      var h = el('h3', 'update__title');
      if (has(u.url)) {
        var a = el('a', 'update__link', u.title);
        a.href = u.url;
        if (/^https?:/.test(u.url)) { a.target = '_blank'; a.rel = 'noopener'; }
        h.appendChild(a);
      } else h.textContent = u.title;
      art.appendChild(h);
      if (has(u.body)) art.appendChild(el('p', 'update__body', u.body));
      art.appendChild(drawing(u.tag));
      updates.appendChild(art);
    });
  }

  /* Projects, or the empty state */
  var projects = $('[data-projects]');
  var empty = $('[data-projects-empty]');
  if (projects) {
    var pl = Array.isArray(SITE.projects) ? SITE.projects.filter(Boolean) : [];
    if (pl.length) {
      projects.hidden = false;
      pl.forEach(function (p) {
        var art = el('article', 'card project span-4' + (has(p.url) ? '' : ' m-nolift'));
        var h = el('h3', 'project__title');
        if (has(p.url)) {
          var a = el('a', 'update__link', p.title);
          a.href = p.url; a.target = '_blank'; a.rel = 'noopener';
          h.appendChild(a);
        } else h.textContent = p.title;
        art.appendChild(h);
        if (has(p.by)) art.appendChild(el('p', 'project__by', p.by));
        if (has(p.body)) art.appendChild(el('p', 'project__body', p.body));
        projects.appendChild(art);
      });
    } else {
      projects.hidden = true;
      if (empty) empty.hidden = false;
    }
  }
  $$('[data-submit-row]').forEach(function (row) {
    if (has(SITE.submitProjectUrl)) {
      var a = el('a', 'btn btn--secondary', 'Submit your project');
      a.href = SITE.submitProjectUrl; a.target = '_blank'; a.rel = 'noopener';
      a.setAttribute('aria-label', 'Submit your project (opens a form in a new tab)');
      row.appendChild(a); row.hidden = false;
    } else row.hidden = true;
  });

  /* Team: name and role; initials until a photo is set */
  var team = $('[data-team]');
  if (team) {
    var tl = Array.isArray(SITE.team) ? SITE.team.filter(Boolean) : [];
    if (!tl.length) { var ts = team.closest('section'); if (ts) ts.hidden = true; }
    tl.forEach(function (t) {
      var li = el('li', 'member');
      var media = el('div', 'member__photo');
      if (has(t.photo)) {
        var img = el('img');
        img.src = t.photo; img.alt = 'Photo of ' + t.name; img.loading = 'lazy'; img.width = 400; img.height = 500;
        media.appendChild(img);
      } else {
        // photo slot: replace with a real photo by setting team[].photo in the config
        var initials = String(t.name || '').split(/\s+/).filter(Boolean).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
        media.setAttribute('role', 'img');
        media.setAttribute('aria-label', t.name + ': photo to come, initials shown');
        var span = el('span', 'member__initials', initials);
        span.setAttribute('aria-hidden', 'true');
        media.appendChild(span);
      }
      li.appendChild(media);
      var name = el('p', 'member__name');
      if (has(t.linkedin)) {
        var a = el('a', 'update__link', t.name);
        a.href = t.linkedin; a.target = '_blank'; a.rel = 'noopener';
        a.setAttribute('aria-label', t.name + ' on LinkedIn (opens in a new tab)');
        name.appendChild(a);
      } else name.textContent = t.name;
      li.appendChild(name);
      if (has(t.role)) li.appendChild(el('p', 'member__role', t.role));
      team.appendChild(li);
    });
  }

  /* Socials: hidden while null */
  var social = SITE.social || {};
  $$('[data-social]').forEach(function (li) {
    var url = social[li.getAttribute('data-social')];
    if (has(url)) {
      var a = el('a', null, li.getAttribute('data-label'));
      a.href = url; a.target = '_blank'; a.rel = 'noopener';
      li.appendChild(a); li.hidden = false;
    } else li.hidden = true;
  });

  /* FAQ accordion: one answer open at a time; buttons, so Enter and Space work; arrows, Home and End move between questions */
  $$('[data-accordion]').forEach(function (acc) {
    var qs = $$('.qa__q', acc);
    var setOpen = function (btn, open) {
      btn.setAttribute('aria-expanded', String(open));
      var panel = doc.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.hidden = !open;
      btn.closest('.qa__item').classList.toggle('is-open', open);
    };
    qs.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') !== 'true';
        qs.forEach(function (b) { if (b !== btn) setOpen(b, false); });
        setOpen(btn, open);
      });
      btn.addEventListener('keydown', function (e) {
        var to = null;
        if (e.key === 'ArrowDown') to = qs[(i + 1) % qs.length];
        else if (e.key === 'ArrowUp') to = qs[(i - 1 + qs.length) % qs.length];
        else if (e.key === 'Home') to = qs[0];
        else if (e.key === 'End') to = qs[qs.length - 1];
        if (to) { e.preventDefault(); to.focus(); }
      });
    });
    if (qs[0]) setOpen(qs[0], true);
  });

  /* Sections fade up once as they come into view (brief). Only with script and without reduced motion
     (html.js-fade); a section already on screen at load is never hidden. */
  if (!reduced) {
    var targets = $$('main > section:not(.hero) > .wrap, footer.closing > .wrap');
    var pending = [];
    var vh0 = window.innerHeight;
    targets.forEach(function (t) { if (t.getBoundingClientRect().top >= vh0) { t.classList.add('fade-up'); pending.push(t); } });
    if (pending.length) {
      doc.documentElement.classList.add('js-fade');
      var ticking = false;
      var done = false;
      var check = function () {
        ticking = false;
        if (done) return;
        var vh = window.innerHeight;
        pending = pending.filter(function (t) {
          if (t.getBoundingClientRect().top < vh * 0.9) { t.classList.add('is-in'); return false; }
          return true;
        });
        if (!pending.length) done = true;
      };
      var onScroll = function () { if (!ticking && !done) { ticking = true; requestAnimationFrame(check); } };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      window.addEventListener('hashchange', onScroll);
      check();
    }
  }
})();
