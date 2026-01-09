<?
header("Content-type: text/html; charset=utf-8");
session_start();
include $_SERVER['DOCUMENT_ROOT']."/common.php";
$admin_stat		=	$db->object("cs_admin", "");

//디바이스체크
$site_url = "/";
//$site_url = $tools->deviceURL();

if($_POST[userid])		{$userid		= 	$tools->filter($_POST[userid]);}		else if($_GET[userid])		{$userid		= 	$tools->filter($_GET[userid]);}
if($_POST[passwd])	{$passwd	= 	$tools->filter($_POST[passwd]);}	else if($_GET[passwd])		{$passwd	= 	$tools->filter($_GET[passwd]);}

if( $_GET[logout]==1) {
	$_SESSION['USERID'] = "";
	$_SESSION['NAME'] = "";
	$_SESSION['PASSWD'] = "";
	$_SESSION['LEVEL'] = "";
	$_SESSION['SNS'] = "";
	$tools->metaGo($site_url);
} else if( $_POST[login] ==1 ){
		
	$passwd = $tools->openssl($passwd);

	$mem_check = $db->cnt("cs_member", "where userid='$userid' and passwd='$passwd'");
	if( !$mem_check) {

		$tools->errMsg('아이디 또는 비밀번호를 다시 확인하세요. \n'.$admin_stat->shop_name.'에 등록되지 않은 아아디이거나 아이디 또는 비밀번호를 잘못 입력하셨습니다.');
	} else {
		$member_stat = $db->object("cs_member", "where userid='$userid' and passwd='$passwd'");
		$USERID	= $member_stat->userid;
		$NAME		= $member_stat->name;
		$PASSWD	= $member_stat->passwd;
		$LEVEL		= $member_stat->level;
		$SNS			= $member_stat->sns;

		if($_POST[rem]=="y"){
		setcookie('cookie_id',$USERID,time()+864000,$site_url);
		} else {
		setcookie('cookie_id','',0,$site_url);
		}

		$db->update("cs_member", "connect=$member_stat->connect+1, register_login=now() where userid='$member_stat->userid' and passwd='$member_stat->passwd'");
		$_SESSION['USERID'] = $USERID;
		$_SESSION['NAME'] = $NAME;
		$_SESSION['PASSWD'] = $PASSWD;
		$_SESSION['LEVEL'] = $LEVEL;
		$_SESSION['SNS'] = $SNS;
		//다른곳에서 이동했다면 원래 상태로 돌려 보내준다.
		if($login_go) { 
			if(strpos($login_go,"login_ok.php") !== false or strpos($login_go,"login.php") !== false or strpos($login_go,"join_finish.php") !== false or strpos($login_go,"id_search.php") !== false or strpos($login_go,"id_search_check.php") !== false or strpos($login_go,"pwd_search.php") !== false){//로그인,아이디찾기,비밀번호찾기,회원가입완료 등등 페이지에서 이동했다면 메인페이지로 이동시킨다.
				$tools->metaGo($site_url);
			}else{
				$tools->metaGo($login_go);
			}
		
		} else {
			$tools->metaGo($site_url);
		}
	}
} else if( $_GET[relogin] ==1 ){
	$_SESSION['USERID'] = "";
	$_SESSION['NAME'] = "";
	$_SESSION['PASSWD'] = "";
	$_SESSION['LEVEL'] = "";
	$_SESSION['SNS'] = "";
	$_SESSION['REFERER'] = "";
	$mem_check = $db->cnt("cs_member", "where userid='$userid' and passwd='$passwd'");
	if( !$mem_check) {

		$tools->errMsg('아이디 또는 비밀번호를 다시 확인하세요. \n'.$admin_stat->shop_name.'에 등록되지 않은 아아디이거나 아이디 또는 비밀번호를 잘못 입력하셨습니다.');
	} else {
		$member_stat = $db->object("cs_member", "where userid='$userid' and passwd='$passwd'");
		$USERID		= $member_stat->userid;
		$NAME		= $member_stat->name;
		$PASSWD	= $member_stat->passwd;
		$LEVEL			= $member_stat->level;
		$SNS			= $member_stat->sns;
		$db->update("cs_member", "connect=$member_stat->connect+1, register_login=now() where userid='$member_stat->userid' and passwd='$member_stat->passwd'");
		$_SESSION['USERID'] = $USERID;
		$_SESSION['NAME'] = $NAME;
		$_SESSION['PASSWD'] = $PASSWD;
		$_SESSION['LEVEL'] = $LEVEL;
		$_SESSION['SNS'] = $SNS;
		if($login_go) { $tools->metaGo($login_go);} else {$tools->metaGo($site_url);}
	}
}
?>