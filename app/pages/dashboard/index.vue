<template>

    <!-- Main Container -->
    <div class="max-w-6xl mx-auto py-2">

        <!-- Page Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div class="max-w-2xl">
                <h1 class="font-display text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Selamat Pagi,
                    Admin.</h1>
            </div>
            <div class="flex items-center gap-3 shrink-0">
                <NuxtLink to="/kiosk"
                    class="flex items-center gap-2 bg-[#0c1837] hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-[0.8rem] font-bold transition-colors shadow-lg shadow-blue-900/20">
                    <Monitor class="w-4 h-4" />
                    Buka Kiosk
                </NuxtLink>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div v-for="(stat, idx) in stats" :key="idx"
                class="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[140px]">
                <div class="flex items-start justify-between w-full h-8">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                        :class="stat.iconBgClass">
                        <component :is="iconMap[stat.icon]" v-if="stat.icon && iconMap[stat.icon]" class="w-5 h-5" />
                    </div>
                </div>
                <div class="mt-6">
                    <p class="text-[0.65rem] font-bold text-slate-400 tracking-wider uppercase mb-1">{{ stat.label
                        }}</p>
                    <p class="font-display text-2xl font-extrabold text-slate-900 leading-none">{{ stat.value }}</p>
                </div>
            </div>
        </div>

        <!-- Main Content Row -->
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-8">

            <!-- Grafik -->
            <div
                class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col min-h-[400px]">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h3 class="text-slate-800 font-bold text-lg mb-1">Grafik Kehadiran Mingguan</h3>
                        <p class="text-slate-400 text-xs">Total pindaian masuk per hari</p>
                    </div>
                    <div class="relative">
                        <button @click="showRangeDropdown = !showRangeDropdown"
                            class="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 text-sm font-medium hover:bg-slate-100 transition-colors">
                            <span>{{ rangeLabels[chartRange] }}</span>
                            <ChevronDown class="w-4 h-4" />
                        </button>

                        <!-- Dropdown Menu -->
                        <div v-if="showRangeDropdown"
                            class="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <button v-for="(label, key) in rangeLabels" :key="key" @click="changeRange(key)"
                                :class="['w-full px-4 py-2 text-left text-sm transition-colors hover:bg-slate-50', chartRange === key ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-600']">
                                {{ label }}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex-1 w-full flex items-end justify-between px-2 gap-3 relative">
                    <!-- Custom pseudo-bars -->
                    <div v-for="(day, i) in chartData" :key="i"
                        class="w-full relative flex flex-col items-center justify-end h-full group">
                        <!-- Tooltip for highest -->
                        <div v-if="day.highlight"
                            class="absolute -top-8 bg-slate-900 text-white text-[0.65rem] font-bold px-2.5 py-1 rounded-md shadow-lg opacity-100 z-30">
                            Peak: {{ day.val }}
                        </div>
                        <div class="w-[85%] max-w-[40px] rounded-t-xl transition-all duration-300"
                            :class="day.highlight ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)] z-10' : 'bg-[#e2eafc] group-hover:bg-[#d4dffd]'"
                            :style="{ height: day.height }"></div>
                        <span
                            class="text-[0.65rem] font-bold text-slate-500 mt-4 uppercase tracking-wider relative z-20">{{
                                day.label }}</span>
                    </div>
                </div>
            </div>

            <!-- Live Feed Section -->
            <div class="bg-[#f8faff] rounded-2xl p-6 border border-blue-50 flex flex-col">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-display text-[1.05rem] font-extrabold text-slate-900">Deteksi Live</h3>
                    <NuxtLink to="/dashboard/laporan" class="text-[0.7rem] font-bold text-blue-600 hover:text-blue-800">
                        Lihat Laporan</NuxtLink>
                </div>
                <div class="flex flex-col gap-3 flex-1">
                    <div v-for="user in liveFeed" :key="user.id"
                        class="bg-white p-3.5 rounded-2xl border border-blue-50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] flex items-center gap-3">
                        <div class="relative">
                            <div
                                class="w-[2.35rem] h-[2.35rem] rounded-full bg-[#0c1837] border border-white shadow-sm overflow-hidden flex items-center justify-center text-xs font-bold text-white relative">
                                <div class="absolute inset-0 bg-blue-900 opacity-50 mix-blend-multiply"></div>
                                <span class="relative z-10">
                                    <User class="w-4 h-4 opacity-70" />
                                </span>
                            </div>
                            <span
                                class="absolute bottom-0 right-0 w-[0.6rem] h-[0.6rem] rounded-full border-2 border-white"
                                :class="user.presence === 'online' ? 'bg-green-500' : 'bg-amber-500'"></span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-[0.78rem] font-bold text-slate-900 truncate tracking-tight">{{ user.name
                                }}</p>
                            <p class="text-[0.55rem] text-slate-500 font-bold tracking-wide uppercase truncate mt-0.5">
                                {{ user.terminalLabel }}</p>
                        </div>
                        <div class="text-right shrink-0">
                            <p class="text-[0.65rem] font-extrabold text-slate-800 tracking-tight">{{
                                user.timeDisplay }}
                            </p>
                            <p class="text-[0.6rem] font-bold text-blue-600 tracking-wide mt-0.5"
                                :class="{ 'text-amber-500': user.presence === 'late' }">{{ user.matchLabel }}</p>
                        </div>
                    </div>
                </div>
                <div
                    class="mt-4 bg-[#eef2fc] p-4 rounded-2xl flex items-center justify-between border border-blue-50/50">
                    <div>
                        <p class="text-[0.75rem] font-extrabold text-slate-800">Laporan Rekapitulasi</p>
                        <p class="text-[0.62rem] text-slate-500 font-medium mt-0.5 leading-snug">Data absensi
                            bulanan sudah<br>bisa diunduh.</p>
                    </div>
                    <div class="flex gap-[3px] items-end h-[30px] opacity-70">
                        <div class="w-[5px] h-[12px] bg-slate-300 rounded-sm"></div>
                        <div class="w-[5px] h-[18px] bg-slate-400 rounded-sm"></div>
                        <div class="w-[5px] h-[24px] bg-slate-300 rounded-sm"></div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Top Early Arrivals -->
        <div class="mb-4">
            <div class="flex items-center justify-between mb-5">
                <div>
                    <h3 class="font-display text-[1.1rem] font-extrabold text-slate-900">Kedatangan Terawal Hari Ini
                    </h3>
                    <p class="text-[0.75rem] text-slate-500 font-medium">Top 5 user yang hadir paling pagi dengan
                        rekor waktu terbaik.
                    </p>
                </div>
                <NuxtLink to="/dashboard/laporan"
                    class="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50 transition-colors">
                    Lihat Rekap
                </NuxtLink>
            </div>

            <!-- Cards Row -->
            <div class="flex overflow-x-auto pb-4 gap-4 snap-x">

                <div v-for="(user, idx) in enrollments.slice(0, 5)" :key="user.id"
                    class="snap-start shrink-0 w-[160px] aspect-[3/4.2] rounded-[1.25rem] bg-gradient-to-b from-blue-900 to-[#0c1837] relative overflow-hidden group shadow-[0_8px_30px_-12px_rgba(59,107,246,0.4)]">
                    <!-- Decorative Star -->
                    <div
                        class="absolute inset-0 opacity-10 flex items-center justify-center p-4 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12">
                        <Star class="w-24 h-24 text-white" />
                    </div>
                    <!-- Time Badge -->
                    <div
                        class="absolute top-4 left-4 bg-white/10 backdrop-blur-md rounded-lg px-2.5 py-1.5 border border-white/20 shadow-sm">
                        <p class="text-white font-extrabold text-[0.68rem] tracking-wider font-display uppercase">
                            {{ user.scannedAt ? new Date(user.scannedAt).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit'
                            }) : '07:00' }}
                        </p>
                    </div>
                    <!-- User Info -->
                    <div
                        class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0c1837] via-[#0c1837]/90 to-transparent">
                        <p class="text-white font-bold text-[0.8rem] truncate tracking-tight">{{ user.fullName }}
                        </p>
                        <p class="text-blue-300 text-[0.55rem] font-bold tracking-widest uppercase mt-0.5">Top {{
                            idx + 1 }} Kehadiran</p>
                    </div>
                </div>

                <NuxtLink to="/dashboard/laporan"
                    class="snap-start shrink-0 w-[160px] aspect-[3/4.2] rounded-[1.25rem] border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-100/50 hover:border-blue-300 transition-all flex flex-col items-center justify-center gap-3 group">
                    <div
                        class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                        <ArrowRight class="w-4 h-4" />
                    </div>
                    <span class="text-[0.7rem] font-bold text-blue-700 tracking-tight">Lihat Laporan</span>
                </NuxtLink>

            </div>
        </div>

    </div>

</template>

<script lang="ts" setup>
import { onMounted, ref, markRaw } from 'vue'
import { useTenantDashboard } from '~/composables/useTenantDashboard'
import {
    User,
    Clock,
    ScanFace,
    Users,
    Monitor,
    ChevronDown,
    ChevronRight,
    Star,
    ArrowRight
} from 'lucide-vue-next'

definePageMeta({
    layout: 'dashboard'
})

const { getSummary, getAttendanceChart, getLiveFeed, getEarlyArrivals } = useTenantDashboard()

const stats = ref<any[]>([])
const chartData = ref<any[]>([])
const liveFeed = ref<any[]>([])
const enrollments = ref<any[]>([])
const loading = ref(true)

const chartRange = ref('7d')
const showRangeDropdown = ref(false)
const rangeLabels: Record<string, string> = {
    '7d': '7 Hari Terakhir',
    '20d': '20 Hari Terakhir',
    '30d': '30 Hari Terakhir'
}

const changeRange = async (range: string) => {
    chartRange.value = range
    showRangeDropdown.value = false
    try {
        chartData.value = await getAttendanceChart(range)
    } catch (e) {
        console.error('Gagal memuat grafik:', e)
    }
}

// Map from backend icon string to Lucide component with markRaw
const iconMap: Record<string, any> = {
    'User': markRaw(User),
    'user': markRaw(User),
    'Clock': markRaw(Clock),
    'clock': markRaw(Clock),
    'ScanFace': markRaw(ScanFace),
    'face': markRaw(ScanFace),
    'Users': markRaw(Users),
    'users': markRaw(Users)
}

onMounted(async () => {
    try {
        const [s, c, l, e] = await Promise.all([
            getSummary(),
            getAttendanceChart(chartRange.value),
            getLiveFeed(),
            getEarlyArrivals()
        ])
        stats.value = s
        chartData.value = c
        liveFeed.value = l
        enrollments.value = e
    } catch (err) {
        console.error('Gagal mengambil data dashboard:', err)
    } finally {
        loading.value = false
    }
})
</script>

<style scoped>
/* Hidden scrollbar for overflow areas */
::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
