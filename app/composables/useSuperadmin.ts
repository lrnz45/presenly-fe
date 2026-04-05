import type { SuperadminStatCard, ChartBarDay, SuperadminTenantWidget, TenantSummary, TenantDetail, PaymentTransaction } from '~/types'

export const useSuperadmin = () => {
    const { fetchApi } = useApi()

    // Dashboard Overview
    const getStats = async () => {
        return fetchApi<SuperadminStatCard[]>('/admin/overview/stats')
    }
    const getScanChart = async (week: string = 'current') => {
        return fetchApi<ChartBarDay[]>('/admin/overview/scan-chart', { query: { week } })
    }
    const getRecentInstitutions = async (limit: number = 4) => {
        return fetchApi<SuperadminTenantWidget[]>('/admin/overview/recent-institutions', { query: { limit } })
    }

    // Institutions Management
    const getInstitutions = async (query: any = {}) => {
        return fetchApi<TenantSummary[]>('/admin/institutions', { query })
    }
    const createInstitution = async (payload: any) => {
        return fetchApi('/admin/institutions', { method: 'POST', body: payload })
    }
    const getInstitutionDetail = async (id: number) => {
        return fetchApi<TenantDetail>(`/admin/institutions/${id}`)
    }
    const updateInstitution = async (id: number, payload: any) => {
        return fetchApi(`/admin/institutions/${id}`, { method: 'PATCH', body: payload })
    }

    // Payment Verifications
    const getTransactions = async (query: any = {}) => {
        return fetchApi<PaymentTransaction[]>('/admin/payments', { query })
    }
    const getTransactionDetail = async (id: number) => {
        return fetchApi<PaymentTransaction>(`/admin/payments/${id}`)
    }
    const approvePayment = async (id: number, note?: string) => {
        return fetchApi(`/admin/payments/${id}/approve`, { method: 'PATCH', body: { note } })
    }
    const rejectPayment = async (id: number, reason: string) => {
        return fetchApi(`/admin/payments/${id}/reject`, { method: 'PATCH', body: { reason } })
    }

    return {
        getStats,
        getScanChart,
        getRecentInstitutions,
        getInstitutions,
        createInstitution,
        getInstitutionDetail,
        updateInstitution,
        getTransactions,
        getTransactionDetail,
        approvePayment,
        rejectPayment
    }
}
