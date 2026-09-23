<!--
  Salin bagian di bawah ini ke README.md di akar repositori Anda,
  di bawah catatan pertemuan-pertemuan sebelumnya.
-->

## Pertemuan 4 — Halaman profil saya

### Arah visual (Lembar A)

- Arah visual: **tegas dan teknis**
- Warna utama: `#1D3A8C` (navy), diambil dari warna kemeja yang saya
  pakai di foto profil, dipadukan dengan aksen teal `#0EA5A5` supaya
  halaman terasa presisi seperti dokumentasi teknis, tidak kaku.
- Warna netral: latar terang `#F7F9FC`, teks `#10182B`.
- Ukuran huruf: isi 1rem, judul bagian 1.5rem, judul halaman 2.25rem.
- Jarak dasar antar elemen: skala 0.25rem–1.5rem (empat langkah).
- Radius sudut: 0.5rem pada kartu dan tombol; bayangan halus pada kartu.

### Token yang saya tetapkan (Lembar C)

| Token | Nilai | Untuk apa |
|---|---|---|
| --color-primary | #1D3A8C | tombol, tautan, penanda |
| --color-accent | #0EA5A5 | pengalih tema dan garis fokus |
| --color-fg | #10182B | warna teks utama |
| --color-bg | #F7F9FC | latar halaman |
| --radius-md | 0.5rem | sudut tombol dan kartu |
| --space-4 | 1rem | jarak standar antar elemen |

Berkas gaya yang dibuat: tokens.css, base.css, layout.css,
komponen.css, tema.css.

Kriteria selesai saya: mengubah `--navy-700` di satu baris pada
tokens.css harus ikut mengubah warna tombol, tautan, judul bagian,
dan garis fokus di seluruh halaman.

### Struktur tambahan (Lembar B.3 dan I.5)

**Perjalanan saya (`<ol class="lini">` + `<time>`)** — lini masa ini
saya pilih untuk pembaca yang ingin tahu urutan perjalanan saya belajar
web, dari mulai kuliah sampai membangun halaman ini. Urutannya bermakna
sehingga daftar bernomor adalah elemen yang tepat, dan atribut
`datetime` membuat tanggalnya bisa dibaca mesin pencari dan pembaca
layar.

**Keterampilan (`<dl>`, `<dt>`, `<dd>`)** — bagian ini untuk perekrut
atau dosen yang ingin cepat melihat kemampuan teknis saya tanpa
membaca paragraf panjang. Pasangan istilah dan penjelasan adalah
elemen yang tepat karena isinya memang pasangan nama–definisi, bukan
narasi.

**Tanya jawab (`<details>` + `<summary>`)** — bagian ini untuk
pengunjung yang ingin tahu lebih jauh tentang saya tanpa halaman
menjadi penuh teks sejak awal. Karena `<details>` ditangani peramban
sendiri, bagian ini interaktif tanpa satu baris JavaScript pun.

Evaluasi setelah ketiga bagian berdiri dan diberi gaya:
- W3C Nu Html Checker: 0 error setelah penambahan.
- Kontras AA: teks dan latar pada ketiga bagian baru diuji di tema
  terang dan gelap, lolos ambang 4.5:1.
- Seluruh isi ketiga bagian baru dapat dijangkau dengan Tab.

### Catatan penggunaan AI (Lembar I.6)

Saya menggunakan Claude untuk membantu menyusun kode CSS (tokens,
layout, komponen, tema) berdasarkan rencana token dan arah visual yang
saya tentukan sendiri, serta untuk membantu merangkai teks di README
ini. Pemilihan warna, isi profil, dan keputusan struktur tambahan
adalah milik saya sendiri.
