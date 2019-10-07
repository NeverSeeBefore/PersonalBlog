
var randomTags = new Vue({
    el: "#random-tags",
    data: {
        tags: [
            {
                tag:"asd",
                tagId: "",
            }
        ]
    },
    created: function() {
        axios({
            method: "get",
            url:"/queryAllTag"
        }).then(function(resp){
            var data = resp.data.data;
            var list = [];
            for(var i = 0; i < data.length; i ++){
                var temp = {};
                temp.tag = data[i].tag;
                temp.tagId = data[i].id;
                temp.link = "/?tagid=" + temp.tagId;
                list.push(temp);
            }
            list.sort(function(){
                return Math.random() > 0.5 ? 1 : -1;
            })
            randomTags.tags = list;
        }).catch(function(reason){
            console.log(reason);
        })
    },
    computed: {
        randomColor: function () {
            return function(){
                var red = Math.random() * 255 + 50;
                var green = Math.random() * 255 + 50;
                var blue = Math.random() * 255 + 50;
                return "rgb(" + red + "," + green + "," + blue + ")";
            }
        },
        randomSize: function () {
            return function() {
                var size = Math.random() * 20 + 12
                return size + "px";
            }
        }
    }
})

var newHot = new Vue({
    el: "#new-hot",
    data: {
        titleList:[
            {
                title: "这是一个链接",
                link: "http://www.baidu.com"
            }
        ]
    },
    created: function() {
        axios({
            method: "get",
            url:"/queryHotBlog?size=5"
        }).then(function(resp){
            var data = resp.data.data;
            // console.log(data);
            var result = [];
            for(var i = 0; i < data.length; i ++){
                var temp = {};
                temp.title = data[i].title;
                temp.link = "/blog_detail.html?bid=" + data[i].id;
                result.push(temp);
            }
            // console.log("result", result);
            newHot.titleList = result;
        }).catch(function(reason){
            console.log(reason);
        })
    },
})

var newComments = new Vue({
    el: "#new-comments",
    data: {
        commentList:[
            {
                name: "name",
                date: "2018-10-10",
                comment: "这里是评论"
            },
            {
                name: "name",
                date: "2018-10-10",
                comment: "这里是评论"
            },
            {
                name: "name",
                date: "2018-10-10",
                comment: "这里是评论"
            },
            {
                name: "name",
                date: "2018-10-10",
                comment: "这里是评论"
            },
            {
                name: "name",
                date: "2018-10-10",
                comment: "这里是评论"
            }
        ]
    },
    created: function() {
        axios({
            method: "get",
            url:"/queryNewComments?size=7"
        }).then(function(resp){
            var data = resp.data.data;
            // console.log(data);
            var result = [];
            for(var i = 0; i < data.length; i ++){
                var temp = {};
                temp.name = data[i].user_name;
                temp.date = data[i].ctime;
                temp.comment = data[i].content;
                result.push(temp);
            }
            // console.log("result", data);
            newComments.commentList = result;
        }).catch(function(reason){
            console.log(reason);
        })
    },
})