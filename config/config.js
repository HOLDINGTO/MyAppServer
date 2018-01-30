//定义host port(端口)属性
let server = {
	host: '127.0.0.1',
	port: '9096'
};

exports.mysqlOptions = {
	host:server.host,
	user: 'root',
	password:'',
	database:'jinxingzhe'
}


//导出文件
exports.server = server;
