import { Router } from "express";
import transaction from "../controllers/transactionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

//rotas
router.post("/create", authMiddleware, transaction.create);
router.get("/show", authMiddleware, transaction.showTransaction);
router.get("/show/:id", authMiddleware, transaction.showTransactionById);

export default router;
