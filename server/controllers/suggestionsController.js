import express from "express";
import axios from "axios";
import { getApiBase } from "../utils/getApiBase.js";

const router = express.Router();

// Wszystkie sugestie
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${getApiBase()}/suggestions`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Nie udało się pobrać sugestii" });
  }
});

// Sugestie dla zbioru
router.get("/datasets/:id", async (req, res) => {
    console.log("elo", req.params.id)
  try {
    const response = await axios.get(`${getApiBase()}/suggestions/datasets/${req.params.id}/suggestions`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Nie udało się pobrać sugestii dla zbioru ${error.message}` });
  }
});

// Dodaj nową sugestię
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(`${getApiBase()}/suggestions`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Nie udało się dodać sugestii" });
  }
});

// Aktualizuj status sugestii
router.put("/:id", async (req, res) => {
  try {
    const response = await axios.put(`${getApiBase()}/suggestions/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Nie udało się zaktualizować sugestii" });
  }
});

// Głosowanie na sugestię
router.post("/:id/upvote", async (req, res) => {
  try {
    const response = await axios.post(`${getApiBase()}/suggestions/${req.params.id}/upvote`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Nie udało się zagłosować na sugestię" });
  }
});

export default router;