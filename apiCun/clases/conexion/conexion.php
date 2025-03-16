<?php
class Conexion {
    private $server;
    private $user;
    private $password;
    private $database;
    private $port;
    private $conexion;

    function __construct() {
        $listaDatos = $this->datosConexion();

        foreach ($listaDatos as $key => $value) {
            $this->server = $value['server'];
            $this->user = $value['user'];
            $this->password = $value['password'];
            $this->database = $value['database'];
            $this->port = $value['port'];
        }

        // Establecer la conexión con PostgreSQL
        $this->conexion = pg_connect("host={$this->server} port={$this->port} dbname={$this->database} user={$this->user} password={$this->password}");

        if (!$this->conexion) {
            die("Error en la conexión con la base de datos.");
        }
    }

    // Método para obtener los datos de configuración
    private function datosConexion() {
        $direccion = dirname(__FILE__);
        $jsonData = file_get_contents($direccion . "/" . "config");
        return json_decode($jsonData, true);
    }

    // Convertir datos a UTF-8
    private function convertirUtf8($array) {
        array_walk_recursive($array, function (&$item, $key) {
            if (!mb_detect_encoding($item, 'utf-8', true)) {
                $item = utf8_encode($item);
            }
        });
        return $array;
    }

    // Método para obtener datos
    public function obtenerDatos($query) {
        $result = pg_query($this->conexion, $query);
        $resultsArray = pg_fetch_all($result);
        return $resultsArray ? $this->convertirUtf8($resultsArray) : [];
    }

    // Método para contar registros
    public function obtenerNumeroDatos($query) {
        $result = pg_query($this->conexion, $query);
        return pg_num_rows($result);
    }

    // Método para guardar datos
    public function guardarDatos($sql) {
        $result = pg_query($this->conexion, $sql);
        return $result ? pg_affected_rows($result) : 0;
    }

    // Método para guardar datos y devolver el ID insertado
    public function guardarDatosDos($sql) {
        $result = pg_query($this->conexion, $sql);
        if ($result) {
            $lastId = pg_fetch_result(pg_query($this->conexion, "SELECT LASTVAL();"), 0, 0);
            return $lastId ? $lastId : 0;
        }
        return 0;
    }

    // Método para encriptar contraseñas
    protected function encriptar($contra) {
        return md5($contra);
    }
}
?>
