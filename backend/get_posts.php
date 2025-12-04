<?php
/**
 * Get Posts API
 * 
 * Returns all non-expired posts from the database
 */

require_once 'config.php';

setCorsHeaders();

try {
    $conn = getConnection();
    
    // Get all posts that haven't expired
    $sql = "SELECT s_no, title, content, image, expiry_date 
            FROM posts 
            WHERE expiry_date IS NULL OR expiry_date >= CURDATE() 
            ORDER BY s_no DESC";
    
    $result = $conn->query($sql);
    
    if ($result === false) {
        throw new Exception('Query failed: ' . $conn->error);
    }
    
    $posts = [];
    while ($row = $result->fetch_assoc()) {
        $posts[] = [
            's_no' => (int)$row['s_no'],
            'title' => $row['title'],
            'content' => $row['content'],
            'image' => $row['image'],
            'expiry_date' => $row['expiry_date']
        ];
    }
    
    echo json_encode([
        'success' => true,
        'posts' => $posts
    ]);
    
    $conn->close();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
