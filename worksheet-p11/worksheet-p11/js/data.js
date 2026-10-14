// P11 — Data mentah dan fungsi murni pemformat (Farrel Priya Arka Agrapana, 25523185)
// Berkas ini tidak menyentuh halaman dan tidak tahu state.

export const tahunIni = 2026; // angka, bukan "2026"

export const profil = {
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

export const daftarProyek = [
  { judul: "Halaman Kelas Terbuka Kampus", praktikum: "P04", deskripsi: "HTML semantik dan form", kategori: "web", tahun: 2026, selesai: true },
  { judul: "Halaman Profil", praktikum: "P04", deskripsi: "CSS fundamental dan design token", kategori: "web", tahun: 2026, selesai: true },
  { judul: "Latihan Struktur Data", praktikum: "P08", deskripsi: "struktur data sederhana dengan array methods", kategori: "data", tahun: 2026, selesai: false },
];

// Fungsi murni: satu pekerjaan, memakai return
export function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");

export const formatProyek = ({ judul, praktikum, deskripsi, tahun }) =>
  `${judul} — praktikum ${praktikum}, ${deskripsi}, ${tahun}.`;

// Nilai dari kolom isian selalu teks; kembalikan angka, atau null bila bukan angka.
export const ubahKeAngka = (teks) => {
  if (String(teks).trim() === "") return null;
  const hasil = Number(teks);
  return Number.isNaN(hasil) ? null : hasil;
};
