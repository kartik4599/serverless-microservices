import { UserModel } from "app/models/user-model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRECT = "-SECRECT-";

export const getSalt = () => bcryptjs.genSalt();

export const getHashPassword = async (password: string, salt?: string) => {
  salt = salt || (await getSalt());
  return await bcryptjs.hash(password, salt);
};

export const validate = (password: string, hash: string) =>
  bcryptjs.compare(password, hash);

export const getToken = ({ user_id, email, phone, userType }: UserModel) => {
  return jwt.sign(
    {
      user_id,
      email,
      phone,
      userType,
    },
    SECRECT,
    {
      expiresIn: "40d",
    }
  );
};

export const verfiyToken = async (token: string) => {
  if (!token) return null;
  const returnValue = jwt.verify(token.split(" ")[1], SECRECT);

  return returnValue as UserModel;
};
