const bcrypt = require('bcrypt');
const usersModel = require('../Models/dbSchema')

const signup = (req,res) =>{
    let {firstname, lastname, email, password} = req.body 
    let account_no = Math.floor(10000000000 + Math.random() * 90000000000)
    // console.log(account_no);
    const signup = new usersModel({ firstname, lastname, email, password, account_no })
    signup.save((err) => {
        if (!err) { 
            res.json({message: "Signed up successfully", status: true})
        } else if (err) {
            if (err.keyPattern.email == 1) {
                res.json({message: "Email already existed", status: false})
            } else if (err.keyPattern.accountNo == 1) {
                accountNo = Math.floor(10000000000 + Math.random() * 90000000000)
            } else {
                res.json({message: err, status: false})
            }
        }
        // if (condition) {
        //     accountNo = Math.floor(10000000000 + Math.random() * 90000000000)
        //     signup();
        // }
    })
}

module.exports = {
    signup
}