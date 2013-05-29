<?php
session_start();
ini_set("display_errors",1);
$err=NULL;
include 'config.php';
try{
     if (isset($_POST['submit'])){
		$email=$pdo->quote(filter_var($_POST['email'],FILTER_SANITIZE_EMAIL));
		$pwd=$pdo->quote(sha1($_POST['pwd']));
		$chk_id=$pdo->query("select u.usrID,concat(u.lname,' ',u.fname) as name from usr u where u.email=$email and u.pwd=$pwd");
		$usrid=$chk_id->fetch();
		$email=filter_var($_POST['email'],FILTER_SANITIZE_EMAIL);
		if ($chk_id->rowCount()==0 || !filter_var($email, FILTER_VALIDATE_EMAIL))
			Throw new PDOException("Invalid email / password.");
		$_SESSION['usrID']=$usrid[0];
		$_SESSION['name']=$usrid[1];
		header("location: ccs.php");
	}
}
	catch (PDOException $ex){
		$err=$ex->getMessage();
	}
?>
<!DOCTYPE html>
<html>
<head>
<link rel="shortcut icon" href="icons/favicon.ico" />
<title></title>
</head>
<body>
	<div id="errorDiv"
		style="position: relative; margin: 180px auto 0 auto; width: 315px; height: 22px; color: #ff0000; font-size: 10px; text-transform: uppercase"></div>
	<div class="wrap">
		<form action="<?=$_SERVER['PHP_SELF'];?>" method="post">
			<table id="login_form">
				<tbody>
				<tr><td colspan="2"></td></tr>
					<tr>
						<td><label for="usr"> Email:</label><span>*</span>
						</td>
						<td><input type="text" name="email" id="email"
							onmouseover="this.focus()" /></td>
					</tr>
					<tr>
						<td><label for="pwd"> Password:</label><span>*</span>
						</td>
						<td><input type="password" name="pwd" id="pwd"
							onmouseover="this.focus()" /></td>
					</tr>
					<?php echo (is_null($err))?(NULL):("<tr><td colspan='2' style='color:#ff0000'>{$err}</td></tr>");?>
					<tr>
						<td colspan="2" style="text-align: right"><input type="submit"
							name="submit" value="LOGIN" onmouseover="this.focus()"
							title="Login" /></td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
</body>
</html>