const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Endpoint per creare un panino personalizzato
router.post("/", (req, res) => {
  const { username, burger_name, ingredients } = req.body;

  if (!username || !burger_name || !ingredients || ingredients.length === 0) {
    return res.status(400).send("Tutti i campi sono obbligatori e gli ingredienti non possono essere vuoti.");
  }

  const query = "INSERT INTO custom_burgers (username, burger_name, ingredients) VALUES (?, ?, ?)";
  
  db.query(query, [username, burger_name, JSON.stringify(ingredients)], (err, result) => {
    if (err) {
      console.error("Errore nell'inserimento del panino personalizzato:", err);
      return res.status(500).send("Errore nel salvataggio del panino.");
    }
    
    res.status(201).json({ message: "Panino creato con successo!", burger_id: result.insertId });
  });
});

// Endpoint per ottenere tutti i panini personalizzati
router.get("/", (req, res) => {
  const query = "SELECT * FROM custom_burgers ORDER BY created_at DESC";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Errore nel recupero dei panini personalizzati:", err);
      return res.status(500).send("Errore nel recupero dei panini.");
    }

    res.json(results);
  });
});

module.exports = router;
