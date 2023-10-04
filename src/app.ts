import express, {Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { db } from "./models";
import qakRoutes from "./routes/qakRoutes";
import userRoutes from "./routes/userRoutes";


const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:3001"]
};
const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// routes
app.use("/api/qaks", qakRoutes);
app.use("/api/users", userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).end();
});

// Syncing our database
//alter:true is needed for schema updates
db.sync({ alter: true }).then(() => {
  console.info("Connected to the database");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});