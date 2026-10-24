import { client, urlFor } from "@/lib/sanity";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";

export default async function DetailBerita({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const berita = await client.fetch(
    `*[_type == "berita" && slug.current == $slug][0]`,
    { slug },
  );

  if (!berita) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            Berita tidak ditemukan 😔
          </h1>
          <Link href="/berita" className="text-[#C41E3A] hover:underline">
            Kembali ke daftar berita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20 pt-24">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Tombol Kembali */}
        <Link
          href="/berita"
          className="inline-flex items-center text-[#C41E3A] font-semibold mb-8 hover:underline"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Kembali ke Daftar Berita
        </Link>

        {/* Kategori Badge */}
        <div className="mb-4">
          <span className="bg-red-100 text-[#C41E3A] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
            Berita Resmi
          </span>
        </div>

        {/* Judul Berita */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {berita.judul}
        </h1>

        {/* Meta Info (Tanggal & Penulis) */}
        <div className="flex flex-wrap items-center text-gray-500 font-medium mb-10 pb-8 border-b border-gray-200 gap-6">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[#C41E3A]" />
            {berita.tanggal}
          </div>
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2 text-[#C41E3A]" />
            Admin Pemerintah
          </div>
        </div>

        {/* Gambar Utama */}
        {berita.gambar && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={urlFor(berita.gambar).width(1200).quality(100).url()}
              alt={berita.judul}
              className="w-full h-auto max-h-[600px] object-cover"
            />
          </div>
        )}

        {/* Isi Berita */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">
          {berita.isi}
        </div>
      </div>
    </div>
  );
}
