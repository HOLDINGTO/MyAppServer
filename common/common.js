/*
  protocal => agree
  100: 同意协议
  101：不同意协议
*/


module.exports = {

	protocal: {
		agree:100,
		agree:101 
	},
	register: {
		success: {
			msg:'注册成功',
			statusCode:200
		},
		info: {
			msg: '手机号已经被注册',
			statusCode:201
		},
		error: {
			msg: '该手机号已经被注册',
			statusCode:201
		}
	},
	login: {
		success:{
			msg:'登陆成功',
			statesCode: '300'
		},
		fail: {
			msg: '用户名或者密码错误',
			statusCode: 301
		},
		error: {
			msg: '登录失败',
			statusCode: 302
		}
	}
}