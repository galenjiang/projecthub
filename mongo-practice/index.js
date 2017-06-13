const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://127.0.0.1:27017/blog')
db.connection.on('open', () => {
    console.log('连接成功')
})

db.connection.on('error', (e) => {
    console.log(`数据库连接错误：${e}`)
})

const PersonSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    age: { type: Number, default: 20 },
})

const PersonModel = db.model('person', PersonSchema)
const personEntity = new PersonModel({
    name: 'galen',
    age: 30,
})

personEntity.save((err, docs) => {
    if (err) {
        console.log(`error: ${err}`)
    } else {
        console.log(docs)
    }
})