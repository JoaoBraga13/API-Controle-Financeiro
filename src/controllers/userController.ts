import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { error } from "node:console";
import AppDataSource from "../database/conexao";
//const AppDataSource = require('../database/conexao')
//const User = require('../models/User')
import User from "../models/User";

class UserController {
  //criação do usuário
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const userExists = await userRepository.findOne({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: "Usuário já existe!!" });
    }

    const hashedpassword = await bcrypt.hash(password, 8);

    const newUser = userRepository.create({
      name,
      email,
      password: hashedpassword,
    });

    await userRepository.save(newUser);

    return res.status(200).send("usuário criado");
  }
}

export default new UserController();
//module.exports = new UserController()
