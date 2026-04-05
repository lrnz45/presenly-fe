<template>
    <div class="dash-root">
        <!-- Logout Modal -->
        <Teleport to="body">
            <transition name="fade">
                <div class="logout-overlay" v-if="showLogoutModal" @click.self="showLogoutModal = false">
                    <div class="logout-modal">
                        <div class="logout-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" width="24"
                                height="24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        <h3 class="logout-title font-display">Konfirmasi Keluar</h3>
                        <p class="logout-desc">Apakah Anda yakin ingin keluar dari sesi ini? Anda harus masuk kembali
                            nantinya.</p>
                        <div class="logout-actions flex gap-3 mt-5">
                            <button class="logout-action-btn logout-action-cancel"
                                @click="showLogoutModal = false">Batal</button>
                            <button class="logout-action-btn logout-action-confirm" @click="confirmLogout">Ya,
                                Keluar</button>
                        </div>
                    </div>
                </div>
            </transition>
        </Teleport>

        <!-- Sidebar -->
        <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
            <!-- Logo -->
            <div class="sidebar-logo">
                <NuxtLink to="/" class="logo-link flex items-center gap-2">
                    <img src="/icon.svg" alt="Presenly Logo" class="logo-icon w-[36px]" />
                    <span class="logo-text font-display" v-show="!sidebarCollapsed">Presen<span class="italic
                            text-blue-400">ly</span></span>
                </NuxtLink>
                <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed" aria-label="Toggle sidebar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                            v-if="!sidebarCollapsed" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" v-else />
                    </svg>
                </button>
            </div>

            <!-- Nav Items -->
            <nav class="sidebar-nav">
                <div class="nav-section-label" v-show="!sidebarCollapsed">UTAMA</div>
                <NuxtLink to="/dashboard" class="nav-item" exact-active-class="active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="nav-icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span v-show="!sidebarCollapsed">Dashboard</span>
                </NuxtLink>
                <NuxtLink to="/dashboard/pegawai" class="nav-item" active-class="active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="nav-icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span v-show="!sidebarCollapsed">Data User</span>
                </NuxtLink>
                <NuxtLink to="/dashboard/laporan" class="nav-item" active-class="active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="nav-icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span v-show="!sidebarCollapsed">Laporan</span>
                </NuxtLink>

                <div class="nav-divider"></div>
                <div class="nav-section-label" v-show="!sidebarCollapsed">LAINNYA</div>

                <NuxtLink to="/kiosk" class="nav-item" active-class="active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="nav-icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span v-show="!sidebarCollapsed">Mode Kiosk</span>
                </NuxtLink>
                <NuxtLink to="/dashboard/tagihan" class="nav-item" active-class="active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="nav-icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span v-show="!sidebarCollapsed">Tagihan</span>
                </NuxtLink>
                <NuxtLink to="/dashboard/pengaturan" class="nav-item" active-class="active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="nav-icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span v-show="!sidebarCollapsed">Pengaturan</span>
                </NuxtLink>
                <NuxtLink to="/dashboard/profil" class="nav-item" active-class="active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="nav-icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span v-show="!sidebarCollapsed">Profil Admin</span>
                </NuxtLink>
            </nav>

            <!-- Bottom: user & logout -->
            <div class="sidebar-bottom">
                <NuxtLink to="/dashboard/profil" class="user-info" v-show="!sidebarCollapsed" title="Lihat Profil">
                    <div class="user-avatar">{{ initials }}</div>
                    <div class="user-meta">
                        <span class="user-name">{{ user?.fullName || 'Admin' }}</span>
                        <span class="user-role">{{ user?.role === 'admin' ? 'Administrator' : 'Superadmin' }}</span>
                    </div>
                </NuxtLink>
                <NuxtLink to="/dashboard/profil" class="user-avatar-sm" v-show="sidebarCollapsed" title="Lihat Profil">
                    {{ initials }}</NuxtLink>
                <button class="logout-btn" @click="showLogoutModal = true" title="Keluar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18"
                        height="18">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <div class="main-wrap">
            <!-- Top bar -->
            <header class="topbar">
                <div class="topbar-left">
                    <button class="mobile-menu-btn" @click="sidebarCollapsed = !sidebarCollapsed">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20"
                            height="20">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div class="breadcrumb">
                        <span class="breadcrumb-app">FaceAttend</span>
                        <span class="breadcrumb-sep">/</span>
                        <span class="breadcrumb-current">{{ pageTitle }}</span>
                    </div>
                </div>
                <div class="topbar-right flex items-center gap-2">
                    <!-- Subscription countdown badge -->
                    <div class="sub-badge" v-if="subscription">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14"
                            height="14">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{{ daysLeft }} hari tersisa</span>
                    </div>
                    <!-- <div class="notif-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="20"
                            height="20">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span class="notif-dot"></span>
                    </div> -->
                </div>
            </header>

            <!-- Page slot -->
            <main class="page-content">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { useBilling } from '~/composables/useBilling'
import type { TenantSubscriptionInfo } from '~/types'

const { user, logout } = useAuth()
const { getPlan } = useBilling()
const route = useRoute()

const sidebarCollapsed = ref(false)
const showLogoutModal = ref(false)
const subscription = ref<TenantSubscriptionInfo | null>(null)

const pageTitle = computed(() => {
    const map: Record<string, string> = {
        '/dashboard': 'Dashboard',
        '/dashboard/pegawai': 'Data User',
        '/dashboard/laporan': 'Laporan',
        '/dashboard/tagihan': 'Tagihan',
        '/dashboard/pengaturan': 'Pengaturan',
        '/dashboard/profil': 'Profil Admin',
    }
    return map[route.path] || 'Dashboard'
})

const daysLeft = computed(() => {
    if (!subscription.value?.expiresAt) return 0
    const ms = new Date(subscription.value.expiresAt).getTime() - Date.now()
    return Math.max(0, Math.ceil(ms / 86400000))
})

const initials = computed(() => {
    const name = user.value?.fullName
    if (!name) return '??'
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2 && parts[0]?.[0] && parts[1]?.[0]) {
        return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
})

onMounted(async () => {
    try {
        subscription.value = await getPlan()
    } catch (e) {
        console.error('Failed to load subscription in header:', e)
    }
})

const confirmLogout = async () => {
    showLogoutModal.value = false
    await logout()
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@900&display=swap');

.sidebar.collapsed .sidebar-logo {
    flex-direction: column;
    padding: 1.1rem 0;
    gap: 1rem;
    justify-content: center;
}

.logo-text {
    color: #fff;
}

.sidebar.collapsed .nav-item {
    padding: 0.75rem 0;
    justify-content: center;
}

.sidebar.collapsed .nav-icon {
    margin: 0;
}

.nav-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
}

.nav-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
    margin: 0.4rem 0;
}

.sidebar.collapsed .sidebar-bottom {
    flex-direction: column;
    padding: 1rem 0;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    overflow: hidden;
}

.user-avatar-sm {
    width: 32px;
    height: 32px;
    border-radius: 9px;
    background: linear-gradient(135deg, #3B6BF6, #6B8FF8);
    color: #fff;
    font-size: 0.68rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-meta {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.user-name {
    font-size: 0.78rem;
    font-weight: 700;
    color: #f1f5f9;
    display: block;
    line-height: 1.2;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.user-role {
    font-size: 0.6rem;
    color: #94a3b8;
    font-weight: 500;
    display: block;
    margin-top: 0.1rem;
}

.logout-btn {
    width: 32px;
    height: 32px;
    border-radius: 9px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    color: #94a3b8;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.15s;
}

.logout-btn:hover {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
    border-color: rgba(239, 68, 68, 0.25);
}

/* Logout Modal Customization */
.logout-modal {
    text-align: center;
    width: min(340px, 90vw);
}

.logout-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: #fef2f2;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
}

.logout-desc {
    font-size: 0.8rem;
    color: #64748b;
    margin-bottom: 0;
}

.logout-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.25rem;
}

.logout-action-btn {
    flex: 1;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.15s;
}

.logout-action-cancel {
    background: #fff;
    border: 1px solid #e2e8f0;
    color: #475569;
}

.logout-action-confirm {
    background: #ef4444;
    border: 1px solid #ef4444;
    color: #fff;
}

/* Topbar Breadcrumb */
.topbar-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: #a1a5ac;
}

.breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
}

.breadcrumb-app {
    color: #9ca3af;
    font-weight: 500;
}

.breadcrumb-sep {
    color: #d1d5db;
}

.breadcrumb-current {
    color: #111827;
    font-weight: 600;
}

.sub-badge {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    background: #fef3c7;
    color: #92400e;
    border-radius: 99px;
    padding: 0.3rem 0.75rem;
    font-size: 0.72rem;
    font-weight: 600;
    border: 1px solid #fcd34d;
}


/* ── Logout Modal ── */
.logout-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1.5rem;
}

.logout-modal {
    background: #fff;
    border-radius: 20px;
    width: 100%;
    max-width: 380px;
    padding: 2rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    text-align: center;
}

.logout-icon {
    width: 60px;
    height: 60px;
    background: #fef2f2;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.25rem;
}

.logout-title {
    font-size: 1.25rem;
    color: #0f172a;
    margin-bottom: 0.5rem;
    font-weight: 800;
}

.logout-desc {
    color: #64748b;
    font-size: 0.88rem;
    line-height: 1.5;
}

.logout-action-btn {
    flex: 1;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.88rem;
    cursor: pointer;
    transition: all 0.2s;
}

.logout-action-cancel {
    background: #f1f5f9;
    border: none;
    color: #475569;
}

.logout-action-cancel:hover {
    background: #e2e8f0;
}

.logout-action-confirm {
    background: #ef4444;
    border: none;
    color: #fff;
}

.logout-action-confirm:hover {
    background: #dc2626;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
}

.font-display {
    font-family: 'Cabinet Grotesk', sans-serif;
}
</style>
