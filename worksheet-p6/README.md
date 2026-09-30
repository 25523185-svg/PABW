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
