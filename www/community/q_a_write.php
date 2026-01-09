<?
$oneNum = "2";
$twoNum = "3";
?>
<? include "../include/header.php"; ?>
		<? include "../include/sub_visual.php"; ?>	
        <div id="content" class="sub_cont">
        	<? include "left.php"; ?>
            <!-- contents -->
            <section class="contSec q_a">
                <h4>Q&amp;A</h4>
                <div class="path">커뮤니티<span class="path_bar">></span>Q&amp;A</div>
                <div class="cont">
                	<!-- Write -->
					<div>
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
								<span class="button large blue"><input type="submit" value="확인"></span>
							</div>
						</form>
					</div>
					<!-- Write //-->
                </div>
            </section>
            <!-- //contents -->
        </div>
<? include "../include/footer.php"; ?>