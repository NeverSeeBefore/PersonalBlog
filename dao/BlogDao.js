var dbutil = require("./DBUtil");

function insertBlog(title, content, tags, views, ctime, utime, success){
    var sql = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) values (?,?,?,?,?,?);";
    var params = [title, content, tags, views, ctime, utime];

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

function queryBlogByPage(page, pageSize, success){
    var sql = "select * from blog order by id desc limit ?, ?;";
    var params = [page * pageSize, parseInt(pageSize)];
    // console.log(params);
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("queryBlogByPage error : " + error);
        }
    })
    connection.end();
}

function queryBlogById(id, success){
    var sql = "select * from blog where id = ?;";
    var params = [id];
    // console.log(params);
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            // console.log('queryBlogById: ', result);
            success(result);
        }else{
            console.log("queryBlogById error : " + error);
        }
    })
    connection.end();
}

function queryHotBlog(size, success){
    var sql = "select * from blog order by views desc limit ?;";
    var params = [size];
    // console.log(params);
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("queryBlogById error : " + error);
        }
    })
    connection.end();
}

function queryAllBlog(success){
    var sql = "select * from blog;";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("queryBlogById error : " + error);
        }
    })
    connection.end();
}

function queryBlogCount(success){
    var sql = "select count(1) as count from blog;";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("queryBlogByPage error : " + error);
        }
    })
    connection.end();
}

function viewRise(blogId, success){
    var sql = "update blog set views = views + 1 where id = ?";
    var params = [blogId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("queryBlogByPage error : " + error);
        }
    })
    connection.end();
}

module.exports = {
    insertBlog,
    queryBlogByPage,
    queryBlogCount,
    queryBlogById,
    queryAllBlog,
    viewRise,
    queryHotBlog
}