import { Request, Response } from "express";
const Comment = require("../../aplication/Commet/Model/comment.model") ;


export const getCommentsPerPost = async (req: Request, res: Response) => {
  try {
    const { idPost } = req.params;
    const comments = await Comment.find({ postId: idPost }); // Busca todos los comentarios asociados a un post específico
    if (!comments) {
      return res.status(404).send('Post not found'); // Si no se encuentra el post, devuelve un error 404
    }
    console.log(comments)
    res.render('post/index', { comments }); // Renderiza la vista de posts e incluye los comentarios encontrados
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};
