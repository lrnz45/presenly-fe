<template>
    <div>
        <!-- ─── NAVBAR ─── -->
        <nav>
            <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <!-- Logo -->
                <div class="flex items-center gap-2">
                    <img src="/icon.svg" alt="Presenly Logo" class="logo-icon" />
                    <span class="font-display text-lg font-bold tracking-tight text-gray-900">Presen<span
                            class="italic text-blue-600">ly</span></span>
                </div>

                <!-- Links -->
                <div class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <a href="#pricing" class="hover:text-blue-600 transition-colors">Pricing</a>
                    <a href="#features" class="hover:text-blue-600 transition-colors">Fitur</a>
                    <a href="#workflow" class="hover:text-blue-600 transition-colors">Cara Kerja</a>
                </div>

                <NuxtLink to="/login" class="btn-primary px-6 py-2 text-sm">Login</NuxtLink>
            </div>
        </nav>


        <!-- ─── HERO ─── -->
        <section class="hero-bg min-h-[560px] flex items-center relative">
            <div class="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12 w-full">

                <!-- Text -->
                <div class="flex-1 max-w-xl fade-up">
                    <p class="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Face Liveliness
                        Verification Technology</p>
                    <h1 class="font-display text-5xl md:text-6xl font-extrabold leading-[1.05] text-gray-900 mb-5">
                        Sistem Absensi<br />Wajah Praktis<br />& <span style="color:var(--blue)">Efisien</span>
                    </h1>
                    <p class="text-gray-500 text-lg mb-8 leading-relaxed">Kelola jam kerja karyawan lebih efisien dengan
                        absensi wajah yang berjalan sepenuhnya di browser. Tanpa perlu beli alat mesin absensi tambahan.
                    </p>
                    <div class="flex flex-wrap gap-3">
                        <a href="#pricing" class="btn-primary px-7 py-3 text-base">Coba Gratis</a>
                        <NuxtLink to="/register" class="btn-outline px-7 py-3 text-base">Daftar Sekarang</NuxtLink>
                    </div>
                </div>

                <!-- Face cards -->
                <div class="flex-1 flex items-end justify-center gap-3 fade-up delay-2 select-none">
                    <!-- Left face -->
                    <div class="face-card card-left bg-[#b8c9f0]">
                        <img src="/boy-avatar-3d.webp" alt="Boy Avatar"
                            class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                    </div>

                    <!-- Center face with mesh -->
                    <div class="face-card center bg-[#c5d4f5]">
                        <img src="/man-avatar-3d.webp" alt="Verified Man Avatar"
                            class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />

                        <!-- MESH OVERLAY KEPISAH DARI GAMBAR -->
                        <div class="absolute inset-0 pointer-events-none">
                            <svg viewBox="0 0 210 380" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                                <g opacity="0.8" stroke="#3B6BF6" stroke-width="0.8" fill="none">
                                    <!-- scanning bracket corners -->
                                    <path d="M44 80 L44 95 M44 80 L58 80" stroke="#3B6BF6" stroke-width="2.5"
                                        stroke-linecap="round" />
                                    <path d="M166 80 L166 95 M166 80 L152 80" stroke="#3B6BF6" stroke-width="2.5"
                                        stroke-linecap="round" />
                                    <path d="M44 225 L44 210 M44 225 L58 225" stroke="#3B6BF6" stroke-width="2.5"
                                        stroke-linecap="round" />
                                    <path d="M166 225 L166 210 M166 225 L152 225" stroke="#3B6BF6" stroke-width="2.5"
                                        stroke-linecap="round" />
                                </g>
                                <!-- Scan line animated -->
                                <rect x="44" y="80" width="122" height="2" fill="#3B6BF6" rx="1" class="scan-line"
                                    style="filter: drop-shadow(0 0 6px #3B6BF6);" />

                                <!-- Badge -->
                                <rect x="58" y="248" width="94" height="26" rx="13" fill="#3B6BF6" />
                                <text x="105" y="265" text-anchor="middle" fill="white" font-size="11"
                                    font-family="DM Sans, sans-serif" font-weight="700">✓ Terverifikasi</text>
                            </svg>
                        </div>
                    </div>

                    <!-- Right face -->
                    <div class="face-card card-right bg-[#b0c2ee]">
                        <img src="/woman-avatar-3d.webp" alt="Woman Avatar"
                            class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── STATS BAR ─── -->
        <section class="stats-bar py-10">
            <div class="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <p class="font-display text-4xl font-extrabold text-white">100%</p>
                    <p class="text-gray-400 text-sm mt-1">Berjalan di Browser</p>
                </div>
                <div>
                    <p class="font-display text-4xl font-extrabold text-white">&lt; 3</p>
                    <p class="text-gray-400 text-sm mt-1">Detik Verifikasi Wajah</p>
                </div>
                <div>
                    <p class="font-display text-4xl font-extrabold text-white">0</p>
                    <p class="text-gray-400 text-sm mt-1">Instalasi Hardware Tambahan</p>
                </div>
                <div>
                    <p class="font-display text-4xl font-extrabold text-white">Akurat</p>
                    <p class="text-gray-400 text-sm mt-1">Sistem Liveness AI</p>
                </div>
            </div>
        </section>

        <!-- ─── FEATURES ─── -->
        <section id="features" class="py-24 bg-white">
            <div class="max-w-7xl mx-auto px-6">
                <div class="text-center mb-16">
                    <p class="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Teknologi Unggulan</p>
                    <h2 class="font-display text-4xl font-extrabold text-gray-900">Fitur yang Membuat Kami Berbeda</h2>
                    <p class="text-gray-500 mt-3 max-w-xl mx-auto text-lg">Dirancang untuk keandalan enterprise, mudah
                        digunakan oleh siapa saja.</p>
                </div>
                <div class="grid md:grid-cols-3 gap-6">
                    <!-- Feature cards -->
                    <div class="feature-card p-7 bg-white">
                        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 class="font-bold text-gray-900 text-lg mb-2">Pemrosesan Di Browser</h3>
                        <p class="text-gray-500 text-sm leading-relaxed">Model AI berjalan langsung di browser pengguna.
                            Tidak ada data wajah dikirim ke server — privasi terjaga penuh.</p>
                    </div>
                    <div class="feature-card p-7 bg-white">
                        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.5 2A2.5 2.5 0 017 4.5v15A2.5 2.5 0 009.5 22h5a2.5 2.5 0 002.5-2.5v-15A2.5 2.5 0 0014.5 2h-5z" />
                            </svg>
                        </div>
                        <h3 class="font-bold text-gray-900 text-lg mb-2">Mode Kiosk</h3>
                        <p class="text-gray-500 text-sm leading-relaxed">Aktifkan perangkat apa pun (tablet, laptop)
                            sebagai kiosk absensi mandiri dengan tampilan fullscreen yang bersih.</p>
                    </div>
                    <div class="feature-card p-7 bg-white">
                        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 class="font-bold text-gray-900 text-lg mb-2">Keamanan Berlapis</h3>
                        <p class="text-gray-500 text-sm leading-relaxed">Anti-spoofing liveness detection, enkripsi
                            AES-256, dan audit log lengkap untuk setiap sesi absensi.</p>
                    </div>
                    <div class="feature-card p-7 bg-white">
                        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 class="font-bold text-gray-900 text-lg mb-2">Multi-Instansi</h3>
                        <p class="text-gray-500 text-sm leading-relaxed">Kelola banyak kantor, departemen, atau lokasi
                            dari satu dashboard terpusat dengan isolasi data penuh.</p>
                    </div>
                    <div class="feature-card p-7 bg-white">
                        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 class="font-bold text-gray-900 text-lg mb-2">Ekspor Laporan Instan</h3>
                        <p class="text-gray-500 text-sm leading-relaxed">Unduh laporan kehadiran dalam format Excel,
                            PDF, atau CSV — otomatis terjadwal ke email Anda setiap hari.</p>
                    </div>
                    <div class="feature-card p-7 bg-white">
                        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 class="font-bold text-gray-900 text-lg mb-2">Verifikasi 5 Detik</h3>
                        <p class="text-gray-500 text-sm leading-relaxed">Model AI ringan yang dioptimalkan untuk
                            pengenalan wajah ultra-cepat bahkan di perangkat dengan spesifikasi rendah.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── PRICING ─── -->
        <section id="pricing" class="py-24" style="background: linear-gradient(180deg, #f8faff 0%, #eef2ff 100%);">
            <div class="max-w-6xl mx-auto px-6">
                <div class="text-center mb-14">
                    <p class="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Harga Transparan</p>
                    <h2 class="font-display text-4xl font-extrabold text-gray-900">Pilih Paket yang Tepat</h2>
                    <p class="text-gray-500 mt-3 text-lg">Mulai gratis. Upgrade kapan saja. Tanpa biaya tersembunyi.</p>
                </div>
                <div class="grid md:grid-cols-3 gap-8 items-start">

                    <!-- FREE -->
                    <div class="pricing-card p-8 bg-white">
                        <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Free</p>
                        <p class="font-display text-5xl font-extrabold text-gray-900">Rp 0</p>
                        <p class="text-gray-400 text-sm mt-1 mb-6">Trial 30 hari</p>
                        <ul class="space-y-3 text-sm text-gray-600 mb-8">
                            <li class="flex items-center gap-2"><span class="check">✓</span> Hingga <strong>25
                                    Wajah</strong></li>
                            <li class="flex items-center gap-2"><span class="check">✓</span> <strong>1 Admin</strong>
                            </li>
                            <li class="flex items-center gap-2"><span class="check">✓</span> Mode Kiosk</li>
                            <li class="flex items-center gap-2"><span class="check">✓</span> Ekspor CSV</li>
                        </ul>
                        <a href="#" class="btn-outline block text-center py-3 text-sm w-full">Mulai Trial</a>
                    </div>

                    <!-- BASIC (popular) -->
                    <div class="pricing-card popular p-8 relative">
                        <div class="flex items-center justify-between mb-2">
                            <p class="text-xs font-bold uppercase tracking-widest text-blue-600">Basic</p>
                            <span class="badge-popular">Terpopuler</span>
                        </div>
                        <p class="font-display text-5xl font-extrabold text-gray-900">Rp 149k</p>
                        <p class="text-gray-400 text-sm mt-1 mb-6">per bulan</p>
                        <ul class="space-y-3 text-sm text-gray-600 mb-8">
                            <li class="flex items-center gap-2"><span class="check">✓</span> Hingga <strong>200
                                    Wajah</strong></li>
                            <li class="flex items-center gap-2"><span class="check">✓</span> <strong>3 Admin</strong>
                            </li>
                            <li class="flex items-center gap-2"><span class="check">✓</span> Mode Kiosk</li>
                            <li class="flex items-center gap-2"><span class="check">✓</span> Ekspor CSV & Excel</li>
                        </ul>
                        <a href="#" class="btn-primary block text-center py-3 text-sm w-full">Pilih Basic</a>
                    </div>

                    <!-- PREMIUM -->
                    <div class="pricing-card p-8 bg-white">
                        <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Premium</p>
                        <p class="font-display text-5xl font-extrabold text-gray-900">Rp 399k</p>
                        <p class="text-gray-400 text-sm mt-1 mb-6">per bulan</p>
                        <ul class="space-y-3 text-sm text-gray-600 mb-8">
                            <li class="flex items-center gap-2"><span class="check">✓</span> <strong>Wajah Tak
                                    Terbatas</strong></li>
                            <li class="flex items-center gap-2"><span class="check">✓</span> <strong>Admin Tak
                                    Terbatas</strong></li>
                            <li class="flex items-center gap-2"><span class="check">✓</span> Mode Kiosk</li>
                            <li class="flex items-center gap-2"><span class="check">✓</span> Ekspor CSV, Excel & PDF
                            </li>
                        </ul>
                        <a href="#" class="btn-primary block text-center py-3 text-sm w-full">Pilih Premium</a>
                    </div>

                </div>
            </div>
        </section>

        <!-- ─── WORKFLOW ─── -->
        <section id="workflow" class="py-24 bg-white">
            <div class="max-w-5xl mx-auto px-6">
                <div class="text-center mb-16">
                    <p class="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Cara Kerja</p>
                    <h2 class="font-display text-4xl font-extrabold text-gray-900">4 Langkah Mudah</h2>
                    <p class="text-gray-500 mt-3 text-lg">Dari daftar hingga laporan — selesai dalam hitungan menit.</p>
                </div>

                <!-- Steps desktop timeline -->
                <div class="hidden md:grid grid-cols-4 mb-8 relative z-10">
                    <!-- Absolute connecting line -->
                    <div class="absolute top-1/2 left-[12.5%] right-[12.5%] h-[2px] -z-10"
                        style="transform: translateY(-50%); background: linear-gradient(90deg, var(--blue), #c7d7ff);">
                    </div>
                    <div class="flex justify-center">
                        <div class="step-num box-content border-[6px] border-white">1</div>
                    </div>
                    <div class="flex justify-center">
                        <div class="step-num box-content border-[6px] border-white">2</div>
                    </div>
                    <div class="flex justify-center">
                        <div class="step-num box-content border-[6px] border-white">3</div>
                    </div>
                    <div class="flex justify-center">
                        <div class="step-num box-content border-[6px] border-white">4</div>
                    </div>
                </div>

                <div class="grid md:grid-cols-4 gap-6">
                    <div class="text-center">
                        <div
                            class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4 md:hidden">
                            <span class="font-bold text-blue-600">1</span>
                        </div>
                        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h4 class="font-bold text-gray-900 mb-1">Daftar</h4>
                        <p class="text-gray-500 text-sm">Buat akun dalam 30 detik. Tidak perlu kartu kredit.</p>
                    </div>
                    <div class="text-center">
                        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h4 class="font-bold text-gray-900 mb-1">Enroll Wajah</h4>
                        <p class="text-gray-500 text-sm">Tambahkan karyawan & rekam wajah lewat browser. Selesai dalam
                            10 detik per orang.</p>
                    </div>
                    <div class="text-center">
                        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h4 class="font-bold text-gray-900 mb-1">Aktifkan Kiosk</h4>
                        <p class="text-gray-500 text-sm">Buka URL kiosk di perangkat mana pun. Karyawan absen mandiri
                            otomatis.</p>
                    </div>
                    <div class="text-center">
                        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h4 class="font-bold text-gray-900 mb-1">Terima Laporan</h4>
                        <p class="text-gray-500 text-sm">Laporan harian otomatis terkirim ke email Anda. Unduh kapan
                            saja dari dashboard.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── CTA BANNER ─── -->
        <section class="py-20" style="background: linear-gradient(135deg, #3B6BF6 0%, #6B8FF8 100%);">
            <div class="max-w-3xl mx-auto px-6 text-center">
                <h2 class="font-display text-4xl font-extrabold text-white mb-4">Mulai Beralih Hari Ini</h2>
                <p class="text-blue-100 text-lg mb-8">Buat operasional presensi lebih tertata dan kekinian bersama
                    Presenly.</p>
                <div class="flex flex-wrap gap-4 justify-center">
                    <a href="#pricing"
                        class="px-8 py-3.5 rounded-full bg-white text-blue-600 font-bold text-base hover:shadow-lg transition-shadow">Coba
                        Gratis 30 Hari</a>
                    <a href="#features"
                        class="px-8 py-3.5 rounded-full border-2 border-white text-white font-bold text-base hover:bg-white hover:text-blue-600 transition-colors">Pelajari
                        Fitur</a>
                </div>
            </div>
        </section>

        <!-- ─── FOOTER ─── -->
        <footer class="py-12">
            <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="flex items-center gap-2">
                    <img src="/icon.svg" alt="Presenly Logo" class="logo-icon brightness-200" />
                    <span class="font-display text-base font-bold text-white">Presen<span
                            class="italic text-blue-400">ly</span></span>
                </div>
                <p class="text-gray-500 text-sm">© 2026 Presenly. Hak cipta dilindungi.</p>
                <div class="flex gap-6 text-sm text-gray-400">
                    <a href="#" class="hover:text-white transition-colors">Kebijakan Privasi</a>
                    <a href="#" class="hover:text-white transition-colors">Syarat Layanan</a>
                    <a href="#" class="hover:text-white transition-colors">Kontak</a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: 'Presenly — Absensi Wajah Otomatis Praktis',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            script: [
                { src: 'https://cdn.tailwindcss.com' }
            ],
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap'
                }
            ]
        }
    }
}
</script>

<style>
:root {
    --blue: #3B6BF6;
    --blue-light: #6B8FF8;
    --dark: #0F1117;
    --hero-bg: #EEF2FF;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'DM Sans', sans-serif;
    color: var(--dark);
    background: #fff;
    overflow-x: hidden;
}

.font-display {
    font-family: 'Cabinet Grotesk', sans-serif;
}

/* NAV */
nav {
    position: sticky;
    top: 0;
    z-index: 50;
    /* background: rgba(255, 255, 255, 0.92); */
    backdrop-filter: blur(14px);
    /* border-bottom: 1px solid #e5e7eb; */
}

/* HERO */
.hero-bg {
    background: linear-gradient(135deg, #EEF2FF 0%, #E8EDFF 60%, #dce6ff 100%);
    position: relative;
    overflow: hidden;
}

.hero-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 60% at 70% 50%, rgba(59, 107, 246, 0.10) 0%, transparent 70%);
    pointer-events: none;
}

/* MESH face overlay */
.face-mesh {
    position: relative;
}

.face-mesh::after {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3CradialGradient id='rg' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%233B6BF6' stop-opacity='0.22'/%3E%3Cstop offset='100%25' stop-color='%233B6BF6' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23rg)' width='200' height='200'/%3E%3C/svg%3E") center/cover;
    pointer-events: none;
    border-radius: 50%;
}

/* STATS BAR */
.stats-bar {
    background: #0F1117;
}

/* FEATURES */
.feature-card {
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    transition: box-shadow 0.25s, transform 0.25s;
}

.feature-card:hover {
    box-shadow: 0 8px 32px rgba(59, 107, 246, 0.13);
    transform: translateY(-4px);
}

/* PRICING */
.pricing-card {
    border-radius: 20px;
    border: 1.5px solid #e5e7eb;
    transition: box-shadow 0.25s, transform 0.25s;
}

.pricing-card:hover {
    box-shadow: 0 12px 40px rgba(59, 107, 246, 0.15);
    transform: translateY(-6px);
}

.pricing-card.popular {
    border-color: var(--blue);
    background: linear-gradient(160deg, #f0f5ff 0%, #fff 100%);
}

.badge-popular {
    background: var(--blue);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    border-radius: 99px;
    padding: 3px 12px;
}

/* WORKFLOW */
.step-num {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--blue);
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.step-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, var(--blue), #c7d7ff);
}

/* BTN */
.btn-primary {
    background: var(--blue);
    color: #fff;
    border-radius: 99px;
    font-weight: 600;
    transition: background 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
    background: #2a57e0;
    box-shadow: 0 4px 20px rgba(59, 107, 246, 0.35);
}

.btn-outline {
    border: 1.5px solid var(--blue);
    color: var(--blue);
    border-radius: 99px;
    font-weight: 600;
    transition: background 0.2s;
}

.btn-outline:hover {
    background: #f0f5ff;
}

/* LOGO */
.logo-icon {
    width: 36px;
    height: 36px;
}

/* FADE-IN */
@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(24px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-up {
    animation: fadeUp 0.7s ease both;
}

.delay-1 {
    animation-delay: 0.1s;
}

.delay-2 {
    animation-delay: 0.2s;
}

.delay-3 {
    animation-delay: 0.35s;
}

.delay-4 {
    animation-delay: 0.5s;
}

.scan-line {
    animation: scanLine 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    transform-origin: center;
}

.card-left {
    animation: floatBasic 4s ease-in-out infinite;
}

.card-right {
    animation: floatShallow 3.5s ease-in-out infinite;
}

.face-card.center {
    animation: floatDeep 5s ease-in-out infinite;
}

/* CHECKMARK */
.check {
    color: var(--blue);
}

/* FOOTER */
footer {
    background: #0F1117;
    color: #9ca3af;
}
</style>