<?php
/**
 * Payment Details Submission API
 *
 * Handles payment details and prayer request submissions after successful payment
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

    $fullName = isset($input['fullName']) ? trim($input['fullName']) : '';
    $mobile = isset($input['mobile']) ? trim($input['mobile']) : '';
    $email = isset($input['email']) ? trim($input['email']) : '';
    $address = isset($input['address']) ? trim($input['address']) : '';
    $prayerRequest = isset($input['prayerRequest']) ? trim($input['prayerRequest']) : '';

    // Validate required fields
    if (empty($fullName)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Full name is required']);
        exit();
    }

    if (empty($mobile)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Mobile number is required']);
        exit();
    }

    if (empty($email)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Email is required']);
        exit();
    }

    if (empty($address)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Address is required']);
        exit();
    }

    if (empty($prayerRequest)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Prayer request message is required']);
        exit();
    }

    // Insert payment details
    $stmt = $conn->prepare("INSERT INTO payments (full_name, mobile, email, address, prayer_request, submitted_at) VALUES (?, ?, ?, ?, ?, NOW())");

    if (!$stmt) {
        throw new Exception('Failed to prepare statement: ' . $conn->error);
    }

    $stmt->bind_param('sssss', $fullName, $mobile, $email, $address, $prayerRequest);

    if (!$stmt->execute()) {
        throw new Exception('Failed to save payment details: ' . $stmt->error);
    }

    $paymentId = $conn->insert_id;

    echo json_encode([
        'success' => true,
        'message' => 'Payment details submitted successfully',
        'paymentId' => $paymentId
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
?>