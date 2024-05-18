import { Request, Response } from "express";
const User = require("../../User/Model/user.model") ;

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Error");
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password} = req.body;
    const user = new User({ name, email, password});
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send("Error al crear el usuario");
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Error al obtener el usuario");
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, email });
    res.status(200).json(user);
  } catch (error) {
    return res.status(404).send("Usuario no encontrada");
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).send("Usuario eliminado");
  } catch (error) {
    return res.status(404).send("Usuario no encontrada");
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
}