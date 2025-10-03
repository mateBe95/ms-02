import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import datasetsController from "./server/controllers/datasetsController.js";
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serwowanie statycznych plików frontendu
app.use(express.static(path.join(__dirname, "build/client")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/dist/index.html"));
// });

app.use("/ui/api/datasets", datasetsController);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`BFF running on port ${PORT}`));