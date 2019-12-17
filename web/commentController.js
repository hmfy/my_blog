const commentDao = require('../dao/CommentDao');
const {getNow} = require('../util/TimeUtil');
const {writeResult} = require('../util/RespUtil');
const url = require('url');
const captcha = require('svg-captcha');

const path = new Map();

function addComment(req, res) {
    let params = url.parse(req.url, true).query;
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.userName, params.email, params.content, getNow(), getNow(), params.parentName, result => {
        res.send(writeResult(200, 'success', result));
    });
}

function queryCommentsByBlogId(req, res) {
    let params = url.parse(req.url, true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.bid), result => {
        res.send(writeResult(200, 'success', result));
    });
}

function queryRandomCode (req, res) {
    let img = captcha.create({
        fontSize: 50,
        width: 100,
        height: 34
    });
    res.send(img);
}

path.set('/addComment', addComment);
path.set('/queryRandomCode', queryRandomCode);
path.set('/queryCommentsByBlogId', queryCommentsByBlogId);

module.exports.path = path;