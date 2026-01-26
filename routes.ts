const express = require("express");
const router = express.Router();
// const userRoute = require('./src/routes/user.routes')
import userRoute from "./src/routes/user.routes";
import authRoute from "./src/routes/auth.routes";

router.get("/", (req: any, res: any) => {
  res.send("Hello World");
});

//rotas usuários
router.use("/users", userRoute);

//rota login
router.use("/auth", authRoute);

module.exports = router;
