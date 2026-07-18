"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, MapPin, Clock } from "lucide-react";
import tourPackages from "../../data/paket.json";

export default function PaketTour() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTours = tourPackages.filter((tour) =>
    tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFoto = 24;
  const galeriFoto = Array.from({ length: totalFoto }, (_, index) => ({
    id: index + 1,
    src: `/galeri/${index + 1}.jpeg`, 
    alt: `Momen Tour Spesial ${index + 1}`,
  }));

  const galeriVideo = [
  { id: 1, src: "/galeri/v1.mp4", label: "CUPLIKAN TOUR 1" },
  // Kalau ada video kedua, tinggal hilangkan tanda komentar (//) di bawah ini:
  // { id: 2, src: "/galeri/video-tour2.mp4", label: "CUPLIKAN BINTAN" },
  // { id: 3, src: "/galeri/video-tour3.mp4", label: "CUPLIKAN BATAM" },
];

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      
      <section className="relative w-full h-[50vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center z-0" />
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Eksplorasi Destinasi</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Temukan petualangan tak terlupakan dengan paket wisata pilihan kami.
          </p>
        </div>
      </section>

      <section className="relative z-30 max-w-4xl mx-auto px-4 -mt-16 w-full">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={20} />
            <input 
              type="text" 
              placeholder="Cari destinasi... (misal: Batam)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div key={tour.id} className="group relative h-[420px] w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100">
              
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                style={{ backgroundImage: `url('${tour.image}')` }} 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent pt-20">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-200">
                        <span className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md">
                        <Clock size={14} className="mr-1 text-orange-400" /> {tour.duration}
                        </span>
                        <span className="flex items-center">
                        <MapPin size={14} className="mr-1 text-orange-400" /> {tour.location}
                        </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {tour.name}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {tour.description}
                    </p>
                    
                        <div className="flex justify-between items-center mt-4 border-t border-white/20 pt-4">
                            <div>
                            <p className="text-white text-xs font-medium opacity-80">Mulai dari</p>
                            <p className="text-orange-400 font-bold text-xl">{tour.price} RM/Pax</p>
                            </div>
                            
                            <Link 
                            href={`/paket-tour/${tour.path}`}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
                            >
                            Lihat Detail
                            </Link>
                        </div>
                    </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
      
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Momen Keseruan Tour</h2>
          <p className="text-gray-600">Intip pengalaman tak terlupakan bersama kami!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          
          {galeriFoto.map((foto) => (
            <div 
              key={`foto-${foto.id}`} 
              className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm group"
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium">{foto.alt}</span>
              </div>
            </div>
          ))}

          {galeriVideo.map((video) => (
            <div 
              key={`video-${video.id}`} 
              className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm group"
            >
               <video 
                  src={video.src}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
               />
               
               <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-white font-bold text-sm tracking-wider shadow-sm">
                    🎥 {video.label}
                  </span>
               </div>
            </div>
          ))}

        </div>

      </div>
    </section>
    </div>
  );
}