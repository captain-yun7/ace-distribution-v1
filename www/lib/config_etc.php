<?
##-------------------------------------------------------------------##
##  프로그램명 : NX-Shop V2.3/madeshop v3.0
## 저작권자 (주)스타트코리아 /사용권자 아이메이드 
## 본 프로그램은 저작권 보호를 받는 상용소프트웨어 입니다.
## 임의로 배포시 형사처벌을 받을수 있습니다.
##-------------------------------------------------------------------##
##                           파일명 및 설명
##-------------------------------------------------------------------##
##  파일이름 : config_etc.php
##  파일설명 : 기타 환경설정 파일
##-------------------------------------------------------------------##
## 메일관련 데이터 저장 디렉토리
$Mail_Sources_Dir = $Path . "/mail_sources";	//메일 소스 디렉토리
$Join_File = $Mail_Sources_Dir . "/join.txt";	// 회원가입시
$Leave_File = $Mail_Sources_Dir . "/leave.txt";	// 회원탈퇴시
$Order_File = $Mail_Sources_Dir . "/order.txt";	// 주문시
$Pay_File = $Mail_Sources_Dir . "/pay.txt";		// 결제완료시
$Delivery_File = $Mail_Sources_Dir . "/delivery.txt";	// 배송시
$Cancel_File = $Mail_Sources_Dir . "/cancel.txt";	// 취소시
$Return_File = $Mail_Sources_Dir . "/return.txt";	// 교환배송시
$Bill_File = $Mail_Sources_Dir . "/bill.txt";	// 환불완료시
$Cancel_File2 = $Mail_Sources_Dir . "/cancel2.txt";	// 취소요청시
$Return_File2 = $Mail_Sources_Dir . "/return2.txt";	// 교환요청시
$Bill_File2 = $Mail_Sources_Dir . "/bill2.txt";	// 환불요청시
$Find_File = $Mail_Sources_Dir . "/find.txt";	// 회원가입시

## 페이 에이전트 리스트
$Pay_Agent_List = array(
	"kcp"	=>	"KCP",
	"dacom"	=>	"데이콤"
);
reset($Pay_Agent_List);

## 배송방법 설정
$Delivery_List = array(
	"1"	=>	"택배::$Sub_Good_Division",
	"6"	=>	"퀵서비스::착불",
	"7"	=>	"방문수령::무료"
);// 4번 이하는 배송비 포함 결제, 5이상은 미포함 결제, 5번은 무료배송 예약필드임.
//오른쪽 주문방식과 가격사이는 콜론2개(::) 로 구분해야함.
reset($Delivery_List);

## 배송방법 설정2 (관리자 보기용 = 위와 동일하게 셋팅 및 5번 추가)
$Delivery_List2 = array(
	"1"	=>	"택배",
	"5"	=>	"택배(무료)",
	"6"	=>	"퀵서비스",
	"7"	=>	"방문수령"
);// 4번 이하는 배송비 포함 결제, 5이상은 미포함 결제, 5번은 무료배송 예약필드임.
//오른쪽 주문방식과 가격사이는 콜론2개(::) 로 구분해야함.
reset($Delivery_List2);

## 쇼핑몰 내에서 회원등급별 가격을 보여주기위한 등급
switch($SS_V3[Grade]){
	case('MEMBER'):
		$what_my_grade = "정회원";
	break;
	case('SILVER'):
		$what_my_grade = "실버회원";
	break;
	case('GOLD'):
		$what_my_grade = "골드회원";
	break;
	case('ADMIN'):
		$what_my_grade = "관리자";
	break;
	default:
		$what_my_grade = "손님";
	break;
}

## 회원등급 리스트
$Member_Grade_Array = array(
	"0"	=>	"탈퇴신청",
	"1"	=>	"정회원",
	"2"	=>	"실버회원",
	"3"	=>	"골드회원",
	"99"	=>	"관리자"
);
reset($Member_Grade_Array);

## 회원등급 리스트
$Board_Grade_Array = array(
	"0"	=>	"손님",
	"1"	=>	"정회원",
	"2"	=>	"실버회원",
	"3"	=>	"골드회원",
	"99"	=>	"관리자"
);
reset($Board_Grade_Array);

## 연령대 리스트
$Age_array = array(
	"10" => "19",
	"20" => "29",
	"30" => "39",
	"40" => "49",
	"50" => "59",
	"60" => "69",
	"70" => "79"
);
reset($Age_array);

## 상품 주문상태 리스트
$State_List = array(
	"o1"	=>	"결제대기",
	"d1"	=>	"배송준비",
	"d2"	=>	"배송중",
	"d3"	=>	"배송완료",
	"c1"	=>	"취소요청",
	"c2"	=>	"취소완료",
	"r1"	=>	"교환요청",
	"r2"	=>	"교환배송중",
	"b1"	=>	"환불요청",
	"b2"	=>	"환불완료",
    "xx"    => "주문삭제"
);
reset($State_List);

## 직업 리스트
$Job_array = array(
	"01" => "초/중/고등학생",
	"02" => "대학/대학원생",
	"03" => "회사원(사무직)",
	"04" => "회사원(연구직)",
	"05" => "회사원(기술직)",
	"06" => "회사원(관리직)",
	"07" => "예술/예능직",
	"08" => "농축수산업",
	"09" => "전문직",
	"10" => "자영업",
	"11" => "공무원",
	"12" => "노무직",
	"13" => "군인",
	"14" => "기타"
);
reset($Job_array);

## 최종학력 리스트
$Degree_array = array(
	"0" => "없음",
	"1" => "초등학교재학",
	"2" => "초등학교졸업",
	"4" => "중학교재학",
	"6" => "중학교졸업",
	"7" => "고등학교재학",
	"9" => "고등학교졸업",
	"H" => "대학교재학",
	"J" => "대학교졸업",
	"O" => "대학원재학",
	"Z" => "대학원졸업이상"
);
reset($Degree_array);

$sex_Array = array(
	"M"	=>	"남",
	"F"	=>	"여"
);
reset($sex_Array);

$Plan_Array = array(
	"m1"	=>	"신상품",
	"m2"	=>	"추천상품",
	"m3"	=>	"리얼 이벤트 상품"
);
reset($Plan_Array);

$menu_Array = array(
	"1"	=>	"회원정보수정",
	"2"	=>	"주문/배송조회",
	"3"	=>	"위시리스트",
	"4"	=>	"회원탈퇴"
);
reset($menu_Array);

$Pay_array = array(
	"11" => "card",
	"33" => "acco",
	"30" => "hand"
);
reset($Pay_array);

$Board_array = array(
	"3" => "자료실",
	"4" => "게시판"
);
reset($Board_array);

$skin_name="html";  //스킨폴더명을 입력하세요
$jumin_psw='';  // 사용할려면 yes 를 넣어야한다 
$pass_psw=''; //회원가입시 암호를 암호화 처리 하려면 yes 를 넣어야 한다 
// 주민번호 뒷자리 암화를 사용할것입니까? 주석을 풀면 암호와 됩니다.
// 이것은 회원가입전 설치 초기에 결정해야 합니다. 

$Good_Type='2';
?>