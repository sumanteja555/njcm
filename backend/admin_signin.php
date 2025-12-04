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

$emailOrPhone = trim($data['emailOrPhone'] ?? '');
$password = $data['password'] ?? '';

if (empty($emailOrPhone) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Email/Phone and password are required']);
    exit();
}

$conn = getConnection();

try {
    // Determine if input is email or phone
    $isEmail = filter_var($emailOrPhone, FILTER_VALIDATE_EMAIL);
    
    if ($isEmail) {
        $query = "SELECT id, name, email, number, password FROM adminusers WHERE email = ?";
        $param = $emailOrPhone;
    } else {
        $query = "SELECT id, name, email, number, password FROM adminusers WHERE number = ?";
        $param = $emailOrPhone;
    }
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $param);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Invalid credentials']);
        exit();
    }
    
    $user = $result->fetch_assoc();
    $stmt->close();
    
    // Verify password
    if (!password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Invalid credentials']);
        exit();
    }
    
    // Remove password from response
    unset($user['password']);
    
    // Generate JWT token (expires in 24 hours)
    $payload = [
        'id' => $user['id'],
        'email' => $user['email'],
        'exp' => time() + (24 * 60 * 60)  // 24 hours
    ];
    $token = generateJWT($payload);
    
    // Successful login
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'token' => $token,
        'user' => $user
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error: ' . $e->getMessage()]);
} finally {
    $conn->close();
}
?>