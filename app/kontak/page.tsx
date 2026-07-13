"use client";
import { useState } from "react";
import { MapPin, Phone, Clock, MessageCircle, Share2 } from "lucide-react";

export default function ContactPage() {
  // State untuk form
  const [formData, setFormData] = useState({
    name: "",
    service: "Paket Tour Batam & Bintan", // Default pilihan
    message: "",
  });

  // Nomor WA Tujuan (Ganti dengan nomormu)
  const waNumber = "6282283225920";

  // Fungsi untuk mengirim pesan ke WA
  const handleSendToWA = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Admin, perkenalkan saya *${formData.name}*.\n\nSaya tertarik atau ingin bertanya seputar layanan *${formData.service}*.\n\nPesan: ${formData.message}`;
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    window.open(waLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* HERO SECTION KOTAK ORANYE */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-400 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
          Hubungi Kami
        </h1>
        <p className="text-orange-50 text-lg max-w-2xl mx-auto font-medium">
          Punya pertanyaan tentang paket tour atau rental mobil? Jangan ragu untuk menghubungi tim kami. Kami siap mewujudkan liburan impian Anda!
        </p>
      </section>

      {/* KONTEN UTAMA (GRID 2 KOLOM) */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* KOLOM KIRI: INFO KONTAK */}
          <div className="flex flex-col gap-6">
            
            {/* Kartu Alamat */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex items-start gap-5 hover:border-orange-200 transition-colors">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin size={28} className="text-orange-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Alamat Kantor</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Jl. Engku Putri, Batam Centre, <br />
                  Kota Batam, Kepulauan Riau 29461 <br />
                  Indonesia
                </p>
              </div>
            </div>

            {/* Kartu Kontak */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex items-start gap-5 hover:border-orange-200 transition-colors">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                <Phone size={28} className="text-orange-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Kontak Langsung</h3>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-semibold">WhatsApp:</span> +62 822-8322-5920
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">Telepon:</span> +62 822-8322-5920
                </p>
              </div>
            </div>

            {/* Kartu Jam Operasional */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex items-start gap-5 hover:border-orange-200 transition-colors">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                <Clock size={28} className="text-orange-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Jam Operasional</h3>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-semibold text-gray-700">Senin - Jumat:</span> 08:00 - 17:00 WIB
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-semibold text-gray-700">Sabtu:</span> 08:00 - 14:00 WIB
                </p>
                <p className="text-red-500 text-sm font-semibold mt-2">
                  Minggu & Hari Libur Nasional Tutup
                </p>
              </div>
            </div>

            {/* --- KARTU BARU: MEDIA SOSIAL --- */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex items-start gap-5 hover:border-orange-200 transition-colors">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                <Share2 size={28} className="text-orange-500" />
              </div>
              <div className="w-full">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Media Sosial</h3>
                <div className="flex gap-4">
                  
                  {/* Facebook (SVG Murni) */}
                  <a 
                    href="https://facebook.com/keloearga.zrz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>

                  {/* TikTok (SVG Murni) */}
                  <a 
                    href="https://tiktok.com/@keloearga.zrz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
                    aria-label="TikTok"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                    </svg>
                  </a>
                </div>
                <p className="text-xs text-gray-400 mt-3">Ikuti kami untuk info promo & update perjalanan terbaru!</p>
              </div>
            </div>

          </div>

          {/* KOLOM KANAN: FORM WA */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Kirim Pesan</h2>
            <p className="text-gray-500 text-sm mb-6">Isi form di bawah ini dan lanjutkan percakapan via WhatsApp kami yang cepat tanggap.</p>
            
            <form onSubmit={handleSendToWA} className="space-y-5">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Anda</label>
                <input 
                  type="text" 
                  required
                  placeholder="Misal: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50"
                />
              </div>

              {/* Pilihan Layanan */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Topik / Layanan</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50"
                >
                  <option value="Paket Tour Batam & Bintan">Paket Tour Batam & Bintan</option>
                  <option value="Rental Mobil">Rental Mobil</option>
                  <option value="Group Tour / Corporate">Group Tour / Corporate</option>
                  <option value="Pertanyaan Lainnya">Pertanyaan Lainnya</option>
                </select>
              </div>

              {/* Isi Pesan */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Pesan Anda</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Ceritakan rencana liburan Anda, tanggal keberangkatan, atau pertanyaan lainnya..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 resize-none"
                ></textarea>
              </div>

              {/* Tombol Submit */}
              <button 
                type="submit" 
                className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-2 mt-2"
              >
                <MessageCircle size={20} />
                Kirim via WhatsApp
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* SECTION PETA GOOGLE (FULL WIDTH BOTTOM) */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100">
          <div className="flex items-center gap-2 mb-4 px-2">
            <MapPin className="text-orange-500" />
            <h2 className="text-xl font-bold text-gray-800">Temukan Kami di Peta</h2>
          </div>
          
          <div className="w-full h-[400px] rounded-2xl overflow-hidden border-2 border-orange-100 bg-gray-100">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d498.64340560778766!2d103.98817571501922!3d1.0508793138738537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1783860349621!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
}