# Melikşah Aviation

İHA sistemleri, motor ve itki araştırmaları ve dijital ürünleri kapsayan Türkçe kurumsal site. YLSY Atlas, akademik hazırlık ürünü olarak ayrı bir sayfada sunulur.

## Mimari

Bağımlılıksız Node.js statik üretim yapısı. Sayfalar tam HTML olarak üretilir; temel içerik ve gezinme JavaScript olmadan da çalışır. Tek bir tasarım sistemi ve ortak şablon, yeni sayfa ve ürün eklemeyi kolaylaştırır. Sunucu, veritabanı veya paket yüklemesi gerektirmez.

- `src/site.mjs`: marka, menü, çalışma alanları ve ürün bilgileri
- `src/pages.mjs`: sayfa içerikleri
- `src/components.mjs`: ortak başlıklar, ürün sunumu ve içerik bileşenleri
- `scripts/build.mjs`: ortak şablon, SEO, sitemap ve HTML üretimi
- `styles.css`: ortak tasarım sistemi ve duyarlı düzen
- `script.js`: erişilebilir mobil menü ve iletişim yardımcıları
- `assets/`: özgün marka logosu ve YLSY Atlas simgesi

## Geliştirme

Node.js 18 veya üzeri ile:

```powershell
npm run build
npm run check
npm run preview
```

Önizleme: `http://127.0.0.1:4173`. Portu değiştirmek için `PORT` ortam değişkenini kullanın. Kaynak içeriği değiştiğinde `npm run build` komutunu tekrar çalıştırın. CSS ve tarayıcı JavaScript değişiklikleri doğrudan uygulanır.

Üretilen HTML dosyaları depoda tutulur. Bu sayede GitHub Pages mevcut şekilde doğrudan kökten yayımlayabilir; `index.html` yerel olarak da açılabilir.

## Sayfalar

Ana sayfa, çalışma alanları, ürünler, YLSY Atlas, hakkımızda, iletişim, gizlilik ve 404. Her sayfanın ayrı başlığı, açıklaması, canonical ve paylaşım meta verisi vardır. `sitemap.xml` ve `robots.txt` üretimde güncellenir.

## İçerik güncelleme

Yeni ürün veya çalışma alanı için önce `src/site.mjs` içeriğini, ardından gerektiğinde `src/pages.mjs` içindeki sayfaları güncelleyin. Yeni sayfayı `pages` listesine ve önizleme sunucusundaki `allowedRoot` listesine ekleyin. `build` ve `check` komutlarını çalıştırın. Üretilen HTML'i elle düzenlemeyin; yeniden üretimde üzerine yazılır.

YLSY Atlas özellik metinleri mevcut masaüstü projesinin README belgesine dayanır. Doğrulanmış mağaza bağlantısı, fiyat veya dağıtım URL'si olmadığı için erişim talebi iletişime yönlendirilir. Bu bilgiler kesinleştiğinde ürün sayfasına eklenebilir.

İletişim aracı veri saklamaz veya sunucuya mesaj göndermez. Seçilen konu ve metinle kullanıcının e-posta uygulamasında bir taslak açar. Kopyalama yardımcı özelliği güvenli bağlamda Clipboard API kullanır; kullanılamazsa adresi metin olarak gösterir.

## Yayın

Mevcut GitHub Pages yapısı korunur. Depo kökündeki HTML, CSS, JS, `assets/`, `sitemap.xml`, `robots.txt`, `.nojekyll` ve `CNAME` dosyaları yayımlanacak dosyalardır. `CNAME`, `www.meliksahaviation.com` değerini korur. Alan adı değişirse `src/site.mjs` içindeki `url` değerini de değiştirip yeniden üretin.

Google Workspace e-posta hizmetiyle ilişkili mevcut DNS kayıtlarını koruyun. Bu çalışma DNS, uzak depo veya canlı yayında değişiklik yapmaz. Analitik, üyelik, ödeme veya sunucuya gönderilen form eklenecekse ilgili altyapı ve veri açıklamaları ayrıca hazırlanmalıdır.

## Şeffaf marka varlıkları

`assets/meliksah-logo-transparent.png`, özgün logonun beyaz zemini ve iç boşlukları şeffaflaştırılmış sürümüdür. Kaynak JPG korunur. Sayfalardaki logo ve paylaşım metaverisi şeffaf PNG kullanır. Koyu site başlığı ve altbilgide şeklin görünürlüğü CSS ile açık tona çevrilir; ana PNG lacivert kalır.

Sekme simgesi `assets/favicon-transparent-v2.svg` dosyasıdır. Bu dosya aynı PNG'yi gömer, arka plan içermez ve koyu tarayıcı temasında açık ton kullanır. Yeniden üretim `npm run build` komutuyla yapılır.

## Kurumsal tasarım yönü

Site koyu lacivert kurumsal başlıklar, sade tipografi, açık çalışma alanı ayrımları ve gerçek ürün kimlikleri üzerine kuruludur. Ana ekranda kullanıcının onaylı özgün logosu bulunur. İHA veya motor fotoğrafı, yapay zekâ ile üretilmiş araç, tesis görseli ya da temsili ürün arayüzü kullanılmaz. Fotoğraf eklenecekse gerçek, kullanımı izinli ve bağlamı doğrulanmış içerik olmalıdır. İHA/motor çalışma alanlarının araştırma aşaması açıkça belirtilir. YLSY Atlas akademik hazırlık ürünü olarak ayrı konumlandırılır.
