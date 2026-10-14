// P11 — Seluruh sentuhan ke halaman: pemilih, render, kelas (Farrel Priya Arka Agrapana, 25523185)
// render(state) menggambar dari state; berkas ini tidak menyimpan keadaan.

// ===== Memilih elemen (null dilaporkan, bukan dibiarkan diam) =====
function ambil(selector) {
  const elemen = document.querySelector(selector);
  if (elemen === null) console.error(`Elemen tidak ditemukan: ${selector}`);
  return elemen;
}

const wadah = ambil("#daftar");
const kosong = ambil("#pesan-kosong");
export const barisFilter = ambil("#filter");
export const tombolAturUlang = ambil("#atur-ulang");
export const form = ambil("#kontak form");
const wadahNotisia = ambil("#daftar-notisia");
const statusNotisia = ambil("#status-notisia");

// ===== Identitas dan keterampilan =====
export function tampilkanIdentitas(profil, tahun) {
  document.title = `Profil ${profil.nama} — PABW 2026/2027`;

  const judul = ambil("h1");
  if (judul !== null) judul.textContent = profil.nama;

  const tagline = ambil(".tagline");
  if (tagline !== null) tagline.textContent = profil.peran;

  const kaki = ambil(".kaki p");
  if (kaki !== null) {
    const waktu = document.createElement("time");
    waktu.dateTime = String(tahun);
    waktu.textContent = tahun;
    kaki.replaceChildren(`${profil.nama} · ${profil.nim} · `, waktu);
  }
}

export function tampilkanKeterampilan(daftar) {
  const dl = ambil("dl.keterampilan");
  if (dl === null) return;
  const butir = daftar.flatMap(({ nama, deskripsi }) => {
    const dt = document.createElement("dt");
    dt.textContent = nama;
    const dd = document.createElement("dd");
    dd.textContent = deskripsi;
    return [dt, dd];
  });
  dl.replaceChildren(...butir);
}

// ===== Daftar proyek: render(state) =====
function buatKartu(proyek) {
  const li = document.createElement("li");
  li.className = "kartu";

  const judul = document.createElement("h3");
  judul.textContent = proyek.judul; // teks, bukan HTML

  const meta = document.createElement("p");
  meta.textContent =
    `Praktikum ${proyek.praktikum} · ${proyek.tahun} · ` +
    (proyek.selesai ? "selesai" : "sedang dikerjakan");

  const deskripsi = document.createElement("p");
  deskripsi.textContent = proyek.deskripsi;

  li.append(judul, meta, deskripsi);
  return li;
}

function saring(state) {
  return state.daftarProyek.filter(
    (proyek) => state.kategoriAktif === "semua" || proyek.kategori === state.kategoriAktif
  );
}

function tandaiTombolAktif(kategoriAktif) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol.dataset.kategori === kategoriAktif);
  });
}

export function render(state) {
  wadah.textContent = "";                         // 1. kosongkan lebih dulu
  tandaiTombolAktif(state.kategoriAktif);         // kelas aktif diturunkan dari state

  const tampil = saring(state);
  if (tampil.length === 0) {                      // 2. keadaan kosong
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;

  const serpihan = document.createDocumentFragment();
  tampil.forEach((proyek) => serpihan.append(buatKartu(proyek)));
  wadah.append(serpihan);                         // 3. isi ulang
}

// ===== Notisia (P10): tampilan empat keadaan dari state =====
function buatKartuNotisia(n) {
  const kartu = document.createElement("li");
  kartu.className = "kartu";
  const judul = document.createElement("h4");
  judul.textContent = n.judul;
  const meta = document.createElement("p");
  meta.textContent = `${n.kategori} · ${n.tanggal}` + (n.penting ? " · penting" : "");
  const ringkasan = document.createElement("p");
  ringkasan.textContent = n.ringkasan;
  kartu.append(judul, meta, ringkasan);
  return kartu;
}

export function renderNotisia(state) {
  wadahNotisia.textContent = "";
  if (state.statusNotisia === "memuat") {
    statusNotisia.textContent = "Memuat notisia...";
  } else if (state.statusNotisia === "gagal") {
    statusNotisia.textContent = "Gagal memuat data: " + state.pesanGalat;
  } else if (state.statusNotisia === "kosong") {
    statusNotisia.textContent = "Belum ada notisia";
  } else {
    statusNotisia.textContent = "";
    state.notisia.forEach((n) => wadahNotisia.append(buatKartuNotisia(n)));
  }
}

// ===== Form kontak: validasi tampil di halaman, pendengarnya dipasang di events.js =====
const aturan = {
  nama: (nilai) =>
    nilai.length >= 3 ? "" : "Nama belum diisi. Ketik nama lengkap Anda, minimal 3 huruf.",
  email: (nilai) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nilai)
      ? ""
      : "Email belum benar. Tulis seperti nama@contoh.com.",
  nim: (nilai) =>
    /^[0-9]{8}$/.test(nilai) ? "" : "NIM harus delapan digit angka, contoh 25523185.",
  pesan: (nilai) =>
    nilai.length >= 10 ? "" : "Pesan terlalu singkat. Tulis minimal 10 karakter.",
};

export function siapkanForm() {
  form.noValidate = true; // pesan galat kita yang tampil, bukan gelembung bawaan peramban
  const tombolKirim = form.querySelector('button[type="submit"]');
  const status = document.createElement("p");
  status.id = "status-form";
  status.setAttribute("role", "status");
  tombolKirim.after(status);

  const kolom = Object.keys(aturan).map((nama) => {
    const input = form.elements[nama];
    const galat = document.createElement("span");
    galat.id = `${nama}-galat`;
    galat.className = "galat";
    galat.hidden = true;
    input.after(galat);
    const sudah = input.getAttribute("aria-describedby");
    input.setAttribute("aria-describedby", sudah ? `${sudah} ${galat.id}` : galat.id);
    return { nama, input, galat };
  });

  function periksa({ nama, input, galat }) {
    const pesan = aturan[nama](input.value.trim());
    galat.textContent = pesan;
    galat.hidden = pesan === "";
    if (pesan === "") input.removeAttribute("aria-invalid");
    else input.setAttribute("aria-invalid", "true");
    return pesan === "";
  }

  function semuaSah() {
    return Object.entries(aturan).every(([nama, cek]) => cek(form.elements[nama].value.trim()) === "");
  }

  return {
    // kolom yang diketik diperiksa saat itu juga
    ketik(sasaran) {
      const satu = kolom.find((k) => k.input === sasaran);
      if (!satu) return;
      status.textContent = "";
      periksa(satu);
      tombolKirim.disabled = !semuaSah();
    },
    kirim() {
      const hasil = kolom.map(periksa);
      const pertamaSalah = kolom.find((_, i) => !hasil[i]);
      if (pertamaSalah) {
        tombolKirim.disabled = true;
        pertamaSalah.input.focus(); // arahkan ke kolom yang perlu diperbaiki
        return;
      }
      status.textContent = "Terima kasih, pesan Anda sudah tercatat.";
      form.reset();
      kolom.forEach(({ input, galat }) => {
        galat.hidden = true;
        input.removeAttribute("aria-invalid");
      });
      tombolKirim.disabled = false;
    },
  };
}
