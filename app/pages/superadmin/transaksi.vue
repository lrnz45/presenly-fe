<template>
    <div class="mx-auto mb-10">
        <!-- Page Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 mt-4">
            <div class="max-w-2xl text-slate-800">
                <h1 class="font-display text-4xl font-black tracking-tight mb-2">Verifikasi Transaksi</h1>
                <p class="text-[0.85rem] text-slate-500 leading-relaxed font-medium">
                    Kelola pendaftaran dan perpanjangan langganan Presenly dari seluruh instansi.
                </p>
            </div>
        </div>

        <!-- Tabs -->
        <div class="presenly-tabs mb-8">
            <button v-for="stat in stats" :key="stat.key" @click="activeTab = stat.key" class="tab-item"
                :class="{ active: activeTab === stat.key }">
                <span>{{ stat.label }}</span>
                <span class="tab-badge">{{ stat.count }}</span>
            </button>
        </div>

        <!-- Table Container -->
        <div class="presenly-datatable">
            <div class="datatable-controls">
                <div class="controls-left">
                    <h3 class="font-display text-lg font-black text-slate-900 mr-2">Daftar Transaksi</h3>
                </div>

                <div class="datatable-search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16"
                        height="16">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input v-model="globalFilter" type="text" placeholder="Cari transaksi..." />
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
                            <td v-for="cell in row.getVisibleCells()" :key="cell.id"
                                :class="cell.column.columnDef.meta?.cellClass">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </td>
                        </tr>
                        <tr v-if="table.getRowModel().rows.length === 0">
                            <td colspan="6" class="py-20 text-center text-slate-400 font-medium font-display">Data
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
                            <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>

                    <button v-for="page in table.getPageCount()" :key="page" @click="table.setPageIndex(page - 1)"
                        :class="['pagination-btn font-bold text-xs', table.getState().pagination.pageIndex === page - 1 ? 'active' : '']">
                        {{ page }}
                    </button>

                    <button class="pagination-btn" @click="table.nextPage()" :disabled="!table.getCanNextPage()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="14"
                            height="14">
                            <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Proof Drawer -->
    <transition name="drawer-slide">
        <div class="fixed inset-0 z-50 overflow-hidden" v-if="viewing">
            <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="viewing = null"></div>
            <div class="absolute inset-y-0 right-0 max-w-full flex">
                <div
                    class="w-screen max-w-md bg-white shadow-2xl flex flex-col translate-x-0 transition-transform duration-300">
                    <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div>
                            <h3 class="font-display text-xl font-black text-slate-900 leading-none mb-1">Bukti
                                Transfer</h3>
                            <p class="text-[0.7rem] text-slate-400 font-bold uppercase tracking-widest">Detail
                                Verifikasi Pembayaran</p>
                        </div>
                        <button @click="viewing = null"
                            class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-slate-400 hover:text-slate-900">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20"
                                height="20">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="flex-1 overflow-y-auto p-8">
                        <div
                            class="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-600/20 mb-8 overflow-hidden relative">
                            <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl">
                            </div>
                            <p class="text-[0.65rem] font-bold text-blue-100 uppercase tracking-widest mb-1">Jumlah
                                Dibayar</p>
                            <h2 class="text-3xl font-black font-display tracking-tight">{{ viewing.amountDisplay }}</h2>
                            <div class="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
                                <div
                                    class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-[0.65rem]">
                                    {{ viewing.tenantInitials }}</div>
                                <span class="text-xs font-bold text-blue-50">{{ viewing.tenantName }}</span>
                            </div>
                        </div>

                        <div class="space-y-6">
                            <div class="flex justify-between items-center border-b border-slate-50 pb-4">
                                <span class="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">ID
                                    Transaksi</span>
                                <span class="text-xs font-bold font-mono text-slate-900">{{ viewing.transactionId ?? '—'
                                    }}</span>
                            </div>
                            <div class="flex justify-between items-center border-b border-slate-50 pb-4">
                                <span class="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">No.
                                    Invoice</span>
                                <span class="text-xs font-bold font-mono text-slate-900">{{ viewing.invoiceNumber ?? '—'
                                    }}</span>
                            </div>
                            <div class="flex justify-between items-center border-b border-slate-50 pb-4">
                                <span class="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Status
                                    faktur</span>
                                <span class="text-xs font-bold text-slate-900">{{ viewing.paymentStatus === 'paid' ?
                                    'Lunas' : 'Belum lunas' }}</span>
                            </div>
                            <div class="flex justify-between items-center border-b border-slate-50 pb-4">
                                <span class="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Masa
                                    Aktif</span>
                                <span class="text-xs font-bold text-slate-900">+30 Hari</span>
                            </div>
                            <div class="flex justify-between items-center border-b border-slate-50 pb-4">
                                <span
                                    class="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Paket</span>
                                <span class="text-xs font-black text-blue-600 uppercase">{{
                                    viewing.plan.toUpperCase() }}</span>
                            </div>
                        </div>

                        <div class="mt-10 mb-10 group">
                            <p class="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest mb-4">
                                Lampiran Bukti</p>
                            <div
                                class="aspect-[4/3] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex items-center justify-center text-slate-300 group-hover:border-blue-500/30 transition-all overflow-hidden">
                                <img v-if="viewing.proofUrl" :src="viewing.proofUrl" alt="Bukti transfer"
                                    class="w-full h-full object-cover" />
                                <div v-else class="text-center px-4">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                        width="48" height="48" class="mx-auto mb-2 text-slate-300">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span
                                        class="text-[0.6rem] font-black uppercase text-slate-400 tracking-widest">Belum
                                        ada bukti</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-8 border-t border-slate-100 flex gap-4"
                        v-if="viewing.verificationStatus === 'pending'">
                        <button @click="reject(viewing.id); viewing = null"
                            class="flex-1 py-3.5 px-6 rounded-2xl border border-rose-100 text-rose-600 font-bold text-sm hover:bg-rose-50 transition-all active:scale-95">Tolak</button>
                        <button @click="approve(viewing.id); viewing = null"
                            class="flex-[1.5] py-3.5 px-6 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95">Setujui
                            Pembayaran</button>
                    </div>
                    <div class="p-8 border-t border-slate-100 text-center" v-else>
                        <div
                            :class="['py-3 px-6 rounded-2xl font-bold text-sm', viewing.verificationStatus === 'approved' ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-rose-600 font-bold']">
                            {{ viewing.verificationStatus === 'approved' ?
                                '✓ Transaksi Telah Disetujui' :
                                '✗ Transaksi Telah Ditolak' }}
                        </div>
                    </div>
                </div>
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
import { useSuperadmin } from '~/composables/useSuperadmin'
import type { PaymentTransaction } from '~/types'

definePageMeta({
    layout: 'superadmin'
})

const { getTransactions, approvePayment, rejectPayment } = useSuperadmin()

const activeTab = ref<'all' | 'pending' | 'approved' | 'rejected'>('all')
const viewing = ref<PaymentTransaction | null>(null)
const globalFilter = ref('')
const sorting = ref([])
const data = ref<PaymentTransaction[]>([])
const loading = ref(true)

onMounted(async () => {
    loadPayments()
})

const loadPayments = async () => {
    try {
        loading.value = true
        data.value = await getTransactions()
    } catch (err) {
        console.error('Gagal memuat transaksi:', err)
    } finally {
        loading.value = false
    }
}

const stats = computed(() => [
    { key: 'all', label: 'Semua', count: data.value.length },
    { key: 'pending', label: 'Menunggu', count: data.value.filter(t => t.verificationStatus === 'pending').length },
    { key: 'approved', label: 'Disetujui', count: data.value.filter(t => t.verificationStatus === 'approved').length },
    { key: 'rejected', label: 'Ditolak', count: data.value.filter(t => t.verificationStatus === 'rejected').length },
])

const filteredData = computed(() => {
    if (activeTab.value === 'all') return data.value
    return data.value.filter(t => t.verificationStatus === activeTab.value)
})

const statusLabel = (s: string) => ({ pending: 'Menunggu', approved: 'Disetujui', rejected: 'Ditolak' }[s] || s)
const statusBadgeClass = (s: string) => {
    switch (s) {
        case 'pending': return 'bg-blue-50 text-blue-600 border-blue-100'
        case 'approved': return 'bg-green-50 text-green-600 border-green-100'
        case 'rejected': return 'bg-rose-50 text-rose-600 border-rose-100'
        default: return 'bg-slate-50 text-slate-500 border-slate-100'
    }
}

const columnHelper = createColumnHelper<PaymentTransaction>()
const columns = [
    columnHelper.accessor('tenantName', {
        header: 'Instansi',
        cell: info => h('div', { class: 'flex items-center gap-3' }, [
            h('div', { class: 'w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-slate-900/10 shrink-0' }, info.row.original.tenantInitials || '??'),
            h('div', { class: 'min-w-0' }, [
                h('p', { class: 'text-sm font-black text-slate-900 leading-none mb-1 truncate' }, info.getValue()),
                h('p', { class: 'text-[0.7rem] text-slate-400 font-bold uppercase tracking-tight truncate' }, info.row.original.categoryLabel)
            ])
        ])
    }),
    columnHelper.accessor('plan', {
        header: 'Paket',
        meta: { cellClass: 'text-center' },
        cell: info => h('span', {
            class: [
                'px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-tight border capitalize',
                info.getValue() === 'premium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-500 border-slate-100'
            ]
        }, info.getValue())
    }),
    columnHelper.accessor('amountDisplay', {
        header: 'Jumlah',
        meta: { cellClass: 'text-center whitespace-nowrap' },
        cell: info => h('span', { class: 'text-sm font-black text-slate-900' }, info.getValue())
    }),
    columnHelper.accessor('uploadedAtDisplay', {
        header: 'Diunggah',
        meta: { cellClass: 'text-center whitespace-nowrap' },
        cell: info => h('span', { class: 'text-[0.7rem] font-bold text-slate-400' }, info.getValue())
    }),
    columnHelper.accessor('verificationStatus', {
        header: 'Verifikasi',
        meta: { cellClass: 'text-center' },
        cell: info => h('span', {
            class: [
                'px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-widest border',
                statusBadgeClass(info.getValue())
            ]
        }, statusLabel(info.getValue()))
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Aksi',
        meta: { cellClass: 'text-right' },
        cell: info => h('div', { class: 'flex items-center justify-end gap-2' }, [
            h('button', {
                onClick: () => viewing.value = info.row.original,
                class: 'p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-95',
                title: 'Lihat Bukti'
            }, [
                h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', width: '18', height: '18' }, [
                    h('path', { d: 'M2.036 12.322a1.012 1.012 0 010-.644C3.323 10.194 6.967 7 12 7s8.677 3.194 9.964 4.678a1.012 1.012 0 010 .644C20.677 13.806 17.033 17 12 17s-8.677-3.194-9.964-4.678z' }),
                    h('path', { d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })
                ])
            ]),
            info.row.original.verificationStatus === 'pending' ? [
                h('button', {
                    onClick: () => reject(info.row.original.id),
                    class: 'p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all active:scale-90',
                    title: 'Tolak'
                }, [
                    h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', width: '18', height: '18' }, [
                        h('path', { d: 'M6 18L18 6M6 6l12 12' })
                    ])
                ]),
                h('button', {
                    onClick: () => approve(info.row.original.id),
                    class: 'p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all active:scale-90',
                    title: 'Setujui'
                }, [
                    h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', width: '18', height: '18' }, [
                        h('path', { d: 'M5 13l4 4L19 7' })
                    ])
                ])
            ] : null
        ])
    })
]

const table = useVueTable({
    get data() { return filteredData.value },
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
})

const approve = async (id: number) => {
    try {
        await approvePayment(id)
        alert('Pembayaran BERHASIL disetujui.')
        await loadPayments()
    } catch (err: any) {
        alert(err.message || 'Gagal menyetujui.')
    }
}

const reject = async (id: number) => {
    const reason = prompt('Alasan penolakan:')
    if (reason === null) return
    try {
        await rejectPayment(id, reason || 'Bukti tidak terbaca')
        alert('Pembayaran TELAH ditolak.')
        await loadPayments()
    } catch (err: any) {
        alert(err.message || 'Gagal menolak.')
    }
}
</script>

<style scoped>
.font-display {
    font-family: 'Cabinet Grotesk', sans-serif;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
    opacity: 0;
}

.drawer-slide-enter-from .max-w-md,
.drawer-slide-leave-to .max-w-md {
    transform: translateX(100%);
}
</style>
