<? $mod=menu03 ?>
<? $menu=1?>
<?
include('../header.php');
include($ROOT_DIR."/lib/style_class.php");
$row = $db->object("cs_member", "where idx='$idx'");
$skin_url = str_replace($admin_stat->shop_domain,'', $admin_stat->shop_url);
?>

<? if(!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS']==""){ ?>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<? } else { ?>
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
<? } ?>
<script language="JavaScript">
<!--
//우편번호
function openDaumPostcode() {
	new daum.Postcode({
		oncomplete: function(data) {
			$("input[name='zip_new']").val(data.zonecode);
			$("input[name='add1']").val(data.address);
			$("input[name='add2']").focus();
		}
	}).open();
}


function sendit() {
	var form=document.join_form;
	if(form.name.value=="") {
		alert("이름을 입력해 주세요.");
		form.name.focus();
	} else {

		if(form.passwd.value!=""){

			if(form.passwd_check.value==""){
				alert("비밀번호를 확인해 주세요.");
				form.passwd_check.focus();
			} else if(form.passwd.value!=form.passwd_check.value){
				alert("비밀번호를 다시 입력해 주세요.");
				form.passwd.focus();
			} else {
				form.submit();
			}
		
		} else {

			form.submit();

		}
	}
}
//-->
</script>



<div>
	<h3 class="page-header">회원정보 수정</h3>
</div>



	<form action="member_edit_ok.php" method="post" name="join_form" class="inline"><!-- class="form-inline" role="form"  -->
	<input type="hidden" name="mem_data" value="<?=$idx;?>">


			<table class="table table-bordered table-hover " >

				
				<tr>
					<th>아이디</th>
					<td height="25"><?=$row->userid;?></td>
				</tr>
				<tr>
					<th width="15%">이 름</th>
					<td height="25"><input type="text" name="name" class="form-control col-md-5" value="<?=$row->name;?>"></td>
				</tr>
				<tr>
					<th>이메일</th>
					<td height="25" ><input type="text" name="email" class="form-control col-md-5" value="<?=$row->email;?>"></td>
				</tr>

				<tr>
					<th>비밀번호</th>
					<td height="25"><input type="text" name="passwd" class="form-control col-md-3"  value=""></td>
				</tr>

				<tr>
					<th>비밀번호확인</th>
					<td height="25"><input type="text" name="passwd_check" class="form-control col-md-3"  value=""></td>
				</tr>
				<tr>
					<th>생년월일</th>
					<td height="25" >
						<input name="birth" type="text" class="form-control2" style="text-align: center;" value="<?=$row->birth;?>">
					</td>
				</tr>
				<tr>
					<th>전화번호</th>
					<td height="25" >
						<input name="tel" type="text" class="form-control2"  maxlength="4" style="text-align: center;" onKeyPress="if( (event.keyCode<48) || (event.keyCode>57) ) event.returnValue=false;" value="<?=$row->tel;?>">
					</td>
				</tr>

				<tr>
					<th>휴대폰</th>
					<td height="25">
						<input name="phone" type="text" class="form-control2"  maxlength="4"  style="text-align: center;" onKeyPress="if( (event.keyCode<48) || (event.keyCode>57) ) event.returnValue=false;" value="<?=$row->phone;?>">
					</td>
				</tr>

				<tr>
					<th>우편번호</th>
					<td height="25">
						<input name="zip_new" id="zip_new" type="text" class="form-control2" maxlength="3" style="text-align: center;" onKeyPress="if( (event.keyCode<48) || (event.keyCode>57) ) event.returnValue=false;" value="<?=$row->zip_new;?>">&nbsp;
						<a href="javascript:openDaumPostcode()" class="btn btn-success">우편번호찾기</a>
					</td>
				</tr>
				<tr>
					<th>주 소</th>
					<td>
						<input name="add1" id="add1" type="text" class="form-control col-md-5" maxlength="100" value="<?=$row->add1;?>"></br></br>
						<input name="add2" id="add2" type="text" class="form-control col-md-8" maxlength="50" value="<?=$row->add2;?>"></br>&nbsp;상세정보(번지)
					</td>
				</tr>
				<tr>
					<th>이메일수신여부</th>
					<td height="25" >
									<fieldset>
										<div class="custom-radio-item-box">
											<span class="custom-radio-item">
												<input name="mailing" value="y" <? if($row->mailing=="y"){ echo "checked"; } ?> id="mailing-yes" type="radio">
												<label for="mailing-yes"><strong>예</strong></label>
											</span>
											<span class="custom-radio-item">
												<input name="mailing" value="n" <? if($row->mailing=="n"){ echo "checked"; } ?> id="mailing-no" type="radio">
												<label for="mailing-no"><strong>아니오</strong></label>
											</span>
										</div>
										<span class="join-sub-txt2">* 사이트에서 발송하는 메일을 받아 보실수 있습니다.</span>
									</fieldset>
					</td>
				</tr>

				<tr>
					<th>로그인접속수</th>
					<td height="25"><?=number_format($row->connect);?>&nbsp;번</td>
				</tr>

			</table>


		<table width="100%">
			<tr>
				<td align="center">
					<a href="member.php?idx=<?=$idx;?>" class="btn btn-primary">돌아가기</a>&nbsp;<a href="javascript:sendit();" class="btn btn-primary">저장하기</a>
				</td>
			</tr>
		</table>


	</form>


<? include('../footer.php');?>
