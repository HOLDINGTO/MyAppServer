const mysql = require(__basename + '/lib/mysql/mysql.js');

class API {
	constructor (){}

	query (sql) {
		return mysql.query(sql);
	}
}

module.exports = new API();