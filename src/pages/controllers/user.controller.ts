import { Request, Response } from 'express';
const User = require("../../aplication/User/Model/user.model") ;

export const pageGetUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.render('user/index', { users });
    } catch (error) {
        res.status(500).send('Error');
    }
};

export const pageUpdateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.render('user/edit', { user });
    } catch (error) {
        res.status(500).send('Error');
    }
};
