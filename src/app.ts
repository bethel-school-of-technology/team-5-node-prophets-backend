import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { Op } from "sequelize";
import { db } from "./models";
import bodyParser from "body-parser";
import qakRoutes from "./routes/qakRoutes";
import userRoutes from "./routes/userRoutes";
import rssRoutes from "./routes/rssRoutes";
import { User } from "./models/user";
import { Qak } from "./models/qak";
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:3001"]
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Search for both users and qaks:
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
          { state: { [Op.like]: `%${query}%` } }
        ]
      }
    });

    const qaks = await Qak.findAll({
      where: {
        qak: { [Op.like]: `%${query}%` }
      }
    });

    res.json({ users, qaks });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).send("Error during search");
  }
});

// Routes
app.use("/api/qaks", qakRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rss", rssRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).end();
});

// Syncing our database
db.sync({ alter: true }).then(() => {
  console.info("Connected to the database");
});

app.listen(3000, () => {
  console.info(`Server is running on port 3000`);
});
