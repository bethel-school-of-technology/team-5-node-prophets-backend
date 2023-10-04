import { RequestHandler } from "express";
import { User } from "../models/user";
import {
  hashPassword,
  comparePasswords,
  signUserToken,
  verifyUser,
} from "../services/auth";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  let users = await User.findAll();
  res.status(200).json(users);
};

export const createUser: RequestHandler = async (req, res, next) => {
  let newUser: User = req.body;
  if (newUser.username && newUser.password) {
    let hashedPassword = await hashPassword(newUser.password);
    newUser.password = hashedPassword;
    let created = await User.create(newUser);
    res.status(201).json({
      username: created.username,
      userid: created.user_id,
    });
  } else {
    res.status(400).send("Username and password required");
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  let existingUser: User | null = await User.findOne({
    where: { username: req.body.username },
  });

  if (existingUser) {
    let passwordsMatch = await comparePasswords(
      req.body.password,
      existingUser.password
    );

    if (passwordsMatch) {
      let token = await signUserToken(existingUser);
      res.status(200).json({ token });
    } else {
      res.status(401).json("Invalid password");
    }
  } else {
    res.status(401).json("Invalid username");
  }
};

export const getUserProfile: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req);

  let reqId = parseInt(req.params.id);

  if (user && user.user_id === reqId) {
    let { fullname, username, password, email, city, state } = user;
    res.status(200).json({
      fullname,
      username,
      password,
      email,
      city,
      state,
    });
  } else {
    res.status(401).send();
  }
};
