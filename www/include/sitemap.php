<? include "../common.php"; ?>
	<div id="sitemap"> 
		<span class="close">
		<img src="../images/btn_pop_close.gif" alt="닫기" class="cp" onclick="tb_remove();"/>
		</span>
		<div class="sm_list">
			<p class="tit">회사소개</p>
			<ul>
                <li><a href="/about/greeting.php">인사말</a></li>
                <!--li><a href="/about/history.php">연혁</a></li-->
                <li><a href="/about/location.php">찾아오시는길</a></li>
			</ul>
		</div>
		<div class="sm_list">
			<p class="tit">제품소개</p>
			<ul>
                <li><a href="/product/all_list.php">전체</a></li>
                            <?
							$query = "select * from cs_part where part_display_check='1' and part_index='1' order by part_ranking asc, idx asc";
							$rs = mysql_query($query);
							while($row = mysql_fetch_array($rs)){
							?>
							<li><a href="/product/product_list.php?part1_idx=<?=$row[idx]?>"><?=$row[part_name]?></a></li>
							<? } ?>
			</ul>
		</div>
		<div class="sm_list">
			<p class="tit">커뮤니티</p>
			<ul>
                <li><a href="/community/notice.php">공지사항</a></li>
                <li><a href="/community/press.php">보도자료</a></li>
                <li><a href="/community/recipe.php">레시피</a></li>
                <li><a href="/community/q_a.php">Q&amp;A</a></li>
			</ul>
		</div>
		<div class="sm_list end">
			<p class="tit">온라인 문의</p>
			<ul>
                <li><a href="/inquiry/inquiry.php">온라인 문의</a></li>
			</ul>
		</div>
	</div>