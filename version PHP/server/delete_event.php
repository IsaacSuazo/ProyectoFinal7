<?php

  //Iniciamos la session.
  session_start();
  $usuario = $_SESSION["login"];

  //capturamos el post.
  $data_id = $_POST["id"];

  //Atributos.
  $servername = "localhost";
  $username = "isaac";
  $password = "123456";
  $dbname = "p7_agenda";
  $msg_error = "Error al eliminar el evento de la Base de Datos.";
  $msg_ok = "OK";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
  }else{
    $sql = "DELETE FROM `eventos` WHERE `id`='".$data_id."'";
    if($conn->query($sql) === TRUE) {
      //hacemos un arreglo con los datos recividos.
      $res = array('msg'=>$msg_ok, 'datos_form'=>$data_id);
      //lo comvertimos a json.
      print_r(json_encode($res));
    }else{
      //hacemos un arreglo con los datos recividos.
      $res = array('msg'=>$msg_error);
      //lo comvertimos a json.
      print_r(json_encode($res));
    }

    $conn->close();
  }


 ?>
