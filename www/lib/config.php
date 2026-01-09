<?
$Path = "/home/hosting_users/gsdemo136/www";
include ("$Path/lib/config_db.php");
include ("$Path/lib/config_table.php");
include ("$Path/lib/config_where.php");

$Product_Dir = "/home/hosting_users/gsdemo136/www/product";
$Shop_Main_URL = "http://$HTTP_HOST";
$Site_Name = "노벨공조";
$Admin_Email = "njnjs@paran.com";

$Board_Path = "/home/hosting_users/gsdemo136/www/board";
$up_dir_name = "uploaded";

$Pay_Agent='bankwell';
$Pay_Agent_ID = '';
$Pay_Agent_Pass = '';
$Card_Redirect = "$Shop_Main_URL/sub/card_pay_done.php";

$Sub_Good_Division = "3000";
$Default_Mileage = "";
$Free_Shipping_Price = "50000";
$Send_Mail_Term = "100";

include ("$Path/lib/config_etc.php");
?>