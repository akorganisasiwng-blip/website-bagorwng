"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock3, Globe2, Building2 } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    client.fetch(`*[_type == "pengaturanWeb"][0]`).then((data) => {
      if (data) setSettings(data);
    });
  }, []);

  return (
    <footer id="kontak">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="brand brand-footer" href="/">
            {settings?.logoUtama && (
              <span className="flex items-center justify-center w-12 h-12 shrink-0">
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
          <p>
            {settings?.footerDeskripsi ||
              "Portal resmi Pemerintah Kabupaten untuk pelayanan publik yang transparan dan terpercaya."}
          </p>
          <div className="socials">
            <a href="#kontak" aria-label="Media sosial">
              <Globe2 />
            </a>
            <a href="#kontak" aria-label="Website">
              <Building2 />
            </a>
            <a href="#kontak" aria-label="Email">
              <Mail />
            </a>
          </div>
        </div>
        <div>
          <h3>Menu Utama</h3>
          <Link href="/#profil">Profil Daerah</Link>
          <Link href="/#layanan">Layanan Publik</Link>
          <Link href="/berita">Berita Terkini</Link>
          <Link href="/#galeri">Galeri Kegiatan</Link>
        </div>
        <div>
          <h3>Hubungi Kami</h3>
          <p className="contact-line">
            <MapPin /> {settings?.alamat || "Alamat Kantor"}
          </p>
          <p className="contact-line">
            <Phone /> {settings?.telepon || "Nomor Telepon"}
          </p>
          <p className="contact-line">
            <Mail /> {settings?.email || "Email"}
          </p>
        </div>
        <div>
          <h3>Jam Pelayanan</h3>
          <p className="contact-line">
            <Clock3 /> Senin - Kamis
            <br />
            <span>{settings?.jamSeninKamis || "08.00 - 16.00 WIB"}</span>
          </p>
          <p className="contact-line">
            <Clock3 /> Jumat
            <br />
            <span>{settings?.jamJumat || "08.00 - 15.00 WIB"}</span>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>
            {settings?.copyrightTeks || "© 2026 Pemerintah Kabupaten"}
          </span>
          <span>Hak Cipta Dilindungi</span>
        </div>
      </div>
    </footer>
  );
}
