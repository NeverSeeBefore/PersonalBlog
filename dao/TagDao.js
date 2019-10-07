var dbutil = require("./DBUtil");

function insertTag(tag, ctime, utime, success){
    var sql = "insert into tag (`tag`, `ctime`, `utime`) values (?,?,?);";
    var params = [tag, ctime, utime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("insertBlog error : " + error);
        }
    })
    connection.end();
}

function queryTag(tag, success){
    var sql = "select * from tag where tag = ?;";
    var params = [tag];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("queryTag error : " + error);
        }
    })
    connection.end();
}

function queryAllTag(success){
    var sql = "select * from tag;";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("queryAllTag error : " + error);
        }
    })
    connection.end();
}

module.exports = {
    insertTag,
    queryTag,
    queryAllTag,
}