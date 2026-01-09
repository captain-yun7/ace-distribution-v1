<?
/* 
////////  아래 필드는 디폴트로 사용해야 합니다 ////
Num			번호
ID			아이디
Name		이름
Pass		비밀
Sex  		성
Age  		나이
Birth  		생일
Birth_Ext 	양력음력
Grade		등급
Reg_Num1	주민앞자리
Reg_Num2	주민뒷자리
Zip			우편번호
Address		주소
Address_Ext	주소나머지
Email		이메일 
Email_Accept 이메일 받기
Join_Date	가입일 
Last_Login	마지막 로그인
Login_Num	로그인 횟수 
///////////////// 필수 사용 끝 ///////////////////
*/ 
$app_Pass_Q = "";  //비밀번호 찾기 질문 사용안합니다.
$app_Pass_A = ""; //비밀번호 찾기 답변 사용안합니다

// 다음은 쇼핑몰에서 추가 입력 사항입니다. ////  

//  공란은 사용안함  y 는 사용함 p 는 필수입력으로 사용함  
$app_Phone = "p"; // 전화번호
$app_Mobile  = "p"; //핸드폰
$app_Job = ""; //직업 
$app_Degree = ""; //학력
$app_Married = ""; //결혼
$app_Recommend	= ""; //추천인

// 사업자/직장 정보 
$app_biz_name = ""; //사업장명
$app_biz_ceo = "";	//대표자성명
$app_biz_upt = "";	//업태
$app_biz_upj = ""; 	//업종
$app_biz_num = "";	//사업자번호
$app_biz_zip = "";	//직장주소
$app_biz_addr = ""; //직장주소
$app_biz_addr2 = "";	//직장주소
$app_biz_tel = ""; //직장전화
$app_biz_fax = ""; //직장팩스
$app_biz_pos = ""; //직책
$app_biz_class = ""; //담당부서
$app_biz_url  = ""; //홈페이지 


/// 신상정보 추가는 모두  선택 사항입니다 p 해봐야 자스 안됩니다. ./////////////// 
$app_etc_interest = ""; //관심분야
$app_etc_hobby = "";  //취미
$app_etc_skill = "";  //특기
$app_etc_smoke = ""; //흡연
$app_etc_drink = ""; //음주
$app_etc_religion = ""; //종교
$app_etc_tall = ""; //키
$app_etc_blood = ""; //혈액형
$app_etc_char = ""; //성격
$app_etc_out = ""; //외모

// 필드 추가 
$app_add_text1 = ""; //임의 추가
$app_add_text2 = ""; //임의 추가
$app_add_area = ""; //임의 추가 

/////////// 신상정보 추가 설정 부분 /////////////

if($app_etc_interest){ $arr_interest  = array(
"0" => "의류/패션잡화", 
"1" => "화장품/향수/미용품", 
"2" => "컴퓨터/SW", 
"3" => "생활/주방용품", 
"4" => "보석/시계/악세사리", 
"5" => "가전/카메라", 
"6" => "서적/음반/비디오", 
"7" => "스포츠/레져용품", 
"8" => "꽃배달/케익서비스"
); reset($arr_interest); }

if($app_etc_hobby){ $arr_hobby  = array(
"0" => "등산", 
"1" => "낚시", 
"2" => "영화", 
"3" => "독서", 
"4" => "음악", 
"5" => "스포츠", 
"6" => "수집", 
"7" => "여행", 
"8" => "인터넷"
); reset($arr_hobby); }

if($app_etc_skill){  $arr_skill  = array(
"0" => "영어", 
"1" => "운동", 
"2" => "요리", 
"3" => "유머"
); reset($arr_skill); }


if($app_etc_smoke){ $arr_smoke  = array(
"0" => "못함", 
"1" => "조금", 
"2" => "자주", 
"3" => "항상"
); reset($arr_smoke); }

if($app_etc_drink) { $arr_drink  = array(
"0" => "못함", 
"1" => "조금", 
"2" => "자주", 
"3" => "항상"
); reset($arr_drink); }

if($app_etc_religion) { $arr_religion  = array(
"0" => "못함", 
"1" => "조금", 
"2" => "자주", 
"3" => "항상"
);  reset($arr_religion); }

if($app_etc_tall){ $arr_tall  = array(
"0" => "160 이하", 
"1" => "160-165", 
"2" => "165-170", 
"3" => "170-175",
"4" => "175-180",
"5" => "180 이상"
); reset($arr_tall); }

if($app_etc_blood){ $arr_blood  = array(
"0" => "O", 
"1" => "A", 
"2" => "B", 
"3" => "AB"
); reset($arr_blood); }

if($app_etc_char){ $arr_char  = array(
"0" => "차분", 
"1" => "활달", 
"2" => "유머", 
"3" => "다혈질"
); reset($arr_char); }

$arr_out  = array(
"0" => "핸섬", 
"1" => "터프", 
"2" => "샤프", 
"3" => "소프트"
); reset($arr_out); 


if($app_add_text1){
$add_text1_name="임의 추가1";
$add_text1_type="<input type=text name=add_text1 value='$add_text1'>";
}

if($app_add_text2){
$add_text2_name="임의 추가2";
$add_text2_type="<input type=text name=add_text2 value='$add_text2'>";
}

if($app_add_area){
$add_area_name="임의 추가3";
$add_area_type="<textarea name=add_area> $add_area </textarea>";
}

?>