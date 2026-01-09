<?
header("Content-type: text/html; charset=utf-8");
session_start();
include $_SERVER['DOCUMENT_ROOT']."/common.php";

if( $_SESSION[USERID] && $_SESSION[PASSWD]) {	

	$name		= 	$tools->filter($_POST[name]);
	$passwd	= 	$tools->filter($_POST[passwd]);
	$birth1		= 	$tools->filter($_POST[birth1]);
	$birth2		= 	$tools->filter($_POST[birth2]);
	$birth3		= 	$tools->filter($_POST[birth3]);
	$tel1			= 	$tools->filter($_POST[tel1]);
	$tel2			= 	$tools->filter($_POST[tel2]);
	$tel3			= 	$tools->filter($_POST[tel3]);
	$phone1	= 	$tools->filter($_POST[phone1]);
	$phone2	= 	$tools->filter($_POST[phone2]);
	$phone3	= 	$tools->filter($_POST[phone3]);
	$email1		=	$tools->filter($_POST[email1]);
	$email2		=	$tools->filter($_POST[email2]);
	$zip_new	= 	$tools->filter($_POST[zip_new]);
	$add1		= 	$tools->filter($_POST[add1]);
	$add2		= 	$tools->filter($_POST[add2]);
	$mailing	= 	$tools->filter($_POST[mailing]);

	if($birth1)		{$birth		= $birth1."-".$birth2."-".$birth3;}
	if($tel1)			{$tel			= $tel1."-".$tel2."-".$tel3;}
	if($phone1)	{$phone	= $phone1."-".$phone2."-".$phone3;}
	if($email1)	{$email		= $email1."@".$email2;}

	// 이메일 중복 검색
	if($email){
		$mail_check = $db->cnt("cs_member", "where email='$email' and not userid='$_SESSION[USERID]'"); 
		if( $mail_check ) { $tools->errMsg('이미 사용중인 이메일주소입니다.');}
	}

	if($_SESSION['SNS']){
		mt_srand((double)microtime()*1000000);
		$passwd=chr(mt_rand(65, 90));
		$passwd.=chr(mt_rand(65, 90));
		$passwd.=chr(mt_rand(65, 90));
		$passwd.=chr(mt_rand(65, 90));
		$passwd.=chr(mt_rand(65, 90));
		$passwd.=time();
		$passwd = $tools->openssl($passwd);
	}else{
		$passwd = $tools->openssl($passwd);
	}
	
	if( $db->update("cs_member",
			"passwd='$passwd',
			name='$name',
			email='$email',
			birth='$birth',
			tel='$tel',
			phone='$phone',
			mailing='$mailing',
			zip_new='$zip_new',
			add1='$add1',
			add2='$add2' where userid='$_SESSION[USERID]' and passwd='$_SESSION[PASSWD]'")) { 
		$tools->alertJavaGo('회원정보 변경이 되었습니다.', './login_ok.php?login_go='.$login_go.'&relogin=1&userid='.$_SESSION[USERID].'&passwd='.$passwd); }
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>