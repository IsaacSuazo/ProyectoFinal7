<?php

  //Atributos.
  $servername = "localhost";
  $username = "isaac";
  $password = "123456";
  $dbname = "p7_agenda";
  $msg_error = "Error en los datos del login.";
  $msg_ok = "OK";

  //capturamos el post.
  $datos_login = $_POST;

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }else{
    $sql = "SELECT * FROM `usuarios` WHERE email='".$datos_login['username']."'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
      //validamos la contraseña.
      $row= $result->fetch_assoc();
      //Iniciamos la session.
      session_start();
      if(password_verify($datos_login['password'], $row["contrasena"])){
        //hacemos un arreglo con los datos recividos.
        $res = array('msg'=>$msg_ok, 'usuario'=>$row["nombre"], 'contrasena'=>$row["contrasena"]);
        //Creamos la session.
        $_SESSION["login"] = $datos_login['username'];
        //lo comvertimos a json.
        print_r(json_encode($res));
      }else{
        //hacemos un arreglo con los datos recividos.
        $res = array('msg'=>$msg_error." Contraseña incorrecta.", 'usuario'=>$datos_login['username'], 'contrasena'=>$datos_login['password']);
        //lo comvertimos a json.
        print_r(json_encode($res));
      }
    }else{
      //hacemos un arreglo con los datos recividos.
      $res = array('msg'=>$msg_error." Nombre de usuario incorrecto.", 'usuario'=>$datos_login['username'], 'contrasena'=>$datos_login['password']);
      //lo comvertimos a json.
      print_r(json_encode($res));
    }
    //Cerramos la conexion.
    $conn->close();
  }

 ?>
