const dataReader = require('./datareader')

dataReader.readDatas()

dataReader.addData('20190203','慰问生病会员沈某某','502维权支出','50205送温暖费',500,0)

console.log(dataReader.getLength())

dataReader.addData('20190204','慰问生病会员李某','502维权支出','50205送温暖费',300,0)

console.log(dataReader.getLength())

dataReader.writeDatas()