import type { TenantSubscriptionInfo, TenantBillingHistoryItem } from '~/types'

export const useBilling = () => {
    const { fetchApi } = useApi()

    const getPlan = async () => {
        return fetchApi<TenantSubscriptionInfo>('/tenant/billing/plan')
    }

    const getPayments = async (limit: number = 10) => {
        return fetchApi<TenantBillingHistoryItem[]>('/tenant/billing/payments', {
            query: { limit }
        })
    }

    const submitPayment = async (payload: { plan: string, amount: number, proofUrl: string }) => {
        return fetchApi('/tenant/billing/payments', {
            method: 'POST',
            body: payload
        })
    }

    const uploadProof = async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)
        return fetchApi<{ url: string }>('/tenant/billing/uploads/proof', {
            method: 'POST',
            body: formData
        })
    }

    return {
        getPlan,
        getPayments,
        submitPayment,
        uploadProof
    }
}
