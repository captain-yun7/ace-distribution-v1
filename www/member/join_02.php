<?
$oneNum = "1";
$twoNum = "0";
?>
<? include "../include/header.php"; ?>


<article class="member-wrapper">
	<article id="joinContent">
		<aside id="processBarCon" class="join-process-bar-con">
			<ol>
				<li>
					<span class="process-icon"><i class="xi-document"></i></span>
					<dl>
						<dt>STEP 01</dt>
						<dd>약관동의</dd>
					</dl>
				</li>
				<li class="current">
					<span class="process-icon"><i class="xi-pen-o"></i></span>
					<dl>
						<dt>STEP 02</dt>
						<dd>정보입력</dd>
					</dl>
				</li>
				<li>
					<span class="process-icon"><i class="xi-check-min"></i></span>
					<dl>
						<dt>STEP 03</dt>
						<dd>가입완료</dd>
					</dl>
				</li>
			</ol>
		</aside>
		<!--  JOIN STEP 02  -->
		<form action="./joinform_ok.php" method="post" name="join_form" enctype="multipart/form-data">
			<div class="join-step-con">
				<h3 class="join-tit">가입정보</h3>
				<div class="join-form-con">
					<p class="essential-txt"><span class="essential-icon">*</span>표시는 필수 입력 항목입니다.</p>
					<table class="join-form-tbl">
						<caption>회원가입 정보 입력창</caption>
						<colgroup>
							<col style="width:15%;">
							<col style="width:85%;">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row"><span class="essential-icon">*</span> 아이디</th>
								<td>
									<fieldset class="id-input clearfix">
										<input type="text" class="input-basic width50 id-input-basic" name="userid">
										<button type="button" class="join-sub-btn" onclick="id_check();">중복확인</button>
									</fieldset>
									<p class="join-sub-txt2" id="id_check"></p>
									<!-- 중복체크 확인 문구 -->
									<!-- <p class="join-sub-txt"><strong class="font-ok">사용하실 수 있는 아이디입니다.</strong> </p>
									<p class="join-sub-txt"><strong class="font-caution">이미 사용중인 아이디입니다.</strong> </p> -->
									<!--  // 중복체크 확인 문구 -->
									<p class="join-sub-txt2">가입 후 아이디 변경은 불가합니다.</p>
								</td>
							</tr>
							<tr>
								<th scope="row"><span class="essential-icon">*</span> 비밀번호</th>
								<td>
									<input type="password" class="input-basic" name="passwd">
									<!-- 비밀번호 체크 문구 -->
									<p class="join-sub-txt" id="passwd_check"></p>
									<!-- <p class="join-sub-txt"><strong class="font-caution">패스워드가 정확하지 않습니다. 다시한번 입력해주세요. </strong></p> -->
									<!-- // 비민번호 체크 문구 -->
									<p class="join-sub-txt2">4~16자의 영문,숫자 조합으로 가능합니다. 한글은 제한합니다.</p>
								</td>
							</tr>
							<tr>
								<th scope="row"><span class="essential-icon">*</span> 비밀번호 확인</th>
								<td>
									<input type="password" class="input-basic" name="passwd_check">
								</td>
							</tr>
							<tr>
								<th scope="row"><span class="essential-icon">*</span> 이름</th>
								<td>
									<input type="text" class="input-basic" name="name">
								</td>
							</tr>
							<tr>
								<th scope="row">생년월일</th>
								<td>
									<fieldset class="birth-input">
										<select name="birth1" class="select-basic  width40">
											<option value=""></option>
											<? for($i=date("Y");$i>date("Y")-100;$i--){ ?>
											<option value="<?=$i?>"><?=$i?></option>
											<? } ?>
										</select>
										<span class="hypen">년</span>
										<select name="birth2" class="select-basic  width30">
											<option value=""></option>
											<? for($i=1;$i<=12;$i++){ ?>
											<? $ilen = strlen($i);
												if($ilen==1){ $i = "0".$i; } ?>
											<option value="<?=$i?>"><?=$i?></option>
											<? } ?>
										</select>
										<span class="hypen">월</span>
										<select name="birth3" class="select-basic  width30">
											<option value=""></option>
											<? for($i=1;$i<=31;$i++){ ?>
											<? $ilen = strlen($i);
												if($ilen==1){ $i = "0".$i; } ?>
											<option value="<?=$i?>"><?=$i?></option>
											<? } ?>
										</select>
										<span class="hypen">일</span>
									</fieldset>
								</td>
							</tr>
							<tr>
								<th scope="row">전화번호</th>
								<td>
									<fieldset class="tel-input">
										<select name="tel1" class="select-basic width30">
											<option value="02">02</option>
											<option value="031">031</option>
											<option value="032">032</option>
											<option value="033">033</option>
											<option value="041">041</option>
											<option value="042">042</option>
											<option value="043">043</option>
											<option value="044">044</option>
											<option value="051">051</option>
											<option value="052">052</option>
											<option value="053">053</option>
											<option value="054">054</option>
											<option value="055">055</option>
											<option value="061">061</option>
											<option value="062">062</option>
											<option value="063">063</option>
											<option value="064">064</option>
											<option value="070">070</option>
										</select>
										<span class="hypen">-</span>
										<input type="text" class="input-basic width20" name="tel2" maxlength="4">
										<span class="hypen">-</span>
										<input type="text" class="input-basic width20" name="tel3" maxlength="4">
									</fieldset>
								</td>
							</tr>
							<tr>
								<th scope="row"><span class="essential-icon">*</span> 휴대전화</th>
								<td>
									<fieldset class="tel-input">
										<select name="phone1" class="select-basic width30">
											<option value="010">010</option>
											<option value="011">011</option>
											<option value="016">016</option>
											<option value="017">017</option>
											<option value="018">018</option>
											<option value="019">019</option>
										</select>
										<span class="hypen">-</span>
										<input type="text" class="input-basic width20" name="phone2" maxlength="4">
										<span class="hypen">-</span>
										<input type="text" class="input-basic width20" name="phone3" maxlength="4">
									</fieldset>
								</td>
							</tr>
							<tr>
								<th scope="row"><!-- <span class="essential-icon">*</span> --> 이메일</th>
								<td>
									<fieldset class="email-input">
										<input type="text" class="input-basic width40" name="email1"> <span class="hypen">@</span> <input type="text" class="input-basic width40" name="email2" readonly>
										<select name="email3" class="select-basic width50" onChange="res();">
											<option value="b">메일계정선택</option>
											<option value="a">직접입력</option>
											<option value="naver.com">naver.com</option>
											<option value="nate.com">nate.com</option>
											<option value="hanmail.net">hanmail.net</option>
											<option value="gmail.com">gmail.com</option>
											<option value="hotmail.com">hotmail.com</option>
											<option value="outlook.com">outlook.com</option>
											<option value="empal.com">empal.com</option>
											<option value="dreamwiz.com">dreamwiz.com</option>
											<option value="lycos.co.kr">lycos.co.kr</option>
											<option value="yahoo.co.kr">yahoo.co.kr</option>
											<option value="korea.com">korea.com</option>
											<option value="paran.com">paran.com</option>
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
												<input name="mailing" value="y" id="mailing-yes" type="radio">
												<label for="mailing-yes"><strong>예</strong></label>
											</span>
											<span class="custom-radio-item">
												<input name="mailing" value="n" id="mailing-no" type="radio">
												<label for="mailing-no"><strong>아니오</strong></label>
											</span>
										</div>
										<span class="join-sub-txt2">* 사이트에서 발송하는 메일을 받아 보실수 있습니다.</span>
									</fieldset>
								</td>
							</tr>
							<tr>
								<th scope="row"><!-- <span class="essential-icon">*</span> --> 주소</th>
								<td>
									<fieldset class="address-input">
										<input type="text" class="input-basic width50" name="zip_new" readonly><button type="button" class="join-sub-btn" onclick="openDaumPostcode();">우편번호 검색</button>
										<input type="text" class="input-basic width100" name="add1">
										<input type="text" class="input-basic width100" name="add2" placeholder="상세주소 입력">
									</fieldset>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="cm-btn-controls">
				<button class="btn-style01" type="button" onclick="sendit();">가입</button><a href="/" class="btn-style02">취소</a>
			</div>
		</form>
		<!-- //  JOIN STEP 02  -->
	</article>
</article>

<script type="text/javascript">
<!--
function sendit() {
	var form=document.join_form;

	if(form.userid.value=="") {
		alert("아이디를 입력해 주세요.");
		form.userid.focus();
	} else if(form.userid.value.length < 4 || form.userid.value.length > 17) {
		 alert("아이디를 입력해 주세요.\n(4~16자)");    
		 form.userid.focus();
	} else if(!chkTxt($.trim(form.userid.value))){ 
		 alert("한글,특수문자,영문(대문자)는 사용 할 수 없습니다.");    
		form.userid.focus();
	} else if(!chkPwd($.trim(form.passwd.value))){
		form.passwd.value="";
		form.passwd.focus();
	} else if(form.passwd_check.value=="") {
		alert("비밀번호확인를 입력해 주세요.");
		form.passwd_check.focus();
	} else if(form.passwd.value != form.passwd_check.value) {
		alert("비밀번호가 정확하지 않습니다. 정확히 입력해 주세요.");
		form.passwd_check.value="";
		form.passwd_check.focus();
	} else if(form.name.value=="") {
		alert("이름을 입력해 주세요.");
		form.name.focus();
	} else if(form.phone1.value=="") {
		alert("휴대번호를 입력해 주세요.");
		form.phone1.focus();
	} else if(form.phone2.value=="") {
		alert("휴대번호를 입력해 주세요.");
		form.phone2.focus();
	} else if(form.phone3.value=="") {
		alert("휴대번호를 입력해 주세요.");
		form.phone3.focus();
	/*
	} else if(form.email1.value=="") {
		alert("이메일을 입력해 주세요.");
		form.email1.focus();
	} else if(form.email2.value=="") {
		alert("이메일을 입력해 주세요.");
		form.email2.focus();
	} else if(form.zip_new.value=="") {
		alert("우편번호를 입력해 주세요.");
		form.zip_new.focus();
		openDaumPostcode();
	} else if(form.add1.value=="") {
		alert("주소를 입력해 주세요.");
		form.add1.focus();
	} else if(form.add2.value=="") {
		alert("상세 주소를 입력해 주세요.");
		form.add2.focus();
	*/
	} else {
		form.submit();
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