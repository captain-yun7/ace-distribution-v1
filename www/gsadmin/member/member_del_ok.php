<? $mod=menu02 ?>
<? $menu=1?>
<?
include('../header.php');


if($idx) {

	// 넘어온 idx 로 삭제 레코드를 검색한다.
	$row = $db->object("cs_member", "where idx='$idx'");
	// 포인트 삭제

	if( $db->delete("cs_member", "where idx='$idx'") ) { $tools->javaGo("member.php?startPage=$startPage&listNo=$listNo&table=$table&search_item=$search_item&search_order=$search_order&order_chk=$order_chk&order_list=$order_list&search_01=$search_01&search_02=$search_02&search_03=$search_03"); }
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}


?>



