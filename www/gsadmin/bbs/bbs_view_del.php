<?
session_start();
?>
<? $mod=menu02 ?>
<?
include("../header.php");
$mv_data	= $_GET[bbs_data];
$bbs_data	= $tools->decode( $_GET[bbs_data] );
if( $_GET[idx] )			{ $idx = $_GET[idx]; } else { $idx = $bbs_data[idx]; }
if( $_GET[code] )			{ $code = $_GET[code]; } else { $code = $bbs_data[code]; }

if( $_POST[bbs_view_del] ) {
	$row = $db->object("cs_bbs_data", "where idx = $idx", "pwd, bbs_file");
	if( $row->pwd == $_POST[pwd] || $_SESSION[ADMIN_PASSWD]==$_POST[pwd]) {
		// 자료실 삭제
		if( $row->bbs_file != "none" ) { @unlink("../../data/bbsData/".$row->bbs_file); }
		// 코멘트 삭제
		$db->delete("cs_bbs_coment", "where link = $idx");
		// 작성글 삭제
		$db->delete("cs_bbs_data", "where idx = $idx");
		$tools->alertJavaGo("삭제 하였습니다.", "bbs_list.php?menu=$menu&idx=$idx&startPage=$startPage&listNo=$listNo&table=$table&code=$code&search_item=$search_item&search_order=$search_order");
	} else {
		$tools->errMsg("패스워드가 올바르지 않습니다.");
	}
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>