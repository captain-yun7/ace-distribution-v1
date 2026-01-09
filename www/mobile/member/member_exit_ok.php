<?
header("Content-type: text/html; charset=utf-8");
session_start();
include $_SERVER['DOCUMENT_ROOT']."/common.php";

if($_SESSION['USERID']) {
	
	$passwd	= 	$tools->filter($_POST[passwd]);
	
	$userid		= $_SESSION['USERID'];
	$passwd	= $tools->openssl($passwd);

	if($_SESSION['SNS']){
		if( !$db->cnt("cs_member", "where userid='$userid'")){ $tools->errMsg('회원정보입력이 정확하지 않습니다.');}
		$row = $db->object("cs_member", "where userid='$userid'");
	}else{
		if( !$db->cnt("cs_member", "where userid='$userid' and passwd='$passwd'")){ $tools->errMsg('회원정보입력이 정확하지 않습니다.');}
		$row = $db->object("cs_member", "where userid='$userid' and passwd='$passwd'");
	}
	
	if( $db->insert("cs_member_exit",
		"
			userid='$_SESSION[USERID]',
			sns='$row->sns',
			name='$row->name',
			register=now()
		"
	))
		{
			$db->delete("cs_member", "where userid='$userid'");
			//$db->delete("cs_wishlist", "where userid='$userid'");//찜목록
			//$db->delete("cs_point", "where userid='$userid'");//포인트

			$tools->alertJavaGo("탈퇴처리되었습니다. 그동안 이용해주셔서 감사합니다.", "./login_ok.php?logout=1"); 
		}

} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>