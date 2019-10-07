var dbutil = require("./DBUtil");

function insertTagBlogMapping(tagId, blogId, ctime, success){
    var sql = "insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`) values (?,?,?);";
    var params = [tagId, blogId, ctime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("insertTagBlogMapping error : " + error);
        }
    })
    connection.end();
}

function queryBlogIdByTagId(tagId, success){
    var sql = "select blog_id from tag_blog_mapping where tag_id = ?;";
    var params = [tagId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("queryBlogIdByTagId error : " + error);
        }
    })
    connection.end();
}

function queryByTagId(tagId, page, pageSize, success){
    var sql = "select blog_id from tag_blog_mapping where tag_id = ? limit ?, ?;";
    var params = [tagId, page * pageSize, pageSize];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("queryBlogIdByTagId error : " + error);
        }
    })
    connection.end();
}

function queryBlogCountByTagId(tagId, success){
    var sql = "select count(1) as count from tag_blog_mapping where tag_id = ?;";
    var params = [tagId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log("queryBlogIdByTagId error : " + error);
        }
    })
    connection.end();
}

// function queryTagIdByBlogId(blogId, success){
//     var sql = "select tag_id from tag_blog_mapping where blog_id = ?;";
//     var params = [blogId];
//     var connection = dbutil.createConnection();
//     connection.connect();
//     connection.query(sql, params, function (error, result) {
//         if(error == null){
//             success(result);
//         }else{
//             console.log("queryTagIdByBlogId error : " + error);
//         }
//     })
//     connection.end();
// }

module.exports = {
    insertTagBlogMapping,
    queryBlogIdByTagId,
    // queryTagIdByBlogId,
    queryByTagId,
    queryBlogCountByTagId
}