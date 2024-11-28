import Link from "next/link";
// import { ModeToggle } from "./ModeToggle";
import SigninBtn from "./SigninBtn";

export default function Header() {
    return (
        <header className="w-full h-[65px] flex items-center justify-between border-b px-6 bg-white dark:bg-black text-black dark:text-white sticky top-0 blury-header">
            <Link href={"/"} about="Imaginate" >Imaginate</Link>
            <div className="menu flex justify-end items-center gap-4">
                <SigninBtn />
                {/* <ModeToggle /> */}
            </div>
        </header>
    )
}