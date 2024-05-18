import { Request, Response } from "express";
const Post = require( "../../Post/Model/post.model");

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send("Error");
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const idUser = req.cookies.usersession;
    const { title, content, image} = req.body;
    const post = new Post({ idUser, title, content, image});
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).send("Error con la creacion del post");
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send("Error al obtener el post");
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true});
    res.status(200).json(post);
  } catch (error) {
    return res.status(404).send("Actualizacion no encontrada");
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(204).send("Se elimino la publicacion");
  } catch (error) {
    return res.status(404).send("Publicacion no encontrada");
  }
};
