import { Request, Response } from "express";
import AppDataSource from "../database/conexao";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  //login usuário
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });
    if (!user) {
      return res
        .status(404)
        .json({ error: "usuário não encontrado na tabela!!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ error: "Senha errada, por favor tente novamente!" });
    }

    //autenticação JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1 day",
    });

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },

      token,
    });
  }
}

export default new AuthController();
