import { client, urlFor } from "@/lib/sanity";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function BeritaPage() {
  const berita = await client.fetch(
    `*[_type == "berita"] | order(tanggal desc)`,
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Tombol Kembali */}
        <Link
          href="/"
          className="inline-flex items-center text-[#C41E3A] font-semibold mb-8 hover:underline"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Kembali ke Beranda
        </Link>

        {/* Header Halaman */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#C41E3A] mb-4">
            Berita & Pengumuman
          </h1>
          <div className="w-24 h-1.5 bg-[#C41E3A] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Informasi terbaru seputar kegiatan dan pengumuman resmi pemerintah.
          </p>
        </div>

        {/* Grid Berita */}
        {berita.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">
              Belum ada berita yang dipublikasikan.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {berita.map((item: any) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col"
              >
                {/* Gambar */}
                {item.gambar && (
                  <div className="relative h-56 overflow-hidden bg-gray-200">
                    <img
                      src={urlFor(item.gambar).url()}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#C41E3A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      Berita
                    </div>
                  </div>
                )}

                {/* Konten */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-gray-500 mb-3 font-medium">
                    <Calendar className="w-4 h-4 mr-2 text-[#C41E3A]" />
                    {item.tanggal}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#C41E3A] transition-colors">
                    {item.judul}
                  </h2>
                  <p className="text-gray-600 line-clamp-3 mb-6 flex-grow text-sm">
                    {item.isi}
                  </p>

                  {/* Tombol Baca */}
                  <Link
                    href={`/berita/${item.slug.current}`}
                    className="inline-flex items-center text-[#C41E3A] font-bold hover:text-[#8B0000] transition-colors mt-auto"
                  >
                    Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
