(() => {
  'use strict';
  const cards = [...document.querySelectorAll('.field-card')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const count = document.querySelector('.field-count');
  const dialog = document.querySelector('.field-dialog');
  const photo = dialog.querySelector('img');
  const caption = dialog.querySelector('p');
  let visible = cards, current = 0;
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
    visible = cards.filter(card => !card.hidden);
    count.textContent = `عرض ${visible.length} من ${cards.length} صورة`;
  }));
  function show(index) {
    current = (index + visible.length) % visible.length;
    photo.src = visible[current].dataset.src;
    photo.alt = visible[current].dataset.caption;
    caption.textContent = `${photo.alt} · الصورة ${current + 1} من ${visible.length}`;
  }
  cards.forEach(card => card.addEventListener('click', () => { show(visible.indexOf(card)); dialog.showModal(); }));
  dialog.querySelector('.field-close').addEventListener('click', () => dialog.close());
  dialog.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => show(current + Number(b.dataset.step))));
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(current + 1); if (e.key === 'ArrowRight') show(current - 1); });
})();
