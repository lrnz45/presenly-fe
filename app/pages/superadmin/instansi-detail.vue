<template>
    <NuxtLayout name="superadmin">
        <div class="mx-auto mb-10 px-4 md:px-0">

            <!-- Page Header -->
            <div class="flex flex-col lg:flex-row lg:items-start justify-between mb-10 gap-8">
                <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                    <div
                        class="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-600/20 shrink-0">
                        {{ instansi.initials }}
                    </div>
                    <div>
                        <h1 class="font-display text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">{{
                            instansi.name }}</h1>
                        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                            <span
                                class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[0.7rem] font-black uppercase tracking-tight border border-blue-100">
                                {{ instansi.plan.toUpperCase() }} PLAN
                            </span>
                            <span class="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></span>
                            <span class="text-sm font-bold text-slate-400 capitalize">{{ instansi.categoryLabel }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-3 w-full lg:w-auto">
                    <button
                        class="flex-1 lg:flex-none px-5 py-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">Edit</button>
                    <button
                        class="flex-1 lg:flex-none px-5 py-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-black uppercase tracking-widest hover:bg-rose-100 transition-all active:scale-95">Suspend</button>
                </div>
            </div>

            <!-- Tabs -->
            <div class="presenly-tabs mb-8 overflow-x-auto no-scrollbar max-w-full">
                <div class="flex min-w-max">
                    <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key" class="tab-item"
                        :class="{ active: activeTab === tab.key }">
                        <span>{{ tab.label }}</span>
                        <span v-if="tab.count !== undefined" class="tab-badge">{{ tab.count }}</span>
                    </button>
                </div>
            </div>

            <!-- Tab Content: Ringkasan -->
            <div v-if="activeTab === 'overview'" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-8">
                    <!-- Info Card -->
                    <div class="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/60 shadow-sm">
                        <h3 class="font-display text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <span class="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            Informasi Instansi
                        </h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div class="space-y-2">
                                <p class="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Email
                                    Instansi</p>
                                <p class="text-sm font-bold text-slate-700 select-all">{{ instansi.contactEmail }}</p>
                            </div>
                            <div class="space-y-2">
                                <p class="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Nomor
                                    Telepon</p>
                                <p class="text-sm font-bold text-slate-700">{{ instansi.phone }}</p>
                            </div>
                            <div class="space-y-2 sm:col-span-2">
                                <p class="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Alamat
                                    Lengkap</p>
                                <p class="text-sm font-bold text-slate-700 leading-relaxed">{{ instansi.address }}</p>
                            </div>
                            <div class="space-y-2">
                                <p class="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Kuota
                                    Pegawai</p>
                                <p class="text-sm font-bold text-slate-700">Maks. {{ instansi.maxEmployees }} pegawai</p>
                            </div>
                            <div class="space-y-2">
                                <p class="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Kedaluwarsa
                                    Langganan</p>
                                <p class="text-sm font-bold text-slate-700">{{ expiresAtDisplay }} · {{ daysUntilExpiry }} hari lagi</p>
                            </div>
                        </div>
                    </div>

                    <!-- Admin Card -->
                    <div class="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/60 shadow-sm">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                            <h3 class="font-display text-xl font-black text-slate-900 flex items-center gap-3">
                                <span class="w-1.5 h-6 bg-slate-900 rounded-full"></span>
                                Administrator Utama
                            </h3>
                            <button
                                class="text-blue-600 text-[0.65rem] font-black uppercase tracking-widest hover:underline text-left">Ganti
                                Penanggung Jawab</button>
                        </div>
                        <div
                            class="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
                            <div
                                class="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                {{ instansi.primaryAdmin.initials }}
                            </div>
                            <div class="min-w-0">
                                <p class="text-sm font-black text-slate-900 truncate">{{ instansi.primaryAdmin.fullName }}</p>
                                <p class="text-[0.7rem] font-bold text-slate-400 truncate">{{ instansi.primaryAdmin.email }}
                                </p>
                            </div>
                            <span
                                class="hidden sm:inline-flex ml-auto px-3 py-1 bg-white text-[0.6rem] font-black text-slate-400 uppercase border border-slate-200 rounded-lg shrink-0">Owner
                                Account</span>
                        </div>
                    </div>
                </div>

                <!-- Sidebar Info -->
                <div class="space-y-6">
                    <div
                        class="bg-slate-900 rounded-2xl p-8 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden">
                        <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                        <p
                            class="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
                            Aktivitas Absensi</p>
                        <div class="space-y-8">
                            <div class="flex items-end justify-between">
                                <span class="text-[0.7rem] font-bold text-slate-400">Pindaian Hari Ini</span>
                                <span class="text-3xl font-black font-display">124</span>
                            </div>
                            <div class="flex items-end justify-between">
                                <span class="text-[0.7rem] font-bold text-slate-400">Rasio Kehadiran</span>
                                <span class="text-3xl font-black font-display text-green-400">98.2%</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-12 -mt-12"></div>
                        <p class="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-6">Paket
                            Berlangganan</p>
                        <div class="flex items-center gap-4 mb-6">
                            <div
                                class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm shadow-amber-200/40">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22"
                                    height="22">
                                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm font-black text-slate-900">{{ daysUntilExpiry }} Hari Lagi</p>
                                <p class="text-[0.65rem] font-bold text-slate-400 uppercase tracking-tight">Hingga {{
                                    expiresAtDisplay }}</p>
                            </div>
                        </div>
                        <button
                            class="w-full py-4 bg-blue-600 text-white rounded-2xl text-[0.65rem] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95">Perpanjang
                            Paket</button>
                    </div>
                </div>
            </div>

            <!-- Tab Content: Anggota -->
            <div v-if="activeTab === 'members'" class="animate-fade-in">
                <div class="presenly-datatable">
                    <div class="datatable-controls">
                        <div class="controls-left">
                            <h3 class="font-display text-lg font-black text-slate-900 mr-2 flex items-center gap-2">
                                Daftar Pegawai
                                <span
                                    class="text-[0.6rem] bg-slate-100 px-2 py-0.5 rounded-lg text-slate-500">REALTIME</span>
                            </h3>
                        </div>

                        <div class="datatable-search">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16"
                                height="16">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input v-model="globalFilter" type="text" placeholder="Cari nama, ID, atau jabatan..." />
                        </div>
                    </div>

                    <div class="datatable-body overflow-x-auto">
                        <table class="datatable-table">
                            <thead>
                                <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                                    <th v-for="header in headerGroup.headers" :key="header.id" class="cursor-pointer"
                                        @click="header.column.getToggleSortingHandler()?.($event)">
                                        <div class="flex items-center gap-2">
                                            <FlexRender :render="header.column.columnDef.header"
                                                :props="header.getContext()" />
                                            <span v-if="header.column.getIsSorted() === 'asc'"
                                                class="text-blue-500">↑</span>
                                            <span v-if="header.column.getIsSorted() === 'desc'"
                                                class="text-blue-500">↓</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in table.getRowModel().rows" :key="row.id">
                                    <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="whitespace-nowrap">
                                        <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-footer">
                        <div class="datatable-info">
                            MENAMPILKAN {{ table.getRowModel().rows.length }} DARI {{ employees.length }} ANGGOTA
                        </div>
                        <div class="datatable-pagination">
                            <button class="pagination-btn" @click="table.previousPage()"
                                :disabled="!table.getCanPreviousPage()">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="14"
                                    height="14">
                                    <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                            <button class="pagination-btn active">{{ table.getState().pagination.pageIndex + 1
                            }}</button>
                            <button class="pagination-btn" @click="table.nextPage()"
                                :disabled="!table.getCanNextPage()">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="14"
                                    height="14">
                                    <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Content: Billing/Riwayat Tagihan -->
            <div v-if="activeTab === 'billing'" class="animate-fade-in">
                <div class="presenly-datatable">
                    <div class="datatable-controls">
                        <div class="controls-left">
                            <h3 class="font-display text-lg font-black text-slate-900 mr-2">Riwayat Tagihan</h3>
                        </div>
                    </div>

                    <div class="datatable-body overflow-x-auto">
                        <table class="datatable-table">
                            <thead>
                                <tr>
                                    <th>No. Invoice</th>
                                    <th>Paket</th>
                                    <th class="text-center">Verifikasi</th>
                                    <th class="text-center">Pembayaran</th>
                                    <th class="text-center">Jumlah</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="bill in billingHistory" :key="bill.id">
                                    <td>
                                        <span class="text-sm font-black text-slate-900 select-all">{{ bill.invoiceNumber
                                            ?? '—' }}</span>
                                        <p class="text-[0.65rem] font-bold text-slate-400">{{ bill.dateDisplay }}</p>
                                    </td>
                                    <td>
                                        <span
                                            class="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[0.65rem] font-black text-slate-500 uppercase tracking-tight">{{
                                                bill.planLabel }}</span>
                                    </td>
                                    <td class="text-center">
                                        <span
                                            :class="['px-2.5 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-tight border',
                                                bill.verificationStatus === 'approved' ? 'bg-green-50 text-green-600 border-green-100' : bill.verificationStatus === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100']">
                                            {{ verifyLabel(bill.verificationStatus) }}
                                        </span>
                                    </td>
                                    <td class="text-center">
                                        <span
                                            :class="['px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-widest border',
                                                bill.paymentStatus === 'paid' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100']">
                                            {{ invoiceStatusLabel(bill.paymentStatus) }}
                                        </span>
                                    </td>
                                    <td class="text-center">
                                        <span class="text-sm font-black text-slate-900">{{ bill.amountDisplay }}</span>
                                    </td>
                                    <td class="text-right">
                                        <button class="p-2 text-slate-400 hover:text-blue-600 transition-all">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                stroke-width="2.5" width="18" height="18">
                                                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                    stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import {
    useVueTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    FlexRender,
    createColumnHelper
} from '@tanstack/vue-table'
import type {
    TenantDetail,
    StaffMember,
    InvoiceRecord,
    PaymentVerificationStatus,
} from '~/types'
import {
    DEFAULT_TENANT_DETAIL,
    INVOICE_RECORDS,
    cloneStaffMembers,
    invoicePaymentStatusLabel,
    paymentVerificationLabel,
} from '~/data/seed'

const activeTab = ref('overview')
const globalFilter = ref('')
const sorting = ref([])

const tabs = computed(() => [
    { key: 'overview', label: 'Ringkasan' },
    { key: 'members', label: 'Daftar Anggota', count: employees.value.length },
    { key: 'billing', label: 'Riwayat Tagihan' },
])

const instansi = ref<TenantDetail>({ ...DEFAULT_TENANT_DETAIL })

const expiresAtDisplay = computed(() =>
    new Date(instansi.value.expiresAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }),
)

const daysUntilExpiry = computed(() => {
    const ms = new Date(instansi.value.expiresAt).getTime() - Date.now()
    return Math.max(0, Math.ceil(ms / 86400000))
})

const employees = ref<StaffMember[]>(cloneStaffMembers().slice(0, 5))

const billingHistory = ref<InvoiceRecord[]>([...INVOICE_RECORDS])

function invoiceStatusLabel(s: InvoiceRecord['paymentStatus']) {
    return invoicePaymentStatusLabel(s)
}

function verifyLabel(s: PaymentVerificationStatus) {
    return paymentVerificationLabel(s)
}

const columnHelper = createColumnHelper<StaffMember>()
const columns = [
    columnHelper.accessor('name', {
        header: 'Nama Pegawai',
        cell: info => h('div', { class: 'flex items-center gap-3' }, [
            h('div', {
                class: 'w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold text-[0.7rem] shadow-lg shrink-0',
                style: { backgroundColor: info.row.original.avatarColor }
            }, info.row.original.initials),
            h('div', { class: 'min-w-0' }, [
                h('p', { class: 'text-sm font-black text-slate-900 leading-none mb-1 truncate font-display' }, info.getValue()),
                h('p', { class: 'text-[0.65rem] text-slate-400 font-bold truncate' }, info.row.original.email || '—')
            ])
        ])
    }),
    columnHelper.accessor('identifierId', {
        header: 'ID',
        cell: info => h('span', { class: 'text-xs font-mono font-bold text-slate-500' }, info.getValue())
    }),
    columnHelper.accessor('jobTitle', {
        header: 'Jabatan',
        cell: info => h('span', { class: 'text-xs font-bold text-slate-700' }, info.getValue())
    }),
    columnHelper.accessor('faceEnrolled', {
        header: 'Face ID',
        cell: info => h('span', {
            class: [
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-tight border',
                info.getValue() ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'
            ]
        }, [
            h('span', { class: ['w-1.5 h-1.5 rounded-full', info.getValue() ? 'bg-blue-600' : 'bg-amber-600'] }),
            info.getValue() ? 'Terdaftar' : 'Belum'
        ])
    })
]

const table = useVueTable({
    get data() { return employees.value },
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
    initialState: { pagination: { pageSize: 10 } },
})
</script>

<style scoped>
.font-display {
    font-family: 'Cabinet Grotesk', sans-serif;
}

.animate-fade-in {
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
