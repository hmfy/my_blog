const fs = require('fs')
const {web_path} = require('./config')

const controllerSet = []
const pathMap = new Map()

const files = fs.readdirSync(web_path)

for (let i = 0; i < files.length; i ++) {
    let temp = require(`./${web_path}/${files[i]}`)
    if(temp.path){
        for(let [key, value] of temp.path) {
            if(pathMap.get(key) == null) {
                pathMap.set(key, value)
            } else {
                /* web目录下出现相同的path */
                throw new Error('url path异常')
            }
        }
        controllerSet.push(temp)
    }
}

module.exports = pathMap