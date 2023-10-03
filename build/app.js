"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const sequelize_1 = require("sequelize");
const models_1 = require("./models");
const body_parser_1 = __importDefault(require("body-parser"));
const qakRoutes_1 = __importDefault(require("./routes/qakRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const user_1 = require("./models/user");
const qak_1 = require("./models/qak");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Search Endpoint for both users and qaks:
app.get("/search", async (req, res) => {
    const query = req.query.q;
    try {
        const users = await user_1.User.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { fullname: { [sequelize_1.Op.like]: `%${query}%` } },
                    { username: { [sequelize_1.Op.like]: `%${query}%` } },
                    { email: { [sequelize_1.Op.like]: `%${query}%` } },
                    { city: { [sequelize_1.Op.like]: `%${query}%` } },
                    { state: { [sequelize_1.Op.like]: `%${query}%` } },
                ],
            },
        });
        const qaks = await qak_1.Qak.findAll({
            where: {
                qak: { [sequelize_1.Op.like]: `%${query}%` },
            },
        });
        res.json({ users, qaks });
    }
    catch (error) {
        console.error("Error during search:", error);
        res.status(500).send("Error during search");
    }
});
// routes
app.use("/api/qaks", qakRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
// Syncing our database
models_1.db.sync({ alter: true }).then(() => {
    console.info("Connected to the database");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
function alert(arg0) {
    throw new Error("Function not implemented.");
}
