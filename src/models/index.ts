import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { QakFactory, AssociateUserQak } from "./qak";

const dbName = "etmDB";
const username = "root";
const password = "Password1!";

const sequelize = new Sequelize(dbName, username, password, {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

UserFactory(sequelize);
QakFactory(sequelize);
AssociateUserQak();

export const db = sequelize;
