import type {
  StaffMember,
  TenantSummary,
  TenantDetail,
  PaymentTransaction,
  InvoiceRecord,
  TenantBillingHistoryItem,
  TenantAdminUser,
  TenantSettings,
  TenantAdminProfile,
  SuperAdminProfile,
  TenantSubscriptionInfo,
  DashboardStatCard,
  ChartBarDay,
  DashboardLiveDetection,
  EarlyArrivalHighlight,
  SuperadminStatCard,
  SuperadminTenantWidget,
  AttendanceGridStaff,
  AttendanceDailyRecord,
  AttendanceDayCode,
} from '~/types'

/** Format angka ke Rp (tampilan). */
export function formatIdr(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatJoinedAtLabel(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00`)
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/** Daftar canonical — dipakai pegawai, superadmin anggota, kiosk demo, dll. */
export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: 1,
    identifierId: '19800115001',
    name: 'Budi Santoso',
    email: 'budi@example.com',
    jobTitle: 'Guru Matematika',
    department: 'Akademik',
    faceEnrolled: true,
    joinedAtDate: '2025-01-15',
    joinedAtLabel: '15 Jan 2025',
    initials: 'BS',
    avatarColor: '#3B6BF6',
    isActive: true,
    photoUrl: null,
  },
  {
    id: 2,
    identifierId: '19850220002',
    name: 'Rina Wulandari',
    email: 'rina@example.com',
    jobTitle: 'Staff TU',
    department: 'Administrasi',
    faceEnrolled: true,
    joinedAtDate: '2025-01-20',
    joinedAtLabel: '20 Jan 2025',
    initials: 'RW',
    avatarColor: '#60a5fa',
    isActive: true,
    photoUrl: null,
  },
  {
    id: 3,
    identifierId: '19900301003',
    name: 'Ahmad Fauzi',
    email: 'ahmad@example.com',
    jobTitle: 'Guru IPA',
    department: 'Akademik',
    faceEnrolled: false,
    joinedAtDate: '2025-02-01',
    joinedAtLabel: '1 Feb 2025',
    initials: 'AF',
    avatarColor: '#0c1837',
    isActive: true,
    photoUrl: null,
  },
  {
    id: 4,
    identifierId: '19781210004',
    name: 'Dewi Lestari',
    email: 'dewi@example.com',
    jobTitle: 'Kepala TU',
    department: 'Administrasi',
    faceEnrolled: true,
    joinedAtDate: '2025-02-10',
    joinedAtLabel: '10 Feb 2025',
    initials: 'DL',
    avatarColor: '#1d4ed8',
    isActive: true,
    photoUrl: null,
  },
  {
    id: 5,
    identifierId: '19910505005',
    name: 'Muhammad Haris',
    email: 'haris@example.com',
    jobTitle: 'Satpam',
    department: 'Keamanan',
    faceEnrolled: false,
    joinedAtDate: '2025-03-05',
    joinedAtLabel: '5 Mar 2025',
    initials: 'MH',
    avatarColor: '#9ca3af',
    isActive: true,
    photoUrl: null,
  },
  {
    id: 6,
    identifierId: '19920812006',
    name: 'Sari Rahayu',
    email: 'sari@example.com',
    jobTitle: 'Guru Bahasa',
    department: 'Akademik',
    faceEnrolled: true,
    joinedAtDate: '2025-03-12',
    joinedAtLabel: '12 Mar 2025',
    initials: 'SR',
    avatarColor: '#93c5fd',
    isActive: true,
    photoUrl: null,
  },
]

export function cloneStaffMembers(): StaffMember[] {
  return STAFF_MEMBERS.map((s) => ({ ...s }))
}

export function getStaffMemberById(id: number): StaffMember | undefined {
  return STAFF_MEMBERS.find((s) => s.id === id)
}

export const ATTENDANCE_GRID_STAFF: AttendanceGridStaff[] = STAFF_MEMBERS.map(
  (s) => ({
    id: s.id,
    name: s.name,
    department: s.department,
    initials: s.initials,
    avatarColor: s.avatarColor,
    identifierId: s.identifierId,
  }),
)

/** Subset untuk simulasi scan kiosk (nama + subtitle konsisten). */
export function kioskDemoStaffPick(): Pick<
  StaffMember,
  'id' | 'name' | 'department' | 'initials'
>[] {
  return STAFF_MEMBERS.slice(0, 5).map((s) => ({
    id: s.id,
    name: s.name,
    department: s.department,
    initials: s.initials,
  }))
}

export const TENANT_SUMMARIES: TenantSummary[] = [
  {
    id: 1,
    name: 'SMA Negeri 1 Jakarta',
    categoryLabel: 'Sekolah',
    plan: 'basic',
    memberCount: 43,
    maxEmployees: 200,
    expiresAt: '2026-08-01T23:59:59.000Z',
    subscriptionHealth: 'active',
    initials: 'SN',
  },
  {
    id: 2,
    name: 'PT Maju Bersama',
    categoryLabel: 'Perusahaan',
    plan: 'premium',
    memberCount: 187,
    maxEmployees: 9999,
    expiresAt: '2026-12-01T23:59:59.000Z',
    subscriptionHealth: 'active',
    initials: 'MB',
  },
  {
    id: 3,
    name: 'SMK Teknik Nusantara',
    categoryLabel: 'Sekolah',
    plan: 'basic',
    memberCount: 62,
    maxEmployees: 200,
    expiresAt: '2026-04-20T23:59:59.000Z',
    subscriptionHealth: 'expiring',
    initials: 'TN',
  },
  {
    id: 4,
    name: 'CV Berkah Jaya',
    categoryLabel: 'Perusahaan',
    plan: 'free',
    memberCount: 12,
    maxEmployees: 15,
    expiresAt: '2026-05-15T23:59:59.000Z',
    subscriptionHealth: 'active',
    initials: 'BJ',
  },
  {
    id: 5,
    name: 'MAN 2 Surabaya',
    categoryLabel: 'Sekolah',
    plan: 'premium',
    memberCount: 124,
    maxEmployees: 9999,
    expiresAt: '2026-09-01T23:59:59.000Z',
    subscriptionHealth: 'active',
    initials: 'M2',
  },
  {
    id: 6,
    name: 'SMA Negeri 3 Bandung',
    categoryLabel: 'Sekolah',
    plan: 'premium',
    memberCount: 92,
    maxEmployees: 9999,
    expiresAt: '2026-07-10T23:59:59.000Z',
    subscriptionHealth: 'active',
    initials: 'S3',
  },
  {
    id: 7,
    name: 'PT Global Tech',
    categoryLabel: 'Perusahaan',
    plan: 'basic',
    memberCount: 55,
    maxEmployees: 200,
    expiresAt: '2026-06-30T23:59:59.000Z',
    subscriptionHealth: 'active',
    initials: 'GT',
  },
]

export const DEFAULT_TENANT_DETAIL: TenantDetail = {
  id: 1,
  name: 'SMA Negeri 1 Jakarta',
  initials: 'SN',
  category: 'sekolah',
  categoryLabel: 'Sekolah Menengah Atas',
  plan: 'premium',
  maxEmployees: 200,
  expiresAt: '2026-04-25T23:59:59.000Z',
  contactEmail: 'admin@sman1jakarta.sch.id',
  phone: '0812-3456-7890',
  address:
    'Jl. Pemuda No. 12, Pulo Gadung, Jakarta Timur, DKI Jakarta 13220',
  primaryAdmin: {
    fullName: 'Budi Santoso',
    email: 'budi@sman1jakarta.sch.id',
    initials: 'BS',
  },
  memberCount: 55,
}

export const PAYMENT_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 1,
    institutionId: 1,
    tenantName: 'SMA Negeri 1 Jakarta',
    categoryLabel: 'Sekolah',
    plan: 'basic',
    amount: 149_000,
    amountDisplay: formatIdr(149_000),
    uploadedAtDisplay: '3 Apr 2026, 09.14',
    transactionId: 'TRX-20260403-001',
    invoiceNumber: 'INV-20260403-001',
    verificationStatus: 'pending',
    paymentStatus: 'pending',
    proofUrl: null,
    tenantInitials: 'SN',
  },
  {
    id: 2,
    institutionId: 2,
    tenantName: 'PT Maju Bersama',
    categoryLabel: 'Perusahaan',
    plan: 'premium',
    amount: 399_000,
    amountDisplay: formatIdr(399_000),
    uploadedAtDisplay: '3 Apr 2026, 08.22',
    transactionId: 'TRX-20260403-002',
    invoiceNumber: 'INV-20260403-002',
    verificationStatus: 'pending',
    paymentStatus: 'pending',
    proofUrl: null,
    tenantInitials: 'MB',
  },
  {
    id: 3,
    institutionId: 4,
    tenantName: 'CV Berkah Jaya',
    categoryLabel: 'Perusahaan',
    plan: 'basic',
    amount: 149_000,
    amountDisplay: formatIdr(149_000),
    uploadedAtDisplay: '2 Apr 2026, 16.45',
    transactionId: 'TRX-20260402-008',
    invoiceNumber: 'INV-20260402-008',
    verificationStatus: 'pending',
    paymentStatus: 'pending',
    proofUrl: null,
    tenantInitials: 'BJ',
  },
  {
    id: 4,
    institutionId: 5,
    tenantName: 'MAN 2 Surabaya',
    categoryLabel: 'Sekolah',
    plan: 'premium',
    amount: 399_000,
    amountDisplay: formatIdr(399_000),
    uploadedAtDisplay: '1 Apr 2026, 11.30',
    transactionId: 'TRX-20260401-005',
    invoiceNumber: 'INV-20260401-005',
    verificationStatus: 'approved',
    paymentStatus: 'paid',
    proofUrl: 'https://example.com/proofs/m2.jpg',
    tenantInitials: 'M2',
  },
  {
    id: 5,
    institutionId: 3,
    tenantName: 'SMK Teknik Nusantara',
    categoryLabel: 'Sekolah',
    plan: 'basic',
    amount: 149_000,
    amountDisplay: formatIdr(149_000),
    uploadedAtDisplay: '31 Mar 2026, 14.00',
    transactionId: 'TRX-20260331-012',
    invoiceNumber: 'INV-20260331-012',
    verificationStatus: 'rejected',
    paymentStatus: 'pending',
    proofUrl: null,
    tenantInitials: 'TN',
  },
  {
    id: 6,
    institutionId: 8,
    tenantName: 'Yayasan Cendekia',
    categoryLabel: 'Sekolah',
    plan: 'premium',
    amount: 399_000,
    amountDisplay: formatIdr(399_000),
    uploadedAtDisplay: '30 Mar 2026, 10.05',
    transactionId: 'TRX-20260330-007',
    invoiceNumber: 'INV-20260330-007',
    verificationStatus: 'approved',
    paymentStatus: 'paid',
    proofUrl: 'https://example.com/proofs/yc.jpg',
    tenantInitials: 'YC',
  },
]

export const INVOICE_RECORDS: InvoiceRecord[] = [
  {
    id: 1,
    invoiceNumber: 'INV-20260325-001',
    transactionId: 'TRX-20260325-001',
    dateDisplay: '25 Mar 2026',
    planLabel: 'Premium',
    amountDisplay: formatIdr(399_000),
    amount: 399_000,
    verificationStatus: 'approved',
    paymentStatus: 'paid',
    proofUrl: 'https://example.com/proofs/inv1.jpg',
  },
  {
    id: 2,
    invoiceNumber: 'INV-20260225-042',
    transactionId: 'TRX-20260225-042',
    dateDisplay: '25 Feb 2026',
    planLabel: 'Premium',
    amountDisplay: formatIdr(399_000),
    amount: 399_000,
    verificationStatus: 'approved',
    paymentStatus: 'paid',
    proofUrl: null,
  },
  {
    id: 3,
    invoiceNumber: 'INV-20260125-089',
    transactionId: 'TRX-20260125-089',
    dateDisplay: '25 Jan 2026',
    planLabel: 'Basic',
    amountDisplay: formatIdr(149_000),
    amount: 149_000,
    verificationStatus: 'approved',
    paymentStatus: 'paid',
    proofUrl: null,
  },
]

export const TENANT_BILLING_HISTORY: TenantBillingHistoryItem[] = [
  {
    id: 1,
    packageLabel: 'Paket Basic',
    dateDisplay: '20 Mar 2026',
    amountDisplay: formatIdr(149_000),
    amount: 149_000,
    transactionId: 'TRX-20260320-014',
    invoiceNumber: 'INV-20260320-014',
    verificationStatus: 'approved',
    paymentStatus: 'paid',
    proofUrl: null,
  },
  {
    id: 2,
    packageLabel: 'Paket Basic',
    dateDisplay: '18 Feb 2026',
    amountDisplay: formatIdr(149_000),
    amount: 149_000,
    transactionId: 'TRX-20260218-022',
    invoiceNumber: 'INV-20260218-022',
    verificationStatus: 'approved',
    paymentStatus: 'paid',
    proofUrl: null,
  },
  {
    id: 3,
    packageLabel: 'Paket Premium',
    dateDisplay: '15 Jan 2026',
    amountDisplay: formatIdr(399_000),
    amount: 399_000,
    transactionId: 'TRX-20260115-003',
    invoiceNumber: 'INV-20260115-003',
    verificationStatus: 'rejected',
    paymentStatus: 'pending',
    proofUrl: null,
  },
  {
    id: 4,
    packageLabel: 'Paket Basic',
    dateDisplay: '12 Jan 2026',
    amountDisplay: formatIdr(149_000),
    amount: 149_000,
    transactionId: null,
    invoiceNumber: 'INV-20260112-099',
    verificationStatus: 'pending',
    paymentStatus: 'pending',
    proofUrl: null,
  },
]

export const DEFAULT_TENANT_SETTINGS: TenantSettings = {
  institutionName: 'SMA Negeri 1 Jakarta',
  category: 'sekolah',
  address: 'Jl. Budi Utomo No. 7, Jakarta Pusat',
  timezone: 'WIB',
  contactEmail: 'admin@sman1jakarta.sch.id',
  phone: '0812-3456-7890',
  workdayCheckIn: '07:00',
  workdayCheckOut: '17:00',
  lateToleranceMinutes: 15,
  attendanceMode: 'both',
  activeWeekdays: ['sen', 'sel', 'rab', 'kam', 'jum'],
}

/** Snapshot langganan tenant (baca saja, dari `institutions`). */
export const DEFAULT_TENANT_SUBSCRIPTION: TenantSubscriptionInfo = {
  plan: 'basic',
  maxEmployees: 200,
  expiresAt: '2026-04-21T23:59:59.000Z',
  activeEmployeeCount: STAFF_MEMBERS.filter((s) => s.isActive).length,
}

export const DEFAULT_TENANT_ADMINS: TenantAdminUser[] = [
  {
    id: 1,
    fullName: 'Budi Santoso',
    email: 'budi@sman1jkt.sch.id',
    phoneNumber: '081298765432',
    role: 'admin',
    initials: 'BS',
    color: '#3B6BF6',
    avatarUrl: null,
  },
  {
    id: 2,
    fullName: 'Rina Wulandari',
    email: 'rina@sman1jkt.sch.id',
    phoneNumber: '081377788899',
    role: 'admin',
    initials: 'RW',
    color: '#f97316',
    avatarUrl: null,
  },
]

export const DEFAULT_TENANT_ADMIN_PROFILE: TenantAdminProfile = {
  displayName: 'Admin Instansi',
  accountRoleLabel: 'Tenant Admin',
  email: 'admin@presenly.id',
  phoneNumber: '081234567890',
  avatarUrl: null,
}

export const DEFAULT_SUPERADMIN_PROFILE: SuperAdminProfile = {
  displayName: 'Super Admin',
  email: 'root@presenly.id',
  phoneNumber: '081200011122',
  avatarUrl: null,
}

export const DASHBOARD_TENANT_STATS: DashboardStatCard[] = [
  {
    label: 'HADIR HARI INI',
    value: '1.284',
    iconBgClass: 'bg-blue-50/50 text-blue-600 border-blue-100/50',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[1.2rem] h-[1.2rem]"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>',
  },
  {
    label: 'TERLAMBAT',
    value: '42',
    iconBgClass: 'bg-amber-50/50 text-amber-600 border-amber-100/50',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[1.2rem] h-[1.2rem]"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  },
  {
    label: 'WAJAH TERDAFTAR',
    value: '3.501',
    iconBgClass: 'bg-blue-50 text-blue-500 border-blue-100',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[1.2rem] h-[1.2rem]"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="3" /></svg>',
  },
  {
    label: 'PEGAWAI AKTIF',
    value: '3.438',
    iconBgClass: 'bg-slate-50 text-slate-500 border-slate-200',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[1.2rem] h-[1.2rem]"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  },
]

export const DASHBOARD_CHART_DAYS: ChartBarDay[] = [
  { label: 'SEN', height: '40%', val: 400 },
  { label: 'SEL', height: '55%', val: 650 },
  { label: 'RAB', height: '90%', val: '1.284', highlight: true },
  { label: 'KAM', height: '45%', val: 560 },
  { label: 'JUM', height: '60%', val: 780 },
  { label: 'SAB', height: '15%', val: 120 },
  { label: 'MIN', height: '10%', val: 80 },
]

export const DASHBOARD_LIVE_DETECTIONS: DashboardLiveDetection[] = [
  {
    id: 1,
    name: 'Ahmad Fauzi',
    terminalLabel: 'KIOSK LOBBY A',
    timeDisplay: '09:12',
    matchLabel: 'MIRIP 94%',
    presence: 'online',
  },
  {
    id: 2,
    name: 'Rina Wulandari',
    terminalLabel: 'KIOSK LOBBY A',
    timeDisplay: '09:13',
    matchLabel: 'MIRIP 98%',
    presence: 'online',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    terminalLabel: 'KIOSK LOBBY B',
    timeDisplay: '09:15',
    matchLabel: 'MIRIP 87%',
    presence: 'late',
  },
]

export const DASHBOARD_EARLY_ARRIVALS: EarlyArrivalHighlight[] = [
  { id: 1, fullName: 'Dewi Lestari', employeeCode: '19781210004' },
  { id: 2, fullName: 'Muhammad Haris', employeeCode: '19910505005' },
  { id: 3, fullName: 'Siti Aminah', employeeCode: '19950711007' },
  { id: 4, fullName: 'Doni Setiawan', employeeCode: '19920915008' },
]

export const SUPERADMIN_OVERVIEW_STATS: SuperadminStatCard[] = [
  {
    label: 'Instansi Aktif',
    value: '248',
    bg: 'bg-blue-50/50 text-blue-600 border-blue-100/50',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>',
  },
  {
    label: 'Pendapatan',
    value: 'Rp 28.4jt',
    bg: 'bg-green-50/50 text-green-600 border-green-100/50',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
  },
  {
    label: 'Data Terunggah',
    value: '1.2 GB',
    bg: 'bg-indigo-50/50 text-indigo-600 border-indigo-100/50',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
  },
  {
    label: 'Total User',
    value: '12.4k',
    bg: 'bg-purple-50/50 text-purple-600 border-purple-100/50',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
  },
]

export const SUPERADMIN_CHART_DAYS: ChartBarDay[] = [
  { label: 'SEN', height: '40%', val: '3,2k' },
  { label: 'SEL', height: '55%', val: '3,8k' },
  { label: 'RAB', height: '90%', val: '4,8k', highlight: true },
  { label: 'KAM', height: '45%', val: '3,4k' },
  { label: 'JUM', height: '60%', val: '4,0k' },
  { label: 'SAB', height: '15%', val: '1,1k' },
  { label: 'MIN', height: '10%', val: '0,8k' },
]

export const SUPERADMIN_TENANT_WIDGETS: SuperadminTenantWidget[] =
  TENANT_SUMMARIES.slice(0, 4).map((t) => ({
    id: t.id,
    name: t.name,
    plan: t.plan,
    memberCount: t.memberCount,
    initials: t.initials,
  }))

/** Label status invoice (pembayaran faktur). */
export function invoicePaymentStatusLabel(s: InvoiceRecord['paymentStatus']) {
  return s === 'paid' ? 'Lunas' : 'Menunggu'
}

/** Label verifikasi bukti (`payments.verification_status`). */
export function paymentVerificationLabel(
  s: InvoiceRecord['verificationStatus'],
) {
  return (
    { pending: 'Verifikasi', approved: 'Disetujui', rejected: 'Ditolak' }[s] ||
    s
  )
}

/** Riwayat absensi harian — kode status sama dengan laporan grid. */
export const SAMPLE_ATTENDANCE_DAILY_RECORDS: AttendanceDailyRecord[] = [
  {
    id: 1,
    dateDisplay: '03 Apr 2026',
    staffName: 'Budi Santoso',
    checkInDisplay: '07:54',
    checkOutDisplay: '17:05',
    status: 'H',
    note: '',
    avatarColor: '#3B6BF6',
  },
  {
    id: 2,
    dateDisplay: '03 Apr 2026',
    staffName: 'Rina Wulandari',
    checkInDisplay: '08:12',
    checkOutDisplay: '17:00',
    status: 'T',
    note: 'Macet',
    avatarColor: '#f97316',
  },
  {
    id: 3,
    dateDisplay: '03 Apr 2026',
    staffName: 'Ahmad Fauzi',
    checkInDisplay: '—',
    checkOutDisplay: '—',
    status: 'S',
    note: 'Demam',
    avatarColor: '#22c55e',
  },
  {
    id: 4,
    dateDisplay: '03 Apr 2026',
    staffName: 'Dewi Lestari',
    checkInDisplay: '07:48',
    checkOutDisplay: '16:58',
    status: 'H',
    note: '',
    avatarColor: '#a855f7',
  },
  {
    id: 5,
    dateDisplay: '02 Apr 2026',
    staffName: 'Budi Santoso',
    checkInDisplay: '07:52',
    checkOutDisplay: '17:02',
    status: 'H',
    note: '',
    avatarColor: '#3B6BF6',
  },
  {
    id: 6,
    dateDisplay: '02 Apr 2026',
    staffName: 'Muhammad Haris',
    checkInDisplay: '—',
    checkOutDisplay: '—',
    status: 'A',
    note: 'Tanpa keterangan',
    avatarColor: '#06b6d4',
  },
]

/** Label kode kehadiran (Indonesia). */
export const ATTENDANCE_CODE_LABELS: Record<AttendanceDayCode, string> = {
  H: 'Hadir',
  T: 'Terlambat',
  A: 'Tidak Hadir',
  S: 'Sakit',
  I: 'Izin',
}
