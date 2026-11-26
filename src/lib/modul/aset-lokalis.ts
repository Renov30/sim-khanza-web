/**
 * Peta aset gambar klinis / lokalis anatomi dari SIMRS Khanza Java
 * yang disimpan di /public/images/lokalis/.
 */
export interface AsetLokalis {
  src: string;
  judul: string;
}

const IMG = {
  mata: { src: "/images/lokalis/mata.png", judul: "Status Lokalis Mata (OD / OS)" },
  mataBuka: { src: "/images/lokalis/mata-buka.png", judul: "Posisi Mata Terbuka" },
  mataTutup: { src: "/images/lokalis/mata-tutup.png", judul: "Posisi Mata Tertutup" },
  semua: { src: "/images/lokalis/semua.png", judul: "Status Lokalis Anatomi Tubuh" },
  anatomi: { src: "/images/lokalis/anatomi-tubuh.png", judul: "Anatomi Tubuh Manusia" },
  ortho: { src: "/images/lokalis/lokalis-ortho.png", judul: "Status Lokalis Bedah / Orthopedi" },
  paru: { src: "/images/lokalis/lokalis-paru.png", judul: "Status Lokalis Paru / Thorax" },
  paruForm: { src: "/images/lokalis/paru-form.jpg", judul: "Diagram Pemeriksaan Paru" },
  abdomen: { src: "/images/lokalis/abdomen-form.jpg", judul: "Diagram Pemeriksaan Abdomen" },
  tht: { src: "/images/lokalis/medis-awal-tht.png", judul: "Status Lokalis THT (Telinga, Hidung, Tenggorokan)" },
  kelamin: { src: "/images/lokalis/kelamin.png", judul: "Status Lokalis Kulit & Kelamin" },
  gigi: { src: "/images/lokalis/gigigeligi.png", judul: "Odontogram / Gigi Geligi" },
  intraoral: { src: "/images/lokalis/intraoral.png", judul: "Status Lokalis Intraoral" },
  wajah1: { src: "/images/lokalis/wajah-1.png", judul: "Status Lokalis Wajah (Depan)" },
  wajah2: { src: "/images/lokalis/wajah-2.png", judul: "Status Lokalis Wajah (Samping)" },
  nyeri: { src: "/images/lokalis/nyeri.png", judul: "Skala Nyeri (Wong-Baker / Numerik)" },
  skalaNyeri: { src: "/images/lokalis/skala-nyeri.png", judul: "Panduan Penilaian Skala Nyeri" },
  fisio: { src: "/images/lokalis/fisiobody.png", judul: "Body Chart Fisioterapi" },
  bromage: { src: "/images/lokalis/bromage-score.png", judul: "Panduan Skor Bromage Pasca Anestesi" },
  siteMarking: { src: "/images/lokalis/site-marking.jpeg", judul: "Penandaan Lokasi Operasi (Site Marking)" },
  areaOperasi: { src: "/images/lokalis/area-operasi.png", judul: "Diagram Area Operasi" },
  ballard: { src: "/images/lokalis/ballard.png", judul: "Skor Ballard Maturitas Neonatus" },
  lubchenco: { src: "/images/lokalis/lubchenco.png", judul: "Kurva Lubchenco Pertumbuhan Bayi" },
  maturitas: { src: "/images/lokalis/nilai-maturitas.png", judul: "Tabel Nilai Maturitas" },
  dehidrasi: { src: "/images/lokalis/tabel-derajat-dehidrasi.png", judul: "Tabel Derajat Dehidrasi" },
  vascular1: { src: "/images/lokalis/vascular-1.png", judul: "Akses Vaskular 1" },
  vascular2: { src: "/images/lokalis/vascular-2.png", judul: "Akses Vaskular 2" },
} as const satisfies Record<string, AsetLokalis>;

const PETA_ASET_LOKALIS: Readonly<Record<string, readonly AsetLokalis[]>> = {
  // Awal Medis Spesialis & IGD
  "penilaian-awal-medis-ralan-mata": [IMG.mata, IMG.mataBuka, IMG.mataTutup],
  "penilaian-awal-medis-ralan-tht": [IMG.tht],
  "penilaian-awal-medis-ralan-bedah": [IMG.ortho],
  "penilaian-awal-medis-ralan-orthopedi": [IMG.ortho],
  "penilaian-awal-medis-ralan-igd-psikiatri": [IMG.ortho],
  "penilaian-awal-medis-ralan-bedah-mulut": [IMG.gigi, IMG.intraoral, IMG.wajah1, IMG.wajah2],
  "penilaian-awal-medis-ralan-kulit-kelamin": [IMG.kelamin],
  "penilaian-awal-medis-ralan-paru": [IMG.paru, IMG.paruForm],
  "penilaian-awal-medis-ralan-penyakit-dalam": [IMG.semua, IMG.abdomen],
  "penilaian-awal-medis-ralan-neurologi": [IMG.semua],
  "penilaian-awal-medis-ralan-geriatri": [IMG.semua],
  "penilaian-awal-medis-ralan-psikiatri": [IMG.semua],
  "penilaian-awal-medis-ralan": [IMG.semua],
  "penilaian-awal-medis-ralan-bayi": [IMG.semua],
  "penilaian-awal-medis-ralan-kandungan": [IMG.semua, IMG.abdomen],
  "penilaian-awal-medis-ralan-rehab-medik": [IMG.nyeri, IMG.fisio],
  "penilaian-awal-medis-igd": [IMG.semua, IMG.anatomi],
  "penilaian-awal-medis-ranap": [IMG.semua],
  "penilaian-awal-medis-ranap-kandungan": [IMG.semua, IMG.abdomen],
  "penilaian-awal-medis-ranap-neonatus": [IMG.ballard, IMG.lubchenco, IMG.maturitas],
  "penilaian-awal-medis-hemodialisa": [IMG.vascular1, IMG.vascular2],
  "penilaian-bayi-baru-lahir": [IMG.ballard, IMG.lubchenco, IMG.maturitas],

  // Awal Keperawatan & Nyeri
  "penilaian-awal-keperawatan-igd": [IMG.nyeri],
  "penilaian-awal-keperawatan-ralan": [IMG.nyeri],
  "penilaian-awal-keperawatan-gigi": [IMG.gigi, IMG.nyeri],
  "penilaian-awal-keperawatan-kebidanan": [IMG.nyeri],
  "penilaian-awal-keperawatan-kebidanan-ranap": [IMG.nyeri],
  "penilaian-awal-ralan-bayi": [IMG.nyeri],
  "penilaian-awal-keperawatan-ralan-psikiatri": [IMG.nyeri],
  "penilaian-awal-keperawatan-ralan-geriatri": [IMG.nyeri],
  "penilaian-awal-keperawatan-ranap": [IMG.nyeri],
  "penilaian-awal-keperawatan-ranap-bayi-anak": [IMG.nyeri],
  "penilaian-awal-keperawatan-ranap-neonatus": [IMG.ballard, IMG.lubchenco],
  "penilaian-ulang-nyeri": [IMG.nyeri, IMG.skalaNyeri],

  // Fisioterapi, Operasi, Anestesi, Dehidrasi, Kekerasan, Hemodialisa
  "fisioterapi": [IMG.fisio, IMG.nyeri],
  "penilaian-korban-kekerasan": [IMG.fisio, IMG.anatomi],
  "skor-bromage-pasca-anestesi": [IMG.bromage],
  "checklist-pre-operasi": [IMG.siteMarking, IMG.areaOperasi],
  "penilaian-pre-operasi": [IMG.siteMarking, IMG.areaOperasi],
  "penilaian-derajat-dehidrasi": [IMG.dehidrasi],
  "hemodialisa": [IMG.vascular1, IMG.vascular2],
  "catatan-anastesi-sedasi": [IMG.nyeri],
};

export function dapatkanAsetLokalis(slug: string): readonly AsetLokalis[] | undefined {
  return PETA_ASET_LOKALIS[slug];
}
