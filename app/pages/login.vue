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
                        class="face-card card-left absolute transform -translate-x-32 -translate-y-16 scale-90 opacity-60 decoration-none">
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
                    <h2 class="form-title font-display">Masuk ke Akun</h2>
                    <p class="form-subtitle">Belum punya akun?
                        <NuxtLink to="/register" class="link-accent">Daftar sekarang</NuxtLink>
                    </p>
                </div>

                <!-- Google Button -->
                <div class="relative group">
                    <button id="btn-google-login" class="google-btn" type="button" @click="loginWithGoogle">
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
                        Lanjutkan dengan Google
                    </button>
                    <!-- Google Button SDK Over (opacity 0) atau hidden untuk prompt manual -->
                    <div id="google-btn-hidden" class="absolute inset-0 opacity-0 pointer-events-none"></div>
                </div>

                <div class="divider">
                    <span>atau masuk dengan email</span>
                </div>

                <!-- Form -->
                <form id="form-login" class="auth-form" @submit.prevent="handleLogin">
                    <div class="field-group">
                        <label class="field-label" for="login-email">Email</label>
                        <div class="field-wrap">
                            <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="1.8">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input id="login-email" v-model="form.email" type="email" class="field-input"
                                placeholder="nama@instansi.com" required autocomplete="email" />
                        </div>
                    </div>

                    <div class="field-group">
                        <div class="field-label-row">
                            <label class="field-label" for="login-password">Kata Sandi</label>
                            <NuxtLink to="/forgot-password" class="forgot-link">Lupa kata sandi?</NuxtLink>
                        </div>
                        <div class="field-wrap">
                            <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="1.8">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input id="login-password" v-model="form.password"
                                :type="showPassword ? 'text' : 'password'" class="field-input"
                                placeholder="Minimal 8 karakter" required autocomplete="current-password" />
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
                    </div>

                    <button id="btn-login-submit" type="submit" class="btn-submit" :disabled="loading">
                        <span v-if="!loading">Masuk</span>
                        <span v-else class="spinner"></span>
                    </button>
                </form>

                <!-- Error / success notification -->
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import type { LoginCredentials } from '~/types'

const auth = useAuth()
const router = useRouter()

const form = reactive<LoginCredentials>({
    email: '',
    password: ''
})

const showPassword = ref(false)
const loading = ref(false)
const message = ref('')
const messageType = ref<'error' | 'success'>('error')

const handleLogin = async () => {
    message.value = ''
    loading.value = true
    try {
        await auth.login(form)
        messageType.value = 'success'
        message.value = 'Login berhasil! Mengarahkan ke dashboard...'
        setTimeout(() => router.push('/dashboard'), 1000)
    } catch (e: any) {
        messageType.value = 'error'
        message.value = e.message || 'Email atau kata sandi salah. Silakan coba lagi.'
    } finally {
        loading.value = false
    }
}

// ── GOOGLE SIGN IN ──
const config = useRuntimeConfig()

// Handler untuk callback GSI
const handleGoogleCredentialResponse = async (response: any) => {
    loading.value = true
    message.value = ''
    try {
        await auth.loginWithGoogle(response.credential)
        messageType.value = 'success'
        message.value = 'Login Google berhasil!'
        setTimeout(() => router.push('/dashboard'), 1000)
    } catch (e: any) {
        messageType.value = 'error'
        message.value = e.message || 'Google Auth gagal. Akun mungkin belum terdaftar di tim.'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    if (typeof window !== 'undefined' && (window as any).google) {
        (window as any).google.accounts.id.initialize({
            client_id: config.public.googleClientId,
            callback: handleGoogleCredentialResponse
        });
        
        // Render tombol Google standar di div tersembunyi untuk dipicu atau gunakan One Tap
        (window as any).google.accounts.id.renderButton(
            document.getElementById('google-btn-hidden'),
            { theme: 'outline', size: 'large', width: '400' }
        );
    }
})

const loginWithGoogle = () => {
    // Memberikan instruksi ke user atau memicu One Tap prompt
    (window as any).google.accounts.id.prompt(); 
    
    // Atau jika user klik tombol kustom kita, kita bisa coba memicu klik pada tombol Google tersembunyi
    const hiddenBtn = document.querySelector('#google-btn-hidden [role="button"]') as HTMLElement
    if (hiddenBtn) {
        hiddenBtn.click()
    } else {
        messageType.value = 'success'
        message.value = 'Membuka jendela masuk Google...'
    }
}

useSeoMeta({
  title: 'Masuk — Presenly',
  description: 'Masuk ke akun Presenly untuk mengelola absensi biometrik tim Anda.'
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
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    background: #fff;
}

/* ── LEFT PANEL ── */
.auth-left {
    position: relative;
    flex: 0 0 48%;
    background: linear-gradient(145deg, #EEF2FF 0%, #dce6ff 60%, #c7d7ff 100%);
    display: flex;
    flex-direction: column;
    padding: 2.5rem 3rem;
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

.face-card {
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    height: 320px;
    width: 200px;
    background: #c5d4f5;
    box-shadow: 0 16px 40px rgba(59, 107, 246, 0.25);
    z-index: 2;
}

.face-card.center {
    animation: float2 5s ease-in-out infinite;
}

.face-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.face-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.mesh-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
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
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
}

/* ── RIGHT PANEL ── */
.auth-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 2rem;
    background: #fff;
}

.form-card {
    width: 100%;
    max-width: 420px;
}

.form-header {
    margin-bottom: 2rem;
}

.form-title {
    font-family: 'Cabinet Grotesk', sans-serif;
    font-size: 1.9rem;
    font-weight: 800;
    color: #0F1117;
    letter-spacing: -0.03em;
    margin-bottom: 0.4rem;
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
    padding: 0.78rem 1rem;
    border-radius: 12px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
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
    margin: 1.4rem 0;
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
    gap: 1.1rem;
}

.field-group {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
}

.field-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
}

.field-label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.forgot-link {
    font-size: 0.78rem;
    color: #3B6BF6;
    font-weight: 600;
    text-decoration: none;
    transition: opacity 0.15s;
}

.forgot-link:hover {
    opacity: 0.75;
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
    padding: 0.75rem 0.9rem 0.75rem 2.7rem;
    border-radius: 12px;
    border: 1.5px solid #e2e8f0;
    background: #f9fbff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
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

/* Submit */
.btn-submit {
    width: 100%;
    padding: 0.85rem;
    border-radius: 12px;
    background: #3B6BF6;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
    margin-top: 0.4rem;
    transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
}

.btn-submit:hover:not(:disabled) {
    background: #2a57e0;
    box-shadow: 0 4px 20px rgba(59, 107, 246, 0.35);
    transform: translateY(-1px);
}

.btn-submit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
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
    margin-top: 1rem;
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

@media (max-width: 768px) {
    .auth-root {
        flex-direction: column;
    }

    .auth-left {
        flex: none;
        padding: 1.8rem 1.5rem 2rem;
        min-height: auto;
    }

    .scanner-deco {
        display: none;
    }

    .mini-stats {
        flex-wrap: wrap;
    }

    .auth-right {
        padding: 2rem 1.25rem 3rem;
    }

    .form-card {
        max-width: 100%;
    }
}
</style>
