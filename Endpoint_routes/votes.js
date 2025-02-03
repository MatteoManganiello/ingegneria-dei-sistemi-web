const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Endpoint per recuperare la classifica dei panini con voti
router.get("/", (req, res) => {
  const query = `
    SELECT b.id, b.name, b.description, b.image, COUNT(v.id) AS total_votes
    FROM burgers b
    LEFT JOIN burger_votes v ON b.id = v.burger_id
    GROUP BY b.id, b.name, b.description, b.image
    ORDER BY total_votes DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Errore nel recupero dei voti:", err);
      return res.status(500).json({ error: "Errore nel recupero dei voti." });
    }

    res.json(results);
  });
});

module.exports = router;
