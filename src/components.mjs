import { site } from './site.mjs';

export const button = (text, href, tone='dark') => `<a class="button button-${tone}" href="${href}">${text}</a>`;
export const eyebrow = text => `<p class="eyebrow">${text}</p>`;
export const pageHead = (label, title, description) => `<section class="page-head"><div class="wrap"><nav class="breadcrumb" aria-label="İçerik yolu"><a href="index.html">Ana sayfa</a><span aria-hidden="true">/</span><span>${label}</span></nav>${eyebrow(label)}<h1>${title}</h1><p class="lede">${description}</p></div></section>`;

export function contactBand() {
  return `<section class="contact-band"><div class="wrap contact-band-inner"><div>${eyebrow('İLETİŞİM VE İŞ BİRLİĞİ')}<h2>Birlikte geliştirelim.</h2><p>Mühendislik, araştırma veya dijital ürünler üzerine bir fikriniz varsa konuşalım.</p></div>${button('Bizimle iletişime geçin','iletisim.html','light')}</div></section>`;
}

export function productShowcase({ compact=false }={}) {
  const productTitle = compact ? 'h2' : 'h3';
  const heading = compact ? '' : `<div class="section-heading"><div>${eyebrow('DİJİTAL ÜRÜNLER')}<h2>Dijital ürünlerimiz.</h2></div><p class="section-intro">Belirli kullanıcı ihtiyaçlarına yönelik yazılımlar geliştiriyoruz. YLSY Atlas, akademik hazırlık sürecine odaklanan ürünümüz.</p></div>`;
  return `<section class="product-section section-space${compact?' product-section-compact':''}"><div class="wrap">${heading}<article class="featured-product"><div class="atlas-identity-panel"><img src="assets/ylsy-atlas.png" width="144" height="144" alt="YLSY Atlas simgesi" decoding="async"><div><span class="product-label">AKADEMİK HAZIRLIK</span><${productTitle}>YLSY Atlas</${productTitle}><p>Dijital çalışma alanınız.</p></div></div><div class="product-copy"><p>${site.atlas.description}</p><ul class="inline-list"><li>Kayıt ve planlama</li><li>Belge araçları</li><li>Dil çalışmaları</li></ul>${button('YLSY Atlas’ı inceleyin','ylsy-atlas.html','light')}</div></article>${compact?'':'<a class="section-bottom-link" href="urunler.html">Tüm dijital ürünleri inceleyin</a>'}</div></section>`;
}

export const process = () => `<div class="process-list"><article><span>ARAŞTIRMA</span><h3>İhtiyacı ve sınırları anlamak.</h3><p>Kullanım amacını, mevcut yöntemleri ve çözülmesi gereken problemi tanımlıyoruz.</p></article><article><span>GELİŞTİRME</span><h3>Fikri somut bir çözüme taşımak.</h3><p>Kapsamı belirlenmiş prototipler ve yazılım çalışmalarıyla ilerliyoruz.</p></article><article><span>DEĞERLENDİRME</span><h3>Geri bildirimle iyileştirmek.</h3><p>Çalışmalarımızı kullanım deneyimi ve gözlemler doğrultusunda geliştiriyoruz.</p></article></div>`;
