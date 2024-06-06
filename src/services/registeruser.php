<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include_once 'pdoconnection.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if ($dados) {
    $query_adduser = "INSERT INTO user (name, cpf, telephone, email, password) VALUES (:name, :cpf, :telephone, :email, :password)";
    $cad_user = $conn->prepare($query_adduser);

    $cad_user->bindParam(':name', $dados['name'], PDO::PARAM_STR);
    $cad_user->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
    $cad_user->bindParam(':telephone', $dados['telephone'], PDO::PARAM_STR);
    $cad_user->bindParam(':email', $dados['email'], PDO::PARAM_STR);
    $cad_user->bindParam(':password', $dados['password'], PDO::PARAM_STR);

    $cad_user->execute();

    if ($cad_user->rowCount()) {
        $response = [
            "erro" => false,
            "message" => 'Usuário Cadastrado com Sucesso!'
        ];
    } else {
        $response = [
            "erro" => true,
            "message" => 'Usuário não Cadastrado!'
        ];
    };
} else {
    $response = [
        "erro" => true,
        "message" => 'Usuário não Cadastrado!'
    ];
};

http_response_code(200);
echo json_encode($response);