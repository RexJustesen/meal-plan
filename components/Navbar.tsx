import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { UtensilsCrossed } from "lucide-react";

const Navbar = () => {
    return <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
        <div className="container flex items-center justify-between">
            <Link href='/'><UtensilsCrossed /></Link>
            <Link className={buttonVariants()} href='/meal-plan'>Get Meal Plan</Link>
        </div>
        </div>;
}

export default Navbar;