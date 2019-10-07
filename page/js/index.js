var everyDay = new Vue({
    el: "#every-day",
    data: {
        content: "contenttttttt"
    },
    computed: {
        getContent: function () {
            return this.content;
        }
    },
    created: function () {
        // 请求数据 为content赋值
        axios({
            method: "get",
            url: "/queryEveryDay",
        }).then(function (resp) {
            everyDay.content = resp.data.data[0].content;
            // console.log(resp.data.data[0]);
        }).catch(function (reason) {
            console.log(reason);
        })
    }
})

var artilcleList = new Vue({
    el: "#article-list",
    data: {
        page: 1,
        pageSize: 5,
        count: 0,
        pageNumList: [],
        articleList: [],
        tagId: -1,
    },
    computed: {
        getPages: function () {
            return function (page, pageSize) {
                // console.log('tagId: ', this.tagId);
                if (this.tagId > -1) { // 如果通过标签搜索的
                    var tagId = this.tagId;
                    // console.log("通过标签搜索博客列表")
                    axios({
                        url: "/queryBlogByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tagId=" + tagId,
                        method: "get",
                    }).then(function (resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                            // console.log(temp);
                        }
                        artilcleList.articleList = list;
                        artilcleList.page = page;
                        // console.log( "list", list)
                        // console.log(artilcleList.articleList)
                        // console.log('artilcleList.articleList', artilcleList.articleList);
                    }).catch(function (reason) {
                        console.log("请求当前页数据失败 : " + reason);
                    })
                } else {
                    axios({
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize,
                        method: "get",
                    }).then(function (resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                            // console.log(temp);
                        }
                        artilcleList.articleList = list;
                        artilcleList.page = page;
                        // console.log( "list", list)
                        // console.log(artilcleList.articleList)
                    }).catch(function (reason) {
                        console.log("请求当前页数据失败 : " + reason);
                    })
                }
            }
        },
        generatePageTool: function () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];

            result.push({ text: "<<", page: 1 });
            if (nowPage > 2) {
                result.push({ text: nowPage - 2, page: nowPage - 2 });
            }
            if (nowPage > 1) {
                result.push({ text: nowPage - 1, page: nowPage - 1 });
            }
            result.push({ text: nowPage, page: nowPage });
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 1, page: nowPage + 1 });
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 2, page: nowPage + 2 });
            }
            result.push({ text: ">>", page: parseInt((totalCount + pageSize - 1) / pageSize) });
            this.pageNumList = result;
            return result;
        },
        jumpTo: function () {
            return function (page) {
                this.getPages(page, this.pageSize);
            }
        }
    },
    created: function () {

        var serchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        var tagId = -1;
        if (serchUrlParams == "") { // 没有参数搜索全部博客
            this.tagId = tagId;
        } else {                      // 如果有tagId 通过标签搜索
            for (var i = 0; i < serchUrlParams.length; i++) {
                if (serchUrlParams[i].split("=")[0] == "tagid") {
                    try {
                        this.tagId = parseInt(serchUrlParams[i].split("=")[1]);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }
        // console.log('created', this.tagId, serchUrlParams);

        // console.log("搜索全部博客");
        this.getPages(this.page, this.pageSize);
        this.getBlogCount();

    },
    methods: {
        getBlogCount() {
            var tagId = this.tagId;
            if (tagId > -1) {
                console.log("通过tagId查询博客总数")
                axios({
                    url: "/queryBlogCountByTagId?tagId=" + tagId,
                    method: "get"
                }).then(function (resp) {
                    console.log('count', resp.data);
                    artilcleList.count = resp.data.data[0].count;
                    artilcleList.generatePageTool;
                }).catch(function (reason) {
                    console.log("请求总页数失败 : " + reason);
                })
            } else {
                axios({
                    url: "/queryBlogCount",
                    method: "get"
                }).then(function (resp) {
                    console.log('count', resp.data.data[0]);
                    artilcleList.count = resp.data.data[0].count;
                    artilcleList.generatePageTool;
                }).catch(function (reason) {
                    console.log("请求总页数失败 : " + reason);
                })
            }
        }
    }

})