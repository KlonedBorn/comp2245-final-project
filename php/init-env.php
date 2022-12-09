<!-- 
    Global file that should be called once for the initilization of the system.
-->

<?php
/**
 * Credit to Megaloman for creating this function.
 * Link: https://www.php.net/manual/en/class.pdo.php
 */
function construct_pdo($file = 'properties.ini')
{
    if (!$settings = parse_ini_file($file, TRUE))
        throw new exception('Unable to open ' . $file . '.');
    $dns = $settings['database']['driver'] .
    ':host=' . $settings['database']['host'] .
    ((!empty($settings['database']['port'])) ? (';port=' . $settings['database']['port']) : '') .
    ';dbname=' . $settings['database']['schema'];
    return new PDO($dns, $settings['database']['username'], $settings['database']['password']);
}
$db = construct_pdo();
$admin_user = array(
    'name' => 'admin',
    'password' => 'FinalC0unt',
);
header('Content-Type: application/json');
echo json_encode(array('foo' => 'bar'));
exit;

?>