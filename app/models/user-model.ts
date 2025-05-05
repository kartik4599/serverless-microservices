export interface UserModel {
  user_id?: string;
  email: string;
  password: string;
  phone: string;
  userType: "Buyer" | "Seller";
}
