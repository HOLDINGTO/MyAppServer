class SQL {
	constructor() {}
    

    //注册
	registerSQL(o) {
		return "INSERT INTO	`t_user` (`pwd`, `phone`, `register_time`, `agreement`) VALUES ('"+ o.pwd +"','"+ o.phone +"','"+ o.registerTime +"','"+ o.agree +"')";
	}
    
    //查找数据
	findOneSQL(o, field) {
		return "SELECT `" + field + "` FROM `t_user` WHERE `" + field + "` = '" + o[field] + "'";
	}
    

   //登录
   loginSQL(o){
   	   return "SELECT `phone`, `pwd`, `nickname` FROM `t_user` WHERE `phone` = '"+ o.phone +"' AND `pwd` = '"+ o.pwd +"' ";
   }

   //修改t_user loginStatus字段  0：离线 1：在线
   updateLoginStatusSQL (o, val){
   	return "UPDATE `t_user` SET `loginStatus` = "+ val +" WHERE `phone` = '"+ o.phone +"' ";
   }

   //查询邮箱
   findEmailSQL(email){
    return "SELECT `email` FROM `t_user` WHERE `email` = '"+ email +"' ";
   }

   //修改密码
   modifyPwdSQL(o){
    return "UPDATE `t_user` SET `pwd` = '"+ o.pwd +"' WHERE `email` = '"+ o.email +"' "
   }
}

module.exports = new SQL();