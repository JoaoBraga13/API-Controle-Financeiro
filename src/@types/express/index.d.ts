/**
 * Esse código permite que userId seja usado para a autenticação com o token do JWT, evitando usarmos o req.params.id
 que recebe parâmetros na url, deixando uma brecha de segurança.
 * Da forma atual, confiamos apenas no token do JWT para autenticar.
 */

import { Express } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
