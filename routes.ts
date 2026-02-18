const express = require("express");
const router = express.Router();
// const userRoute = require('./src/routes/user.routes')
import userRoute from "./src/routes/user.routes";
import authRoute from "./src/routes/auth.routes";
import transactionRoute from "./src/routes/transaction.routes";

router.get("/", (req: any, res: any) => {
  res.send("Hello World");
});

//rotas usuários
router.use("/users", userRoute);

//rota login
router.use("/auth", authRoute);

//rota transações
router.use("/transactions", transactionRoute);

module.exports = router;
