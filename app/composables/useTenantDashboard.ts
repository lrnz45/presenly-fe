import type { DashboardStatCard, ChartBarDay, DashboardLiveDetection, EarlyArrivalHighlight } from '~/types'

export const useTenantDashboard = () => {
    const { fetchApi } = useApi()

    const getSummary = async (date?: string) => {
        return fetchApi<DashboardStatCard[]>('/tenant/dashboard/summary', {
            query: { date }
        })
    }

    const getAttendanceChart = async (range: string = '7d') => {
        return fetchApi<ChartBarDay[]>('/tenant/dashboard/attendance-chart', {
            query: { range }
        })
    }

    const getLiveFeed = async (limit: number = 20) => {
        return fetchApi<DashboardLiveDetection[]>('/tenant/dashboard/live-scans', {
            query: { limit }
        })
    }

    const getEarlyArrivals = async (limit: number = 5) => {
        return fetchApi<EarlyArrivalHighlight[]>('/tenant/dashboard/early-arrivals', {
            query: { limit }
        })
    }

    return {
        getSummary,
        getAttendanceChart,
        getLiveFeed,
        getEarlyArrivals
    }
}
