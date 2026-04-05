<template>
    <div class="mx-auto mt-4 mb-10 px-4 max-w-6xl">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="font-display text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Profil Super Admin
            </h1>
            <p class="text-[0.85rem] text-slate-500 leading-relaxed font-medium">Kelola informasi pribadi dan
                keamanan akun Root Presenly.</p>
        </div>

        <!-- Profile Content -->
        <div class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

            <!-- Left: Avatar & Quick Info -->
            <div class="flex flex-col gap-6">
                <div
                    class="bg-white rounded-2xl p-8 border border-slate-200/70 shadow-sm flex flex-col items-center text-center">
                    <div class="relative mb-6 group">
                        <div
                            class="w-28 h-28 rounded-full bg-slate-900 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-slate-900/20 overflow-hidden border-4 border-white">
                            {{ initials }}
                        </div>
                    </div>
                    <h2 class="font-display text-lg font-extrabold text-slate-900 truncate w-full px-2">{{ form.fullName
                    }}
                    </h2>
                    <p class="text-[0.8rem] text-blue-600 font-bold mb-4 uppercase tracking-wider">Root Access</p>
                    <span
                        class="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 rounded-full text-[0.725rem] font-bold">
                        <span class="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span> Sistem Online
                    </span>
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
                                    Root</label>
                                <input v-model="form.email" type="email" class="field-input-profile"
                                    placeholder="root@presenly.id">
                            </div>
                            <div class="space-y-2 md:col-span-2">
                                <label class="text-[0.7rem] font-bold tracking-wider text-slate-500 uppercase">Nomor
                                    Telepon</label>
                                <input v-model="form.phoneNumber" type="text" class="field-input-profile"
                                    placeholder="08xx...">
                            </div>
                        </div>

                        <div class="flex items-center gap-4 justify-end pt-4">
                            <button type="submit"
                                class="px-8 py-3 rounded-2xl font-bold text-sm bg-slate-900 text-white shadow-lg shadow-slate-900/25 hover:bg-slate-800 transition-all flex items-center gap-2"
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
                <form @submit.prevent="handlePasswordChange">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2 md:col-span-2">
                            <label class="text-[0.7rem] font-bold tracking-wider text-slate-500 uppercase">Kata
                                Sandi Saat Ini</label>
                            <input v-model="passwordForm.currentPassword" type="password" class="field-input-profile"
                                placeholder="••••••••">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[0.7rem] font-bold tracking-wider text-slate-500 uppercase">Kata
                                Sandi Baru</label>
                            <input v-model="passwordForm.newPassword" type="password" class="field-input-profile"
                                placeholder="Minimal 8 karakter">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[0.7rem] font-bold tracking-wider text-slate-500 uppercase">Ulangi
                                Kata Sandi Baru</label>
                            <input v-model="passwordForm.confirmPassword" type="password" class="field-input-profile"
                                placeholder="Konfirmasi sandi baru">
                        </div>
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
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { toast } from 'vue-sonner'

definePageMeta({
    layout: 'superadmin'
})

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

const initials = computed(() => {
    if (!form.value.fullName) return 'SA'
    const words = form.value.fullName.trim().split(' ')
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase()
    }
    return words[0].substring(0, 2).toUpperCase()
})

const saveProfile = async () => {
    if (!updateProfile) return
    try {
        isSaving.value = true
        await updateProfile(form.value)
        toast?.success?.('Profil Super Admin berhasil diperbarui!')
    } catch (err: any) {
        console.error('[Profile Update Error]', err)
        const msg = err?.message || err?.data?.message || 'Gagal menyimpan profil.'
        toast?.error?.(msg)
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
    box-shadow: 0 0 0 4px rgba(59, 107, 246, 0.08);
}

.font-display {
    font-family: 'Cabinet Grotesk', sans-serif;
}
</style>
