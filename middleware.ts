// import { NextRequest, NextResponse } from "next/server";


export { auth as middleware } from "./auth"

// import jwt from 'jsonwebtoken';

// export default function authMiddleware(handler:any) {
//   return async (req:any, res:any) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized, token required' });
//     }

//     try {
//       if (!process.env.JWT_SECRET) {
//         throw new Error('JWT_SECRET is not defined');
//       }
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.admin = decoded;
//       return handler(req, res);
//     } catch (error) {
//       return res.status(401).json({ message: 'Unauthorized, invalid token' });
//     }
//   };
// }

