/**
 * Connessione al database MySQL utilizzando il modulo mysql2.
 * Questo modulo crea una connessione a MySQL e la esporta per essere utilizzata in altre parti dell'applicazione.
 */



const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "databurger",
});

db.connect((err) => {
  if (err) {
    console.error("Errore nella connessione al database:", err);
    process.exit(1);
  }
  console.log("Connesso al database MySQL");
});

module.exports = db;
