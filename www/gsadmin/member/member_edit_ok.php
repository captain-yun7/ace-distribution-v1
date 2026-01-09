<? $mod=menu03 ?>
<? $menu=1?>
<?
include('../header.php');

$idx= $_POST[mem_data];

// 이메일 중복 검색
if( !$tools->chkMail($_POST[email], 1)) { $tools->errMsg('정확한 이메일주소를 입력해주세요.');}
if( $_POST[name]) {
	if($_POST[email])	{$_POST[email]		= $db->addSlash( $_POST[email] );}
	if($_POST[add1])	{$_POST[add1]		= $db->addSlash( $_POST[add1] );}
	if($_POST[add2])	{$_POST[add2]		= $db->addSlash( $_POST[add2] );}

	if($_POST[passwd]){
		$passwd = $tools->openssl($_POST[passwd]);
		$qry = ",passwd='".$passwd."'";
	}

	// 회원 디비 입력
	if( $db->update("cs_member", "name='$_POST[name]' $qry , level='$_POST[level]', email='$_POST[email]', tel='$_POST[tel]', phone='$_POST[phone]', zip_new='$_POST[zip_new]', add1='$_POST[add1]', add2='$_POST[add2]', birth='$_POST[birth]', mailing='$_POST[mailing]' where idx='$idx'")) { $tools->alertJavaGo('회원정보 변경이 되었습니다.', 'member_view.php?idx='.$idx); }
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>