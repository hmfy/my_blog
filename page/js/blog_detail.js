const blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: ""
    },
    methods: {

    },
    created(){
        let search = location.search;
        let params = search.indexOf("?") > -1 ? search.split("?")[1].split("&") : "";
        if (params == ""){
            return
        }
        let bid = -10;
        for (let i = 0; i < params.length; i++){
            let ele = params[i].split("=");
            if (ele[0] == "bid"){
                try {
                    bid = ele[1];
                }catch(e){
                    console.log(e);
                }
            }
        }
        axios({
            url: "/queryBlogById?bid=" + bid,
            method: "get"
        }).then(res => {
            let result = res.data.data[0];
            this.title = result.title;
            this.content = result.content;
            this.ctime = new Date(result.ctime).toLocaleString();
            this.tags = result.tags;
            this.views = result.views;
        }).catch(err => {
            console.log(err, "请求失败!");
        })
    }
});

const sendComment = new Vue({
    el: "#send_comments",
    data: {
        vcode: "",
        rightCode: ""
    },
    methods: {
        sendComment () {
            let rightCode = document.getElementById("comment_code").value;
            if (rightCode != this.rightCode){
                alert("验证码有误!");
                return
            }
            let search = location.search;
            let params = search.indexOf("?") > -1 ? search.split("?")[1].split("&") : "";
            if (params == ""){
                return
            }
            let bid = -10;
            for (let i = 0; i < params.length; i++){
                let ele = params[i].split("=");
                if (ele[0] == "bid"){
                    try {
                        bid = ele[1];
                    }catch(e){
                        console.log(e);
                    }
                }
            }
            let reply = document.getElementById("comment_reply").value;
            let replyName = document.getElementById("comment_reply_name").value;
            let name = document.getElementById("comment_name").value;
            let email = document.getElementById("comment_email").value;
            let content = document.getElementById("comment_content").value;
            axios({
                url: `/addComment?bid=${bid}&parent=${reply}&userName=${name}&email=${email}&content=${content}&parentName=${replyName}`,
                method: "get"
            }).then(res => {
                this.
                alert("评论成功!");
            }).catch(err => {
                console.log(err,  "请求失败!");
            })
        },
        changeCode(){
            axios({
                url: "/queryRandomCode",
                method: "get"
            }).then(res => {
                this.rightCode = res.data.text;
                this.vcode = res.data.data;
            }).catch(err => {
                console.log(err);
            })
        }
    },
    created() {
        this.changeCode();
    }
});

const blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: []
    },
    methods: {
        reply (id, userName) {
            document.getElementById("comment_reply").value = id;
            document.getElementById("comment_reply_name").value = userName;
            location.href = "#send_comments";
        }
    },
    computed: {
        getTotal () {
            return this.comments.length;
        }
    },
    created(){
        let search = location.search;
        let params = search.indexOf("?") > -1 ? search.split("?")[1].split("&") : "";
        if (params == ""){
            return
        }
        let bid = -10;
        for (let i = 0; i < params.length; i++){
            let ele = params[i].split("=");
            if (ele[0] == "bid"){
                try {
                    bid = ele[1];
                }catch(e){
                    console.log(e);
                }
            }
        }
        axios({
            url: `/queryCommentsByBlogId?bid=${bid}`
        }).then(res => {
            this.comments = res.data.data;
            for (let i = 0; i < this.comments.length; i ++) {
                if(this.comments[i].parent > -1){
                    this.comments[i].options = `回复@${this.comments[i].parent_name}`
                }
            }
        }).catch(err => {
            console.log(err, "请求失败!")
        })
    }
});