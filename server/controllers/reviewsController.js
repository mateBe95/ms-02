import express from "express";
import axios from "axios";
import { getApiBase } from "../utils/getApiBase.js";

const router = express.Router();

// Wszystkie recenzje
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${getApiBase()}/reviews`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Nie udało się pobrać recenzji: ${error.message}` });
  }
});

// Szczegóły recenzji
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(`${getApiBase()}/reviews/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Nie udało się pobrać recenzji: ${error.message}` });
  }
});

// Recenzje dla zbioru
router.get("/datasets/:id/reviews", async (req, res) => {
  try {
    const response = await axios.get(`${getApiBase()}/reviews/datasets/${req.params.id}/reviews`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Nie udało się pobrać recenzji dla zbioru: ${error.message}` });
  }
});

// Dodaj nową recenzję
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(`${getApiBase()}/reviews`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Nie udało się dodać recenzji: ${error.message}` });
  }
});

// Aktualizacja recenzji
router.put("/:id", async (req, res) => {
  try {
    const response = await axios.put(`${getApiBase()}/reviews/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Nie udało się zaktualizować recenzji: ${error.message}` });
  }
});

// Usunięcie recenzji
router.delete("/:id", async (req, res) => {
  try {
    const response = await axios.delete(`${getApiBase()}/reviews/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Nie udało się usunąć recenzji: ${error.message}` });
  }
});

// Upvote recenzji
router.post("/:id/upvote", async (req, res) => {
  try {
    const response = await axios.post(`${getApiBase()}/reviews/${req.params.id}/upvote`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Nie udało się zagłosować na recenzję: ${error.message}` });
  }
});

export default router;
