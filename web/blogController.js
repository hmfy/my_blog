const blogDao = require('../dao/BlogDao');
const tagsDao = require('../dao/TagsDao');
const tagBlogMapDao = require('../dao/TagBlogMapping');
const {getNow} = require('../util/TimeUtil');
const {writeResult} = require('../util/RespUtil');
const url = require('url');

const path = new Map();

function queryBlogByPage(req, res) {
    let params = url.parse(req.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), result => {
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, "");
            result[i].content = result[i].content.replace(/<[\w\W]{1,350}>/g, "");
            result[i].content = result[i].content.substring(0, 300);
        }
        res.send(writeResult(200, 'success', result));
    });
}

function queryBlogCount(req, res) {
    blogDao.queryBlogCount(result => {
        res.send(writeResult(200, 'success', result));
    });
}

function queryBlogById(req, res) {
    let params = url.parse(req.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid), result => {
        res.send(writeResult(200, 'success', result));
    });
}

function queryAllBlog (req, res) {
    blogDao.queryAllBlog(result => {
        res.send(writeResult(200, 'success', result));
    })
}

function editBlog(req, res) {
    const params = url.parse(req.url, true).query
    const tags = params.tags.replace(/ /g, '').replace('，', ',');
    req.on('data', d => {
        blogDao.insertBlog(params.title, d.toString(), tags, 0, getNow(), getNow(), result => {
            res.send(writeResult(200, 'success', null));
            const blogId = result.insertId;
            const tagList = tags.split(',')
            for(let i = 0; i < tagList.length; i ++) {
                if(tagList[i] == ''){
                    continue
                }
                queryTag(tagList[i].trim(), blogId)
            }
        })
    })
}

function queryTag (tag, blogId) {
    tagsDao.queryTag(tag, res => {
        if(res == null || res.length == 0) {
            insertTag(tag, blogId)
        } else {
            insertTagBlogMapping(res[0].id, blogId)
        }
    })
}

function insertTag (tag, blogId) {
    tagsDao.insertTag(tag, getNow(), getNow(), res => {
        insertTagBlogMapping(res.insertId, blogId)
    })
}

function insertTagBlogMapping (tagId, blogId) {
    tagBlogMapDao.insertTagBlogMapping(tagId, blogId, getNow(), getNow(), res => {})
}

path.set('/editBlog', editBlog);
path.set('/queryBlogByPage', queryBlogByPage);
path.set('/queryBlogById', queryBlogById);
path.set('/queryBlogCount', queryBlogCount);
path.set('/queryAllBlog', queryAllBlog);

module.exports.path = path;