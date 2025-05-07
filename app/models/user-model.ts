import { AddressModel } from "./address-model";

export interface UserModel {
  user_id?: number;
  email: string;
  password: string;
  phone: string;
  userType: "Buyer" | "Seller";
  first_name?: string;
  last_name?: string;
  profile_pic?: string;
  verification_code?: number;
  expiry?: string;
  address?: AddressModel[];
}
