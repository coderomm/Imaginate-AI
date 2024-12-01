'use client'

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import UserAccountDropDown from "./UserAccountDropDown";
import { useEffect, useState } from "react";
import { Circle, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { useClearSessionIfLoginNotRequired } from "@/utils/clearSession";

export const Appbar = () => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();
  useClearSessionIfLoginNotRequired();
  useEffect(() => {
    if (status !== "loading") {
      setInitialLoading(false);
    }
  }, [status, session]);
  const pathname = usePathname()
  const loginRequired = process.env.NEXT_PUBLIC_LOGIN_REQUIRED === "true";
  return (
    <nav className="sticky mx-auto wrapper top-0 z-50 flex items-center gap-2 w-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", type: "spring", damping: 10 }}
        className="flex w-full justify-between mx-auto bg-secondary/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-primary/10 p-4 rounded-b-2xl lg:px-24"
      >
        <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-foreground block custom-text-color animate-pulse">
            Imaginate AI
          </span>
        </Link>
        {loginRequired ? (
          <div className="flex items-center gap-8">
            {initialLoading && status === "loading" ? (
              <Circle className="animate-spin" />
            ) : !session ? (
              <Button size={"lg"} onClick={async () => { await signIn('google'); }}>Login</Button>
            ) : (
              <UserAccountDropDown />
            )}
          </div>
        ) : (
          pathname !== '/generate-image' && (
            <Link href={'/generate-image'} className="flex items-center" aria-label="Create Image">
              <HoverBorderGradient
                containerClassName="rounded-full bg-transparent"
                as="button"
                className="text-white flex items-center space-x-2 w-full md:w-auto bg-transparent">
                <span className="flex justify-center items-center gap-2 w-auto text-white">
                  Create <Plus className="w-6 h-6" />
                </span>
              </HoverBorderGradient>
            </Link>
          )
        )}
      </motion.div>
    </nav>
  );
};