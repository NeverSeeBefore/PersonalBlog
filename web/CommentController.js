var commentDao = require("../dao/CommentDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");
var captcha = require("svg-captcha");

var path = new Map();

function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(params);
    commentDao.addComment( params.bid, params.parent, params.parentName, params.name, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end();
    })
}

path.set("/addComment", addComment);

function queryRandomCode(request, response) {
    var img = captcha.create({fontSize:50, width:100, height:34});
    // console.log(img);
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "验证码生成成功", img));
    response.end();
}

path.set("/queryRandomCode", queryRandomCode);

function queryCommentByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentByBlogId(params.bid, function(data){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "获取评论成功", data));
        response.end();
    })
}

path.set("/queryCommentByBlogId", queryCommentByBlogId);

function queryCommentCountByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentCountByBlogId(params.bid, function(data){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "获取评论成功", data));
        response.end();
    })
}

path.set("/queryCommentCountByBlogId", queryCommentCountByBlogId);

function queryNewComments(request, response) {
    var params = url.parse(request.url, true).query;

    commentDao.queryNewComments(parseInt(params.size), function(data){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "获取评论成功", data));
        response.end();
    })
}

path.set("/queryNewComments", queryNewComments);

module.exports.path = path;