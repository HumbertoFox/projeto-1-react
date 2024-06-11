<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
include_once 'pdoconnection.php';
$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);
if ($dados) {
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
        $query_checked_telephone = "SELECT COUNT(*) FROM telephone WHERE telephone = :telephone";
        $checked_telephone = $conn->prepare($query_checked_telephone);
        $checked_telephone->bindParam(':telephone', $dados['telephone'], PDO::PARAM_STR);
        $checked_telephone->execute();
        $telephone_count = $checked_telephone->fetchColumn();
        if ($telephone_count == 0) {
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
        $get_address_id->bindParam(':buildingblock', $dados['block'], PDO::PARAM_STR);
        $get_address_id->bindParam(':apartment', $dados['apartment'], PDO::PARAM_STR);
        $get_address_id->execute();
        $address_id = $get_address_id->fetchColumn();
        if ($address_id == false) {
            $query_address_all = "INSERT INTO address_all (zipcode, residencenumber, building, buildingblock, apartment) VALUES (:zipcode, :residencenumber, :building, :buildingblock, :apartment)";
            $cad_address_all = $conn->prepare($query_address_all);
            $cad_address_all->bindParam(':zipcode', $dados['zipcode'], PDO::PARAM_STR);
            $cad_address_all->bindParam(':residencenumber', $dados['residencenumber'], PDO::PARAM_STR);
            $cad_address_all->bindParam(':building', $dados['building'], PDO::PARAM_STR);
            $cad_address_all->bindParam(':buildingblock', $dados['block'], PDO::PARAM_STR);
            $cad_address_all->bindParam(':apartment', $dados['apartment'], PDO::PARAM_STR);
            $cad_address_all->execute();
            $address_id = $conn->lastInsertId();
        };
        $query_patient = "INSERT INTO patients (cpf, telephone, address_id) VALUES (:cpf, :telephone, :address_id)";
        $cad_patient = $conn->prepare($query_patient);
        $cad_patient->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
        $cad_patient->bindParam(':telephone', $dados['telephone'], PDO::PARAM_STR);
        $cad_patient->bindParam(':address_id', $address_id, PDO::PARAM_INT);
        $cad_patient->execute();
        $query_consultation = "INSERT INTO consultation (cpf, crm_doctor, plan, particular, courtesy, observation, dataconsult, user_id) VALUES (:cpf, :crm_doctor, :plan, :particular, :courtesy, :observation, :dataconsult, :user_id)";
        $cad_consultation = $conn->prepare($query_consultation);
        $cad_consultation->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
        $cad_consultation->bindParam(':crm_doctor', $dados['crm'], PDO::PARAM_STR);
        $cad_consultation->bindParam(':plan', $dados['plan'], PDO::PARAM_STR);
        $cad_consultation->bindParam(':particular', $dados['particular'], PDO::PARAM_STR);
        $cad_consultation->bindParam(':courtesy', $dados['courtesy'], PDO::PARAM_STR);
        $cad_consultation->bindParam(':observation', $dados['observation'], PDO::PARAM_STR);
        $cad_consultation->bindParam(':dataconsult', $dados['consultationdate'], PDO::PARAM_STR);
        $cad_consultation->bindParam(':user_id', $dados['user_id'], PDO::PARAM_STR);
        $cad_consultation->execute();
        $response = [
            "error" => false,
            "message" => 'Consulta Cadastrada com Sucesso!'
        ];
    } else {
        $query_checked_patient = "SELECT COUNT(*) FROM patients WHERE cpf = :cpf";
        $checked_cpf_patient = $conn->prepare($query_checked_patient);
        $checked_cpf_patient->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
        $checked_cpf_patient->execute();
        $cpf_patient_count = $checked_cpf_patient->fetchColumn();
        if ($cpf_patient_count == 0) {
            $query_get_address_id = "SELECT address_id FROM address_all WHERE zipcode = :zipcode AND residencenumber = :residencenumber AND building = :building AND buildingblock = :buildingblock AND apartment = :apartment";
            $get_address_id = $conn->prepare($query_get_address_id);
            $get_address_id->bindParam(':zipcode', $dados['zipcode'], PDO::PARAM_STR);
            $get_address_id->bindParam(':residencenumber', $dados['residencenumber'], PDO::PARAM_STR);
            $get_address_id->bindParam(':building', $dados['building'], PDO::PARAM_STR);
            $get_address_id->bindParam(':buildingblock', $dados['block'], PDO::PARAM_STR);
            $get_address_id->bindParam(':apartment', $dados['apartment'], PDO::PARAM_STR);
            $get_address_id->execute();
            $address_id = $get_address_id->fetchColumn();
            $query_patient = "INSERT INTO patients (cpf, telephone, address_id) VALUES (:cpf, :telephone, :address_id)";
            $cad_patient = $conn->prepare($query_patient);
            $cad_patient->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
            $cad_patient->bindParam(':telephone', $dados['telephone'], PDO::PARAM_STR);
            $cad_patient->bindParam(':address_id', $address_id, PDO::PARAM_INT);
            $cad_patient->execute();
        };
        $query_checked_consultation = "SELECT COUNT(*) FROM consultation WHERE cpf = :cpf AND crm_doctor = :crm_doctor AND dataconsult = :dataconsult";
        $checked_consultation = $conn->prepare($query_checked_consultation);
        $checked_consultation->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
        $checked_consultation->bindParam(':crm_doctor', $dados['crm'], PDO::PARAM_STR);
        $checked_consultation->bindParam(':dataconsult', $dados['consultationdate'], PDO::PARAM_STR);
        $checked_consultation->execute();
        $result_checked_consultation = $checked_consultation->fetchColumn();
        if ($result_checked_consultation == 0) {
            $query_consultation = "INSERT INTO consultation (cpf, crm_doctor, plan, particular, courtesy, observation, dataconsult, user_id) VALUES (:cpf, :crm_doctor, :plan, :particular, :courtesy, :observation, :dataconsult, :user_id)";
            $cad_consultation = $conn->prepare($query_consultation);
            $cad_consultation->bindParam(':cpf', $dados['cpf'], PDO::PARAM_STR);
            $cad_consultation->bindParam(':crm_doctor', $dados['crm'], PDO::PARAM_STR);
            $cad_consultation->bindParam(':plan', $dados['plan'], PDO::PARAM_STR);
            $cad_consultation->bindParam(':particular', $dados['particular'], PDO::PARAM_STR);
            $cad_consultation->bindParam(':courtesy', $dados['courtesy'], PDO::PARAM_STR);
            $cad_consultation->bindParam(':observation', $dados['observation'], PDO::PARAM_STR);
            $cad_consultation->bindParam(':dataconsult', $dados['consultationdate'], PDO::PARAM_STR);
            $cad_consultation->bindParam(':user_id', $dados['user_id'], PDO::PARAM_INT);
            $cad_consultation->execute();
            $response = [
                "error" => false,
                "message" => 'Consulta Cadastrada com Sucesso!'
            ];
        } else {
            $response = [
                "error" => true,
                "message" => 'Consulta já Agendada!'
            ];
        };
    };
};
http_response_code(200);
echo json_encode($response);