var dbutil = require("./DBUtil");

function addComment(blogId, parent, parentName, userName, email, content, ctime, utime, success){
    var sql = "insert into comment (`blog_id`, `parent`, `parent_name`, `user_name`, `email`, `content`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?, ?, ?);";
    var params = [blogId, parent, parentName, userName, email, content, ctime, utime];
    // console.log(arguments);
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("addComment error : " + error);
        }
    })
    connection.end();
}

function queryCommentByBlogId(blogId, success){
    var sql = "select * from comment where blog_id = ?;";
    var params = [blogId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("queryCommentByBlogId error : " + error);
        }
    })
    connection.end();
}

function queryNewComments(size, success){
    var sql = "select * from comment order by ctime limit ?;";
    var params = [size];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("queryCommentByBlogId error : " + error);
        }
    })
    connection.end();
}

function queryCommentCountByBlogId(blogId, success){
    var sql = "select count(1) as count from comment where blog_id = ?;";
    var params = [blogId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("queryCommentByBlogId error : " + error);
        }
    })
    connection.end();
}


module.exports = {
    addComment,
    queryCommentByBlogId,
    queryCommentCountByBlogId,
    queryNewComments
}