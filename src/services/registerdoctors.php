<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
include_once 'pdoconnection.php';
$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);
if ($dados) {
    $query_checked_crm = "SELECT COUNT(*) FROM doctors WHERE crm = :crm";
    $checked_crm = $conn->prepare($query_checked_crm);
    $checked_crm->bindParam(':crm', $dados['crm'], PDO::PARAM_STR);
    $checked_crm->execute();
    $crm_count = $checked_crm->fetchColumn();
    if ($crm_count > 0) {
        $response = [
            "error" => true,
            "message" => "CRM já Cadastrados!"
        ];
    } else if ($crm_count === 0) {
        $query_checked_cpf_crm = "SELECT crm ,COUNT(*) AS count FROM doctors WHERE cpf = :cpf GROUP BY crm";
        $checked_cpf_crm = $conn->prepare($query_checked_cpf_crm);
        $checked_cpf_crm->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
        $checked_cpf_crm->execute();
        $cpf_crm_count = $checked_cpf_crm->fetchColumn();
        if ($cpf_crm_count > 0) {
            $response = [
                "error" => true,
                "message" => "CPF já Associado a outro CRM!"
            ];
        } else {
            $query_add_crm = "INSERT INTO crm (crm) VALUES (:crm)";
            $cad_crm = $conn->prepare($query_add_crm);
            $cad_crm->bindParam(':crm', $dados['crm'], PDO::PARAM_STR);
            $cad_crm->execute();
            $query_checked_cpf = "SELECT COUNT(*) FROM cpf WHERE cpf = :cpf";
            $checked_cpf = $conn->prepare($query_checked_cpf);
            $checked_cpf->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
            $checked_cpf->execute();
            $cpf_count = $checked_cpf->fetchColumn();
            if ($cpf_count == 0) {
                $query_addcpf = "INSERT INTO cpf (cpf, name, dateofbirth) VALUES (:cpf, :name, :dateofbirth)";
                $cad_cpf = $conn->prepare($query_addcpf);
                $cad_cpf->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
                $cad_cpf->bindParam(':name', $dados['name'], PDO::PARAM_STR);
                $cad_cpf->bindParam(':dateofbirth', $dados['dateofbirth'], PDO::PARAM_STR);
                $cad_cpf->execute();
            };
            $query_checked_telephone = "SELECT COUNT(*) FROM telephone WHERE telephone = :telephone";
            $checked_telephone = $conn->prepare($query_checked_telephone);
            $checked_telephone->bindParam(':telephone', $dados['telephone'], PDO::PARAM_STR);
            $checked_telephone->execute();
            $telephone_count = $checked_telephone->fetchColumn();
            if ($telephone_count == 0) {
                $query_addtelephone = "INSERT INTO telephone (telephone, email) VALUES (:telephone, :email)";
                $cad_telephone = $conn->prepare($query_addtelephone);
                $cad_telephone->bindParam(':telephone', $dados['telephone'], PDO::PARAM_STR);
                $cad_telephone->bindParam(':email', $dados['email'], PDO::PARAM_STR);
                $cad_telephone->execute();
            };
            $query_checked_zipcode = "SELECT COUNT(*) FROM zipcode WHERE zipcode = :zipcode";
            $checked_zipcode = $conn->prepare($query_checked_zipcode);
            $checked_zipcode->bindParam(':zipcode', $dados['zipcode'], PDO::PARAM_STR);
            $checked_zipcode->execute();
            $zipcode_count = $checked_zipcode->fetchColumn();
            if ($zipcode_count == 0) {
                $query_addzipcode = "INSERT INTO zipcode (zipcode, street, district, city) VALUES (:zipcode, :street, :district, :city)";
                $cad_zipcode = $conn->prepare($query_addzipcode);
                $cad_zipcode->bindParam(':zipcode', $dados['zipcode'], PDO::PARAM_STR);
                $cad_zipcode->bindParam(':street', $dados['street'], PDO::PARAM_STR);
                $cad_zipcode->bindParam(':district', $dados['district'], PDO::PARAM_STR);
                $cad_zipcode->bindParam(':city', $dados['city'], PDO::PARAM_STR);
                $cad_zipcode->execute();
            };
            $query_get_address_id = "SELECT address_id FROM address_all WHERE zipcode = :zipcode AND residencenumber = :residencenumber AND building = :building AND buildingblock = :buildingblock AND apartment = :apartment";
            $get_address_id = $conn->prepare($query_get_address_id);
            $get_address_id->bindParam(':zipcode', $dados['zipcode'], PDO::PARAM_STR);
            $get_address_id->bindParam(':residencenumber', $dados['residencenumber'], PDO::PARAM_STR);
            $get_address_id->bindParam(':building', $dados['building'], PDO::PARAM_STR);
            $get_address_id->bindParam(':buildingblock', $dados['buildingblock'], PDO::PARAM_STR);
            $get_address_id->bindParam(':apartment', $dados['apartment'], PDO::PARAM_STR);
            $get_address_id->execute();
            $address_id = $get_address_id->fetchColumn();
            if ($address_id == false) {
                $query_addaddress_all = "INSERT INTO address_all (zipcode, residencenumber, building, buildingblock, apartment) VALUES (:zipcode, :residencenumber, :building, :buildingblock, :apartment)";
                $cad_addaddress_all = $conn->prepare($query_addaddress_all);
                $cad_addaddress_all->bindParam(':zipcode', $dados['zipcode'], PDO::PARAM_STR);
                $cad_addaddress_all->bindParam(':residencenumber', $dados['residencenumber'], PDO::PARAM_STR);
                $cad_addaddress_all->bindParam(':building', $dados['building'], PDO::PARAM_STR);
                $cad_addaddress_all->bindParam(':buildingblock', $dados['buildingblock'], PDO::PARAM_STR);
                $cad_addaddress_all->bindParam(':apartment', $dados['apartment'], PDO::PARAM_STR);
                $cad_addaddress_all->execute();
                $address_id = $conn->lastInsertId();
            };
            $query_add_doctor = "INSERT INTO doctors (crm, cpf, telephone, address_id, user_id) VALUES (:crm, :cpf, :telephone, :address_id, :user_id)";
            $cad_doctor = $conn->prepare($query_add_doctor);
            $cad_doctor->bindParam(':crm', $dados['crm'], PDO::PARAM_STR);
            $cad_doctor->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
            $cad_doctor->bindParam(':telephone', $dados['telephone'], PDO::PARAM_STR);
            $cad_doctor->bindParam(':address_id', $address_id, PDO::PARAM_INT);
            $cad_doctor->bindParam(':user_id', $dados['user_id'], PDO::PARAM_INT);
            $cad_doctor->execute();
            if ($cad_doctor->rowCount()) {
                $response = [
                    "error" => false,
                    "message" => 'Doutor Cadastrado com Sucesso!'
                ];
            } else {
                $response = [
                    "error" => true,
                    "message" => 'Doutor não Cadastrado!'
                ];
            };
        };
    };
    http_response_code(200);
    echo json_encode($response);
} else {
    $response = [
        "error" => true,
        "message" => 'Doutor não Cadastrado!'
    ];
};