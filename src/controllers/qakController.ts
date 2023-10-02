import { RequestHandler } from "express";
import { Qak } from "../models/qak";
import { verifyUser } from "../services/auth";
import { User } from "../models/user";

export const getAllQaks: RequestHandler = async (req, res, next) => {
  let qaks = await Qak.findAll();
  res.status(200).json(qaks);
};

export const createQak: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req);

  if (!user) {
    return res.status(403).send();
  }

  let newQak: Qak = req.body;
  newQak.user_id = user.user_id;

  if (newQak.qak) {
    let created = await Qak.create(newQak);
    res.status(201).json(created);
  } else {
    res.status(400).send();
  }
};

export const getQak: RequestHandler = async (req, res, next) => {
  let qak_id = req.params.id;
  let qakFound = await Qak.findByPk(qak_id);
  if (qakFound) {
    res.status(200).json(qakFound);
  } else {
    res.status(404).json({});
  }
};

export const updateQak: RequestHandler = async (req, res, next) => {
  let qak_id = req.params.id;
  let newQak: Qak = req.body;

  let qakFound = await Qak.findByPk(qak_id);

  if (qakFound && qakFound.qak_id == newQak.qak_id && newQak.qak) {
    await Qak.update(newQak, {
      where: { qak_id: qak_id },
    });
    res.status(200).json();
  } else {
    res.status(400).json();
  }
};

export const deleteQak: RequestHandler = async (req, res, next) => {
  let qak_id = req.params.id;
  let qakFound = await Qak.findByPk(qak_id);

  if (qakFound) {
    await Qak.destroy({
      where: { qak_id: qak_id },
    });
    res.status(200).json();
  } else {
    res.status(404).json();
  }
};
