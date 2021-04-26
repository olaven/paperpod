import jwt from "jsonwebtoken";

export const sign = <T>(payload: T) => {
  return jwt.sign(payload as any, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

export const decode = <T>(token: string) => {
  const data = jwt.verify(token, process.env.JWT_SECRET) as any;

  //expiration date, added by library, but not needed in my code
  delete data.iat;
  delete data.exp;
  delete data.sub;

  return (data as any) as T;
};
