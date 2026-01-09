<?
$oneNum = "2";
$twoNum = "3";
?>
<? include "../include/dtd.php"; ?>
<? include "../include/header.php"; ?>
<div id="sub_visual">
	<div class="sv_3">
		<strong class="page-tit">COMMUNITY</strong>
		<p class="sub-tit">최고로 엄선된 재료만을 <br> 제공해 드립니다.</p>
	</div>   
</div>
<div id="content" class="sub_cont">
	<div class="area-padding-m">
		<div class="qna-write-page">
		<!-- Write -->
			<form id="" name="" action="q_a.php">
				<fieldset>
					<legend>글쓰기</legend>
					<table class="board_write">
					<colgroup>
					<col width="125px" />
					<col width="" />
					</colgroup>
					<tbody>
					<tr>
						<th scope="row">제목</th>
						<td>
							<input type="text" class="ib500">
						</td>
					</tr>
					<tr>
						<th scope="row">작성자</th>
						<td class="myid"><input type="text" class="ib170" /></td>
					</tr>
					<tr>
						<th scope="row">첨부파일</th>
						<td>
							<input type="file" class="500">
						</td>
					</tr>
					<tr>
						<td colspan="2"><textarea name="" style="width:100%;height:350px;margin-left:-10px" placeholder="내용을 입력해주세요!"></textarea> <!-- 에디터로 대체 --></td>
					</tr>
					<tr>
						<th scope="row">비밀번호</th>
						<td>
							<input type="password" class="ib50" /> <span class="add_tx">※ 수정/삭제 시 필요</span>
						</td>
					</tr>
					</tbody>
					</table>
				</fieldset>
				<div class="btnSec tr">
					<span class="btn"><input type="submit" value="확인"></span>
				</div>
			</form>
		<!-- Write //-->
		<? include "../include/foot_inquiry.php"; ?>
		</div>
	</div>
</div>
<? include "../include/footer.php"; ?>