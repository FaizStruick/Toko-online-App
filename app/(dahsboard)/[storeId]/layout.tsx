import Navbar from "@/components/navbar";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const revalidate = 0;

export const metadata = {
    title: "Admin Toko"
}

export default async function DashboardLayout ({
    children,
    params,
}: {
    children: React.ReactNode,
    params: Promise<{storeId: string}>
}) {
    const { userId } = await auth();

    const resolvedParams = await params;

    if(!userId){
        redirect("/sign-in")
    }
    const store = await db.store.findFirst({
        where: {
            id: resolvedParams.storeId,
            userId
        }
    })

    if(!store){
        redirect('/')
    }
     return (
        <>
        <Navbar />
        {children}
        </>
     )
}