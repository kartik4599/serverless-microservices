import twilio from "twilio";

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = twilio(accountSid, authToken);

export const generateAccessCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000);
  let expire = new Date();
  expire.setTime(new Date().getTime() + 1800000);
  return { code, expire };
};

export const sendVerificationCode = async (code: number, phoneNo: string) => {
  const response = await client.messages.create({
    body: `Your verification code is ${code}`,
    to: phoneNo,
    from: "+19786346674",
  });

  return response;
};
