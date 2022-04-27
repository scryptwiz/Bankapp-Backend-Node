const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    firstname:{
        type: String,
        require:true
    },
    lastname:{
        type: String,
        require:true
    },  
    phone_number: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    account_no: {
        type: String,
        require:true,
        unique: true
    },
    bvn: {
        type: String,
    },
    verified_acc: {
        type: Boolean,
        require: true,
        default: false
    }
}, { timestamps: true });

usersSchema.pre('save', async function (next){
    let {password} =this;
    const saltRound = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, saltRound);
    next();
})

const usersModel = mongoose.model("User", usersSchema)

module.exports = usersModel;