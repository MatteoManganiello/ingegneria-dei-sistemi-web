const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Creare un ordine
router.post("/", (req, res) => {
  const { customer_name, customer_address, customer_phone, items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).send("Nessun articolo specificato per l'ordine");
  }

  const total_price = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const query = `INSERT INTO orders (customer_name, customer_address, customer_phone, total_price) VALUES (?, ?, ?, ?)`;

  db.query(query, [customer_name, customer_address, customer_phone, total_price], (err) => {
    if (err) res.status(500).send("Errore durante l'inserimento dell'ordine");
    else res.status(201).send("Ordine creato con successo");
  });
});

module.exports = router;
