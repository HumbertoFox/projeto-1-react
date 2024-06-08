<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
include_once 'pdoconnection.php';
$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);
if (!empty($dados)) {
    $query_user = "SELECT user_id, cpf, email, password FROM user WHERE cpf = :cpf LIMIT 1";
    $checked_user = $conn->prepare($query_user);
    $checked_user->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
    $checked_user->execute();
    if (($checked_user) && ($checked_user->rowCount() != 0)) {
        $row_user = $checked_user->fetch(PDO::FETCH_ASSOC);
        if (password_verify($dados['password'], $row_user['password'])) {
            $userData = array(
                "id" => $row_user["user_id"],
                "email" => $row_user["email"]
            );
            $response[] = array(
                "error" => false,
                "message" => 'Usuário logado com Sucesso! Redirecionando ...',
                "user" => $userData,
            );
        } else {
            $response = [
                "error" => true,
                "message" => 'CPF ou Senha Invalidos!'
            ];
        };
    } else {
        $response = [
            "error" => true,
            "message" => 'CPF ou Senha Invalidos!'
        ];
    };
};
http_response_code(200);
echo json_encode($response);