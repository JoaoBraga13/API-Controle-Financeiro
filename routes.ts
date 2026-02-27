import { Router } from "express";
import userRoute from "./src/routes/user.routes";
import authRoute from "./src/routes/auth.routes";
import transactionRoute from "./src/routes/transaction.routes";

const router = Router();

router.get("/", (req: any, res: any) => {
  res.send("Hello World");
});

//rotas usuários
router.use("/users", userRoute);

//rota login
router.use("/auth", authRoute);

//rota transações
router.use("/transactions", transactionRoute);

export default router;
