import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"; 
import { User } from "lucide-react";

export default function HomePage(){
    return (
        <div className="p-8 border-4 border-green-500 rounded-xl">
            <h1 className="text-2xl font-bold mb-4">Cek Koneksi: Clerk ✅</h1>

            <UserButton afterSignOutUrl="/"/>
            
            {/* Jika User SUDAH Login */}
            <SignedIn>
                <p className="mb-2">Halo! Kamu sudah login. Ini tombol profilmu:</p>
            </SignedIn>

            {/* Jika User BELUM Login */}
            <SignedOut>
                <p className="mb-2">Kamu belum login. Klik tombol di bawah:</p>
                <div className="bg-blue-500 text-white px-4 py-2 rounded w-fit">
                    <SignInButton />
                </div>
            </SignedOut>
        </div>
    );
}