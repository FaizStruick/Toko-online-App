import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Store, CreditCard, Package, BarChart3 } from "lucide-react";
import db from "@/lib/db";

interface DashboardPageProps {
  params: Promise<{ storeId: string }>;
}

const DashboardPage = async (props: DashboardPageProps) => {
  const params = await props.params;

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  const banners = await db.banner.findMany({
      where: {
        storeId: params.storeId
      }
  })

  const products = await db.product.findMany({
    where: {
        storeId: params.storeId
    }
  })

  return (

    <div className="flex-col bg-slate-50/50 min-h-screen">
      <div className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
        {/* Header dengan Icon */}
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-x-4">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                {store?.name || "Dashboard"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Selamat datang kembali di panel manajemen tokomu.
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Grid Kartu Statistik */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden group hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-600">Total Pendapatan</CardTitle>
              <CreditCard className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp 0</div>
              <p className="text-xs text-muted-foreground mt-1">Siklus 30 hari terakhir</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden group hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-600">Produk Terdaftar</CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Stok aman tersedia</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden group hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-600">Performa Toko</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Stable</div>
              <p className="text-xs text-emerald-500 font-medium mt-1">+2.4% peningkatan</p>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder untuk Chart/Grafik */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
          <CardHeader>
            <CardTitle className="text-slate-800">Ikhtisar Penjualan</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed border-slate-100 m-6 rounded-xl text-slate-400">
            Grafik penjualan akan muncul di sini setelah ada transaksi.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;