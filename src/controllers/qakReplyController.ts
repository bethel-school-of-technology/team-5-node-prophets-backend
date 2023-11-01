import { RequestHandler } from "express";
import { QakReply } from "../models/qakReply";
import { verifyUser } from "../services/auth";
import { User } from "../models/user";

export const createQakReply: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req);

  if (!user) {
    return res.status(403).send("Unauthorized");
  }

  let newQakReply: QakReply = req.body;
  newQakReply.user_id = user.user_id;

  if (newQakReply.qakReply) {
    let created = await QakReply.create(newQakReply);
    res.status(201).json(created);
  } else {
    res.status(400).send("Bad Request");
  }
};

export const getOneQakReply: RequestHandler = async (req, res, next) => {
  let qakReply_id = req.params.qakReply_id;
  let qakReplyFound = await QakReply.findByPk(qakReply_id);
  if (qakReplyFound) {
    res.status(200).json(qakReplyFound);
  } else {
    res.status(404).json({});
  }
};

export const updateQakReply: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req);

  if (user) {
    let qakReply_id = req.params.qakReply_id;
    let updatedQakReply: QakReply = req.body;

    updatedQakReply.user_id = user.user_id;

    let qakReplyFound = await QakReply.findByPk(qakReply_id);

    qakReplyFound &&
      qakReplyFound.qakReply_id == updatedQakReply.qakReply_id &&
      updatedQakReply.qakReply;
    {
      await QakReply.update(updatedQakReply, {
        where: { qakReply_id: qakReply_id },
      }).then;
    }
    res.status(200).json(updatedQakReply);
  } else {
    res.status(400).json("Bad Request");
  }
};

export const deleteQakReply: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req);

  if (user) {
    let qakReply_id = req.params.id;
    let qakReplyFound = await QakReply.findByPk(qakReply_id);

    if (qakReplyFound) {
      await QakReply.destroy({
        where: { qakReply_id: qakReply_id },
      });
      res.status(200).json();
    } else {
      res.status(404).json("Bad Request");
    }
  }
};
