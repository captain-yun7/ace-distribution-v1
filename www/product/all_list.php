<?
$oneNum = "1";
$twoNum = "0";
?>
<? include "../include/header.php"; ?>
		<? include "../include/sub_visual.php"; ?>	
        <div id="content" class="sub_cont">
        	<? include "left.php"; ?>
            <!-- contents -->
            <section class="contSec product">
                <h4>전체</h4>
                <div class="path">제품소개<span class="path_bar">></span>전체</div>
                <div class="cont">
                	<!-- List -->
					<div class="product_list">
						<!-- 검색 -->
						<form id="" name="form" method="post" action="all_list.php">
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
$query = "select * from cs_goods where display='1'";
if($key){ $query.=" and $keyfield like '%$key%'"; }
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
				   
				   if ($cur>1) echo "<a href=\"all_list.php?key=$key&keyfield=$keyfield&start=".(($cur-1)*$rows*9)."&n=".($i*10-9)."&code=$code&flag=$flag\" class='prev'><img src='../images/board/btn_prev.gif' alt='Previous'></a>";
				   for($i=$liststart;$i<$listend;$i++) {
				      if($i==$current) echo "<strong>$i</strong>";
				      else {
				          echo "<a href=\"all_list.php?key=$key&keyfield=$keyfield&start=".($i-1)*$rows."&n=".($i*10-9)."&code=$code&flag=$flag\">$i</a>";
				      }
				   }
				   
				   if ($cur<$tot) echo "<a href=\"all_list.php?key=$key&keyfield=$keyfield&start=".(($i-1)*$rows)."&n=".($i*10-9)."&code=$code&flag=$flag\" class='next'><img src='../images/board/btn_next.gif' alt='Next'></a>";
				   
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
							<a href="#" class="last"><img src="../images/board/btn_last.gif" alt="Last"></a>						 -->	
						</div>
						<!-- 페이징 //-->
					</div>
					<!-- List //-->
                </div>
            </section>
            <!-- //contents -->
        </div>
<? include "../include/footer.php"; ?>