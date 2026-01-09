<?
$oneNum = "1";
$twoNum = "1";
?>
<? include "../include/header.php"; ?>
		<? include "../include/sub_visual.php"; ?>	
        <div id="content" class="sub_cont">
        	<? include "left.php"; ?>
            <!-- contents -->
            <section class="contSec product">
                <h4>에이스식품</h4>
                <div class="path">제품소개<span class="path_bar">></span>에이스식품</div>
                <div class="cont">
                	<!-- View -->

<?
$query = "select * from cs_goods where idx='$idx'";
$rs = mysql_query($query);
$row = mysql_fetch_array($rs);

		$content = $row[content];
		$content = str_replace("<P>","",$content);
		$content = str_replace("</P>","<br/>",$content);
		$content = str_replace("<p>","",$content);
		$content = str_replace("</p>","<br/>",$content);
?>

					<div class="product_view">			
						<!-- 내용 -->
                        <div class="pv_big_img">
							<img src="/data/goodsImages/<?=$row[images2]?>" width="288" height="288" alt="">
						</div>
						<div class="pv_info">
							<h4><?=$row[name]?></h4>
                            <p class="txt">
                            	<?=$content?>
                            </p>
                            <div class="pvi_feature">
                            	<h5>제품특징</h5>
                                <p>
									<?=nl2br($row[company])?>
									<!-- - 중량 : <?=$row[company]?><br />
                                	- 유통기한 : <?=$row[youtong]?><br />
                                    - 보관방법 : <?=$row[bogan]?><br />
                                    - 박스입수 : <?=$row[boxip]?> -->
								</p>
                            </div>
						</div>
						<!-- 내용 //-->
					</div>
					<div class="btnSec tr">
                        <span class="button large blue"><a href="#none" onclick="history.go(-1);">목록</a></span>
                    </div>
					<!-- View //-->
                </div>
            </section>
            <!-- //contents -->
        </div>
<? include "../include/footer.php"; ?>