<?php
/**
 * Delete Post API
 * 
 * Deletes a post by ID
 */

require_once 'config.php';

setCorsHeaders();

// Only allow POST or DELETE requests
if (!in_array($_SERVER['REQUEST_METHOD'], ['POST', 'DELETE'])) {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

try {
    $conn = getConnection();
    
    // Get post ID from request
    $postId = null;
    
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // For DELETE requests, get ID from query string
        $postId = isset($_GET['id']) ? (int)$_GET['id'] : null;
    } else {
        // For POST requests, get ID from body
        $input = json_decode(file_get_contents('php://input'), true);
        $postId = isset($input['id']) ? (int)$input['id'] : (isset($_POST['id']) ? (int)$_POST['id'] : null);
    }
    
    if (!$postId) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Post ID is required']);
        exit();
    }
    
    // First, get the post to check if it has an uploaded image
    $stmt = $conn->prepare("SELECT image FROM posts WHERE s_no = ?");
    $stmt->bind_param('i', $postId);
    $stmt->execute();
    $result = $stmt->get_result();
    $post = $result->fetch_assoc();
    $stmt->close();
    
    if (!$post) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Post not found']);
        exit();
    }
    
    // Delete the image file if it exists locally
    if (!empty($post['image']) && strpos($post['image'], 'uploads/') === 0) {
        $imagePath = __DIR__ . '/' . $post['image'];
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }
    }
    
    // Delete the post
    $stmt = $conn->prepare("DELETE FROM posts WHERE s_no = ?");
    $stmt->bind_param('i', $postId);
    
    if (!$stmt->execute()) {
        throw new Exception('Failed to delete post: ' . $stmt->error);
    }
    
    if ($stmt->affected_rows === 0) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Post not found']);
        exit();
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Post deleted successfully'
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
