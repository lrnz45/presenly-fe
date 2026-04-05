<template>
    <NuxtLayout name="dashboard">
        <div class="max-w-6xl mx-auto py-2">
            <div class="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4 px-2">
                <div class="max-w-2xl">
                    <div class="flex items-center gap-3 mb-2">
                        <div>
                            <h1 class="font-display text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                                Pendaftaran Wajah</h1>
                            <p class="text-[0.82rem] text-slate-500 font-medium mt-0.5">User: <strong
                                    class="text-slate-700">{{ employeeName }}</strong> — 8 sampel, auto-capture saat
                                posisi benar
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <div
                        class="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-sm text-[0.75rem] font-bold text-slate-500">
                        <span class="w-2 h-2 rounded-full"
                            :class="cameraActive ? 'bg-green-500 animate-pulse' : 'bg-slate-300'"></span>
                        {{ cameraActive ? 'Kamera Aktif' : 'Kamera Off' }}
                    </div>
                </div>
            </div>

            <div class="enroll-body">
                <div class="flex flex-col gap-3">

                    <div class="viewfinder"
                        :class="{ scanning: isCapturing, success: enrollComplete, 'pose-ok': poseValid && !isCapturing && !enrollComplete }">
                        <video ref="videoEl" autoplay playsinline muted class="cam-video"
                            :class="{ hidden: !cameraActive }"></video>
                        <canvas ref="canvasEl" class="cam-canvas" :class="{ hidden: !cameraActive }"></canvas>

                        <div v-if="!cameraActive" class="cam-placeholder">
                            <div class="placeholder-inner">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="1.5" width="48"
                                    height="48">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                                <p class="text-slate-500 text-sm font-semibold mt-3">Klik "Aktifkan Kamera" untuk mulai
                                </p>
                            </div>
                        </div>

                        <svg v-if="cameraActive" class="bracket-svg" viewBox="0 0 400 300" fill="none">
                            <rect x="80" y="30" width="240" height="240" rx="8"
                                :stroke="poseValid ? '#22c55e' : '#3B6BF6'" stroke-width="1.5" stroke-dasharray="6 8"
                                opacity="0.6" />
                            <path d="M80 60 L80 30 L110 30" :stroke="poseValid ? '#22c55e' : '#3B6BF6'"
                                stroke-width="2.5" stroke-linecap="round" />
                            <path d="M320 60 L320 30 L290 30" :stroke="poseValid ? '#22c55e' : '#3B6BF6'"
                                stroke-width="2.5" stroke-linecap="round" />
                            <path d="M80 240 L80 270 L110 270" :stroke="poseValid ? '#22c55e' : '#3B6BF6'"
                                stroke-width="2.5" stroke-linecap="round" />
                            <path d="M320 240 L320 270 L290 270" :stroke="poseValid ? '#22c55e' : '#3B6BF6'"
                                stroke-width="2.5" stroke-linecap="round" />
                            <circle cx="200" cy="150" r="68" :stroke="poseValid ? '#22c55e' : '#3B6BF6'"
                                stroke-width="1" stroke-dasharray="4 6" opacity="0.4" />
                        </svg>

                        <transition name="fade">
                            <div class="countdown-wrap"
                                v-if="poseValid && !isCapturing && !enrollComplete && cameraActive">
                                <svg class="countdown-svg" viewBox="0 0 64 64">
                                    <circle cx="32" cy="32" r="26" stroke="rgba(34,197,94,0.2)" stroke-width="5"
                                        fill="none" />
                                    <circle cx="32" cy="32" r="26" stroke="#22c55e" stroke-width="5" fill="none"
                                        stroke-linecap="round" :stroke-dasharray="`${163 * countdownProgress} 163`"
                                        transform="rotate(-90 32 32)"
                                        style="transition: stroke-dasharray 0.1s linear" />
                                    <text x="32" y="37" text-anchor="middle" font-size="16" font-weight="800"
                                        fill="#22c55e" font-family="sans-serif">{{ countdownSec }}</text>
                                </svg>
                            </div>
                        </transition>

                        <div class="success-flash" v-if="flashVisible"></div>

                        <transition name="slide-badge">
                            <div class="pose-badge" :class="poseBadgeClass" v-if="cameraActive && !enrollComplete">
                                <span class="face-dot"></span>
                                {{ poseBadgeText }}
                            </div>
                        </transition>

                        <div class="pose-hints" v-if="cameraActive && faceDetected && !poseValid && !enrollComplete">
                            <span v-if="poseHints.turnLeft" class="hint-arrow">← Toleh kiri</span>
                            <span v-if="poseHints.turnRight" class="hint-arrow">Toleh kanan →</span>
                            <span v-if="poseHints.lookStraight" class="hint-arrow">↕ Hadap lurus</span>
                            <span v-if="poseHints.chinUp" class="hint-arrow">↑ Angkat dagu</span>
                            <span v-if="poseHints.chinDown" class="hint-arrow">↓ Turunkan dagu</span>
                        </div>

                        <div class="cam-status" :class="statusClass">
                            <span class="status-dot"></span>
                            {{ statusText }}
                        </div>
                    </div>

                    <div class="instr-box" v-if="cameraActive" :class="{ 'instr-ok': poseValid && !enrollComplete }">
                        <div class="instr-step-num" :class="{ 'num-ok': poseValid && !enrollComplete }">
                            {{ enrollComplete ? '✓' : capturedCount + 1 }}
                        </div>
                        <div class="instr-content">
                            <p class="instr-label">
                                Langkah {{ Math.min(capturedCount + 1, TOTAL_SAMPLES) }} dari {{ TOTAL_SAMPLES }}
                                <span v-if="poseValid && !enrollComplete" class="instr-ready-tag">✓ Posisi tepat —
                                    menghitung...</span>
                            </p>
                            <p class="instr-text">{{ currentInstruction }}</p>
                        </div>
                    </div>

                    <div class="flex gap-3">
                        <button v-if="!cameraActive" class="btn-primary flex-1" @click="startCamera">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18"
                                height="18">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                            Aktifkan Kamera
                        </button>
                        <button v-if="cameraActive && !enrollComplete" class="btn-ghost flex-1" @click="stopCamera">
                            Hentikan Kamera
                        </button>
                    </div>
                </div>

                <div class="prog-panel">
                    <div class="prog-card">
                        <h3 class="prog-title font-display">Progress Pendaftaran</h3>

                        <div class="ring-wrap">
                            <svg viewBox="0 0 120 120" class="ring-svg">
                                <circle cx="60" cy="60" r="50" stroke="#f1f5f9" stroke-width="9" fill="none" />
                                <circle cx="60" cy="60" r="50" :stroke="enrollComplete ? '#22c55e' : '#3B6BF6'"
                                    stroke-width="9" fill="none" stroke-linecap="round"
                                    :stroke-dasharray="`${314 * capturedCount / TOTAL_SAMPLES} 314`"
                                    transform="rotate(-90 60 60)"
                                    style="transition: stroke-dasharray 0.5s ease, stroke 0.4s" />
                                <text x="60" y="56" text-anchor="middle" font-size="20" font-weight="800" fill="#111827"
                                    font-family="sans-serif">{{ capturedCount }}/{{ TOTAL_SAMPLES }}</text>
                                <text x="60" y="72" text-anchor="middle" font-size="10" fill="#9ca3af"
                                    font-family="sans-serif">sampel</text>
                            </svg>
                            <p class="ring-pct">{{ Math.round(capturedCount / TOTAL_SAMPLES * 100) }}% selesai</p>
                        </div>

                        <div>
                            <p class="sec-label">Sampel Wajah</p>
                            <div class="thumb-grid">
                                <div v-for="i in TOTAL_SAMPLES" :key="i" class="thumb-item"
                                    :class="{ got: capturedCount >= i }">
                                    <img v-if="capturedCount >= i && thumbnails[i - 1]" :src="thumbnails[i - 1]"
                                        class="thumb-img" alt="sample" />
                                    <svg v-else-if="capturedCount >= i" viewBox="0 0 24 24" fill="none" stroke="#22c55e"
                                        stroke-width="2" width="16" height="16">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span v-else class="thumb-num">{{ i }}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p class="sec-label">Petunjuk Pengambilan</p>
                            <div class="steps-wrap">
                                <div v-for="(step, i) in steps" :key="i" class="step-row"
                                    :class="{ done: capturedCount > i, active: capturedCount === i }">
                                    <div class="step-bul">
                                        <svg v-if="capturedCount > i" viewBox="0 0 16 16" fill="none" width="9"
                                            height="9">
                                            <path d="M3 8l3 3 7-6" stroke="#fff" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                        <span v-else>{{ i + 1 }}</span>
                                    </div>
                                    <p class="step-txt">{{ step }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100" v-if="!enrollComplete">
                            <p class="text-xs text-blue-800 font-medium text-center">
                                Data otomatis disimpan ke server setiap kali satu wajah berhasil di-capture.
                            </p>
                        </div>

                        <div class="mt-4 p-4 bg-green-50 rounded-xl border border-green-100" v-else>
                            <p class="text-sm text-green-800 font-bold text-center">
                                ✅ Pendaftaran Selesai!
                            </p>
                            <button @click="router.push('/dashboard/pegawai')"
                                class="w-full mt-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold transition-colors">
                                Kembali ke Data User
                            </button>
                        </div>

                    </div>

                    <div v-if="errorMsg" class="alert-box error-box mt-4">
                        <svg viewBox="0 0 20 20" fill="none" stroke="#b91c1c" stroke-width="1.8" width="16" height="16"
                            class="shrink-0">
                            <circle cx="10" cy="10" r="8" />
                            <path d="M10 6v4M10 14h.01" stroke-linecap="round" />
                        </svg>
                        {{ errorMsg }}
                    </div>
                    <div v-if="modelLoading" class="alert-box info-box mt-4">
                        <svg class="spin shrink-0" viewBox="0 0 24 24" fill="none" stroke="#3B6BF6" stroke-width="2"
                            width="16" height="16">
                            <path stroke-linecap="round" d="M12 3a9 9 0 100 18A9 9 0 0012 3z" opacity=".3" />
                            <path stroke-linecap="round" d="M12 3a9 9 0 019 9" />
                        </svg>
                        Memuat model AI wajah... harap tunggu.
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getStaffMemberById } from '~/data/seed'

const config = useRuntimeConfig()
const token = useCookie<string | null>('auth-token')

const TOTAL_SAMPLES = 8
const HOLD_DURATION = 1500  // ms pose harus ditahan sebelum auto-capture

const videoEl = ref(null)
const canvasEl = ref(null)
const router = useRouter()
const route = useRoute()

const employeeName = ref('Pegawai')

onMounted(async () => {
    // 1. Fetch employee name
    try {
        const data = await $fetch<{ name: string }>(`${config.public.apiBase}/tenant/employees/${route.params.id}`, {
            headers: { Authorization: `Bearer ${token.value}` }
        })
        employeeName.value = data.name
    } catch { /* ignored */ }

    // 2. Pre-load Human model in background
    await initHuman()
})
const cameraActive = ref(false)
const isCapturing = ref(false) // Dipakai juga untuk flag saat sedang mengirim API
const flashVisible = ref(false)
const faceDetected = ref(false)
const modelLoading = ref(false)
const capturedCount = ref(0)
const thumbnails = ref<string[]>([])
const enrollComplete = ref(false)
const errorMsg = ref('')
const isModelLoaded = ref(false)

// Pose state
const poseValid = ref(false)
const poseHints = ref({
    turnLeft: false, turnRight: false,
    chinUp: false, chinDown: false,
    lookStraight: false, smile: false, noSmile: false
})
const currentYaw = ref(0)
const currentPitch = ref(0)

// Countdown
const countdownProgress = ref(0)
const countdownSec = ref(Math.ceil(HOLD_DURATION / 1000))

let humanInstance: any = null
let detectInterval: any = null
let holdStart: number | null = null
let holdTimer: any = null
let justCaptured = false

const steps = [
    'Lurus, ekspresi netral',
    'Lurus, senyum natural',
    'Toleh kiri ~20°',
    'Toleh kanan ~20°',
    'Angkat dagu sedikit',
    'Turunkan dagu sedikit',
    'Pakai aksesori / ekspresi serius',
    'Lurus netral — geser ke cahaya berbeda',
]

const instructions = [
    'Hadap lurus ke kamera, wajah penuh, ekspresi netral dan rileks.',
    'Tetap hadap lurus, rileks — seperti menyapa teman.',
    'Tetap natural, toleh perlahan ke kiri sekitar 20 derajat.',
    'Sekarang toleh ke kanan sekitar 20 derajat.',
    'Hadap lurus, angkat dagu sedikit ke atas.',
    'Hadap lurus, turunkan dagu sedikit ke bawah.',
    'Tetap hadap depan, berikan ekspresi serius atau rileks.',
    'Geser sedikit ke samping agar cahaya berbeda — lalu hadap lurus kembali.',
]

const sampleTypes = ['FRONTAL_NEUTRAL', 'FRONTAL_SMILE', 'LEFT', 'RIGHT', 'CHIN_UP', 'CHIN_DOWN', 'ACCESSORY', 'LIGHT_VAR']

const STEP_RULES = [
    { yawMin: -12, yawMax: 12, pitchMin: -12, pitchMax: 12, smileMax: null, smileMin: null }, // 0: netral
    { yawMin: -12, yawMax: 12, pitchMin: -12, pitchMax: 12, smileMin: null, smileMax: null }, // 1: hadap depan natural
    { yawMin: 15, yawMax: 45, pitchMin: -15, pitchMax: 15, smileMin: null, smileMax: null }, // 2: kiri
    { yawMin: -45, yawMax: -15, pitchMin: -15, pitchMax: 15, smileMin: null, smileMax: null }, // 3: kanan
    { yawMin: -15, yawMax: 15, pitchMin: 10, pitchMax: 40, smileMin: null, smileMax: null }, // 4: dagu naik
    { yawMin: -15, yawMax: 15, pitchMin: -40, pitchMax: -8, smileMin: null, smileMax: null }, // 5: dagu turun
    { yawMin: -15, yawMax: 15, pitchMin: -15, pitchMax: 15, smileMax: null, smileMin: null }, // 6: hadap depan
    { yawMin: -20, yawMax: 20, pitchMin: -20, pitchMax: 20, smileMin: null, smileMax: null }, // 7: cahaya beda
]

function toDeg(rad: number) {
    return rad * (180 / Math.PI)
}

function checkPose(yaw: number, pitch: number, smileScore: number, stepIdx: number) {
    if (stepIdx >= TOTAL_SAMPLES) return true
    const r = STEP_RULES[stepIdx]
    const yawOk = yaw >= r.yawMin && yaw <= r.yawMax
    const pitchOk = pitch >= r.pitchMin && pitch <= r.pitchMax
    const smileOk = (r.smileMin == null || smileScore >= r.smileMin)
        && (r.smileMax == null || smileScore <= r.smileMax)
    return yawOk && pitchOk && smileOk
}

function buildHints(yaw: number, pitch: number, smileScore: number, stepIdx: number) {
    if (stepIdx >= TOTAL_SAMPLES) return {}
    const r = STEP_RULES[stepIdx]
    return {
        turnLeft: r.yawMin > 10 && yaw < r.yawMin,
        turnRight: r.yawMax < -10 && yaw > r.yawMax,
        lookStraight: r.yawMin >= -12 && r.yawMax <= 12 && Math.abs(yaw) > 12,
        chinUp: r.pitchMin > 5 && pitch < r.pitchMin,
        chinDown: r.pitchMax < -5 && pitch > r.pitchMax,
        smile: r.smileMin != null && smileScore < r.smileMin,
        noSmile: r.smileMax != null && smileScore > r.smileMax,
    }
}

// ── Computed ──
const currentInstruction = computed(() =>
    capturedCount.value >= TOTAL_SAMPLES
        ? '✅ Semua sampel berhasil diambil.'
        : instructions[capturedCount.value]
)

const statusText = computed(() => {
    if (enrollComplete.value) return 'Pendaftaran Lengkap'
    if (isCapturing.value) return 'Mengunggah ke server...'
    if (!cameraActive.value) return 'Kamera belum aktif'
    if (!faceDetected.value) return 'Tidak ada wajah — arahkan wajah ke kamera'
    if (poseValid.value) return '✓ Posisi benar — tahan sebentar...'
    return `Sesuaikan posisi untuk sampel ${capturedCount.value + 1}`
})

const statusClass = computed(() => {
    if (enrollComplete.value) return 'status-success'
    if (isCapturing.value) return 'status-scanning'
    if (poseValid.value) return 'status-pose-ok'
    if (faceDetected.value) return 'status-ready'
    return 'status-warn'
})

const poseBadgeClass = computed(() => {
    if (!faceDetected.value) return 'badge-miss'
    if (poseValid.value) return 'badge-ok'
    return 'badge-warn'
})

const poseBadgeText = computed(() => {
    if (!faceDetected.value) return 'Arahkan wajah ke kamera'
    if (poseValid.value) return '✓ Posisi benar'
    return 'Sesuaikan posisi'
})

// ── Human.js ──
async function initHuman() {
    if (humanInstance) return
    modelLoading.value = true
    try {
        const { Human } = await import('@vladmandic/human')
        humanInstance = new Human({
            modelBasePath: '/models/',
            face: {
                enabled: true,
                detector: { enabled: true, rotation: true },
                mesh: { enabled: true },
                iris: { enabled: false },

                description: { enabled: true }, // WAJIB TRUE untuk memuat faceres
                emotion: { enabled: false }, // MATIKAN karena model tidak ada di /public/models
                // ────────────────────────
                antispoof: { enabled: false },
                liveness: { enabled: false },
            },
            // Matikan modul lain untuk performa maksimal di Kiosk
            body: { enabled: false },
            hand: { enabled: false },
            object: { enabled: false },
            gesture: { enabled: false },
        })
        await humanInstance.load()
        isModelLoaded.value = true
        console.log('AI Model Loaded:', Object.keys(humanInstance.models.models))
    } catch (e: any) {
        errorMsg.value = 'Gagal memuat model AI: ' + e.message
    } finally {
        modelLoading.value = false
    }
}

// ── Detect loop ──
function startDetectLoop() {
    detectInterval = setInterval(async () => {
        if (!cameraActive.value || isCapturing.value || enrollComplete.value || !isModelLoaded.value || !videoEl.value) return
        
        const video = videoEl.value as HTMLVideoElement
        // Safeguard: Ensure video is actually streaming data
        if (video.readyState < 2 || video.videoWidth === 0) return

        try {
            const result = await humanInstance.detect(video, { async: true })
            const faces = result?.face || []
            faceDetected.value = faces.length > 0

            if (!faceDetected.value) {
                poseValid.value = false
                resetHold()
                justCaptured = false
                poseHints.value = {
                    turnLeft: false, turnRight: false, chinUp: false, chinDown: false,
                    lookStraight: false, smile: false, noSmile: false
                }
                clearCanvas()
                return
            }

            const face = faces[0]
            const angle = face.rotation?.angle
            const yaw = angle?.yaw != null ? toDeg(angle.yaw) : 0
            const pitch = angle?.pitch != null ? toDeg(angle.pitch) : 0
            currentYaw.value = Math.round(yaw)
            currentPitch.value = Math.round(pitch)

            const emotions = face.emotion || []
            const happyEntry = emotions.length > 0 ? emotions.find((e: any) => e.emotion === 'happy') : null
            const smileScore = happyEntry ? happyEntry.score : 0

            const step = capturedCount.value
            const valid = checkPose(yaw, pitch, smileScore, step)
            poseHints.value = buildHints(yaw, pitch, smileScore, step)

            drawBox(face, valid)

            if (valid && !poseValid.value && !justCaptured) {
                poseValid.value = true
                startHold()
            } else if (!valid) {
                if (poseValid.value) {
                    poseValid.value = false
                    resetHold()
                }
                justCaptured = false 
            }

            if (poseValid.value && holdStart != null) {
                const elapsed = performance.now() - holdStart
                countdownProgress.value = Math.min(elapsed / HOLD_DURATION, 1)
                countdownSec.value = Math.max(1, Math.ceil((HOLD_DURATION - elapsed) / 1000))
            }
        } catch (err: any) { 
            console.warn('[Human Detect Wait]', err.message)
        }
    }, 150) // Slightly faster loop
}

async function captureFrame() {
    if (capturedCount.value >= TOTAL_SAMPLES || isCapturing.value) return

    isCapturing.value = true
    poseValid.value = false
    justCaptured = true
    resetHold()
    errorMsg.value = ''

    try {
        const video = videoEl.value as unknown as HTMLVideoElement
        if (video.readyState < 2 || video.videoWidth === 0) {
            isCapturing.value = false
            return
        }
        const result = await humanInstance.detect(video)

        if (!result.face || result.face.length === 0) {
            errorMsg.value = 'Wajah tidak terdeteksi saat capture. Coba lagi.'
            justCaptured = false
            isCapturing.value = false
            return
        }

        const face = result.face[0]
        console.log('=== FACE FIELDS ===')
        console.log('embedding:', face.embedding?.length, face.embedding?.slice(0, 3))
        console.log('descriptor:', face.descriptor?.length, face.descriptor?.slice(0, 3))
        console.log('description:', face.description)
        console.log('tensor:', face.tensor?.shape)
        console.log('all keys:', Object.keys(face))

        // Coba semua kemungkinan field
        const embedding = face.embedding?.length > 0 ? face.embedding
            : face.descriptor?.length > 0 ? face.descriptor
                : face.description?.descriptor?.length > 0 ? face.description.descriptor
                    : null

        if (!embedding || embedding.length < 64) {
            errorMsg.value = `Embedding gagal (len: ${embedding?.length ?? 0}). Coba lagi.`
            justCaptured = false
            isCapturing.value = false
            return
        }

        console.log('✅ Embedding OK — length:', embedding.length, '| sample:', Array.from(embedding).slice(0, 3))

        // Thumbnail
        const thumb = document.createElement('canvas')
        thumb.width = 80; thumb.height = 80
        const tctx = thumb.getContext('2d')
        let base64Image = null; // <-- Siapkan variabel penampung gambar

        if (tctx) {
            if (face.box) {
                const [bx, by, bw, bh] = face.box
                tctx.drawImage(video, bx, by, bw, bh, 0, 0, 80, 80)
            } else {
                tctx.drawImage(video, 0, 0, 80, 80)
            }

            base64Image = thumb.toDataURL('image/jpeg', 0.8); // <-- Ekstrak ke Base64
            thumbnails.value.push(base64Image)
        }

        const currentIndex = capturedCount.value
        const payloadData = {
            sample: {
                embedding: Array.from(embedding),
                score: face.faceScore || face.score || 0,
                sample_type: sampleTypes[currentIndex],
                yaw: currentYaw.value,
                pitch: currentPitch.value,
                image: base64Image,
            },
            sampleIndex: currentIndex + 1,
            isFirst: currentIndex === 0,
            isLast: currentIndex === (TOTAL_SAMPLES - 1)
        }

        await $fetch(`${config.public.apiBase}/tenant/employees/${route.params.id}/face-samples-single`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token.value}` },
            body: payloadData
        })

        flashVisible.value = true
        await new Promise(r => setTimeout(r, 220))
        flashVisible.value = false

        capturedCount.value++

        if (capturedCount.value >= TOTAL_SAMPLES) {
            enrollComplete.value = true
            stopCamera()
            return
        }

        setTimeout(() => { justCaptured = false }, 2000)

    } catch (e: any) {
        console.error('captureFrame error:', e)
        errorMsg.value = 'Gagal mengunggah sampel: ' + (e.data?.message || e.message)
        justCaptured = false
    } finally {
        isCapturing.value = false
    }
}

function drawBox(face: any, valid: boolean) {
    if (!canvasEl.value || !videoEl.value) return
    const canvas = canvasEl.value as HTMLCanvasElement
    const video = videoEl.value as HTMLVideoElement
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (face.box) {
        const [x, y, w, h] = face.box
        ctx.strokeStyle = valid ? '#22c55e' : '#3B6BF6'
        ctx.lineWidth = 2
        ctx.shadowColor = valid ? '#22c55e' : '#3B6BF6'
        ctx.shadowBlur = valid ? 10 : 4
        ctx.strokeRect(x, y, w, h)
        ctx.shadowBlur = 0
        ctx.fillStyle = valid ? '#22c55e' : '#3B6BF6'
        ctx.fillRect(x, y - 20, 124, 20)
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 11px DM Sans, sans-serif'
        ctx.fillText(`Y:${Math.round(currentYaw.value)}° P:${Math.round(currentPitch.value)}°`, x + 4, y - 5)
    }
}

function clearCanvas() {
    if (!canvasEl.value) return
    const canvas = canvasEl.value as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// ── Hold countdown ──
function startHold() {
    holdStart = performance.now()
    countdownProgress.value = 0
    countdownSec.value = Math.ceil(HOLD_DURATION / 1000)
    holdTimer = setTimeout(() => {
        if (poseValid.value && !isCapturing.value && !enrollComplete.value) {
            captureFrame()
        }
    }, HOLD_DURATION)
}

function resetHold() {
    if (holdTimer) { clearTimeout(holdTimer); holdTimer = null }
    holdStart = null
    countdownProgress.value = 0
    countdownSec.value = Math.ceil(HOLD_DURATION / 1000)
}

// ── Camera ──
async function startCamera() {
    errorMsg.value = ''
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480, facingMode: 'user' },
            audio: false
        })
        if (videoEl.value) {
            (videoEl.value as HTMLVideoElement).srcObject = stream
        }
        cameraActive.value = true
        await nextTick()
        
        // Wait for model if not yet loaded
        if (!isModelLoaded.value) {
            await initHuman()
        }
        
        startDetectLoop()
    } catch (e: any) {
        errorMsg.value = 'Gagal mengakses kamera: ' + e.message
    }
}

function stopCamera() {
    if (detectInterval) { clearInterval(detectInterval); detectInterval = null }
    resetHold()
    if (videoEl.value) {
        const video = videoEl.value as HTMLVideoElement
        if (video.srcObject) {
            (video.srcObject as MediaStream).getTracks().forEach(t => t.stop())
            video.srcObject = null
        }
    }
    cameraActive.value = false
    faceDetected.value = false
    poseValid.value = false
}

onBeforeUnmount(() => { stopCamera() })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@900&display=swap');

* {
    box-sizing: border-box;
}

.font-display {
    font-family: 'Cabinet Grotesk', sans-serif;
}

.enroll-body {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 1.5rem;
    padding: 0 0.5rem;
    align-items: start;
}

.viewfinder {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    border: 2px solid #e5e7eb;
    background: #0f1117;
    transition: border-color 0.3s, box-shadow 0.3s;
    aspect-ratio: 4/3;
}

.viewfinder.scanning {
    border-color: #3B6BF6;
    box-shadow: 0 0 0 3px #3B6BF628;
}

.viewfinder.success {
    border-color: #22c55e;
    box-shadow: 0 0 0 3px #22c55e28;
}

.viewfinder.pose-ok {
    border-color: #22c55e;
    box-shadow: 0 0 24px rgba(34, 197, 94, 0.35);
}

.cam-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
    display: block;
}

.cam-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
    pointer-events: none;
}

.hidden {
    display: none !important;
}

.cam-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111827;
}

.placeholder-inner {
    text-align: center;
}

.bracket-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

/* Countdown */
.countdown-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 10;
}

.countdown-svg {
    width: 72px;
    height: 72px;
    filter: drop-shadow(0 0 14px rgba(34, 197, 94, 0.7));
}

/* Flash */
.success-flash {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.6);
    animation: flash 0.25s ease;
}

@keyframes flash {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

/* Pose badge */
.pose-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.75rem;
    border-radius: 99px;
    font-size: 0.72rem;
    font-weight: 700;
    backdrop-filter: blur(8px);
    border: 1px solid transparent;
    transition: all 0.25s;
}

.badge-ok {
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
    border-color: rgba(34, 197, 94, 0.3);
}

.badge-warn {
    background: rgba(245, 158, 11, 0.15);
    color: #f59e0b;
    border-color: rgba(245, 158, 11, 0.3);
}

.badge-miss {
    background: rgba(239, 68, 68, 0.12);
    color: #ef4444;
    border-color: rgba(239, 68, 68, 0.25);
}

.face-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
}

/* Pose hints */
.pose-hints {
    position: absolute;
    bottom: 48px;
    left: 0;
    right: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.4rem;
    padding: 0 0.75rem;
    pointer-events: none;
}

.hint-arrow {
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(6px);
    color: #fcd34d;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.2rem 0.6rem;
    border-radius: 99px;
    border: 1px solid rgba(252, 211, 77, 0.3);
}

/* Status bar */
.cam-status {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.55rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(6px);
    color: #fff;
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #9ca3af;
    flex-shrink: 0;
}

.status-scanning .status-dot {
    background: #3B6BF6;
    animation: blink 0.8s ease infinite;
}

.status-success .status-dot {
    background: #22c55e;
}

.status-pose-ok .status-dot {
    background: #22c55e;
    animation: blink 0.6s ease infinite;
}

.status-ready .status-dot {
    background: #f59e0b;
}

.status-warn .status-dot {
    background: #ef4444;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.3;
    }
}

/* Instruction box */
.instr-box {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    background: #fff;
    border-radius: 14px;
    padding: 0.85rem 1.1rem;
    border: 1.5px solid #e5e7eb;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
    transition: border-color 0.3s, box-shadow 0.3s;
}

.instr-box.instr-ok {
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.12);
}

.instr-step-num {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, #3B6BF6, #6B8FF8);
    color: #fff;
    font-size: 1rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.3s;
}

.instr-step-num.num-ok {
    background: linear-gradient(135deg, #22c55e, #16a34a);
}

.instr-label {
    font-size: 0.67rem;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 0.1rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
}

.instr-ready-tag {
    background: #dcfce7;
    color: #16a34a;
    font-size: 0.6rem;
    font-weight: 700;
    padding: 0.1rem 0.45rem;
    border-radius: 99px;
    text-transform: none;
    letter-spacing: 0;
}

.instr-text {
    font-size: 0.83rem;
    color: #374151;
    font-weight: 500;
    line-height: 1.4;
}

/* Buttons */
.btn-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.78rem 1.25rem;
    background: linear-gradient(135deg, #0c1837, #1e3a8a);
    color: #fff;
    border: none;
    border-radius: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
}

.btn-primary:hover {
    opacity: 0.88;
    transform: translateY(-1px);
}

.btn-ghost {
    padding: 0.78rem 1.1rem;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    color: #374151;
    cursor: pointer;
    transition: background 0.15s;
}

.btn-ghost:hover {
    background: #f9fafb;
}

/* Progress panel */
.prog-panel {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.prog-card {
    background: #fff;
    border-radius: 20px;
    border: 1px solid #f0f0f5;
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
}

.prog-title {
    font-size: 1rem;
    font-weight: 800;
    color: #111827;
}

.ring-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
}

.ring-svg {
    width: 110px;
    height: 110px;
}

.ring-pct {
    font-size: 0.75rem;
    font-weight: 600;
    color: #a1a5ac;
}

.sec-label {
    font-size: 0.65rem;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 0.5rem;
}

.thumb-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.4rem;
}

.thumb-item {
    aspect-ratio: 1;
    border-radius: 9px;
    background: #f9fafb;
    border: 1.5px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.25s;
}

.thumb-item.got {
    border-color: #22c55e;
    background: #f0fdf4;
}

.thumb-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.thumb-num {
    font-size: 0.72rem;
    font-weight: 700;
    color: #d1d5db;
}

.steps-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
}

.step-row {
    display: flex;
    align-items: flex-start;
    gap: 0.55rem;
    opacity: 0.4;
    transition: opacity 0.25s;
}

.step-row.done,
.step-row.active {
    opacity: 1;
}

.step-bul {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.62rem;
    font-weight: 700;
    color: #a1a5ac;
    flex-shrink: 0;
    transition: background 0.25s;
}

.step-row.done .step-bul {
    background: #22c55e;
    color: #fff;
}

.step-row.active .step-bul {
    background: #3B6BF6;
    color: #fff;
}

.step-txt {
    font-size: 0.76rem;
    color: #374151;
    font-weight: 500;
    padding-top: 3px;
    line-height: 1.4;
}

.prog-note {
    font-size: 0.73rem;
    color: #9ca3af;
    text-align: center;
}

.alert-box {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    font-size: 0.78rem;
    font-weight: 500;
    line-height: 1.5;
}

.error-box {
    background: #fff1f2;
    border: 1px solid #fecaca;
    color: #b91c1c;
}

.info-box {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    color: #1d4ed8;
}

.spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-badge-enter-active,
.slide-badge-leave-active {
    transition: all 0.2s;
}

.slide-badge-enter-from,
.slide-badge-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

@media (max-width: 768px) {
    .enroll-body {
        grid-template-columns: 1fr;
    }
}
</style>