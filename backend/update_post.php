<?php
/**
 * Update Post API
 * 
 * Updates an existing post
 */

require_once 'config.php';

setCorsHeaders();

// Only allow POST or PUT requests
if (!in_array($_SERVER['REQUEST_METHOD'], ['POST', 'PUT'])) {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

try {
    $conn = getConnection();
    
    // Get data from request
    $postId = isset($_POST['id']) ? (int)$_POST['id'] : null;
    $title = isset($_POST['title']) ? trim($_POST['title']) : '';
    $content = isset($_POST['content']) ? trim($_POST['content']) : '';
    $expiry_date = isset($_POST['expiry_date']) && !empty($_POST['expiry_date']) ? $_POST['expiry_date'] : null;
    $image = isset($_POST['image']) ? trim($_POST['image']) : '';
    
    // If no POST data, try to get from JSON body
    if (!$postId) {
        $input = json_decode(file_get_contents('php://input'), true);
        if ($input) {
            $postId = isset($input['id']) ? (int)$input['id'] : null;
            $title = isset($input['title']) ? trim($input['title']) : $title;
            $content = isset($input['content']) ? trim($input['content']) : $content;
            $expiry_date = isset($input['expiry_date']) && !empty($input['expiry_date']) ? $input['expiry_date'] : null;
            $image = isset($input['image']) ? trim($input['image']) : $image;
        }
    }
    
    // Validate required fields
    if (!$postId) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Post ID is required']);
        exit();
    }
    
    if (empty($title)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Title is required']);
        exit();
    }
    
    if (empty($content)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Content is required']);
        exit();
    }
    
    // Get existing post
    $stmt = $conn->prepare("SELECT image FROM posts WHERE s_no = ?");
    $stmt->bind_param('i', $postId);
    $stmt->execute();
    $result = $stmt->get_result();
    $existingPost = $result->fetch_assoc();
    $stmt->close();
    
    if (!$existingPost) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Post not found']);
        exit();
    }
    
    // Handle image file upload
    if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['image_file'];
        
        // Validate file type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->file($file['tmp_name']);
        
        if (!in_array($mimeType, $allowedTypes)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.']);
            exit();
        }
        
        // Validate file size (max 5MB)
        if ($file['size'] > 5 * 1024 * 1024) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'File size exceeds 5MB limit']);
            exit();
        }
        
        // Delete old image if it was uploaded
        if (!empty($existingPost['image']) && strpos($existingPost['image'], 'uploads/') === 0) {
            $oldImagePath = __DIR__ . '/' . $existingPost['image'];
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }
        }
        
        // Generate unique filename
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid('post_', true) . '.' . $extension;
        $uploadPath = UPLOADS_DIR . $filename;
        
        // Move uploaded file
        if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
            $image = 'uploads/' . $filename;
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to save uploaded file']);
            exit();
        }
    }
    
    // Update the post
    $stmt = $conn->prepare("UPDATE posts SET title = ?, content = ?, image = ?, expiry_date = ? WHERE s_no = ?");
    
    if (!$stmt) {
        throw new Exception('Failed to prepare statement: ' . $conn->error);
    }
    
    $stmt->bind_param('ssssi', $title, $content, $image, $expiry_date, $postId);
    
    if (!$stmt->execute()) {
        throw new Exception('Failed to update post: ' . $stmt->error);
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Post updated successfully',
        'image' => $image
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
