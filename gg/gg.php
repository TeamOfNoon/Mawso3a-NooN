<?php

try {

    $db = new PDO('sqlite:search.db');

    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $db->exec("
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT
        )
    ");

    $db->exec("
        CREATE INDEX IF NOT EXISTS idx_posts_title
        ON posts(title)
    ");

    $stmt = $db->prepare("
        INSERT INTO posts (title, content)
        VALUES (?, ?)
    ");

    $rows = [
        ['مقدمة في البرمجة', 'شرح أساسيات البرمجة'],
        ['تعلم جافاسكربت', 'دروس JavaScript'],
        ['تعلم SQLite', 'قاعدة بيانات خفيفة'],
        ['البحث في النصوص', 'محرك بحث بسيط']
    ];

    foreach ($rows as $row) {
        $stmt->execute($row);
    }

    echo "Database created successfully.";

} catch (PDOException $e) {

    die("SQLite Error: " . $e->getMessage());

}