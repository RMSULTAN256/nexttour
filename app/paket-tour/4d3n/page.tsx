"use client";
import { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, Users, Check, Minus, Plus, Star, Info, X } from "lucide-react";
import tourPackages from "../../../data/paket.json";

export default function DetailPaketTour() {
  type OptionKey = 'bintan' | 'lingga' | 'land_only';
  
  // 1. STATE & KONFIGURASI PILIHAN PAKET
  const [selectedOption, setSelectedOption] = useState<OptionKey>('bintan');
  const [pax, setPax] = useState(5); 

  // --- STATE UNTUK PETA DINAMIS ---
  const [selectedPlace, setSelectedPlace] = useState("");

  // Data Konfigurasi Super Detail
  const packageOptions = {
    bintan: {
      price: 950,
      minPax: 5,
      title: "Paket Batam - Bintan",
      shortSub: "Min. 5 Pax • Termasuk Pompong & Hotel",
      includes: [
        "Tiket Ferry Johor - Batam (PP) + Seaport Tax",
        "Tiket Kapal Roro/Ferry Batam - Bintan (PP)",
        "Tiket Kapal Pompong ke Pulau Penyengat (PP)",
        "Akomodasi Hotel 1 Malam di Bintan / Tg. Pinang",
        "Transportasi Darat (Mobil/Hiace/Bus Full AC)",
        "Makan Sesuai Jadwal (Sarapan, Siang, Malam)",
        "Seluruh Tiket Masuk Destinasi Wisata",
        "Tour Guide / Driver Berpengalaman",
        "Air Mineral Kemasan per Hari"
      ],
      excludes: []
    },
    lingga: {
      price: 1200,
      minPax: 5,
      title: "Paket Batam - Lingga",
      shortSub: "Min. 5 Pax • Termasuk Hotel Lingga",
      includes: [
        "Tiket Ferry Johor - Batam (PP) + Seaport Tax",
        "Tiket Kapal Ferry VIP Batam - Lingga (PP)",
        "Akomodasi Hotel 1 Malam di Lingga",
        "Transportasi Darat selama di Batam & Lingga",
        "Makan Sesuai Jadwal (Sarapan, Siang, Malam)",
        "Seluruh Tiket Masuk Destinasi Sejarah/Wisata",
        "Tour Guide Lokal Asli Daerah / Driver Ramah",
        "Air Mineral Kemasan per Hari"
      ],
      excludes: []
    },
    land_only: {
      price: 750,
      minPax: 15,
      title: "Group Land Tour",
      shortSub: "Min. 15 Pax • Rombongan Ekonomis",
      includes: [
        "Akomodasi Hotel (Menyesuaikan Rute Perjalanan)",
        "Transportasi Darat Eksklusif (Bus Pariwisata AC)",
        "Makan Sesuai Jadwal (Sarapan, Siang, Malam)",
        "Seluruh Tiket Masuk Destinasi Wisata",
        "Tour Guide Bersertifikat & Asisten Tour",
        "Air Mineral Kemasan per Hari",
        "Spanduk / Banner Tour Rombongan"
      ],
      excludes: [
        "TIDAK Termasuk Tiket Ferry dari Johor",
        "TIDAK Termasuk Tiket Pesawat (Flight)"
      ]
    }
  };

  // Logika Perhitungan Dinamis
  const currentPricePerPax = packageOptions[selectedOption].price;
  const currentMinPax = packageOptions[selectedOption].minPax;
  const totalPrice = pax * currentPricePerPax;
  
  // Validasi Pengaman Pax
  const isPaxValid = pax >= currentMinPax;

  // Handler Otomatis Menyesuaikan Jumlah Pax
  const handleOptionChange = (optionKey: OptionKey) => {
    setSelectedOption(optionKey);
    const targetMinPax = packageOptions[optionKey].minPax;
    if (pax < targetMinPax) {
      setPax(targetMinPax);
    }
  };

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

  // Mengambil Data Tour ID 4 (Kepulauan Riau)
  const tourData = tourPackages.find((p: { id: number }) => p.id === 4) || tourPackages[0];

  if (!tourData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-500">Paket Tour Tidak Ditemukan</h2>
      </div>
    );
  }

  // --- LOGIKA MENDAPATKAN LOKASI AWAL UNTUK PETA ---
  let firstPlaceName = "Kepulauan Riau";
  if (tourData?.itinerary?.[0]?.activities?.[0]) {
    const firstAct = tourData.itinerary[0].activities[0];
    firstPlaceName = typeof firstAct === 'string' ? firstAct : firstAct.name;
  }
  // Tempat yang aktif di peta saat ini
  const activePlace = selectedPlace || firstPlaceName;

  const getImageUrl = (source: string, width: number, height: number, isKeyword = false) => {
    if (!source) {
      return `https://placehold.co/${width}x${height}/orange/white?text=No+Image`;
    }
    if (source.startsWith("http") || source.startsWith("/")) return source;
    if (isKeyword) {
      return `https://source.unsplash.com/featured/?${encodeURIComponent(source)}&w=${width}&h=${height}`;
    }
    return `https://images.unsplash.com/photo-${source}?q=80&w=${width}&auto=format&fit=crop`;
  };

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
            <span className="bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              {tourData.duration || "4D3N"}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold">
              {tourData.location || "Kepulauan Riau"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {tourData.name}
          </h1>
          <p className="text-gray-300 text-lg flex items-center gap-2">
            <MapPin size={18} className="text-orange-400" /> Eksplorasi Batam, Bintan, atau Lingga.
          </p>
        </div>
      </section>

      {/* KONTEN UTAMA */}
      <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-30 flex flex-col lg:flex-row gap-8">
        
        {/* KOLOM KIRI: Detail & Itinerary */}
        <div className="flex-1 space-y-8">
          
          {/* BOX TENTANG PAKET */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tentang Paket</h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base text-justify whitespace-pre-line">
              {tourData.description}
            </p>
            
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

          {/* ---> BOX DETAIL PILIHAN PAKET (SUPER LENGKAP) <--- */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Info className="text-orange-500" /> Rincian Fasilitas Paket
            </h2>
            <p className="text-gray-500 text-sm mb-6">Pilih variasi paket yang paling sesuai dengan kebutuhan perjalanan Anda:</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {(Object.entries(packageOptions) as [OptionKey, typeof packageOptions[OptionKey]][]).map(([key, pkg]) => (
                <div 
                  key={key} 
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col h-full ${
                    selectedOption === key ? 'border-orange-500 bg-orange-50/40 shadow-md' : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <h3 className="font-bold text-gray-800 text-lg mb-1 leading-tight">{pkg.title}</h3>
                  <div className="text-orange-600 font-black mb-1 text-xl">
                    RM {pkg.price} <span className="text-xs text-gray-400 font-medium">/ pax</span>
                  </div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-5 pb-3 border-b border-gray-200">
                    Minimal {pkg.minPax} Peserta
                  </div>
                  
                  <div className="flex-1">
                    {/* List Include */}
                    <ul className="space-y-2.5 mb-4">
                      {pkg.includes.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs md:text-[13px] text-gray-700 leading-snug">
                          <Check size={16} className="text-green-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* List Exclude (Jika ada) */}
                    {pkg.excludes.length > 0 && (
                      <ul className="space-y-2.5 pt-3 border-t border-gray-200">
                        {pkg.excludes.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs md:text-[13px] text-red-600 font-medium leading-snug">
                            <X size={16} className="text-red-500 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ---> AKHIR BOX DETAIL <--- */}

          {/* BOX ITINERARY DENGAN MAPS INTEGRASI */}
          {tourData.itinerary && tourData.itinerary.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Clock className="text-orange-500" /> Rencana Perjalanan (Itinerary)
              </h2>
              
              <div className="flex flex-col md:flex-row gap-8">
                
                {/* Bagian Kiri: Timeline Jadwal */}
                <div className="w-full md:w-1/2 relative border-l-2 border-orange-200 ml-3 md:ml-4 space-y-12">
                  {tourData.itinerary.map((dayData: ItineraryDay, dayIndex: number) => (
                    <div key={dayIndex} className="relative pl-6 md:pl-8">
                      <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-orange-500 border-4 border-white shadow-sm" />
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{dayData.day}</h3>
                      <p className="text-sm text-gray-500 mb-6">{dayData.title || "Aktivitas Harian"}</p>
                      
                      <div className="flex flex-col">
                        {dayData.activities?.map((item: ActivityItem | string, index: number) => {
                          const isString = typeof item === 'string';
                          const objItem = item as ActivityItem; 

                          const placeName = isString ? item : objItem.name;
                          const keyword = isString ? item : (objItem.keyword || objItem.name);
                          const imageId = !isString && objItem.image ? objItem.image : null;

                          const imgSrc = imageId 
                          ? getImageUrl(imageId, 400, 300) 
                          : getImageUrl(keyword, 400, 300, true);

                          // Cek apakah item ini yang sedang aktif dipilih di Peta
                          const isActive = activePlace === placeName;

                          return (
                            <div 
                              key={index} 
                              onClick={() => setSelectedPlace(placeName)}
                              className={`flex gap-4 group relative cursor-pointer p-2 -ml-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-orange-50/50' : 'hover:bg-gray-50'}`}
                            >
                              <div className="flex flex-col items-center">
                                {/* Lingkaran Angka Berubah Oranye Terang Jika Aktif */}
                                <span className={`flex items-center justify-center min-w-[28px] h-[28px] rounded-full text-xs font-bold border z-10 transition-colors ${
                                  isActive 
                                    ? 'bg-orange-500 text-white border-orange-500 shadow-md' 
                                    : 'bg-white text-orange-600 border-orange-200 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500'
                                }`}>
                                  {index + 1}
                                </span>
                                {index !== dayData.activities.length - 1 && (
                                  <div className="w-[2px] h-full bg-gray-100 my-1 min-h-[16px]" />
                                )}
                              </div>

                              {/* Nama Tempat Berubah Oranye Tebal Jika Aktif */}
                              <span className={`text-sm md:text-base pt-1 pb-4 transition-colors ${
                                isActive 
                                  ? 'text-orange-600 font-bold' 
                                  : 'text-gray-700 font-medium group-hover:text-orange-600'
                              }`}>
                                {placeName}
                              </span>

                              {/* Efek Hover Gambar (Tooltip) */}
                              <div className="absolute left-12 bottom-full mb-1 z-50 w-48 h-32 md:w-56 md:h-36 rounded-xl overflow-hidden shadow-2xl border-4 border-white pointer-events-none invisible opacity-0 translate-y-4 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <div className="absolute inset-0 bg-black/10 z-10" />
                                <Image 
                                  src={imgSrc}
                                  alt={placeName}
                                  width={400}
                                  height={300}
                                  className="w-full h-full object-cover"
                                  unoptimized 
                                />
                                <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent z-20">
                                  <p className="text-white text-xs font-semibold truncate">{placeName}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bagian Kanan: Peta Google Interaktif (Sticky) */}
                <div className="w-full md:w-1/2">
                  <div className="sticky top-28 h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden border-4 border-orange-100 shadow-md relative bg-gray-50 transition-all">
                    {/* Maps Otomatis Mencari Titik Lokasi */}
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      className="absolute top-0 left-0 transition-opacity duration-500"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(activePlace + " " + (tourData.location || "Kepulauan Riau"))}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      allowFullScreen
                    ></iframe>
                    
                    {/* Label Penanda Tempat yang sedang aktif di pojok Maps */}
                    <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 pointer-events-none flex items-center gap-1.5">
                      <MapPin size={14} className="text-orange-500" />
                      <p className="text-xs font-bold text-gray-700">
                        {activePlace}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-400 mt-3 italic">
                    *Klik destinasi pada jadwal di samping untuk melihat lokasinya di peta.
                  </p>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* KOLOM KANAN: Kalkulator Harga yang Disederhanakan */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100 lg:sticky lg:top-24">
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">Pesan Paket Tour</h3>
            <p className="text-gray-500 text-sm mb-6">Pilih rute perjalanan dan hitung biaya Anda.</p>

            {/* SELEKSI 3 TIPE PAKET (Radio Bersih) */}
            <div className="mb-6 space-y-3">
              <h4 className="text-sm font-bold text-gray-700 mb-2">Pilihan Paket:</h4>
              
              {(Object.entries(packageOptions) as [OptionKey, typeof packageOptions[OptionKey]][]).map(([key, pkg]) => (
                <div 
                  key={key}
                  onClick={() => handleOptionChange(key)}
                  className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all duration-200 ${
                    selectedOption === key ? 'border-orange-500 bg-orange-50/50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${selectedOption === key ? 'border-orange-600' : 'border-gray-300'}`}>
                    {selectedOption === key && <div className="w-2.5 h-2.5 rounded-full bg-orange-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800 text-sm">{pkg.title}</span>
                      <span className="text-sm font-black text-orange-600">RM {pkg.price}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">{pkg.shortSub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* STEPPER JUMLAH PESERTA */}
            <div className="bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users size={20} className="text-orange-500" />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-700 text-sm">Jumlah Peserta</span>
                  <span className="text-[10px] text-gray-400 font-bold">Minimal {currentMinPax} Orang</span>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm">
                <button 
                  onClick={() => setPax(Math.max(currentMinPax, pax - 1))}
                  disabled={pax <= currentMinPax}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                    pax <= currentMinPax 
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                      : 'bg-gray-50 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                  }`}
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold text-lg w-5 text-center text-gray-800">{pax}</span>
                <button 
                  onClick={() => setPax(pax + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* DISPLAY TOTAL HARGA AKHIR */}
            <div className="flex justify-between items-end mb-6 pb-6 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Total Harga</span>
              <div className="text-right">
                <div className="text-3xl font-black text-orange-600">RM {totalPrice}</div>
                <div className="text-xs text-gray-400 mt-1">Estimasi RM {currentPricePerPax} / pax</div>
              </div>
            </div>

            {/* TOMBOL WHATSAPP */}
            <a 
              href={isPaxValid ? `https://wa.me/6282283225920?text=${encodeURIComponent(
                `Halo Admin, saya tertarik dengan paket tour *${tourData.name}*.\n\n` +
                `• Pilihan: *${packageOptions[selectedOption].title}*\n` +
                `• Jumlah Peserta: ${pax} Pax (Minimal: ${currentMinPax} pax)\n` +
                `• Harga per Pax: RM ${currentPricePerPax}\n\n` +
                `*Total Estimasi Biaya: RM ${totalPrice}*\n\nApakah jadwal keberangkatan untuk rincian ini masih tersedia?`
              )}` : '#'}
              target={isPaxValid ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isPaxValid 
                  ? 'bg-[#25D366] hover:bg-[#1DA851] hover:shadow-green-500/30 cursor-pointer' 
                  : 'bg-gray-400 cursor-not-allowed opacity-60'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.01-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Pesan via WhatsApp
            </a>
            
          </div>
        </div>

      </section>
    </div>
  );
}