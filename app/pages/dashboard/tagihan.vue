<template>
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4 px-2 mt-4">
        <div class="max-w-2xl">
            <h1 class="font-display text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Tagihan & Langganan
            </h1>
            <p class="text-[0.85rem] text-slate-500 leading-relaxed font-medium">
                Kelola paket dan riwayat pembayaran instansi Anda.
            </p>
        </div>
    </div>

    <!-- Current Plan Banner -->
    <div class="plan-banner">
        <div class="plan-info">
            <div class="plan-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Paket {{ planLabel }}
            </div>
            <div class="plan-details">
                <p class="plan-name font-display">Paket {{ planLabel }}</p>
                <p class="plan-meta">Aktif hingga <strong>{{ expiresDateDisplay }}</strong> · {{ daysLeft }} hari
                    tersisa</p>
                <div class="plan-quota">
                    <span>Kuota pegawai: {{ subscription.activeEmployeeCount }} / {{ subscription.maxEmployees }}</span>
                    <div class="quota-bar">
                        <div class="quota-fill" :style="{ width: quotaFillPercent + '%' }"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="plan-days">
            <p class="days-num font-display">{{ daysLeft }}</p>
            <p class="days-label">hari tersisa</p>
            <div class="days-bar-wrap">
                <div class="days-bar">
                    <div class="days-fill" :style="{ width: daysBarPercent + '%' }"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="billing-grid">
        <!-- Upgrade packages -->
        <div class="billing-main">
            <div class="card">
                <h3 class="section-title font-display">Perpanjang / Upgrade Paket</h3>
                <div class="pkg-grid">
                    <div class="pkg-card" :class="{ selected: selectedPkg === 'basic' }" @click="selectedPkg = 'basic'">
                        <div class="pkg-check" v-if="selectedPkg === 'basic'">✓</div>
                        <p class="pkg-name">Basic</p>
                        <p class="pkg-price font-display">Rp 149k</p>
                        <p class="pkg-period">/ bulan</p>
                        <ul class="pkg-features">
                            <li>✓ 200 Wajah</li>
                            <li>✓ 3 Admin</li>
                            <li>✓ CSV & Excel</li>
                        </ul>
                    </div>
                    <div class="pkg-card popular" :class="{ selected: selectedPkg === 'premium' }"
                        @click="selectedPkg = 'premium'">
                        <div class="pkg-check" v-if="selectedPkg === 'premium'">✓</div>
                        <div class="pkg-popular-tag">Terpopuler</div>
                        <p class="pkg-name">Premium</p>
                        <p class="pkg-price font-display">Rp 399k</p>
                        <p class="pkg-period">/ bulan</p>
                        <ul class="pkg-features">
                            <li>✓ Wajah Tak Terbatas</li>
                            <li>✓ Admin Tak Terbatas</li>
                            <li>✓ CSV, Excel, PDF</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Payment instructions -->
            <div class="card" v-if="selectedPkg">
                <h3 class="section-title font-display">Instruksi Pembayaran</h3>
                <div class="bank-info">
                    <div class="bank-row">
                        <span class="bank-label">Bank</span>
                        <span class="bank-val">BCA</span>
                    </div>
                    <div class="bank-row">
                        <span class="bank-label">No. Rekening</span>
                        <span class="bank-val">1234 5678 9012 <button class="copy-btn"
                                @click="copy('123456789012')">Salin</button></span>
                    </div>
                    <div class="bank-row">
                        <span class="bank-label">Atas Nama</span>
                        <span class="bank-val">PT Presenly Indonesia</span>
                    </div>
                    <div class="bank-row">
                        <span class="bank-label">Total Transfer</span>
                        <span class="bank-val price">{{ selectedPkg === 'basic' ? 'Rp 149.000' : 'Rp 399.000'
                            }}</span>
                    </div>
                </div>

                <!-- Upload proof -->
                <div class="upload-section">
                    <label class="upload-label">Unggah Bukti Transfer</label>
                    <div class="upload-zone" @click="triggerUpload" :class="{ filled: uploadedFile }">
                        <input type="file" ref="fileInput" class="sr-only" accept="image/*,.pdf"
                            @change="handleFileUpload" />
                        <svg v-if="!uploadedFile" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="1.5" width="32" height="32" class="upload-icon">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <p v-if="!uploadedFile" class="upload-text">Klik untuk unggah atau seret file di
                            sini<br /><span>PNG, JPG, atau PDF — max 5MB</span></p>
                        <div v-else class="upload-preview">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" width="24"
                                height="24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p class="uploaded-name">{{ uploadedFile }}</p>
                            <button class="remove-file" @click.stop="uploadedFile = null">✕</button>
                        </div>
                    </div>
                    <button class="btn-submit-pay" :disabled="!uploadedFile" @click="submitPayment">
                        Kirim Bukti Pembayaran
                    </button>
                </div>
            </div>
        </div>

        <!-- Transaction history -->
        <div class="billing-side">
            <div class="card hist-card">
                <h3 class="section-title font-display">Riwayat Transaksi</h3>
                <div class="hist-list">
                    <div v-for="tx in transactions" :key="tx.id" class="hist-item">
                        <div class="hist-icon" :class="tx.verificationStatus">
                            <svg v-if="tx.verificationStatus === 'approved'" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2.5" width="14" height="14">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <svg v-else-if="tx.verificationStatus === 'rejected'" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2.5" width="14" height="14">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                                width="14" height="14">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="hist-info">
                            <p class="hist-pkg">{{ tx.packageLabel }}</p>
                            <p class="hist-date">{{ tx.dateDisplay }}</p>
                            <p class="hist-ids" v-if="tx.invoiceNumber || tx.transactionId">
                                <span v-if="tx.invoiceNumber">Inv: {{ tx.invoiceNumber }}</span>
                                <span v-if="tx.transactionId"> · Trx: {{ tx.transactionId }}</span>
                            </p>
                        </div>
                        <div class="hist-right">
                            <p class="hist-amount">{{ tx.amountDisplay }}</p>
                            <span class="hist-badge" :class="tx.verificationStatus">{{ txLabel(tx.verificationStatus)
                            }}</span>
                            <span class="hist-pay" :class="tx.paymentStatus">{{ payLabel(tx.paymentStatus) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useBilling } from '~/composables/useBilling'
import type { TenantSubscriptionInfo, TenantBillingHistoryItem, PaymentVerificationStatus } from '~/types'

definePageMeta({
    layout: 'dashboard'
})

const { getPlan, getPayments, submitPayment: apiSubmitPayment, uploadProof } = useBilling()

const subscription = ref<TenantSubscriptionInfo>({
    plan: 'free',
    maxEmployees: 10,
    expiresAt: new Date().toISOString(),
    activeEmployeeCount: 0
})
const transactions = ref<TenantBillingHistoryItem[]>([])
const loading = ref(true)
const uploading = ref(false)
const selectedPkg = ref('basic')
const fileInput = ref<HTMLInputElement | null>(null)
const uploadedFile = ref<string | null>(null)
const selectedFile = ref<File | null>(null)

const PLAN_LABELS: Record<string, string> = {
    free: 'Free',
    basic: 'Basic',
    premium: 'Premium',
}

const planLabel = computed(() => PLAN_LABELS[subscription.value.plan] ?? subscription.value.plan)
const expiresDateDisplay = computed(() => {
    return new Date(subscription.value.expiresAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
})

const daysLeft = computed(() => {
    const ms = new Date(subscription.value.expiresAt).getTime() - Date.now()
    return Math.max(0, Math.ceil(ms / 86400000))
})

const daysBarPercent = computed(() => {
    const cap = 365
    return Math.min(100, (daysLeft.value / cap) * 100)
})

const quotaFillPercent = computed(() => {
    const { maxEmployees, activeEmployeeCount } = subscription.value
    if (!maxEmployees) return 0
    return Math.min(100, (activeEmployeeCount / maxEmployees) * 100)
})

onMounted(async () => {
    loadBilling()
})

const loadBilling = async () => {
    try {
        loading.value = true
        const [p, h] = await Promise.all([
            getPlan(),
            getPayments()
        ])
        subscription.value = p
        transactions.value = h
    } catch (err) {
        console.error('Gagal memuat billing:', err)
    } finally {
        loading.value = false
    }
}

const txLabel = (s: PaymentVerificationStatus) => {
    return { approved: 'Disetujui', rejected: 'Ditolak', pending: 'Menunggu' }[s] || s
}

const payLabel = (s: string) => s === 'paid' ? 'Lunas' : 'Belum lunas'

const triggerUpload = () => fileInput.value?.click()

const handleFileUpload = (event: any) => {
    const file = event.target.files[0]
    if (!file) return
    selectedFile.value = file
    uploadedFile.value = file.name
}

const submitPayment = async () => {
    if (!selectedFile.value) return
    try {
        uploading.value = true
        const { url } = await uploadProof(selectedFile.value)
        await apiSubmitPayment({
            plan: selectedPkg.value,
            amount: selectedPkg.value === 'basic' ? 149000 : 499000,
            proofUrl: url
        })
        alert('Bukti pembayaran berhasil dikirim!')
        uploadedFile.value = null
        selectedFile.value = null
        await loadBilling()
    } catch (err: any) {
        alert(err.message || 'Gagal mengirim pembayaran.')
    } finally {
        uploading.value = false
    }
}

const copy = (text: string) => {
    navigator.clipboard?.writeText(text)
    alert('Disalin!')
}
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

.page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.page-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: #111827;
}

.page-sub {
    font-size: 0.82rem;
    color: #a1a5ac;
    margin-top: 0.2rem;
}

.card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #f0f0f5;
    padding: 1.25rem;
    margin-bottom: 1rem;
}

.section-title {
    font-size: 0.95rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 1rem;
}

/* Plan banner */
.plan-banner {
    background: linear-gradient(135deg, #0F1117 0%, #1e2a4a 100%);
    border-radius: 18px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    gap: 1rem;
    flex-wrap: wrap;
}

.plan-info {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.plan-badge {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(59, 107, 246, 0.2);
    border: 1px solid rgba(59, 107, 246, 0.4);
    color: #6B8FF8;
    border-radius: 10px;
    padding: 0.65rem 0.85rem;
    font-size: 0.8rem;
    font-weight: 700;
    flex-shrink: 0;
}

.plan-name {
    font-size: 1.1rem;
    font-weight: 800;
    color: #fff;
}

.plan-meta {
    font-size: 0.8rem;
    color: #9ca3af;
    margin-top: 0.2rem;
}

.plan-meta strong {
    color: #e5e7eb;
}

.plan-quota {
    margin-top: 0.65rem;
}

.plan-quota span {
    font-size: 0.75rem;
    color: #9ca3af;
    display: block;
    margin-bottom: 0.35rem;
}

.quota-bar {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    width: 200px;
}

.quota-fill {
    height: 100%;
    background: #3B6BF6;
    border-radius: 2px;
}

.plan-days {
    text-align: center;
}

.days-num {
    font-size: 2.5rem;
    font-weight: 800;
    color: #fff;
    line-height: 1;
}

.days-label {
    font-size: 0.72rem;
    color: #9ca3af;
    margin-top: 0.2rem;
    margin-bottom: 0.5rem;
}

.days-bar-wrap {
    width: 80px;
}

.days-bar {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
}

.days-fill {
    height: 100%;
    background: #f59e0b;
    border-radius: 2px;
}

/* Billing grid */
.billing-grid {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 1rem;
}

.billing-main {}

.billing-side {}

/* Packages */
.pkg-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
}

.pkg-card {
    border: 2px solid #e5e7eb;
    border-radius: 14px;
    padding: 1.1rem 1rem;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
}

.pkg-card:hover {
    border-color: #3B6BF6;
}

.pkg-card.selected {
    border-color: #3B6BF6;
    background: #f0f5ff;
}

.pkg-card.popular {
    border-color: #a78bfa;
}

.pkg-card.popular.selected {
    border-color: #3B6BF6;
    background: #f0f5ff;
}

.pkg-check {
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3B6BF6;
    color: #fff;
    font-size: 0.65rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pkg-popular-tag {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: #7c3aed;
    color: #fff;
    font-size: 0.62rem;
    font-weight: 700;
    padding: 0.15rem 0.65rem;
    border-radius: 99px;
    white-space: nowrap;
}

.pkg-name {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #a1a5ac;
    margin-bottom: 0.25rem;
}

.pkg-price {
    font-size: 1.5rem;
    font-weight: 800;
    color: #111827;
    line-height: 1;
}

.pkg-period {
    font-size: 0.72rem;
    color: #9ca3af;
    margin-bottom: 0.75rem;
}

.pkg-features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-size: 0.75rem;
    color: #374151;
}

.pkg-features .muted {
    color: #d1d5db;
}

/* Bank info */
.bank-info {
    background: #f9fafb;
    border-radius: 12px;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    margin-bottom: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.bank-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.82rem;
}

.bank-label {
    color: #a1a5ac;
    font-weight: 500;
}

.bank-val {
    color: #111827;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.bank-val.price {
    color: #3B6BF6;
    font-size: 0.9rem;
}

.copy-btn {
    background: #eff6ff;
    border: none;
    border-radius: 6px;
    color: #3B6BF6;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.15rem 0.5rem;
    cursor: pointer;
}

/* Upload */
.upload-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.upload-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
}

.upload-zone {
    border: 2px dashed #d1d5db;
    border-radius: 14px;
    padding: 2rem 1rem;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.upload-zone:hover,
.upload-zone.filled {
    border-color: #3B6BF6;
    background: #f0f5ff;
}

.upload-icon {
    color: #9ca3af;
}

.upload-text {
    font-size: 0.82rem;
    color: #a1a5ac;
    line-height: 1.5;
}

.upload-text span {
    font-size: 0.72rem;
    color: #9ca3af;
}

.upload-preview {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.uploaded-name {
    font-size: 0.82rem;
    font-weight: 600;
    color: #1e40af;
}

.remove-file {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    font-size: 0.9rem;
}

.btn-submit-pay {
    background: #3B6BF6;
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 0.85rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s, opacity 0.15s;
}

.btn-submit-pay:hover:not(:disabled) {
    background: #2a57e0;
}

.btn-submit-pay:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
}

/* History */
.hist-card {
    height: fit-content;
}

.hist-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.hist-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.hist-icon {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.hist-icon.approved {
    background: #dbeafe;
    color: #1e40af;
}

.hist-icon.rejected {
    background: #1e3a8a;
    color: #fff;
}

.hist-icon.pending {
    background: #fffbeb;
    color: #d97706;
}

.hist-info {
    flex: 1;
}

.hist-pkg {
    font-size: 0.82rem;
    font-weight: 600;
    color: #111827;
}

.hist-date {
    font-size: 0.7rem;
    color: #9ca3af;
}

.hist-ids {
    font-size: 0.62rem;
    color: #94a3b8;
    font-family: ui-monospace, monospace;
    margin-top: 0.2rem;
}

.hist-right {
    text-align: right;
}

.hist-amount {
    font-size: 0.82rem;
    font-weight: 700;
    color: #111827;
}

.hist-badge {
    display: inline-block;
    border-radius: 99px;
    padding: 0.15rem 0.55rem;
    font-size: 0.65rem;
    font-weight: 700;
}

.hist-badge.approved {
    background: #dbeafe;
    color: #1e40af;
}

.hist-badge.rejected {
    background: #1e3a8a;
    color: #fff;
}

.hist-badge.pending {
    background: #fffbeb;
    color: #d97706;
}

.hist-pay {
    display: block;
    margin-top: 0.35rem;
    font-size: 0.62rem;
    font-weight: 700;
}

.hist-pay.paid {
    color: #15803d;
}

.hist-pay.pending {
    color: #b45309;
}

@media (max-width: 900px) {
    .billing-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .pkg-grid {
        grid-template-columns: 1fr;
    }
}
</style>
