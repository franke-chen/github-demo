export interface APIKey {
  apikey: string
}

export interface TokenDto {
  email: string,
  user: string,
  role: string
  access_token: string,
  refresh_token: string,
}

export interface PreLogin {
  email: string,
  hasPassword: boolean,
  isAuthenticated: boolean,
  userId: number
}

export interface License {
  id: number;
  userId: number;
  email: string;
  status: string;
  licenseType: string;
  region: string;
  scope: string;
  option1: number;
  option2: number;
  option3: string;
}

export interface Profile {
  id: number,
  uid: number,
  surname: string;
  givenName: string;
  city: string;
  phone: string;
  company: string;
  companyType: string;
  title: string;
  contact: string;
}
