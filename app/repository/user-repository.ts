import { UserModel } from "app/models/user-model";
import { dbClient } from "app/utility/db-client";

export class UserRepository {
  async createUser({ email, password, phone, userType }: UserModel) {
    const client = dbClient();
    await client.connect();
    const queryString =
      "INSERT INTO users(phone,email,password,user_type) VALUES($1,$2,$3,$4) RETURNING *";
    const values = [phone, email, password, userType];

    const res = await client.query(queryString, values);
    await client.end();

    return res.rowCount > 0 ? res.rows[0] : null;
  }
}
