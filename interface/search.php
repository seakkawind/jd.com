<?php
    include('./library/conn.php');

    $content = $_REQUEST['content'];

    $sql = "SELECT * FROM product WHERE title LIKE '%$content%'";

    $res = $mysqli->query($sql);

    $mysqli->close();

    $arr = array();

    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo  $json;
?>