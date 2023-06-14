const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({ //creating a schema for the expense model 
    name:{
        type:String,
        trim:true,
        required:[true,'Please add some text']
    },
    amount:{
        type:Number,
        required:[true,'Please add a positive number']
    },
    desc:{
        type: String
    }
})

module.exports = mongoose.model('expense',ExpenseSchema) //model name is expense and schema is ExpenseSchema 