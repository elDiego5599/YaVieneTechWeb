document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  open('https://wa.me/573004438626?text=' + encodeURIComponent(`Hola, soy ${f.get('n')}. ${f.get('m')}`), '_blank', 'noopener');
});
document.documentElement.classList.add('js'); // las tarjetas del bento solo se ocultan cuando el script corre (no-JS = visibles)
// El menú móvil se cierra al elegir una sección
document.querySelectorAll('.mnav-x a').forEach(a => a.addEventListener('click', () => a.closest('.mnav').removeAttribute('open')));
// El nav sube con la página hasta tocar el techo y ahí se queda quieto
{
  const nav = document.querySelector('nav');
  const pon = () => {
    const t = parseFloat(getComputedStyle(nav).getPropertyValue('--t'));
    nav.style.setProperty('--p', Math.max(0, Math.min(scrollY / t, 1)));
    nav.classList.toggle('pin', scrollY >= t);
  };
  addEventListener('resize', pon);
  addEventListener('scroll', pon, { passive: true }); pon();
}
// Ida y vuelta: un problema/idea/propuesta entra a la pantalla y sale la solución que construimos.
const pairs = [
  { k: 'Problema', pi: 'bus', p: 'Los buses nunca llegan a tiempo', pd: 'La gente espera sin saber nada',
    si: 'pin', s: 'App de rastreo en vivo', sd: 'Ya Viene: el bus en el mapa, minuto a minuto' },
  { k: 'Idea', pi: 'bag', p: 'Quiero vender por internet', pd: 'Hoy todo es por WhatsApp',
    si: 'card', s: 'Tienda online', sd: 'Catálogo, pagos y pedidos en un solo lugar' },
  { k: 'Problema', pi: 'sheet', p: 'El inventario vive en Excel', pd: 'Nadie sabe cuánto queda',
    si: 'box', s: 'Sistema de inventario', sd: 'Stock al día y alertas antes de quedarte sin nada' },
  { k: 'Propuesta', pi: 'folder', p: 'Automatizar los reportes', pd: 'Hoy toman toda la tarde',
    si: 'bolt', s: 'Automatización', sd: 'Los reportes se arman solos, sin errores' },
];
// Más entradas y salidas para que la corriente nunca se repita seguido.
const extraIn = [['Idea', 'calendar', 'Reservas online'], ['Problema', 'box', 'Pedidos perdidos'], ['Propuesta', 'users', 'Portal de clientes'],
  ['Problema', 'receipt', 'Facturas hechas a mano'], ['Idea', 'phone', 'Una app para mi negocio'], ['Propuesta', 'chart', 'Panel de métricas']];
const extraOut = [['calendar', 'Reservas 24/7'], ['check', 'Pedidos en orden'], ['globe', 'Portal en vivo'],
  ['bolt', 'Facturación automática'], ['rocket', 'App publicada'], ['chart', 'Métricas en tiempo real']];
// Íconos de línea propios (24×24), en el color del texto: nada de emojis.
const ICONS = {
  bus: 'M6 17V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v11M6 11h12M6 17h12M8 20v-3M16 20v-3M9 14h.01M15 14h.01',
  pin: 'M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  bag: 'M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 0 1 6 0v2',
  card: 'M3 6h18v12H3zM3 10h18M7 15h4',
  sheet: 'M4 4h16v16H4zM4 9h16M4 14h16M10 4v16',
  box: 'M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10',
  folder: 'M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6z',
  bolt: 'M13 3L5 13h6l-1 8 8-10h-6l1-8z',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18.5 14a5.5 5.5 0 0 1 3 6',
  receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3zM9 8h6M9 12h6M9 16h3',
  phone: 'M7 3h10v18H7zM11 18h2',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z',
  rocket: 'M12 15l-3-3c1.5-4.5 4.5-8 10-9-1 5.5-4.5 8.5-9 10zM9 12l-4 1-2 3 4 1M12 15l-1 4 3 2 1-4M7 17l-2 2',
};
const C = { bus: '#f59e0b', pin: '#ef4444', bag: '#ec4899', card: '#8b5cf6', sheet: '#10b981', box: '#f97316', folder: '#3b82f6', bolt: '#eab308',
  calendar: '#06b6d4', users: '#6366f1', receipt: '#14b8a6', phone: '#0ea5e9', chart: '#22c55e', check: '#22c55e', globe: '#3b82f6', rocket: '#f43f5e' };
const icon = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${ICONS[n]}"/></svg>`;

const $ = id => document.getElementById(id);
const flow = $('flow');
const wait = ms => new Promise(r => setTimeout(r, ms));
// El hero solo trabaja cuando se ve: fuera de pantalla la corriente y la actividad se detienen
let heroOn = true, despertar = [];
const visible = () => heroOn && !document.hidden;
const turno = () => visible() ? null : new Promise(r => despertar.push(r));
const avisa = () => { if (visible()) { despertar.forEach(r => r()); despertar = []; } };
new IntersectionObserver(([e]) => { heroOn = e.isIntersecting; avisa(); }).observe(document.getElementById('stage'));
document.addEventListener('visibilitychange', avisa);

// Cada tarjeta viaja en 3D: las de entrada van desde el borde izquierdo hacia el punto de fuga
// (el centro de la pantalla) y se esconden detrás de ella; las de salida nacen ahí y se van por la derecha.
function ride({ html, cls = '', lane = 0, out = false, dur = 5200, entra }) {
  if (getComputedStyle(flow).display === 'none') return;
  const el = document.createElement('div');
  el.className = 'chip ' + cls; el.innerHTML = html; flow.append(el);
  const W = flow.clientWidth, H = flow.clientHeight, w = el.offsetWidth, h = el.offsetHeight, side = out ? 1 : -1;
  const far = `translate(-50%, -50%) translate3d(${side * W * .12}px, ${lane * H * .03}px, -600px) rotateY(${-side * 34}deg) rotateZ(${side * lane * 8}deg)`;
  const near = `translate(-50%, -50%) translate3d(${side * (W / 2 + w * .5)}px, ${lane * H * .26}px, 60px) rotateY(${-side * 26}deg) rotateZ(${side * lane * 5}deg)`;
  const fade = [{ opacity: 0, offset: 0 }, { opacity: 1, offset: .14 }, { opacity: 1, offset: 1 }];
  const kf = (out ? [far, near] : [near, far]).map((transform, i) => ({ transform, offset: i }));
  el.animate(kf, { duration: dur, easing: out ? 'cubic-bezier(0,.55,.6,1)' : 'cubic-bezier(.3,0,1,.5)', fill: 'forwards' });
  el.animate(out ? fade.map(f => ({ ...f, offset: 1 - f.offset })).reverse() : fade, { duration: dur, fill: 'forwards' })
    .finished.then(() => el.remove());
  watch(el, out, entra);
}
// Sigue la tarjeta y enciende la luz de portal justo en el punto donde se esconde detrás de la Mac (o donde reaparece)
const screenEl = document.querySelector('.screen');
function watch(el, out, entra) {
  let was = null;
  const step = () => {
    if (!el.isConnected) return;
    const f = flow.getBoundingClientRect(), s = screenEl.getBoundingClientRect(), c = el.getBoundingClientRect();
    const bx = s.width * .035, x = c.left + c.width / 2, y = c.top + c.height / 2;
    const L = s.left - bx, R = s.right + bx, T = s.top - bx, B = s.bottom + bx * 1.5;
    const inside = x > L && x < R && y > T && y < B;
    if (was !== null && inside !== was) {
      if (inside) entra?.();
      return burst(Math.min(Math.max(x, L), R) - f.left, Math.min(Math.max(y, T), B) - f.top);
    }
    was = inside; requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
function burst(x, y) {
  const g = document.createElement('i');
  g.className = 'glow'; flow.prepend(g);
  const at = `translate(${x}px, ${y}px)`;
  g.animate([
    { transform: `${at} scale(.7, .55)`, opacity: 0, easing: 'cubic-bezier(.16,1,.3,1)' },
    { transform: `${at} scale(1, 1)`, opacity: 1, offset: .18, easing: 'cubic-bezier(.45,0,.25,1)' },
    { transform: `${at} scale(1.12, 1.06)`, opacity: 0 },
  ], { duration: 3600, fill: 'forwards' }).finished.then(() => g.remove());
}
const card = (k, e, t) => `<span class="e" style="--c:${C[e]}">${icon(e)}</span><span><small>${k}</small>${t}</span>`;

// La pantalla: la app de tarjeta de Banco Nova se escribe a mano, línea por línea,
// y cada componente que se escribe aparece en el iPhone de la derecha.
const ico = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
const NIEVE = 'M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5M4 10.5l3.7-.6L6.4 6.4M20 13.5l-3.7.6 1.3 3.5M4 13.5l3.7.6-1.3 3.5M20 10.5l-3.7-.6 1.3-3.5';
const fila = (c, b, d, t, sub = '') => `<p><i style="--c:${c};--b:${b}">${ico(d)}</i><span>${t}${sub && `<small>${sub}</small>`}</span>${ico('M9 6l6 6-6 6')}</p>`;
const W = {
  cabecera: `<div class="nv-head"><i>${ico('M19 12H5M12 19l-7-7 7-7')}</i><span><b>Mi tarjeta</b><small>Nova Platinum</small></span><i>${ico('M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01')}</i></div>`,
  tarjeta: `<div class="nv-card"><strong>nova</strong><em>platinum</em><s></s><u>${ico('M8.5 8.5a5 5 0 0 1 0 7M12 6a8.5 8.5 0 0 1 0 12M15.5 3.5a12 12 0 0 1 0 17')}</u>
    <small>•••• 4821</small><span>ANDREA RÍOS</span><b><i></i><i></i></b><div class="nv-hielo">${ico(NIEVE)}Tarjeta congelada</div></div>`,
  acciones: `<div class="nv-acc"><div><i style="--c:#5B2EFF;--b:#ECE6FF">${ico(NIEVE)}</i><span>Congelar</span></div>
    <div><i style="--c:#E0367A;--b:#FFE6F0">${ico('M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6')}</i><span>Ver datos</span></div>
    <div><i style="--c:#E5730B;--b:#FFEFDC">${ico('M5 6h.01M12 6h.01M19 6h.01M5 12h.01M12 12h.01M19 12h.01M12 18h.01').replace('stroke-width="2"', 'stroke-width="3.4"')}</i><span>Ver PIN</span></div></div>`,
  ajustes: `<div class="nv-set"><h5>Ajustes de la tarjeta</h5><div class="nv-list">`
    + fila('#0891B2', '#DDF6FB', 'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5', 'Cambiar PIN')
    + fila('#059669', '#DDF7EC', 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'Límites de gasto', 'Desactiva algunos tipos de compra')
    + fila('#E5730B', '#FFEFDC', 'M3 6h18v12H3zM3 10h18M7 15h4', 'Pedir tarjeta nueva', '¿Perdida, dañada o robada?')
    + fila('#DB2777', '#FFE6F0', 'M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10.2 20a2 2 0 0 0 3.6 0', 'Avisos de compras', 'Te avisamos en cada compra')
    + `</div></div>`,
  tabs: `<div class="nv-tabs"><p class="on"><i>${ico('M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6')}</i>Cuentas</p>
    <p><i>${ico('M6 20V12M12 20V6M18 20v-4')}</i>Gastos</p><p><i>${ico('M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z')}</i>Premios</p>
    <p><i>${ico('M7 20V4M3 8l4-4 4 4M17 4v16M13 16l4 4 4-4')}</i>Pagos</p></div>`,
};
const ws = { side: $('wsSide'), act: $('act'), st: $('wsSt'), app: $('papp'), sk: $('psk') };
// El esqueleto de cada pieza, con las mismas medidas, para que la real nazca justo encima
const br = (w, h, x = '') => `<i class="br" style="width:calc(${w} * var(--u));height:calc(${h} * var(--u));${x}"></i>`;
const u = n => `calc(${n} * var(--u))`;
ws.sk.innerHTML = `<div class="nv-head" data-w="cabecera"><i></i><span>${br(92, 15)}${br(68, 10)}</span><i></i></div>`
  + `<div class="nv-card" data-w="tarjeta">${br(104, 30, `left:${u(22)};top:${u(20)}`)}${br(44, 33, `left:${u(24)};top:${u(92)};border-radius:${u(8)}`)}`
  + `${br(132, 14, `left:${u(22)};bottom:${u(46)}`)}${br(96, 10, `left:${u(22)};bottom:${u(22)}`)}${br(50, 30, `right:${u(22)};bottom:${u(18)}`)}</div>`
  + `<div class="nv-acc" data-w="acciones">${`<div><i></i>${br(62, 11)}</div>`.repeat(3)}</div>`
  + `<div class="nv-set" data-w="ajustes"><h5>${br(156, 15)}</h5><div class="nv-list"><p><i></i><span>${br(104, 13)}</span></p>`
  + `<p><i></i><span>${br(120, 13)}${br(184, 9)}</span></p>`.repeat(3) + `</div></div>`
  + `<div class="nv-tabs" data-w="tabs">${`<p><i></i>${br(42, 8)}</p>`.repeat(4)}</div>`;
const nav = (d, t, x = '') => `<p>${ico(d)}${t}${x}</p>`;
ws.side.innerHTML = `<p class="brand-ws"><svg viewBox="0 0 64 64"><rect x=".75" y=".75" width="62.5" height="62.5" rx="15.5" fill="#fff" stroke="rgba(17,18,20,.12)" stroke-width="1.5"/><g transform="translate(6.5 18.4) scale(.34)" fill="#111214"><circle cx="110" cy="40" r="34"/><rect x="28" y="10" width="47.9" height="12" rx="6" opacity=".4"/><rect x="6" y="34" width="60" height="12" rx="6" opacity=".7"/><rect x="28" y="58" width="47.9" height="12" rx="6" opacity=".4"/></g></svg>Ya Viene Tech<span>${ico('M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14zM20 20l-4-4')}${ico('M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z')}</span></p>`
  + nav('M3 11l9-7 9 7M5 10v10h14V10', 'Inicio') + nav('M3 13l3-8h12l3 8v6H3zM3 13h5l1 2h6l1-2h5', 'Bandeja', '<em>3</em>')
  + nav('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6', 'Mis proyectos')
  + nav('M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9', 'Revisiones')
  + '<small>Clientes</small><p class="on"><b class="nv-ico"></b>Banco Nova</p>'
  + [['#ec4899', 'Tienda online', 'M6 8h12l-1 12H7zM9 8V6.5a3 3 0 0 1 6 0V8'],
     ['#06b6d4', 'Reservas 24/7', 'M5 6h14v14H5zM5 10h14M9 4v4M15 4v4M9.5 15l2 2 3.5-3.5'],
     ['#10b981', 'Inventario', 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9'],
     ['#f97316', 'Domicilios', 'M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0M15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0M3 5h11v12M14 9h4l3 4v4h-2']]
    .map(([c, t, d]) => `<p><i class="lg" style="--c:${c}">${ico(d)}</i>${t}</p>`).join('');
// La actividad del proyecto: cada paso aparece en la lista y arma su parte de la app en el iPhone
const ev = (c, d, t, when) => `<div class="ev" style="--c:${c}">${ico(d)}<span>${t}</span><em>${when}</em></div>`;
const msg = (av, who, when, t) => `<div class="msg"><header>${av}${who}<em>${when}</em></header><p>${t}</p></div>`;
const PASOS_APP = [
  [msg('<i class="av" style="--c:#7c2bff">A</i>', 'Andrea, Banco Nova', 'hace 3 días', 'Quiero que mis clientes manejen su tarjeta desde el celular, sin tener que llamar al banco.')],
  [ev('#f5c542', 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 3v18', '<b>Ya Viene Tech</b> tomó el proyecto', 'hace 3 días'), [], ['En progreso', '#f5c542']],
  [ev('#a78bfa', 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z', 'Diseño aprobado: <b>tarjeta y marca</b>', 'hace 2 días'), ['cabecera', 'tarjeta']],
  [ev('#f472b6', 'M13 2L3 14h9l-1 8 10-12h-9z', '<b>Acciones rápidas</b> listas', 'ayer'), ['acciones']],
  [ev('#22d3ee', 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', '<b>PIN y límites</b> conectados al banco', 'hoy'), ['ajustes', 'tabs']],
  [ev('#818cf8', NIEVE, '<b>Congelar tarjeta</b> en un toque', 'hoy'), ['congelar']],
  [msg('<i class="av av-logo"><svg viewBox="20 40 160 120"><g fill="#111214"><circle cx="136" cy="100" r="34"/><rect x="54" y="70" width="47.9" height="12" rx="6" opacity=".4"/><rect x="32" y="94" width="60" height="12" rx="6" opacity=".7"/><rect x="54" y="118" width="47.9" height="12" rx="6" opacity=".4"/></g></svg></i>', 'Ya Viene Tech', 'ahora', 'Lista y publicada en App Store y Google Play.'), [], ['Publicada', '#3ecf74']],
];
const estado = (t, c) => { ws.st.textContent = t; ws.st.style.setProperty('--d', c || ''); };
const put = w => {
  ws.app.insertAdjacentHTML('beforeend', W[w]);
  const el = ws.app.lastElementChild;
  [...el.children].forEach((c, i) => c.style.setProperty('--i', i));
  el.querySelectorAll('.nv-list > p').forEach((p, i) => p.style.setProperty('--i', i + 1));
  ws.sk.querySelector(`[data-w="${w}"]`)?.classList.add('ya');
};
// El toque en Congelar: la onda, la tarjeta se escarcha, se queda un momento y se descongela con otro toque
async function congela() {
  const b = ws.app.querySelector('.nv-acc > div'), t = b && b.querySelector('span');
  if (!b) return;
  const toca = () => { b.classList.remove('toque'); void b.offsetWidth; b.classList.add('toque'); };
  toca(); await wait(200); ws.app.classList.add('frio'); t.textContent = 'Congelada';
  await wait(2600); if (!b.isConnected) return;
  toca(); await wait(200); ws.app.classList.remove('frio'); t.textContent = 'Congelar';
  await wait(900);
}
async function loop() {
  for (;;) {
    ws.act.innerHTML = ''; ws.app.innerHTML = ''; ws.act.classList.remove('out'); ws.app.classList.remove('out', 'frio'); estado('Idea');
    await wait(700);
    for (const [html, piezas = [], st] of PASOS_APP) {
      await turno();
      ws.act.insertAdjacentHTML('beforeend', html);
      if (st) estado(...st);
      await wait(450);
      for (const w of piezas) { if (w === 'congelar') await congela(); else { put(w); await wait(500); } }
      await wait(1000);
    }
    await wait(3500); await turno(); ws.act.classList.add('out'); ws.app.classList.add('out');
    ws.sk.querySelectorAll('.ya').forEach(e => e.classList.remove('ya')); await wait(900);
  }
}
// La corriente: tarjetas alternando lado, en carriles barajados para que entren en diagonal desde arriba y abajo.
function stream() {
  const ins = [...pairs.map(x => [x.k, x.pi, x.p]), ...extraIn], outs = [...pairs.map(x => [x.si, x.s]), ...extraOut];
  // Carriles que saltan de arriba a abajo en cada lado, para que dos seguidas nunca vayan pegadas
  const inL = [-.85, .55, -.3, .95, -.65, .2, -1, .75], outL = [.7, -.9, .3, -.5, 1, -.2, .5, -.75];
  // Un resuelto solo sale después de que un problema entró a la Mac: nunca hay soluciones sin problemas
  let a = 0, b = 0, listos = 0, toca = false;
  const tick = () => {
    if (visible()) {
      if (toca && listos > 0) {
        listos--; ride({ html: card('Resuelto', ...outs[b % outs.length]), cls: 'sol', lane: outL[b % 8], out: true, dur: 7000 }); b++;
      } else {
        ride({ html: card(...ins[a % ins.length]), lane: inL[a % 8], dur: 7000, entra: () => listos++ }); a++;
      }
      toca = !toca;
    }
    setTimeout(tick, 1400 + Math.random() * 300);
  };
  tick();
}
// La lista y el escenario se hablan: la fila deja su artefacto al entrar el puntero o el foco.
// En pantallas angostas el escenario es una tira scrollable y la fila conduce el scroll.
const escena = document.getElementById('escena');
const panes = [...escena.querySelectorAll('.pn')];
const rows = [...document.querySelectorAll('.rows .row')];
const tira = matchMedia('(max-width: 960px)');
const clra = matchMedia('(prefers-reduced-motion: reduce)');
let uso = 'app';
const fmtCO = new Intl.NumberFormat('es-CO');
// El panel de datos vive mientras está activo: ventas siguen subiendo, un KPI hace tick por ciclo y la curva crece más allá de "Ahora".
const vivoDatos = (() => {
  const pn = escena.querySelector('.pn--ds'), n = pn.querySelector('.ds-n'), l = pn.querySelector('.ds-l'), a = pn.querySelector('.ds-a');
  const kpi = [...pn.querySelectorAll('.ds-k')].map(el => ({ b: el.querySelector('b'), em: el.querySelector('em'), v: +el.querySelector('b').textContent.replace(/\D/g, ''), d: +el.querySelector('em').textContent.replace(/\D/g, ''), esMoneda: el.querySelector('b').textContent.includes('$') }));
  const lineas = [l.getAttribute('d'), a.getAttribute('d').replace(/V130H0z$/, '')], cola = [[348, 29, 356, 28.2, 364, 27.5], [374, 26.7, 382, 26.3, 392, 26.2], [395, 26.2, 397.5, 26.1, 400, 26.1]];
  const defK = [[126, '+12'], [33480, '+4%'], [18, '+6']];
  // Todo cambio se interpola: cifras que corren hasta su valor y una curva que se estira, nunca un salto.
  let gen = 0;
  const anima = (ms, f) => { const g = gen, t0 = performance.now(); const tick = now => { if (g !== gen) return; const p = Math.min(1, (now - t0) / ms); f(1 - Math.pow(1 - p, 3)); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
  const pesos = v => '$' + fmtCO.format(Math.round(v / 100) * 100);
  const corre = (el, de, a, fmt, ms = 900) => anima(ms, e => { el.textContent = fmt(de + (a - de) * e); });
  const tramo = (k, e) => { const x0 = k ? cola[k - 1][4] : 320, y0 = k ? cola[k - 1][5] : 30; let s = ' C'; for (let j = 0; j < 6; j += 2) s += (j ? ' ' : '') + (x0 + (cola[k][j] - x0) * e).toFixed(2) + ' ' + (y0 + (cola[k][j + 1] - y0) * e).toFixed(2); return s; };
  const hecho = k => cola.slice(0, k).map((c, j) => tramo(j, 1)).join('');
  const tm = [], armar = (t, de) => {
    corre(t.b, de, t.v, v => t.esMoneda ? '$' + fmtCO.format(Math.round(v)) : Math.round(v), 700);
    t.em.classList.add('bump'); tm.push(setTimeout(() => t.em.classList.remove('bump'), 450));
  };
  let ventas = 4218300, i = 0;
  const paso = () => {
    if (!escena.classList.contains('vis')) { tm.push(setTimeout(paso, 1400)); return; }
    const r = Math.random();
    if (r < .5) { const de = ventas; ventas += 9000 + Math.random() * 29000; corre(n, de, ventas, pesos, 1100); }
    else if (i < cola.length && r < .78) {
      const k = i++, base = hecho(k);
      anima(1400, e => { const d = base + tramo(k, e); l.setAttribute('d', lineas[0] + d); a.setAttribute('d', lineas[1] + d + 'V130H0z'); });
    }
    else if (r < .9) { // entra un pedido: el ticket promedio se recalcula con las ventas reales
      const d0 = kpi[0].v, d1 = kpi[1].v;
      kpi[0].v++; kpi[0].d++; kpi[0].em.textContent = '+' + kpi[0].d; armar(kpi[0], d0);
      kpi[1].v = ventas / kpi[0].v; armar(kpi[1], d1);
    }
    else if (kpi[2]) { const d0 = kpi[2].v; kpi[2].v++; kpi[2].d++; kpi[2].em.textContent = '+' + kpi[2].d; armar(kpi[2], d0); }
    tm.push(setTimeout(paso, 2600 + Math.random() * 2400));
  };
  return () => {
    gen++; tm.forEach(clearTimeout); tm.length = 0;
    l.setAttribute('d', lineas[0]); a.setAttribute('d', lineas[1] + 'V130H0z');
    ventas = 4218300; i = 0;
    n.textContent = '$' + fmtCO.format(ventas);
    kpi.forEach((t, k) => { t.v = defK[k][0]; t.d = +defK[k][1].replace(/\D/g, ''); t.b.textContent = t.esMoneda ? '$' + fmtCO.format(t.v) : t.v; t.em.textContent = defK[k][1]; t.em.classList.remove('bump'); });
    if (uso !== 'data' || clra.matches) return;
    tm.push(setTimeout(paso, 3200));
  };
})();
function vaya(row, quieto) {
  if (uso === row.dataset.s) return;
  uso = row.dataset.s;
  vivoDatos();
  rows.forEach(r => r.classList.toggle('on', r === row));
  panes.forEach(p => {
    const on = p.dataset.s === uso;
    p.classList.toggle('on', on);
    p.setAttribute('aria-hidden', String(!on));
  });
  escena.classList.toggle('ondark', uso === 'dark');
  escena.closest('.svc').dataset.s = uso;
  if (tira.matches && !quieto) panes[rows.indexOf(row)].scrollIntoView({ behavior: clra.matches ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
  guion.t = 0;
  if (uso === 'data') {
    const n = escena.querySelector('.ds-n'), fmt = new Intl.NumberFormat('es-CO');
    if (n && !clra.matches) {
      const t0 = performance.now();
      (function tick(now) {
        const k = Math.min(1, (now - t0) / 1400), p = .9 + .1 * (1 - (1 - k) ** 3); /* arranca en ~90%: la cifra grande nunca lee $0 */
        n.textContent = '$' + fmt.format(Math.round(4218300 * p / 100) * 100);
        if (k < 1 && uso === 'data') requestAnimationFrame(tick);
      })(t0);
    }
  }
}
// Escenas con guion: cada pieza con data-at aparece a esa hora (ms) y se va en data-out; el ciclo dura data-seq.
// Solo corre el guion del panel visible y mientras el escenario está en pantalla.
const guiones = panes.map(p => p.querySelector('[data-seq]')).filter(Boolean);
const piezas = new Map(guiones.map(g => {
  const raiz = g.closest('.pn');
  return [g, [...raiz.querySelectorAll('[data-at]')].map(el => ({ el, at: el.dataset.at.split(' ').map(Number), out: (el.dataset.out || '').split(' ').filter(Boolean).map(Number) }))];
}));
function guion(now) {
  const dt = Math.min(100, now - (guion.prev ?? now)); guion.prev = now;
  const g = guiones.find(g => g.closest('.pn').dataset.s === uso);
  if (g && escena.classList.contains('vis') && !document.hidden) {
    const t = clra.matches ? 1e9 : (guion.t + dt) % +g.dataset.seq;
    if (t < guion.t) g.dispatchEvent(new Event('vuelta'));
    guion.t = t;
    for (const { el, at, out } of piezas.get(g)) {
      const on = !el.dataset.cerrado && (clra.matches ? !out.length : at.some((a, i) => guion.t >= a && (out[i] === undefined || guion.t < out[i])));
      if (el.classList.contains('ya') !== on) el.classList.toggle('ya', on);
    }
  }
  requestAnimationFrame(guion);
}
guion.t = 0;
requestAnimationFrame(guion);
// Integraciones: las ramas salen del chat, pasan por Ya Viene Tech y llegan al centro de cada app; se recalculan al cambiar el tamaño
const ig = document.querySelector('.ig');
if (ig) {
  const ramas = [...ig.querySelectorAll('.ig-r')];
  const pon = (g, d) => g.querySelectorAll('path').forEach(p => p.setAttribute('d', d));
  // Ramas rectas con esquinas redondeadas: nacen debajo del chat, se esconden bajo el núcleo y terminan debajo de cada app
  const trazar = () => {
    const o = ig.getBoundingClientRect(), r = el => el.getBoundingClientRect(), nucleo = ig.querySelector('.ig-core span'), n = r(nucleo);
    if (!n.width) return;
    const cx = n.left + n.width / 2 - o.left, y = n.top + n.height / 2 - o.top, lado = nucleo.offsetWidth / 2;
    pon(ramas[0], `M${r(ig.querySelector('.ig-scr')).right - o.left - 24} ${y}H${cx}`);
    const s = r(ig.querySelector('.ig-out')), x1 = s.left - o.left + 24, xs = Math.round((cx + lado + s.left - o.left) / 2), rad = 12;
    ig.querySelectorAll('.ig-w').forEach((w, i) => {
      const y1 = s.top - o.top + w.offsetTop + w.offsetHeight / 2, dy = y1 - y, k = Math.sign(dy), q = Math.min(rad, Math.abs(dy) / 2);
      pon(ramas[i + 1], Math.abs(dy) < 28 ? `M${cx} ${y}H${x1}`
        : `M${cx} ${y}H${xs - q}Q${xs} ${y} ${xs} ${y + k * q}V${y1 - k * q}Q${xs} ${y1} ${xs + q} ${y1}H${x1}`);
    });
  };
  const ro = new ResizeObserver(trazar); ro.observe(ig); ig.querySelectorAll('.ig-w').forEach(w => ro.observe(w));
  ig.closest('.pn').addEventListener('transitionend', trazar);
}
// Inventario bajo se puede responder: Cancelar pedido deja 1 pendiente en Inventario; Entendido, o no tocar nada, no deja nada
{
  const erp = document.querySelector('.erp[data-seq]'), modal = erp.closest('.pn').querySelector('.erp-modal'), pend = erp.querySelector('.erp-pend');
  const cierra = cancela => { modal.dataset.cerrado = 1; pend.classList.toggle('ya', cancela); };
  modal.querySelector('.erp-act b').addEventListener('click', () => cierra(false));
  modal.querySelector('.erp-act span').addEventListener('click', () => cierra(true));
  erp.addEventListener('vuelta', () => { delete modal.dataset.cerrado; pend.classList.remove('ya'); });
}
// Al deslizar la tira a mano, el panel que queda al centro pasa a ser el activo.
escena.addEventListener('scrollend', () => {
  if (!tira.matches) return;
  const mid = escena.scrollLeft + escena.clientWidth / 2;
  const i = panes.reduce((b, p, k) => Math.abs(p.offsetLeft + p.offsetWidth / 2 - mid) < Math.abs(panes[b].offsetLeft + panes[b].offsetWidth / 2 - mid) ? k : b, 0);
  vaya(rows[i], true);
});
rows.forEach(r => {
  r.addEventListener('pointerenter', () => vaya(r));
  r.addEventListener('focusin', () => vaya(r));
  r.addEventListener('click', () => vaya(r));
});

// Aparición escalada de las filas, y pausa de las animaciones del escenario fuera de pantalla
const enVista = new IntersectionObserver(es => es.forEach(e => {
  if (e.target === escena) { escena.classList.toggle('vis', e.isIntersecting); return; }
  if (!e.isIntersecting) return;
  e.target.classList.add('seen'); enVista.unobserve(e.target);
}), { threshold: .05, rootMargin: '0px 0px 220px 0px' });
rows.forEach((r, i) => { r.style.transitionDelay = i * 55 + 'ms'; enVista.observe(r); r.addEventListener('transitionend', () => r.style.transitionDelay = '', { once: true }); });
enVista.observe(escena);
// Las secciones de abajo aparecen con el mismo observador
document.querySelectorAll('.rv').forEach(el => enVista.observe(el));

// Proceso: cada tarjeta cuenta su paso al entrar, y al subir la siguiente la de atrás se hunde hacia el fondo
{
  const caja = document.querySelector('.pasos'), pasos = [...caja.children];
  const ojo = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vio'); ojo.unobserve(e.target); } }), { threshold: .45 });
  pasos.forEach(p => ojo.observe(p));
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let pend = 0, arriba = 0;
    const mide = () => {
      pasos.forEach(p => { p.style.removeProperty('--t'); p.style.removeProperty('--u'); });
      const alto = Math.max(...pasos.map(p => p.offsetHeight));
      caja.classList.toggle('apila', innerWidth > 960 && innerHeight >= alto + 140);
      // Centrada en el espacio que deja libre el menú fijo de arriba
      const techo = document.querySelector("nav").offsetHeight;
      arriba = Math.max(techo + 16, techo + (innerHeight - techo - alto) / 2);
      caja.style.setProperty('--top', arriba + 'px');
      pinta();
    };
    const pinta = () => {
      pend = 0;
      if (!caja.classList.contains('apila')) return;
      const ts = pasos.map((p, i) => {
        const sig = pasos[i + 1];
        return sig ? Math.min(1, Math.max(0, 1 - (sig.getBoundingClientRect().top - arriba) / (p.offsetHeight + 60))) : 0;
      });
      pasos.forEach((p, i) => { p.style.setProperty('--t', ts[i].toFixed(4)); p.style.setProperty('--u', (ts[i + 1] || 0).toFixed(4)); });
    };
    addEventListener('scroll', () => { pend ||= requestAnimationFrame(pinta); }, { passive: true });
    addEventListener('resize', mide);
    mide();
  }
}

if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  ws.act.innerHTML = PASOS_APP.map(([h]) => h).join(''); estado('Publicada', '#3ecf74');
  PASOS_APP.forEach(([, piezas = []]) => piezas.forEach(w => W[w] && put(w)));
} else { loop(); stream(); }

// Túnel de luz: una cinta en forma de reloj de arena acostado. Los colores giran alrededor del eje y
// unas líneas finas viajan de izquierda a derecha, atravesando la pantalla.
(() => {
  const cv = $('beam'), gl = cv.getContext('webgl', { premultipliedAlpha: true, alpha: true });
  if (!gl) return;
  const frag = `precision mediump float;
uniform vec2 R; uniform float T;
vec3 pal(float k) {
  k = fract(k) * 4.0;
  vec3 a = vec3(.92,.12,.10), b = vec3(1.0,.55,.05), c = vec3(1.0,.93,.85), d = vec3(.14,.38,1.0);
  return k < 1.0 ? mix(a, b, k) : k < 2.0 ? mix(b, c, k - 1.0) : k < 3.0 ? mix(c, d, k - 2.0) : mix(d, a, k - 3.0);
}
float h(float n) { return fract(sin(n * 91.7) * 43758.5); }
void main() {
  vec2 p = (gl_FragCoord.xy / R) * 2.0 - 1.0;
  float x = p.x * R.x / max(R.x, 1100.0);                       // en pantallas angostas el cuello no se vuelve un hilo
  float hw = .15 + .55 * x * x + .9 * x * x * x * x;           // medio grosor de la cinta
  float d = p.y / hw;
  if (abs(d) > 1.0) { gl_FragColor = vec4(0); return; }
  float a = asin(d);                                           // ángulo sobre la cinta, como si fuera un cilindro
  // Los colores giran sobre el cilindro, teñidos por la paleta de marca a lo ancho (cherry -> magenta -> violeta)
  float g = (p.x + 1.0) * .5;
  vec3 brand = g < .5 ? mix(vec3(1.0,.23,.19), vec3(1.0,.54,.0), g * 2.0)
                      : mix(vec3(1.0,.54,.0), vec3(.18,.42,1.0), g * 2.0 - 1.0);
  vec3 col = mix(pal(a / 3.1416 * .9 + T * .16 + x * .08), brand, .4);
  // Menos chillón: baja la saturación y levanta un poco hacia un rosa claro
  col = mix(col, vec3(dot(col, vec3(.299, .587, .114))), .1);
  col = mix(col, vec3(1.0, .96, .92), .08);
  // Estelas tipo cometa, lisas: perfil redondo a lo ancho del carril y cola que se desvanece sin cortes.
  // Cada carril tiene su velocidad y brillo, y corren más rápido al salir del cuello.
  float lf = (a + 1.5708) * 14.0, lane = floor(lf);
  float thin = 1.0 - abs(fract(lf) - .5) * 2.0;
  float u = x * 1.3 + .7 * x * x * x;
  float q = fract(u * .3 - T * (.18 + .3 * h(lane + 1.0)) + h(lane));
  float comet = pow(q, 3.0) * smoothstep(1.0, .9, q) * step(.55, h(lane + 3.0)) * (.55 + .45 * h(lane + 5.0));
  float line = thin * thin * (3.0 - 2.0 * thin);
  line *= line;
  col = mix(col, vec3(1), clamp(comet * line * .9, 0.0, 1.0));
  // Núcleo de luz en el eje: el túnel se lee como un tubo brillante
  float core = smoothstep(.11, .0, abs(p.y));
  col = mix(col, vec3(1), core * .2);
  float edge = smoothstep(1.0, .45, abs(d));
  float ends = smoothstep(1.05, .55, abs(p.x));
  float al = (edge * .7 + core * .2) * ends;
  // Dithering ±1/255: sin banding en los degradados de alfa bajo
  al = clamp(al + (h(gl_FragCoord.x + gl_FragCoord.y * 911.0) - .5) * (2.0 / 255.0), 0.0, 1.0);
  gl_FragColor = vec4(col * al, al);
}`;
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 v;void main(){gl_Position=vec4(v,0,1);}'));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(pr); gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const uR = gl.getUniformLocation(pr, 'R'), uT = gl.getUniformLocation(pr, 'T');
  // Se dibuja a media resolución: el túnel es difuso y así cuesta poco.
  const size = () => { cv.width = cv.clientWidth / 2; cv.height = cv.clientHeight / 2; gl.viewport(0, 0, cv.width, cv.height); gl.uniform2f(uR, cv.width, cv.height); };
  const draw = ms => { gl.uniform1f(uT, ms / 1000); gl.drawArrays(gl.TRIANGLES, 0, 3); };
  new ResizeObserver(() => { size(); draw(performance.now()); }).observe(cv);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let on = true;
  new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) requestAnimationFrame(tick); }).observe(cv);
  function tick(ms) { if (!on) return; draw(ms); requestAnimationFrame(tick); }
  requestAnimationFrame(tick);
})();

// Puente carrusel -> demo del caso: al pisar el video, la maqueta se congela en su paso actual
let congelarMapa = null, mapaLista = false;

// Caso Ya Viene: la demo se actúa sola. Tocar un bus, pedir aviso, rueda a 1 km, isla dinámica hasta "Tu bus está cerca de ti"
{
  const m = document.querySelector('.case-media'), $ = s => m.querySelector(s);
  const map = $('.ya-map'), ruta = $('#yaRuta'), buses = $('.ya-buses'), sel = $('#yaSel'), halo = $('.ya-halo'), onda = $('#yaOnda');
  const sheet = $('.ya-sheet'), di = $('.ya-di'), la = $('.ya-la'), dedo = $('.ya-dedo'), rueda = $('.ya-sel');
  const ocu = $('.ya-oc'), ocuN = $('.ya-oc p b'), titulo = $('.ya-cab p'), cifra = $('.ya-dc b'), km = $('.ya-km strong'), ruedas = la.querySelectorAll('.ya-rueda');
  const L = ruta.getTotalLength(), K = 130; // 130 de mapa = 1 km: el halo verde es la distancia de aviso
  const pt = l => ruta.getPointAtLength(Math.max(0, Math.min(l, L)));
  const cerca = (x, y) => { let b = 0, bd = 1e9; for (let l = 0; l <= L; l++) { const p = pt(l), d = (p.x - x) ** 2 + (p.y - y) ** 2; if (d < bd) { bd = d; b = l; } } return b; };
  const ubica = (el, l) => { const p = pt(l), q = pt(l + 1), r = pt(l - 1); el.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${Math.atan2(q.y - r.y, q.x - r.x) * 180 / Math.PI})`); };
  const Lp = cerca(440.9, 430.3), otros = [...m.querySelectorAll('.ya-otro')], inicio = [[216.8, 326.8], [410.5, 415.8], [585.2, 486.9]].map(p => cerca(...p));
  const u = () => m.clientWidth / 600;

  // Reloj: solo avanza con el cuadro a la vista
  let visto = false, sigue = null, mapaVisto = false;
  const vivo = () => visto ? 0 : new Promise(r => sigue = r);
  new IntersectionObserver(([e]) => { mapaVisto = e.isIntersecting; visto = mapaVisto && !mapaLista;
    if (visto && sigue) { sigue(); sigue = null; } }).observe(m);
  congelarMapa = ON => { mapaLista = ON; visto = mapaVisto && !ON;
    if (visto && sigue) { sigue(); sigue = null; } };
  const wait = ms => new Promise(r => setTimeout(r, ms)).then(vivo);
  const ez = p => p < .5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2, sale = p => 1 - (1 - p) ** 3, lin = p => p;
  const tw = (ms, f, e = ez) => new Promise(r => { let a; const k = t => { a ??= t; const p = Math.min((t - a) / ms, 1); f(e(p)); p < 1 ? requestAnimationFrame(k) : r(); }; requestAnimationFrame(k); });

  // Los otros buses ruedan despacio por la ruta
  let pos = [...inicio], t0;
  const rodar = t => { const dt = Math.min(t - (t0 ?? t), 50) / 1000; t0 = t; if (visto) otros.forEach((o, i) => ubica(o, pos[i] = (pos[i] + dt * 6) % L)); requestAnimationFrame(rodar); };

  // Hoja: cada pieza vive en los estados de su data-on
  const piezas = [...sheet.querySelectorAll('[data-on]')], en = (p, s) => p.dataset.on.split(' ').includes(s);
  const pon = s => { m.dataset.s = s; piezas.forEach(p => { p.hidden = !en(p, s); p.classList.remove('ya-off'); }); };
  const fase = async s => {
    const was = m.dataset.s, out = piezas.filter(p => en(p, was) && !en(p, s)), inn = piezas.filter(p => !en(p, was) && en(p, s));
    out.forEach(p => p.classList.add('ya-off'));
    await wait(170);
    const h0 = sheet.offsetHeight;
    out.forEach(p => p.hidden = true); inn.forEach(p => { p.classList.add('ya-off'); p.hidden = false; }); m.dataset.s = s;
    sheet.style.height = ''; const h1 = sheet.offsetHeight;
    sheet.style.height = h0 + 'px'; sheet.offsetHeight; sheet.style.height = h1 + 'px';
    requestAnimationFrame(() => inn.forEach(p => p.classList.remove('ya-off')));
    await wait(560); sheet.style.height = '';
  };

  // Rueda de distancia: 500 m a 3 km, cilindro como CupertinoPicker (filas de 40, squeeze 1.45, lupa 1.08)
  const ops = []; for (let v = 500; v <= 3000; v += 100) ops.push(v < 1000 ? v + ' m' : (v / 1000).toFixed(1).replace('.', ',') + ' km');
  rueda.innerHTML = ops.map(o => `<span>${o}</span>`).join('');
  const filas = [...rueda.children];
  const gira = p => filas.forEach((f, i) => {
    const a = (i - p) * .42, c = Math.max(0, 1 - Math.abs(i - p) * 1.6);
    if (Math.abs(a) > .55) { f.style.opacity = 0; return; }   // solo centro, uno arriba y uno abajo
    const g = 1 + .08 * c;
    f.style.opacity = (.58 + .42 * c) * Math.min(1, Math.cos(a) * 1.6);
    f.style.transform = `translateY(${66 * u() * Math.sin(a)}px) scale(${g}, ${g * Math.cos(a)})`;
  });

  // Dedo
  let fx = 0, fy = 0;
  const caja = () => m.getBoundingClientRect();
  const sitio = el => { const r = el.getBoundingClientRect(), b = caja(); return [r.left + r.width / 2 - b.left, r.top + r.height / 2 - b.top]; };
  const enMapa = p => { const q = new DOMPoint(p.x, p.y).matrixTransform(map.getScreenCTM()), b = caja(); return [q.x - b.left, q.y - b.top]; };
  const lleva = (x, y) => { fx = x; fy = y; dedo.style.translate = `${x}px ${y}px`; };
  const toca = async ([x, y], el) => {
    lleva(x, y); dedo.classList.add('ya-ver'); await wait(180);
    dedo.classList.add('ya-pre'); el?.animate([{ scale: 1 }, { scale: .96 }, { scale: 1 }], { duration: 320, easing: 'ease-out' });
    await wait(130); dedo.classList.remove('ya-pre', 'ya-ver'); await wait(100);
  };
  const ola = (p, r1, ms) => { onda.setAttribute('cx', p.x); onda.setAttribute('cy', p.y); return tw(ms, k => { onda.setAttribute('r', 4 + (r1 - 4) * k); onda.setAttribute('stroke-opacity', .7 * (1 - k)); }, sale); };
  const vibra = el => { el.classList.remove('ya-vib'); el.offsetWidth; el.classList.add('ya-vib'); el.addEventListener('animationend', () => el.classList.remove('ya-vib'), { once: true }); };

  // Isla: reposo, compacta o expandida al alto de la actividad
  const isla = s => {
    di.classList.toggle('ya-cmp', s === 'cmp'); di.classList.toggle('ya-exp', s === 'exp');
    di.parentElement.classList.toggle('ya-cmp', s === 'cmp'); di.parentElement.classList.toggle('ya-exp', s === 'exp');
    di.style.height = s === 'exp' ? la.offsetHeight + 'px' : ''; la.classList.toggle('ya-ver', s === 'exp');
  };

  // Distancia: mueve todo a la vez, la cifra de la isla, la hoja, la pista de la actividad y el bus del mapa
  let llego = false;
  const fmt = d => d.toFixed(1).replace('.', ',');
  const avance = a => { la.style.setProperty('--a', a); la.classList.toggle('ya-paso', a >= .545); ruedas.forEach(r => r.setAttribute('transform', `rotate(${a * 1600} ${r.getAttribute('x')} ${r.getAttribute('y')})`)); };
  const dist = d => {
    const s = fmt(d); cifra.textContent = km.textContent = s;
    if (!llego) titulo.innerHTML = `Está a <b>${s} km</b> de ti`;
    avance(d > 1 ? .545 * (1.8 - d) / .8 : 1 - .455 * d);
    ubica(sel, Lp - K * d);
  };

  const ocupa = n => { ocu.style.setProperty('--oc', n + '%'); ocuN.textContent = Math.round(n) + ' %'; };

  // A 1 km avisa: "Tu bus está cerca de ti", la isla late y el bus aprieta un poco el paso
  const llega = () => {
    llego = true; vt = .27; titulo.style.opacity = 0;
    setTimeout(() => { titulo.textContent = 'Tu bus está cerca de ti'; titulo.style.opacity = ''; }, 200);
    vibra(la); di.classList.add('ya-late'); ola(pt(Lp), K, 1400);
  };

  // Motor: el bus tiene velocidad propia, arranca y frena suave, y se detiene justo en tu punto
  let d = 1.8, v = 0, vt = 0;
  const motor = () => new Promise(fin => {
    let t0;
    const k = t => {
      const dt = Math.min(t - (t0 ?? t), 50) / 1000; t0 = t;
      if (visto) {
        const tope = Math.sqrt(2 * .14 * d); // frenada a .14 km/s²
        v += (Math.min(vt, tope) - v) * (1 - Math.exp(-dt * 3));
        d = Math.max(0, d - v * dt); dist(d);
        ocupa(28 - 8 * Math.min(1, (1.8 - d) / .12)); // arranca y se baja gente: 28 % a 20 %
        if (!llego && d <= 1) llega();
      }
      d > 0 ? requestAnimationFrame(k) : fin();
    };
    requestAnimationFrame(k);
  });

  const reinicia = () => {
    llego = false; d = 1.8; v = vt = 0; la.classList.remove('ya-paso'); halo.classList.remove('ya-on'); di.classList.remove('ya-late');
    pos = [...inicio]; otros.forEach((o, i) => ubica(o, pos[i])); gira(10); dist(1.8); ocupa(28);
  };

  async function demo() {
    await vivo();
    for (;;) {
      reinicia(); pon('vacio'); buses.style.opacity = sel.style.opacity = 1;
      await wait(700);
      // 1. Tocas un bus: halo dorado y la hoja muestra el bus
      const b = pt(Lp - K * 1.8), U = u();
      await toca(enMapa(b));
      halo.classList.add('ya-on'); ola(b, 34, 700);
      await fase('bus'); await wait(450);
      // 2. Avisarme
      const av = $('.ya-btn[data-on="bus"]');
      await toca(sitio(av), av); await fase('rueda'); await wait(150);
      // 3. Rueda: arrastras de 1,5 km y suelta con impulso hasta 1,0 km
      const [rx, ry] = sitio(rueda);
      lleva(rx, ry - 30 * U); dedo.classList.add('ya-ver'); await wait(180); dedo.classList.add('ya-pre');
      await tw(480, p => { lleva(rx, ry - 30 * U + 52 * U * p); gira(10 - 2 * p); }, ez);
      dedo.classList.remove('ya-pre', 'ya-ver');
      await tw(680, p => gira(8 - 3 * p), sale); await wait(150);
      // 4. Guardar: "Aviso activado" y el bus arranca, sin cortes hasta tu punto
      const gu = $('.ya-gu b');
      await toca(sitio(gu), gu);
      await fase('activo');
      vt = .22; const anda = motor();
      await wait(1000); await fase('vacio');
      // 5. Llega a la isla sin expandir, luego se expande mientras el bus sigue
      isla('cmp'); vibra(di); await wait(900);
      isla('exp');
      // 6. A 1 km avisa (en el motor) y el bus frena hasta detenerse en tu punto
      await anda; await wait(1500);
      // 7. Cierra y vuelve a empezar
      isla(''); buses.style.opacity = sel.style.opacity = 0; await wait(700);
    }
  }

  ubica(sel, Lp - K * 1.8); gira(10);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { pon('bus'); halo.classList.add('ya-on'); }
  else { requestAnimationFrame(rodar); demo(); }
}

// Carrusel del cuadro del caso: dos vistas; el video solo baja cuando el usuario va tras él, y mientras está adelante la maqueta queda congelada
{
  const car = document.querySelector('.cm-track');
  const idx = () => Math.round(car.scrollLeft / car.clientWidth);
  const U = 'assets/ya-viene-control-v3.mp4';
  let bajo = false;
  const cine = document.querySelector('.vid-t'), go = document.querySelector('.vid-go');
  const bajaCine = () => { if (bajo) return; bajo = true; cine.src = U; cine.play().catch(() => {}); };
  go.addEventListener('click', () => {
    bajaCine(); // por si llega directo al grande sin haber pisado el cuadro
    document.querySelector('.vidm').hidden = false;
    const mv = document.querySelector('.vidm video');
    mv.src = U; mv.muted = false; mv.addEventListener('loadedmetadata', () => { mv.currentTime = 0; }, { once: true }); mv.play().catch(() => {});
    cine.pause();
    document.querySelector('.vd-x').focus();
  });
  const vidm = document.querySelector('.vidm'), bd = vidm.querySelector('.vd-bd'), zexe = vidm.querySelector('.vd-x');
  let ult = null;
  const cierralo = () => { vidm.hidden = true; vidm.querySelector('video').pause(); if (idx() === 1 && bajo) cine.play().catch(() => {}); };
  bd.addEventListener('click', cierralo); zexe.addEventListener('click', cierralo);
  addEventListener('keydown', e => { if (e.key === 'Escape' && !vidm.hidden) cierralo(); });
  document.querySelector('.vid-s').addEventListener('mouseenter', bajaCine);
  const va = () => { const i = idx();
    document.querySelectorAll('.car-dots i').forEach((d, k) => d.classList.toggle('on', k === i));
    if (i === ult) return; // solo actuar cuando la vista cambia: los ajustes de asentamiento del navegador no deben volver a congelar
    ult = i;
    if (i === 1) { bajaCine(); cine.play().catch(() => {}); if (congelarMapa) congelarMapa(true); }
    else { if (!cine.paused) cine.pause(); if (congelarMapa) congelarMapa(false); }
  };
  car.addEventListener('scroll', va, { passive: true }); va();
  const ve = i => { const led = Math.max(0, Math.min(i, car.children.length - 1));
    car.scrollTo({ left: led * car.clientWidth, behavior: clra.matches ? 'auto' : 'smooth' }); };
  document.querySelector('.car-prev').addEventListener('click', () => ve(idx() - 1));
  document.querySelector('.car-next').addEventListener('click', () => ve(idx() + 1));
  document.querySelectorAll('.car-dots i').forEach((d, k) => d.addEventListener('click', () => ve(k)));
}
