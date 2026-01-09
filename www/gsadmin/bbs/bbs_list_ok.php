<? $mod=menu02 ?>
<?
include("../header.php");
$code = $_GET[code];

if($_GET['arr_del_list']) {
	$arr_idx = explode('@',$_GET['arr_del_list']);
	if(sizeof($arr_idx)) {
		foreach($arr_idx as $key=>$val) {
			if($val) {
				$row = $db->object("cs_bbs_data", "where idx = ".$val, "bbs_file");
				if( $row->bbs_file != "none" ) { @unlink("../../data/bbsData/".$row->bbs_file); }
				if(!$db->delete("cs_bbs_data", "where idx =".$val)) $tools->errMsg('삭제 실패.\n\n다시 시도해주세요');
			}
		}
	}
	$tools->alertJavaGo("삭제 하였습니다.", "bbs_list.php?code=$code&menu=$menu&startPage=$startPage&listNo=$listNo&table=$table");
} else {
	if($db->delete("cs_bbs_data", "where idx =".$_GET['del_list'])) $tools->alertJavaGo("삭제 하였습니다.", "bbs_list.php?code=$code&menu=$menu&startPage=$startPage&listNo=$listNo&table=$table");
	else $tools->errMsg('삭제 실패.\n\n다시 시도해주세요');
}
?>