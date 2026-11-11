export function isRegistrationDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
    && !Number.isNaN(Date.parse(value))
    && new Date(value).toISOString().slice(0, 10) === value;
}

export function registrationDate(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jayapura", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(now);
}
