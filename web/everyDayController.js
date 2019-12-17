const everyDayDao = require('../dao/EveryDayDao')
const {getNow} = require('../util/TimeUtil')
const {writeResult} = require('../util/RespUtil')

const path = new Map()

function editEveryDay(req, res) {
    req.on('data', d => {
        everyDayDao.insertEveryDay(d.toString().trim(), getNow(), result => {
            res.send(writeResult(200, 'success', null))
        })
    })
}

function queryEveryDay (req, res) {
    everyDayDao.queryEveryDay(result => {
        res.send(writeResult(200, 'success', result))
    })
}

path.set('/editEveryDay', editEveryDay)
path.set('/queryEveryDay', queryEveryDay)

module.exports.path = path