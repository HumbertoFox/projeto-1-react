<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
include_once 'mysqliconnection.php';
if (mysqli_connect_error()) {
    die("Erro na conexão: " . mysqli_connect_error());
} else {
    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    $cpf = $dData['cpf'];
    $password = $dData['password'];
    $result = [];

    if ($cpf != "" && $password != "") {
        $sql = "SELECT * FROM user WHERE cpf=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $cpf);
        $stmt->execute();
        $res = $stmt->get_result();

        if (mysqli_num_rows($res) != 0) {
            $row = mysqli_fetch_array($res);
            if ($password != $row['password']) {
                $response[] = array("result" => "Senha Invalida!");
            } else {
                $userData = array(
                    "id" => $row["user_id"],
                    "email" => $row["email"]
                );
                $response[] = array(
                    "result" => "Login com Sucesso! Redirecionando ...",
                    "user" => $userData
                );
            }
        } else {
            $response[] = array("result" => "CPF não Cadastrado!");
        };
    } else {
        $response[] = array("result" => "All fields are required!");
    };

    $conn->close();
    http_response_code(200);
    echo json_encode($response);
};