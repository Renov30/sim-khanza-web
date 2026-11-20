export function tanggalSekarang() {
  const sekarang = new Date();
  const tahun = sekarang.getFullYear();
  const bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
  const hari = String(sekarang.getDate()).padStart(2, "0");
  return `${tahun}-${bulan}-${hari}`;
}

export function jamSekarang() {
  const sekarang = new Date();
  return [sekarang.getHours(), sekarang.getMinutes(), sekarang.getSeconds()]
    .map((nilai) => String(nilai).padStart(2, "0"))
    .join(":");
}
