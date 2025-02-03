const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Ottenere tutti i burger
router.get("/", (req, res) => {
  const query = "SELECT * FROM burgers";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Errore nel recupero dei dati");
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
