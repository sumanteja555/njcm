<?php
/**
 * Save Post API
 * 
 * Creates a new post with optional image upload
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
    
    // Get form data
    $title = isset($_POST['title']) ? trim($_POST['title']) : '';
    $content = isset($_POST['content']) ? trim($_POST['content']) : '';
    $expiry_date = isset($_POST['expiry_date']) && !empty($_POST['expiry_date']) ? $_POST['expiry_date'] : null;
    $image = isset($_POST['image']) ? trim($_POST['image']) : '';
    
    // Validate required fields
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
        
        // Generate unique filename
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid('post_', true) . '.' . $extension;
        $uploadPath = UPLOADS_DIR . $filename;
        
        // Move uploaded file
        if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
            // Set image path relative to backend
            $image = 'uploads/' . $filename;
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to save uploaded file']);
            exit();
        }
    }
    
    // Prepare and execute insert statement
    $stmt = $conn->prepare("INSERT INTO posts (title, content, image, expiry_date) VALUES (?, ?, ?, ?)");
    
    if (!$stmt) {
        throw new Exception('Failed to prepare statement: ' . $conn->error);
    }
    
    $stmt->bind_param('ssss', $title, $content, $image, $expiry_date);
    
    if (!$stmt->execute()) {
        throw new Exception('Failed to insert post: ' . $stmt->error);
    }
    
    $postId = $conn->insert_id;
    
    echo json_encode([
        'success' => true,
        'message' => 'Post created successfully',
        'postId' => $postId,
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
