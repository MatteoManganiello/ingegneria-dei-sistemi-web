const express = require("express");
const db = require("../config/db");
const crypto = require("crypto");

const router = express.Router();

// Endpoint per il login degli utenti
router.post("/", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username e password sono obbligatori");
  }

  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

  const query = "SELECT * FROM registrazione WHERE username = ? AND password = ?";
  db.query(query, [username, hashedPassword], (err, results) => {
    if (err) {
      console.error("Errore durante il login:", err);
      return res.status(500).send("Errore durante il login");
    }

    if (results.length === 0) {
      return res.status(401).send("Credenziali non valide");
    }

    res.status(200).json({ message: "Login effettuato con successo" });
  });
});

module.exports = router;

