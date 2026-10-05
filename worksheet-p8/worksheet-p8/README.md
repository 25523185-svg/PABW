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
