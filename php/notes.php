<?php
    require_once 'init-env.php';
    require_once 'session.php';

    if(isset($_GET['contact'])){
        $contactID = $_GET['contact'];
        $stmt = $db->query("SELECT /*DISTINCT TEST THIS WORD*/ * FROM Contacts WHERE id = $contactID");
        $contact = $stmt->fetch(PDO::FETCH_ASSOC);
        if($contact != false) {
            $_SESSION['current-contact'] = $contact['id'];
            header("Location: ../notes.html");
            exit;
        }
    }

    $contactID = $_SESSION['current-contact']; //GETS ID NUMBER 
    $stmt = $db->query ("SELECT /*DISTINCT TEST THIS WORD*/ * FROM Contacts WHERE id = '$contactID'");
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $stmt2 = $db->query ("SELECT * FROM Users");
    $results2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
    // echo "<h2>" . $results['title'] . $results['firstname'] . $results['lastname'] . "</h2> <br>";
    // echo "<p> Created on: </p>" . $results['created_at'] . "<p> by </p>";
    // forea ($results2 as $table): 
        // {
            // if ($table['id'] == $results['assigned_to'])
            // {
                // echo $table['firstname'] . " " . $table['lastname'];
            // }
        // }
    // endforeach;
    // echo "<br> <p> Updated on </p>" . $results['updated_at'];
    // echo "<div> 
    // </div>";    

$loader = array(
    'status' => 200,
    'prefix-info'=>'<h1 id="name">'.$results['title'] . $results['firstname'] . $results['lastname'].'</h1>
    <p>Created on '.$results['created_at'].' by '.$table['firstname']." ".$table['lastname'].'</p><p>Updated on '. $results['updated_at'].'</p>',
    'futher-info'=>'<span class="info-label">Email<p class="info-item" id="email-info">'.$results['email'].'</p></span>
    <span class="info-label">Telephone<p class="info-item" id="telephone-info">'.$results['telephone'].'</p></span>
    <span class="info-label">Company<p class="info-item" id="company-info">'.$results['company'].'</p></span>
    <span class="info-label">Assigned To<p class="info-item" id="assigned-to-info">'.$results['assigned_to'].'</p></span>',
    'note-container' => 'note'
);
echo json_encode($loader,JSON_FORCE_OBJECT);
?>