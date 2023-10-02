import express from "express";
import morgan from "morgan";
import { db } from "./models";
import qakRoutes from "./routes/qakRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/qaks", qakRoutes);
app.use("/api/users", userRoutes);

// Syncing our database
//alter:true is needed for schema updates
db.sync({ alter: true }).then(() => {
  console.info("Connected to the database");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
