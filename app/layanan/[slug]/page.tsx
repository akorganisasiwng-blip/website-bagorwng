import { client } from "@/lib/sanity";
import {
  ArrowLeft,
  UserRound,
  Building2,
  FileCheck2,
  FileText,
  Landmark,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, any> = {
  UserRound,
  Building2,
  FileCheck2,
  FileText,
  Landmark,
  Smartphone,
};

export default async function DetailLayanan({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const layanan = await client.fetch(
    `*[_type == "layanan" && slug.current == $slug][0]`,
    { slug },
  );

  if (!layanan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-600">
          Layanan tidak ditemukan 😔
        </h1>
      </div>
    );
  }

  const Icon = iconMap[layanan.icon] || FileText;

  return (
    <div className="min-h-screen bg-white pb-20 pt-28">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-[#C41E3A] font-semibold mb-8 hover:underline"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Kembali ke Beranda
        </Link>

        <div className="flex items-center gap-6 mb-8 pb-8 border-b">
          <div className="w-20 h-20 bg-red-50 text-[#C41E3A] rounded-2xl flex items-center justify-center shadow-sm">
            <Icon size={40} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              {layanan.judul}
            </h1>
            <p className="text-lg text-gray-500 mt-2">{layanan.deskripsi}</p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {layanan.isiLengkap ||
            "Detail persyaratan dan alur layanan belum ditambahkan."}
        </div>
      </div>
    </div>
  );
}
