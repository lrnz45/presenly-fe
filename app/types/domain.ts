/** Kategori instansi (nilai form / API). */
export type TenantCategoryId = 'sekolah' | 'perusahaan'

/** Paket langganan. */
export type PlanTier = 'free' | 'basic' | 'premium'

/** Kesehatan langganan di daftar tenant. */
export type SubscriptionHealth = 'active' | 'expiring'

/** Verifikasi pembayaran (tenant upload bukti / superadmin). */
export type PaymentVerificationStatus = 'pending' | 'approved' | 'rejected'

/** Kode kehadiran harian (rekap / grid laporan). */
export type AttendanceDayCode = 'H' | 'T' | 'A' | 'S' | 'I'

/** Peran admin (`admins.role`). */
export type TenantAdminRole = 'admin' | 'superadmin'

/** Zona waktu Indonesia (label singkat). */
export type IndonesiaTimezoneId = 'WIB' | 'WITA' | 'WIT'

/** Mode absensi harian. */
export type AttendanceCaptureMode = 'both' | 'in_only'

/** Hari kerja (kunci pendek, konsisten dengan pengaturan). */
export type WeekdayKey = 'sen' | 'sel' | 'rab' | 'kam' | 'jum' | 'sab' | 'min'

/** Pegawai — selaras `employees`. */
export interface StaffMember {
  id: number
  /** NIP / NIS / ID karyawan (`identifier_id`). */
  identifierId: string
  name: string
  email: string
  jobTitle: string
  department: string
  faceEnrolled: boolean
  /** `joined_at` (YYYY-MM-DD). */
  joinedAtDate: string
  /** Label tampilan opsional (fallback dari joinedAtDate). */
  joinedAtLabel: string
  initials: string
  avatarColor: string
  isActive: boolean
  photoUrl?: string | null
}

/** Baris ringkas untuk heatmap / rekap (subset staff). */
export type AttendanceGridStaff = Pick<
  StaffMember,
  'id' | 'name' | 'department' | 'initials' | 'avatarColor' | 'identifierId'
>

/** Ringkasan tenant — `institutions` + agregat. */
export interface TenantSummary {
  id: number
  name: string
  categoryLabel: string
  plan: PlanTier
  /** Jumlah baris aktif / terhitung (vs `max_employees`). */
  memberCount: number
  maxEmployees: number
  /** ISO 8601 (`expires_at`). */
  expiresAt: string
  subscriptionHealth: SubscriptionHealth
  initials: string
}

/** Admin utama tenant (detail instansi). */
export interface TenantPrimaryAdmin {
  fullName: string
  email: string
  initials: string
}

/** Detail instansi — subset kolom `institutions` + admin utama. */
export interface TenantDetail {
  id: number
  name: string
  initials: string
  category: TenantCategoryId
  categoryLabel: string
  plan: PlanTier
  maxEmployees: number
  expiresAt: string
  contactEmail: string
  phone: string
  address: string
  primaryAdmin: TenantPrimaryAdmin
  memberCount: number
}

/** Baris `payments` + join instansi (superadmin). */
export interface PaymentTransaction {
  id: number
  institutionId: number
  tenantName: string
  categoryLabel: string
  plan: PlanTier
  amount: number
  amountDisplay: string
  uploadedAtDisplay: string
  transactionId: string | null
  invoiceNumber: string | null
  verificationStatus: PaymentVerificationStatus
  paymentStatus: 'paid' | 'pending'
  proofUrl: string | null
  tenantInitials: string
}

/** Invoice / riwayat tagihan tenant — `payments`. */
export interface InvoiceRecord {
  id: number
  invoiceNumber: string | null
  transactionId: string | null
  dateDisplay: string
  planLabel: string
  amountDisplay: string
  amount: number
  verificationStatus: PaymentVerificationStatus
  paymentStatus: 'paid' | 'pending'
  proofUrl: string | null
}

/** Riwayat pembayaran sisi tenant. */
export interface TenantBillingHistoryItem {
  id: number
  packageLabel: string
  dateDisplay: string
  amountDisplay: string
  amount: number
  transactionId: string | null
  invoiceNumber: string | null
  verificationStatus: PaymentVerificationStatus
  paymentStatus: 'paid' | 'pending'
  proofUrl: string | null
}

/** Pengguna admin — `admins` (tanpa password_hash). */
export interface TenantAdminUser {
  id: number
  fullName: string
  email: string
  phoneNumber: string
  role: TenantAdminRole
  initials: string
  color: string
  avatarUrl?: string | null
}

/** Form pengaturan instansi — kolom `institutions` yang bisa diubah tenant. */
export interface TenantSettings {
  institutionName: string
  category: TenantCategoryId
  address: string
  timezone: IndonesiaTimezoneId
  contactEmail: string
  phone: string
  workdayCheckIn: string
  workdayCheckOut: string
  lateToleranceMinutes: number
  attendanceMode: AttendanceCaptureMode
  activeWeekdays: WeekdayKey[]
}

/** Info paket / kuota — baca saja dari `institutions`. */
export interface TenantSubscriptionInfo {
  plan: PlanTier
  maxEmployees: number
  expiresAt: string
  activeEmployeeCount: number
}

/** Profil admin tenant — `admins`. */
export interface TenantAdminProfile {
  displayName: string
  accountRoleLabel: string
  email: string
  phoneNumber: string
  avatarUrl?: string | null
}

/** Profil superadmin — `admins` superadmin. */
export interface SuperAdminProfile {
  displayName: string
  email: string
  phoneNumber: string
  avatarUrl?: string | null
}

/** Login email + password. */
export interface LoginCredentials {
  email: string
  password: string
}

/** Data formulir pendaftaran tenant. */
export interface RegisterInstitutionPayload {
  registrantFullName: string
  institutionName: string
  email: string
  phone: string
  password: string
  category: TenantCategoryId | ''
  termsAccepted: boolean
}

/** Draft tambah instansi (superadmin). */
export interface NewTenantDraft {
  institutionName: string
  category: TenantCategoryId
  plan: PlanTier
  primaryAdminEmail: string
  whatsappNumber: string
}

/** Log scan kiosk — `attendance_logs` + join pegawai. */
export interface KioskCheckInLogEntry {
  logId?: number
  id: string | number
  employeeId?: number
  name: string
  subtitle: string
  initials: string
  timeDisplay: string
  scanType?: 'IN' | 'OUT'
  punctualityLabel: 'Tepat Waktu' | 'Terlambat'
  confidence?: number
  photoUrl?: string
  skip?: boolean
}

/** Sampel embedding — `face_embeddings`. */
export interface FaceEmbeddingSample {
  sampleIndex: number
  sampleType?: string | null
  /** Vektor panjang 1024 untuk kolom `vector(1024)`. */
  embedding: number[]
}

/** Rekap harian — `attendance_daily_records`. */
export interface AttendanceDailyRecordRow {
  id: number
  employeeId: number
  recordDate: string
  checkInTime: string | null
  checkOutTime: string | null
  dayCode: AttendanceDayCode
  note: string | null
}

/** Kartu deteksi live di dashboard. */
export interface DashboardLiveDetection {
  id: number
  name: string
  terminalLabel: string
  timeDisplay: string
  matchLabel: string
  presence: 'online' | 'late'
}

/** Highlight kedatangan pagi. */
export interface EarlyArrivalHighlight {
  id: number
  fullName: string
  employeeCode: string
}

/** Stat dashboard tenant. */
export interface DashboardStatCard {
  label: string
  value: string
  iconBgClass: string
  icon: string
}

/** Batang grafik mingguan. */
export interface ChartBarDay {
  label: string
  height: string
  val: string | number
  highlight?: boolean
}

/** Widget tenant di sidebar superadmin dashboard. */
export interface SuperadminTenantWidget {
  id: number
  name: string
  plan: PlanTier
  memberCount: number
  initials: string
}

/** Stat kartu superadmin overview. */
export interface SuperadminStatCard {
  label: string
  value: string
  bg: string
  icon: string
}

/** Modal edit sel-sel rekap (laporan.vue). */
export interface AttendanceCellEditState {
  staffId: number
  staffName: string
  dayOfMonth: number
  status: AttendanceDayCode | ''
  checkInTime: string
  checkOutTime: string
  note: string
}

/** Baris riwayat absensi per tanggal (laporan copy — selaras kode H/T/A/S/I). */
export interface AttendanceDailyRecord {
  id: number
  dateDisplay: string
  staffName: string
  checkInDisplay: string
  checkOutDisplay: string
  status: AttendanceDayCode
  note: string
  avatarColor: string
}

/** Payload untuk update pengaturan instansi. */
export interface UpdateInstitutionPayload extends Partial<TenantSettings> {
  pin?: string
}

/** Payload untuk tambah pegawai. */
export interface CreateEmployeePayload {
  identifierId: string
  name: string
  email?: string
  jobTitle?: string
  department?: string
}

/** Payload untuk batch enrollment wajah. */
export interface FaceSampleBatchPayload {
  samples: Array<{
    embedding: number[]
    sampleIndex: number
    sampleType?: string
  }>
}

/** Payload untuk update satu rekor absensi. */
export interface UpdateAttendanceRecordPayload {
  dayCode: AttendanceDayCode
  checkInTime?: string
  checkOutTime?: string
  note?: string
}
