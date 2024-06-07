<?php

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "consult_db";

$conn = new PDO("mysql:host=$host;dbname=" . $dbname, $user, $pass);