<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$required = [
    'google_uid',
    'grade',
    'subject',
    'score',
    'total',
    'percentage'
];

foreach ($required as $key) {
    if (!isset($data[$key])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing field: ' . $key]);
        exit;
    }
}

// يجب إضافة التحقق من Firebase ID Token
// وإعداد اتصال PDO بقاعدة بيانات MySQL قبل الحفظ.

http_response_code(501);

echo json_encode([
    'message' => 'PHP يحتاج إعداد الاتصال والتحقق الأمني قبل التفعيل'
]);

?>