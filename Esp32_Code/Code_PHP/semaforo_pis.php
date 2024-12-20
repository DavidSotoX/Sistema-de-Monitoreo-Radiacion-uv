<?php
function guidv4($data = null) {
    // Generate 16 bytes (128 bits) of random data or use the data passed into the function.
    $data = $data ?? random_bytes(16);
    assert(strlen($data) == 16);

    // Set version to 0100
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    // Set bits 6-7 to 10
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

    // Output the 36 character UUID.
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}
// Conexión con la base de datos
$serverName = "adrianserver.database.windows.net";
$connectionOptions = array(
    "Database" => "semaforo_pis",
    "Uid" => "desarrollo",
    "PWD" => "HernandezSA30."
);

$conn = sqlsrv_connect($serverName, $connectionOptions);

if (!$conn) {
    http_response_code(500);
    error_log("No se pudo conectar");
    return;
}

$jsonInput = file_get_contents('php://input');
$data = json_decode($jsonInput, true);
$data = $data['info'];

if (!$data) {
    http_response_code(400);
    error_log("No hay datos para insertar");
    return;
}
$external_id = guidv4();
$id_dispositivo = 1;
$uv = $data['uv'];
$fecha = date("Y-m-d H:i:s");

// Utiliza una consulta preparada con parámetros
$sqlInsert = "INSERT INTO medicion(external_id, uv, fecha, id_dispositivo, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)";
$paramsInsert = array($external_id, $uv, $fecha, $id_dispositivo, date("Y-m-d H:i:s"), date("Y-m-d H:i:s"));

// Preparar la consulta
$stmtMedicion = sqlsrv_prepare($conn, $sqlInsert, $paramsInsert);

if (!$stmtMedicion) {;
    http_response_code(500);
    error_log("SQL_ERROR_1: " . print_r(sqlsrv_errors(), true) );
    return;
}

// Ejecutar la consulta
if (sqlsrv_execute($stmtMedicion) === false) {
    http_response_code(500);
    error_log("SQL_ERROR_2: " . print_r(sqlsrv_errors(), true) );
    return;
}

sqlsrv_free_stmt($stmtMedicion);
error_log("Se insertó correctamente");
http_response_code(200);
// Cerrar la conexión
sqlsrv_close($conn);
?>
