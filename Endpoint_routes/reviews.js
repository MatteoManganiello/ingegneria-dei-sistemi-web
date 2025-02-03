const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Endpoint per aggiungere una recensione
router.post("/", (req, res) => {
  const { username, rating, comment } = req.body;

  if (!username || !rating || !comment) {
    return res.status(400).send("Tutti i campi sono obbligatori");
  }

  const query = "INSERT INTO site_reviews (username, rating, comment) VALUES (?, ?, ?)";
  db.query(query, [username, rating, comment], (err) => {
    if (err) {
      console.error("Errore durante l'inserimento della recensione:", err);
      return res.status(500).send("Errore durante l'inserimento della recensione");
    }
    res.status(201).send("Recensione salvata con successo");
  });
});

// Endpoint per ottenere tutte le recensioni
router.get("/", (req, res) => {
  const query = "SELECT * FROM site_reviews ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Errore durante il recupero delle recensioni:", err);
      return res.status(500).send("Errore durante il recupero delle recensioni");
    }
    res.json(results);
  });
});

module.exports = router;

