<?php
include 'conectar.php';
if (isset($_POST["btnregistrate"])) {
    // Registro de nuevos usuarios (sin cambios)
    $nombre = $_POST["usuario"];
    $pass = $_POST["pass"];
    $email = $_POST["email"];
    $confirm_pass = $_POST["confirm_pass"];
    // Validación del correo electrónico y coincidencia de contraseñas
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Correo electrónico no válido. Por favor, ingrese una dirección de correo válida.'); window.location='registrar.html'</script>";
        exit;
    }
    if ($pass !== $confirm_pass) {
        echo "<script>alert('Las contraseñas no coinciden. Por favor, verifique e intente nuevamente.'); window.location='registrar.html'</script>";
        exit;
    }
    // Registro de nuevos usuarios en la base de datos (sin cambios)
    $sqlgrabar = "INSERT INTO login (usuario, password, email) VALUES ('$nombre', '$pass', '$email')";
    if (mysqli_query($conecta, $sqlgrabar)) {
        echo "<script>alert('Usuario registrado con éxito: $nombre'); window.location='login.html'</script>";
    } else {
        echo "Error: " . $sqlgrabar . "<br>" . mysqli_error($conecta);
    }
}
if (isset($_POST["btningresar"])) {
    // Inicio de sesión de usuarios (sin cambios)
    $nombre = $_POST["usuario"];
    $pass = $_POST["pass"];
    $query = mysqli_query($conecta, "SELECT * FROM login WHERE usuario = '$nombre' AND password = '$pass'");
    $nr = mysqli_num_rows($query);
    if ($nr == 1) {
        // Usuario autenticado correctamente, imprime el nombre de usuario
        echo "<script> alert('¡Bienvenido $nombre!'); window.location='index.html?user=$nombre' </script>";
    } else {
        // Usuario no encontrado en la base de datos
        echo "<script> alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.'); window.location='login.html' </script>";
    }  
}
?>