<?php

  //Atributos.
  $servername = "localhost";
  $username = "isaac";
  $password = "123456";
  $dbname = "p7_agenda";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }else{
    $sql = "SELECT * FROM `usuarios`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
      //Validamos si existen 4 usuarios, de lo contrario se crearan.
      if($result->num_rows < 4){
        $hash_pass1 = password_hash('1234', PASSWORD_DEFAULT);
        $hash_pass2 = password_hash('2345', PASSWORD_DEFAULT);
        $hash_pass3 = password_hash('3456', PASSWORD_DEFAULT);

        $sql = "INSERT INTO `usuarios` VALUES
          ('2', 'root', '".$hash_pass1."', 'root@gmail.com', '15/12/1990'),
          ('3', 'admin', '".$hash_pass2."', 'admin@gmail.com', '16/12/1991'),
          ('4', 'user', '".$hash_pass3."', 'user@gmail.com', '17/12/1992')";

        if ($conn->query($sql) === TRUE) {
          echo "New record created successfully";
        } else {
          echo "Error: " . $sql . "<br>" . $conn->error;
        }
      }
      //Recorremos el arreglo de la consulta.
      while($row = $result->fetch_assoc()) {
          echo "<br>"."id: ".$row["id"]." - Name: ".$row["nombre"]." ".$row["contrasena"]. "<br>";
      }
    }else{
      echo "0 results";
    }
    //Cerramos la conexion.
    $conn->close();
  }


 ?>
