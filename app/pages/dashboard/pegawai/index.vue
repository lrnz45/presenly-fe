<template>
    <div class="mx-auto mb-10">
        <!-- Page Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 px-2 mt-4">
            <div class="max-w-2xl">
                <h1 class="font-display text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Data User</h1>
                <p class="text-[0.85rem] text-slate-500 leading-relaxed font-medium">
                    {{ employees.length }} pegawai · {{employees.filter(e => e.isActive).length}} aktif · {{
                        employees.filter(e => e.faceEnrolled).length}} wajah terdaftar
                </p>
            </div>
            <div class="flex flex-wrap items-center gap-3 shrink-0">
                <button
                    class="flex items-center gap-2 bg-[#0c1837] hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-[0.8rem] font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                    @click="openAddModal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-4 h-4">
                        <path d="M12 4v16m8-8H4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Tambah User
                </button>
            </div>
        </div>

        <!-- Table Card -->
        <div class="presenly-datatable">
            <div class="datatable-controls">
                <div class="controls-left">
                    <h3 class="font-display text-lg font-black text-slate-900 mr-2">Daftar Pegawai</h3>
                    <select v-model="filterStatus" @change="table.setPageIndex(0)"
                        class="bg-white border border-slate-200 rounded-xl px-4 py-2 text-[0.75rem] font-bold text-slate-600 outline-none hover:border-slate-300 cursor-pointer shadow-sm transition-all focus:ring-4 focus:ring-blue-500/5">
                        <option value="">Semua Status</option>
                        <option value="faceEnrolled">Terdaftar</option>
                        <option value="not_faceEnrolled">Belum Terdaftar</option>
                        <option value="active">Aktif</option>
                        <option value="inactive">Nonaktif</option>
                    </select>
                </div>

                <div class="datatable-search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16"
                        height="16">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input v-model="globalFilter" type="text" placeholder="Cari nama, NIP/NIS, atau jabatan..." />
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
                            <td colspan="9" class="py-20 text-center text-slate-400 font-medium font-display">Data
                                pegawai tidak ditemukan.</td>
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

    <!-- Add/Edit Modal -->
    <transition name="modal-fade">
        <div class="presenly-modal-overlay" v-if="showAddModal" @click.self="showAddModal = false">
            <div class="presenly-modal">
                <div class="modal-header">
                    <div class="modal-header-text">
                        <p>Manajemen Pegawai</p>
                        <h3>{{ editMode ? 'Edit User' : 'Tambah User' }}</h3>
                    </div>
                    <button @click="showAddModal = false" class="modal-close-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20"
                            height="20">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="saveEmployee">
                    <div class="modal-body space-y-5">
                        <div class="modal-field">
                            <label class="modal-label">Nama Lengkap</label>
                            <input v-model="formEmp.name" type="text" required class="modal-input"
                                placeholder="Nama lengkap pegawai">
                        </div>
                        <div class="modal-field">
                            <label class="modal-label">NIP / NIS / ID Karyawan</label>
                            <input v-model="formEmp.identifierId" type="text" required class="modal-input"
                                placeholder="Unik per instansi">
                        </div>
                        <div class="modal-field">
                            <label class="modal-label">Email (opsional)</label>
                            <input v-model="formEmp.email" type="email" class="modal-input"
                                placeholder="email@instansi.com">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="modal-field">
                                <label class="modal-label">Jabatan</label>
                                <input v-model="formEmp.jobTitle" type="text" class="modal-input"
                                    placeholder="cth. Guru">
                            </div>
                            <div class="modal-field">
                                <label class="modal-label">Departemen</label>
                                <input v-model="formEmp.department" type="text" class="modal-input"
                                    placeholder="cth. Akademik">
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4 items-center">
                            <div class="modal-field">
                                <label class="modal-label">Tanggal bergabung</label>
                                <input v-model="formEmp.joinedAtDate" type="date" required class="modal-input">
                            </div>
                            <div class="modal-field flex items-end pb-1">
                                <label class="flex items-center gap-2 text-sm font-bold text-slate-600 cursor-pointer">
                                    <input v-model="formEmp.isActive" type="checkbox" class="rounded border-slate-300">
                                    Pegawai aktif
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" @click="showAddModal = false"
                            class="flex-1 py-3.5 px-6 rounded-2xl border border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95">Batal</button>
                        <button type="submit"
                            class="flex-[1.5] py-3.5 px-6 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-95">
                            {{ editMode ? 'Simpan Perubahan' : 'Tambahkan Pegawai' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, h } from 'vue'
import {
    useVueTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    createColumnHelper,
    FlexRender,
    type SortingState,
} from '@tanstack/vue-table'
import type { StaffMember } from '~/types'

definePageMeta({
    layout: 'dashboard'
})

const { getEmployees, createEmployee, updateEmployee, deleteEmployee: apiDeleteEmployee } = useEmployees()

// State
const globalFilter = ref('')
const filterStatus = ref('')
const sorting = ref<SortingState>([])
const showAddModal = ref(false)
const editMode = ref(false)
const processing = ref(false)
const employees = ref<StaffMember[]>([])
const loading = ref(true)

const formEmp = ref<any>({
    name: '',
    identifierId: '',
    email: '',
    jobTitle: '',
    department: '',
    isActive: true,
})

onMounted(() => {
    loadStaff()
})

const loadStaff = async () => {
    try {
        loading.value = true
        employees.value = await getEmployees()
    } catch (err) {
        console.error('Gagal memuat staf:', err)
    } finally {
        loading.value = false
    }
}

const filteredData = computed(() => {
    return employees.value.filter(e => {
        if (!filterStatus.value) return true
        if (filterStatus.value === 'faceEnrolled') return e.faceEnrolled
        if (filterStatus.value === 'not_faceEnrolled') return !e.faceEnrolled
        if (filterStatus.value === 'active') return e.isActive
        if (filterStatus.value === 'inactive') return !e.isActive
        return true
    })
})

// Column Helper
const columnHelper = createColumnHelper<StaffMember>()

const columns = [
    columnHelper.accessor('name', {
        header: 'Pegawai',
        cell: info => h('div', { class: 'flex items-center gap-3' }, [
            h('div', {
                class: 'w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold text-[0.7rem] shadow-lg shrink-0 overflow-hidden transition-transform group-hover:scale-110 duration-300',
                style: { backgroundColor: info.row.original.avatarColor || '#0c1837', boxShadow: `0 8px 16px -4px ${info.row.original.avatarColor || '#0c1837'}40` }
            }, [
                info.row.original.photoUrl
                    ? h('img', { src: info.row.original.photoUrl, class: 'w-full h-full object-cover' })
                    : h('span', {}, info.row.original.initials || '??')
            ]),
            h('div', { class: 'min-w-0' }, [
                h('p', { class: 'text-sm font-black text-slate-900 leading-none mb-1 truncate font-display' }, info.getValue()),
                h('p', { class: 'text-[0.65rem] text-slate-400 font-bold truncate' }, info.row.original.email || 'N/A')
            ])
        ])
    }),
    columnHelper.accessor('identifierId', {
        header: 'ID',
        cell: info => h('span', { class: 'text-xs font-mono font-bold text-slate-600' }, info.getValue())
    }),
    columnHelper.accessor('jobTitle', {
        header: 'Jabatan',
        cell: info => h('span', { class: 'text-sm font-bold text-slate-700' }, info.getValue())
    }),
    columnHelper.accessor('department', {
        header: 'Departemen',
        cell: info => h('span', { class: 'text-xs font-medium text-slate-400' }, info.getValue())
    }),
    columnHelper.accessor('faceEnrolled', {
        header: 'Status Wajah',
        cell: info => h('span', {
            class: [
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-bold border transition-colors',
                info.getValue() ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'
            ]
        }, [
            h('span', { class: ['w-1.5 h-1.5 rounded-full', info.getValue() ? 'bg-blue-600' : 'bg-amber-600'] }),
            info.getValue() ? 'Terdaftar' : 'Belum'
        ])
    }),
    columnHelper.accessor('joinedAtLabel', {
        header: 'Bergabung',
        cell: info => h('span', { class: 'text-xs font-bold text-slate-400' }, info.getValue() || 'N/A')
    }),
    columnHelper.accessor('isActive', {
        header: 'Status',
        cell: info => h('span', {
            class: [
                'inline-flex px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold border',
                info.getValue() ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
            ]
        }, info.getValue() ? 'Aktif' : 'Nonaktif')
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Aksi',
        cell: info => h('div', { class: 'flex items-center gap-2' }, [
            h('a', {
                href: `/dashboard/pegawai/${info.row.original.id}/enroll`,
                class: 'p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-90',
                title: 'Daftarkan Wajah'
            }, [
                h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', width: '16', height: '16' }, [
                    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' }),
                    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M15 13a3 3 0 11-6 0 3 3 0 016 0z' })
                ])
            ]),
            h('button', {
                onClick: () => editEmployee(info.row.original),
                class: 'p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all active:scale-90',
                title: 'Edit'
            }, [
                h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', width: '16', height: '16' }, [
                    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' })
                ])
            ]),
            h('button', {
                onClick: () => deleteEmployee(info.row.original.id),
                class: 'p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all active:scale-90',
                title: 'Hapus'
            }, [
                h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', width: '16', height: '16' }, [
                    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' })
                ])
            ])
        ])
    })
]

// Table Instance
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
    initialState: {
        pagination: {
            pageSize: 10,
        },
    },
})

// Actions
const openAddModal = () => {
    editMode.value = false
    formEmp.value = {
        name: '',
        identifierId: '',
        email: '',
        jobTitle: '',
        department: '',
        isActive: true,
    }
    showAddModal.value = true
}

const editEmployee = (emp: StaffMember) => {
    editMode.value = true
    formEmp.value = { ...emp }
    showAddModal.value = true
}

const deleteEmployee = async (id: number) => {
    if (confirm('Hapus pegawai ini?')) {
        try {
            await apiDeleteEmployee(id)
            employees.value = employees.value.filter(e => e.id !== id)
        } catch (err: any) {
            alert(err.message || 'Gagal menghapus pegawai.')
        }
    }
}

const saveEmployee = async () => {
    try {
        processing.value = true
        if (editMode.value) {
            await updateEmployee(formEmp.value.id!, formEmp.value)
        } else {
            await createEmployee(formEmp.value)
        }
        showAddModal.value = false
        await loadStaff()
    } catch (err: any) {
        alert(err.message || 'Gagal menyimpan data pegawai.')
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
