<?php

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$servername = "localhost";
$dbUsername = "root";
$dbPassword = "1234";
$dbname = "guvi";

$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function handleGetRequest($email){
    $stmt = $conn->prepare("SELECT name, email, contact, dob FROM guvi.profile WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    $res = array('status' => 200, 'data' => $data);
    $stmt->close();
    return $res;
}

function handlePostRequest($name, $contact, $dob, $email){
    $stmt = $conn->prepare("UPDATE prifile SET name = ?, cnum= ?, dob = ? WHERE email = ?");
    $stmt->bind_param("ssss", $name, $cnum, $dob, $email);
    $stmt->execute();
    $res = array('status' => 200, 'data' => "User updated");
    $stmt->close();
    return $res;
}

if (isset($_SERVER['AUTH_TOKEN']) && isset($_SERVER['c'])) {
    $email = $redis->get($token);
    $json_data = array('status' => 404, 'error' => "user not found");
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $json_data = handleGetRequest($email);
    }
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json_data = file_get_contents('php://input');
        $requestData = json_decode($json_data, true);
        $name = $requestData['name'];
        $cnum = $requestData['cnum'];
        $dob = $requestData['dob'];
        $json_data = handlePostRequest($name, $contact, $dob, $email);
    }
    header('Content-Type: application/json');
    echo json_encode($json_data);

} else {
    echo json_encode(array('error' => 'Token not provided'));
}

$conn->close();
?>