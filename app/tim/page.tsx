'use client';

interface Member {
  name: string;
  role: string;
  quote: string;
}

interface Division {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  headerBg: string;
  headerText: string;
  badgeBg: string;
  badgeText: string;
  stickerText: string;
  members: Member[];
}

export default function ProfilTim() {
  const divisions: Division[] = [
    {
      id: 'bph',
      title: 'BADAN PENGURUS HARIAN',
      tagline: 'Komando Utama, Penjaga Kas, & Pengawal Administrasi',
      icon: '👑',
      headerBg: 'bg-primary',
      headerText: 'text-[#1E1B4B]',
      badgeBg: 'bg-primary',
      badgeText: 'text-[#1E1B4B]',
      stickerText: 'TOP COMMAND ⭐️',
      members: [
        { name: 'Hendy Prayudha', role: 'Ketua (Kordes)', quote: '"Ok, jadi intinya......!"' },
        { name: 'Siti Salamah', role: 'Wakil Ketua', quote: '"Kimbekkkk! Teloorr!"' },
        { name: 'Renaldi', role: 'Sekretaris 1', quote: '"Eiii... dah pandai yee"' },
        { name: 'Agustina Puji Anggraeni', role: 'Sekretaris 2', quote: '"Siti semalam aku ngorok ga...?"' },
        { name: 'Najwa Anisa', role: 'Bendahara', quote: '"Hayooo....!"' },
      ],
    },
    {
      id: 'acara',
      title: 'DIVISI ACARA',
      tagline: 'Kreator Kemeriahan & Pengendali Rundown Posko',
      icon: '🎉',
      headerBg: 'bg-secondary',
      headerText: 'text-white',
      badgeBg: 'bg-secondary',
      badgeText: 'text-white',
      stickerText: 'NO SLEEP SQUAD ⚡️',
      members: [
        { name: 'Arizal Akbar', role: 'Koor Acara', quote: '"Proker yang baik adalah proker yang selesai"' },
        { name: 'Nazira', role: 'Anggota Acara', quote: '"76 apel....!"' },
        { name: 'Delvi Natalia Panjaitan', role: 'Anggota Acara', quote: '"Weeei bisa masak air hangat ga...?"' },
      ],
    },
    {
      id: 'humas',
      title: 'DIVISI HUMAS',
      tagline: 'Jembatan Silaturahmi & Duta Posko ke Warga Desa',
      icon: '📢',
      headerBg: 'bg-emerald-400',
      headerText: 'text-[#1E1B4B]',
      badgeBg: 'bg-emerald-400',
      badgeText: 'text-[#1E1B4B]',
      stickerText: 'LOBI LOBI WAK 💬',
      members: [
        { name: 'Irpan Haris', role: 'Koor Humas', quote: '"Aman ajaa....!"' },
        { name: 'Aldina Cipta Lila Wangsa', role: 'Anggota Humas', quote: '"Kenapa sihht...... marah marah terus?"' },
        { name: 'Etha Sheril Siagian', role: 'Anggota Humas', quote: '"Weehh...Hairdryer aku mana?"' },
      ],
    },
    {
      id: 'konsumsi',
      title: 'DIVISI KONSUMSI',
      tagline: 'Penyelamat Perut & Penjaga Ketahanan Pangan Posko',
      icon: '🍳',
      headerBg: 'bg-pink-400',
      headerText: 'text-[#1E1B4B]',
      badgeBg: 'bg-pink-400',
      badgeText: 'text-[#1E1B4B]',
      stickerText: 'AMUNISI PERUT 🍲',
      members: [
        { name: 'Dea Lestari', role: 'Koor Konsumsi', quote: '"Wee sapa yang belum makann nii...!"' },
        { name: 'Sintia', role: 'Anggota Konsumsi', quote: '"Wee...Kalian tau tak...!"' },
        { name: 'Tri Rahmawati', role: 'Anggota Konsumsi', quote: '"Ecobrick...Ecobrick...Ecobrick!"' },
      ],
    },
    {
      id: 'perlengkapan',
      title: 'DIVISI PERLENGKAPAN',
      tagline: 'Tim Eksekusi Logistik & Otot Utama Posko',
      icon: '🛠️',
      headerBg: 'bg-amber-400',
      headerText: 'text-[#1E1B4B]',
      badgeBg: 'bg-amber-400',
      badgeText: 'text-[#1E1B4B]',
      stickerText: 'HEAVY DUTY 📦',
      members: [
        { name: 'Muhammad Fauzan Hakim', role: 'Koor Perlengkapan', quote: '"bau Cungutzz!"' },
        { name: 'Misko Ferdyansya Purba', role: 'Anggota Perlengkapan', quote: '"Ko dengar tak...?"' },
        { name: 'Suhaeni', role: 'Anggota Perlengkapan', quote: '"ihh kau ni Misko...!"' },
      ],
    },
    {
      id: 'pdd',
      title: 'DIVISI PDD',
      tagline: 'Skena Estetik, Konten Viral, & Abadi Momen',
      icon: '📸',
      headerBg: 'bg-purple-400',
      headerText: 'text-white',
      badgeBg: 'bg-purple-400',
      badgeText: 'text-white',
      stickerText: 'AESTHETIC CLUB 🎥',
      members: [
        { name: 'Selvia Dwinanda', role: 'Koor PDD', quote: '"Woi cepatlahh...! Kata nak foto...!"' },
        { name: 'Siti Wela Aliza', role: 'Anggota PDD', quote: '"aku minta maaf guys....pokoknya...pokoknya...!"' },
        { name: 'Sherlina Sonia Putri', role: 'Anggota PDD', quote: '"Gerrodd.....!"' },
      ],
    },
  ];

  const scrollToDivision = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header Utama */}
      <div className="text-center mb-8">
        <span className="bg-primary px-4 py-1.5 rounded-full neo-border label-caps text-xs font-extrabold neo-shadow-sm inline-block">
          ✦ Official Squad Roster
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold mt-3 text-[#1E1B4B]">
          Meet The Dream Team! 🎒
        </h1>
        <p className="text-sm md:text-base text-gray-700 mt-2 max-w-xl mx-auto font-medium">
          19 Mahasiswa tangguh KKN 27 Desa Toapaya yang siap mengabdi dan menginspirasi.
        </p>
      </div>

      {/* Pintasan Navigasi Divisi (Quick Jump) */}
      <div className="flex flex-wrap justify-center gap-2 mb-14">
        {divisions.map((div) => (
          <button
            key={div.id}
            onClick={() => scrollToDivision(div.id)}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold label-caps neo-border neo-shadow-sm neo-btn bg-white hover:bg-primary transition-colors flex items-center gap-1.5"
          >
            <span>{div.icon}</span>
            <span>{div.title.replace('DIVISI ', '')}</span>
          </button>
        ))}
      </div>

      {/* Section Per Divisi Dengan Sekat Neo-Brutalism */}
      <div className="space-y-16">
        {divisions.map((div) => (
          <section key={div.id} id={div.id} className="scroll-mt-24">
            
            {/* SEKAT DIVISI (NEO-BRUTALISM BANNER) */}
            <div className={`relative ${div.headerBg} ${div.headerText} p-5 md:p-6 rounded-2xl neo-border neo-shadow mb-8 overflow-hidden`}>
              {/* Pattern Background Accent */}
              <div className="absolute -right-6 -bottom-6 opacity-20 text-7xl md:text-8xl select-none font-black">
                {div.icon}
              </div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl md:text-4xl bg-white/20 p-2 rounded-xl neo-border">
                    {div.icon}
                  </span>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-syne">
                      {div.title}
                    </h2>
                    <p className="text-xs md:text-sm font-semibold opacity-90 mt-0.5">
                      {div.tagline}
                    </p>
                  </div>
                </div>

                {/* Stiker Tag Neo-Brutalism */}
                <div className="inline-block bg-[#1E1B4B] text-white text-[11px] font-extrabold px-3 py-1 rounded-full neo-border rotate-1 md:-rotate-2 self-start md:self-auto label-caps">
                  {div.stickerText}
                </div>
              </div>
            </div>

            {/* GRID ANGGOTA DIVISI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {div.members.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFDF9] rounded-2xl neo-border neo-shadow p-4 relative flex flex-col justify-between hover:-translate-y-1 transition-transform"
                >
                  {/* Badge Peran / Jabatan */}
                  <div className={`absolute -top-3 -right-2 px-3 py-1 rounded-full neo-border label-caps text-[10px] font-extrabold neo-shadow-sm ${div.badgeBg} ${div.badgeText}`}>
                    {m.role}
                  </div>

                  <div>
                    {/* Placeholder Foto */}
                    <div className="bg-surface-dim h-48 rounded-xl neo-border mb-4 flex items-center justify-center font-bold text-xs text-gray-600 bg-pattern">
                      Foto {m.name}
                    </div>

                    {/* Nama Anggota */}
                    <h3 className="text-base md:text-lg font-extrabold font-syne text-[#1E1B4B] leading-snug">
                      {m.name}
                    </h3>
                  </div>

                  {/* Kutipan / Quote */}
                  <p className="scrapbook-note text-xs text-gray-600 mt-3 pt-2 border-t border-dashed border-gray-300 italic">
                    {m.quote}
                  </p>
                </div>
              ))}
            </div>

          </section>
        ))}
      </div>
    </div>
  );
}