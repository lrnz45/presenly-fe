<template>
    <div class="auth-root">

        <!-- ── LEFT PANEL (branding) ── -->
        <div class="auth-left">
            <!-- Logo -->
            <NuxtLink to="/" class="brand-link">
                <img src="/icon.svg" alt="Presenly Logo" class="logo-icon" />
                <span class="brand-name font-display">Presen<span class="italic text-blue-600">ly</span></span>
            </NuxtLink>

            <!-- Dual Avatars -->
            <div class="left-content flex-1 flex flex-col items-center justify-center">
                <div class="avatars-container relative h-[360px] w-full flex items-center justify-center">
                    <!-- Woman Avatar (Back) -->
                    <div
                        class="face-card card-left absolute transform -translate-x-32 -translate-y-20 scale-75 opacity-50 decoration-none">
                        <img src="/woman-avatar-3d.webp" alt="Avatar Woman" />
                    </div>
                    <!-- Man Avatar (Front) -->
                    <div class="face-card center relative z-10 transition-transform">
                        <img src="/man-avatar-3d.webp" alt="Avatar Man" />
                        <div class="face-overlay">
                            <svg class="mesh-svg" viewBox="0 0 200 320" fill="none">
                                <rect class="scan-line" x="0" y="40" width="200" height="2" fill="url(#grad)"
                                    opacity="0.8" />
                                <defs>
                                    <linearGradient id="grad" x1="0" y1="0" x2="200" y2="0"
                                        gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#3B6BF6" stop-opacity="0" />
                                        <stop offset="0.5" stop-color="#3B6BF6" />
                                        <stop offset="1" stop-color="#3B6BF6" stop-opacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="mt-4 text-center">
                    <h2 class="text-xl font-bold text-gray-900 font-display mb-2">Presensi Biometrik Modern</h2>
                    <p class="text-sm text-gray-600 max-w-[240px]">Keamanan tingkat tinggi dengan teknologi pemindaian
                        wajah real-time.</p>
                </div>
            </div>
        </div>

        <!-- ── RIGHT PANEL (form) ── -->
        <div class="auth-right">
            <div class="form-card">
                <div class="form-header">
                    <h2 class="form-title font-display">Buat Akun Baru</h2>
                    <p class="form-subtitle">Sudah punya akun?
                        <NuxtLink to="/login" class="link-accent">Masuk di sini</NuxtLink>
                    </p>
                </div>

                <!-- Google Button -->
                <div class="relative group">
                    <button id="btn-google-register" class="google-btn" type="button" @click="registerWithGoogle">
                        <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                            <path
                                d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.332 35 24 35c-6.065 0-11-4.935-11-11s4.935-11 11-11c2.806 0 5.357 1.063 7.288 2.8l5.657-5.657C33.53 7.497 28.984 5.5 24 5.5 13.73 5.5 5.5 13.73 5.5 24S13.73 42.5 24 42.5c10.27 0 18.5-8.23 18.5-18.5 0-1.24-.126-2.45-.389-3.617z"
                                fill="#FFC107" />
                            <path
                                d="M7.306 14.691l6.571 4.819C15.655 16.108 19.558 13.5 24 13.5c2.806 0 5.357 1.063 7.288 2.8l5.657-5.657C33.53 7.497 28.984 5.5 24 5.5c-7.201 0-13.403 4.124-16.694 10.191z"
                                fill="#FF3D00" />
                            <path
                                d="M24 42.5c4.888 0 9.346-1.919 12.664-5.042l-5.847-5.08C28.894 33.894 26.534 34.5 24 34.5c-5.315 0-9.824-3.588-11.427-8.417l-6.52 5.025C9.012 38.023 16.031 42.5 24 42.5z"
                                fill="#4CAF50" />
                            <path
                                d="M43.611 20.083H42V20H24v8h11.303c-.935 2.66-2.717 4.882-5.003 6.417l5.847 5.08C40.29 35.88 43.5 30.395 43.5 24c0-1.24-.126-2.45-.389-3.617z"
                                fill="#1976D2" />
                        </svg>
                        Daftar dengan Google
                    </button>
                    <!-- Google Button SDK Over (opacity 0) atau hidden untuk prompt manual -->
                    <div id="google-btn-hidden" class="absolute inset-0 opacity-0 pointer-events-none"></div>
                </div>

                <div class="divider">
                    <span>atau isi data instansi</span>
                </div>

                <!-- Form -->
                <form id="form-register" class="auth-form" @submit.prevent="handleRegister">
                    <!-- Nama Lengkap -->
                    <div class="field-group">
                        <label class="field-label" for="reg-user-name">Nama Lengkap</label>
                        <div class="field-wrap">
                            <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="1.8">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <input id="reg-user-name" v-model="form.registrantFullName" type="text" class="field-input"
                                placeholder="cth. Ahmad Subagja" required autocomplete="name" />
                        </div>
                    </div>

                    <!-- Nama Instansi -->
                    <div class="field-group">
                        <label class="field-label" for="reg-name">Nama Instansi</label>
                        <div class="field-wrap">
                            <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="1.8">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <input id="reg-name" v-model="form.institutionName" type="text" class="field-input"
                                placeholder="cth. SMA Negeri 1 Jakarta" required autocomplete="organization" />
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="field-group">
                        <label class="field-label" for="reg-email">Email Instansi</label>
                        <div class="field-wrap">
                            <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="1.8">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input id="reg-email" v-model="form.email" type="email" class="field-input"
                                placeholder="admin@instansi.com" required autocomplete="email" />
                        </div>
                    </div>

                    <!-- Nomor Telepon -->
                    <div class="field-group">
                        <label class="field-label" for="reg-phone">Nomor Telepon</label>
                        <div class="field-wrap">
                            <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="1.8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 
                                19.79 19.79 0 0 1-8.63-3.07 
                                19.5 19.5 0 0 1-6-6 
                                19.79 19.79 0 0 1-3.07-8.67 
                                A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 
                                c.12.9.32 1.78.6 2.63 
                                a2 2 0 0 1-.45 2.11L8.09 9.91 
                                a16 16 0 0 0 6 6l1.45-1.17 
                                a2 2 0 0 1 2.11-.45 
                                c.85.28 1.73.48 2.63.6 
                                A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <input id="reg-phone" v-model="form.phone" type="tel" class="field-input"
                                placeholder="cth. 081234567890" required autocomplete="tel" />
                        </div>
                    </div>

                    <!-- Password -->
                    <div class="field-group">
                        <label class="field-label" for="reg-password">Kata Sandi</label>
                        <div class="field-wrap">
                            <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="1.8">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input id="reg-password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                class="field-input" placeholder="Minimal 8 karakter" required
                                autocomplete="new-password" @input="checkStrength" />
                            <button type="button" class="toggle-pw" @click="showPassword = !showPassword"
                                :aria-label="showPassword ? 'Sembunyikan' : 'Tampilkan'">
                                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.8" width="18" height="18">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                    width="18" height="18">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </button>
                        </div>
                        <!-- Password strength indicator -->
                        <div v-if="form.password" class="pw-strength">
                            <div class="pw-bars">
                                <div class="pw-bar"
                                    :class="{ active: strength >= 1, 'color-weak': strength === 1, 'color-fair': strength === 2, 'color-good': strength >= 3 }">
                                </div>
                                <div class="pw-bar"
                                    :class="{ active: strength >= 2, 'color-fair': strength === 2, 'color-good': strength >= 3 }">
                                </div>
                                <div class="pw-bar" :class="{ active: strength >= 3, 'color-good': strength >= 3 }">
                                </div>
                                <div class="pw-bar" :class="{ active: strength >= 4, 'color-strong': strength === 4 }">
                                </div>
                            </div>
                            <span class="pw-label" :class="strengthClass">{{ strengthLabel }}</span>
                        </div>
                    </div>

                    <!-- Kategori Instansi -->
                    <div class="field-group">
                        <label class="field-label">Kategori Instansi</label>
                        <div class="category-grid">
                            <label id="cat-sekolah" class="cat-option"
                                :class="{ selected: form.category === 'sekolah' }">
                                <input type="radio" v-model="form.category" value="sekolah" class="sr-only" required />
                                <div class="cat-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                        width="24" height="24">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                </div>
                                <span class="cat-name">Sekolah</span>
                                <!-- <span class="cat-desc">SD, SMP, SMA / Madrasah</span> -->
                                <div class="cat-check">
                                    <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                                        <path d="M3 8l3.5 3.5L13 4" stroke="#fff" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </label>

                            <label id="cat-perusahaan" class="cat-option"
                                :class="{ selected: form.category === 'perusahaan' }">
                                <input type="radio" v-model="form.category" value="perusahaan" class="sr-only"
                                    required />
                                <div class="cat-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                        width="24" height="24">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <span class="cat-name">Perusahaan</span>
                                <!-- <span class="cat-desc">Swasta, startup</span> -->
                                <div class="cat-check">
                                    <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                                        <path d="M3 8l3.5 3.5L13 4" stroke="#fff" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Terms -->
                    <label class="terms-row">
                        <input id="reg-terms" v-model="form.termsAccepted" type="checkbox" class="terms-check"
                            required />
                        <span class="terms-text">Saya menyetujui
                            <a href="#" class="link-accent">Syarat Layanan</a> dan
                            <a href="#" class="link-accent">Kebijakan Privasi</a>
                        </span>
                    </label>

                    <button id="btn-register-submit" type="submit" class="btn-submit"
                        :disabled="loading || !form.termsAccepted">
                        <span v-if="!loading">Buat Akun →</span>
                        <span v-else class="spinner"></span>
                    </button>
                </form>

                <transition name="fade">
                    <div v-if="message" :class="['form-message', messageType]">
                        {{ message }}
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import type { RegisterInstitutionPayload } from '~/types'

const auth = useAuth()
const router = useRouter()

const form = reactive<RegisterInstitutionPayload>({
    registrantFullName: '',
    institutionName: '',
    email: '',
    phone: '',
    password: '',
    category: '',
    termsAccepted: false
})

const showPassword = ref(false)
const strength = ref(0)
const loading = ref(false)
const message = ref('')
const messageType = ref<'error' | 'success'>('error')

const strengthLabel = computed(() => ['', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'][strength.value])
const strengthClass = computed(() => ['', 'text-red', 'text-orange', 'text-green', 'text-stronggreen'][strength.value])

const checkStrength = () => {
    const p = form.password
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    strength.value = s
}

const handleRegister = async () => {
    message.value = ''
    loading.value = true
    try {
        await auth.register(form)
        messageType.value = 'success'
        message.value = 'Akun berhasil dibuat! Mengarahkan ke dashboard...'
        setTimeout(() => router.push('/dashboard'), 1500)
    } catch (e: any) {
        messageType.value = 'error'
        message.value = e.message || 'Terjadi kesalahan sistem. Silakan coba lagi.'
    } finally {
        loading.value = false
    }
}

// ── GOOGLE SIGN UP INTEGRATION ──
const config = useRuntimeConfig()

const parseJwt = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

const handleGoogleCredentialResponse = (response: any) => {
    const payload = parseJwt(response.credential)
    if (payload) {
        form.registrantFullName = payload.name || ''
        form.email = payload.email || ''
        messageType.value = 'success'
        message.value = `Halo ${payload.given_name || 'User'}, beberapa data telah diisi otomatis dari Google. Silakan lengkapi data instansi Anda.`
    }
}

onMounted(() => {
    if (typeof window !== 'undefined' && (window as any).google) {
        (window as any).google.accounts.id.initialize({
            client_id: config.public.googleClientId,
            callback: handleGoogleCredentialResponse
        });

        (window as any).google.accounts.id.renderButton(
            document.getElementById('google-btn-hidden'),
            { theme: 'outline', size: 'large', width: '400' }
        );
    }
})

const registerWithGoogle = () => {
    (window as any).google.accounts.id.prompt();
    const hiddenBtn = document.querySelector('#google-btn-hidden [role="button"]') as HTMLElement
    if (hiddenBtn) hiddenBtn.click()
}

useSeoMeta({
    title: 'Daftar — Presenly',
    description: 'Daftarkan tim Anda di Presenly dan kelola tim secara efisien.'
})
</script>

<style scoped>
/* ── VARIABLES ── */
:root {
    --blue: #3B6BF6;
    --blue-light: #6B8FF8;
    --dark: #0F1117;
}

/* ── LAYOUT ── */
.auth-root {
    display: flex;
    height: 100dvh;
    /* lock to viewport height */
    overflow: hidden;
    /* no page-level scroll */
    font-family: 'DM Sans', sans-serif;
    background: #fff;
}

/* ── LEFT PANEL ── */
.auth-left {
    position: relative;
    flex: 0 0 44%;
    height: 100%;
    /* fill parent height */
    background: linear-gradient(145deg, #EEF2FF 0%, #dce6ff 60%, #c7d7ff 100%);
    display: flex;
    flex-direction: column;
    padding: 2rem 2.5rem;
    overflow: hidden;
}

.auth-left::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 60% at 80% 40%, rgba(59, 107, 246, 0.12) 0%, transparent 70%);
    pointer-events: none;
}

.brand-link {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    width: fit-content;
}

.logo-icon {
    width: 36px;
    height: 36px;
}

.brand-name {
    font-size: 1.15rem;
    font-weight: 600;
    color: #1e293b;
    letter-spacing: -0.02em;
}

.left-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
}

.scan-line {
    animation: scanLineAuth 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    transform-origin: center;
}

.card-left {
    animation: floatLeftDual 4s ease-in-out infinite;
}

.face-card.center {
    animation: float2 5s ease-in-out infinite;
}

@keyframes float2 {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-12px);
    }
}





/* ── RIGHT PANEL ── */
.auth-right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2.5rem 2rem;
    background: #fff;
    overflow-y: auto;
}

.form-card {
    width: 100%;
    max-width: 440px;
    margin: auto;
    padding: 1rem 0;
}

.form-header {
    margin-bottom: 1rem;
}

.form-title {
    font-family: 'Cabinet Grotesk', sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    color: #0F1117;
    letter-spacing: -0.03em;
    margin-bottom: 0.3rem;
}

.form-subtitle {
    font-size: 0.875rem;
    color: #7a899e;
}

.link-accent {
    color: #3B6BF6;
    font-weight: 600;
    text-decoration: none;
    transition: opacity 0.15s;
}

.link-accent:hover {
    opacity: 0.75;
}

/* Google Button */
.google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.62rem 1rem;
    border-radius: 12px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    color: #0F1117;
    cursor: pointer;
    transition: background 0.18s, box-shadow 0.18s, border-color 0.18s;
}

.google-btn:hover {
    background: #f8faff;
    border-color: #cbd5e0;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
}

/* Divider */
.divider {
    position: relative;
    text-align: center;
    margin: 0.8rem 0;
}

.divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e2e8f0;
}

.divider span {
    position: relative;
    background: #fff;
    padding: 0 0.8rem;
    font-size: 0.78rem;
    color: #a0aec0;
    font-weight: 500;
}

/* Form fields */
.auth-form {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
}

.field-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.field-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
}

.field-wrap {
    position: relative;
    display: flex;
    align-items: center;
}

.field-icon {
    position: absolute;
    left: 0.9rem;
    width: 17px;
    height: 17px;
    color: #a0aec0;
    pointer-events: none;
    flex-shrink: 0;
}

.field-input {
    width: 100%;
    padding: 0.6rem 0.9rem 0.6rem 2.7rem;
    border-radius: 12px;
    border: 1.5px solid #e2e8f0;
    background: #f9fbff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    color: #0F1117;
    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
    outline: none;
}

.field-input::placeholder {
    color: #b0bec5;
}

.field-input:focus {
    border-color: #3B6BF6;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(59, 107, 246, 0.12);
}

.toggle-pw {
    position: absolute;
    right: 0.85rem;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: #a0aec0;
    display: flex;
    align-items: center;
    transition: color 0.15s;
}

.toggle-pw:hover {
    color: #3B6BF6;
}

/* Password strength */
.pw-strength {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 0.25rem;
}

.pw-bars {
    display: flex;
    gap: 4px;
    flex: 1;
}

.pw-bar {
    flex: 1;
    height: 4px;
    border-radius: 2px;
    background: #e2e8f0;
    transition: background 0.3s;
}

.pw-bar.active.color-weak {
    background: #ef4444;
}

.pw-bar.active.color-fair {
    background: #f97316;
}

.pw-bar.active.color-good {
    background: #22c55e;
}

.pw-bar.active.color-strong {
    background: #15803d;
}

.pw-label {
    font-size: 0.72rem;
    font-weight: 600;
    white-space: nowrap;
}

.pw-label.text-red {
    color: #ef4444;
}

.pw-label.text-orange {
    color: #f97316;
}

.pw-label.text-green {
    color: #22c55e;
}

.pw-label.text-stronggreen {
    color: #15803d;
}

/* Category grid */
.category-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.55rem;
}

.cat-option {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
    padding: 0.65rem 0.9rem;
    border-radius: 14px;
    border: 1.5px solid #e2e8f0;
    background: #f9fbff;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}

.cat-option:hover {
    border-color: #3B6BF6;
    background: #f0f5ff;
}

.cat-option.selected {
    border-color: #3B6BF6;
    background: #f0f5ff;
    box-shadow: 0 0 0 3px rgba(59, 107, 246, 0.1);
}

.cat-icon {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: #EEF2FF;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3B6BF6;
    margin-bottom: 0.2rem;
    transition: background 0.2s;
}

.cat-option.selected .cat-icon {
    background: #dce6ff;
}

.cat-name {
    font-size: 0.85rem;
    font-weight: 700;
    color: #0F1117;
}

.cat-desc {
    font-size: 0.72rem;
    color: #91a3b8;
    font-weight: 400;
}

.cat-check {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3B6BF6;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s;
}

.cat-option.selected .cat-check {
    opacity: 1;
}

/* Terms */
.terms-row {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    cursor: pointer;
}

.terms-check {
    flex-shrink: 0;
    width: 17px;
    height: 17px;
    border: 1.5px solid #cbd5e0;
    border-radius: 4px;
    accent-color: #3B6BF6;
    margin-top: 1px;
    cursor: pointer;
}

.terms-text {
    font-size: 0.8rem;
    color: #64748b;
    line-height: 1.5;
}

.terms-text a {
    color: #3B6BF6;
    font-weight: 600;
    text-decoration: none;
}

.terms-text a:hover {
    text-decoration: underline;
}

/* Submit */
.btn-submit {
    width: 100%;
    padding: 0.72rem;
    border-radius: 12px;
    background: #3B6BF6;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
}

.btn-submit:hover:not(:disabled) {
    background: #2a57e0;
    box-shadow: 0 4px 20px rgba(59, 107, 246, 0.35);
    transform: translateY(-1px);
}

.btn-submit:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
}

/* Spinner */
.spinner {
    width: 20px;
    height: 20px;
    border: 2.5px solid rgba(255, 255, 255, 0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: inline-block;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Message */
.form-message {
    margin-top: 0.9rem;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    font-size: 0.845rem;
    font-weight: 500;
}

.form-message.error {
    background: #fff1f0;
    color: #c0392b;
    border: 1px solid #fecaca;
}

.form-message.success {
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
}

/* Screen-reader only */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* ANIMATIONS */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.font-display {
    font-family: 'Cabinet Grotesk', sans-serif;
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
    .auth-left {
        display: none;
    }
}

@media (max-width: 480px) {
    .auth-right {
        padding: 1.5rem 1rem;
    }

    .form-card {
        padding: 0;
    }
}
</style>
