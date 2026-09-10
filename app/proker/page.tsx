export default function ProgramKerja() {
  const prokers = [
    { cat: 'Lingkungan', title: 'Eco-brick', tagColor: 'bg-primary' },
    { cat: 'Pendidikan', title: 'Maritime English for Kids', tagColor: 'bg-secondary text-white' },
    { cat: 'Infrastruktur', title: 'Reflektor 9 orang', tagColor: 'bg-tertiary text-white' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10">Program Kerja & Pengabdian 📚</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {prokers.map((p, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl neo-border neo-shadow neo-btn">
            <span className={`inline-block px-3 py-1 rounded-full neo-border label-caps text-xs mb-3 ${p.tagColor}`}>
              {p.cat}
            </span>
            <h3 className="text-xl font-bold">{p.title}</h3>
            <p className="text-xs text-gray-600 mt-2">Program terlaksana dengan partisipasi aktif warga desa.</p>
          </div>
        ))}
      </div>
    </div>
  );
}