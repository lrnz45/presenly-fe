<template>
    <NuxtLayout name="dashboard">
        <div class="mx-auto mt-4 mb-10">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="font-display text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Profil Admin</h1>
                <p class="text-[0.85rem] text-slate-500 leading-relaxed font-medium">Kelola informasi pribadi dan
                    keamanan
                    kredensial akun tenant Anda.</p>
            </div>

            <!-- Profile Content -->
            <div class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

                <!-- Left: Avatar & Quick Info -->
                <div class="flex flex-col gap-6">
                    <div
                        class="bg-white rounded-2xl p-8 border border-slate-200/70 shadow-sm flex flex-col items-center text-center">
                        <div class="relative mb-6 group">
                            <div
                                class="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-indigo-800 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-blue-500/20 overflow-hidden border-4 border-white">
                                {{ initials }}
                            </div>
                            <label
                                class="absolute bottom-0 right-0 w-9 h-9 bg-white border border-slate-200 shadow-md rounded-full flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors cursor-pointer">
                                <input type="file" @change="handleFileUpload" class="hidden" accept="image/*" />
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                                    class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                            </label>
                        </div>
                        <h2 class="font-display text-lg font-extrabold text-slate-900 truncate w-full px-2">{{ form.fullName }}</h2>
                        <p class="text-[0.8rem] text-slate-500 font-bold mb-4 uppercase tracking-wider">{{ userRoleLabel }}
                        </p>
                        <span
                            class="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 rounded-full text-[0.725rem] font-bold">
                            <span class="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span> Akun Aktif
                        </span>
                    </div>

                    <div class="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm">
                        <p class="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-4">Aktivitas
                            Terakhir</p>
                        <div class="space-y-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-xs font-bold text-slate-700">Login Hari ini</span>
                                    <span class="text-[0.7rem] text-slate-400">08:30 WIB · Jakarta, ID</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Form -->
                <div class="space-y-6">
                    <!-- Basic Info Card -->
                    <div class="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/70 shadow-sm">
                        <form @submit.prevent="saveProfile">
                            <div class="flex items-center justify-between mb-8">
                                <h3 class="font-display text-xl font-extrabold text-slate-900 tracking-tight">Informasi
                                    Dasar</h3>
                                <div
                                    class="h-10 w-10 bg-slate-50 flex items-center justify-center rounded-xl text-slate-400">
                                    <svg class="w-5 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8">
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-[0.7rem] font-bold tracking-wider text-slate-500 uppercase">Nama
                                        Lengkap</label>
                                    <input v-model="form.fullName" type="text" class="field-input-profile"
                                        placeholder="Masukkan nama...">
                                </div>
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-[0.7rem] font-bold tracking-wider text-slate-500 uppercase">Email
                                        Perusahaan</label>
                                    <div class="relative group">
                                        <!-- <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg> -->
                                        <input v-model="form.email" type="email" class="field-input-profile pl-11"
                                            placeholder="admin@presenly.id">
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[0.7rem] font-bold tracking-wider text-slate-500 uppercase">Nomor
                                        Telepon</label>
                                    <input v-model="form.phoneNumber" type="text" class="field-input-profile"
                                        placeholder="08xx...">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[0.7rem] font-bold tracking-wider text-slate-400 uppercase">Peran
                                        / Role (Hanya Baca)</label>
                                    <div class="field-input-profile opacity-60 bg-slate-50 flex items-center">{{
                                        userRoleLabel }}</div>
                                </div>
                            </div>

                            <div class="flex items-center gap-4 justify-end pt-4">
                                <button type="submit"
                                    class="px-8 py-3 rounded-2xl font-bold text-sm bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                                    :disabled="isSaving">
                                    <span v-if="!isSaving">Simpan Perubahan</span>
                                    <span v-else class="flex items-center gap-2">
                                        <div
                                            class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin">
                                        </div>
                                        Menyimpan...
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Security Card -->
                    <div class="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/70 shadow-sm">
                        <form @submit.prevent="handlePasswordChange">
                            <div class="flex items-center justify-between mb-8">
                                <h3 class="font-display text-xl font-extrabold text-slate-900 tracking-tight">Ganti Kata Sandi</h3>
                                <div class="h-10 w-10 bg-rose-50 flex items-center justify-center rounded-xl text-rose-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-[0.7rem] font-bold tracking-wider text-slate-500 uppercase">Kata Sandi Saat Ini</label>
                                    <input v-model="passwordForm.currentPassword" type="password" class="field-input-profile" placeholder="••••••••">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[0.7rem] font-bold tracking-wider text-slate-500 uppercase">Kata Sandi Baru</label>
                                    <input v-model="passwordForm.newPassword" type="password" class="field-input-profile" placeholder="Minimal 8 karakter">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[0.7rem] font-bold tracking-wider text-slate-500 uppercase">Ulangi Kata Sandi Baru</label>
                                    <input v-model="passwordForm.confirmPassword" type="password" class="field-input-profile" placeholder="Konfirmasi sandi baru">
                                </div>
                            </div>

                            <div class="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                                <svg class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p class="text-[0.75rem] text-slate-500 font-medium leading-relaxed">
                                    Pastikan kata sandi Anda cukup kuat dengan kombinasi huruf besar, kecil, angka, dan simbol untuk keamanan tambahan.
                                </p>
                            </div>

                            <div class="flex justify-end mt-8">
                                <button type="submit" :disabled="isUpdatingPassword"
                                    class="px-8 py-3 rounded-2xl font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
                                    {{ isUpdatingPassword ? 'Memperbarui...' : 'Perbarui Kata Sandi' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const { user, updateProfile, changePassword } = useAuth()

const isSaving = ref(false)
const isUpdatingPassword = ref(false)

const form = ref({
    fullName: '',
    email: '',
    phoneNumber: ''
})

const passwordForm = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
})

// Sync form with auth state
watchEffect(() => {
    if (user.value) {
        form.value = {
            fullName: user.value.fullName || '',
            email: user.value.email || '',
            phoneNumber: (user.value as any).phoneNumber || ''
        }
    }
})

const userRoleLabel = computed(() => {
    if (!user.value) return 'User'
    return user.value.role === 'admin' ? 'Administrator' : 'Superadmin'
})

const initials = computed(() => {
    if (!form.value.fullName) return '??'
    const words = form.value.fullName.trim().split(' ')
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase()
    }
    return words[0].substring(0, 2).toUpperCase()
})

const saveProfile = async () => {
    try {
        isSaving.value = true
        await updateProfile(form.value)
        toast.success('Profil berhasil diperbarui!')
    } catch (err: any) {
        console.error('[Profile Update Error]', err)
        const msg = err?.message || err?.data?.message || 'Gagal menyimpan profil.'
        toast.error(msg)
    } finally {
        isSaving.value = false
    }
}

const handlePasswordChange = async () => {
    if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword) {
        toast.warning('Mohon isi semua kolom kata sandi.')
        return
    }
    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        toast.error('Konfirmasi kata sandi tidak cocok.')
        return
    }
    try {
        isUpdatingPassword.value = true
        await changePassword({
            currentPassword: passwordForm.value.currentPassword,
            newPassword: passwordForm.value.newPassword
        })
        toast.success('Kata sandi berhasil diperbarui!')
        passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
    } catch (err: any) {
        console.error('[Password Change Error]', err)
        const msg = err?.message || err?.data?.message || 'Gagal mengganti kata sandi.'
        toast.error(msg)
    } finally {
        isUpdatingPassword.value = false
    }
}

const handleFileUpload = (e: Event) => {
    // Implementasi upload Cloudinary jika diperlukan nantinya
    toast.info('Fitur unggah foto profil akan segera hadir.')
}
</script>
<style scoped>
.field-input-profile {
    width: 100%;
    padding: 0.75rem 1rem;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #1e293b;
    transition: all 0.2s;
    outline: none;
}

.field-input-profile:focus {
    border-color: #3b6bf6;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(59, 107, 246, 0.08);
}

.field-input-profile:disabled {
    cursor: not-allowed;
}

@media (max-width: 1024px) {
    .grid-cols-\[300px_1fr\] {
        grid-template-columns: 1fr;
    }
}
</style>
