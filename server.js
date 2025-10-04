import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import datasetsController from "./server/controllers/datasetsController.js";
import suggestionsController from "./server/controllers/suggestionsController.js";
import reviewsController from "./server/controllers/reviewsController.js";
import commentsController from "./server/controllers/commentsController.js";

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
app.use("/ui/api/suggestions", suggestionsController);
app.use("/ui/api/reviews", reviewsController);
app.use("/ui/api/comments", commentsController);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`BFF running on port ${PORT}`));