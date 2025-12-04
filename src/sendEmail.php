<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Path to PHPMailer library

// Configure PHPMailer with SMTP settings
$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com'; // SMTP server address
$mail->SMTPAuth = true;
$mail->Username = 'your_email@gmail.com'; // Your Gmail address
$mail->Password = 'your_password'; // Your Gmail password
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

// Set email content
$mail->setFrom('your_email@gmail.com', 'Your Name');
$mail->addAddress('recipient@example.com', 'Recipient Name');
$mail->Subject = 'Test Email';
$mail->Body = 'This is a test email sent from PHP using Gmail SMTP.';

// Send email
try {
    $mail->send();
    echo 'Email sent successfully.';
} catch (Exception $e) {
    echo 'Error sending email: ' . $mail->ErrorInfo;
}
