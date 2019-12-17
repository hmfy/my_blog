const everyDay = new Vue({
    el: '#every_day',
    data: {
        content: '一年之计在于春,一天之计在于晨'
    },
    computed: {
        getContent() {
            return this.content
        }
    },
    created() {
        /* 请求数据给content赋值 */
        axios({
            method: 'get',
            url: '/queryEveryDay'
        }).then(res => {
            this.content = res.data.data[0].content
        }).catch(err => {
            console.log('请求失败!', err)
        })
    }
});

const articleList = new Vue({
    el: '#article_list',
    data: {
        articleList: [
            {
                title: '使用Nginx反向代理部署laravel和history模式的Vue项目[更新]',
                content: 'nginx.conf里要加上对laravel的静态文件目录的转发(这里假设我的静态文件在public/static下)、修改vue的nginx配置。我们以在我本地的开发环境为例，windows7+nginx+Vue+Laravel5，假设我想使用的域名是zh30.com。想达成的效果：我们想直接访问时使用Vue开发的单页面应用index.html，做为我们的前台交互，且在Vue中使用history路由模式。后台和接口使用laravel框架进行用laravel框架进行',
                date: '2018-12-05',
                views: '101',
                tags: '标签1 标签2',
                id: '1',
                link: ''
            },
            {
                title: '使用Nginx反向代理部署laravel和history模式的Vue项目[更新]',
                content: 'nginx.conf里要加上对laravel的静态文件目录的转发(这里假设我的静态文件在public/static下)、修改vue的nginx配置。我们以在我本地的开发环境为例，windows7+nginx+Vue+Laravel5，假设我想使用的域名是zh30.com。想达成的效果：我们想直接访问时使用Vue开发的单页面应用index.html，做为我们的前台交互，且在Vue中使用history路由模式。后台和接口使用laravel框架进行用laravel框架进行',
                date: '2018-12-05',
                views: '101',
                tags: '标签1 标签2',
                id: '1',
                link: ''
            },
            {
                title: '使用Nginx反向代理部署laravel和history模式的Vue项目[更新]',
                content: 'nginx.conf里要加上对laravel的静态文件目录的转发(这里假设我的静态文件在public/static下)、修改vue的nginx配置。我们以在我本地的开发环境为例，windows7+nginx+Vue+Laravel5，假设我想使用的域名是zh30.com。想达成的效果：我们想直接访问时使用Vue开发的单页面应用index.html，做为我们的前台交互，且在Vue中使用history路由模式。后台和接口使用laravel框架进行用laravel框架进行',
                date: '2018-12-05',
                views: '101',
                tags: '标签1 标签2',
                id: '1',
                link: ''
            }
        ],
        page: 1,  // 初始化页码
        pageSize: 5, // 每页文章数
        count: 0,  // 文章总条数 (需从数据库请求)
        pageNumList: []
    },
    methods: {
        generatePageTool() {
            let nowPage = this.page;
            let pageSize = this.pageSize;
            let count = this.count;
            let result = [];
            result.push({
                text: '<',
                page: 1
            });
            if (nowPage > 2) {
                result.push({
                    text: nowPage - 2,
                    page: nowPage - 2
                })
            }
            if (nowPage > 1) {
                result.push({
                    text: nowPage - 1,
                    page: nowPage - 1
                })
            }
            result.push({
                text: nowPage,
                page: nowPage
            });
            /* 两种算法 */
            if (1 < (count - (nowPage - 1) * pageSize) / pageSize) {
                result.push({
                    text: nowPage + 1,
                    page: nowPage + 1
                })
            }
            if (2 < (count - (nowPage - 1) * pageSize) / pageSize) {
                result.push({
                    text: nowPage + 2,
                    page: nowPage + 2
                })
            }
            result.push({
                text: '>',
                page: parseInt(nowPage + (count - (nowPage - 1) * pageSize) / pageSize)
            });

            /*if (nowPage + 1 <= parseInt((count + pageSize - 1) / pageSize)) {
                result.push({
                    text: nowPage + 1,
                    page: nowPage + 1
                })
            }
            if (nowPage + 2 <= parseInt((count + pageSize - 1) / pageSize)) {
                result.push({
                    text: nowPage + 2,
                    page: nowPage + 2
                })
            }
            result.push({
                text: '>',
                page: parseInt((count + pageSize - 1) / pageSize)
            });
            */
            this.pageNumList = result;
            return result
        },
        getPage(page, pageSize) {
            axios({
                method: "get",
                url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
            }).then(res => {
                let result = res.data.data;
                // this.articleList = result;
                let list = [];
                for (let i = 0; i < result.length; i++) {
                    let temp = {};
                    temp.title = result[i].title;
                    temp.content = result[i].content;
                    temp.ctime = new Date(result[i].ctime * 1000).toLocaleString();
                    temp.views = result[i].views;
                    temp.tags = result[i].tags;
                    temp.id = result[i].id;
                    temp.link = "/blog_detail.html?bid=" + result[i].id;
                    list.push(temp);
                }
                this.articleList = list;
            }).catch(res => {
                console.log(res, "请求错误!")
            });
            axios({
                url: '/queryBlogCount',
                method: 'get'
            }).then(res => {
                this.count = res.data.data[0].count;
                this.generatePageTool();
            });
        },
        jumpTo (page) {
            this.getPage(page,  this.pageSize);
            this.page = page;
        }
    },
    created() {
        this.getPage(this.page, this.pageSize)
    }
});