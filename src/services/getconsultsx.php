<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'pdoconnection.php';
$query_get_consult = "SELECT consultation_id, consultation.cpf, name, consultation.crm, plan, consultdatestart FROM consultation JOIN cpf on consultation.cpf = cpf.cpf JOIN crm on consultation.crm = 5001";
$result_consultations = $conn->prepare($query_get_consult);
$result_consultations->execute();
if (($result_consultations) && ($result_consultations->rowCount() != 0)) {
    while ($row_consultation = $result_consultations->fetch(PDO::FETCH_ASSOC)) {
        extract($row_consultation);
        $list_consults['records'][$consultation_id] = [
            'consultation_id' => $consultation_id,
            'crm' => $crm,
            'cpf' => $cpf,
            'name' => $name,
            'plan' => $plan,
            'consultdatestart' => $consultdatestart
        ];
    };
    http_response_code(200);
    echo json_encode($list_consults);
};