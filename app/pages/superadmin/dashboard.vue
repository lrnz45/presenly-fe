<template>
    <div class="mx-auto mb-10">
        <!-- Page Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div class="max-w-2xl">
                <h1 class="font-display text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Sistem Overview
                </h1>
                <p class="text-[0.85rem] text-slate-500 leading-relaxed font-medium">
                    Pantau performa infrastruktur biometric dan pertumbuhan ekosistem Presenly.
                </p>
            </div>
            <div class="flex items-center gap-3 shrink-0">
                <div
                    class="flex items-center gap-2 bg-[#0c1837] text-white px-5 py-2.5 rounded-xl text-[0.8rem] font-bold shadow-lg shadow-blue-900/20 transition-all hover:bg-slate-800">
                    {{ scanCount }} Pindaian Hari Ini
                </div>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div v-for="s in stats" :key="s.label"
                class="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[140px] group transition-all hover:shadow-md">
                <div class="flex items-start justify-between w-full h-8">
                    <div :class="['w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110', s.bg]">
                        <component :is="iconMap[s.icon]" class="w-5 h-5" />
                    </div>
                </div>
                <div class="mt-6">
                    <p class="text-[0.65rem] font-bold text-slate-400 tracking-wider uppercase mb-1">{{ s.label }}
                    </p>
                    <p class="font-display text-2xl font-extrabold text-slate-900 leading-none">{{ s.value }}</p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 mb-8">
            <!-- Chart Section -->
            <div
                class="bg-[#f8faff] rounded-2xl p-7 border border-blue-50 h-[400px] flex flex-col transition-all hover:shadow-sm">
                <div class="flex items-start justify-between mb-8">
                    <div>
                        <h3 class="font-display text-[1.1rem] font-extrabold text-slate-900 mb-0.5">Grafik Pindaian
                            {{ rangeOptions.find(o => o.id === activeRange)?.label }}</h3>
                        <p class="text-xs text-slate-500 font-medium">Total pindaian wajah di seluruh instansi</p>
                    </div>
                    
                    <!-- Dropdown Pindaian -->
                    <div class="relative">
                        <button @click="showRangeDropdown = !showRangeDropdown"
                            class="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5 hover:bg-slate-50 transition-colors">
                            {{ rangeOptions.find(o => o.id === activeRange)?.label }}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" 
                                class="w-3 h-3 transition-transform" :class="{ 'rotate-180': showRangeDropdown }">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>
                        
                        <!-- Dropdown Menu -->
                        <div v-if="showRangeDropdown" 
                            class="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl z-[50] py-1">
                            <button v-for="opt in rangeOptions" :key="opt.id"
                                @click="selectRange(opt.id)"
                                class="w-full text-left px-3 py-2 text-[10px] sm:text-[11px] font-bold hover:bg-slate-50 flex items-center justify-between"
                                :class="activeRange === opt.id ? 'text-blue-600' : 'text-slate-600'">
                                {{ opt.label }}
                                <div v-if="activeRange === opt.id" class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="flex-1 w-full flex items-end justify-between px-2 relative"
                    :class="chartData.length > 25 ? 'gap-0.5' : (chartData.length > 10 ? 'gap-1' : 'gap-3')">
                    <div v-for="(day, i) in chartData" :key="i"
                        class="w-full relative flex flex-col items-center justify-end h-full group">
                        <div v-if="day.highlight"
                            class="absolute -top-10 bg-slate-900 text-white text-[0.65rem] font-bold px-2.5 py-1.5 rounded-md shadow-lg z-10">
                            {{ day.val }}
                        </div>
                        <div class="w-full max-w-[45px] rounded-t-xl transition-all duration-500 ease-out origin-bottom"
                            :class="day.highlight ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'bg-[#e2eafc] group-hover:bg-blue-200'"
                            :style="{ height: day.height }"></div>
                        <span class="text-[0.6rem] font-bold text-slate-400 mt-4 uppercase tracking-wider"
                            v-if="chartData.length <= 15 || i % 5 === 0">{{ day.label }}</span>
                    </div>
                </div>
            </div>

            <!-- Latest Tenants Sidebar -->
            <div
                class="bg-white rounded-2xl  border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 overflow-hidden flex flex-col transition-all hover:shadow-md">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="font-display text-[1.05rem] font-extrabold text-slate-900">Tenant Terbaru</h3>
                    <NuxtLink to="/superadmin/instansi" class="text-[0.7rem] font-bold text-blue-600 hover:text-blue-800">
                        Semua</NuxtLink>
                </div>
                <div class="space-y-4 flex-1">
                    <div v-for="t in tenants" :key="t.id"
                        class="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors group">
                        <div
                            class="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-105 transition-transform shrink-0">
                            {{ t.initials }}
                        </div>
                        <div class="min-w-0">
                            <p class="text-sm font-bold text-slate-900 truncate leading-none mb-1.5">{{ t.name }}
                            </p>
                            <div class="flex items-center gap-2">
                                <span class="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">{{
                                    t.plan }}</span>
                                <span class="w-1 h-1 rounded-full bg-slate-200"></span>
                                <span class="text-[0.6rem] font-bold text-blue-500 uppercase">{{ t.memberCount }}
                                    User</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-8 bg-blue-50/50 p-5 rounded-2xl border border-blue-100/30">
                    <p class="text-[0.75rem] font-extrabold text-blue-900 mb-1 leading-none">Pertumbuhan
                        Eksponensial</p>
                    <p class="text-[0.62rem] text-blue-600 font-medium leading-relaxed">
                        Bulan ini terdapat peningkatan <span class="font-black text-blue-700">12%</span> pada
                        pendaftaran instansi kategori Sekolah.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, markRaw } from 'vue'
import { 
    Building2, 
    Wallet, 
    Scan, 
    Users,
    ChevronDown
} from 'lucide-vue-next'

definePageMeta({
    layout: 'superadmin'
})

// Ikon & Label Desain Asli - Updated with more modern SVGs
const stats = ref([
    { 
        label: 'Instansi Aktif', value: '0', bg: 'bg-blue-50 border-blue-100/50 text-blue-600', 
        icon: 'Building2' 
    },
    { 
        label: 'Pendapatan', value: 'Rp 0', bg: 'bg-emerald-50 border-emerald-100/50 text-emerald-600', 
        icon: 'Wallet' 
    },
    { 
        label: 'Pindaian Hari Ini', value: '0', bg: 'bg-amber-50 border-amber-100/50 text-amber-600', 
        icon: 'Scan' 
    },
    { 
        label: 'Total User', value: '0', bg: 'bg-purple-50 border-purple-100/50 text-purple-600', 
        icon: 'Users' 
    },
])

// Map string to Lucide component with markRaw
const iconMap: Record<string, any> = {
    'Building2': markRaw(Building2),
    'Wallet': markRaw(Wallet),
    'Scan': markRaw(Scan),
    'Users': markRaw(Users)
}

const scanCount = ref('0')
const chartData = ref<any[]>([])
const tenants = ref<any[]>([])

// Dropdown State
const activeRange = ref('7d')
const showRangeDropdown = ref(false)
const rangeOptions = [
    { id: '7d', label: '7 Hari Terakhir' },
    { id: '20d', label: '20 Hari Terakhir' },
    { id: '30d', label: '30 Hari Terakhir' },
    { id: '90d', label: '3 Bulan Terakhir' }
]

const selectRange = (id: string) => {
    activeRange.value = id
    showRangeDropdown.value = false
    fetchDashboard() // Re-fetch chart data
}

const fetchDashboard = async () => {
    const { fetchApi } = useApi()

    try {
        const [s, c, t] = await Promise.all([
            fetchApi<any[]>('/admin/overview/stats'),
            fetchApi<any[]>(`/admin/overview/scan-chart?range=${activeRange.value}`),
            fetchApi<any[]>('/admin/overview/recent-institutions')
        ])
        
        // Map dynamic values back to our styled stats
        if (s && Array.isArray(s)) {
            s.forEach(remoteStat => {
                const local = stats.value.find(l => l.label === remoteStat.label)
                if (local) local.value = remoteStat.value
            })
            
            const scanTodayStat = s.find(stat => stat.label === 'Pindaian Hari Ini')
            if (scanTodayStat) scanCount.value = scanTodayStat.value
        }

        if (c) chartData.value = c
        if (t) tenants.value = t
    } catch (e) {
        console.error('Failed to fetch superadmin dashboard', e)
    }
}

onMounted(() => {
    fetchDashboard()
})
</script>

<style scoped>
.font-display {
    font-family: 'Cabinet Grotesk', sans-serif;
}
</style>
