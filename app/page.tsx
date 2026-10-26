"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  Globe2,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Smartphone,
  UserRound,
  Users,
} from "lucide-react";
import { client, urlFor } from "@/lib/sanity";

const iconMap: Record<string, any> = {
  UserRound,
  Building2,
  FileCheck2,
  FileText,
  Landmark,
  Smartphone,
  Globe2,
  ShieldCheck,
};

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function Page() {
  const [search, setSearch] = useState("");
  const [newsData, setNewsData] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [galleryData, setGalleryData] = useState<any[]>([]);
  const [pengumumanData, setPengumumanData] = useState<any[]>([]);
  const [mitraData, setMitraData] = useState<any[]>([]);

  const [visitors, setVisitors] = useState<string>("0");
  const [totalBerita, setTotalBerita] = useState(0);
  const [totalLayanan, setTotalLayanan] = useState(0);

  const [currentSlide, setCurrentSlide] = useState(0);

  // 1. FETCH DATA DARI SANITY
  useEffect(() => {
    client
      .fetch(`*[_type == "berita"] | order(tanggal desc) [0...3]`)
      .then((data) => setNewsData(data));
    client
      .fetch(`*[_type == "berita"]`)
      .then((data) => setTotalBerita(data.length));
    client.fetch(`*[_type == "layanan"]`).then((data) => {
      setServicesData(data);
      setTotalLayanan(data.length);
    });
    client.fetch(`*[_type == "pengaturanWeb"][0]`).then((data) => {
      if (data) setSettings(data);
    });
    client.fetch(`*[_type == "galeri"]`).then((data) => setGalleryData(data));
    client
      .fetch(`*[_type == "pengumuman"]`)
      .then((data) => setPengumumanData(data));
    client.fetch(`*[_type == "mitra"]`).then((data) => setMitraData(data));

    fetch(
      "https://abacus.jasoncameron.dev/hit/pemkab-bagor-app/website-visitors",
    )
      .then((res) => res.json())
      .then((data) => setVisitors(data.value.toLocaleString("id-ID")))
      .catch(() => setVisitors("15.234"));
  }, []);

  // 2. LOGIKA SLIDER OTOMATIS (Dipisah agar tidak mengganggu Fetch Data)
  useEffect(() => {
    const totalSlides = settings?.capaianKinerja?.length || 0;
    if (totalSlides === 0) return;

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [settings?.capaianKinerja]);

  const filteredServices = useMemo(
    () =>
      servicesData.filter((item) =>
        item.judul.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, servicesData],
  );

  return (
    <main>
      <section className="hero" id="beranda">
        <div className="hero-pattern" />
        <div className="container hero-content relative">
          <div className="breadcrumb">
            <span>Beranda</span>
            <ChevronRight />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between w-full mt-10 gap-10">
            {/* Kolom Kiri: Teks */}
            <div className="hero-copy lg:w-3/5 z-10">
              <div className="eyebrow light">
                <span className="eyebrow-line" />
                Selamat Datang di Portal Resmi
              </div>
              <h1 className="whitespace-pre-wrap">
                {settings?.heroJudul ||
                  "Melayani dengan Integritas, Membangun untuk Negeri."}
              </h1>
              <p>
                {settings?.heroDeskripsi ||
                  "Portal informasi dan layanan publik Pemerintah Kabupaten Banyuwangi yang mudah diakses, transparan, dan terpercaya."}
              </p>
              <div className="hero-actions">
                <a className="button button-light" href="#layanan">
                  Jelajahi Layanan <ArrowRight />
                </a>
                <a className="button button-ghost" href="#profil">
                  Tentang Kami
                </a>
              </div>
            </div>

            {/* Kolom Kanan: Foto Bupati & Slogan */}
            {settings?.fotoBupati && (
              <div className="lg:w-4/5 flex flex-col justify-center lg:justify-end z-10 relative mt-10 lg:mt-0">
                {/* Daftar Gambar Slogan */}
                {settings?.sloganList && settings.sloganList.length > 0 && (
                  <div className="flex flex-wrap justify-center lg:justify-end gap-4 mb-6 relative z-20">
                    {settings.sloganList.map((slogan: any, index: number) => (
                      <img
                        key={index}
                        src={urlFor(slogan).width(400).url()}
                        alt={`Slogan ${index + 1}`}
                        className="h-10 md:h-14 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform"
                      />
                    ))}
                  </div>
                )}

                {/* Foto Bupati */}
                <img
                  src={urlFor(settings.fotoBupati)
                    .width(1200)
                    .quality(100)
                    .url()}
                  alt="Foto Bupati"
                  className="w-64 md:w-80 lg:w-auto max-w-2xl object-contain drop-shadow-[0_20px_30px_rgba(139,0,0,0.8)] transition-transform duration-500 hover:scale-105 mx-auto lg:ml-auto"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SLIDER CAPAIAN KINERJA */}
      {settings?.capaianKinerja && settings.capaianKinerja.length > 0 && (
        <section className="bg-white py-12 md:py-16 relative">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
                Capaian Kinerja
              </h2>
              <p className="text-gray-500 font-medium">
                Bagian Organisasi Sekretariat Daerah
              </p>
              <div className="w-16 h-1 bg-[#C41E3A] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="relative w-full max-w-5xl mx-auto h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 group">
              {settings.capaianKinerja.map((img: any, index: number) => (
                <img
                  key={index}
                  src={urlFor(img).url()}
                  alt={`Capaian Kinerja ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-contain p-2 md:p-4 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                />
              ))}

              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {settings.capaianKinerja.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-[#C41E3A] w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Ke slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="quick-search">
        <div className="container search-inner">
          <div>
            <span className="search-label">Butuh layanan apa hari ini?</span>
            <p>Temukan informasi dan layanan publik dengan cepat.</p>
          </div>
          <div className="search-box">
            <Search />
            <input
              aria-label="Cari layanan"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari layanan publik..."
            />
            <kbd>⌘ K</kbd>
          </div>
        </div>
      </section>

      <section className="section services-section" id="layanan">
        <div className="container">
          <SectionHeading
            eyebrow="Layanan Publik"
            title="Akses layanan, semudah itu."
            description="Berbagai layanan publik untuk memenuhi kebutuhan Anda, tersedia dalam satu tempat."
          />
          <div className="service-grid">
            {filteredServices.map((item) => {
              const Icon = iconMap[item.icon] || FileText;
              return (
                <a
                  className="service-card"
                  href={
                    item.link ? item.link : `/layanan/${item.slug?.current}`
                  }
                  key={item._id}
                  target={item.link ? "_blank" : "_self"}
                >
                  <span className="service-icon">
                    <Icon />
                  </span>
                  <span>
                    <strong>{item.judul}</strong>
                    <small>{item.deskripsi}</small>
                    <b>
                      Pelajari lebih lanjut <ArrowRight />
                    </b>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section news-section" id="berita">
        <div className="container">
          <div className="section-row">
            <SectionHeading
              eyebrow="Kabar Bagian Organisasi Setda Kabupaten Wonogiri"
              title="Berita terbaru"
              description="Ikuti perkembangan informasi dan kegiatan Bagian Organisasi Setda Kabupaten Wonogiri."
            />
            <Link className="text-link" href="/berita">
              Lihat semua berita <ArrowRight />
            </Link>
          </div>
          <div className="news-grid">
            {newsData.length === 0 ? (
              <p className="text-gray-500">Memuat berita...</p>
            ) : (
              newsData.map((item) => (
                <article className="news-card" key={item._id}>
                  {item.gambar && (
                    <img src={urlFor(item.gambar).url()} alt={item.judul} />
                  )}
                  <div className="news-body">
                    <div className="news-meta">
                      <span>Berita</span>
                      <time>
                        <CalendarDays />
                        {item.tanggal}
                      </time>
                    </div>
                    <h3>{item.judul}</h3>
                    <Link href={`/berita/${item.slug.current}`}>
                      Baca selengkapnya <ArrowRight />
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-grid">
          <div>
            <span className="stat-number">{settings?.statHariIni || "0"}</span>
            <span className="stat-label">Pengunjung Hari Ini</span>
          </div>
          <div>
            <span className="stat-number">{visitors}</span>
            <span className="stat-label">Total Kunjungan</span>
          </div>
          <div>
            <span className="stat-number">{totalBerita}</span>
            <span className="stat-label">Total Berita</span>
          </div>
          <div>
            <span className="stat-number">{totalLayanan}</span>
            <span className="stat-label">Layanan Publik</span>
          </div>
        </div>
      </section>

      <section className="section vision-section" id="profil">
        <div className="container vision-grid">
          <div className="vision-visual">
            <div className="vision-image">
              <img
                src={
                  settings?.profilGambar
                    ? urlFor(settings.profilGambar).url()
                    : "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1100&q=85"
                }
                alt="Pemandangan alam"
              />
            </div>
            <div className="experience-card">
              <strong>{settings?.tahunMelayani || "247"}</strong>
              <span>
                Tahun melayani
                <br />
                masyarakat
              </span>
            </div>
          </div>
          <div className="vision-copy">
            <SectionHeading
              eyebrow="Tentang Kami"
              title={
                settings?.profilJudul || "Wonogiri yang lebih baik, bersama."
              }
              description={
                settings?.profilDeskripsi ||
                "Kami hadir untuk memastikan setiap masyarakat mendapatkan pelayanan yang adil, cepat, dan berkualitas."
              }
            />
            <div className="vision-points">
              <div>
                <span>
                  <ShieldCheck />
                </span>
                <p>
                  <strong>Visi</strong>
                  {settings?.visi ||
                    "Mewujudkan Wonogiri yang semakin maju, sejahtera, dan berdaya saing."}
                </p>
              </div>
              <div>
                <span>
                  <Users />
                </span>
                <p>
                  <strong>Misi</strong>
                  {settings?.misi ||
                    "Membangun tata kelola pemerintahan yang bersih, efektif, dan melayani."}
                </p>
              </div>
            </div>
            <a className="button button-red" href="#kontak">
              Kenali lebih dekat <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      <section className="section notice-section">
        <div className="container notice-grid">
          <div className="notice-intro">
            <span className="notice-icon">
              <Bell />
            </span>
            <div>
              <span className="eyebrow">Informasi Penting</span>
              <h2>Pengumuman</h2>
              <p>Informasi terkini untuk Anda.</p>
            </div>
          </div>
          <div className="notice-list">
            {pengumumanData.length === 0 ? (
              <p className="text-gray-500 text-sm py-4">
                Belum ada pengumuman terbaru.
              </p>
            ) : (
              pengumumanData.map((item) => (
                <a
                  href={item.link || "#kontak"}
                  key={item._id}
                  target={item.link ? "_blank" : "_self"}
                >
                  <span className="badge">{item.kategori || "INFO"}</span>
                  <strong>{item.judul}</strong>
                  <ChevronRight />
                </a>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="section gallery-section" id="galeri">
        <div className="container">
          <div className="section-row">
            <SectionHeading eyebrow="Dokumentasi" title="Galeri kegiatan" />
            <a className="text-link" href="#galeri">
              Lihat semua galeri <ArrowRight />
            </a>
          </div>
          <div className="gallery-grid">
            {galleryData.map((item, index) => {
              const gridClass = `gallery-${(index % 5) + 1}`;
              return (
                <img
                  key={item._id}
                  className={`gallery-image ${gridClass}`}
                  src={urlFor(item.gambar).url()}
                  alt={item.judul || `Kegiatan ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="partners">
        <div className="container">
          <p>Mitra & tautan terkait</p>
          <div className="partner-list">
            {mitraData.length === 0 ? (
              <span className="text-gray-400 text-sm italic">
                Belum ada mitra.
              </span>
            ) : (
              mitraData.map((item) => {
                const Icon = iconMap[item.icon] || Globe2;
                return (
                  <a
                    key={item._id}
                    href={item.link || "#"}
                    target={item.link ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="hover:text-[#C41E3A] transition-colors flex items-center gap-2"
                  >
                    <Icon /> {item.nama}
                  </a>
                );
              })
            )}
          </div>
        </div>
      </section>

      <a
        className="whatsapp"
        href="#kontak"
        aria-label="Hubungi melalui WhatsApp"
      >
        <Phone />
      </a>
      <a className="back-top" href="#beranda" aria-label="Kembali ke atas">
        ↑
      </a>
    </main>
  );
}
