const mongoose = require('mongoose')

const connectDB = async (url) => {

    try{
    await mongoose.connect(url, {
       useNewUrlParser: true,
       useCreateIndex: true,
       useFindAndModify: false,
       useUnifiedTopology: true,
 })
 return console.log(`CONNECTED TO THE DB...`)
} catch (err) {
    return console.log(err)
}
}
module.exports = connectDB