<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'pdoconnection.php';
$query_get_consult = "SELECT consultation_id, consultation.cpf, telephone, name, consultation.crm, plan, consultdatestart, consultdateend FROM consultation JOIN cpf on consultation.cpf = cpf.cpf JOIN crm on consultation.crm JOIN patients on consultation.cpf = patients.cpf";
$result_consultations = $conn->prepare($query_get_consult);
$result_consultations->execute();
if (($result_consultations) && ($result_consultations->rowCount() != 0)) {
    while ($row_consultation = $result_consultations->fetch(PDO::FETCH_ASSOC)) {
        extract($row_consultation);
        $list_consults[$consultation_id] = [
            'id' => $consultation_id,
            'title' => $cpf,
            'name' => $name,
            'telephone' => $telephone,
            'start' => $consultdatestart,
            'end' => $consultdateend,
            'desc' => $crm,
            'plan' => $plan
        ];
    };
    http_response_code(200);
    echo json_encode($list_consults);
};