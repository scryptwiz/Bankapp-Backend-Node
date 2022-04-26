// mongoose schema
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("Connect To DB Successfully"))
    .catch((err) => console.log(err))

let userSchema = mongoose.Schema({
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
        require:true
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
        unique: true
    },
    verified_acc: {
        type: Boolean,
        require: true,
        default: false
    }
})
userSchema.pre('save', async function (next){
    let {password} =this;
    const saltRound = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, saltRound);
    next();
})
let userModel = mongoose.model("users_db", userSchema);

app.get('/test', (req,res)=>{
    const users = new usersModel({
        firstname: 'Kelvin',
        lastname: 'Ajayi',
        email: 'kelvin@gmail.com',
        password: 'Kelvin@002',
        accountNo: '0000000000'
    })
    users.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            res.send(err)
        })
})

// Routes
app.post('/signup', (req,res) =>{
    let {firstname, lastname, email, password} = req.body 
    const accountNo = Math.floor(10000000000 + Math.random() * 90000000000)
    const signup = new usersModel({ firstname, lastname, email, password, accountNo })
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
    })
})

app.post('/signin', (req,res)=>{
    let loginContent = req.body;
    usersModel.findOne({email:loginContent.email}, async (err,result)=>{
        if (err) {
            console.log(err);
            res.json({message: 'Network Error', status: false, err})
        } else if (result) {
            console.log(result);
            let email = result.email
            console.log(email);
            let validPassword = await bcrypt.compare(loginContent.password, result.password)
            if(validPassword){
                jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "2h", issuer: "localhost:3000"}, (err, token)=>{
                    if(err){
                        {err.message=="jwt expired"? res.json({message: "Session timed out, kindly login again", status: false}) : null;}
                        console.log(err);
                    }else {
                        console.log(token);
                        res.json({message:"Login Succesfully" ,token, status: true})
                    }
               
            })
            } else {
                res.json({message: "Incorrect Password", status: false})
            }
        }  else if (result==null) {
            res.json({message: "Email not registered", success:false})
        } 
    })
})