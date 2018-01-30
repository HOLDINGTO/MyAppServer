//导入utils.js文件
const Utils = require(__basename + '/utils/utils.js');

const API = require(__basename + '/service/api.js');

const SQL = require(__basename + '/lib/sql/sql.js');

const common = require(__basename + '/common/common.js');


class RouteController {
	    constructor (){}
        
        //短信验证功能
		sendMessageController (req, res){
			//req.query 方法请求查询参数 得到的结果为一个对象
            // console.log(req.query);
            //res.send 服务器向前端发送数据
            // res.send('success');

			//利用时间戳随机生成验证码,
		    let time = new Date().getTime().toString();
            //截取6位验证码
			let code = time.slice(time.length - 6);

			let selectSQL = SQL.findOneSQL(req.query, 'phone');
		

            res.send({code:code});
			Utils.sendMessage(req.query.phone, code)
			    .then((data) => {
			        let {Code}=data
				    if (Code === 'OK') {
				        //处理返回参数
				        res.send({code:code, msg:'发送短信验证码成功', status: 1})
				         }
					}, (err) => {
					    console.log(err)
					    res.send({msg:'发送短信验证码失败', status: 0})
			})
		}

		//注册功能
		registerController (req, res){
           //req.query 请求参数, GET请求携带的参数
           //req.body 	请求参数, POST请求体携带的参数
           // console.log(req.body)

           let selectSQL = SQL.findOneSQL(req.body, 'phone');
            // console.log(selectSQL);
            console.log(req.body);
           API.query(selectSQL)
               .then(result => {
               	// console.log(result[0].length === 1);
	               	if(result[0].length === 1){
	               		res.json(common.register.info);
	               	}else {
	               		// 如果手机号没有被注册，则插入sql语句
	               		Utils.addCrypto(req.body, 'pwd');
	               		// console.log(req.query);
	               		let sql = SQL.registerSQL(req.body);
	               		console.log(sql);
	               		API.query(sql)
	               		    .then(data => {
	               		    	res.json(common.register.success);
	               		    })
	               		    .catch(err => {
	               		    	res.json(common.register.error);
	               		    })
	               	}
               })
               .catch(err => {
               	   res.json(common.register.error)
               })
			// console.log('API.query==>', API.query());
		}

		//登录功能
		loginController (req, res){
			//req.body 	POST请求体携带的参数

			Utils.addCrypto(req.body, 'pwd');

			let sql = SQL.loginSQL(req.body);
			// res.send(sql);

			//查询数据库
			API.query(sql)
			    .then(result => {
			    	if (result[0].length === 1) {
                        common.login.success.phone = result[0][0].phone;
                        common.login.success.nickname = result[0][0].nickname;
                        let  updatesql = SQL.updateLoginStatusSQL(req.body, 1);
                        API.query(updatesql)
                            .then(result => {
                            	res.json(common.login.success);
                            })
                            .catch(err => {
                            	res.json(common.login.success);
                            })
                       
			    	}else {
			    		res.json(common.login.fail);
			    	}
			    })
			    .catch(err => {
                     // res.json(common.login.error);
                     res.json(common.login.error);
			    })
		}

        //邮箱发送验证码
		emailCodeController(req, res){
			// res.send(req.query); 返回数据
			// console.log('req.query ==>', req.query);
			//随机生成6位验证码
			let time = new Date().getTime().toString();

			let code = time.slice(time.length - 6);
			// console.log('req.query.email ==>', req.query.email);
			let sql = SQL.findEmailSQL(req.query.email);

			console.log('sql ==>', sql);
			API.query(sql)
				.then(result => {
					// console.log('result[0] ==>', result[0]);
					if(result[0].length == 1){

						let options = {
						from:'holdingto@163.com',//发件地址
						to:req.query.eamils,//收件地址
						subject:'修改密码', //邮件主题标题
						text:'验证码',
						html:'<b>您的验证码是:'+ code +',一切向您索要密码的都是骗子</b>'

						};
						Utils.sendEmail(options , function(){
			                res.send({msg:'验证码已成功发送至您的邮箱，请注意查收！',code:code ,statusCode: 701})
						})
					}else{
						res.json({msg:'该邮箱未绑定用户', statusCode: 701})
					}
				})
				.catch(err => {
					res.send('出错了！')
				})

		}

		//修改密码
		modifypwdController(req, res){
			
			//密码加密
			Utils.addCrypto(req.body, 'pwd');

			// 调用sql查询语句
			let sql = SQL.modifyPwdSQL(req.body)

			// console.log('req.body ==>',req.body);
			// res.send(req.body)

			API.query(sql)
				.then(result => {
					res.json(result);
				})
				.catch(err => {
					res.send('出错了');
				})
		}
    
}

//导出文件
module.exports = new RouteController();