"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import UserImage from "./UserImage";
import { motion, AnimatePresence } from "framer-motion";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const dropDownData = [
  {
    name: "Profile",
    icon: <UserRound size={15} />,
    href: "/profile",
  },
];

export default function UserAccountDropDown() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || status === "loading") return null;
  if (!user) return null;

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="bg-secondary/15 hover:bg-secondary/25 flex items-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md h-auto w-auto rounded-full p-0.5"
        >
          <div className="border-primary/20 h-8 w-8 overflow-hidden rounded-full border-2">
            {user.image ? (
              <UserImage image={user.image} />
            ) : (
              <div className="from-primary-400 to-primary-600 flex h-full w-full items-center justify-center bg-gradient-to-br text-white">
                <UserRound size={16} />
              </div>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent
            forceMount
            className="bg-secondary/15 border-primary/10 rounded-2xl border p-2 shadow-lg shadow-neutral-600/5 backdrop-blur-lg"
            align="end"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DropdownMenuLabel className="flex items-center space-x-3 p-3 border-red-600">
                <div className="border-primary/20 h-12 w-12 overflow-hidden rounded-full border-2">
                  {user.image ? (
                    <UserImage image={user.image} />
                  ) : (
                    <div className="from-primary-400 to-primary-600 flex h-full w-full items-center justify-center bg-gradient-to-br text-white">
                      <UserRound size={24} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-foreground font-semibold">{user.name}</span>
                  <span className="text-muted-foreground max-w-[150px] truncate text-xs">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-primary/10 my-2" />
              {dropDownData.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className="focus:bg-secondary/25 hover:bg-secondary/25 flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-all duration-200 hover:shadow-md"
                  onClick={() => router.push(item.href)}
                >
                  <span className="text-foreground">{item.icon}</span>
                  <span className="text-foreground">{item.name}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-primary/10 my-2" />
              <DropdownMenuItem
                className="focus:bg-secondary/25 hover:bg-destructive/15 flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-all duration-200 hover:shadow-md"
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
              >
                <LogOut size={15} className="text-destructive" />
                <span className="text-destructive">Logout</span>
              </DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}