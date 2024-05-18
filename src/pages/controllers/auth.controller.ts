import { Request, Response } from "express";

export const pageRegister = async (req: Request, res: Response) => {
  try {
    res.render("auth/register");
  } catch (error) {
    res.status(500).send("Error al crear el usuario");
  }
};

export const pageLogin = async (req: Request, res: Response) => {
  try {
    res.render("auth/login");
  } catch (error) {
    res.status(500).send("Error al crear el usuario");
  }
};
