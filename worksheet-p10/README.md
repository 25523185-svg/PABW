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
