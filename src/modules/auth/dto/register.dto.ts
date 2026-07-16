export interface RegisterDto {
  fullName: string;
  username: string;
  email?: string;
  phone?: string;
  password: string;

  // User's own referral code (optional)
  referralCode?: string;

  // Referral code of the person who invited this user
  referredBy?: string;
}