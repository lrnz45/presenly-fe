import type { TenantSettings, TenantDetail, TenantAdminUser, UpdateInstitutionPayload } from '~/types'

export const useInstitution = () => {
    const { fetchApi } = useApi()

    const getInstitution = async () => {
        return fetchApi<TenantSettings & TenantDetail>('/tenant/institution')
    }

    const updateInstitution = async (payload: UpdateInstitutionPayload) => {
        return fetchApi('/tenant/institution', {
            method: 'PATCH',
            body: payload
        })
    }

    const updateKioskPin = async (pin: string) => {
        return fetchApi('/tenant/institution/kiosk-pin', {
            method: 'PATCH',
            body: { pin }
        })
    }

    const getAdmins = async () => {
        return fetchApi<TenantAdminUser[]>('/tenant/admins')
    }

    const inviteAdmin = async (email: string) => {
        return fetchApi('/tenant/admins/invitations', {
            method: 'POST',
            body: { email }
        })
    }

    const deleteAdmin = async (id: number) => {
        return fetchApi(`/tenant/admins/${id}`, {
            method: 'DELETE'
        })
    }

    return {
        getInstitution,
        updateInstitution,
        updateKioskPin,
        getAdmins,
        inviteAdmin,
        deleteAdmin
    }
}
