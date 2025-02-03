const express = require("express");
const db = require("../config/db");
const crypto = require("crypto");

const router = express.Router();

// Endpoint per registrare un nuovo utente
router.post("/", (req, res) => {
    const { username, password, indirizzo, telefono } = req.body;
  
    if (!username || !password || !indirizzo || !telefono) {
      return res.status(400).send("Tutti i campi sono obbligatori");
    }
  
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
  
    const query = "INSERT INTO registrazione (username, password, indirizzo, telefono) VALUES (?, ?, ?, ?)";
    db.query(query, [username, hashedPassword, indirizzo, telefono], (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).send("Username già in uso");
        }
        console.error("Errore durante la registrazione:", err);
        return res.status(500).send("Errore durante la registrazione");
      }
      res.status(201).send("Registrazione completata con successo");
    });
});

module.exports = router;
