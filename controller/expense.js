const expenses = require('../models/expense');

exports.getExpenses  = async(req,res,next)=>{
    try {
        const expense = await expenses.find(); //find all the expenses in the database 
        console.log(expense)
        return res.status(200).json({
            success:true,
            count: expense.length,
            data: expense
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:'Server Error'
        });
        
    }
}

exports.getExpensesById = async(req,res,next)=>{
    try {
        const expense = await expenses.findById(req.params.id)
        if(!expense){
            return res.status(404).json({
                success:false,
                error:'No expense found'
            })
        }
        return res.status(200).json(expense)
    } catch (error) {
        return res.status(500).json({

            success:false,
            error:'Server error'
        });
    }
}

exports.addExpenses = async(req,res,next)=>{
    try {
        const {name,amount,desc} = req.body;
        console.log(name,amount,desc)
        const expense = await expenses.create(req.body);

        return res.status(201).json({
            success: true,
            data: expense
        });
    } catch (error) {
        if(error.name==='ValidationError'){
            const message = Object.values(error.errors).map(val=>val.message) //mapping the error messages 

            return res.status(400).json({
                success:false,
                error:message
            });
        }else{
            return res.status(300).json({
                success:false,
                error:'Server Error'
            })
        }
    }
}



exports.deleteExpense = async(req,res,next)=>{


    try {
        const expense = await expenses.findById(req.params.id) //find the expense by id 
        if(!expense){
            return res.status(404).json({
                success:false,
                error:'No Expense found'
            });
        }

        await expense.remove();
        return res.status(200).json({
            success:true,
            data:{}
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:'Server error'
        });
    }
}


// exports.updateExpense = async(req,res,next)=>{
//     try {
//         const expense = await expenses.findById(req.params.id)
//         const {name,amount,desc} = req.body;
//         console.log(name,amount,desc)
//         if(!expense){
//             return res.status(404).json({
//                 success:false,
//                 error:'No expense found'
//         })

//         }
//         await expense.name = name;

        
//         return res.status(200).json({
//             success:true,
//             data:expense
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             success:false,
//             error:'Server error'
//         });
        
//     }
// }


exports.loggerFunc = async(req,res,next)=>{  //middleware
    console.log('Logging')
    console.log(req.method,req.url)
    next() //to move to the next middleware function 
}


exports.checkAdmin = (req,res,next)=>{   //middleware
    const isAdmin  = true;
    if(!isAdmin){
        res.status(401).json({
            message:'Unauthorised access'
        })
    }
    next();
}

