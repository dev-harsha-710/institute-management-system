export interface IUser {
  // id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact: string | number;
  address: string;
  qualification: string;
  passing_year: string;
  dob: string;
  gender: string;
  caste_category: string;
  subcaste: string;
  role_id: number;
  password: string;
  isActive: boolean;
}
