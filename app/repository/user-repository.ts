import { UserModel } from "app/models/user-model";
import { DBOperation } from "./db-operation";

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

  async updateVerificationCode(userId: string, code: number, expiry: Date) {
    const queryString =
      "UPDATE users SET verification_code=$1, expiry=$2 WHERE user_id=$3 AND verified=FALSE RETURNING *";
    const values = [code, expiry, userId];

    const res = await this.executeQuery(queryString, values);
    if (res.rowCount < 1) throw new Error("User not found");
    return res.rows[0] as UserModel;
  }

  async updateVerificationUser(userId: string) {
    const queryString =
      "UPDATE users SET verified=TRUE WHERE user_id=$1 AND verified=FALSE RETURNING *";
    const values = [userId];

    const res = await this.executeQuery(queryString, values);
    if (res.rowCount < 1) throw new Error("User not found");
    return res.rows[0] as UserModel;
  }
}
