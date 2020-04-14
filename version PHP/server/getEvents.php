<?php

  //Iniciamos la session.
  session_start();
  $usuario = $_SESSION["login"];

  //Atributos.
  $servername = "localhost";
  $username = "isaac";
  $password = "123456";
  $dbname = "p7_agenda";
  $msg_error = "Error. no se pudieron cargar los eventos del usuario: ".$usuario;
  $msg_ok = "OK";

  //Creamos la conexion.
  $conn = new mysqli($servername, $username, $password, $dbname);
  //validamos la conexion.
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }else{
    //consulta.
    $sql = "SELECT * FROM `eventos` WHERE `fk_usuario` = '".$usuario."'";
    $result = $conn->query($sql);
    //validamos la respuesta de la consulta.
    if($result->num_rows > 0){
      //hacemos un ciclo para llenar un arreglo asociativo con los datos de la DB.
      $eventos = array();
      $i = 0;
      while($row = $result->fetch_assoc()) {
        //hacemos un arreglo asociativo con los datos recividos.
        $diaCompleto;
        if($row["dia_completo"]==true){
          $diaCompleto = true;
        }if($row["dia_completo"]==false){
          $diaCompleto = false;
        }

        $inicio =  strval($row["fecha_inicio"]." ".$row["hora_inicio"]);
        $fin = strval($row["fecha_final"]." ".$row["hora_final"]);
        $eventos[$i]= ['id'=>$row["id"], 'title'=>$row["titulo"], 'start'=>$inicio, 'end'=>$fin, 'allDay'=>$diaCompleto];

        $i++;
      }
      //hacemos un arreglo con los datos recividos.
      $res = array('msg'=>$msg_ok, 'eventos'=>$eventos);
      //lo comvertimos a json.
      print_r(json_encode($res));
    }else{
      //hacemos un arreglo con los datos recividos.
      $res = array('msg'=>$msg_error);
      //lo comvertimos a json.
      print_r(json_encode($res));
    }
    //Cerramos la conexion.
    $conn->close();
  }

 ?>
