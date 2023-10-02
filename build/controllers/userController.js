"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.loginUser = exports.createUser = exports.getAllUsers = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const getAllUsers = async (req, res, next) => {
    let users = await user_1.User.findAll();
    res.status(200).json(users);
};
exports.getAllUsers = getAllUsers;
const createUser = async (req, res, next) => {
    let newUser = req.body;
    if (newUser.username && newUser.password) {
        let hashedPassword = await (0, auth_1.hashPassword)(newUser.password);
        newUser.password = hashedPassword;
        let created = await user_1.User.create(newUser);
        res.status(201).json({
            username: created.username,
            userid: created.user_id,
        });
    }
    else {
        res.status(400).send("Username and password required");
    }
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    let existingUser = await user_1.User.findOne({
        where: { username: req.body.username },
    });
    if (existingUser) {
        let passwordsMatch = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        if (passwordsMatch) {
            let token = await (0, auth_1.signUserToken)(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json("Invalid password");
        }
    }
    else {
        res.status(401).json("Invalid username");
    }
};
exports.loginUser = loginUser;
const getUserProfile = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    let reqId = parseInt(req.params.id);
    if (user && user.user_id === reqId) {
        let { fullname, password, email, city, state } = user;
        res.status(200).json({
            fullname,
            password,
            email,
            city,
            state,
        });
    }
    else {
        res.status(401).send();
    }
};
exports.getUserProfile = getUserProfile;
