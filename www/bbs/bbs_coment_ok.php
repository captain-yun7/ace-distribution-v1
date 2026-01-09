<?
session_start();
set_time_limit(0);
include('../common.php');
?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<?
$mv_data	= $_GET[bbs_data];
$bbs_data	= $tools->decode( $_GET[bbs_data] );
$idx = $bbs_data[idx];
$code = $bbs_data[code];

if( $_POST[coment_reg] ) {	
	if($_SESSION[USERID]){
		$_POST[name] = $_SESSION[NAME];
		$_POST[pwd] = $_SESSION[PASSWD];
	} else {
		$_POST[name]	= $db->addSlash( $_POST[name] );		
	}
	$_POST[coment]	= $db->addSlash( $_POST[coment] );		
	$db->insert("cs_bbs_coment", "link = '$idx', coment = '$_POST[coment]', name = '$_POST[name]', pwd = '$_POST[pwd]', reg_date = now(), userid='$_SESSION[USERID]'");
	$tools->alertJavaGo("등록 하였습니다.", "$url?bbs_data=$mv_data&bgu=view");
} else if( $coment_del ) {
	
	$co_row	= $db->object("cs_bbs_coment", "where idx='$coment_idx'", "pwd");

	if($_SESSION[USERID]){

		$db->delete("cs_bbs_coment", "where idx = '$_GET[coment_idx]'");
		$tools->alertJavaGo("삭제 하였습니다.", "$url?bbs_data=$mv_data&bgu=view");

	} else {
	
		if( $co_row->pwd == $_POST[pwd] ) {
			$db->delete("cs_bbs_coment", "where idx = '$_POST[coment_idx]'");
			$tools->alertJavaGo("삭제 하였습니다.", "$url?bbs_data=$mv_data&bgu=view");
		} else {
			$tools->errMsg("패스워드가 올바르지 않습니다.");			
		}

	}

} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>