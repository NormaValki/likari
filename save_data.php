
<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Устанавливаем корректную кодировку
    header('Content-Type: application/json; charset=utf-8');
    
    // Читаем JSON и декодируем
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['field']) && isset($data['value'])) {
        // Декодируем текстовые данные
        $field = htmlspecialchars($data['field'], ENT_QUOTES, 'UTF-8');
        $value = htmlspecialchars($data['value'], ENT_QUOTES, 'UTF-8');

        // Формируем запись
        $log_entry = sprintf("[%s] Поле: %s, Значение: %s\n", date('Y-m-d H:i:s'), $field, $value);
        
        // Сохраняем в файл
        file_put_contents('user_data.log', $log_entry, FILE_APPEND);

        echo json_encode(['status' => 'success', 'message' => 'Данные сохранены.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Некорректный ввод.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Метод не поддерживается.']);
}
?>
