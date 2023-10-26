import { RequestHandler } from "express";
import { QakReply } from "../models/qakReply";
import { verifyUser } from "../services/auth";
import { User } from "../models/user";

export const createQakReply: RequestHandler = async (req, res, next) => {
  try {
    const user: User | null = await verifyUser(req);

    if (!user) {
      return res.status(403).send("Unauthorized");
    }

    const newQakReply: QakReply = req.body;
    newQakReply.user_id = user.user_id;

    if (newQakReply.qakReply) {
      const createdQakReply = await QakReply.create(newQakReply);
      res.status(201).json(createdQakReply);
    } else {
      res.status(400).send("Bad Request");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateQakReply: RequestHandler = async (req, res, next) => {
  try {
    const qakReplyId = req.params.id;
    const newQakReply: QakReply = req.body;
    const user: User | null = await verifyUser(req);

    if (!user) {
      return res.status(403).send("Unauthorized");
    }

    const qakReply = await QakReply.findByPk(qakReplyId);

    if (qakReply && qakReply.user_id === user.user_id) {
      await qakReply.update(newQakReply);
      res.status(200).json({});
    } else {
      res.status(400).send("Bad Request");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteQakReply: RequestHandler = async (req, res, next) => {
  try {
    const qakReplyId = req.params.id;
    const user: User | null = await verifyUser(req);

    if (!user) {
      return res.status(403).send("Unauthorized");
    }

    const qakReply = await QakReply.findByPk(qakReplyId);

    if (qakReply && qakReply.user_id === user.user_id) {
      await qakReply.destroy();
      res.status(200).json({});
    } else {
      res.status(400).send("Bad Request");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
