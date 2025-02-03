<?php
require_once 'db.php'; // Include la connessione al database

if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Controlla se la richiesta è POST
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $indirizzo = trim($_POST['indirizzo']);
    $telefono = trim($_POST['telefono']);

    // Verifica che tutti i campi siano compilati
    if (empty($username) || empty($password) || empty($indirizzo) || empty($telefono)) {
        http_response_code(400); // Errore richiesta
        echo "Tutti i campi sono obbligatori.";
        exit();
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT); // Crittografa la password

    try {
        // Inserisce l'utente nel database con i nuovi campi
        $stmt = $pdo->prepare("INSERT INTO users (username, password, indirizzo, telefono) VALUES (?, ?, ?, ?)");
        if ($stmt->execute([$username, $hashedPassword, $indirizzo, $telefono])) {
            echo "Registrazione completata.";
        } else {
            http_response_code(500); // Errore server
            echo "Errore durante la registrazione.";
        }
    } catch (PDOException $e) {
        // Gestisce errori specifici, ad esempio username già esistente
        if ($e->getCode() == 23000) { 
            http_response_code(400);
            echo "Errore: username già in uso.";
        } else {
            http_response_code(500);
            echo "Errore: " . $e->getMessage();
        }
    }
} else {
    http_response_code(405); // Metodo non consentito
}
?>
