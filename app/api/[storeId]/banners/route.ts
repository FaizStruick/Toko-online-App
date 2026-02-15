import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Tambahkan header CORS supaya Store bisa akses API ini
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Fungsi OPTIONS sangat penting untuk menangani "Preflight Request" dari browser
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
    req: Request,
    props: { params: Promise<{ storeId: string }> }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { label, imageUrl } = body;
        const params = await props.params;

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });
        if (!label) return new NextResponse("Label banner perlu diinput", { status: 400 });
        if (!imageUrl) return new NextResponse("Image URL perlu diinput", { status: 400 });
        if (!params.storeId) return new NextResponse("Store id dibutuhkan", { status: 400 });

        const storeByUserId = await db.store.findFirst({
            where: { id: params.storeId, userId }
        });

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        const banner = await db.banner.create({
            data: { label, imageUrl, storeId: params.storeId }
        });

        return NextResponse.json(banner, { headers: corsHeaders });
    } catch (error) {
        console.log("[BANNERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    props: { params: Promise<{ storeId: string }> }
) {
    try {
        const params = await props.params;

        if (!params.storeId) {
            return new NextResponse("Store id dibutuhkan", { status: 400 });
        }

        const banners = await db.banner.findMany({
            where: { storeId: params.storeId },
        });

        // Kembalikan data banners dengan header CORS
        return NextResponse.json(banners, { headers: corsHeaders });
    } catch (error) {
        console.log("[BANNERS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}