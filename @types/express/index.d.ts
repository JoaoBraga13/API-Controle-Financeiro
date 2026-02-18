//import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string; // Adiciona a propriedade userId ao tipo Request do Express
    }
  }
}

export {};
