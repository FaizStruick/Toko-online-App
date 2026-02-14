import { UserButton } from "@clerk/nextjs";
import MainNav from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const Navbar = async() => {

    const {userId} = await auth();

    if(!userId){
        redirect(`/sign-in`)
    }

    const stores = await db.store.findMany({
        where: {
            userId
        }
    })

    return (
        <div className="border-b bg-white shadow-sm">
            <div className="flex h-18 items-center px-8 py-4">
                <StoreSwitcher items={stores} />
                <MainNav className="mx-8"/>
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;

    