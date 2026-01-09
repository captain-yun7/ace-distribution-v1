<?
##-------------------------------------------------------------------##
##  프로그램명 : NX-Shop V2.3/madeshop v3.0
## 저작권자 (주)스타트코리아 /사용권자 아이메이드 
## 본 프로그램은 저작권 보호를 받는 상용소프트웨어 입니다.
## 임의로 배포시 형사처벌을 받을수 있습니다.
##-------------------------------------------------------------------##
##                           파일명 및 설명
##-------------------------------------------------------------------##
##  파일이름 : good_code_chk.php
##  파일설명 : 현재위치 표시줄 (이용은 각 페이지에서 $whereisnow를 프린트
##-------------------------------------------------------------------##

$Find_Where = explode($Path,$SCRIPT_FILENAME);//SCRIPT_FILENAME 은 아파치 환경변수

switch($Find_Where[1]){	
	case("/board/index.php"):
		if($boardid == "board_notice"){
			$whereisnow = "News & Notice";
		}elseif($boardid == "board_hot"){
			$whereisnow = "Hot";
		}elseif($boardid == "board_customer"){
			$whereisnow = "고객센터";
		}elseif($boardid == "board_qna"){
			$whereisnow = "문의게시판";
		}
	break;
	case("/board/faq.php"):
		$whereisnow="FAQ";
	break;
	case("/html/search.php"):
		$whereisnow="검색결과";
	break;
	case("/contents/company.php"):
		$whereisnow="회사소개";
	break;
	case("/contents/agree.php"):
		$whereisnow="이용약관";
	break;
	case("/contents/private_sism.php"):
		$whereisnow="개인정보 보호정책";
	break;
	case("/board/custom_service.php"):
		$whereisnow="고객센터";
	break;
	case("/member/login.php"):
		$whereisnow="로그인";
	break;
	case("/member/order_history_guest.php"):
		$whereisnow="주문배송조회";
	break;
	case("/member/order_view_guest.php"):
		$whereisnow="주문배송조회";
	break;
	case("/member/find_pass.php"):
		$whereisnow="아이디 / 비밀번호 찾기";
	break;
	case("/member/mypage.php"):
		$whereisnow="MyPage";
	break;
	case("/member/member_agree.php"):
		$whereisnow="회원약관";
	break;
	case("/member/member_join.php"):
		$whereisnow="회원가입";
	break;
	case("/member/member_modify.php"):
		$whereisnow="정보수정";
	break;
	case("/member/login_order_history.php"):
		$whereisnow="주문 / 배송조회 로그인";
	break;
	case("/member/order_history.php"):
		$whereisnow="주문 / 배송조회";
	break;	
	case("/member/order_view.php"):
		$whereisnow="주문 / 상세정보";
	break;	
	case("/member/qna.php"):
		$whereisnow="1:1 질문/답변";
	break;	

	case("/member/wish_list.php"):
		$whereisnow="Wish List";
	break;
	case("/sub/order.php"):
		$whereisnow="주문정보 입력";
	break;	
	case("/sub/order_login.php"):
		$whereisnow="로그인";
	break;	
	case("/sub/pay.php"):
		if($pay_account=='card'){
			$whereisnow="카드결제 정보입력";
		}else{
			$whereisnow="현금결제 주문완료";
		}		
	break;
	case("/sub/pay_agent/INIpay41/INIsecurepay.php"):
		$whereisnow="카드결제 결과";	
	break;
	case("/sub/card_pay_done.php"):
		$whereisnow="카드결제 결과";	
	break;
	case("/sub/shopping_cart.php"):
		$whereisnow="장바구니";
	break;
	case("/sub/search_list.php"):
		$whereisnow="상품검색 결과";
	break;
	case("/gonggu/gongguGood_list.php"):
		$whereisnow="공동구매";
	break;
	case("/gonggu/gongguGood_view.php"):
		$whereisnow="공동구매";
	break;
	case("/sub/gonggu_payment.php"):
		$whereisnow="결제하기";
	break;	
	case("/sub/card_form.php"):
		$whereisnow="결제완료";
	break;
	case("/member/gonggu_OrderView.php"):
		$whereisnow="공동구매 주문조회";
	break;

	//admin
	case("/admin/good_category.php"):
		$whereisnow="카테고리";
	break;
	case("/admin/good_list.php"):
		$whereisnow="제품리스트";
	break;
	case("/admin/good_add.php"):
		$whereisnow="제품등록";
	break;
	case("/admin/good_edit.php"):
		$whereisnow="제품수정";
	break;

	case("/admin/order_list.php"):
		$whereisnow="주문배송관리";
	break;
	case("/admin/order_view.php"):
		$whereisnow="주문배송상세정보";
	break;

	case("/admin/member_list.php"):
		$whereisnow="회원리스트";
	break;
	case("/admin/member_modify.php"):
		$whereisnow="회원정보수정";
	break;
	case("/admin/member_statistics.php"):
		$whereisnow="회원통계";
	break;
	case("/admin/member_mail.php"):
		$whereisnow="회원메일링";
	break;

	case("/admin/sold_statistics_good.php"):
		$whereisnow="상품별판매정산";
	break;
	case("/admin/sold_statistics_member.php"):
		$whereisnow="회원별판매정산";
	break;
	case("/admin/count_admin.php"):
		$whereisnow="접속통계";
	break;

	case("/admin/shop_config.php"):
		$whereisnow="기본설정";
	break;
	case("/admin/vendor_list.php"):
		$whereisnow="제조사";
	break;
	case("/admin/made_list.php"):
		$whereisnow="원산지";
	break;
	case("/admin/brand_list.php"):
		$whereisnow="브랜드";
	break;
	case("/admin/bank_list.php"):
		$whereisnow="은행";
	break;

	case("/admin/qna_list.php"):
		$whereisnow="1:1 상담관리";
	break;
	case("/admin/estimate_list.php"):
		$whereisnow="제품이용기";
	break;

	case("/admin/board.php"):
		$whereisnow="게시판설정";
	break;

	case("/admin/faq_list.php"):
		$whereisnow="FAQ";
	break;
	case("/admin/faq_write.php"):
		$whereisnow="FAQ";
	break;
	case("/admin/faq_edit.php"):
		$whereisnow="FAQ";
	break;
	case("/admin/faq_view.php"):
		$whereisnow="FAQ";
	break;

	case("/admin/event_list.php"):
		$whereisnow="팝업관리";
	break;
	case("/admin/event_write.php"):
		$whereisnow="팝업관리";
	break;
	case("/admin/event_edit.php"):
		$whereisnow="팝업관리";
	break;

	case("/admin/online_list.php"):
		$whereisnow="주문목록";
	break;
	case("/admin/online_view.php"):
		$whereisnow="주문상세정보";
	break;

	case("/admin/edit_list.php"):
		$whereisnow="편집기";
	break;

	case("/admin/portfolio_list.php"):
		$whereisnow="시공사례목록";
	break;
	case("/admin/portfolio_add.php"):
		$whereisnow="시공사례등록";
	break;
	case("/admin/portfolio_edit.php"):
		$whereisnow="시공사례수정";
	break;

	case("/admin/index.php"):
		$whereisnow="관리자";
	break;
	//admin

	default:
		$whereisnow=" ";
	break;
}



////////////////////////////////////

?>