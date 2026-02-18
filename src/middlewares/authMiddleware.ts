import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPaylod {
  id: string;
}

export function authMiddleware(req: any, res: Response, next: NextFunction) {
  const jwtAuthentication = req.headers.authorization;

  if (!jwtAuthentication) {
    return res.send("Token não fornecido");
  }

  const [, token] = jwtAuthentication.split(" ");

  if (!token) {
    return res.send("token não fornecido");
  }

  try {
    const decodifica = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as unknown as JwtPaylod;

    req.userId = decodifica.id;

    return next();
  } catch (e) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
