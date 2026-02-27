import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth({
    providers: [
        ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
            ? [
                Google({
                    clientId: process.env.AUTH_GOOGLE_ID,
                    clientSecret: process.env.AUTH_GOOGLE_SECRET,
                    allowDangerousEmailAccountLinking: true,
                }),
            ]
            : []),
        Credentials({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (
                    credentials.username === "admin" &&
                    credentials.password === "admin"
                ) {
                    return {
                        id: "admin-user",
                        name: "Admin User",
                        email: "admin@pakbazaar.com",
                        role: "admin",
                        image: "https://ui.shadcn.com/avatars/02.png",
                    }
                }
                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.role = (user as any).role || "user"
            }
            if (trigger === "update" && session?.user) {
                token.role = session.user.role;
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).role = token.role as string
            }
            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isAdminPage = nextUrl.pathname.startsWith("/admin")
            const isLoginPage = nextUrl.pathname === "/admin/login"

            // Allow public access to everything except /admin
            if (!isAdminPage) return true

            // Admin Logic
            if (isAdminPage) {
                if (isLoginPage) {
                    // If already logged in as admin, redirect to dashboard
                    if (isLoggedIn && (auth?.user as any).role === 'admin') {
                        return Response.redirect(new URL('/admin/dashboard', nextUrl))
                    }
                    // Allow access to login page
                    return true;
                }

                // Protect other admin pages
                if (!isLoggedIn || (auth?.user as any).role !== "admin") {
                    return Response.redirect(new URL("/admin/login", nextUrl))
                }
            }
            return true
        },
    },
})
