import prisma from "@/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRATE!,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async session({ session }) {
            const user = await prisma.user.findUnique({
                where: { email: session.user?.email || "" },
            });
            if (user) {
                session.user = {
                    ...user,
                };
            }
            return session;
        },
    },
};