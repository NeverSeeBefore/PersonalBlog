var blogDao = require("../dao/BlogDao");
var tagDao = require("../dao/TagDao");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");

var path = new Map();

function editBlog(request, response) {
    request.on("data", function (data) {
        var params = url.parse(request.url, true).query;
        var tags = params.tags.replace(/ /g, "").replace("，", ",");
        blogDao.insertBlog(params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for (var i = 0; i < tagList.length; i++) {
                if (tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i], blogId);

            }
        })
    })
}

path.set("/editBlog", editBlog);

function queryBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(params.page, params.pageSize, function (data) {
        for (var i = 0; i < data.length; i++) {
            // 去掉图片
            data[i].content = data[i].content.replace(/<img[\w\W]*">/, "");
            // 去掉标签
            data[i].content = data[i].content.replace(/<[\w\W]{1,5}>/g, "");
            // data[i].content = data[i].content.replace(/&[\w]*;/g, "");
            // 截取300字符显示
            data[i].content = data[i].content.substring(0, 300);
        }

        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", data));
        response.end();
    });
}

path.set("/queryBlogByPage", queryBlogByPage);

function queryBlogByTag(request, response) {
    var params = url.parse(request.url, true).query;
    //console.log("queryBlogByTag(", params, ")"); // page pageSize TagId
    // 找到tagid对应的blogid  limit  page params.pageSize 
    tagBlogMappingDao.queryByTagId(parseInt(params.tagId), parseInt(params.page), parseInt(params.pageSize), function (result) {
        if (result == null || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end();
        } else {
            // 遍历数组，查询blogid对应的博客，存入blogList
            var blogList = [];
            for (var i = 0; i < result.length; i++) {
                blogDao.queryBlogById(result[i].blog_id, function (blog) {
                    // console.log(i,i,i,i,i, blog);
                    // 去掉图片
                    blog[0].content = blog[0].content.replace(/<img[\w\W]*">/, "");
                    // 去掉标签
                    blog[0].content = blog[0].content.replace(/<[\w\W]{1,5}>/g, "");
                    // 截取300字符显示
                    blog[0].content = blog[0].content.substring(0, 300);
                    blogList.push(blog[0]);
                });
            }

            getResult(blogList, result.length, response);
            // console.log("=====");

        }
    })



}

path.set("/queryBlogByTag", queryBlogByTag);

function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(function () {
            getResult(blogList, len, response)
        }, 100);
    } else {
        // console.log(blogList);
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", blogList));
        response.end();
    }

}

function queryBlogCountByTagId(request, response) {
    var params = url.parse(request.url, true).query;
    //console.log("queryBlogByTag(", params, ")"); // page pageSize TagId
    // 找到tagid对应的blogid  limit  page params.pageSize 
    tagBlogMappingDao.queryBlogCountByTagId(parseInt(params.tagId), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end();
    })
}

path.set("/queryBlogCountByTagId", queryBlogCountByTagId);

function queryBlogById(request, response) {
    var params = url.parse(request.url, true).query;

    blogDao.queryBlogById(parseInt(params.bid), function (data) {
        // console.log(data);
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", data));
        response.end();
        blogDao.viewRise(parseInt(params.bid), function (data) { });
    });
}

path.set("/queryBlogById", queryBlogById);

function queryHotBlog(request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(parseInt(params.size));
    blogDao.queryHotBlog(parseInt(params.size), function (data) {
        // console.log(data);
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", data));
        response.end();
    });
}

path.set("/queryHotBlog", queryHotBlog);

function queryAllBlog(request, response) {
    blogDao.queryAllBlog(function (data) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", data));
        response.end();
    });
}

path.set("/queryAllBlog", queryAllBlog);

function queryBlogCount(request, response) {
    blogDao.queryBlogCount(function (data) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", data));
        response.end();
    });
}

path.set("/queryBlogCount", queryBlogCount);


function queryTag(tag, blogId) {
    tagDao.queryTag(tag, function (result) {
        // 没有标签就添加标签，然后添加映射
        // 有标签，就直接添加映射
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        } else {
            insertTagBlogMapping(result[0].id, blogId);
        }
    })
}

function insertTag(tag, blogId) {
    tagDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        var tagId = result.insertId;
        insertTagBlogMapping(tagId, blogId);
    })
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), function (result) {
        console.log('insertTagBlogMapping success');
    })
}

module.exports.path = path;