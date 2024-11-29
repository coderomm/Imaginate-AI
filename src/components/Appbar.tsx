'use client'

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import UserAccountDropDown from "./UserAccountDropDown";
// import UserAccountDropDown from "./UserAccountDropDown";

export const Appbar = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <nav className="sticky mx-auto wrapper top-0 z-50 flex items-center gap-2 w-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", type: "spring", damping: 10 }}
        className="flex w-full justify-between mx-auto bg-secondary/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-primary/10 p-4 rounded-b-2xl lg:px-24"
      >
        <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
          {/* <Image
            src={"https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"}
            alt="Logo"
            width={300}
            height={200}
            className="rounded-full size-10"
          /> */}
          <span className="text-lg md:text-2xl font-bold tracking-tight text-foreground block">
            Imaginate AI
          </span>
        </Link>
        <div className="flex items-center gap-8">
          {!user ? (
            <Button
              size={"lg"}
              onClick={async () => {
                await signIn('google');
              }}
            >
              Login
            </Button>
          ) : (
            ""
          )}

          <UserAccountDropDown />
        </div>
      </motion.div>
    </nav>
  );
};