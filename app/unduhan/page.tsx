"use client";

import { useMemo, useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/sanity";

const categories = [
  "Semua Kategori",
  "SOP",
  "Peraturan",
  "Formulir",
  "Lainnya",
];

function categoryStyle(category: string) {
  const styles: Record<string, string> = {
    SOP: "bg-rose-50 text-[#a71935]",
    Peraturan: "bg-amber-50 text-amber-700",
    Formulir: "bg-blue-50 text-blue-700",
    Lainnya: "bg-slate-100 text-slate-600",
  };
  return styles[category] || styles["Lainnya"];
}

export default function Page() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua Kategori");
  const [page, setPage] = useState(1);

  // State untuk data dari Sanity
  const [dokumenData, setDokumenData] = useState<any[]>([]);

  useEffect(() => {
    // Mengambil data dokumen dari Sanity
    client.fetch(`*[_type == "dokumen"] | order(tanggal desc)`).then((data) => {
      setDokumenData(data);
    });
  }, []);

  // Logika Filter
  const filteredDocuments = useMemo(
    () =>
      dokumenData.filter((item) => {
        const matchesQuery = item.judul
          ?.toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory =
          category === "Semua Kategori" || item.kategori === category;
        return matchesQuery && matchesCategory;
      }),
    [category, query, dokumenData],
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-800 pt-24 pb-12">
      <main>
        <section className="mx-auto max-w-7xl px-5 pb-8 pt-6 sm:px-8 lg:px-10 lg:pt-10">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#C41E3A]">
              Layanan Informasi Publik
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-[44px] lg:leading-tight">
              Pusat Unduhan Dokumen
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-500">
              Akses dan unduh berbagai dokumen resmi Pemerintah Kabupaten dengan
              mudah.
            </p>
            <div className="mt-6 h-1 w-16 rounded-full bg-[#C41E3A]" />
          </div>
        </section>

        <section
          id="dokumen"
          className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">Cari dokumen</span>
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Cari nama dokumen..."
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#C41E3A] focus:bg-white focus:ring-2 focus:ring-[#C41E3A]/10"
                />
              </label>
              <label className="relative sm:w-56">
                <span className="sr-only">Filter kategori</span>
                <select
                  value={category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                    setPage(1);
                  }}
                  className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 pr-10 text-sm text-slate-700 outline-none focus:border-[#C41E3A] focus:bg-white"
                >
                  <option>{categories[0]}</option>
                  {categories.slice(1).map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
              </label>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4 font-semibold">No</th>
                    <th className="px-5 py-4 font-semibold">Nama Dokumen</th>
                    <th className="px-5 py-4 font-semibold">Kategori</th>
                    <th className="px-5 py-4 font-semibold">
                      Tanggal Diperbarui
                    </th>
                    <th className="px-5 py-4 font-semibold">Tipe File</th>
                    <th className="px-5 py-4 text-right font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.length ? (
                    filteredDocuments.map((item, index) => (
                      <tr
                        key={item._id}
                        className="border-t border-slate-100 text-sm odd:bg-white even:bg-slate-50/70"
                      >
                        <td className="px-5 py-4 text-slate-400">
                          {index + 1}
                        </td>
                        <td className="px-5 py-4 font-medium text-slate-800">
                          {item.judul}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${categoryStyle(item.kategori)}`}
                          >
                            {item.kategori}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-500">
                          {item.tanggal || "-"}
                        </td>
                        <td className="px-5 py-4 text-slate-500 uppercase">
                          {item.fileDokumen?.asset?.extension || "FILE"}
                        </td>
                        <td className="px-5 py-4 text-right">
                          {/* Tombol Unduh Asli */}
                          {item.fileDokumen?.asset?.url ? (
                            <a
                              href={item.fileDokumen.asset.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                size="sm"
                                className="bg-[#C41E3A] text-white hover:bg-[#8B0000]"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Unduh
                              </Button>
                            </a>
                          ) : (
                            <span className="text-xs text-red-500">
                              File kosong
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-16 text-center text-sm text-slate-500"
                      >
                        Dokumen tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination (Sederhana) */}
            <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-5 sm:flex-row">
              <p className="text-sm text-slate-500">
                Menampilkan{" "}
                <span className="font-semibold text-slate-700">
                  {filteredDocuments.length}
                </span>{" "}
                dokumen
              </p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Sebelumnya
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-[#C41E3A] text-white hover:bg-[#8B0000]"
                >
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Berikutnya <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
