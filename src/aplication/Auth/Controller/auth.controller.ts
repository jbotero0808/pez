import { NextFunction, Request, Response } from "express";
const User = require("../../User/Model/user.model") ;
import jwt from "jsonwebtoken";

 const apiRegister = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const newUser = new User({ name, email, password });
  await newUser.save();
  const token = jwt.sign(
    { _id: newUser._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "30d" }
  );
  res.json({ token });
};

 const apiLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

  res.cookie("authcookie", token, { maxAge: 900000, httpOnly: true });
  res.cookie("usersession", user.id, { maxAge: 900000, httpOnly: true });
  res.status(200).send(token);

};

 const apiLogout = (req: Request, res: Response) => {
  res.clearCookie("authcookie");
  res.clearCookie("usersession");
  res.status(200).json({ message: "Logged out successfully" });
};

 const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers['authorization'];

  if (!token && req.cookies && req.cookies.authcookie) {
    token = req.cookies.authcookie;
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = {
  apiRegister,
  apiLogin,
  apiLogout,
  verifyJWT,
}


