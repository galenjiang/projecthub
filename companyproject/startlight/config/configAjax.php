<?php
	include_once '../lib/utility.php';
    $event = null;
    if (array_key_exists('event', $_REQUEST)) {
        $event = $_REQUEST['event'];
    }
    if (is_null($event)) {
        exit();
    }

    $results['result'] = 0;

    switch ($event) {

        //登陆
        case 'login':
            if($_REQUEST['Password']!='12345'){
                $results = Utility::ajaxReturn(1,'密码错误');
                break;
            }
            $params = array(
                'telphone' => $_REQUEST['username'],
                );
            $results = Utility::httpConnectionApi( 'user/login', $params , 'POST' );
            if( $results['status'] == 0 && $results['data']['genre'] < 10 ){
                setcookie('userInfo', NULL);
                $_SESSION['userInfo'] = $results['data'];
                Utility::setCookie( $results['data'] );
            }else{
                setcookie('userInfo', NULL);
                session_unset();
                $results = Utility::ajaxReturn(1,'登录失败');
            }
            break;

				//摇一摇
				case 'shaik':
								$results = Utility::httpConnectionApi('coupon/shake');
						break;

				//列表
				// case 'liebiao':
				// 				$results = Utility::httpConnectionApi('coupon/list');
				// 	break;

        default:
            break;
    }
    if( is_array($results) ){
					echo json_encode($results);
		}else{
					echo $results;
		}
		exit;
