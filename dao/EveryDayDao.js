var dbutil = require("./DBUtil");

function insertEveryDay(content, ctime, success){
    var sql = "insert into everyday (`content`, `ctime`) values (?,?);";
    var params = [content, ctime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("insertEveryDay error : " + error);
        }
    })
    connection.end();
}

function queryEveryDay(success){
    var sql = "select * from everyday order by id desc limit 1;";

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("queryEveryDay error : " + error);
        }
    })
    connection.end();
}

module.exports = {
    insertEveryDay,
    queryEveryDay
}