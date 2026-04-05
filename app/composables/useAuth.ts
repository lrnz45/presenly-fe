import { ref, computed } from 'vue'
import type { LoginCredentials, RegisterInstitutionPayload } from '~/types'

interface AuthUser {
    id: number
    fullName: string
    email: string
    role: string
    institutionId: number | null
}

interface AuthTokens {
    accessToken: string
    user: AuthUser
}

export const useAuth = () => {
    const config = useRuntimeConfig()
    const user = useState<AuthUser | null>('auth-user', () => null)
    const token = useCookie<string | null>('auth-token', { maxAge: 60 * 60 * 24 * 7 }) // 7 days

    const isAuthenticated = computed(() => !!token.value && !!user.value)

    const fetchUser = async () => {
        if (!token.value) return
        try {
            const data = await $fetch<AuthUser>(`${config.public.apiBase}/auth/me`, {
                headers: { Authorization: `Bearer ${token.value}` }
            })
            user.value = data
        } catch (e) {
            token.value = null
            user.value = null
        }
    }

    const login = async (credentials: LoginCredentials) => {
        try {
            const data = await $fetch<AuthTokens>(`${config.public.apiBase}/auth/login`, {
                method: 'POST',
                body: credentials
            })
            token.value = data.accessToken
            user.value = data.user
            return data
        } catch (e: any) {
            throw e.data || { message: 'Gagal masuk. Cek kredensial Anda.' }
        }
    }

    const register = async (payload: RegisterInstitutionPayload) => {
        try {
            const data = await $fetch<AuthTokens>(`${config.public.apiBase}/auth/register`, {
                method: 'POST',
                body: payload
            })
            token.value = data.accessToken
            user.value = data.user
            return data
        } catch (e: any) {
            throw e.data || { message: 'Pendaftaran gagal.' }
        }
    }

    const loginWithGoogle = async (idToken: string) => {
        try {
            const data = await $fetch<AuthTokens>(`${config.public.apiBase}/auth/google`, {
                method: 'POST',
                body: { idToken }
            })
            token.value = data.accessToken
            user.value = data.user
            return data
        } catch (e: any) {
            throw e.data || { message: 'Google Auth gagal. Akun mungkin belum terdaftar.' }
        }
    }

    const logout = async () => {
        if (token.value) {
            try {
                await $fetch(`${config.public.apiBase}/auth/logout`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token.value}` }
                })
            } catch (e) { }
        }
        token.value = null
        user.value = null
        navigateTo('/login')
    }

    const updateProfile = async (payload: any) => {
        try {
            const data = await $fetch<AuthUser>(`${config.public.apiBase}/auth/update-profile`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token.value}` },
                body: payload
            })
            user.value = data
            return data
        } catch (e: any) {
            console.error('[useAuth.updateProfile Error]', e.data || e)
            throw e.data || { message: 'Gagal memperbarui profil.' }
        }
    }

    const changePassword = async (payload: any) => {
        try {
            await $fetch(`${config.public.apiBase}/auth/change-password`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token.value}` },
                body: payload
            })
        } catch (e: any) {
            console.error('[useAuth.changePassword Error]', e.data || e)
            throw e.data || { message: 'Gagal mengganti kata sandi.' }
        }
    }

    return {
        user,
        token,
        isAuthenticated,
        login,
        register,
        loginWithGoogle,
        logout,
        fetchUser,
        updateProfile,
        changePassword
    }
}
