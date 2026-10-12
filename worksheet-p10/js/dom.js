// P9 — DOM, event, dan interaktivitas (Farrel Priya Arka Agrapana, 25523185)
// app.js menyimpan data; dom.js menyentuh halaman.
import { daftarProyek } from "./app.js";

// ===== Lembar A: memilih elemen (null dilaporkan, bukan dibiarkan diam) =====
function ambil(selector) {
  const elemen = document.querySelector(selector);
  if (elemen === null) console.error(`Elemen tidak ditemukan: ${selector}`);
  return elemen;
}

const wadah = ambil("#daftar");
const kosong = ambil("#pesan-kosong");
const barisFilter = ambil("#filter");
const form = ambil("#kontak form");

// ===== Lembar B dan D.1: satu fungsi render =====
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

function render(daftar) {
  wadah.textContent = "";                  // 1. kosongkan lebih dulu

  if (daftar.length === 0) {               // 2. keadaan kosong
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;

  const serpihan = document.createDocumentFragment();   // halaman digambar sekali
  daftar.forEach((proyek) => serpihan.append(buatKartu(proyek)));
  wadah.append(serpihan);                  // 3. isi ulang
}

// ===== Lembar C: satu pendengar di induk untuk semua tombol filter =====
function tandaiTombolAktif(tombolAktif) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol === tombolAktif);
  });
}

function pasangFilter() {
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol || !barisFilter.contains(tombol)) return; // klik di luar tombol

    const kategori = tombol.dataset.kategori;
    const terpilih = daftarProyek.filter(
      (proyek) => kategori === "semua" || proyek.kategori === kategori
    );

    tandaiTombolAktif(tombol);
    render(terpilih);
  });
}

// ===== Lembar D.2: validasi form =====
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

function siapkanForm() {
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

  // Satu pendengar input di form: kolom yang diketik diperiksa saat itu juga
  form.addEventListener("input", (event) => {
    const satu = kolom.find((k) => k.input === event.target);
    if (!satu) return;
    status.textContent = "";
    periksa(satu);
    tombolKirim.disabled = !semuaSah();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();                              // halaman tidak dimuat ulang
    const hasil = kolom.map(periksa);
    const pertamaSalah = kolom.find((_, i) => !hasil[i]);
    if (pertamaSalah) {
      tombolKirim.disabled = true;
      pertamaSalah.input.focus();                        // arahkan ke kolom yang perlu diperbaiki
      return;
    }
    status.textContent = "Terima kasih, pesan Anda sudah tercatat.";
    form.reset();
    kolom.forEach(({ input, galat }) => {
      galat.hidden = true;
      input.removeAttribute("aria-invalid");
    });
    tombolKirim.disabled = false;
  });
}

// ===== Mulai: hanya bila semua elemen ditemukan =====
if (wadah && kosong && barisFilter && form) {
  pasangFilter();
  siapkanForm();
  render(daftarProyek);
  tandaiTombolAktif(barisFilter.querySelector('[data-kategori="semua"]'));
} else {
  console.error("dom.js berhenti: ada elemen yang null. Periksa id di profil.html.");
}
