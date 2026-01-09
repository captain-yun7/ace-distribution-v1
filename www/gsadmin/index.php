<?include $_SERVER['DOCUMENT_ROOT']."/common.php"?>
<!DOCTYPE html>
<?$admin_stat = $db->object("cs_admin", "");?>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="description" content="">
    <meta name="author" content="">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
    <title><?=$admin_stat->shop_name;?></title>

    <link href="/gsadmin/css/bootstrap.min.css" rel="stylesheet">
    <!-- <link href="/gsadmin/css/skin/dashboard.css" rel="stylesheet"> -->
    <link href="/gsadmin/css/skin/signin.css" rel="stylesheet">

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
	<script src="/gsadmin/js/form.js"></script>
	<script src="/gsadmin/js/jquery.form.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="/gsadmin/assets/js/ie10-viewport-bug-workaround.js"></script>
  </head>


  <body class="login" onload="login_form.admin_userid.focus();">

   <div class="container-fluid"><!-- /.-fluid pwd 확인유무 -->

      <form class="form-signin" id="login_form" name="login_form" action="./ajax_progress.php" method="post" >
		<input type="hidden" name="login" value="1" />
        <h2 class="form-signin-heading"><?=$admin_stat->shop_name ?></h2>
        <input type="text" name="admin_userid" class="form-control" id="userid" placeholder="아이디">
        <input type="password" name="admin_passwd" class="form-control" id="pass" placeholder="비밀번호">
		 <button class="btn btn-lg btn-primary btn-block" type="submit">로그인</button>
      </form>

    </div>

  </body>
</html>


