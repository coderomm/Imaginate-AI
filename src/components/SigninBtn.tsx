'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";

export default function SigninBtn() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if (status !== 'loading') setLoading(false);
    }, [status, session])
    return (
        <>
            {loading && status === 'loading' ? (
                <LoaderCircle className="animate-spin" />
            ) : (
                !session ? (
                    <Button onClick={() => signIn('google')}>Login</Button>
                ) : (
                    <div className="flex items-center justify-end gap-4">
                        <Avatar className="w-10">
                            <AvatarImage src={session.user?.image || ""} className="rounded-full" />
                        </Avatar>
                        <Button onClick={() => signOut()}>Logout</Button>
                    </div>
                )
            )}
        </>
    )
}