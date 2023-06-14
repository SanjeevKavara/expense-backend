const exp = require('constants');
//require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser') // to parse the body of the request 
const path = require('path');
app.use(bodyParser.urlencoded({extended:true}));// for post method and put method
// 'mongodb://localhost:27017/expense-tracker'

//const port  = process.env.PORT || 3000;
const DB = `mongodb+srv://tsanjeevkavaracs20:aYGMvH9F4cmWGK29@expense-tracker.jh8yey4.mongodb.net/?retryWrites=true&w=majority`

const mongoose = require('mongoose');
const { getExpenses,getExpensesById,addExpenses,deleteExpense,loggerFunc,checkAdmin } = require('./controller/expense');// to import the controller file
mongoose.connect('mongodb://localhost:27017/expense-tracker',{
    useNewUrlParser: true
}).then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err)
})


mongoose.Promise = global.Promise; // to remove the warning of mongoose promise deprication 
app.use(loggerFunc) // to use the middleware function 

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error: ")); // to check the connection error 
db.once("open",function () {
    console.log("Connected successfully");
    
});

app.use(bodyParser.json()) // for post method and put method 



app.get('/api/v1/health',(req,res)=>{
    res.status(200).json({
        message:"It worked !",
        status:"Success"
    })
});


app.get('/api/v1/expense',loggerFunc,checkAdmin,getExpenses)

app.get('/api/v1/expense/:id',getExpensesById)

app.post('/api/v1/expense',addExpenses)

app.delete('/api/v1/expense/:id',deleteExpense)

//app.put('/api/v1/expense/:id',updateExpense)
//app.get('/api/v1/expenses/:id')


// const expenses = [
//     {id:1,name:'Movie',amount:190,desc:'Vaathi'},
//     {id:2,name:'sooru',amount:1000,desc:'keda kari'},
//     {id:3,name:'Rent',amount:8000,desc:"Home rent + maintanance"}
    
// ]


// const expenseDetails = [
//     {id:1,paymentMode:'UPI'},
//     {id:2,paymentMode:'Cash'},
//     {id:3,paymentMode:'Net Banking'}

// ]




// app.get('/api/v1/expense',(req,res)=>{
//     res.status(200).json(expenses);
// })


// app.get('/api/v1/expense/:id',(req,res)=>{
//     let id = req.params.id;
//     for(let i=0;i<expenses.length;i+=1)
//     {
        
//         if(id==expenses[i].id)
//         {
//             let detail = {
//                 id:id,
//                 name:expenses[i].name,
//                 amount:expenses[i].amount,
//                 desc:expenses[i].desc,
//                 paymentMode:expenseDetails[i].paymentMode
//             }
//             res.status(200).json(detail)
//         }
//     }
//     //res.send('trial')
// })

// app.post('/api/v1/expense',(req,res)=>{
//     let newExpense = req.body;
//     newExpense.id = expenses[expenses.length-1].id+1;
//     expenses.push(newExpense);
//     res.status(201).json(newExpense);
   
// })


// app.delete('/api/v1/expense/:id',(req,res)=>{
//     for(let i = 0;i<expenses.length;i+=1)
//     {
//         if(expenses[i].id==req.params.id){
//             expenses.splice(i,1);
//         }
//     }
//     res.send('Deleted')
// })

// app.put('/api/v1/expense/:id',(req,res)=>{
//     console.log(req.body)
//     for(let i=0;i<expenses.length;i+=1)
//     {
//         if(expenses[i].id==req.params.id)
//         {
           
//             if(req.body.amount)
//             {
                
//                 expenses[i].amount=req.body.amount
//             }
//         }
//     }
//     res.send('Updated')
// })

app.listen(5000,()=>{
    console.log("Server is running");
})