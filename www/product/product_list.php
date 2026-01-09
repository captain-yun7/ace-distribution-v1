<?
$oneNum = "1";
$twoNum = "1";
?>
<? include "../include/header.php"; ?>
		<? include "../include/sub_visual.php"; ?>	
        <div id="content" class="sub_cont">
        	<? include "left.php"; ?>
            <!-- contents -->

<?
$query = "select * from cs_part where idx='$part1_idx'";
$rs = mysql_query($query);
$row = mysql_fetch_array($rs);
?>

            <section class="contSec product">
                <h4><?=$row[part_name]?></h4>
                <div class="path">제품소개<span class="path_bar">></span><?=$row[part_name]?></div>
                <div class="cont">
                	<!-- List -->
					<div class="product_list">
						<!-- 검색 -->
						<form id="" name="form" method="post" action="product_list.php">
						<input type="hidden" name="part1_idx" value="<?=$part1_idx?>">
						<input type="hidden" name="part_idx" value="<?=$part_idx?>">
						<script language="javascript">
						<!--
						function search(){
							if(form.key.value==""){
								alert("검색어를 입력 하세요.");
								form.key.focus();
							} else {
								form.submit();
							}
						}
						-->
						</script>
						<input type="hidden" name="keyfield" value="name">
							<div class="srh_b">
								<div class="select_search">
									<span>제품명</span>
									<input type="text" name="key" class="ib170" placeholder="검색어를 입력하세요">
									<img onclick="search();" style="cursor:pointer;" src="../images/board/btn_search_01.gif" title="검색" class="btn_sch"></input>
								</div>
							</div>
						</form>
						<!-- 검색 //-->
<?

if($part1_idx && $part_idx==""){

	$query = "select * from cs_part where idx='$part1_idx'";
	$rs = mysql_query($query);
	$row = mysql_fetch_array($rs);

	$query = "select * from cs_part where part_display_check='1' and part_index='2' and part1_code='$row[part1_code]' order by idx asc";
	$rs = mysql_query($query);
	$partj = "";
	while($row = mysql_fetch_array($rs)){
		if($partj==""){
			$partj = "part_idx=".$row[idx];
		} else {
			$partj = $partj." or part_idx=".$row[idx];
		}
	}

}

$query = "select * from cs_goods where display='1'";
if($key){ $query.=" and $keyfield like '%$key%'"; }
if($partj){
	$query.=" and ($partj)";
} else if($part_idx){ 
	$query.=" and part_idx='$part_idx'"; 
}
$query.=" order by idx desc";
$rs = mysql_query($query);
$count = mysql_num_rows($rs);
$rows = 12;

	if (empty($start)) $start=0;
	$end = $start+$rows;
	$end = min($count,$end);
	
	$total = ceil(($count)/$rows);
	$current = ceil(($start+1)/$rows);

?>

						<div class="titSec">
							<span class="totalNo">Total : <?=$count?></span>
						</div>					
						<!-- 리스트 -->
						<div class="pl_lists">
							<ul>

		<?   
			$i = 1;
			if ($count > 1) mysql_data_seek($rs,$start);
			
			$n = $count - ($rows*($current-1));
			$odate = date("Y-m-d");
			
			$k=1;
			for ($for2count=$start;$for2count<$end;$for2count++)
													
			{
				
			$row = mysql_fetch_array($rs);
			$date1 = substr($row[udate],0,-9);

			$name = $tools->strCut_utf($db->stripSlash($row[name]), 25);
		?>

								<? if($k==4){ ?>
								<li class="mrLast">
								<? $k=0; } else { ?>
								<li>
								<? } ?>
									<a href="product_view.php?idx=<?=$row[idx]?>">
										<img src="/data/goodsImages/<?=$row[images1]?>" width="166" height="166" alt="">
										<h4><?=$name?></h4>
                                        <span class="active"></span>
									</a>
								</li>

		<? 
			$k++;
			$i = $i + 1;
			$n = $n - 1;
			} 
		?>

								<!-- <li>
									<a href="product_view.php">
										<img src="../images/product_thumb1.jpg" alt="">
										<h4>강낭콩배기(OEM)</h4>
                                        <span class="active"></span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src="../images/product_thumb2.jpg" alt="">
										<h4>녹차설기믹스</h4>
                                        <span class="active"></span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src="../images/product_thumb3.jpg" alt="">
										<h4>다미쌀가루_450g</h4>
                                        <span class="active"></span>
									</a>
								</li>
								<li class="mrLast">
									<a href="#">
										<img src="../images/product_thumb4.jpg" alt="">
										<h4>박력쌀가루 1kg</h4>
                                        <span class="active"></span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src="../images/product_thumb5.jpg" alt="">
										<h4>강력쌀가루 15kg</h4>
                                        <span class="active"></span>
                                    </a>
								</li>
								<li>
									<a href="#">
										<img src="../images/product_thumb6.jpg" alt="">
										<h4>삼색송편믹스</h4>
                                        <span class="active"></span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src="../images/product_thumb7.jpg" alt="">
										<h4>떡피자쌀가루_1kg</h4>
                                        <span class="active"></span>
									</a>
								</li>
								<li class="mrLast">
									<a href="#">
										<img src="../images/product_thumb8.jpg" alt="">
										<h4>대두고물(가미)_2.5kg</h4>
                                        <span class="active"></span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src="../images/product_thumb9.jpg" alt="">
										<h4>고려홍삼양갱_6입</h4>
                                        <span class="active"></span>
                                    </a>
								</li>
								<li>
									<a href="#">
										<img src="../images/product_thumb10.jpg" alt="">
										<h4>국화향기세트 12입</h4>
                                        <span class="active"></span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src="../images/product_thumb11.jpg" alt="">
										<h4>밤팥빙수 700g</h4>
                                        <span class="active"></span>
									</a>
								</li>
								<li class="mrLast">
									<a href="#">
										<img src="../images/product_thumb12.jpg" alt="">
										<h4>우리미인세트 20입</h4>
                                        <span class="active"></span>
									</a>
								</li> -->
							</ul>
						</div>
						<!-- 리스트 //-->				
						<!-- 페이징 -->
						<div class="pagination">

		<?
				   //echo "현재 =".$current." 전체=".$total."<br>";
				   $cur = ceil(($current)/10); //현재 페이지가 10페이지 단위로 짤랐을 때 몇번째인지 구한다.
				   $tot = ceil(($total+1)/10);  //전체 페이지가  10페이지 단위로 짤랐을 때 몇페이지인가 구한다.
				   
				   $liststart = $cur*10-9; 
				   $listend = $liststart +10;
				   if($listend > $total+1) $listend = $total+1;
				   //echo "시작=".$liststart." 끝=".$listend."<br>";
				   
				   if ($cur>1) echo "<a href=\"product_list.php?key=$key&keyfield=$keyfield&part1_idx=$part1_idx&part_idx=$part_idx&start=".(($cur-1)*$rows*9)."&n=".($i*10-9)."&code=$code&flag=$flag\" class='prev'><img src='../images/board/btn_prev.gif' alt='Previous'></a>";
				   for($i=$liststart;$i<$listend;$i++) {
				      if($i==$current) echo "<strong>$i</strong>";
				      else {
				          echo "<a href=\"product_list.php?key=$key&keyfield=$keyfield&part1_idx=$part1_idx&part_idx=$part_idx&start=".($i-1)*$rows."&n=".($i*10-9)."&code=$code&flag=$flag\">$i</a>";
				      }
				   }
				   
				   if ($cur<$tot) echo "<a href=\"product_list.php?key=$key&keyfield=$keyfield&part1_idx=$part1_idx&part_idx=$part_idx&start=".(($i-1)*$rows)."&n=".($i*10-9)."&code=$code&flag=$flag\" class='next'><img src='../images/board/btn_next.gif' alt='Next'></a>";
				   
		?>

							<!-- <a href="#" class="first"><img src="../images/board/btn_first.gif" alt="First"></a>
							<a href="#" class="prev"><img src="../images/board/btn_prev.gif" alt="Previous"></a>
							&nbsp;
							<a href="#">1</a>
							<strong>2</strong>
							<a href="#">3</a>
							<a href="#">4</a>
							<a href="#">5</a>
							<a href="#">6</a>
							<a href="#">7</a>
							<a href="#">8</a>
							<a href="#">9</a>
							<a href="#">10</a>
							&nbsp;
							<a href="#" class="next"><img src="../images/board/btn_next.gif" alt="Next"></a>
							<a href="#" class="last"><img src="../images/board/btn_last.gif" alt="Last"></a>							 -->
						</div>
						<!-- 페이징 //-->
					</div>
					<!-- List //-->
                </div>
            </section>
            <!-- //contents -->
        </div>
<? include "../include/footer.php"; ?>