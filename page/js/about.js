const sendComment = new Vue({
    el: "#send_comments",
    data: {
        vcode: "",
        rightCode: ""
    },
    methods: {
        sendComment() {
            let rightCode = document.getElementById("comment_code").value;
            if (rightCode != this.rightCode) {
                alert("验证码有误!");
                return
            }
            let bid = -1;
            let reply = document.getElementById("comment_reply").value;
            let replyName = document.getElementById("comment_reply_name").value;
            let name = document.getElementById("comment_name").value;
            let email = document.getElementById("comment_email").value;
            let content = document.getElementById("comment_content").value;
            axios({
                url: `/addComment?bid=${bid}&parent=${reply}&userName=${name}&email=${email}&content=${content}&parentName=${replyName}`,
                method: "get"
            }).then(res => {
                alert("评论成功!");
            }).catch(err => {
                console.log(err, "请求失败!");
            })
        },
        changeCode() {
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
        reply(id, userName) {
            document.getElementById("comment_reply").value = id;
            document.getElementById("comment_reply_name").value = userName;
            location.href = "#send_comments";
        }
    },
    computed: {
        getTotal() {
            return this.comments.length;
        }
    },
    created() {
        let bid = -1;
        axios({
            url: `/queryCommentsByBlogId?bid=${bid}`
        }).then(res => {
            this.comments = res.data.data;
            for (let i = 0; i < this.comments.length; i++) {
                if (this.comments[i].parent > -1) {
                    this.comments[i].options = `回复@${this.comments[i].parent_name}`
                }
            }
        }).catch(err => {
            console.log(err, "请求失败!")
        })
    }
});