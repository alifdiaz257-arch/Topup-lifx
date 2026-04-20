# KIOSGAMER PRO - Web Top Up All Game

## Fitur Lengkap:
✅ Tema hitam-merah dengan font Rubik tebal
✅ Slider banner geser otomatis + support sentuhan (mobile)
✅ Daftar game lengkap dengan gambar (MLBB, FF, PUBG, Genshin, Lifx, Valorant)
✅ Pilih nominal top up dinamis
✅ Metode pembayaran: QRIS, DANA, Transfer BCA, Alfamart
✅ Proses UANG ASLI via simulasi payment gateway (siap ganti ke Midtrans/Xendit)
✅ Modal QRIS interaktif
✅ Animasi transisi halus

## Cara Menjalankan:
1. Simpan semua file sesuai struktur folder
2. Masukkan gambar banner dan game ke folder assets/images/
   (gunakan gambar bebas lisensi atau placeholder)
3. Buka index.html di browser (disarankan Live Server)

## Mengganti ke Payment Gateway UANG ASLI:
- Ganti fungsi di js/main.js bagian "payNowBtn"
- Integrasikan API key dari Midtrans/Xendit/DOKU
- Hapus simulasi dummy, ganti dengan fetch ke server backend

## Catatan:
- File ini SIAP PAKAI untuk DEMO
- Untuk production, backend perlu menangani webhook dan keamanan transaksi
- Gambar bisa diganti sesuai kebutuhan

Dibuat untuk kebutuhan Top Up Game + QRIS + Uang Asli.
