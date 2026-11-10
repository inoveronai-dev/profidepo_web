import Link from "next/link";
import { Card, PageHeader } from "@/components/admin/ui";
import { getPricing } from "@/lib/cennik";

export default function AdminDashboardPage() {
  const { categories } = getPricing();
  const itemCount = categories.reduce((sum, cat) => sum + cat.rows.length, 0);

  return (
    <div>
      <PageHeader
        title="Prehľad"
        description="Spravujte cenník webu ProfiDepo. Uloženie vytvorí commit na GitHub a Vercel web aktualizuje (zvyčajne do 1–2 minút)."
      />
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-xs font-semibold tracking-[0.12em] text-[#42634C] uppercase">
            Kategórie
          </p>
          <p className="mt-2 text-3xl font-semibold text-[#1E3A2C]">{categories.length}</p>
        </Card>
        <Card>
          <p className="text-xs font-semibold tracking-[0.12em] text-[#42634C] uppercase">
            Položky
          </p>
          <p className="mt-2 text-3xl font-semibold text-[#1E3A2C]">{itemCount}</p>
        </Card>
      </div>
      <Card>
        <p className="mb-4 text-sm text-[#2A2E2C]/65">Rýchle odkazy</p>
        <Link
          href="/admin/cennik"
          className="inline-flex rounded-lg border border-[#42634C]/25 px-4 py-2.5 text-sm font-medium text-[#1E3A2C] hover:bg-[#CEDBCB]/40"
        >
          Upraviť cenník
        </Link>
      </Card>
    </div>
  );
}
