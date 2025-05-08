import { Account, AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

import { z } from "zod";
import { LoginPayloadSchema } from "@/lib/schemas";
import { LOGIN_URL } from "@/lib/apiEndPoints";

export interface User {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    provider?: string | null;
    token?: string | null;
}

export interface CustomSession {
    user?: User;
    expires: ISODateString;
}

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/",
    },
    callbacks: {
        async signIn({
            user,
            account,
        }: {
            user: User;
            account: Account | null;
        }) {
            try {

                const payload = {
                    email: user.email,
                    name: user.name,
                    oauth_id: account?.providerAccountId,
                    provider: account?.provider,
                    image: user.image,
                };

                const parsed = LoginPayloadSchema.safeParse(payload);

                if (!parsed.success) {
                    console.error(
                        "Invalid payload:",
                        parsed.error.flatten().fieldErrors
                    );
                    return false;
                }

                const { data } = await axios.post(LOGIN_URL, payload);

                user.id = data?.user?.id.toString();
                user.token = data?.user?.token;
                user.provider = data?.user?.provider;

                return true;
            } catch (error) {
                return false;
            }
        },
        async session({
            session,
            user,
            token,
        }: {
            session: CustomSession;
            user: User;
            token: JWT;
        }) {
            session.user = token.user as User;
            return session;
        },
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // To get google "Are you sure" screen
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
};
