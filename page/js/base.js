const randomTags = new Vue({
    el: '#random_tags',
    data: {
        tags: ['标签1', '标签2', 'html', 'css', 'javascript', 'java', 'c#', 'c++', 'c', 'ruff', 'ios', 'game', 'arduino', 'jquery', 'node.js', 'vue', 'react']
    },
    methods: {
        randomColor() {
            let red = Math.random() * 255 + 50,
                green = Math.random() * 255 + 50,
                blue = Math.random() * 255 + 50;
            return `rgb(${red}, ${green}, ${blue})`
        },
        randomSize() {
            let size = `${(Math.random() * 20 + 12)}px`
            return size
        }
    },
    created() {

    },
});

const newHot = new Vue({
    el: '#new_hot',
    data: {
        titleList: [{
                title: '这是一个链接',
                link: 'https://www.baidu.com'
            },
            {
                title: '这是一个链接',
                link: 'https://www.baidu.com'
            },
            {
                title: '这是一个链接',
                link: 'https://www.baidu.com'
            },
            {
                title: '这是一个链接',
                link: 'https://www.baidu.com'
            },
            {
                title: '这是一个链接',
                link: 'https://www.baidu.com'
            },
            {
                title: '这是一个链接',
                link: 'https://www.baidu.com'
            }
        ]
    }
})

const newComments = new Vue({
    el: '#new_comments',
    data: {
        commentsList: [{
                name: '这里是用户1',
                date: '2019-12-09',
                comment: '这里是我的评论呢'
            },
            {
                name: '这里是用户2',
                date: '2019-01-09',
                comment: '这里是我的评论呢'
            }, {
                name: '这里是用户3',
                date: '2019-02-09',
                comment: '这里是我的评论呢'
            }, {
                name: '这里是用户4',
                date: '2019-10-09',
                comment: '这里是我的评论呢'
            }, {
                name: '这里是用户5',
                date: '2019-11-09',
                comment: '这里是我的评论呢'
            },{
                name: '这里是用户5',
                date: '2019-11-09',
                comment: '这里是我的评论呢'
            }
        ]
    }
})