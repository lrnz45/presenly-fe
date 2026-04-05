export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuth()
    
    // Alamat yang boleh diakses publik
    const publicPages = ['/', '/login', '/register', '/kiosk']
    const isPublic = publicPages.some(p => to.path === p || (p !== '/' && to.path.startsWith(p + '/')))
    
    // Jika tidak ada user tapi ada token, coba fetch (hidrasi state)
    if (!auth.user.value && auth.token.value) {
        try {
            await auth.fetchUser()
        } catch (e) {
            // Token invalid atau expired
            auth.token.value = null
        }
    }
    
    const userRole = auth.user.value?.role
    const isAuthenticated = auth.isAuthenticated.value
    
    // Proteksi Dasar: Jika tidak login & bukan halaman publik
    if (!isPublic && !isAuthenticated) {
        return navigateTo('/login')
    }
    
    // Proteksi Role (RBAC):
    if (isAuthenticated) {
        // 1. Admin (tenant) tidak boleh ke /superadmin/*
        if (userRole === 'admin' && to.path.startsWith('/superadmin')) {
            return navigateTo('/dashboard')
        }
        
        // 2. Superadmin tidak boleh ke /dashboard/*
        if (userRole === 'superadmin' && to.path.startsWith('/dashboard')) {
            return navigateTo('/superadmin/dashboard')
        }
        
        // Redirect: Jika sudah login tapi ke login/register
        if (to.path === '/login' || to.path === '/register') {
            if (userRole === 'superadmin') return navigateTo('/superadmin/dashboard')
            return navigateTo('/dashboard')
        }
    }
})
