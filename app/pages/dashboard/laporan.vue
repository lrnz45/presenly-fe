<template>
    <NuxtLayout name="dashboard">
        <!-- Page Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 px-2 mt-4">
            <div class="max-w-2xl">
                <h1 class="font-display text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Rekap Kehadiran</h1>
                <p class="text-[0.85rem] text-slate-500 leading-relaxed font-medium">
                    {{ selectedMonthLabel }} · {{calendarDays.filter(d => !d.isWeekend).length}} hari kerja
                </p>
            </div>
            <div class="flex flex-wrap items-center gap-3 shrink-0">
                <div class="flex items-center mr-2">
                    <select v-model="selectedMonth"
                        class="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[0.85rem] font-bold text-slate-700 shadow-sm outline-none hover:border-slate-300 focus:border-blue-500 transition-colors cursor-pointer appearance-none pr-8 relative"
                        style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22currentColor%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%20%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 0.75rem center; background-size: 1.1em 1.1em;">
                        <option v-for="m in monthOptions" :key="m.value" :value="m.value">{{ m.label }}</option>
                    </select>
                </div>
                <button
                    class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-[0.85rem] font-bold transition-colors shadow-lg shadow-green-500/20"
                    @click="exportExcel">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Excel
                </button>
                <button
                    class="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl text-[0.85rem] font-bold transition-colors shadow-lg shadow-rose-500/20"
                    @click="exportPdf">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    PDF
                </button>
            </div>
        </div>

        <!-- Summary Unified Card -->
        <div class="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden mb-6">
            <div
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">

                <div class="p-5 flex flex-col justify-center">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 20 20" fill="none" stroke="#3B6BF6" stroke-width="2" width="16"
                                height="16">
                                <path d="M17 20H3a2 2 0 01-2-2V6a2 2 0 012-2h4l2-2h2l2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z"
                                    stroke-linecap="round" />
                            </svg>
                        </div>
                        <p class="text-[0.65rem] font-bold text-slate-500 uppercase tracking-wide leading-tight">
                            Total<br />User</p>
                    </div>
                    <p class="font-display text-2xl font-extrabold text-slate-800">{{ employees.length }}</p>
                </div>

                <div class="p-5 flex flex-col justify-center cursor-pointer hover:bg-slate-50 transition-colors group"
                    @click="openTypeDetail('H')">
                    <div class="flex items-center gap-3 mb-2">
                        <div
                            class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-slate-200 transition-colors">
                            <svg viewBox="0 0 20 20" fill="none" stroke="#475569" stroke-width="2" width="16"
                                height="16">
                                <path d="M5 10l4 4 6-8" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <p class="text-[0.65rem] font-bold text-slate-500 uppercase tracking-wide leading-tight">
                            Total<br />Hadir</p>
                    </div>
                    <p class="font-display text-2xl font-extrabold text-slate-600">{{ totalStatus('H') }}</p>
                </div>

                <div class="p-5 flex flex-col justify-center cursor-pointer hover:bg-amber-50/50 transition-colors group"
                    @click="openTypeDetail('T')">
                    <div class="flex items-center gap-3 mb-2">
                        <div
                            class="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                            <svg viewBox="0 0 20 20" fill="none" stroke="#92400e" stroke-width="2" width="16"
                                height="16">
                                <circle cx="10" cy="10" r="8" />
                                <path d="M10 6v4l3 2" stroke-linecap="round" />
                            </svg>
                        </div>
                        <p class="text-[0.65rem] font-bold text-slate-500 uppercase tracking-wide leading-tight">
                            Total<br />Terlambat</p>
                    </div>
                    <p class="font-display text-2xl font-extrabold text-[#92400e]">{{ totalStatus('T') }}</p>
                </div>

                <div class="p-5 flex flex-col justify-center cursor-pointer hover:bg-red-50/50 transition-colors group"
                    @click="openTypeDetail('A')">
                    <div class="flex items-center gap-3 mb-2">
                        <div
                            class="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                            <svg viewBox="0 0 20 20" fill="none" stroke="#b91c1c" stroke-width="2" width="16"
                                height="16">
                                <path d="M5 5l10 10M15 5L5 15" stroke-linecap="round" />
                            </svg>
                        </div>
                        <p class="text-[0.65rem] font-bold text-slate-500 uppercase tracking-wide leading-tight">
                            Tidak<br />Hadir</p>
                    </div>
                    <p class="font-display text-2xl font-extrabold text-[#b91c1c]">{{ totalStatus('A') }}</p>
                </div>

                <div class="p-5 flex flex-col justify-center cursor-pointer hover:bg-indigo-50/50 transition-colors group"
                    @click="openTypeDetail('SI')">
                    <div class="flex items-center gap-3 mb-2">
                        <div
                            class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                            <svg viewBox="0 0 20 20" fill="none" stroke="#4338ca" stroke-width="2" width="16"
                                height="16">
                                <path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7 4H4a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-3"
                                    stroke-linecap="round" />
                            </svg>
                        </div>
                        <p class="text-[0.65rem] font-bold text-slate-500 uppercase tracking-wide leading-tight">Sakit
                            /<br />Izin</p>
                    </div>
                    <p class="font-display text-2xl font-extrabold text-[#4338ca]">{{ totalStatus('S') +
                        totalStatus('I') }}</p>
                </div>

                <div
                    class="p-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden flex flex-col justify-center">
                    <div class="absolute right-[-10px] top-[-10px] opacity-10 pointer-events-none">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="80" height="80">
                            <path d="M12 2L2 22h20L12 2z" />
                        </svg>
                    </div>
                    <div class="relative z-10 flex flex-col mb-1">
                        <p class="text-[0.65rem] font-bold text-blue-100 uppercase tracking-wide mb-1">Kehadiran</p>
                        <p class="font-display text-2xl font-extrabold">{{ attendanceRate }}%</p>
                    </div>
                    <div class="relative z-10 w-full mt-2">
                        <div class="w-full bg-blue-900/40 rounded-full h-1 overflow-hidden">
                            <div class="bg-white h-1 rounded-full shadow-sm" :style="{ width: attendanceRate + '%' }">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Single Unified Table Card -->
        <div class="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden mb-8">
            <!-- Controls & Legend Header -->
            <div
                class="p-4 md:p-5 border-b border-slate-100 flex flex-col xl:flex-row xl:items-center justify-between gap-5 bg-white/50">
                <div class="legend-row mb-0 flex flex-wrap items-center gap-4 w-full xl:w-auto">
                    <span class="legend-item" v-for="l in legend" :key="l.code">
                        <span class="font-extrabold" :style="{ color: l.color }">{{ l.code }}</span>
                        <span class="text-slate-500 font-medium">{{ l.label }}</span>
                    </span>
                </div>

                <!-- Search & Pagination UI -->
                <div class="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
                    <div
                        class="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 h-[38px] w-full sm:w-64 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"
                            class="w-4 h-4 text-slate-400 shrink-0">
                            <circle cx="8.5" cy="8.5" r="5.5" />
                            <path d="M15 15l-3-3" stroke-linecap="round" />
                        </svg>
                        <input v-model="search" type="text"
                            class="bg-transparent border-none outline-none w-full text-[0.8rem] font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium"
                            placeholder="Cari nama pegawai..." />
                    </div>

                    <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <select v-model="itemsPerPage"
                            class="bg-white border border-slate-200 rounded-xl px-3 h-[38px] text-[0.75rem] font-bold text-slate-600 outline-none hover:border-slate-300 cursor-pointer shadow-sm transition-colors"
                            @change="currentPage = 1">
                            <option :value="5">5 Baris</option>
                            <option :value="10">10 Baris</option>
                            <option :value="25">25 Baris</option>
                            <option :value="50">50 Baris</option>
                        </select>
                        <vue-awesome-paginate :total-items="filteredEmployees.length" :items-per-page="itemsPerPage"
                            :max-pages-shown="3" v-model="currentPage" paginate-buttons-class="btn-paginate"
                            active-page-class="btn-paginate-active" back-button-class="btn-paginate-nav"
                            next-button-class="btn-paginate-nav" />
                    </div>
                </div>
            </div>

            <!-- Rekap Table -->
            <div class="rekap-wrap">
                <table class="rekap-table">
                    <thead>
                        <tr>
                            <th class="th-name sticky-col">Nama User</th>
                            <th class="th-dept">Departemen</th>
                            <th v-for="d in calendarDays" :key="d.date" class="th-day"
                                :class="{ 'th-today': d.date === 3, 'bg-slate-50': d.isWeekend }">
                                <div class="day-num">{{ d.date }}</div>
                                <div class="day-name">{{ d.day }}</div>
                            </th>
                            <th class="th-sum">H</th>
                            <th class="th-sum th-t">T</th>
                            <th class="th-sum th-a">A</th>
                            <th class="th-sum th-s">S</th>
                            <th class="th-sum th-i">I</th>
                            <th class="th-sum th-rate">%</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredEmployees.length === 0">
                            <td :colspan="calendarDays.length + 8"
                                class="text-center py-8 text-slate-500 text-sm font-medium">User tidak ditemukan.
                            </td>
                        </tr>
                        <tr v-for="emp in paginatedEmployees" :key="emp.id" class="rekap-row">
                            <td class="td-name sticky-col bg-white">
                                <span class="emp-name">{{ emp.name }}</span>
                            </td>
                            <td class="td-dept">{{ emp.department }}</td>
                            <td v-for="d in calendarDays" :key="d.date" class="td-cell"
                                :class="{ 'today-col': d.date === 3, 'bg-slate-50/70': d.isWeekend }"
                                @click="openEdit(emp, d)" :title="`${emp.name} · ${d.date} Mar`">
                                <span v-if="getStatus(emp.id, d.date)" class="status-chip"
                                    :class="getStatus(emp.id, d.date)">
                                    {{ getStatus(emp.id, d.date) }}
                                </span>
                                <span v-else class="status-chip empty">+</span>
                            </td>
                            <td class="td-sum">{{ empCount(emp.id, 'H') }}</td>
                            <td class="td-sum t-col">{{ empCount(emp.id, 'T') }}</td>
                            <td class="td-sum a-col">{{ empCount(emp.id, 'A') }}</td>
                            <td class="td-sum s-col">{{ empCount(emp.id, 'S') }}</td>
                            <td class="td-sum i-col">{{ empCount(emp.id, 'I') }}</td>
                            <td class="td-sum rate-col">{{ empRate(emp.id) }}%</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="rekap-foot">
                            <td class="td-foot-label sticky-col">Total Harian</td>
                            <td class="td-foot-label"></td>
                            <td v-for="d in calendarDays" :key="d.date" class="td-foot-val"
                                :class="{ 'bg-slate-50/70': d.isWeekend }">{{ !d.isWeekend ? dailyPresent(d.date) : '-'
                                }}
                            </td>
                            <td colspan="6"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <!-- Edit Modal -->
        <transition name="modal-fade">
            <div class="modal-overlay" v-if="editTarget" @click.self="editTarget = null">
                <div class="modal">
                    <div class="modal-header">
                        <div>
                            <p class="modal-meta">{{ editTarget.staffName }} · {{ editTarget.dayOfMonth }} Maret 2026
                            </p>
                            <h3 class="modal-title font-display">Catat Kehadiran</h3>
                        </div>
                        <button class="close-modal" @click="editTarget = null">✕</button>
                    </div>

                    <div class="status-picker">
                        <button v-for="s in statusOptions" :key="s.code" class="picker-btn"
                            :class="[s.code, { selected: editTarget.status === s.code }]"
                            @click="editTarget.status = s.code as AttendanceDayCode">
                            <span class="picker-chip">{{ s.code }}</span>
                            {{ s.label }}
                        </button>
                    </div>

                    <div class="time-row" v-if="editTarget.status === 'H' || editTarget.status === 'T'">
                        <div class="field-group">
                            <label class="field-label">Jam Masuk</label>
                            <input v-model="editTarget.checkInTime" type="time" class="field-input" />
                        </div>
                        <div class="field-group">
                            <label class="field-label">Jam Pulang</label>
                            <input v-model="editTarget.checkOutTime" type="time" class="field-input" />
                        </div>
                    </div>

                    <div class="field-group mt-sm">
                        <label class="field-label">Catatan (opsional)</label>
                        <textarea v-model="editTarget.note" class="field-input" rows="2"
                            placeholder="Contoh: Macet, Terlambat karena meeting..."></textarea>
                    </div>

                    <div class="modal-actions">
                        <button class="btn-del" v-if="editTarget.status" @click="deleteEntry">Hapus Data</button>
                        <div style="flex:1"></div>
                        <button class="btn-cancel" @click="editTarget = null">Batal</button>
                        <button class="btn-save" @click="saveEntry">Simpan</button>
                    </div>
                </div>
            </div>
        </transition>

        <!-- Detail Information Modal -->
        <transition name="modal-fade">
            <div class="modal-overlay" v-if="detailType" @click.self="detailType = null">
                <div class="modal">
                    <div class="modal-header">
                        <div>
                            <p class="modal-meta">Total Data</p>
                            <h3 class="modal-title font-display">User {{ typeDetailName }}</h3>
                        </div>
                        <button class="close-modal" @click="detailType = null">✕</button>
                    </div>
                    <div class="max-h-64 overflow-y-auto">
                        <table class="w-full text-left text-[0.8rem]">
                            <thead>
                                <tr class="text-slate-400 border-b border-slate-100">
                                    <th class="pb-2 font-medium">Nama</th>
                                    <th class="pb-2 font-medium text-center">Jumlah Hari</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="d in typeDetailData" :key="d.id"
                                    class="border-b border-slate-50 last:border-b-0">
                                    <td class="py-2.5 font-bold text-slate-700">{{ d.name }}</td>
                                    <td class="py-2.5 text-center font-bold text-slate-500">{{ d.count }} hr</td>
                                </tr>
                                <tr v-if="typeDetailData.length === 0">
                                    <td colspan="2" class="text-center py-4 text-slate-400">Tidak ada data.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </transition>

    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { VueAwesomePaginate } from "vue-awesome-paginate"
import "vue-awesome-paginate/dist/style.css"
import { useAttendance } from '~/composables/useAttendance'
import type { AttendanceGridStaff, AttendanceCellEditState, AttendanceDayCode } from '~/types'

const { getCalendarData, upsertRecord, deleteRecord, getExportUrl } = useAttendance()

const search = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const loading = ref(true)
const calendarDays = ref<any[]>([])
const employees = ref<AttendanceGridStaff[]>([])
const attendance = ref<Record<number, Record<number, AttendanceDayCode>>>({})
const editTarget = ref<AttendanceCellEditState | null>(null)
const detailType = ref<AttendanceDayCode | 'SI' | null>(null)

const selectedMonth = ref(new Date().toISOString().substring(0, 7)) // YYYY-MM

const legend = [
    { code: 'H', label: 'Hadir', bg: '#f1f5f9', color: '#64748b' },
    { code: 'T', label: 'Terlambat', bg: '#fef3c7', color: '#92400e' },
    { code: 'A', label: 'Tidak Hadir', bg: '#fee2e2', color: '#b91c1c' },
    { code: 'S', label: 'Sakit', bg: '#e0e7ff', color: '#4338ca' },
    { code: 'I', label: 'Izin', bg: '#f3e8ff', color: '#7e22ce' },
]

const statusOptions = [
    { code: 'H', label: 'Hadir' },
    { code: 'T', label: 'Terlambat' },
    { code: 'A', label: 'Tidak Hadir' },
    { code: 'S', label: 'Sakit' },
    { code: 'I', label: 'Izin' },
]

// Opsi bulan dinamis (4 bulan terakhir)
const monthOptions = computed(() => {
    const opts = []
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const lang = 'id-ID'

    for (let i = 0; i < 4; i++) {
        const d = new Date()
        d.setMonth(d.getMonth() - i)
        const val = d.toISOString().substring(0, 7)
        const label = `${months[d.getMonth()]} ${d.getFullYear()}`
        opts.push({ value: val, label })
    }
    return opts
})

const selectedMonthLabel = computed(() => {
    const opt = monthOptions.value.find(o => o.value === selectedMonth.value)
    return opt ? opt.label : selectedMonth.value
})

onMounted(async () => {
    initCalendar()
    loadData()
})

function initCalendar() {
    const parts = selectedMonth.value.split('-').map(Number)
    const year = parts[0] || 2026
    const month = parts[1] || 3
    const daysInMonth = new Date(year, month, 0).getDate()
    const days = []
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month - 1, i)
        days.push({
            date: i,
            day: dayNames[date.getDay()],
            isWeekend: date.getDay() === 0 || date.getDay() === 6
        })
    }
    calendarDays.value = days
}

async function loadData() {
    try {
        loading.value = true
        const parts = selectedMonth.value.split('-').map(Number)
        const year = parts[0] || 2026
        const month = parts[1] || 3
        const res = await getCalendarData({ year, month })
        employees.value = res.employees
        attendance.value = res.attendance
    } catch (err) {
        console.error('Gagal memuat rekap:', err)
    } finally {
        loading.value = false
    }
}

watch(selectedMonth, () => {
    initCalendar()
    loadData()
})

const filteredEmployees = computed(() => {
    if (!search.value) return employees.value
    const s = search.value.toLowerCase()
    return employees.value.filter(e => e.name.toLowerCase().includes(s))
})

const paginatedEmployees = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return filteredEmployees.value.slice(start, start + itemsPerPage.value)
})

const attendanceRate = computed(() => {
    let total = 0, present = 0
    employees.value.forEach(emp => {
        calendarDays.value.forEach(d => {
            const s = attendance.value[emp.id]?.[d.date]
            if (s) { total++; if (s === 'H' || s === 'T') present++ }
        })
    })
    return total ? Math.round((present / total) * 100) : 0
})

const getStatus = (empId: number, date: number) => attendance.value[empId]?.[date] || null

const empCount = (empId: number, code: string) => {
    return Object.values(attendance.value[empId] || {}).filter(s => s === code).length
}

const empRate = (empId: number) => {
    const vals = Object.values(attendance.value[empId] || {})
    if (!vals.length) return 0
    const present = vals.filter(s => s === 'H' || s === 'T').length
    return Math.round((present / vals.length) * 100)
}

const totalStatus = (code: string) => {
    let count = 0
    employees.value.forEach(emp => {
        count += empCount(emp.id, code)
    })
    return count
}

const dailyPresent = (date: number) => {
    return employees.value.filter(emp => {
        const s = attendance.value[emp.id]?.[date]
        return s === 'H' || s === 'T'
    }).length
}

const openEdit = (emp: AttendanceGridStaff, day: { date: number }) => {
    editTarget.value = {
        staffId: emp.id,
        staffName: emp.name,
        dayOfMonth: day.date,
        status: attendance.value[emp.id]?.[day.date] || '',
        checkInTime: '07:00',
        checkOutTime: '17:00',
        note: ''
    }
}

const saveEntry = async () => {
    if (!editTarget.value) return
    try {
        if (!editTarget.value.status) {
            await doDelete()
            return
        }
        const parts = selectedMonth.value.split('-').map(Number)
        const year = parts[0] || 2026
        const month = parts[1] || 3
        const dateStr = `${year}-${month.toString().padStart(2, '0')}-${editTarget.value.dayOfMonth.toString().padStart(2, '0')}`
        await upsertRecord({
            employeeId: editTarget.value.staffId,
            recordDate: dateStr,
            dayCode: editTarget.value.status as AttendanceDayCode,
            checkInTime: editTarget.value.checkInTime,
            checkOutTime: editTarget.value.checkOutTime,
            note: editTarget.value.note
        })
        if (!attendance.value[editTarget.value.staffId]) attendance.value[editTarget.value.staffId] = {}
        const staffAttendance = attendance.value[editTarget.value.staffId]
        if (staffAttendance) {
            staffAttendance[editTarget.value.dayOfMonth] = editTarget.value.status as AttendanceDayCode
        }
        editTarget.value = null
    } catch (err: any) {
        alert(err.message || 'Gagal menyimpan.')
    }
}

const doDelete = async () => {
    if (!editTarget.value) return
    try {
        const parts = selectedMonth.value.split('-').map(Number)
        const year = parts[0] || 2026
        const month = parts[1] || 3
        const dateStr = `${year}-${month.toString().padStart(2, '0')}-${editTarget.value.dayOfMonth.toString().padStart(2, '0')}`
        await deleteRecord(editTarget.value.staffId, dateStr)
        const staffAttendance = attendance.value[editTarget.value.staffId]
        if (staffAttendance) {
            delete staffAttendance[editTarget.value.dayOfMonth]
        }
        editTarget.value = null
    } catch (err: any) {
        alert(err.message || 'Gagal menghapus.')
    }
}

const deleteEntry = doDelete

const openTypeDetail = (type: AttendanceDayCode | 'SI') => {
    detailType.value = type
}

const typeDetailName = computed(() => {
    if (detailType.value === 'H') return 'Hadir'
    if (detailType.value === 'T') return 'Terlambat'
    if (detailType.value === 'A') return 'Tidak Hadir'
    if (detailType.value === 'SI') return 'Sakit / Izin'
    return ''
})

const typeDetailData = computed(() => {
    if (!detailType.value) return []
    let list: any[] = []
    employees.value.forEach(emp => {
        let count = 0
        if (detailType.value === 'SI') {
            count = empCount(emp.id, 'S') + empCount(emp.id, 'I')
        } else if (detailType.value) {
            count = empCount(emp.id, detailType.value)
        }
        if (count > 0) {
            list.push({ id: emp.id, name: emp.name, count })
        }
    })
    return list.sort((a, b) => b.count - a.count)
})

const exportExcel = async () => {
    const res = await getExportUrl('excel', { month: selectedMonth.value })
    if (res.url) window.open(res.url, '_blank')
}
const exportPdf = async () => {
    const res = await getExportUrl('pdf', { month: selectedMonth.value })
    if (res.url) window.open(res.url, '_blank')
}

watch(search, () => {
    currentPage.value = 1
})
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

/* ── HEADER ── */
.page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.page-title {
    font-size: 1.35rem;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.02em;
}

.page-sub {
    font-size: 0.78rem;
    color: #9ca3af;
    margin-top: 0.15rem;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.month-nav {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    padding: 0.3rem 0.5rem;
}

.nav-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #a1a5ac;
    font-size: 1rem;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.1s;
}

.nav-btn:hover {
    background: #f3f4f6;
}

.month-label {
    font-size: 0.82rem;
    font-weight: 800;
    color: #111827;
    padding: 0 0.25rem;
}

.btn-export {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.9rem;
    border-radius: 9px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: opacity 0.15s;
}

.btn-export.excel {
    background: #dbeafe;
    color: #1e40af;
}

.btn-export.pdf {
    background: #1e3a8a;
    color: #fff;
}

.btn-export:hover {
    opacity: 0.8;
}

/* ── SUMMARY STRIP ── */
/* Removed CSS logic and replaced with Tailwind grid inline */

/* Pagination Override */
:deep(.btn-paginate) {
    background: #fff;
    border: 1.5px solid #eaecf0;
    border-radius: 10px;
    color: #64748b;
    font-weight: 700;
    font-size: 0.75rem;
    min-width: 36px;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.1s;
    margin: 0 0.15rem;
    font-family: 'DM Sans', sans-serif;
}

:deep(.btn-paginate:hover) {
    background: #f8fafc;
    border-color: #cbd5e1;
    color: #1e293b;
}

:deep(.btn-paginate-active) {
    background: #0c1837;
    color: #fff;
    border-color: #0c1837;
}

:deep(.btn-paginate-active:hover) {
    background: #1e293b;
    border-color: #1e293b;
}

:deep(.btn-paginate-nav) {
    font-size: 1.1rem;
    color: #94a3b8;
}

:deep(.btn-paginate-nav:hover) {
    color: #475569;
}

:deep(.btn-paginate[disabled]) {
    opacity: 0.4;
    cursor: not-allowed;
}

/* ── LEGEND ── */
.legend-row {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
    font-size: 0.72rem;
    color: #a1a5ac;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-weight: 500;
}

.legend-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    font-size: 0.62rem;
    font-weight: 800;
}

/* ── TABLE ── */
.rekap-wrap {
    overflow-x: auto;
    padding-bottom: 0px;
}

.rekap-wrap::-webkit-scrollbar {
    height: 10px;
}

.rekap-wrap::-webkit-scrollbar-track {
    background: transparent;
}

.rekap-wrap::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
    border: 3px solid #fff;
}

.rekap-wrap::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

.rekap-table {
    border-collapse: collapse;
    white-space: nowrap;
    width: max-content;
    min-width: 100%;
}

/* Headers */
.th-name {
    min-width: 160px;
    max-width: 180px;
}

.th-dept {
    min-width: 110px;
}

.th-day {
    width: 34px;
    padding: 0.55rem 0;
    text-align: center;
    font-size: 0.6rem;
    font-weight: 600;
    color: #9ca3af;
    border-right: 1px solid #f5f5f7;
    vertical-align: bottom;
}

.th-today {
    color: #3B6BF6;
    background: #eef3ff;
}

.th-today .day-num {
    color: #3B6BF6;
    font-weight: 800;
}

.day-num {
    font-size: 0.78rem;
    font-weight: 700;
    color: #374151;
    line-height: 1;
}

.day-name {
    font-size: 0.58rem;
    color: #9ca3af;
    margin-top: 1px;
}

.th-sum {
    width: 36px;
    text-align: center;
    padding: 0.55rem 0.25rem;
    font-size: 0.65rem;
    font-weight: 800;
    color: #a1a5ac;
    background: #fafafa;
    border-left: 1px solid #eaecf0;
}

.th-t {
    color: #92400e;
    background: #fef3c7;
}

.th-a {
    color: #b91c1c;
    background: #fee2e2;
}

.th-s {
    color: #4338ca;
    background: #e0e7ff;
}

.th-i {
    color: #7e22ce;
    background: #f3e8ff;
}

.th-rate {
    color: #3b82f6;
    background: #eff6ff;
    min-width: 42px;
}

thead tr {
    border-bottom: 1.5px solid #eaecf0;
}

thead th {
    position: relative;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

thead .th-name,
thead .th-dept {
    padding: 0.7rem 1rem;
    text-align: left;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #a1a5ac;
    background: #fafafa;
    text-transform: uppercase;
}

/* Sticky columns */
.sticky-col {
    position: sticky;
    left: 0;
    z-index: 3;
    background: #fff;
}

.sticky-col2 {
    position: sticky;
    left: 180px;
    z-index: 3;
    background: #fff;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
}

thead .sticky-col,
thead .sticky-col2 {
    background: #fafafa;
    z-index: 4;
}

/* Rows */
.rekap-row {
    border-bottom: 1px solid #f5f5f7;
    transition: background 0.1s;
}

.rekap-row:hover {
    background: #fafbff;
}

.rekap-row:hover .sticky-col {
    background: #fafbff;
}

.td-name {
    padding: 0.55rem 1rem;
}

.td-dept {
    padding: 0.55rem 1rem;
    font-size: 0.75rem;
    color: #a1a5ac;
}

/* Employee cell */
.emp-cell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.emp-avatar {
    width: 26px;
    height: 26px;
    border-radius: 7px;
    color: #fff;
    font-size: 0.58rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.emp-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: #111827;
}

/* Status cells */
.td-cell {
    width: 34px;
    text-align: center;
    padding: 0.3rem 1px;
    border-right: 1px solid #f5f5f7;
    cursor: pointer;
    transition: background 0.1s;
    vertical-align: middle;
}

.today-col {
    background: #f9fbff;
}

.td-cell:hover {
    background: #eef3ff;
}

.status-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 5px;
    font-size: 0.68rem;
    font-weight: 800;
    cursor: pointer;
    transition: transform 0.1s;
}

.status-chip:hover {
    transform: scale(1.1);
}

.status-chip.H {
    background: transparent;
    color: #64748b;
}

.status-chip.T {
    background: transparent;
    color: #d97706;
    /* slightly brighter for contrast without bg */
}

.status-chip.A {
    background: transparent;
    color: #dc2626;
    /* bright red */
}

.status-chip.S {
    background: transparent;
    color: #4f46e5;
    /* indigo */
}

.status-chip.I {
    background: transparent;
    color: #9333ea;
    /* purple */
}

.status-chip.empty {
    background: transparent;
    color: #cbd5e1;
    font-size: 0.75rem;
    border: none;
}

/* Summary cols */
.td-sum {
    text-align: center;
    padding: 0.4rem 0.25rem;
    font-size: 0.78rem;
    font-weight: 700;
    color: #374151;
    background: #fafafa;
    border-left: 1px solid #eaecf0;
}

.t-col {
    color: #92400e;
    background: #fef3c7;
}

.a-col {
    color: #b91c1c;
    background: #fee2e2;
}

.s-col {
    color: #4338ca;
    background: #e0e7ff;
}

.i-col {
    color: #7e22ce;
    background: #f3e8ff;
}

.rate-col {
    color: #3b82f6;
    background: #eff6ff;
    font-size: 0.72rem;
}

/* Footer total row */
.rekap-foot {
    background: #f9fafb;
}

.td-foot-label {
    padding: 0.55rem 1rem;
    font-size: 0.72rem;
    font-weight: 700;
    color: #a1a5ac;
    text-transform: uppercase;
    letter-spacing: 0.06em;
}

.td-foot-val {
    text-align: center;
    font-size: 0.75rem;
    font-weight: 700;
    color: #374151;
    border-right: 1px solid #f0f0f5;
    padding: 0.4rem 0;
}

/* ── MODAL ── */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
}

.modal {
    background: #fff;
    border-radius: 20px;
    padding: 1.5rem;
    width: min(400px, 92vw);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.1rem;
}

.modal-meta {
    font-size: 0.72rem;
    color: #9ca3af;
    font-weight: 600;
    margin-bottom: 0.15rem;
}

.modal-title {
    font-size: 1rem;
    font-weight: 800;
    color: #111827;
}

.close-modal {
    background: #f3f4f6;
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #a1a5ac;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.15s;
}

.close-modal:hover {
    background: #e5e7eb;
}

/* Status picker */
.status-picker {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.picker-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    padding: 0.6rem 0.25rem;
    border-radius: 10px;
    border: 1.5px solid #e5e7eb;
    background: #f9fafb;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    color: #a1a5ac;
    transition: all 0.15s;
}

.picker-btn:hover {
    border-color: #d1d5db;
    background: #f3f4f6;
}

.picker-btn.selected {
    border-color: currentColor;
    background: #fff;
}

.picker-btn.H.selected {
    border-color: #94a3b8;
    color: #64748b;
    background: #f1f5f9;
}

.picker-btn.T.selected {
    border-color: #f59e0b;
    color: #92400e;
    background: #fef3c7;
}

.picker-btn.A.selected {
    border-color: #fca5a5;
    color: #b91c1c;
    background: #fee2e2;
}

.picker-btn.S.selected {
    border-color: #c7d2fe;
    color: #4338ca;
    background: #e0e7ff;
}

.picker-btn.I.selected {
    border-color: #e9d5ff;
    color: #7e22ce;
    background: #f3e8ff;
}

.picker-chip {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.68rem;
    font-weight: 800;
    background: rgba(0, 0, 0, 0.06);
}

.picker-btn.selected .picker-chip {
    background: rgba(0, 0, 0, 0.1);
}

/* Time row */
.time-row {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
}

.field-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    flex: 1;
}

.mt-sm {
    margin-top: 0.75rem;
}

.field-label {
    font-size: 0.72rem;
    font-weight: 600;
    color: #374151;
}

.field-input {
    padding: 0.58rem 0.8rem;
    border-radius: 9px;
    border: 1.5px solid #e5e7eb;
    background: #f9fafb;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    color: #111827;
    outline: none;
    resize: vertical;
    width: 100%;
}

.field-input:focus {
    border-color: #3B6BF6;
    background: #fff;
}

/* Modal actions */
.modal-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.1rem;
}

.btn-del {
    padding: 0.55rem 0.85rem;
    border-radius: 8px;
    border: 1.5px solid #93c5fd;
    background: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    color: #1d4ed8;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
}

.btn-del:hover {
    background: #eff6ff;
}

.btn-cancel {
    padding: 0.55rem 1rem;
    border-radius: 9px;
    border: 1.5px solid #e5e7eb;
    background: #fff;
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
}

.btn-save {
    background: #3B6BF6;
    color: #fff;
    border: none;
    border-radius: 9px;
    padding: 0.55rem 1.1rem;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
}

.btn-save:hover {
    background: #2a57e0;
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.2s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active .modal {
    transition: transform 0.2s;
}

.modal-fade-enter-from .modal {
    transform: translateY(10px) scale(0.98);
}

@media (max-width: 900px) {
    .sum-tile {
        min-width: 140px;
    }
}
</style>
