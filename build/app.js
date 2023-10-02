"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const models_1 = require("./models");
const qakRoutes_1 = __importDefault(require("./routes/qakRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use("/api/qaks", qakRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
// Syncing our database
//alter:true is needed for schema updates
models_1.db.sync({ alter: true }).then(() => {
    console.info("Connected to the database");
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
