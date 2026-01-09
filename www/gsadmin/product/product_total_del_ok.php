<?
$menu = "04";
include('../header.php');
$_GET=&$HTTP_GET_VARS;
$_POST=&$HTTP_POST_VARS;

if($_GET[goods_data]) {
	$mv_data	= $_GET[goods_data];
	$goods_data	= $tools->decode( $_GET[goods_data] );

	// 넘어온 idx 로 삭제 레코드를 검색한다.
	$goods_stat = $db->object("cs_goods", "where idx=$goods_data[idx]");

	// 상품 리뷰 삭제
	$db->delete("cs_goods_review", "where goods_code='$goods_stat->code'");

	// 기본 이미지 삭제
	if( $goods_stat->images1) { @unlink("../../data/goodsImages/".$goods_stat->images1); }
	if( $goods_stat->images2) { @unlink("../../data/goodsImages/".$goods_stat->images2); }
	if( $goods_stat->add_images1) { @unlink("../../data/goodsImages/".$goods_stat->add_images1); }
	if( $goods_stat->add_images2) { @unlink("../../data/goodsImages/".$goods_stat->add_images2); }
	if( $goods_stat->add_images3) { @unlink("../../data/goodsImages/".$goods_stat->add_images3); }
	if( $goods_stat->add_images4) { @unlink("../../data/goodsImages/".$goods_stat->add_images4); }
	if( $goods_stat->add_images5) { @unlink("../../data/goodsImages/".$goods_stat->add_images5); }
	if( $goods_stat->goods_file) { unlink("../../data/goodsImages/".$goods_stat->goods_file); }
	if( $db->delete("cs_goods", "where idx=$goods_data[idx]") ) { $tools->javaGo("product_total.php"); }
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>
