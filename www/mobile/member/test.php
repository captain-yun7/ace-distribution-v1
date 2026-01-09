<?
include $_SERVER["DOCUMENT_ROOT"]."/lib/config.php";
include "./lib/config.php";
include $_SERVER["DOCUMENT_ROOT"].$site_directory."/include/dtd.php";
include($_SERVER['DOCUMENT_ROOT']."/lib/page_class.php");
$mainPage = "mainPage";
?>
<!--[if lt IE 9]>
	<script src="<?=$site_host?>/js/ie8_popup.js"></script>
<![endif]-->

<script>
	$(function  () {
		dep1 = 0,
		dep2 = 0;
	})
</script>
<script type="text/javascript" src="<?=$site_host?>/js/nav.js"></script>
<script type="text/javascript" src="<?=$site_host?>/js/main.js"></script>

<!-- FullPage JS -->
<link rel="stylesheet" type="text/css" href="<?=$site_host?>/css/plugin/jquery.fullPage.css" />
<script type="text/javascript" src="<?=$site_host?>/js/plugin/scrolloverflow.min.js"></script>
<script type="text/javascript" src="<?=$site_host?>/js/plugin/jquery.fullPage.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		$('#fullpage').fullpage({
			navigation: true,
			navigationPosition: 'right',
			navigationTooltips: ['MAIN', 'PRODUCTS', 'SUPPORT'],
			responsiveHeight: 800,
			responsiveWidth: 1024,
			onLeave : function(index, nextIndex){
				// top버튼
				if (index != 0) {
					$(".to-top-btn").addClass("fixed");
				}else {
					$(".to-top-btn").remove("fixed");
				}
				// 오른쪽 rightBar 색상변경
				if( nextIndex == 2){
					$("#fp-nav").addClass("blue");
				}else {
					$("#fp-nav").removeClass("blue");
				}
				
			}
		});
	});
</script>

</head>

<body>
<!--[if lt IE 7]>
<p class="cm-alert-ie">현재 웹브라우저에서는 사이트가 정상적으로 표시되지 않을 수 있습니다. <strong><a href="http://browsehappy.com/" target="_blank">여기를 클릭</a></strong>하여 웹브라우저를 업그레이드 하세요.</p>
<![endif]-->
<!-- accessibility -->
<div class="cm-accessibility">
	<a href="#mainContainer">본문바로가기</a>
</div>
<!-- //accessibility -->

<!-- code -->
<div id="wrap" class="main-page">
	<!-- header -->
<? include $_SERVER["DOCUMENT_ROOT"].$site_directory."/include/header.php"; ?>
	<!-- //header -->
	<!-- container -->
	<div id="fullpage">
		<!-- ****************** 메인비주얼 ********************** -->
		<section id="mainVisual" class="section active">
			<div class="main-visual-con">
				<div class="main-visual-item">
					<div class="main-visual-pc-img" style="background:#fff url(/images/main/main_visual_01.jpg) no-repeat 50% 50%;"></div>
					<div class="main-visual-m-img" style="background:#fff url(/images/main/main_visual_01_m.jpg) no-repeat 50% 50%;"></div>	<!-- 모바일이미지 -->
					<div class="main-visual-txt-con">
						<div class="main-visual-txt-inner area02">
							<strong class="main-visual-txt1 font-tomorrow">视频监控产品</strong>
							<p class="main-visual-txt2">我们拥有客户需求的各种视频监控产品。</p>
							<a href="<?=$site_url?>/product/product_list.php?part1_idx=1" class="main-visual-more-btn main-more-btn">详细视图<i class="material-icons arrow">arrow_right_alt</i></a>
							<div class="main-visual-item-img"><img src="<?=$site_host?>/images/main/main_visual_item_img_01.png" alt=""></div>
						</div>
					</div>
				</div>
				<div class="main-visual-item">
					<div class="main-visual-pc-img" style="background:#fff url(/images/main/main_visual_02.jpg) no-repeat 50% 50%;"></div>
					<div class="main-visual-m-img" style="background:#fff url(/images/main/main_visual_02.jpg) no-repeat 50% 50%;"></div>	<!-- 모바일이미지 -->
					<div class="main-visual-txt-con">
						<div class="main-visual-txt-inner area02">
							<strong class="main-visual-txt1 font-tomorrow">安防解决方案</strong>
							<p class="main-visual-txt2">我们一直在努力创建一个安全和繁荣的世界。</p>
							<a href="<?=$site_url?>/product/product_list.php?part1_idx=1" class="main-visual-more-btn main-more-btn">详细视图<i class="material-icons arrow">arrow_right_alt</i></a>
							<div class="main-visual-item-img"><img src="<?=$site_host?>/images/main/main_visual_item_img_02.png" alt=""></div>
						</div>
					</div>
				</div>
				<div class="main-visual-item">
					<div class="main-visual-pc-img" style="background:#fff url(/images/main/main_visual_03.jpg) no-repeat 50% 50%;"></div>
					<div class="main-visual-m-img" style="background:#fff url(/images/main/main_visual_03.jpg) no-repeat 50% 50%;"></div>	<!-- 모바일이미지 -->
					<div class="main-visual-txt-con">
						<div class="main-visual-txt-inner area02">
							<strong class="main-visual-txt1 font-tomorrow">创造核心技术</strong>
							<p class="main-visual-txt2">我们设计、制造安防摄像机的核心的自动调焦模组。</p>
							<a href="<?=$site_url?>/product/product_list.php?part1_idx=2" class="main-visual-more-btn main-more-btn">详细视图<i class="material-icons arrow">arrow_right_alt</i></a>
							<div class="main-visual-item-img item03"><img src="<?=$site_host?>/images/main/main_visual_item_img_03.png" alt=""></div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="section" id="mainProductCon">
			<article class="main-prd-container ">
				<article class="main-prd-detail">
					<div class="table-layout ">
						<div class="table-cell-layout">
							<div class="main-prd-slide-wrap">
								<div class="main-prd-slide">
								<?
								$goods_rs = $db->select("cs_goods","where display=1 and main_position=1 and lang='$lang' order by ranking asc, idx desc");
								while($goods_row = mysqli_fetch_object($goods_rs)){
									$part3_row = $db->object("cs_part","where idx='$goods_row->part_idx' and part_index=3 and part_display_check=1");
									$part3_2_row = $db->object("cs_part","where part2_code='$part3_row->part2_code' and part_index=2 and part_display_check=1");
									$part3_1_row = $db->object("cs_part","where part1_code='$part3_row->part1_code' and part_index=1 and part_display_check=1");

									$part2_row = $db->object("cs_part","where idx='$goods_row->part_idx' and part_index=2 and part_display_check=1");
									$part2_1_row = $db->object("cs_part","where part1_code='$part2_row->part1_code' and part_index=1 and part_display_check=1");

									$new_img = $page->bbsNewImg( $goods_row->register, 24, "<em class='prd-new-icon'>NEW</em>" ); 
									
								?>
									<div class="main-prd-slide-item">
										<div class="inner clearfix">
											<div class="main-prd-img">
												<div class="main-prd-img-wrap">
													<!-- NEW 아이콘 추가 -->
													<?if($goods_row->sub_position2==1){?>
													<em class="prd-discontinued-icon">Discontinued</em>
													<?}?>
														
													<?if($goods_row->sub_position==1){?>
													<em class="prd-new-icon">NEW</em>
													<?}?>
													<!-- NEW 아이콘 추가 -->
													<span><img src="<?=$site_host?>/data/goodsImages/<?=$goods_row->images1?>" alt=""></span>
												</div>
											</div>
											<div class="main-prd-info">
												<h4 class="main-prd-name"><?=$goods_row->name?></h4>
												<div class="info-con">
													<dl class="info-con-item info-con-first clearfix">
														<dt class="info-tit-box"><span class="info-tit">모델구분</span></dt>
														<dd class="info-txt-box">
															<p class="info-txt"><?=$goods_row->name2?></p>
														</dd>
													</dl>
													<dl class="info-con-item clearfix">
														<dt class="info-tit-box"><span class="info-tit">제품특징</span></dt>
														<dd class="info-txt-box info-txt-list"> 
															<?if($goods_row->name3!=""){?><p class="info-txt"><?=$goods_row->name3?></p><?}?>
															<?if($goods_row->name4!=""){?><p class="info-txt"><?=$goods_row->name4?></p><?}?>
															<?if($goods_row->name5!=""){?><p class="info-txt"><?=$goods_row->name5?></p><?}?>
															<?if($goods_row->name6!=""){?><p class="info-txt"><?=$goods_row->name6?></p><?}?>
															<?if($goods_row->name7!=""){?><p class="info-txt"><?=$goods_row->name7?></p><?}?>
														</dd>
													</dl>
												</div>
												<?if($part3_row->part_index==3){?><a href="<?=$site_url?>/product/product_view.php?idx=<?=$goods_row->idx?>&part1_idx=<?=$part3_1_row->idx?>
												&part2_idx=<?=$part3_2_row->idx?>&part3_idx=<?=$part3_row->idx?>" class="main-prd-more-btn main-more-btn"><?}
												else if($part3_row->part_index!=3){?><a href="<?=$site_url?>/product/product_view.php?idx=<?=$goods_row->idx?>&part1_idx=<?=$part2_1_row->idx?>
												&part2_idx=<?=$part2_row->idx?>" class="main-prd-more-btn main-more-btn"><?}?>产品详细视图<i class="material-icons arrow">arrow_right_alt</i></a>
											</div>
										</div>
									</div>
									<?}?>

									
								</div>
							</div>
						</div>
					</div>
				</article>
				<aside class="main-prd-nav">
					<div class="area-box">
						<div class="main-prd-list">

						<?
								$goods_rs2 = $db->select("cs_goods","where display=1 and main_position=1 and lang='$lang' order by ranking asc, idx desc");
								while($goods_row2 = mysqli_fetch_object($goods_rs2)){
									$new_img2 = $page->bbsNewImg( $goods_row2->register, 24, "<em class='prd-new-icon'>N</em>" ); 
								?>

							<div class="main-prd-list-item">
								<div class="main-more-btn">
									<dl class="item-inner">
										<dt class="list-prd-img">
											<!-- NEW 아이콘 추가 -->
											<?if($goods_row2->sub_position==1){?>
											<em class="prd-new-icon">N</em>
											<?}?>
											<!-- NEW 아이콘 추가 -->
											<span><img src="<?=$site_host?>/data/goodsImages/<?=$goods_row2->images1?>" alt=""></span>
										</dt>
										<dd>
											<p class="list-prd-name"><?=$goods_row2->name?></p>
										</dd>
									</dl>
								</div>
							</div>
							<?}?>

							

						</div>
					</div>
				</aside>
			</article>
		</section>
		<section class="section" id="mainQuickMenu">
			<div class="main-quick-menu-inner">
				<article class="main-notice-banner">
					<div class="clearfix">
						<div class="main-notice">
							<div class="main-notice-inner">
								<div class="notice-tit-box">
									<h3 class="notice-tit">公告事项</h3>
									<a href="<?=$site_host?>/cn/customer/notice.php" class="notice-more-btn">详细视图<i class="material-icons">arrow_right_alt</i></a>
								</div>
								<div class="notice-con">
                                <?
								$notice_code = 'notice';
								$notice_rs = $db->select("cs_bbs_data","where code='$notice_code' and main_display='y' and notice='1' and lang='$lang' order by idx desc LIMIT 1");
								while($notice_row = mysqli_fetch_object($notice_rs)){
									$notice_reg_date = $tools->strDateCut($notice_row->reg_date,9); 
								?>
									<div class="notice-top-con">
										<p class="top-bbs-tit"><a href="<?=$site_host?>/cn/customer/notice.php?bgu=view&idx=<?=$notice_row->idx?>" class="bbs-tit"><span class="notice-point">공지</span><?=$notice_row->subject?></a><span class="bbs-date"><i class="material-icons">access_time</i><?=$notice_reg_date?></span></p>
									</div>
									<?}?>
									<div class="notice-con-list"> <!-- 4개까지만 노출  -->
										<ul>
										<?
										$notice_rs2 = $db->select("cs_bbs_data","where code='$notice_code' and main_display='y' and notice='0' and lang='$lang' order by idx desc
										LIMIT 4");
										while($notice_row2 = mysqli_fetch_object($notice_rs2)){
											$notice_reg_date2 = $tools->strDateCut($notice_row2->reg_date,9); 
										?>
											<li>
												<a href="<?=$site_host?>/cn/customer/notice.php?bgu=view&idx=<?=$notice_row2->idx?>" class="bbs-tit"><?=$notice_row2->subject?></a>
												<span class="bbs-date"><i class="material-icons">access_time</i><?=$notice_reg_date2?></span>
											</li>
											<?}?>
											
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="main-banner">
							<div class="clearfix">
								<div class="main-banner-con left-con">
									<div class="inner">
										<h4 class="main-banner-tit">售后服务</h4>
										<div class="banner-info-box">
											<p class="tel font-tomorrow"><a href="tel:8223665-3200">+82-2-3665-3200</a></p>
											<p class="time"><span>MON-FRI</span><em>09:00 ~ 18:00</em></p>
										</div>
									</div>
								</div>
								<div class="main-banner-con right-con">
									<a href="<?=$site_url?>/customer/customer.php">
										<div class="inner">
											<h4 class="main-banner-tit">顾客咨询</h4>
											<div class="banner-info-box">
												<p class="email font-tomorrow"><i class="material-icons">mail</i>sales@wonwoo.com</p>
											</div>
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</article>
				<article class="main-quick-menu area02">
					<ul class="main-quick-menu-list clearfix">
						<li class="item01">
							<a href="<?=$site_url?>/company/summary.php" >
								<strong class="main-bottom-menu-tit">公司概况</strong>
								<div class="main-bottom-menu-img-con" style="background:url(/images/main/main_quick_menu_off_01.jpg) no-repeat 0 0;">
									<span class="main-bottom-img-on" style="background:url(/images/main/main_quick_menu_on_01.jpg) no-repeat 0 0;"></span>
								</div>
								<p class="main-bottom-menu-txt">
									<!-- <span>COMPANY</span> -->
								</p>
								<div class="main-bottom-more-btn cm-btn-style01"><span>详细视图</span></div>
							</a>
						</li>
						<li class="item02">
							<a href="<?=$site_url?>/data/prd_data.php">
								<strong class="main-bottom-menu-tit">产品资料</strong>
								<div class="main-bottom-menu-img-con" style="background:url(/images/main/main_quick_menu_off_02.jpg) no-repeat 0 0;">
									<span class="main-bottom-img-on" style="background:url(/images/main/main_quick_menu_on_02.jpg) no-repeat 0 0;"></span>
								</div>
								<p class="main-bottom-menu-txt">
									<!-- <span>DATA CENTER</span> -->
								</p>
								<div class="main-bottom-more-btn cm-btn-style01"><span>详细视图</span></div>
							</a>
						</li>
						<li class="item03">
							<a href="<?=$site_url?>/company/global.php">
								<strong class="main-bottom-menu-tit">海外分公司</strong>
								<div class="main-bottom-menu-img-con" style="background:url(/images/main/main_quick_menu_off_03_global.jpg) no-repeat 0 0;">
									<span class="main-bottom-img-on" style="background:url(/images/main/main_quick_menu_on_03_global.jpg) no-repeat 0 0;"></span>
								</div>
								<p class="main-bottom-menu-txt">
									<!-- <span>SERVICE GUIDE</span> -->
								</p>
								<div class="main-bottom-more-btn cm-btn-style01"><span>详细视图</span></div>
							</a>
						</li>
						<li class="item04">
							<a href="<?=$site_url?>/company/location.php" >
								<strong class="main-bottom-menu-tit">公司地址</strong>
								<div class="main-bottom-menu-img-con" style="background:url(/images/main/main_quick_menu_off_04.jpg) no-repeat left 0;">
									<span class="main-bottom-img-on" style="background:url(/images/main/main_quick_menu_on_04.jpg) no-repeat left 0;"></span>
								</div>
								<p class="main-bottom-menu-txt">
									<!-- <span>LOCATION</span> -->
								</p>
								<div class="main-bottom-more-btn cm-btn-style01"><span>详细视图</span></div>
							</a>
						</li>
					</ul>
				</article>
			</div>
		</section>
		<section class="section fp-auto-height" id="mainFooter">
			<style>
				#subTopBtn {display:none;}
			</style>
			<?  include $_SERVER["DOCUMENT_ROOT"].$site_directory."/include/footer.php"; ?>
		</section>
	</div>
	<!-- //container -->
	<a href="#wrap" class="to-top-btn" id="mainTopBtn"><i class="material-icons">&#xE316;</i></a>
	<!-- 모달 레이어팝업 -->
	<article class="modal-fixed-pop-wrapper">
		<div class="modal-fixed-pop-inner">
			<div class="modal-loading"><span class="loading"></span></div>
			<div class="modal-inner-box">
				<div class="modal-inner-content">
					<!-- ajax 내용 -->
				</div>
			</div>
		</div>
	</article>
</div>
<!-- //code -->
</body>
</html>
<?
if($tools->device()=="mobile"){
	include $_SERVER['DOCUMENT_ROOT']."/in_popup_m.php";
}else{
	include $_SERVER['DOCUMENT_ROOT']."/in_popup.php";
}
?>