import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export const useClearSessionIfLoginNotRequired = () => {
    const { data: session } = useSession();
    const loginRequired = process.env.NEXT_PUBLIC_LOGIN_REQUIRED === "true";

    useEffect(() => {
        if (!loginRequired && session) {
            console.log("Login is not required, clearing session...");
            signOut({ redirect: false });
        }
    }, [loginRequired, session]);
};