import { Router } from "express";
import transaction from "../controllers/transactionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

//rotas
router.post("/create", authMiddleware, transaction.create);
router.get("/show", authMiddleware, transaction.showTransaction);
router.get("/show/:id", authMiddleware, transaction.showTransactionById);
router.put("/update/:id", authMiddleware, transaction.updateTransaction);
router.delete("/delete/:id", authMiddleware, transaction.deleteTransaction);

export default router;
