const Express = require("express");
const { port } = require('./config');
const loader = require('./loader');

const app = new Express();

app.use(Express.static("./page/"));

app.post('/editEveryDay', loader.get('/editEveryDay'));
app.post('/editBlog', loader.get('/editBlog'));

app.get('/queryEveryDay', loader.get('/queryEveryDay'));
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'));
app.get('/queryBlogCount', loader.get('/queryBlogCount'));
app.get('/queryBlogById', loader.get('/queryBlogById'));
app.get('/addComment', loader.get('/addComment'));
app.get('/queryRandomCode', loader.get('/queryRandomCode'));
app.get('/queryCommentsByBlogId', loader.get('/queryCommentsByBlogId'));
app.get('/queryAllBlog', loader.get('/queryAllBlog'));

app.listen(port, ()=>{
    console.log("服务已启动...")
});