<?
$oneNum = "1";
$twoNum = "0";
?>
<? include "../include/header.php";

//개인정보 수정 확인
if($_SESSION['SNS']){

}else{
	if($_POST[passwd]){
		$passwd = $tools->openssl($tools->filter($_POST[passwd]));
		$mem_check = $db->cnt("cs_member", "where userid='$_POST[userid]' and passwd='$passwd'");
		if(empty($mem_check)){
			$tools->errMsg("비밀번호가 일치하지 않습니다.");
		}
	}else{
		$tools->javaGo("./modify_01.php");
	}
}

if($_SESSION[USERID]==""){ $tools->javaGo("/member/login.php"); exit; }
$mem_row = $db->object("cs_member","where userid='$_SESSION[USERID]'");
?>
<br><br>
<article class="member-wrapper">
	
	<!--  MODIFY 02  -->
	<form action="./member_edit_ok.php" method="post" name="join_form" enctype="multipart/form-data">
		<input type="hidden" name="userid" value="<?echo $mem_row->userid?>">
		<div class="join-step-con">
			<h3 class="join-tit">가입정보</h3>
			<div class="join-form-con">
				<p class="essential-txt"><span class="essential-icon">*</span>표시는 필수 입력 항목입니다.</p>
				<table class="join-form-tbl">
					<caption>회원정보 수정 입력창</caption>
					<colgroup>
						<col style="width:15%;">
						<col style="width:85%;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><span class="essential-icon">*</span> 아이디</th>
							<td>
								<p class="read-only-data"><?echo $mem_row->userid?></p>
							</td>
						</tr>
						<tr>
							<th><span class="essential-icon">*</span> 변경 비밀번호</th>
							<td>
								<input type="password" class="input-basic width100" name="passwd">
								<p class="join-sub-txt" id="passwd_check"></p>
								<!-- // 비밀번호 체크 문구 -->
								<p class="join-sub-txt2">4~16자의 영문,숫자 조합으로 가능합니다. 한글은 제한합니다.</p>
							</td>
						</tr>
						<tr>
							<th scope="row"><span class="essential-icon">*</span> 비밀번호 확인</th>
							<td>
								<input type="password" class="input-basic width100" name="passwd_check">
							</td>
						</tr>
						<tr>
							<th scope="row"><span class="essential-icon">*</span> 이름</th>
							<td>
								<input type="text" class="input-basic width100" name="name" value="<?=$mem_row->name?>">
							</td>
						</tr>
						<tr>
							<th scope="row">생년월일</th>
							<td><?$birth = explode("-",$mem_row->birth);?>
								<fieldset class="birth-input">
								<select name="birth1" class="select-basic width40">
									<option value=""></option>
									<? for($i=date("Y");$i>date("Y")-100;$i--){ ?>
									<option value="<?=$i?>" <? if($birth[0]==$i){ echo "selected"; } ?>><?=$i?></option>
									<? } ?>
								</select>
								년<br>
								<select name="birth2" class="select-basic  width30">
									<option value=""></option>
									<? for($i=1;$i<=12;$i++){ ?>
									<? $ilen = strlen($i);
										if($ilen==1){ $i = "0".$i; } ?>
									<option value="<?=$i?>" <? if($birth[1]==$i){ echo "selected"; } ?>><?=$i?></option>
									<? } ?>
								</select>
								<span class="hypen">월</span>
								<select name="birth3" class="select-basic  width30">
									<option value=""></option>
									<? for($i=1;$i<=31;$i++){ ?>
									<? $ilen = strlen($i);
										if($ilen==1){ $i = "0".$i; } ?>
									<option value="<?=$i?>" <? if($birth[2]==$i){ echo "selected"; } ?>><?=$i?></option>
									<? } ?>
								</select>
								<span class="hypen">일</span>
								</fieldset>
							</td>
						</tr>
						<tr>
							<th scope="row">전화번호</th>
							<td><?$tel = explode("-",$mem_row->tel);?>
								<fieldset class="tel-input">
									<select name="tel1" class="select-basic width30">
										<option value="02" <? if($tel[0]=="02"){ echo "selected"; } ?>>02</option>
										<option value="031" <? if($tel[0]=="031"){ echo "selected"; } ?>>031</option>
										<option value="032" <? if($tel[0]=="032"){ echo "selected"; } ?>>032</option>
										<option value="033" <? if($tel[0]=="033"){ echo "selected"; } ?>>033</option>
										<option value="041" <? if($tel[0]=="041"){ echo "selected"; } ?>>041</option>
										<option value="042" <? if($tel[0]=="042"){ echo "selected"; } ?>>042</option>
										<option value="043" <? if($tel[0]=="043"){ echo "selected"; } ?>>043</option>
										<option value="044" <? if($tel[0]=="044"){ echo "selected"; } ?>>044</option>
										<option value="051" <? if($tel[0]=="051"){ echo "selected"; } ?>>051</option>
										<option value="052" <? if($tel[0]=="052"){ echo "selected"; } ?>>052</option>
										<option value="053" <? if($tel[0]=="053"){ echo "selected"; } ?>>053</option>
										<option value="054" <? if($tel[0]=="054"){ echo "selected"; } ?>>054</option>
										<option value="055" <? if($tel[0]=="055"){ echo "selected"; } ?>>055</option>
										<option value="061" <? if($tel[0]=="061"){ echo "selected"; } ?>>061</option>
										<option value="062" <? if($tel[0]=="062"){ echo "selected"; } ?>>062</option>
										<option value="063" <? if($tel[0]=="063"){ echo "selected"; } ?>>063</option>
										<option value="064" <? if($tel[0]=="064"){ echo "selected"; } ?>>064</option>
										<option value="070" <? if($tel[0]=="070"){ echo "selected"; } ?>>070</option>
									</select>
									<span class="hypen">-</span>
									<input type="text" class="input-basic width20" name="tel2" value="<?=$tel[1]?>" maxlength="4">
									<span class="hypen">-</span>
									<input type="text" class="input-basic width20" name="tel3" value="<?=$tel[2]?>" maxlength="4">
								</fieldset>
							</td>
						</tr>
						<tr>
							<th scope="row"><span class="essential-icon">*</span> 휴대전화</th>
							<td><?$phone = explode("-",$mem_row->phone);?>
								<fieldset class="tel-input">
									<select name="phone1" class="select-basic width30">
										<option value="010" <? if($phone[0]=="010"){ echo "selected"; } ?>>010</option>
										<option value="011" <? if($phone[0]=="011"){ echo "selected"; } ?>>011</option>
										<option value="016" <? if($phone[0]=="016"){ echo "selected"; } ?>>016</option>
										<option value="017" <? if($phone[0]=="017"){ echo "selected"; } ?>>017</option>
										<option value="018" <? if($phone[0]=="018"){ echo "selected"; } ?>>018</option>
										<option value="019" <? if($phone[0]=="019"){ echo "selected"; } ?>>019</option>
									</select>
									<span class="hypen">-</span>
									<input type="text" class="input-basic width20" name="phone2" value="<?=$phone[1]?>" maxlength="4">
									<span class="hypen">-</span>
									<input type="text" class="input-basic width20" name="phone3" value="<?=$phone[2]?>" maxlength="4">
								</fieldset>
							</td>
						</tr>
						<tr>
							<th scope="row"><span class="essential-icon">*</span> 이메일</th>
							<td><?$email = explode("@",$mem_row->email);?>
								<fieldset class="email-input">
									<input type="text" class="input-basic width40" name="email1" value="<?=$email[0]?>"> <span class="hypen">@</span> <input type="text" class="input-basic width40" name="email2" value="<?=$email[1]?>" readOnly>
									<select name="email3" class="select-basic width50" onchange="res();">
										<option value="b">메일계정선택</option>
										<option value="a">직접 입력</option>
										<option value="naver.com">naver.com</option>
										<option value="hanmail.net">hanmail.net</option>
										<option value="nate.com">nate.com</option>
										<option value="gmail.com">gmail.com</option>
										<option value="hotmail.com">hotmail.com</option>
										<option value="yahoo.co.kr">yahoo.co.kr</option>
										<option value="paran.com">paran.com</option>
										<option value="empal.com">empal.com</option>
										<option value="dreamwiz.com">dreamwiz.com</option>
										<option value="lycos.co.kr">lycos.co.kr</option>
										<option value="korea.com">korea.com</option>
									</select>
									<p class="join-sub-txt2">* 이메일 주소는 아이디/비밀번호 찾기 시 이용되오니 현재 사용중인 정보로 정확히 입력해주세요</p>
								</fieldset>
							</td>
						</tr>
						<tr>
							<th scope="row">이메일 수신여부</th>
							<td>
								<fieldset>
									<div class="custom-radio-item-box">
										<span class="custom-radio-item">
											<input name="mailing" value="y" id="mailing-yes" type="radio" <?if($mem_row->mailing=="y"){echo "checked";}?>>
											<label for="mailing-yes"><strong>예</strong></label>
										</span>&nbsp;
										<span class="custom-radio-item">
											<input name="mailing" value="n" id="mailing-no" type="radio" <?if($mem_row->mailing=="n"){echo "checked";}?>>
											<label for="mailing-no"><strong>아니오</strong></label>
										</span>
									</div>
									<span class="join-sub-txt2">* 사이트에서 발송하는 메일을 받아 보실수 있습니다.</span>
								</fieldset>
							</td>
						</tr>
						<tr>
							<th scope="row">주소</th>
							<td>
								<fieldset class="address-input">
									<input type="text" class="input-basic width50" name="zip_new" value="<?=$mem_row->zip_new?>" readonly><button type="button" onclick="openDaumPostcode();" class="join-sub-btn trans400">우편번호 검색</button><br>
									<input type="text" class="input-basic width100" name="add1" value="<?=$mem_row->add1?>">
									<input type="text" class="input-basic width100" name="add2" value="<?=$mem_row->add2?>" placeholder="상세주소 입력">
								</fieldset>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="cm-btn-controls">
			<button class="btn-style01" type="button" onClick="sendit();">수정</button><a href="/" class="btn-style02">취소</a>
		</div>
	</form>
	<!-- //  MODIFY 02  -->

</article>

<script type="text/javascript">
<!--
function sendit() {
	var f=document.join_form;

	if(f.userid.value=="") {
		alert("아이디를 입력해 주세요.");
		f.userid.focus();
	} else if(!chkPwd($.trim(f.passwd.value))){
		f.passwd.value="";
		f.passwd.focus();
	} else if(f.passwd_check.value=="") {
		alert("변경할 비밀번호를 입력해 주세요.");
		f.passwd_check.focus();
	} else if(f.passwd.value != f.passwd_check.value) {
		alert("비밀번호가 일치하지 않습니다. 정확히 입력해 주세요.");
		f.passwd_check.value="";
		f.passwd_check.focus();
	} else if(f.name.value=="") {
		alert("이름을 입력해 주세요.");
		f.name.focus();
	} else if(f.phone1.value=="") {
		alert("휴대번호를 입력해 주세요.");
		f.phone1.focus();
	} else if(f.phone2.value=="") {
		alert("휴대번호를 입력해 주세요.");
		f.phone2.focus();
	} else if(f.phone3.value=="") {
		alert("휴대번호를 입력해 주세요.");
		f.phone3.focus();
	} else if(f.email1.value=="") {
		alert("이메일을 입력해 주세요.");
		f.email1.focus();
	} else if(f.email2.value=="") {
		alert("이메일을 입력해 주세요.");
		f.email2.focus();
	} else {
		f.submit();
	}
}

//email
function res(){
	var f = document.join_form;
	if(f.email3.value=="a"){
	f.email2.readOnly= false;
	f.email2.value="";
	f.email2.focus();
	}else if(f.email3.value=="b"){
	f.email2.readOnly= false;
	f.email2.value="";
	}else{
	f.email2.readOnly= false;
	f.email2.value=f.email3.value;
	}
}
//-->
</script>

<? include "../include/footer.php"; ?>