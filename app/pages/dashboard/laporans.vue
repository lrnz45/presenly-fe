<template>
    <NuxtLayout name="dashboard">
        <div class="page-header">
            <div>
                <h1 class="page-title font-display">Laporan Kehadiran</h1>
                <p class="page-sub">Analitik dan riwayat absen instansi Anda</p>
            </div>
            <div class="export-btns">
                <button class="btn-export excel" @click="exportExcel">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Excel
                </button>
                <button class="btn-export pdf" @click="exportPdf">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    PDF
                </button>
            </div>
        </div>

        <!-- Filter bar -->
        <div class="filter-bar card">
            <div class="filter-group">
                <label class="filter-label">Dari Tanggal</label>
                <input v-model="filter.from" type="date" class="filter-input" />
            </div>
            <div class="filter-group">
                <label class="filter-label">Sampai</label>
                <input v-model="filter.to" type="date" class="filter-input" />
            </div>
            <div class="filter-group">
                <label class="filter-label">Status</label>
                <select v-model="filter.status" class="filter-select">
                    <option value="">Semua Status</option>
                    <option value="H">Hadir</option>
                    <option value="T">Terlambat</option>
                    <option value="A">Tidak Hadir</option>
                    <option value="S">Sakit</option>
                    <option value="I">Izin</option>
                </select>
            </div>
            <div class="filter-group">
                <label class="filter-label">User</label>
                <input v-model="filter.name" type="text" class="filter-input" placeholder="Cari nama..." />
            </div>
            <button class="btn-apply">Terapkan Filter</button>
        </div>

        <!-- Summary Cards -->
        <div class="summary-grid">
            <div class="summary-card">
                <p class="sum-label">Hari Kerja</p>
                <p class="sum-val font-display">22</p>
            </div>
            <div class="summary-card blue">
                <p class="sum-label">Total Hadir</p>
                <p class="sum-val font-display">18</p>
            </div>
            <div class="summary-card orange">
                <p class="sum-label">Terlambat</p>
                <p class="sum-val font-display">31</p>
            </div>
            <div class="summary-card red">
                <p class="sum-label">Tidak Hadir</p>
                <p class="sum-val font-display">8</p>
            </div>
            <div class="summary-card green">
                <p class="sum-label">% Kehadiran</p>
                <p class="sum-val font-display">81.8%</p>
            </div>
        </div>

        <!-- Heatmap -->
        <div class="card heatmap-card">
            <div class="card-header">
                <h3 class="card-title font-display">Heatmap Kehadiran — Maret 2026</h3>
                <div class="heat-legend">
                    <span class="hleg-label">Rendah</span>
                    <span class="heat-block" style="background:#f1f5f9"></span>
                    <span class="heat-block" style="background:#bfdbfe"></span>
                    <span class="heat-block" style="background:#60a5fa"></span>
                    <span class="heat-block" style="background:#2563eb"></span>
                    <span class="heat-block" style="background:#1e3a8a"></span>
                    <span class="hleg-label">Tinggi</span>
                </div>
            </div>
            <div class="heatmap-wrap">
                <!-- Day labels -->
                <div class="heatmap-day-labels">
                    <span></span>
                    <span>Sen</span>
                    <span>Sel</span>
                    <span>Rab</span>
                    <span>Kam</span>
                    <span>Jum</span>
                </div>
                <!-- Grid: weeks as columns, days as rows -->
                <div class="heatmap-grid-wrap">
                    <div class="heatmap-week-labels">
                        <span v-for="(_, wi) in heatmap" :key="wi">Mg {{ wi + 1 }}</span>
                    </div>
                    <div class="heatmap-grid">
                        <template v-for="(week, wi) in heatmap" :key="wi">
                            <div v-for="(val, di) in week" :key="di" class="heat-cell" :class="{ 'is-zero': val === 0 }"
                                :style="{ background: heatColor(val) }"
                                :title="val === 0 ? 'Libur / Tidak Ada Data' : `${val} kehadiran`">
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- Detail Table -->
        <div class="card table-card">
            <div class="card-header">
                <h3 class="card-title font-display">Riwayat Absensi</h3>
            </div>
            <div class="table-wrap">
                <table class="lap-table">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>User</th>
                            <th>Jam Masuk</th>
                            <th>Jam Pulang</th>
                            <th>Status</th>
                            <th>Catatan</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in records" :key="row.id" class="lap-row">
                            <td class="td-text">{{ row.dateDisplay }}</td>
                            <td>
                                <div class="emp-mini">
                                    <div class="emp-dot" :style="{ background: row.avatarColor }"></div>
                                    {{ row.staffName }}
                                </div>
                            </td>
                            <td class="td-text">{{ row.checkInDisplay }}</td>
                            <td class="td-text">{{ row.checkOutDisplay }}</td>
                            <td>
                                <span class="status-badge" :class="row.status">{{ statusLabel(row.status) }}</span>
                            </td>
                            <td class="td-text note">{{ row.note || '—' }}</td>
                            <td>
                                <button class="edit-btn" @click="openEdit(row)">✎</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Edit Modal -->
        <div class="modal-overlay" v-if="editRow" @click.self="editRow = null">
            <div class="modal">
                <h3 class="modal-title font-display">Edit Catatan Absen</h3>
                <p class="modal-sub">{{ editRow.staffName }} · {{ editRow.dateDisplay }}</p>
                <div class="field-group mt">
                    <label class="field-label">Ubah Status</label>
                    <select v-model="editRow.status" class="field-input">
                        <option value="H">Hadir</option>
                        <option value="T">Terlambat</option>
                        <option value="A">Tidak Hadir</option>
                        <option value="S">Sakit</option>
                        <option value="I">Izin</option>
                    </select>
                </div>
                <div class="field-group mt">
                    <label class="field-label">Catatan</label>
                    <textarea v-model="editRow.note" class="field-input" rows="3"
                        placeholder="Tambahkan catatan..."></textarea>
                </div>
                <div class="modal-actions">
                    <button class="btn-cancel" @click="editRow = null">Batal</button>
                    <button class="btn-save" @click="saveEdit">Simpan</button>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { useAttendance } from '~/composables/useAttendance'
import { ATTENDANCE_CODE_LABELS } from '~/data/seed'
import type { AttendanceDailyRecord, AttendanceDayCode } from '~/types'

definePageMeta({
    layout: 'dashboard'
})

const { getDailyRecords, updateRecord, getExportUrl } = useAttendance()

const filter = reactive({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    to: new Date().toISOString().slice(0, 10),
    status: '' as '' | AttendanceDayCode,
    name: ''
})

const records = ref<AttendanceDailyRecord[]>([])
const heatmap = ref<number[][]>([
    [0, 45, 38, 42, 35], [40, 28, 50, 47, 32], [0, 43, 41, 39, 44], [38, 50, 46, 0, 37], [41, 35, 0, 48, 44]
])
const editRow = ref<AttendanceDailyRecord | null>(null)
const loading = ref(false)

onMounted(() => {
    loadRecords()
})

const loadRecords = async () => {
    try {
        loading.value = true
        records.value = await getDailyRecords(filter)
    } catch (err) {
        console.error('Gagal memuat riwayat:', err)
    } finally {
        loading.value = false
    }
}

const heatColor = (v: number) => {
    if (v === 0) return '#f1f5f9'
    if (v < 35) return '#bfdbfe'
    if (v < 40) return '#93c5fd'
    if (v < 45) return '#60a5fa'
    if (v < 48) return '#2563eb'
    return '#1e3a8a'
}

const statusLabel = (s: AttendanceDayCode) => ATTENDANCE_CODE_LABELS[s] || s

const openEdit = (row: AttendanceDailyRecord) => {
    editRow.value = { ...row }
}

const saveEdit = async () => {
    if (!editRow.value) return
    try {
        await updateRecord(editRow.value.id, {
            dayCode: editRow.value.status,
            note: editRow.value.note
        })
        await loadRecords()
        editRow.value = null
    } catch (err: any) {
        alert(err.message || 'Gagal menyimpan perubahan.')
    }
}

const exportExcel = async () => {
    try {
        const { url } = await getExportUrl('excel', filter)
        window.open(url, '_blank')
    } catch (err: any) {
        alert(err.message || 'Gagal ekspor Excel.')
    }
}

const exportPdf = async () => {
    try {
        const { url } = await getExportUrl('pdf', filter)
        window.open(url, '_blank')
    } catch (err: any) {
        alert(err.message || 'Gagal ekspor PDF.')
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

.export-btns {
    display: flex;
    gap: 0.5rem;
}

.btn-export {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.55rem 1rem;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: opacity 0.15s;
}

.btn-export.excel {
    background: #dcfce7;
    color: #166534;
}

.btn-export.pdf {
    background: #fee2e2;
    color: #991b1b;
}

.btn-export:hover {
    opacity: 0.8;
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
    flex-wrap: wrap;
    gap: 0.5rem;
}

.card-title {
    font-size: 0.95rem;
    font-weight: 800;
    color: #111827;
}

.filter-bar {
    display: flex;
    align-items: flex-end;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.filter-label {
    font-size: 0.72rem;
    font-weight: 600;
    color: #a1a5ac;
}

.filter-input,
.filter-select {
    padding: 0.6rem 0.85rem;
    border-radius: 10px;
    border: 1.5px solid #e5e7eb;
    background: #f9fafb;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    color: #111827;
    outline: none;
    min-width: 130px;
}

.filter-input:focus,
.filter-select:focus {
    border-color: #3B6BF6;
}

.btn-apply {
    background: #3B6BF6;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 0.6rem 1.1rem;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    margin-top: 1.5rem;
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.summary-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #f0f0f5;
    padding: 1rem;
    text-align: center;
}

.summary-card.blue {
    background: #eff6ff;
    border-color: #bfdbfe;
}

.summary-card.orange {
    background: #fff7ed;
    border-color: #fed7aa;
}

.summary-card.red {
    background: #fff1f2;
    border-color: #fecdd3;
}

.summary-card.green {
    background: #f0fdf4;
    border-color: #bbf7d0;
}

.sum-label {
    font-size: 0.7rem;
    color: #a1a5ac;
    font-weight: 600;
}

.sum-val {
    font-size: 1.5rem;
    font-weight: 800;
    color: #111827;
}

.heat-legend {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.7rem;
    color: #9ca3af;
}

.hleg-label {
    font-size: 0.7rem;
    color: #9ca3af;
    font-weight: 500;
}

.heat-block {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    display: inline-block;
}

/* Heatmap layout */
.heatmap-wrap {
    display: flex;
    gap: 0;
}

.heatmap-day-labels {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-right: 6px;
    flex-shrink: 0;
}

.heatmap-day-labels span {
    height: 24px;
    display: flex;
    align-items: center;
    font-size: 0.62rem;
    color: #9ca3af;
    font-weight: 600;
    white-space: nowrap;
}

.heatmap-grid-wrap {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
}

.heatmap-week-labels {
    display: flex;
    gap: 3px;
    margin-bottom: 3px;
}

.heatmap-week-labels span {
    width: 24px;
    font-size: 0.58rem;
    color: #9ca3af;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
}

.heatmap-grid {
    display: grid;
    grid-template-columns: repeat(5, 24px);
    grid-template-rows: repeat(5, 24px);
    gap: 3px;
}

.heat-cell {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    transition: transform 0.1s, filter 0.1s;
    cursor: default;
}

.heat-cell:hover {
    transform: scale(1.25);
    z-index: 2;
    filter: brightness(0.9);
}

.heat-cell.is-zero {
    background: #f1f5f9 !important;
}

.table-card {
    padding: 0;
    overflow: hidden;
}

.table-card .card-header {
    padding: 1rem 1.25rem;
    margin-bottom: 0;
    border-bottom: 1px solid #f0f0f5;
}

.table-wrap {
    overflow-x: auto;
}

.lap-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 680px;
}

.lap-table th {
    padding: 0.65rem 1rem;
    background: #f9fafb;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #a1a5ac;
    text-align: left;
    border-bottom: 1px solid #f0f0f5;
    white-space: nowrap;
}

.lap-row {
    border-bottom: 1px solid #f9fafb;
    transition: background 0.1s;
}

.lap-row:hover {
    background: #fafaff;
}

.lap-row td {
    padding: 0.7rem 1rem;
}

.td-text {
    font-size: 0.82rem;
    color: #374151;
}

.emp-mini {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: #111827;
}

.emp-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
}

.status-badge {
    display: inline-block;
    border-radius: 99px;
    padding: 0.2rem 0.65rem;
    font-size: 0.68rem;
    font-weight: 700;
}

.status-badge.H {
    background: #dcfce7;
    color: #166534;
}

.status-badge.T {
    background: #fff7ed;
    color: #c2410c;
}

.status-badge.A {
    background: #fee2e2;
    color: #991b1b;
}

.status-badge.S {
    background: #eff6ff;
    color: #1d4ed8;
}

.status-badge.I {
    background: #faf5ff;
    color: #6d28d9;
}

.note {
    max-width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.edit-btn {
    background: none;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    width: 28px;
    height: 28px;
    cursor: pointer;
    color: #a1a5ac;
    font-size: 0.85rem;
    transition: all 0.15s;
}

.edit-btn:hover {
    background: #f0f5ff;
    border-color: #3B6BF6;
    color: #3B6BF6;
}

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.modal {
    background: #fff;
    border-radius: 20px;
    padding: 1.75rem;
    width: min(440px, 92vw);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.modal-title {
    font-size: 1.1rem;
    font-weight: 800;
    color: #111827;
}

.modal-sub {
    font-size: 0.8rem;
    color: #a1a5ac;
    margin-top: 0.2rem;
    margin-bottom: 0.75rem;
}

.field-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.field-group.mt {
    margin-top: 0.75rem;
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
    resize: vertical;
}

.field-input:focus {
    border-color: #3B6BF6;
    background: #fff;
}

.modal-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    margin-top: 1.25rem;
}

.btn-cancel {
    padding: 0.6rem 1.1rem;
    border-radius: 10px;
    border: 1.5px solid #e5e7eb;
    background: #fff;
    font-size: 0.82rem;
    font-weight: 600;
    color: #374151;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
}

.btn-save {
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

@media (max-width: 900px) {
    .summary-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 600px) {
    .summary-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
