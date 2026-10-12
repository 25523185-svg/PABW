// P10 — Lapisan data (Farrel Priya Arka Agrapana, 25523185)
// Hanya berkas ini yang memanggil fetch. Sumber data: berkas JSON lokal,
// karena API publik belum bisa dipakai.
const ALAMAT = "notisia.json";

export async function ambilNotisia() {
  try {
    const respons = await fetch(ALAMAT);
    if (!respons.ok) throw new Error("status " + respons.status);
    const data = await respons.json();
    if (!Array.isArray(data.notisia)) throw new Error("kunci notisia tidak ada");
    return data.notisia;
  } catch (galat) {
    console.error("gagal memuat", galat.message);
    throw galat;
  }
}
