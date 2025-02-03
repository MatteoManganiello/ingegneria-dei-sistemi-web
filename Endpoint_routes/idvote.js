const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Endpoint per votare un panino
router.post("/:id/vote", (req, res) => {
  const burgerId = req.params.id;

  if (!burgerId) {
    return res.status(400).json({ error: "ID del panino non fornito." });
  }

  const insertVoteQuery = "INSERT INTO burger_votes (burger_id) VALUES (?)";
  db.query(insertVoteQuery, [burgerId], (err) => {
    if (err) {
      console.error("Errore durante l'inserimento del voto:", err);
      return res.status(500).json({ error: "Errore durante il voto." });
    }

    const updateVotesQuery = "UPDATE burgers SET votes = votes + 1 WHERE id = ?";
    db.query(updateVotesQuery, [burgerId], (err) => {
      if (err) {
        console.error("Errore durante l'aggiornamento dei voti:", err);
        return res.status(500).json({ error: "Errore durante l'aggiornamento dei voti." });
      }

      res.status(200).json({ message: "Voto registrato con successo!" });
    });
  });
});

module.exports = router;
