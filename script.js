'use strict';
document.documentElement.classList.add('js');
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (toggle && nav) {
  const closeMenu = (restoreFocus = false) => {
    const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menüyü aç');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    if (restoreFocus && wasOpen) toggle.focus();
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu(true);
    if (event.key !== 'Tab' || !nav.classList.contains('open')) return;
    const items = [toggle, ...nav.querySelectorAll('a')];
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  matchMedia('(max-width: 800px)').addEventListener('change', () => closeMenu());
}
const copyButton = document.querySelector('[data-copy-email]');
if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copyEmail);
      status.textContent = 'E-posta adresi kopyalandı.';
    } catch {
      status.textContent = 'Adresi seçip kopyalayabilirsiniz: ' + copyButton.dataset.copyEmail;
    }
  });
}
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const topic = document.querySelector('#contact-topic');
  const requestedTopic = new URLSearchParams(location.search).get('konu');
  if ([...topic.options].some(option => option.value === requestedTopic)) topic.value = requestedTopic;
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const label = topic.options[topic.selectedIndex].text;
    const message = document.querySelector('#contact-message').value.trim();
    const subject = encodeURIComponent('Melikşah Aviation | ' + label);
    const body = encodeURIComponent('Merhaba,\n\n' + (message || label + ' hakkında bilgi almak istiyorum.') + '\n\n');
    document.querySelector('#contact-status').textContent = 'E-posta uygulamanızda taslağı kontrol edip gönderebilirsiniz. Açılmadıysa doğrudan info@meliksahaviation.com adresine yazın.';
    window.location.href = 'mailto:info@meliksahaviation.com?subject=' + subject + '&body=' + body;
  });
}
