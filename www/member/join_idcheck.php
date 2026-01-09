<?
header("Content-type: text/html; charset=utf-8");
include $_SERVER['DOCUMENT_ROOT']."/common.php";

if($_GET[userid])	{$userid	= $_GET[userid];}

if($userid){
	$count = $db->cnt("cs_member","where userid='$userid'");
	if(empty($count)){
		$count_exit = $db->cnt("cs_member_exit","where userid='$userid'");
		if(empty($count_exit)){
			echo '<strong class="font-ok">사용하실 수 있는 아이디입니다.</strong>';
		}else{
			//회원탈퇴
			echo '<strong class="font-caution">이미 사용중인 아이디입니다.</strong>';
		}
	}else{
		echo '<strong class="font-caution">이미 사용중인 아이디입니다.</strong>';
	}
}
?>