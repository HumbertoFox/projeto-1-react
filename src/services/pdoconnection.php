<?php

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "test";

$conn = new PDO("mysql:host=$host;dbname=" . $dbname, $user, $pass);