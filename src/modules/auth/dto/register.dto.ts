export interface RegisterDto {
  fullName: string;
  username: string;
  email?: string;
  phone?: string;
  password: string;
  referralCode?: string;
}