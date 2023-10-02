"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const qak_1 = require("./qak");
const dbName = "etmDB";
const username = "root";
const password = "Password1!";
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
});
(0, user_1.UserFactory)(sequelize);
(0, qak_1.QakFactory)(sequelize);
(0, qak_1.AssociateUserQak)();
exports.db = sequelize;
