'use client';

import { useState, useEffect, useRef } from 'react';

const API_URL = "https://script.google.com/macros/s/AKfycbxv8GKj4AyjvLUszjjrUmQO831O0hAb-SUR_KBRHZQT5S-QrFa14flLm5TKR3gnYFEilw/exec";

interface MediaItem {
  id: string;
  day: string;
  type: string;
  url: string;
  caption: string;
}

export default function BukuKenangan() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  // Form State (Mendukung Banyak File)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [day, setDay] = useState<string>('Day 1');
  const [caption, setCaption] = useState<string>('');
  
  // Reference untuk Reset Input File
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const text = await res.text();
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Respon server bukan JSON yang valid:", text);
        return;
      }

      if (Array.isArray(data)) {
        setItems(data);
      } else if (data && data.error) {
        console.error("Error dari Apps Script Backend:", data.error);
      }
    } catch (err) {
      console.error("Gagal mengambil data galeri:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // Helper Konversi File ke Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const res = (e.target?.result as string).split(',')[1];
        resolve(res);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handler Upload Banyak File
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return alert('Pilih minimal satu foto atau video terlebih dahulu!');

    setLoading(true);
    let successCount = 0;

    for (let i = 0; i < selectedFiles.length; i++) {
      const currentFile = selectedFiles[i];
      setUploadProgress(`Mengunggah (${i + 1}/${selectedFiles.length}): ${currentFile.name}...`);

      try {
        const base64 = await fileToBase64(currentFile);
        const mimeType = currentFile.type;
        const isVideo = mimeType.startsWith('video');

        const payload = {
          action: 'CREATE',
          base64,
          mimeType,
          fileName: currentFile.name,
          day,
          type: isVideo ? 'video' : 'photo',
          caption: caption || currentFile.name
        };

        const res = await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify(payload)
        });

        const text = await res.text();
        const data = JSON.parse(text);

        if (data.status === 'success') {
          successCount++;
        } else {
          console.error(`Gagal mengunggah ${currentFile.name}:`, data.error);
        }
      } catch (err) {
        console.error(`Error mengunggah ${currentFile.name}:`, err);
      }
    }

    alert(`Selesai! ${successCount} dari ${selectedFiles.length} media berhasil ditambahkan ke scrapbook.`);
    setSelectedFiles([]);
    setCaption('');
    setUploadProgress('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    fetchMedia();
    setLoading(false);
  };

  // Handler Download HD
  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName || 'kenangan-kkn-hd';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Jika terhalang CORS, buka di tab baru untuk disimpan manual oleh pengguna
      window.open(url, '_blank');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kenangan ini?')) return;
    setLoading(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'DELETE', id })
      });
      fetchMedia();
    } catch (err) {
      alert('Gagal menghapus media.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedDay === 'All' 
    ? items 
    : items.filter(item => item.day === selectedDay);

  const rotations = ['rotate-2', '-rotate-2', 'rotate-3', '-rotate-3', 'rotate-1', '-rotate-1'];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-8 text-[#1E1B4B]">
        Buku Kenangan & Scrapbook 📸
      </h1>

      {/* Form Upload Gaya Neo-Brutalism */}
      <form onSubmit={handleUpload} className="bg-[#FFFDF9] p-5 md:p-6 rounded-2xl mb-10 neo-border neo-shadow space-y-4">
        <div className="flex justify-between items-center border-b-2 border-[#1E1B4B] pb-2">
          <h2 className="text-lg md:text-xl font-bold text-[#1E1B4B]">
            ✦ Tambah Momen (Bisa Pilih Banyak File)
          </h2>
          {selectedFiles.length > 0 && (
            <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold neo-border">
              {selectedFiles.length} File Terpilih
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*,video/*"
            multiple // Memungkinkan pengguna memilih banyak file sekaligus
            onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
            className="text-xs md:text-sm file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-2 file:border-[#1E1B4B] file:bg-primary file:font-bold file:text-[#1E1B4B] hover:file:translate-y-[-2px] hover:file:shadow-[3px_3px_0px_#1E1B4B] file:transition-all cursor-pointer"
          />
          <select 
            value={day} 
            onChange={(e) => setDay(e.target.value)}
            className="bg-white p-2.5 rounded-xl neo-border neo-shadow-sm outline-none font-bold text-sm"
          >
            {Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`).map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <input 
            type="text" 
            placeholder="Keterangan / Caption (Opsional)" 
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="bg-white p-2.5 rounded-xl neo-border neo-shadow-sm outline-none font-medium text-sm"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading || selectedFiles.length === 0}
          className="w-full bg-secondary text-white py-3 rounded-xl font-bold neo-border neo-shadow neo-btn disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
        >
          {loading ? (uploadProgress || 'Sedang Memproses...') : 'Tempel Semua ke Scrapbook 📌'}
        </button>
      </form>

      {/* Filter Tab */}
      <div className="flex overflow-x-auto gap-2 md:gap-3 mb-8 pb-3 scrollbar-hide">
        <button 
          onClick={() => setSelectedDay('All')}
          className={`px-4 py-2 rounded-full font-bold text-xs md:text-sm whitespace-nowrap neo-border neo-btn ${
            selectedDay === 'All' ? 'bg-primary neo-shadow-sm' : 'bg-white hover:bg-gray-50'
          }`}
        >
          Semua Hari
        </button>
        {Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`).map((d) => (
          <button 
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`px-4 py-2 rounded-full font-bold text-xs md:text-sm whitespace-nowrap neo-border neo-btn ${
              selectedDay === d ? 'bg-primary neo-shadow-sm' : 'bg-white hover:bg-gray-50'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Media Grid Scrapbook */}
      {loading && items.length === 0 ? (
        <div className="text-center py-12 font-bold text-lg md:text-xl scrapbook-note">Membuka lembaran scrapbook... 📖</div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12 font-bold text-lg md:text-xl scrapbook-note">Belum ada kenangan di hari ini. 📝</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 pt-4">
          {filteredItems.map((item, index) => {
            const randomRotation = rotations[index % rotations.length];
            
            return (
              <div key={item.id} className={`polaroid ${randomRotation}`}>
                <div className="washi-tape"></div>
                
                {/* Kontainer Media */}
                <div className="bg-[#1E1B4B] h-48 md:h-56 rounded neo-border flex items-center justify-center overflow-hidden relative">
                  <span className="absolute top-2 left-2 bg-primary text-[10px] md:text-xs font-bold px-2 py-0.5 rounded neo-border z-10 label-caps">
                    {item.day}
                  </span>
                  {item.type === 'video' ? (
                    <video src={item.url} controls className="w-full h-full object-cover" />
                  ) : (
                    <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Caption & Aksi */}
                <div className="mt-3 flex flex-col justify-between min-h-[90px]">
                  <p className="scrapbook-note text-center text-xs md:text-sm line-clamp-2">
                    {item.caption || 'Kenangan tanpa kata-kata...'}
                  </p>
                  
                  {/* Tombol Aksi: Download HD & Hapus */}
                  <div className="mt-3 flex gap-2 justify-center">
                    <button 
                      onClick={() => handleDownload(item.url, `${item.day}-${item.caption || 'kenangan'}`)}
                      className="text-[11px] font-bold bg-primary text-[#1E1B4B] px-3 py-1 rounded-full neo-border neo-shadow-sm neo-btn flex items-center gap-1"
                      title="Download Kualitas HD"
                    >
                      ⬇ HD
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-[11px] font-bold bg-white text-red-600 px-3 py-1 rounded-full neo-border hover:bg-red-50 transition-colors"
                    >
                      🗑 Hapus
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}