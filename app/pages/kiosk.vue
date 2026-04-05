<template>
    <div class="kiosk-root"
        :class="{ 'light-mode': !isDarkMode, success: scanResult === 'success', fail: scanResult === 'fail' }">

        <!-- ══ PIN MODAL (Centered pop up) ══ -->
        <transition name="fade-scale">
            <div class="pin-overlay" v-if="showPinModal" @click.self="showPinModal = false">
                <div class="pin-modal">
                    <div class="pin-icon-wrap">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#3B6BF6" stroke-width="2" width="28" height="28">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 class="pin-title font-display">Masukkan PIN Admin</h2>
                    <p class="pin-sub">Diperlukan untuk keluar dari Mode Kiosk</p>

                    <div class="pin-dots">
                        <div v-for="i in 6" :key="i" class="pin-dot"
                            :class="{ filled: pinInput.length >= i, error: pinError }"></div>
                    </div>

                    <div class="pin-numpad">
                        <button v-for="n in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="n" class="pin-key"
                            @click="addPin(n.toString())">{{ n }}</button>
                        <button class="pin-key pin-cancel" @click="showPinModal = false">Batal</button>
                        <button class="pin-key" @click="addPin('0')">0</button>
                        <button class="pin-key pin-del" @click="pinInput = pinInput.slice(0, -1)">⌫</button>
                    </div>
                    <p class="pin-err" v-if="pinError">❌ PIN salah. Coba lagi.</p>
                </div>
            </div>
        </transition>

        <!-- Sukses tidak lagi memblokir layar tengah, kita delegasikan ke kanan dan toast UI dalam kamera -->

        <!-- ══ MAIN LAYOUT ══ -->
        <div class="kiosk-layout">

            <!-- ─── LEFT PANEL: Detection Log ─── -->
            <div class="log-panel">
                <div class="log-header">
                    <span class="log-title">Riwayat Check-in</span>
                    <span class="log-count">{{ checkIns.length }} orang</span>
                </div>
                <div class="log-list">
                    <div v-if="checkIns.length === 0" class="log-empty">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="1.5" width="28" height="28">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>Belum ada absensi</p>
                    </div>
                    <div v-for="(c, i) in checkIns" :key="i" class="log-item" :class="{ new: i === 0 }">
                        <div class="log-avatar">
                            <img v-if="c.photoUrl" :src="c.photoUrl" class="avatar-img" />
                            <span v-else>{{ c.initials }}</span>
                        </div>
                        <div class="log-info">
                            <p class="log-name">{{ c.name }}</p>
                            <p class="log-role">{{ c.subtitle }}</p>
                        </div>
                        <div class="log-right">
                            <div class="flex flex-col items-end gap-1">
                                <p class="log-time">{{ c.timeDisplay }}</p>
                                <span class="scan-type-badge" :class="c.scanType === 'OUT' ? 'out' : 'in'">
                                    {{ c.scanType === 'OUT' ? 'Pulang' : 'Masuk' }}
                                </span>
                            </div>
                            <span v-if="c.punctualityLabel" class="log-badge" :class="c.punctualityLabel === 'Terlambat' ? 'late' : 'ok'">{{
                                c.punctualityLabel
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ─── CENTER: Viewfinder ─── -->
            <div class="center-col">
                <!-- Header bar -->
                <div class="kiosk-topbar">
                    <div class="scan-type-toggle">
                        <button class="type-btn" :class="{ active: scanType === 'IN' }"
                            @click="scanType = 'IN'">MASUK</button>
                        <button class="type-btn out" :class="{ active: scanType === 'OUT' }"
                            @click="scanType = 'OUT'">PULANG</button>
                    </div>
                    <div class="clock-wrap">
                        <p class="clock-time font-display">{{ currentTime }}</p>
                        <p class="clock-date">{{ currentDate }}</p>
                    </div>
                    <div class="flex gap-2">
                        <button class="mode-btn" @click="isDarkMode = !isDarkMode" title="Ganti Tema">
                            <svg v-if="!isDarkMode" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" width="14" height="14">
                                <path
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                width="14" height="14">
                                <path
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button class="exit-btn" @click="showPinModal = true" title="Keluar dari Mode Kiosk">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14"
                                height="14">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Keluar
                        </button>
                    </div>
                </div>

                <!-- Camera viewfinder -->
                <div class="viewfinder-wrap">
                    <div class="viewfinder" :class="{ scanning: isScanning, pulsing: faceDetected && !isScanning }">

                        <!-- Real camera -->
                        <video ref="videoEl" autoplay playsinline muted class="cam-video"
                            :class="{ hidden: !cameraActive }"></video>
                        <canvas ref="overlayCanvas" class="cam-canvas" :class="{ hidden: !cameraActive }"></canvas>

                        <!-- Placeholder -->
                        <div class="cam-placeholder" v-if="!cameraActive">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="1.5" width="52"
                                height="52">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                            <p>Kamera belum aktif</p>
                            <button class="start-cam-btn" @click="startCamera">Aktifkan Kamera</button>
                        </div>

                        <!-- Scan guide overlay SVG -->
                        <svg v-if="cameraActive" class="guide-svg" viewBox="0 0 640 480" fill="none"
                            preserveAspectRatio="xMidYMid meet">
                            <!-- Outer bracket -->
                            <path d="M150 100 L150 60 L200 60" stroke="#3B6BF6" stroke-width="3"
                                stroke-linecap="round" />
                            <path d="M490 100 L490 60 L440 60" stroke="#3B6BF6" stroke-width="3"
                                stroke-linecap="round" />
                            <path d="M150 380 L150 420 L200 420" stroke="#3B6BF6" stroke-width="3"
                                stroke-linecap="round" />
                            <path d="M490 380 L490 420 L440 420" stroke="#3B6BF6" stroke-width="3"
                                stroke-linecap="round" />
                            <!-- Face oval guide -->
                            <ellipse cx="320" cy="235" rx="130" ry="155" stroke="#3B6BF6" stroke-width="1"
                                stroke-dasharray="8 10" opacity="0.4" />
                        </svg>

                        <!-- Scan line -->
                        <div class="scan-line" v-if="isScanning"></div>

                        <!-- Flash on detect -->
                        <div class="flash" v-if="flashVisible"></div>

                        <!-- Fail Toast Alert inside Camera -->
                        <transition name="toast-pop">
                            <div class="fail-toast" v-if="scanResult === 'fail'">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20"
                                    height="20">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span>{{ errorMessage || 'Wajah Tidak Dikenali!' }}</span>
                            </div>
                        </transition>

                        <transition name="toast-pop">
                            <div class="success-toast" v-if="scanResult === 'success'">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20"
                                    height="20">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Pemindaian Berhasil</span>
                            </div>
                        </transition>

                        <transition name="toast-pop">
                            <div class="warn-toast" v-if="scanResult === 'duplicated'">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20"
                                    height="20">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{{ errorMessage }}</span>
                            </div>
                        </transition>

                        <!-- Face detection badge -->
                        <div class="face-pill" :class="faceDetected ? 'face-ok' : 'face-miss'"
                            v-if="cameraActive && !scanResult">
                            <span class="face-pill-dot"></span>
                            {{ faceDetected ? 'Wajah Terdeteksi' : 'Tidak Ada Wajah' }}
                        </div>

                        <!-- Live AI stats overlay (bottom bar) -->
                        <div class="stats-bar" v-if="cameraActive">
                            <div class="stat-item">
                                <span class="stat-dot" :class="statusDotClass"></span>
                                <span>{{ statusLabel }}</span>
                            </div>
                            <div class="stat-sep"></div>
                            <div class="stat-item" v-if="faceDetected">
                                <span class="stat-label">Conf</span>
                                <span class="stat-val" :class="confidenceClass">{{ confidencePct }}%</span>
                            </div>
                            <div class="stat-sep" v-if="faceDetected"></div>
                            <div class="stat-item" v-if="faceDetected">
                                <span class="stat-label">FPS</span>
                                <span class="stat-val">{{ fps }}</span>
                            </div>
                            <div class="stat-sep" v-if="faceGender"></div>
                            <div class="stat-item" v-if="faceGender">
                                <span class="stat-label">Gender</span>
                                <span class="stat-val">{{ faceGender }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Instruction -->
                    <div class="instr-row">
                        <div class="instr-step" :class="{ active: !faceDetected && !isScanning }">
                            <div class="instr-num">1</div>
                            <span>Posisikan wajah di tengah</span>
                        </div>
                        <div class="instr-arrow">→</div>
                        <div class="instr-step" :class="{ active: faceDetected && !isScanning }">
                            <div class="instr-num">2</div>
                            <span>Tahan posisi untuk scan</span>
                        </div>
                        <div class="instr-arrow">→</div>
                        <div class="instr-step" :class="{ active: isScanning }">
                            <div class="instr-num">3</div>
                            <span>Absensi tercatat otomatis</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ─── RIGHT PANEL: Last detected person ─── -->
            <div class="right-panel">
                <div class="rp-header">
                    <span class="rp-title">Terdeteksi Terakhir</span>
                    <div class="live-dot"><span></span> LIVE</div>
                </div>

                <div class="last-card" v-if="lastDetected">
                    <div class="last-avatar">
                        <img v-if="lastDetected.photoUrl" :src="lastDetected.photoUrl" class="avatar-img" />
                        <span v-else>{{ lastDetected.initials }}</span>
                    </div>
                    <h3 class="last-name font-display">{{ lastDetected.name }}</h3>
                    <p class="last-dept">{{ lastDetected.subtitle }}</p>
                    <div class="last-badges">
                        <span class="chip-time">{{ lastDetected.timeDisplay }}</span>
                        <span class="chip-status"
                            :class="lastDetected.punctualityLabel === 'Terlambat' ? 'chip-late' : 'chip-ok'">{{
                                lastDetected.punctualityLabel }}</span>
                    </div>
                    <div class="conf-row">
                        <span class="conf-label">Kemiripan</span>
                        <div class="conf-bar-wrap">
                            <div class="conf-bar" :style="{ width: (lastDetected.confidence ?? 0) + '%' }"></div>
                        </div>
                        <span class="conf-pct">{{ lastDetected.confidence ?? 0 }}%</span>
                    </div>
                </div>
                <div class="last-empty" v-else>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#334155" stroke-width="1.5" width="36" height="36">
                        <circle cx="12" cy="8" r="4" />
                        <path stroke-linecap="round" d="M4 20c0-4 3.58-7 8-7s8 3 8 7" />
                    </svg>
                    <p>Menunggu deteksi...</p>
                </div>

                <!-- Stats mini grid -->
                <!-- <div class="stat-grid">
                    <div class="stat-cell">
                        <p class="sc-val font-display">{{ todayCheckins }}</p>
                        <p class="sc-label">Hadir Hari Ini</p>
                    </div>
                    <div class="stat-cell">
                        <p class="sc-val font-display" style="color:#f59e0b">{{ todayLate }}</p>
                        <p class="sc-label">Terlambat</p>
                    </div>
                    <div class="stat-cell">
                        <p class="sc-val font-display" style="color:#22c55e">{{ todayRate }}%</p>
                        <p class="sc-label">Kehadiran</p>
                    </div>
                    <div class="stat-cell">
                        <p class="sc-val font-display" style="color:#94a3b8">{{ todayStats.missing }}</p>
                        <p class="sc-label">Belum Absen</p>
                    </div>
                </div> -->
            </div>
        </div>

        <!-- Admin PIN Modal -->
        <transition name="modal-fade">
            <div class="modal-overlay" v-if="showPinModal" @click.self="showPinModal = false; pinInput = ''">
                <div class="pin-modal" :class="{ 'shake-err': pinError }">
                    <div class="pm-header">
                        <div class="pm-icon" :class="{ 'verify-success': isPinVerified }">
                            <svg v-if="!isPinVerified" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0110 0v4" />
                            </svg>
                            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 class="font-display">{{ isPinVerified ? 'Berhasil Terverifikasi' : 'Otoritas Admin' }}</h3>
                        <p>{{ isPinVerified ? 'Pilih tindakan selanjutnya' : 'Masukkan PIN untuk keluar' }}</p>
                    </div>

                    <template v-if="!isPinVerified">
                        <div class="pin-dots">
                            <div v-for="i in 6" :key="i" class="dot" :class="{ filled: pinInput.length >= i }"></div>
                        </div>

                        <div class="pin-pad">
                            <button v-for="n in 9" :key="n" @click="addPin(n.toString())">{{ n }}</button>
                            <button class="pad-util" @click="pinInput = ''">C</button>
                            <button @click="addPin('0')">0</button>
                            <button class="pad-util" @click="pinInput = pinInput.slice(0, -1)">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20">
                                    <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2zM18 9l-6 6M12 9l6 6" />
                                </svg>
                            </button>
                        </div>
                    </template>

                    <div v-else class="pm-actions">
                        <button class="pm-btn primary" @click="handleExit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18">
                                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            KE DASHBOARD
                        </button>
                        <button class="pm-btn logout" @click="handleLogout">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                            </svg>
                            LOGOUT AKUN
                        </button>
                    </div>

                    <button class="pm-cancel" @click="showPinModal = false; pinInput = ''; isPinVerified = false">
                        BATAL
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useKiosk } from '~/composables/useKiosk'
import type { KioskCheckInLogEntry } from '~/types'

const videoEl = ref<HTMLVideoElement | null>(null)
const overlayCanvas = ref<HTMLCanvasElement | null>(null)
const router = useRouter()
const { identifyFace, logAttendance, verifyExitPin, getDailyStats, getNonce } = useKiosk()

let humanInstance: any = null
let lastFrameTime = performance.now()

// PIN State
const showPinModal = ref(false)
const pinInput = ref('')
const pinError = ref(false)

// Camera & detection
const cameraActive = ref(false)
const isScanning = ref(false)
const faceDetected = ref(false)
const flashVisible = ref(false)
const modelLoading = ref(false)
const scanCooldown = ref(false)
const scanType = ref<'IN' | 'OUT'>('IN')

// Live stats
const fps = ref(0)
const confidencePct = ref(0)
const faceGender = ref<string | null>(null)

// Result
const scanResult = ref<'success' | 'fail' | 'duplicated' | null>(null)
const errorMessage = ref('')
const lastDetected = ref<KioskCheckInLogEntry | null>(null)
const attendanceStatus = ref('Tepat Waktu')
const isPinVerified = ref(false)

const { logout } = useAuth()
const { getDailyRecords } = useAttendance()

// Theme
const isDarkMode = ref(false)

// Stats
const todayStats = ref({ total: 0, late: 0, rate: 0, missing: 0, employeeTotal: 0 })

// Log
const checkIns = ref<KioskCheckInLogEntry[]>([])

// Clock
const currentTime = ref('')
const currentDate = ref('')
let clockInterval: any = null
let detectInterval: any = null

// Computed
const todayCheckins = computed(() => todayStats.value.total)
const todayLate = computed(() => todayStats.value.late)
const todayRate = computed(() => todayStats.value.rate)
const todayMissing = computed(() => todayStats.value.missing)

const statusDotClass = computed(() => {
    if (isScanning.value) return 'dot-blue'
    if (faceDetected.value) return 'dot-green'
    return 'dot-gray'
})

const statusLabel = computed(() => {
    if (isScanning.value) return 'Mengidentifikasi...'
    if (faceDetected.value) return 'Wajah terdeteksi'
    return 'Menunggu wajah'
})

const confidenceClass = computed(() => {
    if (confidencePct.value >= 85) return 'val-green'
    if (confidencePct.value >= 60) return 'val-amber'
    return 'val-red'
})

// Methods
function updateClock() {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    currentDate.value = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

async function loadStats() {
    todayStats.value = await getDailyStats()
}

async function fetchTodayLogs() {
    try {
        const logs = await getDailyRecords(); // Dari useAttendance()
        checkIns.value = logs.map(l => {
            const st = (l as any).scanType || (l.checkOutDisplay ? 'OUT' : 'IN');
            return {
                id: l.id,
                name: l.staffName,
                subtitle: (l as any).subtitle || 'Staff',
                initials: l.staffName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
                timeDisplay: l.checkInDisplay || '--:--',
                scanType: st,
                punctualityLabel: st === 'OUT' ? '' : (l.status === 'T' ? 'Terlambat' : 'Tepat Waktu'),
                confidence: 100,
                photoUrl: (l as any).photoUrl
            } as KioskCheckInLogEntry;
        });
    } catch (e) {
        console.warn("Failed to fetch logs:", e);
    }
}

async function initHuman() {
    if (humanInstance) return
    modelLoading.value = true
    try {
        const { Human } = await import('@vladmandic/human')
        // Di KioskPage.vue — initHuman()
        humanInstance = new Human({
            modelBasePath: '/models/',
            face: {
                enabled: true,
                detector: { enabled: true, rotation: true },
                mesh: { enabled: true },
                iris: { enabled: false },

                // ─── PERBAIKAN DI SINI ───
                description: { enabled: true }, // WAJIB TRUE untuk memuat faceres
                // ────────────────────────

                emotion: { enabled: false }, // Matikan jika tidak mendesak untuk hemat RAM
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
        await humanInstance.warmup()
        console.log('Models:', Object.keys(humanInstance.models.models))
    } catch (e: any) {
        console.warn('Human init failed:', e.message)
    } finally {
        modelLoading.value = false
    }
}

async function triggerAutoScan(currentEmbedding: number[]) {
    if (isScanning.value || scanCooldown.value || !currentEmbedding?.length) return;

    isScanning.value = true;
    scanResult.value = null;

    try {
        const result = await identifyFace(currentEmbedding);

        // Periksa flag 'success' dari backend
        if (result && result.success) {
            // Catat Kehadiran
            errorMessage.value = '';
            let entry: KioskCheckInLogEntry;
            try {
                // Ambil nonce baru sebelum scan sesuai dokumentasi
                const nonce = await getNonce();
                entry = await logAttendance(result.employeeId, result.confidence, scanType.value, nonce);

                // Cek apakah backend mengabaikan scan karena duplikasi
                if (entry && entry.skip) {
                    errorMessage.value = `${result.name} Sudah Absen!`;
                    scanResult.value = 'duplicated';
                    return;
                }
            } catch (logErr) {
                console.error("Attendance Log Error:", logErr);
                errorMessage.value = 'Gagal mencatat absensi database';
                scanResult.value = 'fail';
                return;
            }

            const finalLog: KioskCheckInLogEntry = {
                ...entry,
                name: result.name,
                subtitle: result.subtitle || 'Staff',
                confidence: result.confidence,
                initials: result.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
            };

            lastDetected.value = finalLog;
            scanResult.value = 'success';

            flashVisible.value = true;
            setTimeout(() => { flashVisible.value = false }, 250);

            checkIns.value.unshift(finalLog);
            if (checkIns.value.length > 20) checkIns.value.pop();

            await loadStats();
            await fetchTodayLogs(); // Refresh history from backend
        } else {
            // Jika result.success === false
            errorMessage.value = 'Wajah tidak dikenali/tidak terdaftar';
            scanResult.value = 'fail';
        }
    } catch (err) {
        console.error("Scan Error:", err);
        scanResult.value = 'fail';
    } finally {
        isScanning.value = false;
        scanCooldown.value = true;
        setTimeout(() => {
            scanResult.value = null;
            scanCooldown.value = false;
        }, 4000);
    }
}

function startDetectLoop() {
    detectInterval = setInterval(async () => {
        if (!cameraActive.value || isScanning.value || scanCooldown.value || !humanInstance || !videoEl.value) return
        try {
            const now = performance.now()
            const result = await humanInstance.detect(videoEl.value, { async: true })
            fps.value = Math.round(1000 / (now - lastFrameTime))
            lastFrameTime = now

            const faces = result?.face || []
            faceDetected.value = faces.length > 0

            if (faceDetected.value) {
                const f = faces[0]
                confidencePct.value = Math.round((f.faceScore || f.score || 0) * 100)
                faceGender.value = f.gender === 'female' ? 'Wanita' : f.gender === 'male' ? 'Pria' : null

                if (overlayCanvas.value && videoEl.value) {
                    const canvas = overlayCanvas.value
                    const video = videoEl.value
                    canvas.width = video.videoWidth
                    canvas.height = video.videoHeight
                    const ctx = canvas.getContext('2d')
                    if (ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        if (f.box) {
                            const [x, y, w, h] = f.box
                            ctx.strokeStyle = '#3B6BF6'
                            ctx.lineWidth = 2
                            ctx.strokeRect(x, y, w, h)
                        }
                    }
                }

                if (confidencePct.value >= 60 && !scanCooldown.value) {
                    triggerAutoScan(f.embedding || f.descriptor || [])
                }
            } else {
                confidencePct.value = 0
                if (overlayCanvas.value) {
                    const ctx = overlayCanvas.value.getContext('2d')
                    if (ctx) ctx.clearRect(0, 0, overlayCanvas.value.width, overlayCanvas.value.height)
                }
            }
        } catch { /* silent */ }
    }, 400)
}

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480, facingMode: 'user' },
            audio: false
        })
        if (videoEl.value) videoEl.value.srcObject = stream
        cameraActive.value = true
        await nextTick()
        await initHuman()
        startDetectLoop()
    } catch (e: any) {
        console.warn('Camera error:', e.message)
    }
}

function stopCamera() {
    if (detectInterval) {
        clearInterval(detectInterval)
        detectInterval = null
    }
    const v = videoEl.value
    if (v?.srcObject) {
        (v.srcObject as MediaStream).getTracks().forEach(t => t.stop())
        v.srcObject = null
    }
    cameraActive.value = false
}

async function addPin(d: string) {
    if (isPinVerified.value) return
    if (pinInput.value.length >= 6) return
    pinInput.value += d
    if (pinInput.value.length === 6) {
        const ok = await verifyExitPin(pinInput.value)
        if (ok) {
            isPinVerified.value = true
        } else {
            pinError.value = true
            setTimeout(() => {
                pinInput.value = ''
                pinError.value = false
            }, 900)
        }
    }
}

function handleExit() {
    stopCamera()
    router.push('/dashboard')
}

async function handleLogout() {
    stopCamera()
    await logout()
}

function simulateScan(type: 'success' | 'fail') {
    if (type === 'success') {
        const entry: KioskCheckInLogEntry = {
            id: Date.now().toString(),
            name: 'Demo User',
            subtitle: 'Software Engineer',
            initials: 'DU',
            timeDisplay: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            punctualityLabel: 'Tepat Waktu',
            confidence: 95
        }
        lastDetected.value = entry
        checkIns.value.unshift(entry)
        scanResult.value = 'success'
        flashVisible.value = true
        setTimeout(() => flashVisible.value = false, 250)
    } else {
        scanResult.value = 'fail'
    }
    scanCooldown.value = true
    setTimeout(() => {
        scanResult.value = null
        scanCooldown.value = false
    }, 3500)
}

// Lifecycle
onMounted(() => {
    updateClock()
    clockInterval = setInterval(updateClock, 1000)
    startCamera()
    loadStats()
    fetchTodayLogs()
})

onBeforeUnmount(() => {
    clearInterval(clockInterval)
    stopCamera()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@900&display=swap');

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.font-display {
    font-family: 'Cabinet Grotesk', sans-serif;
}

/* ══ ROOT ══ */
.kiosk-root {
    width: 100vw;
    height: 100dvh;
    background: #080e1d;
    display: flex;
    flex-direction: column;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
    position: relative;
    transition: background 0.5s;
}

.kiosk-root.success {
    background: #021a12;
}

.kiosk-root.fail {
    background: #180808;
}

/* ══ PIN MODAL ══ */
.pin-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 300;
}

.pin-modal {
    background: #fff;
    border-radius: 28px;
    padding: 2rem 1.75rem;
    width: min(380px, 92vw);
    text-align: center;
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
    animation: slideUp 0.2s ease;
}

@keyframes slideUp {
    from {
        transform: translateY(24px);
        opacity: 0;
    }

    to {
        transform: none;
        opacity: 1;
    }
}

.pin-icon-wrap {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: #eff6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0.75rem;
}

.pin-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 0.25rem;
}

.pin-sub {
    font-size: 0.78rem;
    color: #9ca3af;
    margin-bottom: 1.25rem;
}

.pin-dots {
    display: flex;
    gap: 0.55rem;
    justify-content: center;
    margin-bottom: 1.25rem;
}

.pin-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid #e5e7eb;
    background: #f9fafb;
    transition: all 0.15s;
}

.pin-dot.filled {
    background: #3B6BF6;
    border-color: #3B6BF6;
}

.pin-dot.error {
    background: #ef4444;
    border-color: #ef4444;
    animation: shake 0.4s;
}

@keyframes shake {

    0%,
    100% {
        transform: none;
    }

    25% {
        transform: translateX(-4px);
    }

    75% {
        transform: translateX(4px);
    }
}

.pin-numpad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-bottom: 0.75rem;
}

.pin-key {
    padding: 0.9rem;
    border-radius: 12px;
    border: 1.5px solid #e5e7eb;
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #111827;
    cursor: pointer;
    transition: all 0.1s;
}

.pin-key:hover {
    background: #eff6ff;
    border-color: #3B6BF6;
    color: #3B6BF6;
}

.pin-key:active {
    transform: scale(0.95);
}

.pin-cancel {
    font-size: 0.7rem;
    color: #9ca3af;
    font-weight: 600;
}

.pin-del {
    font-size: 1rem;
    color: #a1a5ac;
}

.pin-err {
    font-size: 0.8rem;
    color: #ef4444;
    font-weight: 600;
}

/* ══ SCAN TYPE TOGGLE ══ */
.scan-type-toggle {
    display: flex;
    background: rgba(255, 255, 255, 0.05);
    padding: 3px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.light-mode .scan-type-toggle {
    background: #f1f5f9;
    border-color: #e2e8f0;
}

.type-btn {
    padding: 6px 16px;
    border-radius: 9px;
    font-size: 0.7rem;
    font-weight: 800;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    background: transparent;
    color: #94a3b8;
    letter-spacing: 0.05em;
}

.type-btn.active {
    background: #3B6BF6;
    color: white;
    box-shadow: 0 4px 12px rgba(59, 107, 246, 0.3);
}

.type-btn.out.active {
    background: #f59e0b;
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.light-mode .type-btn.active {
    box-shadow: 0 4px 8px rgba(59, 107, 246, 0.2);
}

.warn-toast {
    position: absolute;
    top: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(245, 158, 11, 0.9);
    color: white;
    padding: 0.6rem 1.25rem;
    border-radius: 99px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 0.85rem;
    box-shadow: 0 10px 30px rgba(245, 158, 11, 0.4);
    z-index: 100;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.25);
}

/* ══ RESULT OVERLAY ══ */
.result-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(4px);
}

.result-card {
    background: rgba(15, 20, 40, 0.92);
    backdrop-filter: blur(16px);
    border-radius: 28px;
    padding: 2.5rem 2rem;
    text-align: center;
    min-width: 300px;
    border: 1.5px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 80px rgba(0, 0, 0, 0.6);
}

.result-card.success {
    border-color: rgba(34, 197, 94, 0.35);
    box-shadow: 0 0 60px rgba(34, 197, 94, 0.15);
}

.result-card.fail {
    border-color: rgba(239, 68, 68, 0.35);
    box-shadow: 0 0 60px rgba(239, 68, 68, 0.15);
}

.result-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0 auto 0.75rem;
    background: linear-gradient(135deg, #3B6BF6, #6B8FF8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.4rem;
    color: #fff;
    overflow: hidden;
}

.result-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.result-icon-wrap {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
}

.result-icon-wrap.success {
    background: rgba(34, 197, 94, 0.15);
    border: 2px solid #22c55e;
    color: #22c55e;
}

.result-icon-wrap.fail {
    background: rgba(239, 68, 68, 0.15);
    border: 2px solid #ef4444;
    color: #ef4444;
}

.result-name {
    font-size: 1.5rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 0.25rem;
}

.result-dept {
    font-size: 0.82rem;
    color: #94a3b8;
    margin-bottom: 0.4rem;
}

.result-time {
    font-size: 1.1rem;
    font-weight: 700;
    color: #e2e8f0;
    margin-bottom: 0.85rem;
}

.result-badge {
    display: inline-block;
    padding: 0.4rem 1.2rem;
    border-radius: 99px;
    font-size: 0.82rem;
    font-weight: 700;
}

.result-badge.ok {
    background: rgba(34, 197, 94, 0.15);
    color: #4ade80;
    border: 1px solid rgba(34, 197, 94, 0.3);
}

.result-badge.ng {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.3);
}

/* ══ LAYOUT ══ */
.kiosk-layout {
    display: grid;
    grid-template-columns: 240px 1fr 260px;
    flex: 1;
    overflow: hidden;
    gap: 0;
}

/* ─── Left Log Panel ─── */
.log-panel {
    background: rgba(255, 255, 255, 0.03);
    border-right: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.log-header {
    padding: 0.9rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.log-title {
    font-size: 0.7rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.07em;
}

.log-count {
    font-size: 0.7rem;
    font-weight: 700;
    color: #3B6BF6;
    background: rgba(59, 107, 246, 0.12);
    border-radius: 99px;
    padding: 0.15rem 0.55rem;
}

.log-list {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem;
}

.log-list::-webkit-scrollbar {
    width: 4px;
}

.log-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 4px;
}

.log-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 2rem 1rem;
    color: #334155;
    font-size: 0.75rem;
    font-weight: 500;
}

.log-item {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.55rem 0.5rem;
    border-radius: 10px;
    border: 1px solid transparent;
    transition: background 0.2s;
}

.log-item.new {
    background: rgba(59, 107, 246, 0.08);
    border-color: rgba(59, 107, 246, 0.2);
    animation: pop-in 0.3s ease;
}

@keyframes pop-in {
    from {
        opacity: 0;
        transform: translateY(-8px);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.log-avatar {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: linear-gradient(135deg, #3B6BF6, #6B8FF8);
    color: #fff;
    font-size: 0.6rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.log-info {
    flex: 1;
    min-width: 0;
}

.log-name {
    font-size: 0.72rem;
    font-weight: 700;
    color: #e2e8f0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.log-role {
    font-size: 0.62rem;
    color: #64748b;
}

.log-right {
    text-align: right;
    flex-shrink: 0;
}

.log-time {
    font-size: 0.65rem;
    color: #64748b;
    font-weight: 600;
}

.log-badge {
    display: inline-block;
    font-size: 0.55rem;
    font-weight: 700;
    border-radius: 99px;
    padding: 0.1rem 0.4rem;
    margin-top: 0.1rem;
}

.log-badge.ok {
    background: rgba(34, 197, 94, 0.15);
    color: #4ade80;
}

.log-badge.late {
    background: rgba(245, 158, 11, 0.15);
    color: #fcd34d;
}

/* ─── Center Column ─── */
.center-col {
    display: flex;
    flex-direction: column;
}

.kiosk-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.25rem;
    background: rgba(255, 255, 255, 0.025);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    flex-shrink: 0;
}

.brand-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.brand-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.07);
    display: flex;
    align-items: center;
    justify-content: center;
}

.brand-name {
    font-size: 1.05rem;
    font-weight: 800;
    color: #fff;
}

.clock-wrap {
    text-align: center;
}

.clock-time {
    font-size: 1.7rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.02em;
    line-height: 1;
}

.clock-date {
    font-size: 0.7rem;
    color: #64748b;
    margin-top: 0.1rem;
}

.exit-btn,
.mode-btn {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 9px;
    color: #64748b;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.45rem 0.8rem;
    justify-content: center;
    cursor: pointer;
    transition: all 0.15s;
}

.exit-btn:hover,
.mode-btn:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #e2e8f0;
}

.mode-btn {
    padding: 0.45rem;
    border-radius: 9px;
}

/* Viewfinder */
.viewfinder-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 0.75rem;
}

.viewfinder {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.08);
    width: 100%;
    max-width: 600px;
    aspect-ratio: 4/3;
    background: #0a0f1a;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.viewfinder.scanning {
    border-color: #3B6BF6;
    box-shadow: 0 0 40px rgba(59, 107, 246, 0.35);
}

.viewfinder.pulsing {
    border-color: rgba(59, 107, 246, 0.6);
}

.cam-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    color: #475569;
    font-size: 0.82rem;
    font-weight: 500;
}

.start-cam-btn {
    padding: 0.55rem 1.25rem;
    border-radius: 10px;
    background: #3B6BF6;
    color: #fff;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    transition: opacity 0.15s;
}

.start-cam-btn:hover {
    opacity: 0.85;
}

.guide-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.scan-line {
    position: absolute;
    left: 15%;
    right: 15%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #3B6BF6 40%, #6B8FF8 60%, transparent);
    animation: scanV 1.8s ease-in-out infinite;
    border-radius: 2px;
}

@keyframes scanV {

    0%,
    100% {
        top: 15%;
        opacity: 0.9;
    }

    50% {
        top: 78%;
        opacity: 0.4;
    }
}

.flash {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.5);
    animation: flashOut 0.25s ease;
}

@keyframes flashOut {
    from {
        opacity: 1
    }

    to {
        opacity: 0
    }
}

.face-pill {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.28rem 0.7rem;
    border-radius: 99px;
    font-size: 0.7rem;
    font-weight: 700;
    backdrop-filter: blur(8px);
    border: 1px solid transparent;
}

.face-pill.face-ok {
    background: rgba(34, 197, 94, 0.15);
    color: #4ade80;
    border-color: rgba(34, 197, 94, 0.3);
}

.face-pill.face-miss {
    background: rgba(239, 68, 68, 0.12);
    color: #fca5a5;
    border-color: rgba(239, 68, 68, 0.25);
}

.avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
}

.face-pill-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
}

.scan-type-badge {
    font-size: 0.6rem;
    font-weight: 800;
    padding: 1px 6px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.02em;
}

.scan-type-badge.in {
    background: rgba(59, 107, 246, 0.1);
    color: #3B6BF6;
}

.scan-type-badge.out {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
}

/* Stats bar */
.stats-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(6px);
    padding: 0.45rem 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.68rem;
    color: #e2e8f0;
}

.stat-sep {
    width: 1px;
    height: 12px;
    background: rgba(255, 255, 255, 0.12);
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 0.3rem;
}

.stat-label {
    color: #64748b;
    font-weight: 600;
}

.stat-val {
    font-weight: 800;
    font-variant-numeric: tabular-nums;
}

.stat-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
}

.dot-blue {
    background: #3B6BF6;
    animation: blink 0.8s ease infinite;
}

.dot-green {
    background: #22c55e;
}

.dot-gray {
    background: #475569;
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

.val-green {
    color: #4ade80;
}

.val-amber {
    color: #fcd34d;
}

.val-red {
    color: #f87171;
}

/* Instruction row */
.instr-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.instr-step {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    opacity: 0.35;
    transition: opacity 0.3s;
    font-size: 0.72rem;
    color: #9ca3af;
}

.instr-step.active {
    opacity: 1;
    color: #e2e8f0;
}

.instr-num {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1.5px solid #3B6BF6;
    background: rgba(59, 107, 246, 0.12);
    color: #6B8FF8;
    font-size: 0.65rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.instr-arrow {
    color: rgba(255, 255, 255, 0.15);
    font-size: 0.85rem;
}

/* ─── Right Panel ─── */
.right-panel {
    background: rgba(255, 255, 255, 0.025);
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    gap: 0;
    overflow: hidden;
}

.rp-header {
    padding: 0.9rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
}

.rp-title {
    font-size: 0.7rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.07em;
}

.live-dot {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.6rem;
    font-weight: 800;
    color: #ef4444;
    letter-spacing: 0.05em;
}

.live-dot span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ef4444;
    animation: blink 1s ease infinite;
}

.last-card {
    margin: 0.75rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    text-align: center;
    flex-shrink: 0;
}

.last-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0 auto 0.6rem;
    background: linear-gradient(135deg, #3B6BF6, #6B8FF8);
    color: #fff;
    font-size: 1.1rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
}

.last-name {
    font-size: 1rem;
    font-weight: 800;
    color: #f1f5f9;
    margin-bottom: 0.15rem;
}

.last-dept {
    font-size: 0.72rem;
    color: #64748b;
    margin-bottom: 0.6rem;
}

.last-badges {
    display: flex;
    gap: 0.4rem;
    justify-content: center;
    margin-bottom: 0.75rem;
}

.chip-time {
    padding: 0.2rem 0.55rem;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.06);
    font-size: 0.65rem;
    font-weight: 700;
    color: #9ca3af;
}

.chip-status {
    padding: 0.2rem 0.55rem;
    border-radius: 6px;
    font-size: 0.65rem;
    font-weight: 700;
}

.chip-ok {
    background: rgba(34, 197, 94, 0.12);
    color: #4ade80;
}

.chip-late {
    background: rgba(245, 158, 11, 0.12);
    color: #fcd34d;
}

.conf-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.conf-label {
    font-size: 0.62rem;
    color: #64748b;
    font-weight: 600;
    flex-shrink: 0;
}

.conf-bar-wrap {
    flex: 1;
    height: 4px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 99px;
    overflow: hidden;
}

.conf-bar {
    height: 100%;
    background: linear-gradient(90deg, #3B6BF6, #6B8FF8);
    border-radius: 99px;
    transition: width 0.5s ease;
}

.conf-pct {
    font-size: 0.62rem;
    font-weight: 800;
    color: #6B8FF8;
    flex-shrink: 0;
}

.last-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem 1rem;
    color: #334155;
    font-size: 0.75rem;
    font-weight: 500;
    margin: 0.5rem;
}

.stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    padding: 0 0.75rem;
    flex-shrink: 0;
}

.stat-cell {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    padding: 0.7rem 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.sc-val {
    font-size: 1.3rem;
    font-weight: 900;
    color: #f1f5f9;
    line-height: 1;
}

.sc-label {
    font-size: 0.6rem;
    color: #475569;
    font-weight: 600;
    margin-top: 0.2rem;
}

.demo-row {
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem;
    margin-top: auto;
    flex-shrink: 0;
}

.demo-btn {
    flex: 1;
    padding: 0.55rem;
    border-radius: 10px;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.15s;
}

.ok-btn {
    background: rgba(34, 197, 94, 0.12);
    color: #4ade80;
    border: 1px solid rgba(34, 197, 94, 0.25);
}

.demo-btn.fail-demo {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.3);
}

.demo-btn:hover {
    opacity: 0.8;
}

.fail-toast,
.success-toast {
    position: absolute;
    top: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.25rem;
    border-radius: 99px;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 700;
    z-index: 20;
    border: 1px solid rgba(255, 255, 255, 0.25);
}

.fail-toast {
    background: rgba(239, 68, 68, 0.85);
    box-shadow: 0 10px 30px rgba(239, 68, 68, 0.4);
}

.success-toast {
    background: rgba(34, 197, 94, 0.85);
    box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4);
}

.toast-pop-enter-active,
.toast-pop-leave-active {
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-pop-enter-from,
.toast-pop-leave-to {
    opacity: 0;
    transform: translate(-50%, -20px);
}

/* ══ LIGHT MODE OVERRIDES ══ */
.light-mode {
    background: #f8fafc;
}

.light-mode.success {
    background: #f0fdf4;
}

.light-mode.fail {
    background: #fef2f2;
}

.light-mode .log-panel,
.light-mode .right-panel {
    background: #fff;
    border-color: #e2e8f0;
}

.light-mode .kiosk-topbar,
.light-mode .log-header,
.light-mode .rp-header {
    background: #fff;
    border-color: #e2e8f0;
}

.light-mode .log-title,
.light-mode .rp-title {
    color: #64748b;
}

.light-mode .brand-name,
.light-mode .clock-time {
    color: #0f172a;
}

.light-mode .brand-icon {
    background: #eff6ff;
}

.light-mode .exit-btn,
.light-mode .mode-btn {
    background: #fff;
    border-color: #cbd5e1;
    color: #475569;
}

.light-mode .exit-btn:hover,
.light-mode .mode-btn:hover {
    background: #f1f5f9;
    color: #0f172a;
}

.light-mode .last-card {
    background: #fff;
    border-color: #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    text-align: center;
}

.light-mode .last-name,
.light-mode .sc-val {
    color: #0f172a;
}

.light-mode .stat-cell {
    background: #fff;
    border-color: #e2e8f0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.light-mode .log-empty,
.light-mode .last-empty {
    color: #64748b;
}

.light-mode .cam-placeholder {
    color: #64748b;
}

.light-mode .instr-step {
    color: #64748b;
}

.light-mode .instr-step.active {
    color: #0f172a;
}

.light-mode .viewfinder {
    border-color: #cbd5e1;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.light-mode .conf-bar-wrap {
    background: #f1f5f9;
}

.light-mode .log-name {
    color: #1e293b;
}

.light-mode .chip-time {
    background: #f1f5f9;
    color: #64748b;
}

/* ══ Transitions ══ */
.fade-scale-enter-active,
.fade-scale-leave-active {
    transition: opacity 0.25s, transform 0.25s;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.result-pop-enter-active,
.result-pop-leave-active {
    transition: opacity 0.35s, transform 0.35s;
}

.result-pop-enter-from,
.result-pop-leave-to {
    opacity: 0;
    transform: scale(0.88);
}

/* ── Admin PIN Modal ── */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(4, 7, 18, 0.85);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1.5rem;
}

.pin-modal {
    background: #111827;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 28px;
    width: 100%;
    max-width: 360px;
    padding: 2.25rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    text-align: center;
    transform: translateY(0);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pm-header {
    margin-bottom: 2rem;
}

.pm-icon {
    width: 56px;
    height: 56px;
    background: rgba(59, 107, 246, 0.1);
    color: #3B6BF6;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.25rem;
}

.pm-icon svg {
    width: 28px;
    height: 28px;
}

.pm-header h3 {
    color: #fff;
    font-size: 1.4rem;
    margin-bottom: 0.25rem;
}

.pm-header p {
    color: #94a3b8;
    font-size: 0.85rem;
    font-weight: 500;
}

/* PIN Dots */
.pin-dots {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 2.5rem;
}

.pin-dots .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.pin-dots .dot.filled {
    background: #3B6BF6;
    transform: scale(1.2);
    box-shadow: 0 0 15px rgba(59, 107, 246, 0.5);
    border-color: transparent;
}

/* Numeric Pad */
.pin-pad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.pin-pad button {
    height: 64px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: #fff;
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pin-pad button:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.15);
}

.pin-pad button:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.15);
}

.pin-pad .pad-util {
    background: transparent;
    border-color: transparent;
    color: #94a3b8;
    font-size: 0.9rem;
}

.pm-cancel {
    background: transparent;
    border: none;
    color: #64748b;
    font-weight: 800;
    font-size: 0.75rem;
    letter-spacing: 0.1rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    transition: color 0.2s;
}

.pm-cancel:hover {
    color: #ef4444;
}

/* Error Shaking */
.shake-err {
    animation: shake 0.4s cubic-bezier(.36, .07, .19, .97) both;
}

@keyframes shake {

    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
}

/* Light Mode Overrides */
.light-mode .pin-modal {
    background: #fff;
    border-color: #e2e8f0;
}

.light-mode .pm-header h3 {
    color: #0f172a;
}

.light-mode .pin-pad button {
    background: #f8fafc;
    border-color: #f1f5f9;
    color: #1e293b;
}

.light-mode .pin-pad button:hover {
    background: #f1f5f9;
}

.light-mode .pin-dots .dot {
    background: #f1f5f9;
    border-color: #e2e8f0;
}

.pm-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.pm-btn {
    width: 100%;
    height: 52px;
    border-radius: 14px;
    border: none;
    font-weight: 800;
    font-size: 0.8rem;
    letter-spacing: 0.05rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    transition: all 0.2s;
}

.pm-btn.primary {
    background: #3B6BF6;
    color: #fff;
}

.pm-btn.primary:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -5px rgba(59, 107, 246, 0.4);
}

.pm-btn.logout {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
}

.pm-btn.logout:hover {
    background: rgba(239, 68, 68, 0.2);
    transform: translateY(-2px);
}

.verify-success {
    background: rgba(34, 197, 94, 0.1) !important;
    color: #22c55e !important;
    transform: scale(1.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@media (max-width: 900px) {
    .kiosk-layout {
        grid-template-columns: 1fr;
    }

    .log-panel,
    .right-panel {
        display: none;
    }
}
</style>
