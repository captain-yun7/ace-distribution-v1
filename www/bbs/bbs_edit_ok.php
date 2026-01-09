<?
session_start();
set_time_limit(0);
include('../common.php');
?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<?
$mv_data	= $_POST[bbs_data];
$bbs_data	= $tools->decode( $_POST[bbs_data] );
$idx = $bbs_data[idx];
$code = $bbs_data[code];

if(!$code) { $tools->errMsg("잘못된 접근입니다");}
$bbs_admin_stat		=	$db->object("cs_bbs", "where code='$code'");

// 게시판 접근 권한 설정
if( $bbs_admin_stat->bbs_access == 1 ) {
	if( !$_SESSION[USERID] ) { $tools->errMsg('회원 전용입니다.\n\n로그인을 해주세요');}
}
if( $bbs_admin_stat->bbs_write >= 1 ) {
	if( !$_SESSION[USERID] ) { $tools->errMsg('회원 전용입니다.\n\n로그인을 해주세요');}
}

if( $_POST[name] ) {
	//-------------------------------------------------------------//
	if($_POST[subject])		{$_POST[subject]	= $db->stripSlash( $_POST[subject] );}
	if($_POST[name])		{$_POST[name]		= $db->stripSlash( $_POST[name] );}
	if($_POST[email])		{$_POST[email]		= $db->stripSlash( $_POST[email] );}

	if($_POST[subject])		{$_POST[subject]	= $db->addSlash( $_POST[subject] );}
	if($_POST[name])		{$_POST[name]		= $db->addSlash( $_POST[name] );}
	if($_POST[email])		{$_POST[email]		= $db->addSlash( $_POST[email] );}

if($_SESSION[USERID]){
	$_POST[name] = $_SESSION[NAME];
	$_POST[pwd] = $_SESSION[PASSWD];
} else {	
	
	$_POST[name] = preg_replace('/(<)(|\/)(\!|\?|html|head|title|meta|body|script|style|base|noscript|
  form|input|select|option|optgroup|textarea|button|label|fieldset|legend|iframe|embed|object|param|
  frameset|frame|noframes|basefont|applet| isindex|xmp|plaintext|listing|bgsound|marquee|blink|
  noembed|comment|xml)/i', '&lt;$3', $_POST[name]);
  
  $_POST[name] = preg_replace_callback("/([^a-z])(o)(n)/i", 
  create_function('$matches', 'if($matches[2]=="o") $matches[2] = "&#111;";
  else $matches[2] = "&#79;"; return $matches[1].$matches[2].$matches[3];'), $_POST[name]);	

} 
	
	$_POST[subject] = preg_replace('/(<)(|\/)(\!|\?|html|head|title|meta|body|script|style|base|noscript|
  form|input|select|option|optgroup|textarea|button|label|fieldset|legend|iframe|embed|object|param|
  frameset|frame|noframes|basefont|applet| isindex|xmp|plaintext|listing|bgsound|marquee|blink|
  noembed|comment|xml)/i', '&lt;$3', $_POST[subject]);
  
  $_POST[subject] = preg_replace_callback("/([^a-z])(o)(n)/i", 
  create_function('$matches', 'if($matches[2]=="o") $matches[2] = "&#111;";
  else $matches[2] = "&#79;"; return $matches[1].$matches[2].$matches[3];'), $_POST[subject]);
  
  
if($bbs_admin_stat->editor=="1"){ 

	//$_POST[content] = $tx_content;
	
} else {
	
	$_POST[content] = preg_replace('/(<)(|\/)(\!|\?|html|head|title|meta|body|script|style|base|noscript|
  form|input|select|option|optgroup|textarea|button|label|fieldset|legend|iframe|embed|object|param|
  frameset|frame|noframes|basefont|applet| isindex|xmp|plaintext|listing|bgsound|marquee|blink|
  noembed|comment|xml)/i', '&lt;$3', $tx_content);
  
  $_POST[content] = preg_replace_callback("/([^a-z])(o)(n)/i", 
  create_function('$matches', 'if($matches[2]=="o") $matches[2] = "&#111;";
  else $matches[2] = "&#79;"; return $matches[1].$matches[2].$matches[3];'), $_POST[content]);	
  
}

	//-------------------------------------------------------------//

	// 파일업로드 
	$bbs_data_stat = $db->object("cs_bbs_data", "where idx='$idx'", "bbs_file, bbs_file2, bbs_file3, bbs_file4, bbs_file5, sbbs_file, sbbs_file2, sbbs_file3, sbbs_file4, sbbs_file5");

	// 파일업로드 
	if($imdel1=="y"){
		$file_name = "none";
		$sfile_name = "";
	} else {
		if( $_FILES[bbs_file][size] > 0 ) {
			@unlink( "../data/bbsData/".$bbs_data_stat->bbs_file );
			$EXT_CHECK = array("php", "php3", "htm", "html", "cgi", "perl");	// 업로드 파일 제한 확장자 추가 가능
			if( $EXT_TMP = explode( ".", $_FILES[bbs_file][name])) {	 foreach ($EXT_CHECK as $value) { if( strstr( $value, strtolower($EXT_TMP[1]))) { $tools->errMsg( strtoupper($EXT_TMP[1])." 은 업로드 할수 없습니다." ); } }	}
			if( $_FILES[bbs_file][size]  > 1024*1024*20) { $tools->errMsg("업로드 용량 초과입니다\\n\\n20메가 까지 업로드 가능합니다"); exit(); }
			$filename = substr($_FILES[bbs_file][name],-5);
			$fn = explode(".",$filename); 
			$EXT_TMP = $fn[1];
			$file_name	= time()."1.".$EXT_TMP;
			$sfile_name = $_FILES[bbs_file][name];
			if( !@move_uploaded_file($_FILES[bbs_file][tmp_name], "../data/bbsData/".$file_name) ) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[bbs_file][tmp_name]);	} 
		} else {
			$file_name 	= $bbs_data_stat->bbs_file;
			$sfile_name = $bbs_data_stat->sbbs_file;
		}
	}

	// 파일업로드 
	if($imdel2=="y"){
		$file_name2 = "none";
		$sfile_name2 = "";
	} else {
		if( $_FILES[bbs_file2][size] > 0 ) {
			@unlink( "../data/bbsData/".$bbs_data_stat->bbs_file2 );
			$EXT_CHECK = array("php", "php3", "htm", "html", "cgi", "perl");	// 업로드 파일 제한 확장자 추가 가능
			if( $EXT_TMP = explode( ".", $_FILES[bbs_file2][name])) {	 foreach ($EXT_CHECK as $value) { if( strstr( $value, strtolower($EXT_TMP[1]))) { $tools->errMsg( strtoupper($EXT_TMP[1])." 은 업로드 할수 없습니다." ); } }	}
			if( $_FILES[bbs_file2][size]  > 1024*1024*20) { $tools->errMsg("업로드 용량 초과입니다\\n\\n20메가 까지 업로드 가능합니다"); exit(); }
			$filename = substr($_FILES[bbs_file2][name],-5);
			$fn = explode(".",$filename); 
			$EXT_TMP = $fn[1];
			$file_name2	= time()."2.".$EXT_TMP;
			$sfile_name2 = $_FILES[bbs_file2][name];
			if( !@move_uploaded_file($_FILES[bbs_file2][tmp_name], "../data/bbsData/".$file_name2) ) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[bbs_file2][tmp_name]);	} 
		} else {
			$file_name2 	= $bbs_data_stat->bbs_file2;
			$sfile_name2 = $bbs_data_stat->sbbs_file2;
		}
	}

	// 파일업로드 
	if($imdel3=="y"){
		$file_name3 = "none";
		$sfile_name3 = "";
	} else {
		if( $_FILES[bbs_file3][size] > 0 ) {
			@unlink( "../data/bbsData/".$bbs_data_stat->bbs_file3 );
			$EXT_CHECK = array("php", "php3", "htm", "html", "cgi", "perl");	// 업로드 파일 제한 확장자 추가 가능
			if( $EXT_TMP = explode( ".", $_FILES[bbs_file3][name])) {	 foreach ($EXT_CHECK as $value) { if( strstr( $value, strtolower($EXT_TMP[1]))) { $tools->errMsg( strtoupper($EXT_TMP[1])." 은 업로드 할수 없습니다." ); } }	}
			if( $_FILES[bbs_file3][size]  > 1024*1024*20) { $tools->errMsg("업로드 용량 초과입니다\\n\\n20메가 까지 업로드 가능합니다"); exit(); }
			$filename = substr($_FILES[bbs_file3][name],-5);
			$fn = explode(".",$filename); 
			$EXT_TMP = $fn[1];
			$file_name3	= time()."3.".$EXT_TMP;
			$sfile_name3 = $_FILES[bbs_file3][name];
			if( !@move_uploaded_file($_FILES[bbs_file3][tmp_name], "../data/bbsData/".$file_name3) ) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[bbs_file3][tmp_name]);	} 
		} else {
			$file_name3 	= $bbs_data_stat->bbs_file3;
			$sfile_name3 = $bbs_data_stat->sbbs_file3;
		}
	}

	// 파일업로드 
	if($imdel4=="y"){
		$file_name4 = "none";
		$sfile_name4 = "";
	} else {
		if( $_FILES[bbs_file4][size] > 0 ) {
			@unlink( "../data/bbsData/".$bbs_data_stat->bbs_file4 );
			$EXT_CHECK = array("php", "php3", "htm", "html", "cgi", "perl");	// 업로드 파일 제한 확장자 추가 가능
			if( $EXT_TMP = explode( ".", $_FILES[bbs_file4][name])) {	 foreach ($EXT_CHECK as $value) { if( strstr( $value, strtolower($EXT_TMP[1]))) { $tools->errMsg( strtoupper($EXT_TMP[1])." 은 업로드 할수 없습니다." ); } }	}
			if( $_FILES[bbs_file4][size]  > 1024*1024*20) { $tools->errMsg("업로드 용량 초과입니다\\n\\n20메가 까지 업로드 가능합니다"); exit(); }
			$filename = substr($_FILES[bbs_file4][name],-5);
			$fn = explode(".",$filename); 
			$EXT_TMP = $fn[1];
			$file_name4	= time()."4.".$EXT_TMP;
			$sfile_name4 = $_FILES[bbs_file4][name];
			if( !@move_uploaded_file($_FILES[bbs_file4][tmp_name], "../data/bbsData/".$file_name4) ) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[bbs_file4][tmp_name]);	} 
		} else {
			$file_name4 	= $bbs_data_stat->bbs_file4;
			$sfile_name4 = $bbs_data_stat->sbbs_file4;
		}
	}

	// 파일업로드 
	if($imdel5=="y"){
		$file_name5 = "none";
		$sfile_name5 = "";
	} else {
		if( $_FILES[bbs_file5][size] > 0 ) {
			@unlink( "../data/bbsData/".$bbs_data_stat->bbs_file5 );
			$EXT_CHECK = array("php", "php3", "htm", "html", "cgi", "perl");	// 업로드 파일 제한 확장자 추가 가능
			if( $EXT_TMP = explode( ".", $_FILES[bbs_file5][name])) {	 foreach ($EXT_CHECK as $value) { if( strstr( $value, strtolower($EXT_TMP[1]))) { $tools->errMsg( strtoupper($EXT_TMP[1])." 은 업로드 할수 없습니다." ); } }	}
			if( $_FILES[bbs_file5][size]  > 1024*1024*20) { $tools->errMsg("업로드 용량 초과입니다\\n\\n20메가 까지 업로드 가능합니다"); exit(); }
			$filename = substr($_FILES[bbs_file5][name],-5);
			$fn = explode(".",$filename); 
			$EXT_TMP = $fn[1];
			$file_name5	= time()."5.".$EXT_TMP;
			$sfile_name5 = $_FILES[bbs_file5][name];
			if( !@move_uploaded_file($_FILES[bbs_file5][tmp_name], "../data/bbsData/".$file_name5) ) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[bbs_file5][tmp_name]);	} 
		} else {
			$file_name5 	= $bbs_data_stat->bbs_file5;
			$sfile_name5 = $bbs_data_stat->sbbs_file5;
		}
	}


	$company = $tools->filter($_POST[company]);
	$tel = $tools->filter($_POST[tel]);
	$kyung = $tools->filter($_POST[kyung]);
	$price = $tools->filter($_POST[price]);
	$time = $tools->filter($_POST[time]);
	$holiday = $tools->filter($_POST[holiday]);
	$etc = $tools->filter($_POST[etc]);

	// 디비에 입력
	if( $db->update("cs_bbs_data", "subject='$_POST[subject]', name='$_POST[name]', pwd='$_POST[pwd]', email='$_POST[email]', tag='$_POST[tag]', content='$_POST[content]', bbs_file='$file_name', bbs_file2='$file_name2', bbs_file3='$file_name3', bbs_file4='$file_name4', bbs_file5='$file_name5', sbbs_file='$sfile_name', sbbs_file2='$sfile_name2', sbbs_file3='$sfile_name3', sbbs_file4='$sfile_name4', sbbs_file5='$sfile_name5', sum_img='$_POST[sum_img]', secret='$_POST[secret]', company='$company', tel='$tel', kyung='$kyung', price='$price', time='$time', holiday='$holiday', etc='$etc' where idx='$idx'") ) { $tools->alertJavaGo("수정 하였습니다.", "$url?bbs_data=$mv_data"); } else { $tools->errMsg('비상적으로 입력 되었습니다.');}
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>