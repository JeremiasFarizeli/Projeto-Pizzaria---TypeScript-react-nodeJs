import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import { router } from "./router";
const porta: number = 3333;

const app = express();

app.use(router);
app.use(express.json);
app.use(cors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Algo deu errado!");
});

// Esse é um midleware de tratativa de erros em rotas, toda rota vai passar por ele.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    // Se for uma instancia de um erro vamos lançar uma exceçção
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
