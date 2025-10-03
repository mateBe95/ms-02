import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {

  try {
    // Przykład: pobranie użytkownika z zewnętrznego API
    const response = await axios.get(`https://ms-02-api.netlify.app/api/datasets`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Nie udało się pobrać danych" });
  }
});

export default router;