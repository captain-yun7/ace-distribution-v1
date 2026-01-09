<?
$oneNum = "2";
$twoNum = "1";
?>
<? include "../include/dtd.php"; ?>
<? include "../include/header.php"; ?>

<?
$part1_idx = $_GET['part1_idx'];

if($part1_idx){

$query = "select * from cs_part where idx='$part1_idx'";
$rs = mysql_query($query);
$row = mysql_fetch_array($rs);
$part_name = $row[part_name];
$part1_code = $row[part1_code];

} else {

$part_name = "전체";

}
?>

<div id="sub_visual">
	<div class="sv_2">
		<strong class="page-tit">PRODUCT</strong>
		<p class="sub-tit">최고로 엄선된 재료만을 <br> 제공해 드립니다.</p>
	</div>   
</div>	

<div class="menu-location cm-drop-menu-box-JS" data-drop-event="click">
	<button class="cur-location cm-drop-open-btn-JS">
		<span><?=$part_name?></span> <!-- 현재 클릭된 해당되는 제품의 타이틀이 들어갑니다. -->
		<i class="xi-angle-down-min"></i>
	</button>
	<ul class="location-menu-con cm-drop-list-JS">
									<li><a href="/mobile/product/product_list.php">전체</a></li>
									<?
									$query = "select * from cs_part where part_display_check='1' and part_index='1' order by part_ranking asc, idx asc";
									$rs = mysql_query($query);
									while($row = mysql_fetch_array($rs)){
									?>
									<li><a href="/mobile/product/product_list.php?part1_idx=<?=$row[idx]?>"><?=$row[part_name]?></a></li>
									<? } ?>

	</ul>	
</div>


<div id="content" class="sub_cont">
 <section class="contSec product">
     <div class="area-padding-m">
		
<?
if($part_idx){

	$row = $db->object("cs_part","where idx='$part_idx'");
	$part_name = $row->part_name;

} else {

	$part_name = "전체";

}
?>

		<div class="cm-drop-menu-box-JS" data-drop-event="click">
			<button class="cur-location cm-drop-open-btn-JS pro-cur-list">
				<span><?=$part_name?></span> <!-- 1차 제품에서 선택된 2차 제품의 타이틀이 들어갑니다. --> 
				<i class="xi-angle-down-min"></i>
			</button>
			<ul class="pro-sub-list cm-drop-list-JS"> <!-- 선택한 1차 제품의 2차 제품 리스트들 -->

                    <li <? if($part_idx==""){ ?>class="on"<? } ?>><a href="product_list.php?part1_idx=<?=$part1_idx?>">전체</a></li>
					<?
					$query2 = "select * from cs_part where part_display_check='1' and part1_code='$part1_code' and part_index='2' order by part_ranking asc, idx asc";
					$rs2 = mysql_query($query2);
					while($row2 = mysql_fetch_array($rs2)){
					?>
                    <li><a href="product_list.php?part1_idx=<?=$part1_idx?>&part_idx=<?=$row2[idx]?>" <? if($part_idx==$row2[idx]){ ?>class="on"<? } ?>><?=$row2[part_name]?></a></li>
					<? } ?>

			</ul>
		</div>

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
							<img onclick="search();" style="cursor:pointer;" src="/images/mobile/search_icon_box.png" title="검색" class="btn_sch"></input>
						</div>
					</div>
				</form>

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
									<a href="product_view.php?idx=<?=$row[idx]?>&part1_idx=<?=$part1_idx?>">
										<img src="/data/goodsImages/<?=$row[images1]?>" alt="">
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
				   
				   if ($cur>1) echo "<a href=\"product_list.php?key=$key&keyfield=$keyfield&part1_idx=$part1_idx&part_idx=$part_idx&start=".(($cur-1)*$rows*9)."&n=".($i*10-9)."&code=$code&flag=$flag\" class='prev'><img src='/images/board/btn_prev.gif' alt='Previous'></a>";
				   for($i=$liststart;$i<$listend;$i++) {
				      if($i==$current) echo "<strong>$i</strong>";
				      else {
				          echo "<a href=\"product_list.php?key=$key&keyfield=$keyfield&part1_idx=$part1_idx&part_idx=$part_idx&start=".($i-1)*$rows."&n=".($i*10-9)."&code=$code&flag=$flag\">$i</a>";
				      }
				   }
				   
				   if ($cur<$tot) echo "<a href=\"product_list.php?key=$key&keyfield=$keyfield&part1_idx=$part1_idx&part_idx=$part_idx&start=".(($i-1)*$rows)."&n=".($i*10-9)."&code=$code&flag=$flag\" class='next'><img src='/images/board/btn_next.gif' alt='Next'></a>";
				   
		?>
				</div>
			</div>
		</div>
		<? include "../include/foot_inquiry.php"; ?>
	</div>
</section>
<? include "../include/footer.php"; ?>