import express from "express";
import morgan from "morgan";
import { Op } from "sequelize";
import { db } from "./models";
import bodyParser from "body-parser";
import qakRoutes from "./routes/qakRoutes";
import userRoutes from "./routes/userRoutes";
import { User } from "./models/user";
import { Qak } from "./models/qak";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Search Endpoint for both users and qaks:
app.get("/search", async (req, res) => {
  const query = req.query.q;

  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { fullname: { [Op.like]: `%${query}%` } },
          { username: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } },
          { city: { [Op.like]: `%${query}%` } },
          { state: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    const qaks = await Qak.findAll({
      where: {
        qak: { [Op.like]: `%${query}%` },
      },
    });

    res.json({ users, qaks });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).send("Error during search");
  }
});

// routes
app.use("/api/qaks", qakRoutes);
app.use("/api/users", userRoutes);

// Syncing our database
db.sync({ alter: true }).then(() => {
  console.info("Connected to the database");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
function alert(arg0: string) {
  throw new Error("Function not implemented.");
}
