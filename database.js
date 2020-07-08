var mysql = require("mysql");
class DatabaseService {
    constructor(
        connectionString = "mysql://user:pass@localhost/dbname?reconnect=true"
    ) {
        this.connect(connectionString)
            .then((connection) => {
                this.connection = connection;
            })
            .catch((err) => {
                throw err;
            })

    }
    connect(connectionString) {
        this._pool = mysql.createPool(connectionString);
        return new Promise((resolve, reject) => {
            this._pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                resolve(connection);
            });
        });
    }

    pool() {
        return this._pool;
    }
    end() {
        return this._pool.end();
    }

    insert(sql, params) {
        return new Promise((resolve, reject) => {
            this.query(sql, params).then(res => {
              resolve(res.insertId);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        })
    }
    update(sql, params) {
        return new Promise((resolve, reject) => {
            this.query(sql, params).then((res) => {
              resolve(res.affectedRows);
            }).catch(err => {
                reject(err);
            })
        })
    }

    delete(sql, params) {
       return this.update(sql, params);
    }
    query(sql, params = {}, sqlcallback = qsql => {}) {
        return new Promise((resolve, reject) => {
            let qsql = this._pool.query(sql, params, (err, res) => {
                sqlcallback(qsql);
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }


    findOne(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.query(sql, params).then(
                res => {
                    if (res.length > 0) {
                        resolve(res[0]);
                    } else {
                        reject(`No results`);
                    }
                }).catch(
                err => {
                    console.log(err);
                    reject(err);
                }
            );
        });
    }
}
// module.exports = new DatabaseService(
//     process.env.CLEARDB_DATABASE_URL || process.env.DATABASE_URL
// );

module.exports = DatabaseService;
module.exports.Database = DatabaseService;
module.exports.DatabaseService = DatabaseService;
