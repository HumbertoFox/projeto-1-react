<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'pdoconnection.php';
$query_get_patient = "SELECT patients.cpf, name, dateofbirth, patients.telephone, email, patients.address_id, address_all.zipcode,
residencenumber, building, buildingblock, apartment, street, district, city FROM patients JOIN cpf on patients.cpf = cpf.cpf JOIN
telephone on patients.telephone = telephone.telephone JOIN address_all on patients.address_id = address_all.address_id JOIN
zipcode on address_all.zipcode = zipcode.zipcode WHERE patients.cpf = 00000000000";
$result_patient = $conn->prepare($query_get_patient);
$result_patient->execute();
if (($result_patient) && ($result_patient->rowCount() != 0)) {
    while ($row_patient = $result_patient->fetch(PDO::FETCH_ASSOC)) {
        extract($row_patient);
        $list_patient['rescods'][$cpf] = [
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
            'residencenumber' => $residencenumber,
            'building' => $building,
            'buildingblock' => $buildingblock,
            'apartment' => $apartment
        ];
    };
    http_response_code(200);
    echo json_encode($list_patient);
};