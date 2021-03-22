<?php
    include('./library/conn.php');
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    $select ="SELECT * FROM `users` WHERE `username`='$username'AND`password`='$password'";
    $result = $mysqli->query($select);    
    $mysqli->close();

    if($result->num_rows>0){
        setcookie('username',$username,time()+3600*24,'/');
        echo '<script>alert("登录成功");</script>';
        echo '<script>location.href="../src/html/index.html"</script>';
    }else{
        echo '<script>alert("用户名或密码错误");</script>';
        echo '<script>location.href="../src/html/signIn.html";</script>';
    }
?>
