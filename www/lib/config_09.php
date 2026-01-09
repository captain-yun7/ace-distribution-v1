<?php
##-------------------------------------------------------------------##
##  프로그램명 : MadeShop V3.0
## 저작권자 (주)스타트코리아 /사용권자 아이메이드 
## 본 프로그램은 저작권 보호를 받는 상용소프트웨어 입니다.
## 임의로 배포시 형사처벌을 받을수 있습니다.
##-------------------------------------------------------------------##
##                           파일명 및 설명
##-------------------------------------------------------------------##
##  파일이름 : config_09.php
##  파일설명 : 공동구매 환경설정 파일
##-------------------------------------------------------------------##
## 메일관련 데이터 저장 디렉토리
$Mail_Sources_Dir = $Path . "/mail_sources";	//메일 소스 디렉토리
$gongguOrder_File = $Mail_Sources_Dir . "/gonggu_order.txt";		// 공동구매 주문시.
$gongguPay_File = $Mail_Sources_Dir . "/gonggu_pay.txt";			// 공동구매 결제완료시
$gongguPayment_File = $Mail_Sources_Dir . "/gonggu_notpay.txt";		// 공동구매 기간완료 미결제시
$gongguDelivery_File = $Mail_Sources_Dir . "/gonggu_delivery.txt";	// 배송시
$gongguReturn_File = $Mail_Sources_Dir . "/gonggu_return.txt";		// 교환배송시
$gongguBill_File = $Mail_Sources_Dir . "/gonggu_bill.txt";			// 환불완료시
$gongguCancel_File = $Mail_Sources_Dir . "/gonggu_cancel.txt";		// 취소시
$gongguCancel_File2 = $Mail_Sources_Dir . "/gonggu_cancel2.txt";	// 취소요청시
$gongguReturn_File2 = $Mail_Sources_Dir . "/gonggu_return2.txt";	// 교환요청시
$gongguBill_File2 = $Mail_Sources_Dir . "/gonggu_bill2.txt";		// 환불요청시


## 데이터 베이스 테이블 환경
$Gonggu_Good = "Gonggu_Good";						// 공동구매 상품정보 테이블
$Gonggu_Order = "Gonggu_Order";						// 공동구매 주문정보 테이블

###공동 구매 설정 ###
$mainDivision = "3";						//공동구매 상품 한 라인 개수.
$Design = "1";										//공동 구매 공구 디자인.

## 배송방법 설정
$gongDelivery_List = array(
	"1"	=>	"무료",
	"2"	=>	"착불",
);// 4번 이하는 배송비 포함 결제, 5이상은 미포함 결제, 5번은 무료배송 예약필드임.
//오른쪽 주문방식과 가격사이는 콜론2개(::) 로 구분해야함.
reset($gongDelivery_List);
?>