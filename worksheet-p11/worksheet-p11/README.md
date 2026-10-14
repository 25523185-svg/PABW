## Pertemuan 5 — Layout modern: flexbox dan grid

### Kerangka halaman (Lembar A)

```
+--------------------------------------+
| kepala (auto)                        |
+----------+---------------------------+
| lini     | karya                     |
| ket      | kontak                    |
+----------+---------------------------+
| tanya jawab (lebar penuh)            |
+--------------------------------------+
| kaki (auto)                          |
+--------------------------------------+
```

- Body: tiga baris `auto 1fr auto`, tinggi `100dvh`.
- Main: dua kolom `16rem minmax(0, 1fr)`, area bernama, satu kolom di bawah 48em.
- Galeri karya: `repeat(auto-fit, minmax(16rem, 1fr))`, tanpa media query.
- Diuji di 360 px dan 1 280 px: tidak ada elemen yang meluber.

## Pertemuan 8 — JavaScript modern, struktur data, dan array methods

Isi halaman profil (identitas, keterampilan, daftar karya) kini disimpan sebagai data di `js/app.js` dan ditampilkan lewat JavaScript. Jalankan lewat server lokal (Live Server atau `python3 -m http.server 8000`), bukan klik dua kali.

- `profil` (objek) dan `daftarProyek` (array of object) menyimpan data.
- Fungsi murni: `buatPerkenalan`, `formatKeahlian`, `formatProyek`, `ubahKeAngka`.
- `map`, `filter`, `find` dipakai pada `daftarProyek`; urutan memakai salinan `[...daftarProyek]`.

### Deklarasi AI

- Dibantu AI (Gemini): memberikan kerangka `js/app.js`, penyesuaian `profil.html` agar datanya dirender dari JavaScript.
- Saya kerjakan sendiri: [lengkapi — misalnya menjalankan di Live Server, memeriksa Console, menyusun codingan, tangkapan layar, commit dan push].

## Pertemuan 9 — DOM, event, dan interaktivitas

Daftar proyek, filter kategori, dan validasi form kini bekerja lewat JavaScript di `js/dom.js`. Jalankan lewat server lokal (Live Server atau `python3 -m http.server 8000`), bukan klik dua kali.

- `js/app.js` menyimpan data (`daftarProyek` kini punya `kategori` dan diekspor); `js/dom.js` menyentuh halaman.
- `render(daftar)`: kosongkan wadah, tangani keadaan kosong, lalu isi ulang dengan `createElement` dan `textContent`.
- Satu pendengar `click` di `#filter` melayani semua tombol (`event.target.closest("button")` dan `dataset.kategori`).
- Form: `preventDefault`, validasi per kolom dengan `trim()`, pesan galat per kolom, `aria-invalid`, dan tombol kirim ditahan sampai semua kolom layak.
- Bukti: folder `bukti/` (`p9-1-gejala-null.png`, `p9-2-setelah-diperbaiki.png`, `p9-3-filter-bekerja.png`, `p9-4-validasi-form.png`).

### Deklarasi AI (Pertemuan 9)

- Dibantu AI (Gemini): kerangka `js/dom.js`. .html`, aturan CSS tambahan, serta draf isian worksheet.
- Saya kerjakan sendiri: penambahan wadah dan tombol filter di `profil, menjalankan di Live Server, memeriksa Console dan DevTools, mencoba setiap tombol dan form, tangkapan layar, commit dan push.

## Pertemuan 10 — JavaScript asinkron: fetch, Promise, dan JSON

Halaman profil kini mengambil data notisia lewat `fetch` dari berkas JSON lokal, lalu menampilkannya sebagai kartu. Jalankan lewat server lokal (Live Server atau `python3 -m http.server 8000`), bukan klik dua kali.

- Pilihan sumber data: API publik belum bisa dipakai, jadi data dibaca dari satu berkas lokal `notisia.json` (sesuai ketentuan worksheet).
- `js/api.js` (berkas baru) menyimpan alamat di satu tempat (`ALAMAT`), memanggil `fetch`, memeriksa `respons.ok`, membaca `json()`, dan mengekspor `ambilNotisia()`. Hanya berkas ini yang memanggil `fetch`.
- `js/app.js` mengimpor `ambilNotisia`, menggambar kartu (`gambar`), dan menangani empat keadaan antarmuka lewat `tampilkan()` dengan `try/catch` kedua: memuat, berhasil, gagal, kosong.
- Bentuk data: objek `sumber`, larik `notisia`, angka `total`, dan boolean `masihAdaLagi`.
- Bukti: folder `bukti/` (`p10-1-berhasil.png`, `p10-2-gagal.png`, `p10-3-kosong.png`, `p10-4-memuat.png`).

### Deklarasi AI (Pertemuan 10)

- Dibantu AI (Claude): kode `js/api.js`, penambahan di `js/app.js` dan `profil.html`, berkas `notisia.json`, pengujian keempat keadaan di browser, tangkapan layar, serta draf isian worksheet.
- Saya kerjakan sendiri: menjalankan ulang di Live Server, memeriksa Console dan Network di DevTools, memahami dan menjelaskan setiap baris kode, commit dan push.

## Pertemuan 11 — Modul, state, dan penyimpanan klien

Satu berkas JavaScript dipecah menjadi lima modul dengan satu tanggung jawab masing-masing, seluruh keadaan dikumpulkan di satu objek `state`, tampilan digambar dari `state`, dan pilihan kategori terakhir diingat lewat `localStorage`. Tidak ada fitur baru kecuali tombol **Atur ulang pilihan**. Jalankan lewat server lokal (Live Server atau `python3 -m http.server 8000`) dengan nomor port yang tetap, karena simpanan terikat alamat.

- `js/data.js`: data mentah dan fungsi murni pemformat.
- `js/state.js`: objek `state`, fungsi pengubah (`pilihKategori`, `aturUlangPilihan`, `mulaiNotisia`, `isiNotisia`, `gagalNotisia`), serta `simpan`, `muat`, `pulihkan` untuk `localStorage`.
- `js/dom.js`: seluruh sentuhan ke halaman; `render(state)` dan `renderNotisia(state)`.
- `js/events.js`: seluruh `addEventListener`; hanya meneruskan ke fungsi pengubah.
- `js/app.js`: perakit, hanya `import` dan pemanggilan.
- `js/api.js` (P10): dipakai apa adanya, tidak dihitung sebagai salah satu dari lima modul.
- Simpanan: kunci `pabw-p11`, isi `{ versi, kategoriAktif }`. `JSON.parse` dibungkus `try/catch`, versi diperiksa saat memuat, simpanan rusak atau berbeda versi dibuang lalu nilai bawaan `"semua"` dipakai.
- Sengaja tidak disimpan: token, kata sandi, isi formulir kontak (data pribadi), dan kata kunci pencarian.

### Versi Node.js (pekerjaan rumah Pertemuan 12)

- `node -v`: [isi dari terminal Anda]
- `npm -v`: [isi dari terminal Anda]

### Deklarasi AI (Pertemuan 11)

- Dibantu AI (Gemini): Memandu kelima modul (`data.js`, `state.js`, `events.js`, `dom.js`, `app.js`), memberikan  tutorial cara nambah tombol atur ulang di `profil.html`.
- Saya kerjakan sendiri: Menyusun kelima modul (`data.js`, `state.js`, `events.js`, `dom.js`, `app.js`) lengkapi — misalnya menjalankan di Live Server, memeriksa Console, merusak simpanan dari Console, tangkapan layar, commit dan push.
