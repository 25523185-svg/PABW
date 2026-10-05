// P8 — Data halaman sebagai nilai JavaScript (Farrel Priya Arka Agrapana, 25523185)

// ===== Lembar B: data sebagai variabel =====
const tahunIni = 2026; // angka, bukan "2026"

const profil = {
  nama: "Farrel Priya Arka Agrapana",
  nim: "25523185",
  peran: "Mahasiswa Informatika yang sedang belajar membangun web.",
  keahlian: [
    { nama: "HTML semantik", deskripsi: "Landmark, heading berurutan, tabel data dengan caption dan th scope." },
    { nama: "Git dasar", deskripsi: "add, commit, push, serta diff, log, dan restore." },
    { nama: "CSS", deskripsi: "Sedang belajar: design token, flexbox, dan tema gelap." },
    { nama: "JavaScript dasar", deskripsi: "Sedang belajar: variabel, fungsi, objek, array, dan array methods." },
  ],
};

// ===== Lembar D: array of object =====
const daftarProyek = [
  { judul: "Halaman Kelas Terbuka Kampus", praktikum: "P03", deskripsi: "HTML semantik dan form", tahun: 2026, selesai: true },
  { judul: "Halaman Profil", praktikum: "P04", deskripsi: "CSS fundamental dan design token", tahun: 2026, selesai: true },
  { judul: "Latihan Struktur Data", praktikum: "P08", deskripsi: "struktur data sederhana dengan array methods", tahun: 2026, selesai: false },
];

// ===== Lembar C: fungsi murni (satu pekerjaan, memakai return) =====
function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

const formatProyek = ({ judul, praktikum, deskripsi, tahun }) =>
  `${judul} — praktikum ${praktikum}, ${deskripsi}, ${tahun}.`;

// Nilai dari kolom isian selalu teks; kembalikan angka, atau null bila bukan angka.
const ubahKeAngka = (teks) => {
  if (String(teks).trim() === "") return null;
  const hasil = Number(teks);
  return Number.isNaN(hasil) ? null : hasil;
};

// ===== Menampilkan data ke halaman (struktur HTML tidak berubah) =====
function ambil(selector) {
  const elemen = document.querySelector(selector);
  if (elemen === null) {
    console.error(`Elemen tidak ditemukan: ${selector}`);
  }
  return elemen;
}

function tampilkanIdentitas() {
  document.title = `Profil ${profil.nama} — PABW 2026/2027`;

  const judul = ambil("h1");
  if (judul !== null) judul.textContent = profil.nama;

  const tagline = ambil(".tagline");
  if (tagline !== null) tagline.textContent = profil.peran;

  const kaki = ambil(".kaki p");
  if (kaki !== null) {
    const waktu = document.createElement("time");
    waktu.dateTime = String(tahunIni);
    waktu.textContent = tahunIni;
    kaki.replaceChildren(`${profil.nama} · ${profil.nim} · `, waktu);
  }
}

function tampilkanKarya(daftar) {
  const ul = ambil("#karya ul");
  if (ul === null) return;
  const butir = daftar.map((proyek) => {
    const li = document.createElement("li");
    li.textContent = formatProyek(proyek);
    return li;
  });
  ul.replaceChildren(...butir);
}

function tampilkanKeterampilan(daftar) {
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

tampilkanIdentitas();
tampilkanKarya(daftarProyek);
tampilkanKeterampilan(profil.keahlian);

// ===== Pemeriksaan di Console =====
const namaKeahlian = profil.keahlian.map((k) => k.nama);
console.log(buatPerkenalan(profil));
console.log(formatKeahlian(namaKeahlian));

console.table(profil.keahlian);
console.table(daftarProyek);

const selesai = daftarProyek.filter((proyek) => proyek.selesai);
console.table(selesai);

const katalog = daftarProyek.find((proyek) => proyek.judul === "Halaman Profil");
console.log(katalog);

const judulSaja = daftarProyek.map((proyek) => proyek.judul);
console.log(judulSaja.length === daftarProyek.length); // true

const urut = [...daftarProyek].sort((a, b) => a.judul.localeCompare(b.judul));
console.log(urut[0].judul, "| data asli tetap:", daftarProyek[0].judul);

// Tiga kasus sulit (E.4)
console.log(profil.alamat?.kota ?? "belum diisi");  // undefined ditangani
console.log(ubahKeAngka("25523185") + 1);           // 25523186, bukan "255231851"
