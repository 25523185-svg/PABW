// P11 — Satu objek state dan fungsi pengubahnya (Farrel Priya Arka Agrapana, 25523185)
// Hanya berkas ini yang mengubah state dan yang membaca/menulis localStorage.
import { daftarProyek } from "./data.js";
import { render, renderNotisia } from "./dom.js";

const KUNCI = "pabw-p11";
const VERSI = 2;
const KATEGORI_BAWAAN = "semua";

// Seluruh keadaan yang bisa berubah ada di sini, tidak ada di DOM.
export const state = {
  daftarProyek,
  kategoriAktif: KATEGORI_BAWAAN,
  notisia: [],
  statusNotisia: "memuat", // memuat | berhasil | kosong | gagal
  pesanGalat: "",
};

// ===== Simpanan: hanya pilihan tampilan, tidak ada token atau data pribadi =====
function simpan(keadaan) {
  const isi = { versi: VERSI, kategoriAktif: keadaan.kategoriAktif };
  try {
    localStorage.setItem(KUNCI, JSON.stringify(isi));
  } catch (galat) {
    console.warn("Pilihan tidak tersimpan:", galat.message); // halaman tetap jalan
  }
}

export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI));
    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI); // bentuk lama atau belum ada: buang
      return null;
    }
    return isi;
  } catch {
    try { localStorage.removeItem(KUNCI); } catch { /* penyimpanan terkunci */ }
    return null; // isi rusak: pakai nilai bawaan
  }
}

function aturUlang() {
  try { localStorage.removeItem(KUNCI); } catch { /* penyimpanan terkunci */ }
}

// Dipanggil sekali saat halaman dimuat.
export function pulihkan() {
  const tersimpan = muat();
  const sah = ["semua", ...new Set(state.daftarProyek.map((p) => p.kategori))];
  const kategori = tersimpan?.kategoriAktif ?? KATEGORI_BAWAAN; // null → nilai bawaan
  state.kategoriAktif = sah.includes(kategori) ? kategori : KATEGORI_BAWAAN;
}

// ===== Fungsi pengubah: satu pintu masuk setiap perubahan =====
export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
  simpan(state);
  render(state);
}

export function aturUlangPilihan() {
  aturUlang();
  state.kategoriAktif = KATEGORI_BAWAAN;
  render(state);
}

export function mulaiNotisia() {
  state.statusNotisia = "memuat";
  state.pesanGalat = "";
  renderNotisia(state);
}

export function isiNotisia(daftar) {
  state.notisia = daftar;
  state.statusNotisia = daftar.length === 0 ? "kosong" : "berhasil";
  renderNotisia(state);
}

export function gagalNotisia(pesan) {
  state.notisia = [];
  state.statusNotisia = "gagal";
  state.pesanGalat = pesan;
  renderNotisia(state);
}
