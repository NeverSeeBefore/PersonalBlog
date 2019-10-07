var blogList = new Vue({
    el: "#blog-list",
    data:{
        blogList:[]
    },
    created:function() {
        axios({
            url:"/queryAllBlog",
            method: "get"
        }).then(function(resp) {
            var data = resp.data.data;
            for (var i = 0; i < data.length; i++) {
                data[i].link = "/blog_detail.html?bid=" + data[i].id;                
            }

            blogList.blogList = data;
            console.log(data);
        }).catch(function(reason) {
            console.log(reason)
        })
    }
})