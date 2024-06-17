<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
require_once 'pdoconnection.php';
$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);
if ($dados) {
    $query_get_patient = "SELECT patients.cpf, name, dateofbirth, patients.telephone, email, patients.address_id, address_all.zipcode, residencenumber, building, buildingblock, apartment, street, district, city, plan FROM patients JOIN cpf on patients.cpf = cpf.cpf JOIN telephone on patients.telephone = telephone.telephone JOIN address_all on patients.address_id = address_all.address_id JOIN zipcode on address_all.zipcode = zipcode.zipcode JOIN consultation on cpf.cpf = consultation.cpf WHERE patients.cpf = :searchpatient";
    $result_patient = $conn->prepare($query_get_patient);
    $result_patient->bindParam(':searchpatient', $dados['searchpatient'], PDO::PARAM_STR);
    $result_patient->execute();
    if (($result_patient) && ($result_patient->rowCount() != 0)) {
        while ($row_patient = $result_patient->fetch(PDO::FETCH_ASSOC)) {
            extract($row_patient);
            $list_patient['records'] = [
                'cpf' => $cpf,
                'name' => $name,
                'dateofbirth' => $dateofbirth,
                'telephone' => $telephone,
                'email' => $email,
                'address_id' => $address_id,
                'zipcode' => $zipcode,
                'street' => $street,
                'district' => $district,
                'city' => $city,
                'plan' => $plan,
                'residencenumber' => $residencenumber,
                'building' => $building,
                'buildingblock' => $buildingblock,
                'apartment' => $apartment
            ];
        };
        echo json_encode($list_patient);
    };
    http_response_code(200);
};