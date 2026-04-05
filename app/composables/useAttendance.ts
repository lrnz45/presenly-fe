import type { AttendanceGridStaff, AttendanceDailyRecord, UpdateAttendanceRecordPayload } from '~/types'

export const useAttendance = () => {
    const { fetchApi } = useApi()

    const getCalendarData = async (query: { year: number, month: number }) => {
        // Alamat baru sesuai dokumentasi
        return fetchApi<{ employees: AttendanceGridStaff[], attendance: any }>('/institutions/me/attendance-daily', {
            query
        })
    }

    const getDailyRecords = async (query: any = {}) => {
        // Alamat baru sesuai dokumentasi
        return fetchApi<AttendanceDailyRecord[]>('/institutions/me/attendance-logs', {
            query
        })
    }

    const updateRecord = async (id: number, payload: UpdateAttendanceRecordPayload) => {
        return fetchApi(`/institutions/me/attendance-daily/${id}`, {
            method: 'PATCH',
            body: payload
        })
    }

    const upsertRecord = async (payload: any) => {
        return fetchApi('/institutions/me/attendance-daily', {
            method: 'PUT',
            body: payload
        })
    }

    const deleteRecord = async (employeeId: number, recordDate: string) => {
        return fetchApi('/institutions/me/attendance-daily', {
            method: 'DELETE',
            query: { employeeId, recordDate }
        })
    }

    const getExportUrl = async (type: 'excel' | 'pdf', query: any = {}) => {
        return fetchApi<{ url: string }>(`/institutions/me/exports/${type}`, {
            query
        })
    }

    return {
        getCalendarData,
        getDailyRecords,
        updateRecord,
        upsertRecord,
        deleteRecord,
        getExportUrl
    }
}
