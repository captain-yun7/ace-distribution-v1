<?
$oneNum = "5";
$twoNum = "0";
?>
<? include "../include/dtd.php"; ?>
<? include "../include/header.php"; ?>


<article class="member-wrapper">
	<!-- 아이디확인 -->
	<div class="member-con-inner">
		<div class="member-form-con-txt">
			<strong>아이디 확인</strong>
		</div>
		<article class="member-form-con">
			<?$row = $db->object("cs_member","where name='$_POST[name]' and email='$_POST[email]'");?>
			<?if($row->idx){?>
			<!-- 아이디 찾기 성공 -->
			<div class="id-check-inner">
				<p class="customer-id">고객님의 아이디는 <strong>[ <?echo $row->userid?> ]</strong> 입니다.</p>
			</div>
			<div class="cm-btn-controls">
				<a href="./login.php" class="btn-style01">로그인</a><a href="./pwd_search.php" class="btn-style03">비밀번호 찾기</a>
			</div>
			<?}else{?>
			<!-- 아이디 찾기 실패 -->
			<div class="id-check-inner">
				<p class="customer-id"><strong>회원가입시 입력한 정보와 다릅니다.</strong><br>다시 한번 입력하여 주시기 바랍니다. </p>
			</div>
			<div class="cm-btn-controls">
				<a href="./id_search.php" class="btn-style01">뒤로가기</a>
			</div>
			<?}?>
		</article>
	</div>
	<!-- //  아이디확인 -->
</article>



<? include "../include/footer.php"; ?>