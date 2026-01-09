<?
$code = "free";

switch($bgu){
	case "list":
		include "../bbs/bbs_list.php";
	break;

	case "view":
		include "../bbs/bbs_view.php";
	break;

	case "write":
		include "../bbs/bbs_write.php";
	break;

	case "edit":
		include "../bbs/bbs_edit.php";
	break;

	case "pass":
		include "../bbs/bbs_passwd.php";
	break;

	default :
		include "../bbs/bbs_list.php";
	break;
}
?>							