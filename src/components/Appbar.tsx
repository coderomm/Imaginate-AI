'use client'

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import UserAccountDropDown from "./UserAccountDropDown";
import { useEffect, useState } from "react";
import { Circle } from "lucide-react";

export const Appbar = () => {
  // const session = useSession();
  // const user = session.data?.user;
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status !== "loading") {
      setInitialLoading(false);
    }
  }, [status, session]);

  return (
    <nav className="sticky mx-auto wrapper top-0 z-50 flex items-center gap-2 w-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", type: "spring", damping: 10 }}
        className="flex w-full justify-between mx-auto bg-secondary/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-primary/10 p-4 rounded-b-2xl lg:px-24"
      >
        <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-foreground block custom-text-color animate-pulse backdrop-blur-lg">
            Imaginate AI
          </span>
        </Link>
        <div className="flex items-center gap-8">
          {initialLoading && status === "loading" ? (
            <Circle className="animate-spin" />
          ) : !session ? (
            <Button size={"lg"} onClick={async () => { await signIn('google'); }}>Login</Button>
          ) : (
            <UserAccountDropDown />
          )}
        </div>
      </motion.div>
    </nav>
  );
};