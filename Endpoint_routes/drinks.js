const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Ottenere tutte le bevande
router.get("/", (req, res) => {
  const query = "SELECT * FROM drinks";
  db.query(query, (err, results) => {
    if (err) res.status(500).send("Errore nel recupero delle bevande");
    else res.json(results);
  });
});

module.exports = router;
