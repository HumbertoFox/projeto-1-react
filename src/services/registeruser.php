<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
include_once 'pdoconnection.php';
$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);
$dados['password'] = password_hash($dados['password'], PASSWORD_DEFAULT);
if ($dados) {
    $query_checked_cpf = "SELECT COUNT(*) FROM cpf WHERE cpf = :cpf";
    $checked_cpf = $conn->prepare($query_checked_cpf);
    $checked_cpf->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
    $checked_cpf->execute();
    $cpf_count = $checked_cpf->fetchColumn();
    if ($cpf_count > 0) {
        $response = [
            "erro" => true,
            "message" => 'CPF já cadastrado!'
        ];
    } else {
        $query_addcpf = "INSERT INTO cpf (cpf, name, dateofbirth) VALUES (:cpf, :name, :dateofbirth)";
        $cad_cpf = $conn->prepare($query_addcpf);
        $cad_cpf->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
        $cad_cpf->bindParam(':name', $dados['name'], PDO::PARAM_STR);
        $cad_cpf->bindParam(':dateofbirth', $dados['dateofbirth'], PDO::PARAM_STR);
        $cad_cpf->execute();
        $query_checked_telephone = "SELECT COUNT(*) FROM telephone WHERE telephone = :telephone";
        $checked_telephone = $conn->prepare($query_checked_telephone);
        $checked_telephone->bindParam(':telephone', $dados['telephone'], PDO::PARAM_STR);
        $checked_telephone->execute();
        $telephone_count = $checked_telephone->fetchColumn();
        if ($telephone_count === 0) {
            $query_addtelephone = "INSERT INTO telephone (telephone) VALUES (:telephone)";
            $cad_telephone = $conn->prepare($query_addtelephone);
            $cad_telephone->bindParam(':telephone', $dados['telephone'], PDO::PARAM_STR);
            $cad_telephone->execute();
        };
        $query_checked_zipcode = "SELECT COUNT(*) FROM zipcode WHERE zipcode = :zipcode";
        $checked_zipcode = $conn->prepare($query_checked_zipcode);
        $checked_zipcode->bindParam(':zipcode', $dados['zipcode'], PDO::PARAM_STR);
        $checked_zipcode->execute();
        $zipcode_count = $checked_zipcode->fetchColumn();
        if ($zipcode_count === 0) {
            $query_addzipcode = "INSERT INTO zipcode (zipcode, street, district, city) VALUES (:zipcode, :street, :district, :city)";
            $cad_zipcode = $conn->prepare($query_addzipcode);
            $cad_zipcode->bindParam(':zipcode', $dados['zipcode'], PDO::PARAM_STR);
            $cad_zipcode->bindParam(':street', $dados['street'], PDO::PARAM_STR);
            $cad_zipcode->bindParam(':district', $dados['district'], PDO::PARAM_STR);
            $cad_zipcode->bindParam(':city', $dados['city'], PDO::PARAM_STR);
            $cad_zipcode->execute();
        };
        $query_addaddress_all = "INSERT INTO address_all (zipcode, residencenumber, building, buildingblock, apartment) VALUES (:zipcode, :residencenumber, :building, :buildingblock, :apartment)";
        $cad_addaddress_all = $conn->prepare($query_addaddress_all);
        $cad_addaddress_all->bindParam(':zipcode', $dados['zipcode'], PDO::PARAM_STR);
        $cad_addaddress_all->bindParam(':residencenumber', $dados['residencenumber'], PDO::PARAM_STR);
        $cad_addaddress_all->bindParam(':building', $dados['building'], PDO::PARAM_STR);
        $cad_addaddress_all->bindParam(':buildingblock', $dados['buildingblock'], PDO::PARAM_STR);
        $cad_addaddress_all->bindParam(':apartment', $dados['apartment'], PDO::PARAM_STR);
        $cad_addaddress_all->execute();
        $address_id = $conn->lastInsertId();
        $query_adduser = "INSERT INTO user (cpf, telephone, email, password, address_id) VALUES (:cpf, :telephone, :email, :password, :address_id)";
        $cad_user = $conn->prepare($query_adduser);
        $cad_user->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
        $cad_user->bindParam(':email', $dados['email'], PDO::PARAM_STR);
        $cad_user->bindParam(':telephone', $dados['telephone'], PDO::PARAM_STR);
        $cad_user->bindParam(':password', $dados['password'], PDO::PARAM_STR);
        $cad_user->bindParam(':address_id', $address_id, PDO::PARAM_INT);
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
    };
} else {
    $response = [
        "erro" => true,
        "message" => 'Usuário não Cadastrado!'
    ];
};
http_response_code(200);
echo json_encode($response);