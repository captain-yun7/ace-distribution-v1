<?
header("Content-type: text/html; charset=utf-8");
session_start();
include $_SERVER['DOCUMENT_ROOT']."/common.php";
$admin_stat =	$db->object("cs_admin", "");

//디바이스체크
//$site_url = $tools->deviceURL();

if( $_POST[userid] ) {	

	$userid		= 	$tools->filter($_POST[userid]);
	$passwd	= 	$tools->filter($_POST[passwd]);
	$name		= 	$tools->filter($_POST[name]);
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

	// 한글 아이디 체크 및 중복검색
	if( $tools->chkHan($userid)) {
		$tools->errMsg('한글아이디는 지원되지 않습니다.');
	} else {
		$userid_check = $db->cnt("cs_member", "where userid='$userid'");if( $userid_check ) { $tools->errMsg('이미 사용중인 아이디입니다.');}
		$userid_check = $db->cnt("cs_member_exit", "where userid='$userid'");if( $userid_check ) { $tools->errMsg('이미 사용중인 아이디입니다.');}
	}

	// 이메일 중복 검색
	if($email){
		$mail_check = $db->cnt("cs_member", "where email='$email'"); 
		if( $mail_check ) { $tools->errMsg('이미 사용중인 이메일주소입니다.');}
	}


	//PW암호화
	$passwd = $tools->openssl($passwd);


	//IP
	$ip=$_SERVER['REMOTE_ADDR'];

	if( $db->insert("cs_member",
		"userid='$userid',
		passwd='$passwd',
		name='$name',
		email='$email',
		birth='$birth',
		tel='$tel',
		phone='$phone',
		zip_new='$zip_new',
		add1='$add1',
		add2='$add2',
		mailing='$mailing',
		level=1,
		ip='$ip',
		register=now(),
		register_login=now()") ) { 

		// 회원 가입 적립금
		if($admin_stat->point_register > 0){
			$db->insert("cs_point", "userid='$userid', title='신규가입 감사 적립금', point='$admin_stat->point_register', register=now()");
		}

		//메일보내기(시작)
		include $_SERVER['DOCUMENT_ROOT']."/lib/mail_class.php";
		$mail = new my_mime_mail();
		$mail_row = $db->object("cs_mailform","where code='join'");

		$mail_subject			= $mail_row->subject;
		$mail_content			= $mail_row->content;

		$mail_subject = str_replace("[{SHOP_NAME}]", $admin_stat->shop_name, $mail_subject);
		$mail_content = str_replace("[{SHOP_NAME}]", $admin_stat->shop_name, $mail_content);
		$mail_content = str_replace("[{SHOP_DOMAIN}]", "http://".$_SERVER['HTTP_HOST'], $mail_content);
		$mail_content = str_replace("[{USER_NAME}]", $name, $mail_content);
		$mail_content = str_replace("[{USER_ID}]", $userid, $mail_content);

		$conf['charset'] = "UTF-8";
		$mail_to_name		= "=?$conf[charset]?B?".base64_encode($name) . "?=";
		$mail_from_name	= "=?$conf[charset]?B?".base64_encode($admin_stat->shop_name) . "?=";
		$mail_subject			= "=?$conf[charset]?B?".base64_encode($mail_subject) . "?=";

		$mail->to =  $mail_to_name." <".$email.">";
		$mail->from = $mail_from_name." <".$admin_stat->shop_email.">";
		$mail->subject = $mail_subject;
		$mail->body = $mail_content;
		$mail->send();
		//메일보내기(종료)

		// 회원 가입완료
		$tools->javaGo('./join_finish.php?userid='.$_POST[userid]);

	} else {
		$tools->errMsg('비상적으로 입력되었습니다.');
	}
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>