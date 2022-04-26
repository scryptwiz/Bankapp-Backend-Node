const usersModel = require('../Models/dbSchema')

const loadDashboard = (req,res) => {
    console.log(req.headers.authorization);
    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET,(err, decoded)=>{
        if(err){
            res.send({status:false})
            console.log('Token no gree verify');
            console.log(err);
        } else {
            if (decoded) {
                res.send({status:true})
                console.log(decoded);
            }
        }
    })
}

module.exports = {
    loadDashboard
}