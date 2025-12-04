<?php
/**
 * Get Prayer Requests API
 * 
 * Returns all prayer requests (for admin)
 */

require_once 'config.php';

setCorsHeaders();

try {
    $conn = getConnection();
    
    // Get all prayer requests
    $sql = "SELECT id, name, phone, message, created_at 
            FROM prayer_requests 
            ORDER BY created_at DESC";
    
    $result = $conn->query($sql);
    
    if ($result === false) {
        throw new Exception('Query failed: ' . $conn->error);
    }
    
    $requests = [];
    while ($row = $result->fetch_assoc()) {
        $requests[] = [
            'id' => (int)$row['id'],
            'name' => $row['name'],
            'phone' => $row['phone'],
            'message' => $row['message'],
            'created_at' => $row['created_at']
        ];
    }
    
    echo json_encode([
        'success' => true,
        'requests' => $requests
    ]);
    
    $conn->close();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
