<?
$oneNum = "4";
$twoNum = "0";
?>
<? include "../include/header.php"; ?>
		<? include "../include/sub_visual.php"; ?>	
        <div id="content" class="sub_cont">
        	<? include "left.php"; ?>
            <!-- contents -->
            <section class="contSec inquiry">
                <h4>온라인 문의</h4>
                <div class="path">온라인 문의</div>
                <div class="cont">
                	<!-- Write -->
					<div style="position:relative;padding-top:10px">
						<span class="must_item"><img src="../images/board/icon_mustItem.png" alt=""> 표시는 필수입력항목입니다.</span>

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
								<col width="125px" />
								<col width="" />
								</colgroup>
								<tbody>
								<tr>
									<th>회사명 <img src="../images/board/icon_mustItem.png" alt=""></th>
									<td><input type="text" class="ib100" name="company"></td>
								</tr>
								<tr>
									<th>이름 <img src="../images/board/icon_mustItem.png" alt=""></th>
									<td><input type="text" class="ib100" name="name"></td>
								</tr>
								<tr>
									<th>연락처 <img src="../images/board/icon_mustItem.png" alt=""></th>
									<td><input type="text" class="ib40" name="tel1">
										-
										<input type="text" class="ib40" name="tel2">
										-
										<input type="text" class="ib40" name="tel3"></td>
								</tr>
								<tr>
									<th>이메일 <img src="../images/board/icon_mustItem.png" alt=""></th>
									<td><input type="text" class="ib75" name="email">
										@
										<input type="text" class="ib200" name="email2">
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
									<th>문의내용 <img src="../images/board/icon_mustItem.png" alt=""></th>
									<td><textarea name="content" style="width:96.5%;height:350px" placeholder="내용을 입력해주세요!"></textarea> <!-- 에디터로 대체 --></td>
								</tr>
								<tr>
									<th>파일첨부</th>
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
					<!-- Write //-->
                </div>
            </section>
            <!-- //contents -->
        </div>
<? include "../include/footer.php"; ?>