import type { StaffMember, CreateEmployeePayload, FaceSampleBatchPayload } from '~/types'

export const useEmployees = () => {
    const { fetchApi } = useApi()

    const getEmployees = async (query: any = {}) => {
        return fetchApi<StaffMember[]>('/tenant/employees', {
            query
        })
    }

    const createEmployee = async (payload: CreateEmployeePayload) => {
        return fetchApi<StaffMember>('/tenant/employees', {
            method: 'POST',
            body: payload
        })
    }

    const updateEmployee = async (id: number, payload: Partial<StaffMember>) => {
        return fetchApi(`/tenant/employees/${id}`, {
            method: 'PATCH',
            body: payload
        })
    }

    const deleteEmployee = async (id: number) => {
        return fetchApi(`/tenant/employees/${id}`, {
            method: 'DELETE'
        })
    }

    const getEnrollmentStatus = async (id: number) => {
        return fetchApi<{ count: number, isReady: boolean }>(`/tenant/employees/${id}/enrollment`)
    }

    const submitFaceSamples = async (id: number, samples: FaceSampleBatchPayload['samples']) => {
        return fetchApi(`/tenant/employees/${id}/face-samples`, {
            method: 'POST',
            body: { samples }
        })
    }

    const resetEnrollment = async (id: number) => {
        return fetchApi(`/tenant/employees/${id}/face-samples`, {
            method: 'DELETE'
        })
    }

    return {
        getEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        getEnrollmentStatus,
        submitFaceSamples,
        resetEnrollment
    }
}
