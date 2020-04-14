<?php
  //Iniciamos la session.
  session_start();
  $usuario = $_SESSION["login"];

  //capturamos el post.
  $data_id = $_POST["id"];
  $data_startDate = $_POST["start_date"];
  $data_startHour = $_POST["start_hour"];
  $data_endDate = $_POST["end_date"];
  $data_endHour = $_POST["end_hour"];

  //Atributos.
  $servername = "localhost";
  $username = "isaac";
  $password = "123456";
  $dbname = "p7_agenda";
  $msg_error = "Error en los datos del login.";
  $msg_ok = "OK";

  //Creamos la conexion.
  $conn = new mysqli($servername, $username, $password, $dbname);
  //validamos la conexion.
  if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
  }else{
    //consulta.
    $sql = "UPDATE `eventos` SET `fecha_inicio`='".$data_startDate."',`hora_inicio`='".$data_startHour."',`fecha_final`='".$data_endDate."',`hora_final`='".$data_endHour."' WHERE `id`= '".$data_id."'";
    if($conn->query($sql) === TRUE) {
      //hacemos un arreglo con los datos recividos.
      $res = array('msg'=>$msg_ok, 'datos_form'=>$data_id);
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
