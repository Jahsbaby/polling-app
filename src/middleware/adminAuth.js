// src/middleware/adminAuth.js
import dotenv from "dotenv";
dotenv.config();

export default function adminAuth(req, res, next) {
  // simple token in header or cookie - replace with real auth in prod
  const token = req.header("x-admin-token") || req.cookies?.adminToken;
  if (!token || token !== process.env.ADMIN_API_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
