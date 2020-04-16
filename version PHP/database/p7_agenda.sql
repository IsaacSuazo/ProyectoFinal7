-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-04-2020 a las 23:59:41
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `p7_agenda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(30) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `hora_inicio` varchar(5) DEFAULT NULL,
  `fecha_final` date DEFAULT NULL,
  `hora_final` varchar(5) DEFAULT NULL,
  `dia_completo` tinyint(1) NOT NULL,
  `fk_usuario` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `titulo`, `fecha_inicio`, `hora_inicio`, `fecha_final`, `hora_final`, `dia_completo`, `fk_usuario`) VALUES
(1, 'Evento del admin', '2019-09-08', '00:00', '2019-09-12', '00:00', 1, 'admin@gmail.com'),
(10, 'Evento del dia 7', '2019-09-06', '00:00', '2019-09-08', '00:00', 1, 'admin@gmail.com'),
(11, 'Evento de root', '2019-09-21', NULL, NULL, NULL, 1, 'root@gmail.com'),
(13, 'Evento del usuario', '2019-09-21', NULL, NULL, NULL, 1, 'user@gmail.com'),
(14, 'evento semanal de hoy', '2019-09-15', '07:00', '2019-09-21', '07:00', 0, 'admin@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `email` varchar(30) NOT NULL,
  `nacimiento` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `contrasena`, `email`, `nacimiento`) VALUES
(3, 'admin', '$2y$10$5L0FZWC4d.6cKWHyYD9RqeOWbUexPRVZl9LtYhXXqcRX9IWp8ecXG', 'admin@gmail.com', '16/12/1991'),
(1, 'usuario prueba', '123456', 'prueba@gmail.com', '15/12/2019'),
(2, 'root', '$2y$10$0/TIzUH5Cn4UAwHw7McZvuooNN7FSVT4OMDVHIprhlHaht.0JLwDi', 'root@gmail.com', '15/12/1990'),
(4, 'user', '$2y$10$Sjtny6rLzEtPlsEJE6TNSudNpaGYSxf4FFQfFfFNw3WBIcj8eWjNq', 'user@gmail.com', '17/12/1992');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario` (`fk_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
