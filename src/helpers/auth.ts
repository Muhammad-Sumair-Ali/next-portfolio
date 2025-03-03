import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; 

interface DecodedToken {
  [key: string]: any;
}

export function verifyToken(token: string): DecodedToken | null {
  try {

    if (!token) return null;
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

    return jwt.verify(token, JWT_SECRET) as DecodedToken; 
  } catch (error) {
    return null;
  }
}
