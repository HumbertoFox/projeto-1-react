<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "consult_db";
try {
    $conn = new PDO("mysql:host=$host;dbname=" . $dbname, $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $element) {
    echo json_encode(['error' => true, 'message' => 'Connection failed: ' . $element->getMessage()]);
    exit;
};