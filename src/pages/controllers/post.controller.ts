import { Request, Response } from "express";
const Post = require( "../../aplication/Post/Model/post.model" );
const User = require("../../aplication/User/Model/user.model") 
const Comment = require("../../aplication/Commet/Model/comment.model") 

interface Post {
  idUser: string;
}
interface Comment {
  idUsuario: string;
  idPost: string;
  content: string;
}
interface User {
  id: string;
  name: string;
}

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    // Obtener todos los posts
    const posts : Post[]= await Post.find();
    
    // Extraer los idUser de los posts
    const userIds  = await posts.map(post => post.idUser);
    
    // Encontrar los usuarios correspondientes a los userIds
    const users: User[] = await User.find({ _id: { $in: userIds } });
    
    // Crear un objeto donde las claves sean los _id de los usuarios y los valores sean los nombres
    const userNames: { [key: string]: string } = {};
    users.forEach(user => {
        userNames[user.id] = user.name;
    });

    // Pasar el nombre de cada usuario al renderizado
    res.render('posts/index', { posts, userNames });
  } catch (error) {
    res.status(500).send('Error');
  }
};


export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      // Manejar el caso donde no se encuentra la publicación
      return res.status(404).send('Publicación no encontrada');
    }

    // Encontrar el usuario correspondiente al idUser de la publicación
    const user = await User.findById(post.idUser);

    if (!user) {
      // Manejar el caso donde no se encuentra el usuario
      return res.status(404).send('Usuario no encontrado');
    }

    // Busca todos los comentarios asociados a un post específico
    const comments : Comment[]= await Comment.find({ idPost: id });

    if (!comments) {
      return res.status(404).send('Post not found'); // Si no se encuentra el post, devuelve un error 404
    }
    const userIds = comments.map(comment => comment.idUsuario);
    
    // Encontrar los usuarios correspondientes a los userIds
    const users: User[]= await User.find({ _id: { $in: userIds } });
    
    // Crear un objeto donde las claves sean los _id de los usuarios y los valores sean los nombres
    const userNames: { [key: string]: string } = {};
    users.forEach(user => {
        userNames[user.id] = user.name;
    });
    

    res.render('post/index', { post, userName: user.name, comments, userNames });
  } catch (error) {
    res.status(500).send('Error');
  }
}

