"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQak = exports.updateQak = exports.getQak = exports.createQak = exports.getAllQaks = void 0;
const qak_1 = require("../models/qak");
const auth_1 = require("../services/auth");
const getAllQaks = async (req, res, next) => {
    let qaks = await qak_1.Qak.findAll();
    res.status(200).json(qaks);
};
exports.getAllQaks = getAllQaks;
const createQak = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newQak = req.body;
    newQak.user_id = user.user_id;
    if (newQak.qak) {
        let created = await qak_1.Qak.create(newQak);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createQak = createQak;
const getQak = async (req, res, next) => {
    let qak_id = req.params.id;
    let qakFound = await qak_1.Qak.findByPk(qak_id);
    if (qakFound) {
        res.status(200).json(qakFound);
    }
    else {
        res.status(404).json({});
    }
};
exports.getQak = getQak;
const updateQak = async (req, res, next) => {
    let qak_id = req.params.id;
    let newQak = req.body;
    let qakFound = await qak_1.Qak.findByPk(qak_id);
    if (qakFound && qakFound.qak_id == newQak.qak_id && newQak.qak) {
        await qak_1.Qak.update(newQak, {
            where: { qak_id: qak_id },
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};
exports.updateQak = updateQak;
const deleteQak = async (req, res, next) => {
    let qak_id = req.params.id;
    let qakFound = await qak_1.Qak.findByPk(qak_id);
    if (qakFound) {
        await qak_1.Qak.destroy({
            where: { qak_id: qak_id },
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deleteQak = deleteQak;
