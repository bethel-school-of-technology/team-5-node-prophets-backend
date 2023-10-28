import { RequestHandler } from "express";
import { Qak } from "../models/qak";
import { verifyUser } from "../services/auth";
import { User } from "../models/user";
import { QakReply } from "../models/qakReply";

export const getAllQaks: RequestHandler = async (req, res, next) => {
  let qaks = await Qak.findAll({
    include: [{ all: true, nested: true }],
  });
  res.status(200).json(qaks);
};

export const createQak: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req);

  if (!user) {
    return res.status(403).send("Unauthorized");
  }

  let newQak: Qak = req.body;
  newQak.user_id = user.user_id;

  if (newQak.qak) {
    let created = await Qak.create(newQak);
    res.status(201).json(created);
  } else {
    res.status(400).send("Bad Request");
  }
};

export const getOneQak: RequestHandler = async (req, res, next) => {
  let qak_id = req.params.qak_id;
  let qakFound = await Qak.findByPk(qak_id);
  if (qakFound) {
    res.status(200).json(qakFound);
  } else {
    res.status(404).json({});
  }
};

export const updateQak: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req);

  if (user) {
    let qak_id = req.params.qak_id;
    let updatedQak: Qak = req.body;

    updatedQak.user_id = user.user_id;

    let qakFound = await Qak.findByPk(qak_id);

    qakFound && qakFound.qak_id == updatedQak.qak_id && updatedQak.qak;
    {
      await Qak.update(updatedQak, {
        where: { qak_id: qak_id },
      }).then;
    }
    res.status(200).json(updatedQak);
  } else {
    res.status(400).json("Bad Request");
  }
};

export const deleteQak: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req);

  if (user) {
    let qak_id = req.params.id;
    let qakFound = await Qak.findByPk(qak_id);

    if (qakFound) {
      await Qak.destroy({
        where: { qak_id: qak_id },
      });
      res.status(200).json();
    } else {
      res.status(404).json("Bad Request");
    }
  }
};
