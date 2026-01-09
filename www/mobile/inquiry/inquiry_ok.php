<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<? include "../../common.php"; ?>
<?
if($_POST[name]){

	// 파일업로드 
	if( $_FILES[bbs_file][size] > 0 ) {
		$EXT_CHECK = array("php", "php3", "htm", "html", "cgi", "perl");	// 업로드 파일 제한 확장자 추가 가능
		if( $EXT_TMP = explode( ".", $_FILES[bbs_file][name])) {	 foreach ($EXT_CHECK as $value) { if( strstr( $value, strtolower($EXT_TMP[1]))) { $tools->errMsg( strtoupper($EXT_TMP[1])." 은 업로드 할수 없습니다." ); } }	}
		if( $_FILES[bbs_file][size]  > 1024*1024*20) { $tools->errMsg("업로드 용량 초과입니다\\n\\n20메가 까지 업로드 가능합니다"); exit(); }
		$filename = substr($_FILES[bbs_file][name],-5);
		$fn = explode(".",$filename); 
		$EXT_TMP = $fn[1]; 
		$file_name	= time()."1.".$EXT_TMP;
		$sfile_name = $_FILES[bbs_file][name];
		if( !@move_uploaded_file($_FILES[bbs_file][tmp_name], "../../data/bbsData/".$file_name) ) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[bbs_file][tmp_name]);	} 
	} else {
		$file_name 	= "";
	}

	$email = $email."@".$email2;

	$query = "insert into cs_online set company='$_POST[company]', name='$_POST[name]', tel1='$_POST[tel1]', tel2='$_POST[tel2]', tel3='$_POST[tel3]', email='$email', content='$content', file='$file_name', udate=now()";
	mysql_query($query);


	//메일보내기(시작)
	include $_SERVER['DOCUMENT_ROOT']."/lib/mail_class.php";
	$mail = new my_mime_mail();
	$admin_stat = $db->object("cs_admin","");

	if($admin_stat->shop_email){

		$mail_row = $db->object("cs_mailform","where code='online'");

		$mail_subject			= $mail_row->subject;
		$mail_content			= $mail_row->content;
		
		$mail_subject = str_replace("[{SHOP_NAME}]", $admin_stat->shop_name, $mail_subject);

		$mail_content = str_replace("[{SHOP_NAME}]", $admin_stat->shop_name, $mail_content);
		$mail_content = str_replace("[{USER_NAME}]", $_POST[name], $mail_content);

		$tel = $_POST[tel1]."-".$_POST[tel2]."-".$_POST[tel3];
		$mail_content = str_replace("[{USER_TEL}]", $tel, $mail_content);
		$mail_content = str_replace("[{USER_COMPANY}]", $_POST[company], $mail_content);
		$mail_content = str_replace("[{USER_EMAIL}]", $email, $mail_content);
		$mail_content = str_replace("[{USER_CONTENT}]", nl2br($content), $mail_content);

		$file_text = "<a href='http://".$_SERVER['HTTP_HOST']."/data/bbsData/".$file_name."'>".$file_name."</a>";
		$mail_content = str_replace("[{USER_FILE}]", $file_text, $mail_content);
		$mail_content = str_replace("[{SHOP_DOMAIN}]", "http://".$_SERVER['HTTP_HOST'], $mail_content);

		$conf['charset'] = "UTF-8";
		$mail_to_name		= "=?$conf[charset]?B?".base64_encode($name) . "?=";
		$mail_from_name	= "=?$conf[charset]?B?".base64_encode($admin_stat->shop_name) . "?=";
		$mail_subject			= "=?$conf[charset]?B?".base64_encode($mail_subject) . "?=";

		$mail->to =  $mail_from_name." <".$admin_stat->shop_email.">";
		$mail->from = $mail_from_name." <".$admin_stat->shop_email.">";
		$mail->subject = $mail_subject;
		$mail->body = $mail_content;
		$mail->send();

	}
	//메일보내기(종료)


	$tools->alertJavaGo("성공적으로 접수 되었습니다.","inquiry.php");

}
?>