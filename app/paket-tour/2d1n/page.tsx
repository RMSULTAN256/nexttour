"use client";
import { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, Users, Minus, Plus, Star } from "lucide-react";
import tourPackages from "../../../data/paket.json";

// 1. Definisikan Interface agar TypeScript tidak protes
interface ActivityItem {
  name: string;
  keyword?: string;
  image?: string;
}

interface ItineraryDay {
  day: string;
  title?: string;
  activities: (ActivityItem | string)[];
}

export default function DetailPaketTour() {
  const [pax, setPax] = useState(1);

  // Ambil data (Nantinya p.id ini bisa dinamis dari URL params)
  const tourData = tourPackages.find((p: any) => p.id === 1) || tourPackages[0];

  if (!tourData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-500">Paket Tour Tidak Ditemukan</h1>
      </div>
    );
  }

  // 2. FUNGSI HELPER: Harga Anti-Error
  const getNumericPrice = (priceVal: string | number) => {
    if (typeof priceVal === 'number') return priceVal;
    if (!priceVal) return 0;
    const extracted = String(priceVal).replace(/\D/g, '');
    return extracted ? parseInt(extracted, 10) : 0;
  };
  
  const numericPrice = getNumericPrice(tourData.price);
  const totalPrice = pax * numericPrice;

  // 3. FUNGSI HELPER: Gambar Dinamis
  const getImageUrl = (source: string, width: number, height: number, isKeyword = false) => {
    if (!source) return `https://placehold.co/${width}x${height}/orange/white?text=No+Image`;
    if (source.startsWith("http") || source.startsWith("/")) return source;
    if (isKeyword) return `https://loremflickr.com/${width}/${height}/${encodeURIComponent(source)}/all`;
    return `https://images.unsplash.com/photo-${source}?q=80&w=${width}&auto=format&fit=crop`;
  };

  // 4. LOGIKA TOMBOL WHATSAPP
  const waNumber = "6281234567890"; // Jangan lupa ganti dengan nomor adminmu!
  const waMessage = encodeURIComponent(`Halo, saya ingin memesan paket tour:\n\n*${tourData.name}*\nJumlah Peserta: ${pax} Orang\nTotal Estimasi: RM ${totalPrice}\n\nMohon informasi ketersediaannya.`);
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[50vh] flex flex-col justify-end pb-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url('${getImageUrl(tourData.image || "1548013146-72479768bada", 1920, 1080)}')` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
        
        <div className="relative z-20 max-w-6xl mx-auto px-4 w-full">
          <div className="flex gap-2 mb-3">
            <span className="bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">{tourData.duration || "2 Hari 1 Malam"}</span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold">{tourData.location || "Batam, Kepri"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {tourData.name}
          </h1>
          <p className="text-gray-300 text-lg flex items-center gap-2">
            <MapPin size={18} className="text-orange-400" /> Jelajahi destinasi terbaik di {tourData.location || "Batam"}.
          </p>
        </div>
      </section>

      {/* KONTEN UTAMA */}
      <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-30 flex flex-col lg:flex-row gap-8">
        
        {/* KOLOM KIRI */}
        <div className="flex-1 space-y-8">
          
          {/* BOX TENTANG PAKET */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tentang Paket</h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base text-justify">
              {tourData.description}
            </p>

            {/* Render Highlights Dinamis */}
            {tourData.highlights && tourData.highlights.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {tourData.highlights.map((dest: string, index: number) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center gap-1.5 bg-[#f4fbf9] text-teal-800 border border-teal-100/50 px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-50 transition-colors cursor-default shadow-sm"
                  >
                    <Star size={16} className="text-yellow-400" fill="currentColor" />
                    {dest}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* BOX ITINERARY */}
          {tourData.itinerary && tourData.itinerary.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Clock className="text-orange-500" /> Rencana Perjalanan (Itinerary)
              </h2>
              
              <div className="relative border-l-2 border-orange-200 ml-3 md:ml-4 space-y-12">
                {tourData.itinerary.map((dayData: ItineraryDay, dayIndex: number) => (
                  <div key={dayIndex} className="relative pl-6 md:pl-8">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-orange-500 border-4 border-white shadow-sm" />
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{dayData.day}</h3>
                    <p className="text-sm text-gray-500 mb-6">{dayData.title || "Aktivitas Harian"}</p>
                    
                    <div className="flex flex-col">
                      {dayData.activities?.map((rawItem, index) => {
                        // Type-casting & Deteksi Otomatis untuk TypeScript
                        const isString = typeof rawItem === 'string';
                        const item = isString ? { name: rawItem } as ActivityItem : rawItem as ActivityItem;
                        const keyword = isString ? rawItem : (item.keyword || item.name);
                        const imgSrc = item.image 
                          ? getImageUrl(item.image, 400, 300) 
                          : getImageUrl(keyword, 400, 300, true);

                        return (
                          <div key={index} className="flex gap-4 group relative cursor-pointer">
                            <div className="flex flex-col items-center">
                              <span className="flex items-center justify-center min-w-[28px] h-[28px] rounded-full bg-orange-50 text-orange-600 text-xs font-bold border border-orange-200 z-10 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                {index + 1}
                              </span>
                              {index !== dayData.activities.length - 1 && (
                                <div className="w-[2px] h-full bg-gray-100 my-1 min-h-[16px]" />
                              )}
                            </div>

                            <span className="text-gray-700 font-medium text-sm md:text-base pt-1 pb-4 group-hover:text-orange-600 transition-colors">
                              {item.name}
                            </span>

                            {/* POPUP GAMBAR DINAMIS */}
                            <div className="absolute left-12 bottom-full mb-1 z-50 w-48 h-32 md:w-56 md:h-36 rounded-xl overflow-hidden shadow-2xl border-4 border-white pointer-events-none invisible opacity-0 translate-y-4 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                              <div className="absolute inset-0 bg-black/10 z-10" />
                              <Image 
                                src={imgSrc} 
                                alt={item.name} 
                                width={400} 
                                height={300} 
                                className="w-full h-full object-cover"
                                unoptimized
                              />
                              <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent z-20">
                                <p className="text-white text-xs font-semibold truncate">
                                  {item.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* KOLOM KANAN: Kalkulator Harga & Booking */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100 lg:sticky lg:top-24" suppressHydrationWarning>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Pesan Paket Tour</h3>
            <p className="text-gray-500 text-sm mb-6">Hitung estimasi biaya perjalanan Anda.</p>

            <div className="bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users size={20} className="text-orange-500" />
                <span className="font-semibold text-gray-700">Jumlah Peserta</span>
              </div>
              <div className="flex items-center gap-4 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm">
                <button 
                  onClick={() => setPax(Math.max(1, pax - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold text-lg w-4 text-center text-gray-800">{pax}</span>
                <button 
                  onClick={() => setPax(pax + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-end mb-6 pb-6 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Total Harga</span>
              <div className="text-right">
                <div className="text-3xl font-black text-orange-600">RM {totalPrice}</div>
                <div className="text-xs text-gray-400 mt-1">Estimasi RM {numericPrice} / pax</div>
              </div>
            </div>

            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#1DA851] hover:shadow-[#25D366]/30 transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              Tanya via WhatsApp
            </a>
            <p className="text-center text-xs text-gray-400 mt-4">
              Tanpa biaya tersembunyi.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
}