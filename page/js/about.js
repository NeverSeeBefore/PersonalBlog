var blogComments = new Vue({
    el: "#blog-comments",
    data:{
        total: 0,
        comments:[
            {
                // name: 
            }
        ],
    },
    computed:{
        reply:function(){
            return function(id, name) {
                console.log(id, name)   
                document.getElementById("comment-reply").value = id;
                // console.log(document.getElementById("reply-tip").innerHTML);
                document.getElementById("reply-tip").innerHTML = name;
                location.href = "#send-comment";
            }
        }
    },
    methods:{

    },
    created: function(){
        var bid = -1;
        axios({
            method: "get",
            url:"/queryCommentByBlogId?bid=" + bid
        }).then(function(resp){
            console.log(resp.data.data);
            blogComments.comments = resp.data.data;
        }).catch(function(reason){
            console.log(reason);
        })
        axios({
            method: "get",
            url:"/queryCommentCountByBlogId?bid=" + bid
        }).then(function(resp){
            console.log(resp.data.data);
            blogComments.total = resp.data.data[0].count;
        }).catch(function(reason){
            console.log(reason);
        })
    }
})

var sendComment = new Vue({
    el: "#send-comment",
    data: {
        vcode:'',
        vcodesvg:'',
    },
    created:function(){
        this.changeCode();
    },
    methods: {
        changeCode:function(){
            axios({
                method: 'get',
                url: '/queryRandomCode'
            }).then(function (resp) {
                // console.log(resp.data.data.text);
                // console.log(sendComment);
                sendComment.vcode = resp.data.data.text;
                sendComment.vcodesvg = resp.data.data.data;
            }).catch(function (reason) {
                console.log('chengeCode error: ', reason);
            })
        },
        commitComment: function () {
            var commentCode = document.getElementById("comment-code");
            if(commentCode.value.toLowerCase() != sendComment.vcode.toLowerCase()){
                alert("验证码有误");
                this.changeCode();
                commentCode.value = ""
                return;
            }
            var bid = -1;
            
            var reply = document.getElementById("comment-reply").value;
            var parentName = document.getElementById("reply-tip").innerHTML;
            console.log(document.getElementById("reply-tip"), parentName);
            if(reply < 0){
                parentName = 0
            }
            var name = document.getElementById("comment-name").value;
            var email = document.getElementById("comment-email").value;
            var content = document.getElementById("comment-content").value;
            console.log(name, email, content);
            // 这里应该用post，因为content可能数据量很大
            axios({
                method: "get",
                url: "/addComment?bid=" + bid + "&parent=" + reply + "&parentName=" + parentName + "&name=" + name + "&email=" + email + "&content=" + content
            }).then(function (res) {
                console.log(res);
            }).catch(function (reason) {
                console.log(reason);
            })
        }
    }
})
