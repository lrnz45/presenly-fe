export const useApi = () => {
    const config = useRuntimeConfig()
    const { token, logout } = useAuth()

    const fetchApi = async <T>(path: string, options: any = {}): Promise<T> => {
        try {
            const url = path.startsWith('http') ? path : `${config.public.apiBase}${path}`
            const headers = {
                ...options.headers,
            }

            if (token.value) {
                headers.Authorization = `Bearer ${token.value}`
            }

            return await $fetch<T>(url, {
                ...options,
                headers
            })
        } catch (e: any) {
            if (e.status === 401) {
                logout()
            }
            throw e.data || { message: 'Terjadi kesalahan sistem.' }
        }
    }

    return {
        fetchApi
    }
}
