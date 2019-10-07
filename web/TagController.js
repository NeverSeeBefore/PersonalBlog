var TagDao = require("../dao/TagDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");

var path = new Map();

function queryAllTag(request, response) {

    TagDao.queryAllTag(function (data) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", data));
        response.end();
    });
}

path.set("/queryAllTag", queryAllTag);


module.exports.path = path;