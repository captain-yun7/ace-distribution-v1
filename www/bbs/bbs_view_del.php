<?
session_start();
set_time_limit(0);
include('../common.php');
?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<?
$mv_data	= $_GET[bbs_data];
$bbs_data	= $tools->decode( $_GET[bbs_data] );
if( $_GET[idx] )			{ $idx = $_GET[idx]; } else { $idx = $bbs_data[idx]; }
if( $_GET[code] )			{ $code = $_GET[code]; } else { $code = $bbs_data[code]; }

if( $_POST[bbs_view_del] ) {
	$bbs_stat = $db->object("cs_bbs_data", "where idx = '$idx'", "pwd, bbs_file");
	
	if($_SESSION[USERID]){

			// 자료실 삭제
			if( $bbs_stat->bbs_file != "none" ) { @unlink("../data/bbsData/".$bbs_stat->bbs_file); }
			// 코멘트 삭제
			$db->delete("cs_bbs_coment", "where link = '$idx'");
			// 작성글 삭제
			$db->delete("cs_bbs_data", "where idx = '$idx'");
			$tools->alertJavaGo("삭제 하였습니다.", "$url?bbs_data=$mv_data");

	} else {
	
		if( $bbs_stat->pwd == $_POST[pwd] ) {
			// 자료실 삭제
			if( $bbs_stat->bbs_file != "none" ) { @unlink("../data/bbsData/".$bbs_stat->bbs_file); }
			// 코멘트 삭제
			$db->delete("cs_bbs_coment", "where link = '$idx'");
			// 작성글 삭제
			$db->delete("cs_bbs_data", "where idx = '$idx'");
			$tools->alertJavaGo("삭제 하였습니다.", "$url?bbs_data=$mv_data");
		} else {
			$tools->errMsg("패스워드가 올바르지 않습니다.");			
		}

	}
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>