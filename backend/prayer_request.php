<?php
/**
 * Prayer Request API
 * 
 * Handles prayer request submissions
 */

require_once 'config.php';

setCorsHeaders();

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

try {
    $conn = getConnection();
    
    // Get data from request
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Also check POST data
    if (!$input) {
        $input = $_POST;
    }
    
    $userName = isset($input['userName']) ? trim($input['userName']) : '';
    $number = isset($input['number']) ? trim($input['number']) : null;
    $message = isset($input['message']) ? trim($input['message']) : '';
    
    // Validate required fields
    if (empty($userName)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Name is required']);
        exit();
    }
    
    if (empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Prayer request message is required']);
        exit();
    }
    
    // Insert prayer request
    $stmt = $conn->prepare("INSERT INTO prayer_requests (name, phone, message, created_at) VALUES (?, ?, ?, NOW())");
    
    if (!$stmt) {
        throw new Exception('Failed to prepare statement: ' . $conn->error);
    }
    
    $stmt->bind_param('sss', $userName, $number, $message);
    
    if (!$stmt->execute()) {
        throw new Exception('Failed to save prayer request: ' . $stmt->error);
    }
    
    $requestId = $conn->insert_id;
    
    echo json_encode([
        'success' => true,
        'message' => 'Prayer request submitted successfully',
        'requestId' => $requestId
    ]);
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
