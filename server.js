import express from "express";
import cors from "cors";
import datasetsController from "./server/controllers/datasetsController.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/ui/api/datasets", datasetsController);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`BFF running on port ${PORT}`));