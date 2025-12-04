<?php
require_once 'config.php';

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON input']);
    exit();
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$number = trim($data['number'] ?? '');
$password = $data['password'] ?? '';

if (empty($name) || empty($email) || empty($number) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'All fields are required']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email format']);
    exit();
}

if (strlen($password) < 6) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Password must be at least 6 characters long']);
    exit();
}

$conn = getConnection();

try {
    // Check if email already exists
    $stmt = $conn->prepare("SELECT id FROM adminusers WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        http_response_code(409);
        echo json_encode(['success' => false, 'error' => 'Email already exists']);
        exit();
    }
    $stmt->close();

    // Check if number already exists
    $stmt = $conn->prepare("SELECT id FROM adminusers WHERE number = ?");
    $stmt->bind_param("s", $number);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        http_response_code(409);
        echo json_encode(['success' => false, 'error' => 'Phone number already exists']);
        exit();
    }
    $stmt->close();

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert the new admin user
    $stmt = $conn->prepare("INSERT INTO adminusers (name, email, number, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $number, $hashedPassword);
    
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['success' => true, 'message' => 'Admin user enrolled successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to enroll admin user']);
    }
    
    $stmt->close();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error: ' . $e->getMessage()]);
} finally {
    $conn->close();
}
?>