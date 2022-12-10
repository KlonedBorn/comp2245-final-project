<?php
    /**
     * Credit to Megaloman for creating this function.
     * Link: https://www.php.net/manual/en/class.pdo.php
     */
    function construct_pdo($file = 'properties.ini') {
        if (!$settings = parse_ini_file($file, TRUE))
            throw new exception('Unable to open ' . $file . '.');
        $dns = $settings['database']['driver'] .
        ':host=' . $settings['database']['host'] .
        ((!empty($settings['database']['port'])) ? (';port=' . $settings['database']['port']) : '') .
        ';dbname=' . $settings['database']['schema'];
        return new PDO($dns, $settings['database']['username'], $settings['database']['password']);
    }
    global $db;
    $db = construct_pdo();
    // Ensure Lyn-Fatt knows to add his own admin user.
    // $firstname = 'Admin';
    // $lastname = 'Mike';
    // $email = 'admin-mike@facade.com';
    // $password = 'FinalC0unt';
    // $hash = password_hash($password,PASSWORD_BCRYPT);
    // $role = 'Admin';
    // $res = $db->query("INSERT IGNORE INTO Users (firstname,lastname,password,email,role) 
    //     VALUES ('$firstname','$lastname','$password','$email','$role')");
?>