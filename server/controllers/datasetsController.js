import express from "express";
import axios from "axios";
import { getApiBase } from "../utils/getApiBase.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${getApiBase()}/datasets`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Nie udało się pobrać danych" });
  }
});

export default router;
