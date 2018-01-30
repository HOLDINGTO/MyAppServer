
const RouteController = require(__basename + '/routesController/routesController.js');

exports.routes = function (app) {

    //发送验证码路由配置
	app.get('/message', RouteController.sendMessageController);
    
    //注册路由配置
	app.post('/register', RouteController.registerController);

	//登录路由配置
	app.post('/login', RouteController.loginController);
    
    //通过邮箱发送验证码路由配置
	app.get('/emailCode', RouteController.emailCodeController);

	//配置修改密码
	app.post('/modifypwd', RouteController.modifypwdController);

}