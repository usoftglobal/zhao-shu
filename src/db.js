import mysql from "mysql"
import fs from "fs"

export class Db {

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Apple1992',
            database: 'zhao-shu',
            charset: "utf8mb4"
        })

        this.connection.connect()
    }

    // 清空表
    clear(tableName) {
        return new Promise((res, rej) => {
            this.connection.query("TRUNCATE TABLE " + tableName, function (err, result) {
                if (err) rej(err);
                else res(result);
            })
        });
    }

    // 同步查询
    syncQuery(sql) {
        return new Promise((res, rej) => {
            this.connection.query(sql, function (err, result) {
                if (err) rej(err);
                else res(result);
            });
        });
    }

    // 同步创建目录
    syncMkdir(dirname) {
        return new Promise((res, rej) => {
            fs.mkdir(dirname,function(error){
                if (error) rej(error);
                else res(1)
            })
        });
    }

    // 同步新增
    syncInsert(table, data) {
        return new Promise((res, rej) => {
            this.connection.query(
                'INSERT INTO ' + table + ' SET ?', data,
                function (err) {
                    if (err) rej(err);
                    res(1);
                }
            )
        });
    }

    // 新增
    insert(table, data) {
        return this.connection.query(
            'INSERT INTO '+ table +' SET ?', data,
            function (error) {
                if (error) throw error;
            }
        );
    }

    // 同步更新
    syncUpdate(table, where, data) {
        return new Promise((res, rej) => {
            this.connection.query(
                'UPDATE ' + table + ' SET ? WHERE ' + where, data,
                function (err) {
                    if (err) rej(err);
                    res(1);
                }
            )
        });
    }

    // 修改
    update(table, data) {
        return this.connection.query(
            'UPDATE '+table+' SET ? WHERE time=' + data.time + ' and hash="' + data.hash + '"', data,
            function (error) {
                if (error) throw error;
            }
        );
    }
    
    // 删除
    syncDelete(sql) {
        return new Promise((res, rej) => {
            this.connection.query(
                sql,
                function (err) {
                    if (err) rej(err);
                    res(1);
                }
            )
        });
    }
}



