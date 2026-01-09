<?session_start();
include $_SERVER['DOCUMENT_ROOT']."/common.php";?>
<?
$query_admin="select * from cs_admin where 1";
$rs_admin=mysql_query($query_admin);
$admin_stat=mysql_fetch_object($rs_admin);
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">

<?
if( !$_SESSION[ADMIN_USERID] || !$_SESSION[ADMIN_PASSWD]) { $tools->alertJavaGo('경고! 잘못된 접근입니다\n\n로그인 하세요', '../index.php');}
$shop_link = $db->object("cs_admin", "", "shop_domain, shop_name");
?>

    <title><?=$admin_stat->shop_name;?></title>

    <link href="/gsadmin/css/bootstrap.min.css" rel="stylesheet">
    <link href="/gsadmin/css/skin/dashboard.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="/gsadmin/js/assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="/gsadmin/assets/js/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="/gsadmin/js/bootstrap.min.js"></script>
    <script src="/gsadmin/js/docs.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="/gsadmin/assets/js/ie10-viewport-bug-workaround.js"></script>


  </head>
  <body>




<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><?=$admin_stat->shop_name;?></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
			<p class="navbar-text pull-right">
              <a href="/" class="navbar-link" target="_blank">Home</a> <?if($ADMIN_USERID){?><a href="/gsadmin/ajax_progress.php?logout=1" class="navbar-link">Logout</a> <?}?>
           </p>
          <ul class="nav navbar-nav navbar-left">
			<!-- 상단메뉴 -->
			 <li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">설정관리 <span class="caret"></span></a>
				<ul class="dropdown-menu" role="menu">
                    <li><a href="/gsadmin/basic/basic_setup.php">관리자계정</a></li>
                    <li><a href="/gsadmin/basic/agreement.php">이용약관</a></li>
                    <li><a href="/gsadmin/basic/safeguard.php">개인정보처리방침</a></li>

                    <!-- <li class="divider"></li>
                    <li class="dropdown-header">Nav header</li> -->

               </ul>
			 </li>


			 <li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">게시판관리 <span class="caret"></span></a>
				<ul class="dropdown-menu" role="menu">
				<!-- <li><a href="/gsadmin/bbs/bbs_admin.php">게시판생성</a></li> -->
						<?
							$query = "select * from cs_bbs  where 1 order by idx asc";
							$rs = mysql_query($query);
							$i=1;
							while($row = mysql_fetch_array($rs)){
						 ?>
					<li><a href="/gsadmin/bbs/bbs_list.php?code=<?=$row[code];?>&menu=<?=$i;?>"><?=$row[name];?></a></li>
					<?$i++;}?>
               </ul>
			 </li>


			 <li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">회원관리 <span class="caret"></span></a>
				<ul class="dropdown-menu" role="menu">
                    <li><a href="/gsadmin/member/member.php?mod=menu03&menu=1">회원리스트</a></li>
               </ul>
			 </li>


			 <li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">제품관리 <span class="caret"></span></a>
				<ul class="dropdown-menu" role="menu">
                    <li><a href="/gsadmin/product/product_add.php?mod=menu04&menu=1">제품등록</a></li>
                    <li><a href="/gsadmin/product/product_list.php?mod=menu04&menu=2">제품수정&목록</a></li>
                    <li><a href="/gsadmin/category/category_list.php?mod=menu04&menu=3">카테고리등록&목록</a></li>
               </ul>
			 </li>


			 <li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">신청서관리 <span class="caret"></span></a>
				<ul class="dropdown-menu" role="menu">
                    <li><a href="/gsadmin/etc/online_list.php?mod=menu09&menu=1">온라인 신청서</a></li>
               </ul>
			 </li>


			 <li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">팝업창관리 <span class="caret"></span></a>
				<ul class="dropdown-menu" role="menu">
                    <li><a href="/gsadmin/design/popup.php">팝업창</a></li>
               </ul>
			 </li>


			 <li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">접속로그 <span class="caret"></span></a>
				<ul class="dropdown-menu" role="menu">
                    <li><a href="/gsadmin/stat/crm5.php">접속로그</a></li>
               </ul>
			 </li>


			 <!-- //상단메뉴 -->
          </ul>

        </div>
      </div>
    </nav>


 <div class="col-sm-3 col-md-2 sidebar">
      <div class="row">
       
          <div class="panel panel-default">

						<?if( $mod == "" ){?>
						<div class="panel-heading"><h3 class="panel-title">관리자</h3></div>
						 <?}?>


					<?if( $mod == "menu01" ){?>
						  <div class="panel-heading"><h3 class="panel-title">설정관리</h3></div>
							<a href="/gsadmin/basic/basic_setup.php" class="list-group-item <?if($menu==1){?>active<?}?>">관리자계정</a></li>
							<a href="/gsadmin/basic/agreement.php" class="list-group-item <?if($menu==2){?>active<?}?>">이용약관</a></li>
							<a href="/gsadmin/basic/safeguard.php" class="list-group-item <?if($menu==3){?>active<?}?>">개인정보처리방침</a></li>
					 <?}?>


					<?if( $mod == "menu02" ){?>
						<div class="panel-heading"><h3 class="panel-title">게시판관리</h3></div>
						  <?
							$query = "select * from cs_bbs order by idx asc";
							$rs = mysql_query($query);
							$i=1;
							while($row = mysql_fetch_array($rs)){
						  ?>
							<a href="../bbs/bbs_list.php?code=<?=$row[code]?>&menu=<?=$i;?>" class="list-group-item <?if($menu==$i){?>active<?}?>"><?=$row[name]?></a>

						  <? $i++;} ?>
					  <?}?>


					<?if( $mod == "menu03" ){?>
						<div class="panel-heading"><h3 class="panel-title">회원관리</h3></div>
						  <a href="/gsadmin/member/member.php" class="list-group-item <?if($menu==1){?>active<?}?>">회원리스트</a>
					 <?}?>


					<?if( $mod == "menu04" ){?>
						<div class="panel-heading"><h3 class="panel-title">제품관리</h3></div>
							<a href="/gsadmin/product/product_add.php" class="list-group-item <?if($menu==1){?>active<?}?>">제품등록</a>
							<a href="/gsadmin/product/product_list.php" class="list-group-item <?if($menu==2){?>active<?}?>">제품수정&목록</a>
							<a href="/gsadmin/category/category_list.php" class="list-group-item <?if($menu==3){?>active<?}?>">카테고리등록&목록</a>
					<?}?>


					 <?if( $mod == "menu09" ){?>
						<div class="panel-heading"><h3 class="panel-title">신청서관리</h3></div>
							<a href="/gsadmin/etc/online_list.php" class="list-group-item <?if($menu==1){?>active<?}?>">온라인 신청서</a>
					  <?}?>


					  <?if( $mod == "menu07" ){?>
						 <div class="panel-heading"><h3 class="panel-title">팝업창관리</h3></div>
							<a href="/gsadmin/design/popup.php?mod=menu07" class="list-group-item <?if($menu==1){?>active<?}?>">팝업창</a>
					  <?}?>


					<?if( $mod == "menu08" ){?>
						<div class="panel-heading"><h3 class="panel-title">접속로그</h3></div>
							<a href="/gsadmin/stat/crm5.php?mod=menu08" class="list-group-item <?if($menu==1){?>active<?}?>">접속로그</a>
					 <?}?>
	
		</div><!-- /.panel panel-default -->

    </div><!-- /.row -->
 </div><!-- /.col-sm-3 col-md-2 sidebar -->


	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" ><!-- 테이블 위치 -->
