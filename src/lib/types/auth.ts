export interface UserSession {
  username: string;
  fullName: string;
  role: "admin" | "user";
  isAdmin: boolean;
  permissions: Record<string, boolean>;
  loginTime: string;
}

export interface HospitalSetting {
  nama_instansi: string;
  alamat_instansi: string;
  kabupaten: string;
  propinsi: string;
  kontak: string;
  email: string;
  logo?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

