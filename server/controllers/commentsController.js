import express from "express";
import axios from "axios";
import { getApiBase } from "../utils/getApiBase.js";

const router = express.Router();

// 🟢 Wszystkie komentarze
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${getApiBase()}/comments`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Nie udało się pobrać komentarzy: ${error.message}` });
  }
});

// 🟢 Komentarze dla danej recenzji
router.get("/reviews/:id", async (req, res) => {
  try {
    const response = await axios.get(`${getApiBase()}/comments/reviews/${req.params.id}/comments`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Nie udało się pobrać komentarzy dla recenzji: ${error.message}` });
  }
});

// 🟢 Dodaj nowy komentarz
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(`${getApiBase()}/comments`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Nie udało się dodać komentarza: ${error.message}` });
  }
});

// 🟢 Aktualizuj komentarz
router.put("/:id", async (req, res) => {
  try {
    const response = await axios.put(`${getApiBase()}/comments/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Nie udało się zaktualizować komentarza: ${error.message}` });
  }
});

// 🟢 Usuń komentarz
router.delete("/:id", async (req, res) => {
  try {
    const response = await axios.delete(`${getApiBase()}/comments/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Nie udało się usunąć komentarza: ${error.message}` });
  }
});

export default router;
