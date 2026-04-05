<template>
        <!-- Page Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 px-2 mt-4">
            <div class="max-w-2xl">
                <h1 class="font-display text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Pengaturan Instansi
                </h1>
                <p class="text-[0.85rem] text-slate-500 leading-relaxed font-medium">
                    Kelola profil, aturan kerja, dan keamanan kiosk.
                </p>
            </div>
            <div class="flex items-center gap-3 shrink-0">
                <button
                    class="flex items-center gap-2 bg-[#0c1837] hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-[0.8rem] font-bold transition-colors shadow-lg shadow-blue-900/20"
                    @click="saveSettings">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-4 h-4">
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                    Simpan Perubahan
                </button>
            </div>
        </div>

        <!-- Tabs -->
        <div class="tab-bar">
            <button v-for="tab in tabs" :key="tab.key" class="tab-btn" :class="{ active: activeTab === tab.key }"
                @click="activeTab = tab.key">
                {{ tab.label }}
            </button>
        </div>

        <!-- TAB: Profil -->
        <div v-if="activeTab === 'profil'" class="tab-content">
            <div class="settings-grid">
                <div class="card">
                    <h3 class="section-title font-display">Profil Instansi</h3>
                    <div class="form-cols">
                        <div class="field-group">
                            <label class="field-label">Nama Instansi</label>
                            <input v-model="settings.institutionName" type="text" class="field-input"
                                placeholder="Nama instansi" />
                        </div>
                        <div class="field-group">
                            <label class="field-label">Kategori</label>
                            <select v-model="settings.category" class="field-input">
                                <option value="sekolah">Sekolah</option>
                                <option value="perusahaan">Perusahaan</option>
                            </select>
                        </div>
                        <div class="field-group full">
                            <label class="field-label">Alamat</label>
                            <input v-model="settings.address" type="text" class="field-input"
                                placeholder="Jl. Contoh No. 1, Jakarta" />
                        </div>
                        <div class="field-group full">
                            <label class="field-label">Zona Waktu</label>
                            <select v-model="settings.timezone" class="field-input">
                                <option value="WIB">WIB (UTC+7)</option>
                                <option value="WITA">WITA (UTC+8)</option>
                                <option value="WIT">WIT (UTC+9)</option>
                            </select>
                        </div>
                        <div class="field-group">
                            <label class="field-label">Email kontak instansi</label>
                            <input v-model="settings.contactEmail" type="email" class="field-input"
                                placeholder="kontak@instansi.id" />
                        </div>
                        <div class="field-group">
                            <label class="field-label">Telepon instansi</label>
                            <input v-model="settings.phone" type="tel" class="field-input" placeholder="08xx..." />
                        </div>
                    </div>
                </div>

                <div class="card" style="margin-top: 1rem">
                    <h3 class="section-title font-display">Paket &amp; kuota (baca saja)</h3>
                    <p class="field-hint" style="margin-bottom: 0.75rem">Nilai ini berasal dari tabel institusi di server;
                        perpanjang lewat halaman Tagihan.</p>
                    <div class="form-cols">
                        <div class="field-group">
                            <label class="field-label">Paket</label>
                            <div class="field-input opacity-70 bg-slate-50">{{ subscription.plan }}</div>
                        </div>
                        <div class="field-group">
                            <label class="field-label">Kuota pegawai</label>
                            <div class="field-input opacity-70 bg-slate-50">{{ subscription.activeEmployeeCount }} /
                                {{ subscription.maxEmployees }}</div>
                        </div>
                        <div class="field-group full">
                            <label class="field-label">Berlaku hingga</label>
                            <div class="field-input opacity-70 bg-slate-50">{{ subscriptionExpiresLabel }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB: Aturan Kerja -->
        <div v-if="activeTab === 'aturan'" class="tab-content">
            <div class="card">
                <h3 class="section-title font-display">Konfigurasi Jam Kerja</h3>
                <div class="form-cols">
                    <div class="field-group">
                        <label class="field-label">Jam Masuk</label>
                        <input v-model="settings.workdayCheckIn" type="time" class="field-input" />
                        <p class="field-hint">Batas toleransi keterlambatan</p>
                    </div>
                    <div class="field-group">
                        <label class="field-label">Toleransi (menit)</label>
                        <input v-model.number="settings.lateToleranceMinutes" type="number" min="0" max="60" class="field-input" />
                    </div>
                    <div class="field-group">
                        <label class="field-label">Jam Pulang</label>
                        <input v-model="settings.workdayCheckOut" type="time" class="field-input" />
                    </div>
                    <div class="field-group">
                        <label class="field-label">Mode Absen</label>
                        <select v-model="settings.attendanceMode" class="field-input">
                            <option value="both">Masuk &amp; Pulang</option>
                            <option value="in_only">Masuk Saja</option>
                        </select>
                    </div>
                </div>

                <div class="schedule-preview">
                    <h4 class="preview-title">Pratinjau Jadwal</h4>
                    <div class="timeline">
                        <div class="tl-item">
                            <div class="tl-dot blue"></div>
                            <div class="tl-info">
                                <p class="tl-time">{{ settings.workdayCheckIn }}</p>
                                <p class="tl-label">Jam Masuk</p>
                            </div>
                        </div>
                        <div class="tl-line"></div>
                        <div class="tl-item">
                            <div class="tl-dot orange"></div>
                            <div class="tl-info">
                                <p class="tl-time">{{ settings.workdayCheckIn }} + {{ settings.lateToleranceMinutes }}m</p>
                                <p class="tl-label">Batas Tepat Waktu</p>
                            </div>
                        </div>
                        <div class="tl-line"></div>
                        <div class="tl-item" v-if="settings.attendanceMode !== 'in_only'">
                            <div class="tl-dot green"></div>
                            <div class="tl-info">
                                <p class="tl-time">{{ settings.workdayCheckOut }}</p>
                                <p class="tl-label">Jam Pulang</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-selector">
                    <h4 class="preview-title">Hari Aktif</h4>
                    <div class="days-wrap">
                        <button v-for="d in weekdays" :key="d.key" class="day-btn"
                            :class="{ active: settings.activeWeekdays.includes(d.key) }" @click="toggleDay(d.key)">{{
                                d.label }}</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB: Kiosk PIN -->
        <div v-if="activeTab === 'kiosk'" class="tab-content">
            <div class="card pin-card">
                <h3 class="section-title font-display">Pengaturan PIN Kiosk</h3>
                <p class="pin-desc">PIN 6 digit digunakan untuk mengunci keluar dari Mode Kiosk agar pegawai tidak bisa
                    menutup aplikasi secara sembarangan.</p>

                <div class="pin-wrap">
                    <div class="pin-display">
                        <div v-for="i in 6" :key="i" class="pin-cell" :class="{ filled: newPin.length >= i }">
                            {{ newPin.length >= i ? (showPin ? newPin[i - 1] : '●') : '' }}
                        </div>
                    </div>
                    <button class="toggle-pin-vis" @click="showPin = !showPin">
                        {{ showPin ? 'Sembunyikan' : 'Tampilkan' }}
                    </button>
                </div>

                <!-- Numpad -->
                <div class="numpad">
                    <button v-for="n in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="n" class="num-btn"
                        @click="addDigit(n.toString())">{{
                            n }}</button>
                    <button class="num-btn clear" @click="newPin = ''">AC</button>
                    <button class="num-btn" @click="addDigit('0')">0</button>
                    <button class="num-btn del" @click="deleteDigit">⌫</button>
                </div>

                <button class="btn-save-pin" :disabled="newPin.length !== 6" @click="saveKioskPin">
                    {{ newPin.length === 6 ? 'Simpan PIN Baru' : `Masukkan ${6 - newPin.length} digit lagi` }}
                </button>

                <div class="pin-warn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Simpan PIN di tempat yang aman. PIN yang hilang tidak dapat dipulihkan.</span>
                </div>
            </div>
        </div>

        <!-- TAB: Admin -->
        <div v-if="activeTab === 'admin'" class="tab-content">
            <div class="card">
                <div class="card-header">
                    <h3 class="section-title font-display" style="margin:0">Manajemen Admin</h3>
                    <span class="quota-tag">1 / 3 slot terpakai</span>
                </div>
                <div class="admin-list">
                    <div v-for="admin in admins" :key="admin.id" class="admin-item">
                        <div class="admin-avatar" :style="{ background: admin.color }">{{ admin.initials }}</div>
                        <div class="admin-info">
                            <p class="admin-name">{{ admin.fullName }}</p>
                            <p class="admin-email">{{ admin.email }}</p>
                            <p v-if="admin.phoneNumber" class="admin-phone">{{ admin.phoneNumber }}</p>
                        </div>
                        <span class="admin-role-badge" :class="admin.role">{{ admin.role === 'admin' ? 'Admin' :
                            'Superadmin' }}</span>
                        <button v-if="admin.role !== 'admin'" class="remove-admin-btn"
                            @click="removeAdmin(admin.id)">Hapus</button>
                    </div>
                </div>
                <div class="add-admin-form">
                    <input v-model="newAdminEmail" type="email" class="field-input" placeholder="Email admin baru..." />
                    <button class="btn-add-admin" @click="inviteNewAdmin">Undang Admin</button>
                </div>
            </div>
        </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useInstitution } from '~/composables/useInstitution'

definePageMeta({
    layout: 'dashboard'
})

const { getInstitution, updateInstitution, updateKioskPin, getAdmins, inviteAdmin, deleteAdmin } = useInstitution()

const activeTab = ref('profil')
const showPin = ref(false)
const tabs = [
    { key: 'profil', label: 'Profil' },
    { key: 'aturan', label: 'Aturan Kerja' },
    { key: 'kiosk', label: 'Kiosk PIN' },
    { key: 'admin', label: 'Manajemen Admin' },
]

const settings = ref<any>({
    institutionName: '',
    category: '',
    address: '',
    timezone: 'WIB',
    contactEmail: '',
    phone: '',
    attendanceMode: 'both',
    workdayCheckIn: '07:00',
    workdayCheckOut: '17:00',
    lateToleranceMinutes: 15,
    activeWeekdays: ['sen', 'sel', 'rab', 'kam', 'jum']
})

const admins = ref<any[]>([])
const subscription = ref<any>({
    plan: 'basic',
    maxEmployees: 200,
    expiresAt: new Date().toISOString(),
    activeEmployeeCount: 0
})
const newPin = ref('')
const newAdminEmail = ref('')
const loading = ref(false)

const weekdays = [
    { key: 'sen', label: 'Senin' },
    { key: 'sel', label: 'Selasa' },
    { key: 'rab', label: 'Rabu' },
    { key: 'kam', label: 'Kamis' },
    { key: 'jum', label: 'Jumat' },
    { key: 'sab', label: 'Sabtu' },
    { key: 'min', label: 'Minggu' }
]

const subscriptionExpiresLabel = computed(() => {
    const d = new Date(subscription.value.expiresAt)
    return d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
})

onMounted(async () => {
    loadData()
})

const loadData = async () => {
    try {
        const [inst, adm] = await Promise.all([
            getInstitution(),
            getAdmins()
        ])
        settings.value = { ...settings.value, ...inst }
        admins.value = adm
        if (inst.plan) {
            subscription.value = {
                plan: inst.plan,
                maxEmployees: inst.maxEmployees,
                expiresAt: inst.expiresAt,
                activeEmployeeCount: inst.memberCount || 0
            }
        }
    } catch (err) {
        console.error('Gagal memuat data pengaturan:', err)
    }
}

const toggleDay = (day: string) => {
    const idx = settings.value.activeWeekdays.indexOf(day)
    if (idx > -1) {
        settings.value.activeWeekdays.splice(idx, 1)
    } else {
        settings.value.activeWeekdays.push(day)
    }
}

const addDigit = (d: string) => { if (newPin.value.length < 6) newPin.value += d }
const deleteDigit = () => { newPin.value = newPin.value.slice(0, -1) }

const saveSettings = async () => {
    try {
        loading.value = true
        await updateInstitution(settings.value)
        alert('Pengaturan berhasil disimpan!')
    } catch (err: any) {
        alert(err.message || 'Gagal menyimpan pengaturan.')
    } finally {
        loading.value = false
    }
}

const saveKioskPin = async () => {
    try {
        if (newPin.value.length < 6) return alert('PIN harus 6 digit.')
        await updateKioskPin(newPin.value)
        alert('PIN Kiosk berhasil diperbarui!')
        newPin.value = ''
    } catch (err: any) {
        alert(err.message || 'Gagal memperbarui PIN.')
    }
}

const inviteNewAdmin = async () => {
    if (!newAdminEmail.value) return
    try {
        await inviteAdmin(newAdminEmail.value)
        alert('Undangan berhasil dikirim ke ' + newAdminEmail.value)
        newAdminEmail.value = ''
        const adm = await getAdmins()
        admins.value = adm
    } catch (err: any) {
        alert(err.message || 'Gagal mengirim undangan.')
    }
}

const removeAdmin = async (id: number) => {
    if (!confirm('Yakin ingin menghapus admin ini?')) return
    try {
        await deleteAdmin(id)
        admins.value = admins.value.filter(a => a.id !== id)
    } catch (err: any) {
        alert(err.message || 'Gagal menghapus admin.')
    }
}
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

.page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.page-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: #111827;
}

.page-sub {
    font-size: 0.82rem;
    color: #a1a5ac;
    margin-top: 0.2rem;
}

.btn-save-all {
    background: #3B6BF6;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 0.6rem 1.2rem;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
}

.tab-bar {
    display: flex;
    gap: 0.25rem;
    background: #fff;
    border-radius: 14px;
    padding: 0.35rem;
    border: 1px solid #f0f0f5;
    margin-bottom: 1rem;
    width: fit-content;
    flex-wrap: wrap;
}

.tab-btn {
    padding: 0.5rem 1rem;
    border-radius: 10px;
    border: none;
    background: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: #a1a5ac;
    cursor: pointer;
    transition: all 0.15s;
}

.tab-btn.active {
    background: #3B6BF6;
    color: #fff;
}

.tab-content {
    animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(6px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #f0f0f5;
    padding: 1.25rem;
    margin-bottom: 1rem;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.section-title {
    font-size: 0.95rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 1rem;
}

.form-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.9rem;
}

.field-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.field-group.full {
    grid-column: 1 / -1;
}

.field-label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #374151;
}

.field-input {
    padding: 0.65rem 0.85rem;
    border-radius: 10px;
    border: 1.5px solid #e5e7eb;
    background: #f9fafb;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    color: #111827;
    outline: none;
    width: 100%;
    transition: border-color 0.15s;
}

.field-input:focus {
    border-color: #3B6BF6;
    background: #fff;
}

.field-hint {
    font-size: 0.7rem;
    color: #9ca3af;
}

/* Schedule preview */
.schedule-preview {
    margin-top: 1.25rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 12px;
}

.preview-title {
    font-size: 0.8rem;
    font-weight: 700;
    color: #374151;
    margin-bottom: 0.75rem;
}

.timeline {
    display: flex;
    align-items: center;
    gap: 0;
    flex-wrap: wrap;
}

.tl-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.tl-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
}

.tl-dot.blue {
    background: #3B6BF6;
}

.tl-dot.orange {
    background: #f97316;
}

.tl-dot.green {
    background: #2563eb;
}

.tl-time {
    font-size: 0.82rem;
    font-weight: 700;
    color: #111827;
}

.tl-label {
    font-size: 0.68rem;
    color: #9ca3af;
}

.tl-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, #e5e7eb, #d1d5db);
    margin: 0 0.5rem;
    min-width: 30px;
}

/* Day selector */
.day-selector {
    margin-top: 1.25rem;
}

.days-wrap {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
}

.day-btn {
    padding: 0.45rem 0.85rem;
    border-radius: 99px;
    border: 1.5px solid #e5e7eb;
    background: #f9fafb;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    color: #a1a5ac;
    cursor: pointer;
    transition: all 0.15s;
}

.day-btn.active {
    background: #3B6BF6;
    border-color: #3B6BF6;
    color: #fff;
}

/* PIN */
.pin-card {
    max-width: 400px;
}

.pin-desc {
    font-size: 0.82rem;
    color: #a1a5ac;
    margin-bottom: 1.25rem;
    line-height: 1.5;
}

.pin-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
}

.pin-display {
    display: flex;
    gap: 0.5rem;
}

.pin-cell {
    width: 42px;
    height: 52px;
    border-radius: 10px;
    border: 2px solid #e5e7eb;
    background: #f9fafb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 800;
    color: #111827;
    transition: all 0.15s;
}

.pin-cell.filled {
    border-color: #3B6BF6;
    background: #eff6ff;
}

.toggle-pin-vis {
    background: none;
    border: none;
    color: #3B6BF6;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
}

.numpad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    width: 220px;
    margin: 0 auto 1rem;
}

.num-btn {
    padding: 0.8rem;
    border-radius: 12px;
    border: 1.5px solid #e5e7eb;
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
    cursor: pointer;
    transition: background 0.1s;
}

.num-btn:hover {
    background: #f0f5ff;
    border-color: #3B6BF6;
}

.num-btn.clear {
    font-size: 0.7rem;
    color: #ef4444;
}

.num-btn.del {
    font-size: 0.85rem;
    color: #a1a5ac;
}

.btn-save-pin {
    width: 100%;
    padding: 0.8rem;
    background: #3B6BF6;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s, opacity 0.15s;
    margin-bottom: 0.75rem;
}

.btn-save-pin:disabled {
    opacity: 0.55;
    cursor: not-allowed;
}

.btn-save-pin:hover:not(:disabled) {
    background: #2a57e0;
}

.pin-warn {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    background: #fffbeb;
    border: 1px solid #fcd34d;
    border-radius: 10px;
    padding: 0.65rem 0.85rem;
    font-size: 0.75rem;
    color: #92400e;
}

/* Admin */
.quota-tag {
    background: #eff6ff;
    color: #1d4ed8;
    border-radius: 99px;
    padding: 0.2rem 0.7rem;
    font-size: 0.72rem;
    font-weight: 700;
}

.admin-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
}

.admin-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 12px;
    border: 1px solid #f0f0f5;
    background: #f9fafb;
}

.admin-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.admin-info {
    flex: 1;
}

.admin-name {
    font-size: 0.83rem;
    font-weight: 600;
    color: #111827;
}

.admin-email {
    font-size: 0.71rem;
    color: #9ca3af;
}

.admin-phone {
    font-size: 0.68rem;
    color: #64748b;
    margin-top: 0.15rem;
}

.admin-role-badge {
    border-radius: 99px;
    padding: 0.2rem 0.65rem;
    font-size: 0.68rem;
    font-weight: 700;
}

.admin-role-badge.admin {
    background: #eff6ff;
    color: #1d4ed8;
}

.admin-role-badge.superadmin {
    background: #f8fafc;
    color: #0c1837;
    border: 1px solid #e2e8f0;
}

.remove-admin-btn {
    background: none;
    border: 1.5px solid #bfdbfe;
    color: #1d4ed8;
    border-radius: 8px;
    padding: 0.3rem 0.65rem;
    font-size: 0.72rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
    font-family: 'DM Sans', sans-serif;
}

.remove-admin-btn:hover {
    background: #dbeafe;
}

.add-admin-form {
    display: flex;
    gap: 0.75rem;
}

.btn-add-admin {
    background: #3B6BF6;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 0.65rem 1rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
}

@media (max-width: 640px) {
    .form-cols {
        grid-template-columns: 1fr;
    }

    .add-admin-form {
        flex-direction: column;
    }
}
</style>
