const SMSClient = require('@alicloud/sms-sdk');

const crypto = require('crypto');

//导入邮箱模块
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	host:'smtp.163.com',//主机地址
	port:25,//端口
	auth:{
		user:'holdingto@163.com',//发件邮箱
		pass:'q520k1316'//授权码
	}
})

class Utils{
	constructor (){

	}

	//短信功能
	sendMessage (phone, code){
	  	// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
	    const accessKeyId = 'LTAIyPsSyOX3tvNR';
	    const secretAccessKey = 'PKDY04fmBEuPIZOSexUuuT4EMgp3Wy';
	    //初始化sms_client
	    let smsClient = new SMSClient({accessKeyId, secretAccessKey})
	    //发送短信
	    return smsClient.sendSMS({
	      PhoneNumbers: phone,
	      SignName: '进行者',
	      TemplateCode: 'SMS_119077582',
	      TemplateParam: '{"code":' + code +'}'
	});
	}

    //加密功能
    addCrypto(o, field) {
    	//使用MD5方式加密
    	let md5 = crypto.createHash('md5');

    	//指定加密字段
    	md5.update(o[field]);

    	o[field] = md5.digest('hex');
    }

    //发邮件
    sendEmail(options, fn){
    	transporter.sendMail(options,fn);
    }
}

module.exports = new Utils();