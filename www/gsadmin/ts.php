<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8' />
    <meta http-equiv="X-UA-Compatible" content="chrome=1" />
    <meta name="description" content="Bootstrap datetimepicker : Date/time picker widget for Twitter Bootstrap v3" />
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">


    <link rel="stylesheet" type="text/css" media="screen" href="//cdn.rawgit.com/Eonasdan/bootstrap-datetimepicker/master/build/css/bootstrap-datetimepicker.min.css" />
    <script type="text/javascript" src="//code.jquery.com/jquery-2.1.1.min.js"></script>

    <title>Bootstrap datetimepicker</title>
</head>

<body>
 

<div class="container">
	<div class="row">
		<div class='col-sm-6'>
			<div class="form-group">
				<div class='input-group date' id='datetimepicker5'>
					<input type='text' class="form-control" data-date-format="YYYY-MM-DD"/>
					<span class="input-group-addon">
						<span class="glyphicon glyphicon-calendar"></span>
					</span>
				</div>
			</div>
		</div>
		<script type="text/javascript">
			$(function () {
				$('#datetimepicker5').datetimepicker({
					pickTime: false
				});
			});
		</script>
	</div>
</div>
      



    <script type="text/javascript" src="/gsadmin/calendar/js/moment.js"></script>
    <script type="text/javascript" src="/gsadmin/calendar/js/bootstrap-datetimepicker.js"></script>


</body>
</html>
