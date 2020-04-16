<?php

  $msg_error = "Error al cerrar la session.";
  $msg_ok = "OK";

  session_start();
  if(isset($_SESSION["login"])){
    //destroy the session
    session_destroy();
    //lo comvertimos a json.
    $res = array('msg'=>$msg_ok);
    print_r(json_encode($res));
  }else{
    //lo comvertimos a json.
    $res = array('msg'=>$msg_error);
    print_r(json_encode($res));
  }


 ?>
