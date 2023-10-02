"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserQak = exports.QakFactory = exports.Qak = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("../models/user");
class Qak extends sequelize_1.Model {
}
exports.Qak = Qak;
function QakFactory(sequelize) {
    Qak.init({
        qak_id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        qak: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        freezeTableName: true,
        tableName: "qaks",
        sequelize,
    });
}
exports.QakFactory = QakFactory;
function AssociateUserQak() {
    user_1.User.hasMany(Qak, { foreignKey: "user_id" });
    Qak.belongsTo(user_1.User, { foreignKey: "user_id" });
}
exports.AssociateUserQak = AssociateUserQak;
