import bcryptjs from "bcryptjs";

export const getSalt = () => bcryptjs.genSalt();

export const getHashPassword = async (password: string, salt?: string) => {
  salt = salt || (await getSalt());
  return await bcryptjs.hash(password, salt);
};

export const validate = (password: string, hash: string) =>
  bcryptjs.compare(password, hash);
