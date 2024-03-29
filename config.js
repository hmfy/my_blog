const fs = require('fs')

const globalConfig = {}

const config = fs.readFileSync('./server.conf')

const configArr = config.toString().split('\n')

for(let i = 0; i < configArr.length; i ++) {
    globalConfig[configArr[i].split('=')[0].trim()] = configArr[i].split('=')[1].trim()
}

module.exports = globalConfig