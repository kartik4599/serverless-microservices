import { UserModel } from "app/models/user-model";
import { DBOperation } from "./db-operation";
import { ProfileInput } from "app/models/dto/address-input";
import { AddressModel } from "app/models/address-model";

export class UserRepository extends DBOperation {
  constructor() {
    super();
  }

  async createUser({ email, password, phone, userType }: UserModel) {
    const queryString =
      "INSERT INTO users(phone,email,password,user_type) VALUES($1,$2,$3,$4) RETURNING *";
    const values = [phone, email, password, userType];

    const res = await this.executeQuery(queryString, values);
    return res.rowCount > 0 ? res.rows[0] : null;
  }

  async findAccount(email: string) {
    const queryString = "SELECT * FROM users WHERE email = $1";

    const res = await this.executeQuery(queryString, [email]);
    if (res.rowCount < 1) throw new Error("User not found");
    return res.rows[0] as UserModel;
  }

  async updateVerificationCode(userId: number, code: number, expiry: Date) {
    const queryString =
      "UPDATE users SET verification_code=$1, expiry=$2 WHERE user_id=$3 AND verified=FALSE RETURNING *";
    const values = [code, expiry, userId];

    const res = await this.executeQuery(queryString, values);
    if (res.rowCount < 1) throw new Error("User not found");
    return res.rows[0] as UserModel;
  }

  async updateVerificationUser(userId: number) {
    const queryString =
      "UPDATE users SET verified=TRUE WHERE user_id=$1 AND verified=FALSE RETURNING *";
    const values = [userId];

    const res = await this.executeQuery(queryString, values);
    if (res.rowCount < 1) throw new Error("User not found");
    return res.rows[0] as UserModel;
  }

  async updateUser(
    userId: number,
    firstName: string,
    lastName: string,
    userType: string
  ) {
    const queryString =
      "UPDATE users SET first_name=$1, last_name=$2, user_type=$3 WHERE user_id=$4 RETURNING *";
    const values = [firstName, lastName, userType, userId];

    const result = await this.executeQuery(queryString, values);
    if (result.rowCount < 1) throw new Error("User not found");

    return result.rows[0] as UserModel;
  }

  async createProfile(
    user_id: number,
    {
      firstName,
      lastName,
      userType,
      address: { addressLine1, addressLine2, city, postal_code, country },
    }: ProfileInput
  ) {
    const updatedUser = await this.updateUser(
      user_id,
      firstName,
      lastName,
      userType
    );

    const queryString =
      "INSERT INTO address(user_id,address_line1,address_line2,city,postal_code,country) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";

    const values = [
      user_id,
      addressLine1,
      addressLine2,
      city,
      postal_code,
      country,
    ];

    const result = await this.executeQuery(queryString, values);
    if (result.rowCount < 1) throw new Error("User");

    return { updatedUser, address: result.rows[0] as AddressModel };
  }
}
