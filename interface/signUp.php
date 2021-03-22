<?php

    include('./library/conn.php');

    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    $sql = "SELECT * FROM `users` WHERE `username`='$username'";

    $res = $mysqli->query($sql);

    if($res->num_rows>0){
        
        echo '<script>alert("用户名已存在");</script>';
        echo '<script>location.href="../src/html/signUp.html"</script>';
        die;
    }
    $insert = "INSERT INTO `users`(username,password) values ('$username','$password')";
    $result = $mysqli->query($insert);
  
    if($result){
        setcookie('username',$username,time()+3600*24,'/');
        echo '<script>alert("注册成功");</script>';
        echo '<script>location.href="../src/html/success.html"</script>';
    }
?>