<?php
//User “superjh0_pi” was added to the database “superjh0_ccs”.
$dsn="mysql:host=localhost;dbname=irc";
$usr="root";
$pwd="ad3poju";
try{
	$pdo=new PDO($dsn,$usr,$pwd,array(PDO::ATTR_PERSISTENT=>true, PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_ORACLE_NULLS=>PDO::NULL_EMPTY_STRING));
}
catch (PDOException $ex) {
	// mail("info@domain.com","Database error",$ex->getMessage(),"admin@localhost.com");
}
?>
