// P11 — Pemasangan seluruh pendengar peristiwa (Farrel Priya Arka Agrapana, 25523185)
// Pendengar hanya meneruskan ke fungsi pengubah di state.js atau ke tampilan form di dom.js.
import { barisFilter, form, tombolAturUlang, siapkanForm } from "./dom.js";
import { pilihKategori, aturUlangPilihan } from "./state.js";

export function pasangPendengar() {
  const tampilanForm = siapkanForm();

  // Satu pendengar di induk untuk semua tombol filter
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol || !barisFilter.contains(tombol)) return; // klik di luar tombol
    pilihKategori(tombol.dataset.kategori);
  });

  tombolAturUlang.addEventListener("click", aturUlangPilihan);

  form.addEventListener("input", (event) => tampilanForm.ketik(event.target));
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // halaman tidak dimuat ulang
    tampilanForm.kirim();
  });
}
