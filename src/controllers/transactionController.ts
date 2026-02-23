import e, { request, Request, Response } from "express";
import AppDataSource from "../database/conexao";
import Transaction from "../models/Transaction";
import { AppError } from "../errors/AppError";

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

  //GET de transação específica
  async showTransactionById(req: any, res: Response) {
    const { id } = req.params;

    const transactionRepository = AppDataSource.getRepository(Transaction);

    const transaction = await transactionRepository.findOne({
      where: { id, user: { id: req.userId } },
    });

    if (!transaction) {
      //return res.status(404).json({ error: "Transação não encontrada" });
      throw new AppError("Transação não encontrada", 404);
    }

    return res.json(transaction);
  }

  //PUT para atualizar transação
  async updateTransaction(req: any, res: Response) {
    const { id } = req.params;
    const { description, value, type, category } = req.body;

    const transactionRepository = AppDataSource.getRepository(Transaction);

    const transaction = await transactionRepository.findOne({
      where: { id, user: { id: req.userId } },
    });
    if (!transaction) {
      //return res.status(404).json({ error: "Transação não encontrada" });
      throw new AppError("Transação não encontrada", 404);
    }

    const newTransaction = transactionRepository.merge(transaction, {
      description: description,
      value: value,
      type: type,
      category: category,
    });

    await transactionRepository.save(newTransaction);

    return res
      .status(201)
      .json({ message: "Transação atualizada com sucesso!!", newTransaction });
  }

  // DELETE para deletar transação
  async deleteTransaction(req: any, res: Response) {
    const { id } = req.params;

    const transactionRepository = AppDataSource.getRepository(Transaction);

    const transaction = await transactionRepository.findOne({
      where: { id, user: { id: req.userId } },
    });

    if (!transaction) {
      //return res.status(404).json({ error: "Transação não encontrada" });
      throw new AppError("Transação não encontrada", 404);
    }

    await transactionRepository.remove(transaction);
    return res
      .status(200)
      .json({ message: "Transação excluída com sucesso!!" });
  }

  //Resumo financeiro
  async summary(req: any, res: Response) {
    const transactionRepository = AppDataSource.getRepository(Transaction);
    const transactions = await transactionRepository.find({
      where: { user: { id: req.userId } },
    });

    const totalIncome = transactions
      .filter((t: Transaction) => t.type === "income")
      .reduce((sum: number, t: Transaction) => sum + Number(t.value), 0);

    const totalExpense = transactions
      .filter((t: Transaction) => t.type === "expense")
      .reduce((sum: number, t: Transaction) => sum + Number(t.value), 0);

    return res.status(200).json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    });
  }
}

export default new TransactionController();
