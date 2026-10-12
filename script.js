/* ============ PENGATURAN (ubah di sini) ============ */
const CONFIG = {
  nama: "Toko Grosir Sidoarjo",      // GANTI dengan nama usaha Anda
  telp: "081375397592",
  tahunMulai: 2010,
  cabang: [
    { nama: "Cabang 1", alamat: "Sidoarjo, Jawa Timur (isi alamat lengkap)" },
    { nama: "Cabang 2", alamat: "Sidoarjo, Jawa Timur (isi alamat lengkap)" }
  ],
  jumlahToko: 300                    // sesuaikan dengan jumlah pelanggan Anda
};
const WA = "62" + CONFIG.telp.replace(/^0/, "");

const KECAMATAN = ["Sidoarjo Kota","Waru","Gedangan","Taman","Krian","Buduran","Candi","Tanggulangin","Porong","Sukodono","Tulangan","Wonoayu","Prambon","Balongbendo","Krembung","Jabon","Tarik","Sedati"];

const KATEGORI = ["Semua","Rumah Tangga","Tepung & Bahan Kue","Snack","Minuman","Kesehatan"];
const PRODUK = [
  ["Tepung terigu","Tepung & Bahan Kue","🌾","Bogasari","karung"],
  ["Mi instan & pasta","Tepung & Bahan Kue","🍜","Bogasari","dus"],
  ["Sabun mandi","Rumah Tangga","🧼","Unilever","dus"],
  ["Deterjen","Rumah Tangga","🧺","Unilever","dus"],
  ["Sampo sachet","Rumah Tangga","🧴","Unilever","renceng"],
  ["Kecap & saus","Rumah Tangga","🍶","Unilever","dus"],
  ["Minyak goreng","Rumah Tangga","🛢️","Beragam merek","dus"],
  ["Gula & garam","Rumah Tangga","🧂","Beragam merek","karung"],
  ["Tisu & pembersih","Rumah Tangga","🧻","Beragam merek","bal"],
  ["Keripik & kerupuk","Snack","🥔","Beragam merek","bal"],
  ["Biskuit & wafer","Snack","🍪","Beragam merek","dus"],
  ["Permen & cokelat","Snack","🍬","Beragam merek","toples"],
  ["Air mineral","Minuman","💧","Beragam merek","dus"],
  ["Teh & kopi sachet","Minuman","☕","Beragam merek","renceng"],
  ["Minuman botol","Minuman","🥤","Beragam merek","dus"],
  ["Susu kemasan","Minuman","🥛","Beragam merek","dus"],
  ["Tolak Angin & jamu","Kesehatan","🌿","Sido Muncul","dus"],
  ["Obat warung","Kesehatan","💊","Sido Muncul","dus"]
];
const MITRA = [
  ["Bogasari","Tepung terigu dan produk olahan gandum."],
  ["Unilever","Perawatan diri, kebersihan rumah, dan bahan dapur."],
  ["Sido Muncul","Jamu, herbal, dan minuman kesehatan."],
  ["Dan lainnya","Puluhan merek snack, minuman, dan kebutuhan harian."]
];
const LANGKAH = [
  ["Pilih barang","Susun daftar kebutuhan toko Anda dari katalog di atas."],
  ["Kirim lewat WhatsApp","Daftar pesanan terkirim otomatis ke nomor kami."],
  ["Konfirmasi harga","Kami cek stok dan kirim harga grosir terbaru."],
  ["Barang diantar","Armada kami mengantar ke toko atau warung Anda."]
];

/* ============ UTIL ============ */
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const tahunIni = new Date().getFullYear();
const umur = tahunIni - CONFIG.tahunMulai;

/* ============ HEADER ============ */
function renderHeader() {
  const nav = [["beranda","Beranda"],["produk","Produk"],["mitra","Mitra"],["area","Area"],["tentang","Tentang"],["kontak","Kontak"]];
  $("#header").innerHTML = `
    <div class="wrap nav">
      <a class="logo" href="#beranda"><i>🏪</i>${CONFIG.nama}</a>
      <button class="burger" aria-label="Buka menu" aria-expanded="false">☰</button>
      <ul class="menu">${nav.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join("")}</ul>
    </div>`;
  const burger = $(".burger"), menu = $(".menu");
  burger.onclick = () => { const o = menu.classList.toggle("buka"); burger.setAttribute("aria-expanded", o); };
  menu.onclick = (e) => { if (e.target.tagName === "A") menu.classList.remove("buka"); };
  const links = $$(".menu a");
  const io = new IntersectionObserver((es) => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("aktif", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  nav.forEach(([id]) => io.observe($("#" + id)));
}

/* ============ HERO + GRAFIS TOKO ============ */
function awning(x, y, w, h, n, warna) {
  const lebar = w / n; let s = "";
  for (let i = 0; i < n; i++) {
    const f = i % 2 ? "#fff" : warna, cx = x + i * lebar;
    s += `<rect x="${cx}" y="${y}" width="${lebar + .5}" height="${h}" fill="${f}"/>
          <circle cx="${cx + lebar / 2}" cy="${y + h}" r="${lebar / 2}" fill="${f}"/>`;
  }
  return s;
}
function miniShop(x, y, sk, warna, i) {
  return `<g class="mini" data-i="${i}" tabindex="0" role="button" aria-label="Toko langganan ${i + 1}" transform="translate(${x} ${y}) scale(${sk})">
    <rect class="badan" x="0" y="14" width="64" height="50" rx="3" fill="#F3E9CF"/>
    ${awning(0, 6, 64, 12, 5, warna)}
    <rect x="22" y="36" width="20" height="28" fill="#6a4a2f"/>
    <rect x="6" y="34" width="12" height="12" fill="#9dd3e0"/><rect x="46" y="34" width="12" height="12" fill="#9dd3e0"/>
    <circle class="denyut" cx="60" cy="8" r="6" fill="#FFC531" style="animation-delay:${(i % 7) * .3}s"/>
  </g>`;
}
function truk(kelas, warna) {
  return `<g class="truk ${kelas}"><g transform="translate(0 338)">
    <rect x="0" y="0" width="92" height="46" rx="4" fill="${warna}"/>
    <text x="46" y="29" font-size="13" font-weight="800" fill="#fff" text-anchor="middle" font-family="sans-serif">SUPPLIER</text>
    <path d="M92 12h26l14 18v16H92z" fill="#FFC531"/><rect x="104" y="17" width="14" height="12" fill="#9dd3e0"/>
    <g><circle class="roda" cx="22" cy="48" r="9" fill="#222"/><circle class="roda" cx="108" cy="48" r="9" fill="#222"/></g>
  </g></g>`;
}
function renderHero() {
  const warna = ["#D6382E","#FFC531","#3BA17C","#E87A1E","#5B8DEF","#D6382E"];
  let belakang = "";
  for (let i = 0; i < 14; i++) belakang += `<g opacity=".45">${miniShop(10 + i * 68, 132, .62, warna[i % 6], 100 + i).replace('class="mini"', 'style="pointer-events:none"').replace('tabindex="0" role="button"', '')}</g>`;
  const kiri = [20, 120, 220].map((x, i) => miniShop(x, 190, 1.1, warna[i], i)).join("");
  const kanan = [650, 750, 850].map((x, i) => miniShop(x, 190, 1.1, warna[i + 3], i + 3)).join("");
  $("#beranda").innerHTML = `
    <div class="wrap hero-teks">
      <h1>Pasok toko & warung Sidoarjo, <em>sejak ${CONFIG.tahunMulai}.</em></h1>
      <p>Bahan rumah tangga, snack, dan minuman dari merek yang pembeli Anda cari, langsung dari gudang kami di dua cabang.</p>
      <div class="hero-aksi">
        <a class="btn btn-kuning" href="#produk">Lihat katalog</a>
        <a class="btn btn-garis" href="https://wa.me/${WA}" target="_blank" rel="noopener">Chat WhatsApp</a>
      </div>
    </div>
    <div class="wrap scene-box">
      <svg id="scene" viewBox="0 0 960 420" role="img" aria-label="Ilustrasi toko pusat yang mengirim barang ke ratusan toko dan warung di Sidoarjo">
        <rect width="960" height="420" fill="#146B5F"/>
        <circle cx="860" cy="60" r="34" fill="#FFC531"/>
        ${belakang}
        <rect y="300" width="960" height="120" fill="#2b3a37"/>
        <rect y="296" width="960" height="8" fill="#9aa8a4"/>
        <path d="M0 372H960" stroke="#FFC531" stroke-width="4" stroke-dasharray="30 24"/>
        ${kiri}${kanan}
        <g id="toko-utama">
          <rect x="330" y="120" width="300" height="180" fill="#F3E9CF"/>
          <rect x="350" y="84" width="260" height="38" rx="8" fill="#14221F"/>
          <text x="480" y="110" text-anchor="middle" font-size="19" font-weight="800" fill="#FFC531" font-family="Bricolage Grotesque,sans-serif">${CONFIG.nama.toUpperCase()}</text>
          ${awning(322, 124, 316, 26, 13, "#D6382E")}
          <rect x="360" y="186" width="90" height="76" fill="#9dd3e0"/>
          <rect x="360" y="224" width="90" height="4" fill="#fff" opacity=".7"/>
          <g>${[0,1,2,3,4].map(k => `<rect x="${366 + k * 17}" y="${198 + (k % 2) * 4}" width="13" height="22" rx="2" fill="${warna[k]}"/><rect x="${366 + k * 17}" y="${240 + (k % 2) * 4}" width="13" height="18" rx="2" fill="${warna[(k + 2) % 6]}"/>`).join("")}</g>
          <rect x="480" y="190" width="56" height="110" fill="#6a4a2f"/><circle cx="526" cy="248" r="3" fill="#FFC531"/>
          <rect x="556" y="190" width="56" height="46" rx="4" fill="#fff"/>
          <text x="584" y="209" text-anchor="middle" font-size="11" font-weight="800" fill="#D6382E" font-family="sans-serif">SEJAK</text>
          <text x="584" y="228" text-anchor="middle" font-size="19" font-weight="800" fill="#14221F" font-family="Bricolage Grotesque,sans-serif">${CONFIG.tahunMulai}</text>
        </g>
        ${truk("", "#D6382E")}${truk("dua", "#3BA17C")}
      </svg>
      <div class="info-scene" id="info-scene" aria-live="polite">Ketuk salah satu warung: ini sebagian dari ratusan toko yang kami pasok.</div>
    </div>`;
  const info = $("#info-scene"), minis = $$(".mini");
  const nama = ["Warung Bu Sari","Toko Berkah","Kedai Pak Rudi","Toko Sumber Makmur","Warung Mbak Ina","Toko Jaya Abadi"];
  const pilih = (g) => {
    const i = +g.dataset.i; minis.forEach(m => m.classList.toggle("pilih", m === g));
    info.textContent = `${nama[i % nama.length]}, ${KECAMATAN[(i * 3) % KECAMATAN.length]}: dipasok rutin oleh kami.`;
  };
  minis.forEach(m => { m.onclick = () => pilih(m); m.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pilih(m); } }; });
}

/* ============ STATISTIK ============ */
function renderStat() {
  const data = [[CONFIG.jumlahToko, "+", "toko & warung langganan"], [umur, "", "tahun melayani Sidoarjo"], [CONFIG.cabang.length, "", "cabang di Sidoarjo"], [KECAMATAN.length, "", "kecamatan terjangkau"]];
  $("#statistik").innerHTML = `<div class="wrap stat-grid">${data.map(([n, s, t]) =>
    `<div class="stat"><b data-n="${n}" data-s="${s}">0${s}</b><span>${t}</span></div>`).join("")}</div>`;
  const io = new IntersectionObserver((es, o) => es.forEach(e => {
    if (!e.isIntersecting) return; o.disconnect();
    $$("b[data-n]").forEach(b => {
      const n = +b.dataset.n, t0 = performance.now();
      const f = (t) => { const p = Math.min((t - t0) / 1400, 1); b.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))) + b.dataset.s; if (p < 1) requestAnimationFrame(f); };
      requestAnimationFrame(f);
    });
  }), { threshold: .4 });
  io.observe($("#statistik"));
}

/* ============ PRODUK + KERANJANG ============ */
const keranjang = {}; let kat = "Semua", kata = "";
function renderProduk() {
  $("#produk").innerHTML = `<div class="wrap">
    <h2 class="judul">Katalog barang untuk toko Anda</h2>
    <p class="sub">Pilih barang, lalu kirim daftar pesanan lewat WhatsApp. Harga grosir kami kirim setelah stok dicek.</p>
    <div class="tab-bar" role="tablist">${KATEGORI.map(k => `<button class="tab${k === kat ? " aktif" : ""}" data-k="${k}">${k}</button>`).join("")}</div>
    <input class="cari" type="search" placeholder="Cari barang…" aria-label="Cari barang">
    <div class="grid-produk" id="grid"></div></div>`;
  $$(".tab").forEach(t => t.onclick = () => { kat = t.dataset.k; $$(".tab").forEach(x => x.classList.toggle("aktif", x === t)); isiGrid(); });
  $(".cari").oninput = (e) => { kata = e.target.value.toLowerCase(); isiGrid(); };
  isiGrid();
}
function isiGrid() {
  const hasil = PRODUK.filter(p => (kat === "Semua" || p[1] === kat) && (p[0] + p[3]).toLowerCase().includes(kata));
  $("#grid").innerHTML = hasil.length ? hasil.map(([n, k, i, m, u]) => {
    const q = keranjang[n] || 0;
    return `<article class="produk"><span class="ikon">${i}</span><h3>${n}</h3><small>${m} · per ${u}</small>
      <div class="baris">${q ? `<div class="stepper"><button class="min" data-n="${n}" data-d="-1" aria-label="Kurangi">−</button><b>${q}</b><button data-n="${n}" data-d="1" aria-label="Tambah">+</button></div>`
      : `<button class="tambah" data-n="${n}" data-d="1">Tambah</button>`}</div></article>`;
  }).join("") : `<p class="kosong">Barang tidak ditemukan. Tanyakan langsung lewat WhatsApp, kami mungkin punya stoknya.</p>`;
  $$("#grid [data-n]").forEach(b => b.onclick = () => ubah(b.dataset.n, +b.dataset.d));
}
function ubah(n, d) {
  keranjang[n] = Math.max(0, (keranjang[n] || 0) + d); if (!keranjang[n]) delete keranjang[n];
  isiGrid(); renderKeranjang();
  const f = $("#fab"); f.classList.remove("goyang"); void f.offsetWidth; f.classList.add("goyang");
}
function unit(n) { return PRODUK.find(p => p[0] === n)[4]; }
function renderKeranjang() {
  const jml = Object.values(keranjang).reduce((a, b) => a + b, 0);
  const root = $("#cart-root");
  if (!$("#fab")) {
    root.innerHTML = `<button id="fab"></button>
      <aside id="panel" aria-label="Daftar pesanan">
        <div class="p-kepala"><h3>Daftar pesanan</h3><button aria-label="Tutup">×</button></div>
        <div class="p-isi" id="p-isi"></div>
        <div class="p-kaki"><input id="nama-toko" placeholder="Nama toko / warung Anda" aria-label="Nama toko">
          <a class="btn btn-hijau" id="kirim" target="_blank" rel="noopener">Kirim via WhatsApp</a></div>
      </aside>`;
    $("#fab").onclick = () => $("#panel").classList.add("buka");
    $(".p-kepala button").onclick = () => $("#panel").classList.remove("buka");
    $("#nama-toko").oninput = renderKeranjang;
  }
  $("#fab").textContent = `🛒 Pesanan (${jml})`;
  const ent = Object.entries(keranjang);
  $("#p-isi").innerHTML = ent.length ? ent.map(([n, q]) => `<div class="item-p"><span>${n}<br><small>${q} ${unit(n)}</small></span>
    <div class="stepper"><button class="min" data-n="${n}" data-d="-1" aria-label="Kurangi">−</button><b>${q}</b><button data-n="${n}" data-d="1" aria-label="Tambah">+</button></div></div>`).join("")
    : `<p class="kosong">Belum ada barang. Pilih dari katalog.</p>`;
  $$("#p-isi [data-n]").forEach(b => b.onclick = () => ubah(b.dataset.n, +b.dataset.d));
  const toko = $("#nama-toko").value.trim();
  const teks = `Halo ${CONFIG.nama}, saya${toko ? " dari " + toko : ""} ingin memesan:\n` + ent.map(([n, q]) => `- ${n}: ${q} ${unit(n)}`).join("\n") + "\n\nMohon info harga & ketersediaan. Terima kasih.";
  const k = $("#kirim"); k.href = ent.length ? `https://wa.me/${WA}?text=${encodeURIComponent(teks)}` : "#";
  k.style.opacity = ent.length ? 1 : .5;
}

/* ============ MITRA, AREA, TENTANG, CARA, KONTAK ============ */
function renderMitra() {
  $("#mitra").innerHTML = `<div class="wrap"><h2 class="judul">Bekerja sama langsung dengan merek besar</h2>
    <p class="sub">Barang berasal dari jalur resmi, jadi stok dan kualitas lebih terjamin untuk toko Anda.</p>
    <div class="mitra-list">${MITRA.map(([n, d]) => `<div class="mitra"><h3>${n}</h3><p>${d}</p></div>`).join("")}</div></div>`;
}
function renderArea() {
  $("#area").innerHTML = `<div class="wrap"><h2 class="judul">Kami antar ke seluruh Sidoarjo</h2>
    <p class="sub">Pilih kecamatan Anda untuk melihat cara memesan.</p>
    <div class="chips">${KECAMATAN.map(k => `<button class="chip">${k}</button>`).join("")}</div>
    <div id="area-info">Pilih kecamatan di atas.</div></div>`;
  $$(".chip").forEach(c => c.onclick = () => {
    $$(".chip").forEach(x => x.classList.toggle("aktif", x === c));
    $("#area-info").innerHTML = `Toko di <b>${c.textContent}</b> bisa dilayani. Hubungi <a href="https://wa.me/${WA}?text=${encodeURIComponent("Halo, toko saya di " + c.textContent + ". Kapan jadwal pengiriman ke sana?")}" target="_blank" rel="noopener" style="color:#FFC531">${CONFIG.telp}</a> untuk jadwal pengiriman ke sana.`;
  });
}
function renderTentang() {
  $("#tentang").innerHTML = `<div class="wrap"><h2 class="judul">Tentang kami</h2>
    <div class="tentang-grid"><div>
      <p>${CONFIG.nama} adalah supplier bahan toko yang berdiri sejak ${CONFIG.tahunMulai} di Sidoarjo, Jawa Timur. Dari satu gudang kecil, kini kami melayani ratusan toko dan warung dari ${CONFIG.cabang.length} cabang.</p>
      <p>Kami menyediakan kebutuhan rumah tangga, tepung, snack, minuman, hingga produk herbal, dengan barang dari mitra resmi seperti Bogasari, Unilever, dan Sido Muncul.</p>
      <p>Selama ${umur} tahun, tujuan kami tetap sama: pemilik warung tidak perlu kehabisan stok.</p></div>
      <div class="nilai">
        <div><b>Stok lengkap</b><p>Satu pemasok untuk banyak kebutuhan toko.</p></div>
        <div><b>Barang dari jalur resmi</b><p>Bermitra langsung dengan produsen besar.</p></div>
        <div><b>Pengiriman tepat</b><p>Diantar ke toko atau warung Anda.</p></div>
      </div></div></div>`;
}
function renderCara() {
  $("#cara").innerHTML = `<div class="wrap"><h2 class="judul">Cara memesan</h2>
    <div class="langkah">${LANGKAH.map(([t, d]) => `<div><h3>${t}</h3><p>${d}</p></div>`).join("")}</div></div>`;
}
function renderKontak() {
  $("#kontak").innerHTML = `<div class="wrap"><h2 class="judul">Hubungi kami</h2>
    <p class="sub">Tanya stok, harga grosir, atau minta kami datang ke toko Anda.</p>
    <div class="kontak-grid">${CONFIG.cabang.map(c => `<div class="cabang"><h3>${c.nama}</h3><p>${c.alamat}</p></div>`).join("")}</div>
    <div class="cta-box"><a class="btn btn-hijau" href="https://wa.me/${WA}" target="_blank" rel="noopener">WhatsApp ${CONFIG.telp}</a>
      <a class="btn btn-kuning" href="tel:${CONFIG.telp}">Telepon sekarang</a></div></div>`;
}
function renderFooter() {
  $("#footer").innerHTML = `<div class="wrap"><p>© ${CONFIG.tahunMulai}–${tahunIni} <b>${CONFIG.nama}</b>. Hak cipta dilindungi.</p>
    <p>Supplier bahan toko & warung · Sidoarjo, Jawa Timur · ${CONFIG.telp}</p></div>`;
}

/* ============ JALANKAN ============ */
document.addEventListener("DOMContentLoaded", () => {
  renderHero(); renderStat(); renderProduk(); renderMitra(); renderArea();
  renderTentang(); renderCara(); renderKontak(); renderFooter();
  renderHeader(); renderKeranjang();
});