import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.API}/auth/signin`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const payload = await response.json()

                if (payload.message === "success") {
                    const decode: { id: string } = jwtDecode(payload.token)

                    return {
                        id: decode.id,
                        name: payload.user.name,
                        email: payload.user.email,
                        token: payload.token,
                        user: payload.user 
                    } as any;
                } else {
                    throw new Error("invalid email or password")
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = (user as any).user;
                token.token = (user as any).token;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = token.user as any;
            return session;
        }
    }
}