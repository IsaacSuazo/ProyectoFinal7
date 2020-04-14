<?php

  //Iniciamos la session.
  session_start();
  $usuario = $_SESSION["login"];

  //capturamos el post.
  $datos_form = $_POST;

  //Atributos.
  $servername = "localhost";
  $username = "isaac";
  $password = "123456";
  $dbname = "p7_agenda";
  $msg_error = "Error en los datos del login.";
  $msg_ok = "OK";

  //Creamos conexion.
  $conn = new mysqli($servername, $username, $password, $dbname);
  //Validamos la conexion.
  if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
  }else{
    //consulta
    $sql = "INSERT INTO `eventos` (`id`, `titulo`, `fecha_inicio`, `hora_inicio`, `fecha_final`, `hora_final`, `dia_completo`, `fk_usuario`)
    VALUES (
      NULL,
      '".$datos_form['titulo']."',
      '".$datos_form['start_date']."',
      '".$datos_form['start_hour']."',
      '".$datos_form['end_date']."',
      '".$datos_form['end_hour']."',
      '".$datos_form['allDay']."',
      '".$usuario."'
    );";
    if($conn->query($sql) === TRUE) {
      //hacemos un arreglo con los datos recividos.
      $res = array('msg'=>$msg_ok, 'datos_form'=>$datos_form);
      //lo comvertimos a json.
      print_r(json_encode($res));
    }else{
      //hacemos un arreglo con los datos recividos.
      $res = array('msg'=>$msg_error." Nombre de usuario incorrecto.");
      //lo comvertimos a json.
      print_r(json_encode($res));
    }

    $conn->close();
  }


 ?>
