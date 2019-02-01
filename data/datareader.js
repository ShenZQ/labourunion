const fs = require('fs')
const datamodel = require('./datamodel')

let datas

function readDatas() {
    let str = fs.readFileSync('datas.json')
    datas = JSON.parse(str)
}

function writeDatas() {
    let str = JSON.stringify(datas)
    fs.writeFileSync('datas.json', str)
}

function addData(date, description, subject, subsubject, debit,credit){
    let tmpData = new datamodel(date, description, subject, subsubject, debit,credit)
    datas.push(tmpData)
}

function getLength(){
    return datas.length
}

module.exports = {
    readDatas,
    writeDatas,
    addData,
    getLength
}