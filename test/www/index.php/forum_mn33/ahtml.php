<?php
header("Content-Type: text/html; charset=utf-8");

$THREAD = [
    "forum_id"     => "33",
    "forum_type"   => "fo",
    "thread_id"    => "25668",
    "thread_title" => "عنوان الموضوع التجريبي"
];

$posts = [
    [
        "postid"    => "1001",
        "postcount" => "1",
        "title"     => "عنوان المشاركة الأولى",
        "username"  => "الإمام ناصر محمد اليماني",
        "usertitle" => "الإمام المهدي",
        "dateline"  => "2026-06-17",
        "body"      => "<p>نص المشاركة هنا...</p>"
    ],
    [
        "postid"    => "1002",
        "postcount" => "2",
        "title"     => "عنوان المشاركة الثانية",
        "username"  => "عضو",
        "usertitle" => "عضو مشارك",
        "dateline"  => "2026-06-17",
        "body"      => "<p>نص المشاركة الثانية هنا...</p>"
    ]
];

function h($v){
    return htmlspecialchars($v, ENT_QUOTES, "UTF-8");
}

function post_html($p){
    return '
    <div class="threadPost">

        <div class="postBtncon no_copy">
            <a class="postBtn" href="./post_' . h($p["postid"]) . '.html">
                عرض المشاركة
            </a>

            <a class="postBtnCopy no_copy" href="javascript:void(0)">
                نسخ المشاركة
            </a>
        </div>

        <div class="postcon">

            <div class="postTitle" id="post_' . h($p["postid"]) . '">
                <span class="counter_butt no_copy">' . h($p["postcount"]) . '</span>
                ' . h($p["title"]) . '
            </div>

            <div class="username">
                ' . h($p["username"]) . '
            </div>

            <div class="usertitle">
                ' . h($p["usertitle"]) . '
            </div>

            <div class="time_date">
                ' . h($p["dateline"]) . '
            </div>

            <hr>

            <div class="postBody">
                ' . $p["body"] . '
            </div>

        </div>
    </div>';
}

function page_html($THREAD, $posts){
    $htmlPosts = "";

    foreach($posts as $p){
        $htmlPosts .= post_html($p);
    }

    return '<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8">
<title>' . h($THREAD["thread_title"]) . '</title>

<style>
body{
    font-family:tahoma, arial;
    background:#f5f5f5;
    margin:0;
}

#box{
    margin:auto;
    background:white;
    padding:15px;
    border:1px solid #ccc;
}

.navagation{
    margin:10px 0;
}

.navagation a{
    margin:0 5px;
}

.threadTitle{
    font-size:22px;
    font-weight:bold;
    margin:20px 0;
    padding:10px;
    background:#eee;
}

.threadPost{
    border:1px solid #ccc;
    margin:20px 0;
    background:#fff;
}

.postBtncon{
    background:#eee;
    padding:8px;
}

.postBtn,
.postBtnCopy{
    display:inline-block;
    padding:6px 10px;
    background:#ddd;
    text-decoration:none;
    color:#000;
    margin:3px;
}

.postcon{
    padding:15px;
}

.postTitle{
    font-size:20px;
    font-weight:bold;
}

.counter_butt{
    background:#333;
    color:white;
}

.username{
    color:#006600;
}

.usertitle{
    color:#777;
}

.time_date{
    color:#555;
}

.postBody{
    line-height:1.9;
    font-size:17px;
}
</style>
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="HandheldFriendly" content="true">
<meta name="MobileOptimized" content="device-width">
<script>

var threadid = "1105";
var tpage = "1";
var lang   = "ar";
var fid    = "33";
var base   = "../../";
var loaded = false;
var ViewType = "thread";
var v ="1111";

function ver(u){
  return u + "?v=" + (+new Date());
}
</script>

<script src="../../Assets/start.js"></script>
<script src="../../Assets/boot.js"></script>






</head>
<body id="thread_view">
<iframe id="storageFrame" src="about:blank" style="display:none;"></iframe>
<div id="app" style="">

    <div class="navagation no_copy">
        <a href="../../index.php.htm">الرئيسية</a>
        &gt;
        <a href="forum_' . h($THREAD["forum_type"]) . h($THREAD["forum_id"]) . '.html">القسم</a>
        &gt;
        <a href="thread_' . h($THREAD["thread_id"]) . '.html">الموضوع</a>
    </div>

    <hr>

    <div class="threadTitle">
        ' . h($THREAD["thread_title"]) . '
    </div>

    ' . $htmlPosts . '

</div>

</body>
</html>';
}

echo page_html($THREAD, $posts);
?>