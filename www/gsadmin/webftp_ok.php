<? include('../common.php'); ?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<?
$_POST=&$HTTP_POST_VARS;
$_FILES=&$HTTP_POST_FILES;

// 웹FTP 등록
if( $_POST[webftp_check] == "reg") {
	
	// 파일이름이 한글인지 체크한다. 한글이면 에러 영문이면 통과
	if( $tools->chkHan($_FILES[upload][name])) { $tools->errMsg('파일명이 한글이면 입력할수 없습니다.\\n\n파일명은 영어로 변경해 주세요');}

	//  현재 등록된 웹 FTP 정보를 불러온다. 동일한 파일이름이 있으면 등록불가능.
	$webftp_result = $db->select("cs_webftp", ""); while( $webftp_row = @mysql_fetch_object($webftp_result)) { if( $_FILES[upload][name] == $webftp_row->name ) { $tools->errMsg('동일한 파일의 이름이 있습니다\n\n다시 입력해 주세요');}}

	// 등록하는 파일이 정상적으로 등록되면 사이즈가 0이상이 된다.
	if( $_FILES[upload][size] > 0 ) {
		// 업로드 파일 제한 확장자  체크하기 아래의 배열에 추가하면 같은 확장자는 등록 되지 않는다.
		$EXT_CHECK = array("php", "php3", "htm", "html", "cgi", "perl");	if( !strstr( $_FILES[upload][name], ".")) { $tools->errMsg( strtoupper("확장자가 없는 ".$_FILES[upload][name])." 은 업로드 할수 없습니다." ); } else if( $EXT_TMP = explode( ".", $_FILES[upload][name])) { foreach ($EXT_CHECK as $value) { if( strstr( $value, strtolower($EXT_TMP[1]))) { $tools->errMsg( strtoupper($EXT_TMP[1])." 은 업로드 할수 없습니다." );}}}		
		// 파일 용량 체크 4메가까지 업로드 가능으로 설정함
		if( $_FILES[upload][size]  > 1024*1024*4) { $tools->errMsg("업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다");}		
		// 파일 이름 설정
		$upload_file_name	= $_FILES[upload][name];		
		// 파일 업로드 
		if( !@move_uploaded_file($_FILES[upload][tmp_name], $ROOT_DIR."/data/upload/".$upload_file_name) ) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[upload][tmp_name]);} 
		// 파일 업로드가 완료시 디비에 입력한다.
		if( $db->insert("cs_webftp", "name='$upload_file_name'") ) { $tools->metaGo("webftp.php"); } else { @unlink($ROOT_DIR."/data/upload/".$upload_file_name); }
	} else {
		$tools->errMsg('등록할 파일이 없습니다.');
	}
// 웹 FTP 삭제
} else if( $_POST[webftp_check] == "del") {
	//  현재 등록된 웹 FTP 정보를 불러온다.
	$webftp_result = $db->select("cs_webftp", "");
	while( $webftp_row = @mysql_fetch_object($webftp_result)) {
		// 체크박스에 체크된것은 삭제한다.
		$check_str = "check_".$webftp_row->idx;
		if( $_POST[$check_str] ) { $db->delete("cs_webftp", "where idx=$_POST[$check_str]");  @unlink($ROOT_DIR."/data/upload/".$webftp_row->name); }
		$check_cnt--;
	}
	// 완료후 이동한다.
	$tools->metaGo("webftp.php");
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>
