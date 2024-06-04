<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "test";

$conn = new mysqli($host, $usuario, $senha, $banco);

if (mysqli_connect_error()) {
    die("Erro na conexão: " . mysqli_connect_error());
} else {
    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    $user = $dData['user'];
    $pass = $dData['pass'];
    $result = "";

    if ($user != "" && $pass != "") {
        $sql = "SELECT * FROM user WHERE user=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $res = $stmt->get_result();

        if (mysqli_num_rows($res) != 0) {
            $row = mysqli_fetch_array($res);
            if ($pass != $row['pass']) {
                $result = "Invalid password!";
            } else {
                $result = "Loggedin successfully! Redirecting ...";
            }
        } else {
            $result = "Invalid username!";
        };
    } else {
        $result = "";
    };

    $conn->close();
    $response[] = array("result" => $result);
    echo json_encode($response);
};
