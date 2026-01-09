<? 
//상품코드를 사용합니까?   사용시 "y" 사용안하면 "" 공란 
$g_code =""; //   t 는 타임  생성 다른값이면 코드사용
if($g_code != "y") { 
$mtime = mktime();  
$mt = substr($mtime,-4);
//$my= date(y,$mtime);
$mm = date(m,$mtime);
$md = date(d,$mtime);

$m_code="$my$mm$md-$mt"; 

}// 유닉스 타임값을 사용 

$g_vander = ""; // 제조사 사용 
$g_made = ""; // 원산지
$g_brand = ""; // 브랜드

$g_set = ""; // 관련상품 사용

$g_dis = "y"; // 상품 등록시 초기에 무조건 보임 
$g_stock = "100"; // 재고량 사용

$g_stock_ch ="o"; //재고량 c 는 카트 o 는 주문  d 는 배송 완료 시점 
$g_stock_out ="y";  // 품절 상품 표시 

$g_mile = "";
if($g_mile=="y"){
	$g_mile_p = "10";
}

$g_sale_price = "";  //할인가 사용
$g_buy_price = "";  //구매가격 사용

$gd_pohto ="6";   //gd 이미지 생성 갯수

$gd_w_1 = "50";
$gd_w_2 = "83";
$gd_w_3 = "100";
$gd_w_4 = "152";
$gd_w_5 = "250";
$gd_w_6 = "500";

$g_big = ""; // 큰사진 갯수  10개까지

$g_price = "y"; //옵션상품사용유무
$g_member = ""; //회원별 가격 구분

$g_opta= "y"; //상품 옵션 사용유무
$g_optb= "y"; // 상품 옵션 사용유무

$g_edit ="y"; // 상품 등록 에디터 사용 
$g_comment = ""; //코멘트 사용

$g_main = "y";	//메인표출 유무(Pick_out)
$g_event = "y";	//이벤트 유무(Pick_event)

$g_bul = "";	//블릿 유무(Pick_event)
$g_mark = "";	//마크 유무(Pick_event)

$g_list_gif = ""; //리스트에서 gif 이미지사용
?>

