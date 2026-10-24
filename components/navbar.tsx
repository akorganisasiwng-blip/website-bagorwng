"use client";

import { useState, useEffect } from "react";
import { Landmark, ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    client.fetch(`*[_type == "pengaturanWeb"][0]`).then((data) => {
      if (data) setSettings(data);
    });
  }, []);

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>
            {settings?.topBarTeks || "Portal Resmi Pemerintah Kabupaten"}
          </span>
          <div>
            <span>Senin - Jumat, 08.00 - 16.00 WIB</span>
            <span className="topbar-link">Hubungi Kami</span>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand">
            {settings?.logoUtama && (
              <span className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 shrink-0">
                <img
                  src={urlFor(settings.logoUtama).url()}
                  alt="Logo Instansi"
                  className="w-full h-full object-contain"
                />
              </span>
            )}
            <span>
              <strong>
                {settings?.namaInstansi || "PEMERINTAH KABUPATEN"}
              </strong>
              <b>{settings?.namaDaerah || "WONOGIRI"}</b>
            </span>
          </Link>
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
          <nav className={mobileOpen ? "main-nav open" : "main-nav"}>
            <Link href="/">Beranda</Link>
            <Link href="/#profil">Profil</Link>
            <Link href="/#layanan">
              Layanan <ChevronDown />
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[#C41E3A] transition-colors py-2">
                Unduhan <ChevronDown className="w-4 h-4" />
              </button>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-100 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                <Link
                  href="/unduhan"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-[#C41E3A] border-b border-gray-50"
                >
                  Semua Dokumen
                </Link>
                <Link
                  href="/unduhan?kategori=SOP"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-[#C41E3A] border-b border-gray-50"
                >
                  SOP & Panduan
                </Link>
                <Link
                  href="/unduhan?kategori=Peraturan"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-[#C41E3A] border-b border-gray-50"
                >
                  Peraturan Daerah
                </Link>
                <Link
                  href="/unduhan?kategori=Formulir"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-[#C41E3A]"
                >
                  Formulir Pelayanan
                </Link>
              </div>
            </div>
            <Link href="/berita">Berita</Link>
            <Link href="/#galeri">Galeri</Link>
            <Link href="/#kontak">Kontak</Link>
            <Link className="nav-cta" href="/#layanan">
              Layanan Online <ArrowRight />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
