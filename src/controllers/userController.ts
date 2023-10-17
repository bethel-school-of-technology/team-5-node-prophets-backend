import { RequestHandler } from "express";
import { User } from "../models/user";
import { Qak } from "../models/qak";
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
      user_id: created.user_id,
      fullname: created.fullname,
      username: created.username,
      password: created.password,
      email: created.email,
      city: created.city,
    });
  } else {
    res.status(400).send("Please complete all required fields");
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
    let { fullname, password, email, city, state, profilePicture } = user;
    res.status(200).json({
      fullname,
      password,
      email,
      city,
      state,
      profilePicture,
    });
  } else {
    res.status(401).send();
  }
};

export const getUserQaks: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req);

  if (user) {
    let posts = await User.findByPk(user.user_id, {
      include: Qak,
    });
    res.status(200).json(posts);
  } else {
    res.status(404).json();
  }
};

export const updateUserProfile: RequestHandler = async (req, res, next) => {
  try {
    const authenticatedUser = await verifyUser(req);
    if (!authenticatedUser) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = authenticatedUser.user_id;

    // Get the user ID from the request parameters
    const requestedUserId = +req.params.id;

    // Check if the authenticated user is trying to update their own profile
    if (userId !== requestedUserId) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this profile" });
    }

    // Fetch the user with the given ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's profile fields
    if (req.body.fullname) user.fullname = req.body.fullname;
    if (req.body.email) user.email = req.body.email;
    if (req.body.city) user.city = req.body.city;
    if (req.body.state) user.state = req.body.state;
    if (req.body.profilePicture) user.profilePicture = req.body.profilePicture;

    // Save the updated user profile
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
