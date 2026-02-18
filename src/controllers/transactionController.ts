import { request, Request, Response } from "express";
import AppDataSource from "../database/conexao";
import Transaction from "../models/Transaction";

class TransactionController {
  //criação das transações
  async create(req: any, res: Response) {
    const { description, value, type, category } = req.body;

    if (!description || value === undefined || !type || !category) {
      return res.status(400).send("Campos obrigatórios não preenchidos");
    }

    const transactionRepository = AppDataSource.getRepository(Transaction);

    const transaction = transactionRepository.create({
      description,
      value,
      type,
      category,
      date: new Date(),
      user: { id: req.userId }, //associando com o usuário já criado no banco pelo id dele
    });

    await transactionRepository.save(transaction);

    return res
      .status(201)
      .json({ message: "Transação criada com sucesso", transaction });
  }

  //GET das transações do usuário
  async showTransaction(req: any, res: Response) {
    const userId = req.userId;

    const transactionRepository = AppDataSource.getRepository(Transaction);

    const transactions = await transactionRepository.find({
      where: { user: { id: userId } },
    });

    return res.json(transactions);
  }
}

export default new TransactionController();
