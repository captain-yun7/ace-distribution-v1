<?
$oneNum = "3";
$twoNum = "0";
?>
<? include "../include/dtd.php"; ?>
<? include "../include/header.php"; ?>
	<div id="sub_visual">
		<div class="sv_5">
			<strong class="page-tit">INQUIRY</strong>
			<p class="sub-tit">최고로 엄선된 재료만을 <br> 제공해 드립니다.</p>
		</div>   
	</div>
	<div id="content" class="sub_cont">
          <div class="area-padding-m">
			<div class="inquiry-page">
				<span class="must_item"><img src="/images/board/icon_mustItem.png" alt=""> 표시는 필수입력항목입니다.</span>
<form id="" name="form" method="post" action="inquiry_ok.php" enctype="multipart/form-data">
<script language="javascript">
<!--
function sendit(){

	if(form.company.value==""){
		alert("회사명을 입력 하세요.");
		form.company.focus();
	} else if(form.name.value==""){
		alert("이름을 입력 하세요.");
		form.name.focus();
	} else if(form.tel1.value==""){
		alert("연락처를 입력 하세요.");
		form.tel1.focus();
	} else {
		form.submit();
	}

}

//이메일 
function res(){
var f = document.form;
	if(f.user_email3.value=="a"){
	f.email2.readOnly= false;
	f.email2.value="";
	f.email2.focus();
	}else if(f.user_email3.value=="b"){
	f.email2.readOnly= false;
	f.email2.value="";
	}else{
	f.email2.readOnly= false;
	f.email2.value=f.user_email3.value;
	}
}
-->
</script>
					<fieldset>
						<legend>온라인 문의</legend>
						<table class="board_write">
							<colgroup>
								<col width="" />
							</colgroup>
							<tbody>
								<tr>
									<th>회사명 <img src="/images/board/icon_mustItem.png" alt=""></th>
								</tr>
								<tr>
									<td><input type="text" class="ib100" name="company"></td>
								</tr>
								<tr>
									<th>이름 <img src="/images/board/icon_mustItem.png" alt=""></th>
								</tr>
								<tr>
									<td><input type="text" class="ib100" name="name"></td>
								</tr>
								<tr>
									<th>연락처 <img src="/images/board/icon_mustItem.png" alt=""></th>
								</tr>
								<tr>
									<td><input type="text" class="ib40" name="tel1">
										-
										<input type="text" class="ib40" name="tel2">
										-
										<input type="text" class="ib40" name="tel3"></td>
								</tr>
								<tr class="email-tr">
									<th>이메일 <img src="/images/board/icon_mustItem.png" alt=""></th>
								</tr>
								<tr>
									<td><input type="text" class="ib75" name="email">
										@
										<input type="text" class="ib75" name="email2">
										<select name="user_email3" onchange="res();" id="select">
										  <option value="b" selected="selected">메일계정선택</option>
										  <option value="a">직접입력</option>
										  <option value="naver.com">naver.com</option>
										  <option value="nate.com">nate.com</option>
										  <option value="hotmail.com">hotmail.com</option>
										  <option value="gmail.com">gmail.com</option>
										  <option value="empal.com">empal.com</option>
										  <option value="dreamwiz.com">dreamwiz.com</option>
										  <option value="lycos.co.kr">lycos.co.kr</option>
										  <option value="yahoo.co.kr">yahoo.co.kr</option>
										</select> 
										</td>
								</tr>
								<tr>
									<th>문의내용 <img src="/images/board/icon_mustItem.png" alt=""></th>
								</tr>
								<tr>
									<td><textarea name="content" style="width:96.5%;height:350px" placeholder="내용을 입력해주세요!"></textarea> <!-- 에디터로 대체 --></td>
								</tr>
								<tr>
									<th>파일첨부</th>
								</tr>
								<tr>
									<td><input type="file" class="500" name="bbs_file"></td>
								</tr>
							</tbody>
						</table>
					</fieldset>
					<div class="btnSec tr">
						<span class="button large blue"><input type="button" onclick="sendit();" value="문의하기"></span>
					</div>
				</form>
			</div>
			<? include "../include/foot_inquiry.php"; ?>
		</div>
	</div>
<? include "../include/footer.php"; ?>