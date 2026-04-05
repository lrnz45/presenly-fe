<template>
    <div class="mx-auto mb-10">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
            <div>
                <h1 class="font-display text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Manajemen
                    Instansi</h1>
                <p class="text-[0.85rem] text-slate-500 leading-relaxed font-medium">Kelola data tenant, paket
                    berlangganan, dan verifikasi foto semua instansi.</p>
            </div>
            <button @click="openAddModal"
                class="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Tambah Instansi
            </button>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div v-for="s in summaryStats" :key="s.label"
                class="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div class="flex items-center gap-4 mb-4">
                    <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center', s.bgClass]">
                        <component :is="s.icon" class="w-6 h-6" />
                    </div>
                    <div>
                        <p class="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">{{ s.label }}
                        </p>
                        <h3 class="text-2xl font-black text-slate-900 font-display">{{ s.value }}</h3>
                    </div>
                </div>
            </div>
        </div>

        <!-- Table Card -->
        <div class="presenly-datatable">
            <div class="datatable-controls">
                <div class="controls-left">
                    <h3 class="font-display text-lg font-black text-slate-900 mr-2">Daftar Instansi</h3>
                    <span class="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[0.7rem] font-bold">{{
                        data.length }} Total</span>
                </div>

                <div class="datatable-search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16"
                        height="16">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" v-model="globalFilter" placeholder="Cari instansi...">
                </div>
            </div>

            <div class="datatable-body">
                <table class="datatable-table">
                    <thead>
                        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                            <th v-for="header in headerGroup.headers" :key="header.id" class="cursor-pointer"
                                @click="header.column.getToggleSortingHandler()?.($event)">
                                <div class="flex items-center gap-2">
                                    <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                                    <span v-if="header.column.getIsSorted() === 'asc'" class="text-blue-500">↑</span>
                                    <span v-if="header.column.getIsSorted() === 'desc'" class="text-blue-500">↓</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in table.getRowModel().rows" :key="row.id">
                            <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </td>
                        </tr>
                        <tr v-if="table.getRowModel().rows.length === 0">
                            <td colspan="5" class="py-20 text-center text-slate-400 font-medium font-display">Data
                                tidak ditemukan.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Footer / Pagination -->
            <div class="datatable-footer">
                <div class="datatable-info">
                    HALAMAN {{ table.getState().pagination.pageIndex + 1 }} DARI {{ table.getPageCount() }}
                </div>
                <div class="datatable-pagination">
                    <button class="pagination-btn" @click="table.previousPage()"
                        :disabled="!table.getCanPreviousPage()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="14"
                            height="14">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button v-for="page in table.getPageCount()" :key="page" @click="table.setPageIndex(page - 1)"
                        :class="['pagination-btn font-bold text-xs', table.getState().pagination.pageIndex === page - 1 ? 'active' : '']">
                        {{ page }}
                    </button>

                    <button class="pagination-btn" @click="table.nextPage()" :disabled="!table.getCanNextPage()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="14"
                            height="14">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Modal -->
    <transition name="modal-fade">
        <div class="presenly-modal-overlay" v-if="showAddModal" @click.self="showAddModal = false">
            <div class="presenly-modal">
                <div class="modal-header">
                    <div class="modal-header-text">
                        <p>Data Pendaftaran</p>
                        <h3>Tambah Instansi</h3>
                    </div>
                    <button @click="showAddModal = false" class="modal-close-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20"
                            height="20">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="submitNewTenant">
                    <div class="modal-body space-y-4">
                        <div class="modal-field">
                            <label class="modal-label">Nama Instansi</label>
                            <input v-model="newTenant.institutionName" type="text" required class="modal-input"
                                placeholder="Masukkan nama instansi...">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="modal-field">
                                <label class="modal-label">Kategori</label>
                                <select v-model="newTenant.category" class="modal-input">
                                    <option value="sekolah">Sekolah</option>
                                    <option value="perusahaan">Perusahaan</option>
                                </select>
                            </div>
                            <div class="modal-field">
                                <label class="modal-label">Paket</label>
                                <select v-model="newTenant.plan" class="modal-input">
                                    <option value="free">Free Trial</option>
                                    <option value="basic">Basic Plan</option>
                                    <option value="premium">Premium Plan</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-field">
                            <label class="modal-label">Email Admin Utama</label>
                            <input v-model="newTenant.primaryAdminEmail" type="email" required class="modal-input"
                                placeholder="admin@domain.com">
                        </div>
                        <div class="modal-field">
                            <label class="modal-label">Nomor WhatsApp</label>
                            <input v-model="newTenant.whatsappNumber" type="text" class="modal-input"
                                placeholder="0812...">
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" @click="showAddModal = false"
                            class="flex-1 py-3.5 px-6 rounded-2xl border border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95">Batal</button>
                        <button type="submit"
                            class="flex-[1.5] py-3.5 px-6 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95">
                            Daftarkan Instansi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, h } from 'vue'
import {
    useVueTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    createColumnHelper,
    FlexRender,
} from '@tanstack/vue-table'
import type { TenantSummary, NewTenantDraft } from '~/types'
import { Building2, ShieldCheck, Users } from 'lucide-vue-next'
import type { SortingState } from '@tanstack/vue-table'

definePageMeta({
    layout: 'superadmin'
})

const { getInstitutions, createInstitution } = useSuperadmin()

const globalFilter = ref('')
const sorting = ref<SortingState>([])
const data = ref<TenantSummary[]>([])
const loading = ref(true)
const showAddModal = ref(false)
const processing = ref(false)

const newTenant = ref<NewTenantDraft>({
    institutionName: '',
    category: 'sekolah',
    plan: 'basic',
    primaryAdminEmail: '',
    whatsappNumber: '',
})

onMounted(async () => {
    await loadTenants()
})

const loadTenants = async () => {
    try {
        loading.value = true
        const response = await getInstitutions()
        data.value = Array.isArray(response) ? response : []
    } catch (err: any) {
        console.error('Gagal memuat instansi:', err)
        // Opsional: tampilkan toast error
    } finally {
        loading.value = false
    }
}

const summaryStats = computed(() => {
    const total = data.value.length
    const active = data.value.filter(t => t.subscriptionHealth === 'active').length
    const users = data.value.reduce((acc, t) => acc + (t.memberCount || 0), 0)
    return [
        { label: 'Total Instansi', value: total, bgClass: 'bg-emerald-50 text-emerald-600', icon: 'Building2' },
        { label: 'Instansi Aktif', value: active, bgClass: 'bg-blue-50 text-blue-600', icon: 'ShieldCheck' },
        { label: 'Total User', value: users.toLocaleString(), bgClass: 'bg-amber-50 text-amber-600', icon: 'Users' }
    ]
})

const columnHelper = createColumnHelper<TenantSummary>()

const columns = [
    columnHelper.accessor('name', {
        header: 'Instansi',
        cell: info => h('div', { class: 'flex items-center gap-3' }, [
            h('div', { class: 'w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400' }, info.row.original.initials || '??'),
            h('div', { class: 'min-w-0' }, [
                h('p', { class: 'text-sm font-bold text-slate-900 truncate' }, info.getValue()),
                h('p', { class: 'text-[0.65rem] text-slate-400 font-bold uppercase' }, info.row.original.categoryLabel || info.row.original.category)
            ])
        ])
    }),
    columnHelper.accessor('plan', {
        header: 'Paket',
        cell: info => h('span', { class: 'inline-flex px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[0.65rem] font-bold uppercase' }, info.getValue())
    }),
    columnHelper.accessor('memberCount', {
        header: 'User',
        cell: info => h('span', { class: 'text-sm font-bold text-slate-700' }, (info.getValue() || 0).toLocaleString())
    }),
    columnHelper.accessor('expiresAt', {
        header: 'Kadaluwarsa',
        cell: info => h('span', { class: 'text-xs font-medium text-slate-500' }, new Date(info.getValue()).toLocaleDateString('id-ID'))
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Aksi',
        cell: info => h('NuxtLink', {
            to: `/superadmin/instansi/${info.row.original.id}`,
            class: 'p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all active:scale-95 flex items-center justify-center'
        }, [
            h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', width: '16', height: '16' }, [
                h('path', { d: 'M9 5l7 7-7 7' })
            ])
        ])
    })
]

const table = useVueTable({
    get data() { return data.value },
    columns,
    state: {
        get globalFilter() { return globalFilter.value },
        get sorting() { return sorting.value },
    },
    onSortingChange: updater => {
        sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: 12 } }
})

const openAddModal = () => {
    newTenant.value = { institutionName: '', category: 'sekolah', plan: 'basic', primaryAdminEmail: '', whatsappNumber: '' }
    showAddModal.value = true
}

const submitNewTenant = async () => {
    try {
        processing.value = true
        await createInstitution(newTenant.value)
        showAddModal.value = false
        await loadTenants()
        alert('Instansi berhasil didaftarkan!')
    } catch (err: any) {
        alert(err.message || 'Gagal mendaftarkan instansi.')
    } finally {
        processing.value = false
    }
}
</script>

<style scoped>
.font-display {
    font-family: 'Cabinet Grotesk', sans-serif;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-from .presenly-modal,
.modal-fade-leave-to .presenly-modal {
    transform: translateY(20px) scale(0.98);
}
</style>
